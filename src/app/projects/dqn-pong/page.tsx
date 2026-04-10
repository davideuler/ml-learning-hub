import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: DQN Atari Pong',
};

export default function DQNPongPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/projects" className="hover:text-slate-300">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-white">DQN Pong</span>
      </nav>
      <span className="text-5xl">🏓</span>
      <h1 className="text-3xl font-extrabold text-white mt-4 mb-4">DQN Atari Pong</h1>
      <div className="flex gap-2 mb-6">
        <span className="badge badge-orange">RL</span>
        <span className="badge badge-blue">Intermediate</span>
      </div>
      <p className="text-slate-400 mb-8">
        Implement Deep Q-Networks with experience replay and target network.
        Beat the built-in AI opponent in Pong-v5.
        Full guide coming in v0.2 — see the <Link href="/courses/reinforcement-learning" className="text-brand-300 hover:underline">RL course</Link> for prerequisites.
      </p>
      <div className="card">
        <h2 className="font-bold text-white mb-3">Key Implementation Points</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>▸ Frame stacking (4 grayscale frames)</li>
          <li>▸ Replay buffer with uniform sampling</li>
          <li>▸ Target network with periodic hard updates</li>
          <li>▸ ε-greedy exploration decay</li>
          <li>▸ Huber loss (smooth L1) for stability</li>
        </ul>
      </div>
    </div>
  );
}
