import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'PyTorch, Transformer, and RL courses for Python engineers.',
};

const COURSES = [
  {
    slug: 'pytorch-foundations',
    icon: '🔥',
    title: 'PyTorch Foundations',
    level: 'Beginner',
    badge: 'badge-blue',
    hours: '~20 hrs',
    modules: 8,
    desc: 'Build every component of a training pipeline from scratch. Understand autograd deeply.',
  },
  {
    slug: 'transformer-deep-dive',
    icon: '🤖',
    title: 'Transformer Architecture',
    level: 'Intermediate',
    badge: 'badge-purple',
    hours: '~30 hrs',
    modules: 10,
    desc: 'Implement attention, multi-head attention, positional encoding, and full GPT/BERT architectures.',
  },
  {
    slug: 'reinforcement-learning',
    icon: '🎮',
    title: 'Reinforcement Learning',
    level: 'Intermediate',
    badge: 'badge-orange',
    hours: '~28 hrs',
    modules: 9,
    desc: 'From Markov decision processes to Proximal Policy Optimization — all in PyTorch + Gymnasium.',
  },
];

export default function CoursesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-white mb-4">Courses</h1>
      <p className="text-slate-400 mb-12 max-w-2xl">
        Three tracks, each with video-style module breakdowns, code notebooks, and a capstone project.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {COURSES.map((c) => (
          <Link key={c.slug} href={`/courses/${c.slug}`}
                className="card group flex flex-col gap-4 hover:no-underline">
            <span className="text-4xl">{c.icon}</span>
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                {c.title}
              </h2>
              <span className={`badge ${c.badge} shrink-0 ml-2`}>{c.level}</span>
            </div>
            <p className="text-slate-400 text-sm flex-1">{c.desc}</p>
            <div className="flex gap-4 text-xs text-slate-500">
              <span>⏱ {c.hours}</span>
              <span>📦 {c.modules} modules</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
