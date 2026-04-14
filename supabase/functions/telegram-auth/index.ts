import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }
  return bytes
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function validateTelegramData(initData: string, botToken: string): Promise<Record<string, string> | null> {
  const params = new URLSearchParams(initData)
  const hash = params.get('hash')
  if (!hash) return null

  params.delete('hash')
  const entries = Array.from(params.entries())
  entries.sort(([a], [b]) => a.localeCompare(b))
  const dataCheckString = entries.map(([k, v]) => `${k}=${v}`).join('\n')

  const encoder = new TextEncoder()

  // HMAC-SHA256 of bot token with "WebAppData" as key
  const secretKeyData = await crypto.subtle.importKey(
    'raw',
    encoder.encode('WebAppData'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const secretKey = await crypto.subtle.sign('HMAC', secretKeyData, encoder.encode(botToken))

  // HMAC-SHA256 of data_check_string with secret key
  const signKeyData = await crypto.subtle.importKey(
    'raw',
    secretKey,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', signKeyData, encoder.encode(dataCheckString))

  const computedHash = bytesToHex(new Uint8Array(signature))

  if (computedHash !== hash) return null

  // Check auth_date is not too old (allow 1 day)
  const authDate = parseInt(params.get('auth_date') || '0')
  const now = Math.floor(Date.now() / 1000)
  if (now - authDate > 86400) return null

  return Object.fromEntries(params.entries())
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN')
    if (!botToken) {
      return new Response(JSON.stringify({ error: 'Bot token not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { initData } = await req.json()
    if (!initData) {
      return new Response(JSON.stringify({ error: 'Missing initData' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const validated = await validateTelegramData(initData, botToken)
    if (!validated) {
      return new Response(JSON.stringify({ error: 'Invalid Telegram data' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const userData = JSON.parse(validated.user || '{}')
    const telegramId = userData.id
    if (!telegramId) {
      return new Response(JSON.stringify({ error: 'No user in initData' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const email = `tg_${telegramId}@telegram.local`
    const password = `tg_${telegramId}_${botToken.slice(0, 10)}`

    // Try to sign in first
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    let userId: string
    let session: any

    if (signInError) {
      // Create new user
      const { data: signUpData, error: signUpError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          telegram_id: telegramId,
          first_name: userData.first_name,
          username: userData.username,
        },
      })

      if (signUpError) {
        return new Response(JSON.stringify({ error: signUpError.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      userId = signUpData.user.id

      // Sign in to get session
      const { data: newSession, error: sessionError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (sessionError) {
        return new Response(JSON.stringify({ error: sessionError.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      session = newSession.session

      // Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        user_id: userId,
        telegram_id: telegramId,
        first_name: userData.first_name || 'User',
        last_name: userData.last_name || null,
        username: userData.username || null,
        photo_url: userData.photo_url || null,
        language_code: userData.language_code || null,
      })

      if (profileError) {
        console.error('Profile creation error:', profileError)
      }
    } else {
      userId = signInData.user!.id
      session = signInData.session

      // Update profile
      await supabase.from('profiles').update({
        first_name: userData.first_name || 'User',
        last_name: userData.last_name || null,
        username: userData.username || null,
        photo_url: userData.photo_url || null,
        language_code: userData.language_code || null,
      }).eq('user_id', userId)
    }

    return new Response(JSON.stringify({
      session,
      user: {
        id: telegramId,
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        photo_url: userData.photo_url,
        language_code: userData.language_code,
      },
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
