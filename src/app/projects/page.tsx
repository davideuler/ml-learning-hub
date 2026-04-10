import type { Metadata } from 'next';
import { ProjectsPageClient } from '@/components/pages/ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Hands-on ML projects: CNN classifiers, Mini-GPT, BERT, DQN, PPO, Tianshou, and inference systems.',
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
