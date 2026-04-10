import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Learning Roadmap',
  description: 'Step-by-step roadmap from Python basics to production ML: PyTorch, Transformers, RL.',
};

type Phase = {
  id: number;
  title: string;
  duration: string;
  icon: string;
  color: string;
  summary: string;
  items: { label: string; href?: string; note?: string }[];
};

const PHASES: Phase[] = [
  {
    id: 1,
    title: 'Python & Math Foundations',
    duration: '2–3 weeks',
    icon: '🐍',
    color: 'border-green-500',
    summary: 'The bedrock. Skip it if you are already comfortable with NumPy broadcasting and can derive a partial derivative by hand.',
    items: [
      { label: 'NumPy vectorised ops & broadcasting' },
      { label: 'Linear algebra: matrices, eigenvectors, SVD', href: '/math#linear-algebra' },
      { label: 'Calculus: partial derivatives, chain rule', href: '/math#calculus' },
      { label: 'Probability & statistics: expectation, Bayes, MLE', href: '/math#probability' },
      { label: 'Python typing, dataclasses, protocols', note: 'Used throughout all projects' },
    ],
  },
  {
    id: 2,
    title: 'PyTorch Core',
    duration: '3–4 weeks',
    icon: '🔥',
    color: 'border-blue-500',
    summary: 'Build the mental model for tensors, autograd, and training loops before adding neural network complexity.',
    items: [
      { label: 'Tensor ops, device management (CPU/GPU/MPS)', href: '/courses/pytorch-foundations' },
      { label: 'Autograd & computational graph — how backward() works' },
      { label: 'nn.Module, optimisers, loss functions' },
      { label: 'DataLoader, Dataset, transforms — efficient data pipelines' },
      { label: 'Training loop patterns: gradient clipping, LR scheduling' },
      { label: 'Project: CNN image classifier', href: '/projects/cnn-classifier', note: 'First portfolio project' },
    ],
  },
  {
    id: 3,
    title: 'Transformer Architecture',
    duration: '4–5 weeks',
    icon: '🤖',
    color: 'border-purple-500',
    summary: 'The architecture behind every frontier model. You implement each component from scratch so none of it is a black box.',
    items: [
      { label: 'Scaled dot-product attention — derived from scratch', href: '/courses/transformer-deep-dive' },
      { label: 'Positional encoding & multi-head attention' },
      { label: 'Layer norm, residual connections, feed-forward blocks' },
      { label: 'Encoder / decoder stacks — when you need each' },
      { label: 'Pre-training vs fine-tuning: BERT vs GPT paradigms' },
      { label: 'Hugging Face: Trainer, tokenisers, model hub' },
      { label: 'Project: Build mini-GPT', href: '/projects/mini-gpt', note: 'Generative LM from scratch' },
      { label: 'Project: BERT fine-tune for NLP task', href: '/projects/bert-finetune', note: 'Classification pipeline' },
    ],
  },
  {
    id: 4,
    title: 'Reinforcement Learning',
    duration: '4–5 weeks',
    icon: '🎮',
    color: 'border-orange-500',
    summary: 'Sequential decision-making from first principles. The math section on the RL course page maps directly to every algorithm you implement.',
    items: [
      { label: 'MDPs, Bellman equations, value functions — formal + intuitive', href: '/courses/reinforcement-learning' },
      { label: 'Dynamic programming: policy & value iteration' },
      { label: 'Monte Carlo & temporal difference methods' },
      { label: 'Q-learning & Deep Q-Networks (DQN)' },
      { label: 'Policy gradient theorem & REINFORCE derivation' },
      { label: 'Actor-Critic (A2C) — advantage function & shared networks' },
      { label: 'PPO — clip objective, GAE, entropy bonus' },
      { label: 'RL libraries: Tianshou experiment pipeline', href: '/projects/tianshou-cartpole' },
      { label: 'Gymnasium / MuJoCo environment setup & wrappers' },
      { label: 'Project: DQN for Atari Pong', href: '/projects/dqn-pong', note: 'Complete CNN + replay buffer' },
      { label: 'Project: PPO MuJoCo HalfCheetah', href: '/projects/ppo-mujoco', note: 'Capstone — full PPO from scratch' },
    ],
  },
  {
    id: 5,
    title: 'Production & Scale',
    duration: '2–3 weeks',
    icon: '🚀',
    color: 'border-teal-500',
    summary: 'The gap between working code and code you can run overnight at scale. Covers what changes when models grow from laptop to cluster.',
    items: [
      { label: 'Mixed precision training (torch.amp)', href: '/hardware#mixed-precision' },
      { label: 'Gradient checkpointing & memory profiling' },
      { label: 'Distributed training: DDP basics, torchrun', href: '/hardware#distributed' },
      { label: 'Model export: TorchScript, ONNX, torch.compile' },
      { label: 'FastAPI + Docker inference server', href: '/projects/inference-server' },
      { label: 'Hyperparameter sweeps with W&B Sweeps or Optuna' },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">Learning Roadmap</h1>
        <p className="text-slate-400 text-lg max-w-2xl mb-4">
          A structured path from Python competency to production ML engineer.
          Estimated total: <strong className="text-white">14–20 weeks</strong> at 10–15 hrs/week.
          Each phase ends with at least one real project you can put in a portfolio.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">Phase 1–2: Foundation</span>
          <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">Phase 3: Transformers</span>
          <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">Phase 4: RL</span>
          <span className="px-3 py-1 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/30">Phase 5: Scale</span>
        </div>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-[var(--border)]" />

        <div className="space-y-10">
          {PHASES.map((phase) => (
            <div key={phase.id} className="relative flex gap-6">
              {/* Circle */}
              <div className={`relative z-10 flex-shrink-0 w-11 h-11 rounded-full border-2 ${phase.color}
                               bg-[var(--bg-card)] flex items-center justify-center text-xl`}>
                {phase.icon}
              </div>

              <div className="flex-1 pb-4">
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h2 className="text-xl font-bold text-white">
                    Phase {phase.id}: {phase.title}
                  </h2>
                  <span className="badge badge-blue text-xs">{phase.duration}</span>
                </div>

                <p className="text-sm text-slate-500 mb-3 max-w-xl">{phase.summary}</p>

                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item.label} className="flex items-start gap-3 text-sm">
                      <span className="text-brand-400 mt-0.5 shrink-0">▸</span>
                      <span className="flex flex-wrap items-center gap-2">
                        {item.href ? (
                          <Link href={item.href}
                                className="text-slate-300 hover:text-brand-300 transition-colors">
                            {item.label}
                          </Link>
                        ) : (
                          <span className="text-slate-400">{item.label}</span>
                        )}
                        {item.note && (
                          <span className="text-xs text-slate-600 italic">{item.note}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 card text-center p-8"
           style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.10), rgba(249,115,22,0.06))',
                    border: '1px solid rgba(99,102,241,0.20)' }}>
        <h3 className="text-xl font-bold text-white mb-2">Start with what you know</h3>
        <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
          Comfortable with Python and NumPy? Skip Phase 1 and start with{' '}
          <Link href="/courses/pytorch-foundations" className="text-brand-300 hover:underline">PyTorch Foundations</Link>.
          Already know PyTorch? Jump straight to{' '}
          <Link href="/courses/transformer-deep-dive" className="text-brand-300 hover:underline">Transformers</Link> or{' '}
          <Link href="/courses/reinforcement-learning" className="text-brand-300 hover:underline">RL</Link>.
        </p>
        <Link href="/projects"
              className="inline-block px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-colors">
          Browse All Projects →
        </Link>
      </div>
    </div>
  );
}
