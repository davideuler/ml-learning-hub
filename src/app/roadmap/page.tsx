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
  items: { label: string; href?: string; done?: boolean }[];
};

const PHASES: Phase[] = [
  {
    id: 1,
    title: 'Python & Math Foundations',
    duration: '2–3 weeks',
    icon: '🐍',
    color: 'border-green-500',
    items: [
      { label: 'NumPy vectorized ops & broadcasting' },
      { label: 'Linear algebra: matrices, eigenvectors', href: '/math#linear-algebra' },
      { label: 'Calculus: partial derivatives, chain rule', href: '/math#calculus' },
      { label: 'Probability & statistics basics', href: '/math#probability' },
      { label: 'Python typing, dataclasses, protocols' },
    ],
  },
  {
    id: 2,
    title: 'PyTorch Core',
    duration: '3–4 weeks',
    icon: '🔥',
    color: 'border-blue-500',
    items: [
      { label: 'Tensor ops, device management (CPU/GPU)', href: '/courses/pytorch-foundations' },
      { label: 'Autograd & computational graph' },
      { label: 'nn.Module, optimizers, loss functions' },
      { label: 'DataLoader, Dataset, transforms' },
      { label: 'Training loop patterns & best practices' },
      { label: 'Project: CNN image classifier', href: '/projects/cnn-classifier' },
    ],
  },
  {
    id: 3,
    title: 'Transformer Architecture',
    duration: '4–5 weeks',
    icon: '🤖',
    color: 'border-purple-500',
    items: [
      { label: 'Attention mechanism from scratch', href: '/courses/transformer-deep-dive' },
      { label: 'Positional encoding & multi-head attention' },
      { label: 'Encoder / decoder stacks' },
      { label: 'Pre-training vs fine-tuning (BERT, GPT)' },
      { label: 'Hugging Face ecosystem' },
      { label: 'Project: Build mini-GPT', href: '/projects/mini-gpt' },
      { label: 'Project: BERT fine-tune for NLP task', href: '/projects/bert-finetune' },
    ],
  },
  {
    id: 4,
    title: 'Reinforcement Learning',
    duration: '4–5 weeks',
    icon: '🎮',
    color: 'border-orange-500',
    items: [
      { label: 'MDPs, value functions, Bellman equations', href: '/courses/reinforcement-learning' },
      { label: 'Q-learning & DQN' },
      { label: 'Policy gradient (REINFORCE)' },
      { label: 'Actor-Critic (A2C, PPO)' },
      { label: 'RL libraries: Tianshou experiment pipeline', href: '/projects/tianshou-cartpole' },
      { label: 'Gymnasium / MuJoCo environments' },
      { label: 'Project: DQN for Atari Pong', href: '/projects/dqn-pong' },
      { label: 'Project: PPO MuJoCo agent', href: '/projects/ppo-mujoco' },
    ],
  },
  {
    id: 5,
    title: 'Production & Scale',
    duration: '2–3 weeks',
    icon: '🚀',
    color: 'border-teal-500',
    items: [
      { label: 'Mixed precision (torch.cuda.amp)', href: '/hardware#mixed-precision' },
      { label: 'Gradient checkpointing & memory profiling' },
      { label: 'Distributed training (DDP basics)', href: '/hardware#distributed' },
      { label: 'Model export: TorchScript & ONNX' },
      { label: 'FastAPI + Docker inference server' },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">Learning Roadmap</h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          A structured path from Python competency to production ML engineer.
          Estimated total: <strong className="text-white">14–20 weeks</strong> at 10–15 hrs/week.
          Each phase ends with a real project.
        </p>
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
                <div className="flex flex-wrap items-baseline gap-3 mb-3">
                  <h2 className="text-xl font-bold text-white">
                    Phase {phase.id}: {phase.title}
                  </h2>
                  <span className="badge badge-blue text-xs">{phase.duration}</span>
                </div>

                <ul className="space-y-2">
                  {phase.items.map((item) => (
                    <li key={item.label} className="flex items-start gap-3 text-sm">
                      <span className="text-brand-400 mt-0.5">▸</span>
                      {item.href ? (
                        <Link href={item.href}
                              className="text-slate-300 hover:text-brand-300 transition-colors">
                          {item.label}
                        </Link>
                      ) : (
                        <span className="text-slate-400">{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
