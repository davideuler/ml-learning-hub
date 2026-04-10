import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Reinforcement Learning',
  description: 'From MDPs to PPO: RL in PyTorch and Gymnasium.',
};

const MODULES = [
  { id: 1, title: 'MDPs & Bellman Equations',       desc: 'States, actions, rewards, discount factor, value functions.' },
  { id: 2, title: 'Dynamic Programming',             desc: 'Policy evaluation, policy iteration, value iteration — GridWorld.' },
  { id: 3, title: 'Monte Carlo Methods',             desc: 'On-policy MC, off-policy MC, importance sampling.' },
  { id: 4, title: 'Temporal Difference Learning',   desc: 'TD(0), SARSA, Q-learning — implement each on Taxi-v3.' },
  { id: 5, title: 'Deep Q-Networks (DQN)',           desc: 'Experience replay, target network, epsilon-greedy, Atari wrapper.' },
  { id: 6, title: 'Policy Gradient (REINFORCE)',     desc: 'Log-derivative trick, baseline subtraction, variance reduction.' },
  { id: 7, title: 'Actor-Critic (A2C)',              desc: 'Advantage function, shared networks, n-step returns.' },
  { id: 8, title: 'Proximal Policy Optimization',   desc: 'Clip objective, GAE, entropy regularization, PPO in ~200 lines.' },
  { id: 9, title: 'RL Engineering with Tianshou',   desc: 'Policies, collectors, vector replay buffers, trainer abstractions, and logger hooks.' },
  { id: 10, title: 'Project: Tianshou CartPole Pipeline', desc: 'Package DQN training with Tianshou into a configurable experiment workflow.' },
  { id: 11, title: 'Capstone: PPO MuJoCo Agent',     desc: 'Train a HalfCheetah-v4 agent from scratch, then compare against a library-based implementation.', isCapstone: true },
];

export default function RLPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/courses" className="hover:text-slate-300">Courses</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Reinforcement Learning</span>
      </nav>

      <div className="flex items-start gap-4 mb-6">
        <span className="text-5xl">🎮</span>
        <div>
          <span className="badge badge-orange mb-2">Intermediate</span>
          <h1 className="text-4xl font-extrabold text-white">Reinforcement Learning</h1>
        </div>
      </div>

      <p className="text-slate-400 text-lg mb-4 max-w-2xl">
        From Markov chains to PPO and Tianshou in 11 modules. You first implement core agents by hand,
        then learn how to scale experiments with a real RL library instead of ad hoc scripts.
      </p>

      <div className="flex gap-6 text-sm text-slate-500 mb-12">
        <span>⏱ ~34 hours</span>
        <span>📦 11 modules</span>
        <span>🐍 PyTorch 2.x, Gymnasium 0.29+, Tianshou</span>
      </div>

      <div className="card mb-10">
        <h2 className="font-semibold text-white mb-2">Prerequisites</h2>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>▸ PyTorch Foundations (training loops, nn.Module)</li>
          <li>▸ Probability basics (expectation, conditional probability)</li>
          <li>▸ Comfort reading small research papers and library docs</li>
        </ul>
      </div>

      <div className="card mb-10">
        <h2 className="font-semibold text-white mb-2">Why Tianshou matters</h2>
        <p className="text-sm text-slate-400">
          Hand-written RL code teaches fundamentals. Tianshou teaches how to run repeatable experiments,
          swap policies without rewriting everything, and structure collectors, buffers, and trainers the
          way an engineering team actually would.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Modules</h2>
      <div className="space-y-3">
        {MODULES.map((mod) => (
          <div key={mod.id}
               className={`card flex items-start gap-4 ${mod.isCapstone ? 'border-orange-500/50' : ''}`}>
            <span className={`text-lg font-mono font-bold shrink-0 ${mod.isCapstone ? 'text-orange-400' : 'text-slate-600'}`}>
              {String(mod.id).padStart(2, '0')}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{mod.title}</h3>
                {mod.isCapstone && <span className="badge badge-orange">Capstone</span>}
              </div>
              <p className="text-sm text-slate-400 mt-0.5">{mod.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 rounded-2xl"
           style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,179,8,0.08))',
                    border: '1px solid rgba(249,115,22,0.3)' }}>
        <h3 className="text-lg font-bold text-white mb-2">🏁 Capstone: PPO MuJoCo Agent</h3>
        <p className="text-slate-400 text-sm mb-4">
          Implement full PPO (clip + GAE) and train a HalfCheetah-v4 agent to run forward.
          Then compare your hand-built trainer against a library-led workflow so you understand both fundamentals and scale.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects/ppo-mujoco"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500
                           text-white text-sm font-semibold transition-colors">
            View PPO Guide →
          </Link>
          <Link href="/projects/tianshou-cartpole"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-500/40 hover:border-orange-400
                           text-orange-200 text-sm font-semibold transition-colors">
            View Tianshou Project →
          </Link>
        </div>
      </div>
    </div>
  );
}
