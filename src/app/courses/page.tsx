import type { Metadata } from 'next';
import Link from 'next/link';
import { BilingualText } from '@/components/common/BilingualText';

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
    hours: '~34 hrs',
    modules: 11,
    desc: 'From Markov decision processes to PPO and Tianshou engineering workflows, all in PyTorch + Gymnasium.',
  },
];

export default function CoursesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
        <BilingualText en="Courses" zh="课程体系" />
      </h1>
      <p className="text-[var(--text-muted)] mb-12 max-w-2xl">
        <BilingualText
          en="Three tracks, each with step-by-step modules, code notebooks, math foundations, and a capstone project."
          zh="三条主线课程，每条都包含循序渐进的模块、代码实践、数学基础和压轴项目。"
        />
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {COURSES.map((c) => (
          <Link key={c.slug} href={`/courses/${c.slug}`}
                className="card group flex flex-col gap-4 hover:no-underline">
            <span className="text-4xl">{c.icon}</span>
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-brand-300 transition-colors">
                {c.title}
              </h2>
              <span className={`badge ${c.badge} shrink-0 ml-2`}>{c.level}</span>
            </div>
            <p className="text-[var(--text-muted)] text-sm flex-1">{c.desc}</p>
            <div className="flex gap-4 text-xs text-[var(--text-muted)]">
              <span>⏱ {c.hours}</span>
              <span>📦 {c.modules} modules</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
