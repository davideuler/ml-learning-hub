import type { Metadata } from 'next';
import { RoadmapPageClient } from '@/components/pages/RoadmapPageClient';

export const metadata: Metadata = {
  title: 'Learning Roadmap',
  description: 'Step-by-step roadmap from Python basics to production ML: PyTorch, Transformers, RL.',
};

export default function RoadmapPage() {
  return <RoadmapPageClient />;
}
