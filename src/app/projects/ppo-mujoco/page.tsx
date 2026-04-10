import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Project: PPO MuJoCo HalfCheetah' };

export default function PPOMuJoCoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/projects" className="hover:text-slate-300">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-white">PPO MuJoCo</span>
      </nav>
      <span className="text-5xl">🦾</span>
      <h1 className="text-3xl font-extrabold text-white mt-4 mb-4">PPO MuJoCo HalfCheetah</h1>
      <div className="flex gap-2 mb-6">
        <span className="badge badge-orange">RL</span>
        <span className="badge badge-purple">Advanced</span>
      </div>
      <p className="text-slate-400 mb-8">
        Full PPO implementation with Generalised Advantage Estimation. Train a HalfCheetah-v4
        agent to sprint. Includes W&amp;B integration and video recording.
        Full guide in v0.2.
      </p>
      <div className="card">
        <h2 className="font-bold text-white mb-3">PPO Checklist</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>▸ Actor-Critic with shared trunk</li>
          <li>▸ GAE (λ=0.95) advantage estimates</li>
          <li>▸ Clipped surrogate objective (ε=0.2)</li>
          <li>▸ Value function clipping</li>
          <li>▸ Entropy bonus for exploration</li>
          <li>▸ Multiple epochs per rollout (K=10)</li>
        </ul>
      </div>
    </div>
  );
}
