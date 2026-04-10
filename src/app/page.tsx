import Link from 'next/link';

const TRACKS = [
  {
    icon: '🔥',
    title: 'PyTorch Foundations',
    slug: 'pytorch-foundations',
    badge: 'badge-blue',
    level: 'Beginner',
    desc: 'Tensors, autograd, training loops, and GPU acceleration — everything you need to think in PyTorch before you open a research paper.',
    projects: ['MNIST classifier from scratch', 'Custom Dataset + DataLoader', 'Transfer learning on CIFAR-10'],
    duration: '3–4 weeks',
  },
  {
    icon: '🤖',
    title: 'Transformer Architecture',
    slug: 'transformer-deep-dive',
    badge: 'badge-purple',
    level: 'Intermediate',
    desc: 'Attention is all you need — and you will fully implement it. Scaled dot-product → multi-head attention → full GPT-2 in PyTorch.',
    projects: ['Self-attention layer in NumPy', 'Build a mini-GPT', 'Fine-tune BERT for classification'],
    duration: '4–5 weeks',
  },
  {
    icon: '🎮',
    title: 'Reinforcement Learning',
    slug: 'reinforcement-learning',
    badge: 'badge-orange',
    level: 'Intermediate',
    desc: 'Bellman equations to PPO — derived, coded, and debugged. Train agents on CartPole, Atari Pong, and MuJoCo HalfCheetah.',
    projects: ['DQN for Atari Pong', 'Tianshou CartPole pipeline', 'PPO MuJoCo agent'],
    duration: '4–5 weeks',
  },
];

const STATS = [
  { value: '3',    label: 'Core Tracks' },
  { value: '30+',  label: 'Hands-on Projects' },
  { value: '100%', label: 'Python / PyTorch' },
  { value: '$0',   label: 'Cost' },
];

const WHY_ITEMS = [
  {
    icon: '📐',
    title: 'Math you can actually use',
    body: 'Every equation — from the Bellman optimality condition to GAE — is derived step by step, then mapped directly to PyTorch code. No hand-waving.',
  },
  {
    icon: '🔨',
    title: 'Build before you use',
    body: 'You implement attention from scratch before touching Hugging Face. You code DQN before using Tianshou. Libraries stop being magic boxes.',
  },
  {
    icon: '🏭',
    title: 'Production patterns',
    body: 'Type annotations, structured configs, reproducible seeds, W&B logging — from the first project. ML engineering is software engineering.',
  },
  {
    icon: '🖥️',
    title: 'Hardware-aware',
    body: 'Every project includes a hardware comparison table: what runs on an M4, what needs a 4090, what justifies an A100. No mystery box of GPU costs.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden">
          <div className="w-[800px] h-[400px] rounded-full opacity-20 blur-3xl"
               style={{ background: 'radial-gradient(ellipse, #6366f1 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="badge badge-purple mb-4">🚀 Project-driven curriculum</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
            Deep Learning for<br />
            <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg,#818cf8,#a78bfa,#f472b6)' }}>
              Python Engineers
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-4">
            Learn PyTorch, Transformers, and Reinforcement Learning by building real projects —
            not just reading theory. Every concept lands in production-quality code with tests, logging, and reproducible results.
          </p>
          <p className="text-sm text-slate-500 max-w-xl mx-auto mb-10">
            No paywalls. No video lectures behind a signup wall. Just structured content, starter code, and a clear roadmap from "I know Python" to "I train agents."
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/roadmap"
                  className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold
                             text-lg transition-colors shadow-lg shadow-brand-500/25">
              Start the Roadmap →
            </Link>
            <Link href="/projects"
                  className="px-6 py-3 rounded-xl border border-[var(--border)] text-slate-300
                             hover:text-white hover:border-slate-500 font-semibold text-lg transition-colors">
              Browse Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="card text-center">
              <div className="text-3xl font-extrabold text-brand-400">{value}</div>
              <div className="text-sm text-slate-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why this site */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Why this curriculum?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Most ML courses teach concepts in isolation. This one connects math → code → engineering from day one.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {WHY_ITEMS.map((item) => (
            <div key={item.title} className="card">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-bold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Three Core Tracks</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Sequential or parallel — pick your path. Each track culminates in a portfolio-ready project.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TRACKS.map((track) => (
            <Link key={track.slug} href={`/courses/${track.slug}`}
                  className="card group flex flex-col gap-4 hover:no-underline">
              <div className="flex items-start justify-between">
                <span className="text-4xl">{track.icon}</span>
                <div className="flex flex-col items-end gap-1">
                  <span className={`badge ${track.badge}`}>{track.level}</span>
                  <span className="text-xs text-slate-500">{track.duration}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                {track.title}
              </h3>
              <p className="text-slate-400 text-sm flex-1">{track.desc}</p>
              <ul className="space-y-1">
                {track.projects.map((p) => (
                  <li key={p} className="text-xs text-slate-500 flex items-start gap-2">
                    <span className="text-brand-400 mt-0.5">▸</span> {p}
                  </li>
                ))}
              </ul>
              <span className="text-sm text-brand-400 font-medium group-hover:underline">
                Start track →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Math & Hardware callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 grid sm:grid-cols-2 gap-6">
        <Link href="/math" className="card group">
          <div className="text-3xl mb-3">∑</div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
            Math Foundations
          </h3>
          <p className="text-slate-400 text-sm">
            Linear algebra, calculus, probability — illustrated with NumPy and PyTorch, not abstract symbols.
            Covers exactly what you need for deep learning, nothing more.
          </p>
        </Link>
        <Link href="/hardware" className="card group">
          <div className="text-3xl mb-3">🖥️</div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
            Hardware Guide
          </h3>
          <p className="text-slate-400 text-sm">
            GPU selection, cloud vs. local training, mixed-precision, and profiling PyTorch workloads.
            Every project includes a hardware recommendation table so you know what you actually need.
          </p>
        </Link>
      </section>

      {/* CTA Footer */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-24 text-center">
        <div className="card p-10"
             style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(167,139,250,0.06))',
                      border: '1px solid rgba(99,102,241,0.25)' }}>
          <h2 className="text-2xl font-bold text-white mb-3">Ready to start?</h2>
          <p className="text-slate-400 mb-6">
            The roadmap takes you from Python competency to training MuJoCo agents in 14–20 weeks.
            Follow it sequentially, or jump straight to the track you need.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/roadmap"
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-colors">
              View Full Roadmap
            </Link>
            <Link href="/courses"
                  className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-slate-300
                             hover:text-white hover:border-slate-500 font-semibold transition-colors">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
