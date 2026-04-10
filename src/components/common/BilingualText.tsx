'use client';

import { useSitePreferences } from '@/components/providers/SiteProviders';

type BilingualTextProps = {
  en: string;
  zh: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export function BilingualText({ en, zh, as = 'span', className }: BilingualTextProps) {
  const { locale } = useSitePreferences();
  const Tag = as;
  return <Tag className={className}>{locale === 'zh' ? zh : en}</Tag>;
}
