import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: Tianshou CartPole Pipeline',
  description: 'Use Tianshou to build a reusable DQN experiment pipeline on CartPole-v1.',
};

const STEPS = [
  {
    title: 'Model the problem like an engineer',
    body: 'Start with CartPole-v1 so you can focus on the library workflow, not environment complexity. Define config, seed handling, and logging before training.',
  },
  {
    title: 'Build policy and collectors',
    body: 'Implement a small MLP Q-network, wrap it in Tianshou DQNPolicy, and use Collector with vectorised environments for train and test loops.',
  },
  {
    title: 'Add replay buffer and trainer',
    body: 'Use VectorReplayBuffer, offpolicy_trainer, and callback hooks. This is where you move from script hacking to reusable experiment structure.',
  },
  {
    title: 'Instrument and compare',
    body: 'Track reward curves, training speed, and code size. Compare your Tianshou setup against the handwritten DQN implementation to understand abstraction tradeoffs.',
  },
  {
    title: 'Generalise the template',
    body: 'Swap CartPole for LunarLander or Atari later. The point of this project is not just one environment, but a pipeline you can reuse across RL experiments.',
  },
];

export default function TianshouCartPolePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/projects" className="hover:text-slate-300">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Tianshou CartPole</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">🧰</span>
        <div>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-orange">RL</span>
            <span className="badge badge-blue">Intermediate</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Tianshou CartPole Pipeline</h1>
        </div>
      </div>

      <p className="text-slate-400 mb-8">
        Learn a serious RL library without drowning in complexity. This project uses Tianshou to turn a simple
        DQN agent into a reusable experiment pipeline with collectors, replay buffers, vectorised envs, and trainer abstractions.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { k: 'Environment', v: 'CartPole-v1' },
          { k: 'Library', v: 'Tianshou' },
          { k: 'Time', v: '6–8 hrs' },
          { k: 'Hardware', v: 'Any' },
        ].map(({ k, v }) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-slate-500">{k}</div>
            <div className="font-bold text-white mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="card mb-8">
        <h2 className="font-bold text-white mb-3">What you learn</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>▸ How RL libraries separate policy logic, data collection, and optimisation</li>
          <li>▸ How to configure vectorized environments and replay buffers cleanly</li>
          <li>▸ When a framework speeds you up, and when it hides too much</li>
          <li>▸ How to design an RL codebase that can grow beyond a single toy notebook</li>
        </ul>
      </div>

      <div className="space-y-4">
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
          <li>▸ <strong className="text-white">Mac M4 Pro 128G:</strong> Excellent for this project. You do not need a GPU.</li>
          <li>▸ <strong className="text-white">RTX 4090:</strong> Useful only if you extend the pipeline to image observations or many parallel runs.</li>
          <li>▸ <strong className="text-white">A100:</strong> Not necessary for CartPole, but relevant when the same template is ported to larger environments.</li>
          <li>▸ <strong className="text-white">8x L20:</strong> Reserved for large-scale sweeps, not the baseline exercise.</li>
        </ul>
      </div>

      <div className="mt-6 card border-orange-500/30">
        <p className="text-sm text-slate-400">
          <strong className="text-white">Recommended sequence:</strong> first finish the hand-written{' '}
          <Link href="/projects/dqn-pong" className="text-brand-300 hover:underline">DQN project</Link>, then do this Tianshou project.
          That way you know what the library is abstracting away instead of cargo-culting the API.
        </p>
      </div>
    </div>
  );
}
