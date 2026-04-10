'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ThemeLanguageControls } from '@/components/layout/ThemeLanguageControls';
import { useSitePreferences } from '@/components/providers/SiteProviders';

const NAV_LINKS = [
  { href: '/',          label: 'Home'     },
  { href: '/roadmap',   label: 'Roadmap'  },
  { href: '/courses',   label: 'Courses'  },
  { href: '/projects',  label: 'Projects' },
  { href: '/math',      label: 'Math'     },
  { href: '/hardware',  label: 'Hardware' },
];

export function Navbar() {
  const pathname = usePathname();
  const { locale } = useSitePreferences();

  const labels = {
    Home: locale === 'zh' ? '首页' : 'Home',
    Roadmap: locale === 'zh' ? '路线图' : 'Roadmap',
    Courses: locale === 'zh' ? '课程' : 'Courses',
    Projects: locale === 'zh' ? '项目' : 'Projects',
    Math: locale === 'zh' ? '数学' : 'Math',
    Hardware: locale === 'zh' ? '硬件' : 'Hardware',
    github: locale === 'zh' ? 'GitHub 仓库 ↗' : 'GitHub ↗',
    brand: locale === 'zh' ? '机器学习实战' : 'ML Hub',
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]"
      style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(12px)' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-brand-400">⚡</span>
          <span className="hidden sm:inline text-[var(--text-primary)]">{labels.brand}</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-1 text-sm">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx(
                'px-3 py-1.5 rounded-lg font-medium transition-colors',
                pathname === href
                  ? 'bg-brand-500/20 text-brand-300'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--hover-bg)]',
              )}
            >
              {labels[label as keyof typeof labels] ?? label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeLanguageControls />
          <a
            href="https://github.com/davideuler/ml-learning-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold
                       bg-brand-500 hover:bg-brand-400 text-white transition-colors"
          >
            {labels.github}
          </a>
        </div>
      </nav>
    </header>
  );
}
