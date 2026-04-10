import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Hands-on ML projects: CNN classifiers, Mini-GPT, DQN, PPO, and more.',
};

const PROJECTS = [
  {
    slug: 'cnn-classifier',
    icon: '🖼️',
    title: 'CNN Image Classifier',
    track: 'PyTorch',
    badge: 'badge-blue',
    difficulty: 'Beginner',
    time: '4–6 hrs',
    desc: 'Build ResNet-18-style CNN from scratch, train on CIFAR-10, target >90% accuracy.',
    tags: ['CNN', 'Transfer Learning', 'CIFAR-10'],
  },
  {
    slug: 'mini-gpt',
    icon: '📝',
    title: 'Mini-GPT (Shakespeare)',
    track: 'Transformers',
    badge: 'badge-purple',
    difficulty: 'Intermediate',
    time: '8–12 hrs',
    desc: 'Character-level GPT with causal attention and sampling. Trains on a single GPU in ~20 min.',
    tags: ['GPT', 'Attention', 'LM'],
  },
  {
    slug: 'bert-finetune',
    icon: '🔍',
    title: 'BERT Sentiment Fine-tune',
    track: 'Transformers',
    badge: 'badge-purple',
    difficulty: 'Intermediate',
    time: '4–6 hrs',
    desc: 'Fine-tune BERT on SST-2 sentiment dataset using Hugging Face Trainer. LoRA variant included.',
    tags: ['BERT', 'Fine-tuning', 'NLP', 'LoRA'],
  },
  {
    slug: 'dqn-pong',
    icon: '🏓',
    title: 'DQN Atari Pong',
    track: 'RL',
    badge: 'badge-orange',
    difficulty: 'Intermediate',
    time: '10–14 hrs',
    desc: 'Full DQN with replay buffer and target network. Trains to beat the AI opponent in Pong.',
    tags: ['DQN', 'Atari', 'CNN'],
  },
  {
    slug: 'ppo-mujoco',
    icon: '🦾',
    title: 'PPO MuJoCo HalfCheetah',
    track: 'RL',
    badge: 'badge-orange',
    difficulty: 'Advanced',
    time: '12–18 hrs',
    desc: 'PPO + GAE implementation. Train HalfCheetah-v4 agent. Includes W&B logging + video recording.',
    tags: ['PPO', 'MuJoCo', 'Actor-Critic'],
  },
  {
    slug: 'inference-server',
    icon: '🚀',
    title: 'FastAPI Inference Server',
    track: 'Production',
    badge: 'badge-green',
    difficulty: 'Intermediate',
    time: '6–8 hrs',
    desc: 'Wrap a trained PyTorch model in FastAPI, add batching, Docker packaging, and a health endpoint.',
    tags: ['FastAPI', 'Docker', 'ONNX'],
  },
];

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-white mb-4">Projects</h1>
      <p className="text-slate-400 mb-12 max-w-2xl">
        Every concept is reinforced by building something real. Projects include starter code,
        grading rubrics, and stretch goals.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`}
                className="card group flex flex-col gap-3 hover:no-underline">
            <div className="flex items-start justify-between">
              <span className="text-3xl">{p.icon}</span>
              <span className={`badge ${p.badge} shrink-0`}>{p.track}</span>
            </div>
            <h2 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
              {p.title}
            </h2>
            <p className="text-slate-400 text-sm flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-1">
              {p.tags.map((t) => (
                <span key={t} className="badge badge-blue text-xs">{t}</span>
              ))}
            </div>
            <div className="flex gap-4 text-xs text-slate-500 pt-1 border-t border-[var(--border)]">
              <span>⚡ {p.difficulty}</span>
              <span>⏱ {p.time}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
