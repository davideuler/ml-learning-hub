'use client';

import { useSitePreferences } from '@/components/providers/SiteProviders';

export function ThemeLanguageControls() {
  const { theme, toggleTheme, locale, toggleLocale } = useSitePreferences();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleLocale}
        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
        aria-label="Toggle language"
      >
        {locale === 'en' ? '中文' : 'EN'}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
}
