import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Project: PPO MuJoCo HalfCheetah' };

const STEPS = [
  {
    title: 'Build the rollout pipeline',
    body: 'Set up Gymnasium HalfCheetah-v4, vectorized environments, rollout storage, and observation normalisation. Keep data collection and optimisation cleanly separated.',
  },
  {
    title: 'Implement actor-critic networks',
    body: 'Use Gaussian policy outputs for continuous control, a value head for returns, and orthogonal initialisation to stabilise early learning.',
  },
  {
    title: 'Add GAE and PPO clipping',
    body: 'Compute advantages with GAE, normalise them per batch, then optimise the clipped surrogate objective with entropy bonus and value loss.',
  },
  {
    title: 'Tune batch structure',
    body: 'Experiment with horizon length, minibatch size, number of epochs, and learning rate. RL engineering is mostly about controlling variance, not writing more code.',
  },
  {
    title: 'Compare against a library baseline',
    body: 'After the scratch implementation works, compare reward curves and code complexity against Tianshou or Stable-Baselines style abstractions.',
  },
];

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
        This project is where RL stops being toy code and starts looking like real experiment engineering.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { k: 'Environment', v: 'HalfCheetah-v4' },
          { k: 'Target', v: '5k+ reward' },
          { k: 'Time', v: '8–16 hrs' },
          { k: 'Hardware', v: '4090 / A100' },
        ].map(({ k, v }) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-slate-500">{k}</div>
            <div className="font-bold text-white mt-1">{v}</div>
          </div>
        ))}
      </div>
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
      <div className="space-y-4 mt-8">
        {STEPS.map((step, idx) => (
          <div key={step.title} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-orange-400/40 font-mono w-8 shrink-0">{idx + 1}</span>
            <div>
              <h3 className="font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 card border-orange-500/30">
        <h2 className="font-bold text-white mb-3">Hardware guidance</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>▸ <strong className="text-white">RTX 4090:</strong> Recommended baseline for MuJoCo PPO training, video rendering, and a few seed runs.</li>
          <li>▸ <strong className="text-white">A100:</strong> Better when you want faster turnaround or parallel ablations across several seeds.</li>
          <li>▸ <strong className="text-white">8x L20:</strong> Appropriate for large hyperparameter sweeps or teaching distributed RL workflows.</li>
          <li>▸ <strong className="text-white">Mac M4 Pro 128G:</strong> Fine for code development and small smoke tests, but not the target machine for full MuJoCo experiments.</li>
        </ul>
      </div>
    </div>
  );
}
