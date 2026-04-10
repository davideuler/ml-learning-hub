import type { Metadata } from 'next';
import { MathPageClient } from '@/components/pages/MathPageClient';

export const metadata: Metadata = {
  title: 'Math Foundations for ML',
  description: 'Linear algebra, calculus, probability, information theory, and optimization — grounded in PyTorch and NumPy code, not abstract proofs.',
};

export default function MathPage() {
  return <MathPageClient />;
}
