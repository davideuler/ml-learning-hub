import type { Metadata } from 'next';
import { TransformerDeepDivePageClient } from '@/components/pages/TransformerDeepDivePageClient';

export const metadata: Metadata = {
  title: 'Transformer Deep Dive',
  description: 'Master attention, multi-head attention, positional encoding, and GPT/BERT implementation with detailed beginner-friendly modules.',
};

export default function TransformerDeepDivePage() {
  return <TransformerDeepDivePageClient />;
}
