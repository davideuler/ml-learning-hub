import type { Metadata } from 'next';
import { ReinforcementLearningPageClient } from '@/components/pages/ReinforcementLearningPageClient';

export const metadata: Metadata = {
  title: 'Reinforcement Learning',
  description: 'From MDPs to PPO with detailed, beginner-friendly modules and Tianshou engineering workflow.',
};

export default function ReinforcementLearningPage() {
  return <ReinforcementLearningPageClient />;
}
