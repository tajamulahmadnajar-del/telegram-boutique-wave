import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
}

export interface TelegramThemeParams {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  secondary_bg_color: string;
}

interface TelegramContextType {
  user: TelegramUser;
  themeParams: TelegramThemeParams;
  colorScheme: "light" | "dark";
  ready: boolean;
  authenticated: boolean;
  loading: boolean;
  showBackButton: (show: boolean) => void;
  onBackButtonClick: (cb: () => void) => void;
  hapticFeedback: (type: "light" | "medium" | "heavy") => void;
  close: () => void;
}

const defaultUser: TelegramUser = {
  id: 123456789,
  first_name: "Alex",
  last_name: "Johnson",
  username: "alexj",
  photo_url: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alex",
  language_code: "en",
};

const lightTheme: TelegramThemeParams = {
  bg_color: "#ffffff",
  text_color: "#000000",
  hint_color: "#999999",
  link_color: "#2481cc",
  button_color: "#2481cc",
  button_text_color: "#ffffff",
  secondary_bg_color: "#f0f0f0",
};

const darkTheme: TelegramThemeParams = {
  bg_color: "#212121",
  text_color: "#ffffff",
  hint_color: "#aaaaaa",
  link_color: "#6ab3f3",
  button_color: "#6ab3f3",
  button_text_color: "#ffffff",
  secondary_bg_color: "#0f0f0f",
};

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
            language_code?: string;
          };
        };
        themeParams: Record<string, string>;
        colorScheme: "light" | "dark";
        ready: () => void;
        close: () => void;
        BackButton: {
          show: () => void;
          hide: () => void;
          onClick: (cb: () => void) => void;
        };
        HapticFeedback: {
          impactOccurred: (style: string) => void;
        };
      };
    };
  }
}

const TelegramContext = createContext<TelegramContextType | null>(null);

function getTelegramWebApp() {
  if (typeof window !== "undefined" && window.Telegram?.WebApp?.initData) {
    return window.Telegram.WebApp;
  }
  return null;
}

// Load Telegram WebApp SDK dynamically (non-render-blocking)
function loadTelegramScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Telegram?.WebApp) return Promise.resolve();
  if (document.querySelector('script[src*="telegram-web-app.js"]')) {
    return new Promise((resolve) => {
      const check = () => {
        if (window.Telegram?.WebApp) resolve();
        else setTimeout(check, 50);
      };
      check();
    });
  }
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve(); // Don't block on failure
    document.head.appendChild(script);
  });
}

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<TelegramUser>(defaultUser);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Theme detection
  useEffect(() => {
    const tg = getTelegramWebApp();
    if (tg) {
      setColorScheme(tg.colorScheme || "light");
    } else {
      const saved = localStorage.getItem("tg-theme");
      if (saved === "dark" || saved === "light") {
        setColorScheme(saved);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setColorScheme("dark");
      }
    }
  }, []);

  const themeParams = colorScheme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    if (colorScheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (typeof window !== 'undefined') localStorage.setItem("tg-theme", colorScheme);
  }, [colorScheme]);

  // Telegram auto-login
  useEffect(() => {
    const init = async () => {
      await loadTelegramScript();
      const tg = getTelegramWebApp();

      if (tg && tg.initData) {
        // Running inside Telegram — extract user and authenticate
        const tgUser = tg.initDataUnsafe?.user;
        if (tgUser) {
          setUser({
            id: tgUser.id,
            first_name: tgUser.first_name,
            last_name: tgUser.last_name,
            username: tgUser.username,
            photo_url: tgUser.photo_url || `https://api.dicebear.com/9.x/avataaars/svg?seed=${tgUser.id}`,
            language_code: tgUser.language_code,
          });
          // Apply Telegram theme
          setColorScheme(tg.colorScheme || "light");
        }

        // Call edge function to validate and get session
        try {
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/telegram-auth`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              },
              body: JSON.stringify({ initData: tg.initData }),
            }
          );

          const data = await response.json();

          if (response.ok && data.session) {
            await supabase.auth.setSession({
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            });
            setAuthenticated(true);

            if (data.user) {
              setUser((prev) => ({
                ...prev,
                ...data.user,
                photo_url: data.user.photo_url || prev.photo_url,
              }));
            }
          } else {
            console.warn("[TG Auth] Failed:", data.error);
          }
        } catch (err) {
          console.error("[TG Auth] Error:", err);
        } finally {
          setLoading(false);
          setReady(true);
        }

        tg.ready();
      } else {
        // Browser preview mode — use mock data
        setLoading(false);
        setReady(true);
      }
    };

    init();
  }, []);

  const tg = typeof window !== "undefined" ? window.Telegram?.WebApp : undefined;

  const value: TelegramContextType = {
    user,
    themeParams,
    colorScheme,
    ready,
    authenticated,
    loading,
    showBackButton: (show) => {
      if (tg?.BackButton) {
        show ? tg.BackButton.show() : tg.BackButton.hide();
      }
    },
    onBackButtonClick: (cb) => {
      tg?.BackButton?.onClick(cb);
    },
    hapticFeedback: (type) => {
      if (tg?.HapticFeedback) {
        tg.HapticFeedback.impactOccurred(type);
      } else if (navigator.vibrate) {
        const ms = type === "light" ? 10 : type === "medium" ? 20 : 30;
        navigator.vibrate(ms);
      }
    },
    close: () => {
      if (tg) {
        tg.close();
      } else {
        console.log("[TG Mock] WebApp.close()");
      }
    },
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  const ctx = useContext(TelegramContext);
  if (!ctx) throw new Error("useTelegram must be used within TelegramProvider");
  return ctx;
}

export function useToggleTheme() {
  return () => {
    const current = localStorage.getItem("tg-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("tg-theme", next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.location.reload();
  };
}
