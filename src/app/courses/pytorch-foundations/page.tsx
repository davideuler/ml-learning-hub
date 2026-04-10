import type { Metadata } from 'next';
import { PyTorchFoundationsPageClient } from '@/components/pages/PyTorchFoundationsPageClient';

export const metadata: Metadata = {
  title: 'PyTorch Foundations',
  description: 'Learn PyTorch from tensors to full training pipelines with detailed, beginner-friendly modules.',
};

export default function PyTorchFoundationsPage() {
  return <PyTorchFoundationsPageClient />;
}
