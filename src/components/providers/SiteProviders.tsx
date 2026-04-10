'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Theme = 'light' | 'dark';
type Locale = 'en' | 'zh';

type SiteContextValue = {
  theme: Theme;
  locale: Locale;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage.getItem('ml-hub-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem('ml-hub-locale');
  if (saved === 'en' || saved === 'zh') return saved;
  const browserLang = window.navigator.language.toLowerCase();
  return browserLang.startsWith('zh') ? 'zh' : 'en';
}

export function SiteProviders({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [locale, setLocaleState] = useState<Locale>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    const initialLocale = getInitialLocale();
    setThemeState(initialTheme);
    setLocaleState(initialLocale);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    window.localStorage.setItem('ml-hub-theme', theme);
  }, [theme, ready]);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    window.localStorage.setItem('ml-hub-locale', locale);
  }, [locale, ready]);

  const value = useMemo<SiteContextValue>(() => ({
    theme,
    locale,
    setTheme: setThemeState,
    toggleTheme: () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
    setLocale: setLocaleState,
    toggleLocale: () => setLocaleState((prev) => (prev === 'en' ? 'zh' : 'en')),
  }), [theme, locale]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSitePreferences() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSitePreferences must be used within SiteProviders');
  return ctx;
}
