import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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

const TelegramContext = createContext<TelegramContextType | null>(null);

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tg-theme");
    if (saved === "dark" || saved === "light") {
      setColorScheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setColorScheme("dark");
    }
  }, []);

  const themeParams = colorScheme === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    if (colorScheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("tg-theme", colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    setReady(true);
  }, []);

  const value: TelegramContextType = {
    user: defaultUser,
    themeParams,
    colorScheme,
    ready,
    showBackButton: () => {},
    onBackButtonClick: () => {},
    hapticFeedback: (type) => {
      if (navigator.vibrate) {
        const ms = type === "light" ? 10 : type === "medium" ? 20 : 30;
        navigator.vibrate(ms);
      }
    },
    close: () => {
      console.log("[TG Mock] WebApp.close()");
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
