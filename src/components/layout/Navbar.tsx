'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

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

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)]"
      style={{ background: 'rgba(15,15,26,0.9)', backdropFilter: 'blur(12px)' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="text-brand-400">⚡</span>
          <span className="hidden sm:inline text-white">ML Hub</span>
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
                  : 'text-slate-400 hover:text-white hover:bg-white/5',
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold
                     bg-brand-500 hover:bg-brand-400 text-white transition-colors"
        >
          GitHub ↗
        </a>
      </nav>
    </header>
  );
}
