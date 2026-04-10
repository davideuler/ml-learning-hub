import Link from 'next/link';

const TRACKS = [
  {
    icon: '🔥',
    title: 'PyTorch Foundations',
    slug: 'pytorch-foundations',
    badge: 'badge-blue',
    level: 'Beginner',
    desc: 'Tensors, autograd, training loops, and GPU acceleration — everything you need to think in PyTorch.',
    projects: ['MNIST classifier from scratch', 'Custom Dataset + DataLoader', 'Transfer learning on CIFAR-10'],
  },
  {
    icon: '🤖',
    title: 'Transformer Architecture',
    slug: 'transformer-deep-dive',
    badge: 'badge-purple',
    level: 'Intermediate',
    desc: 'Attention is all you need — and you will fully implement it. From scaled dot-product to GPT-2.',
    projects: ['Self-attention layer in NumPy', 'Build a mini-GPT', 'Fine-tune BERT for classification'],
  },
  {
    icon: '🎮',
    title: 'Reinforcement Learning',
    slug: 'reinforcement-learning',
    badge: 'badge-orange',
    level: 'Intermediate',
    desc: 'From Markov chains to PPO. Train agents in MuJoCo, Atari, and custom environments.',
    projects: ['Policy gradient on CartPole', 'DQN for Atari Pong', 'PPO agent for MuJoCo Ant'],
  },
];

const STATS = [
  { value: '3',    label: 'Core Tracks' },
  { value: '30+',  label: 'Hands-on Projects' },
  { value: '100%', label: 'Python / PyTorch' },
  { value: '0$',   label: 'Cost' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        {/* Glow backdrop */}
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
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Learn PyTorch, Transformers, and Reinforcement Learning by building real projects —
            not just reading theory. Each concept lands in production-quality code.
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

      {/* Tracks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Three Core Tracks</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Sequential or parallel — pick your path. Each track culminates in a portfolio project.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TRACKS.map((track) => (
            <Link key={track.slug} href={`/courses/${track.slug}`}
                  className="card group flex flex-col gap-4 hover:no-underline">
              <div className="flex items-start justify-between">
                <span className="text-4xl">{track.icon}</span>
                <span className={`badge ${track.badge}`}>{track.level}</span>
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
            Linear algebra, calculus, probability — illustrated with NumPy and PyTorch, not
            abstract symbols. Focus on what you actually need for deep learning.
          </p>
        </Link>
        <Link href="/hardware" className="card group">
          <div className="text-3xl mb-3">🖥️</div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
            Hardware Guide
          </h3>
          <p className="text-slate-400 text-sm">
            GPU selection, cloud vs. local training, mixed-precision, and profiling your
            PyTorch workloads. Make every CUDA core count.
          </p>
        </Link>
      </section>
    </>
  );
}
