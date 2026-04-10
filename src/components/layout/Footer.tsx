"use client";

import { useSitePreferences } from '@/components/providers/SiteProviders';

export function Footer() {
  const { locale } = useSitePreferences();

  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
        <p>
          © {new Date().getFullYear()} ML Learning Hub{' '}
          {locale === 'zh' ? '— 为 Python 工程师打造的项目式学习站。' : '— Built for Python engineers.'}
        </p>
        <div className="flex gap-6">
          <a href="/roadmap"  className="hover:text-[var(--text-primary)] transition-colors">{locale === 'zh' ? '路线图' : 'Roadmap'}</a>
          <a href="/courses"  className="hover:text-[var(--text-primary)] transition-colors">{locale === 'zh' ? '课程' : 'Courses'}</a>
          <a href="/projects" className="hover:text-[var(--text-primary)] transition-colors">{locale === 'zh' ? '项目' : 'Projects'}</a>
        </div>
      </div>
    </footer>
  );
}
