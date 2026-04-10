'use client';

import Link from 'next/link';
import { useSitePreferences } from '@/components/providers/SiteProviders';

const TRACKS = [
  {
    icon: '🔥',
    slug: 'pytorch-foundations',
    badge: 'badge-blue',
    level: { en: 'Beginner', zh: '入门' },
    title: { en: 'PyTorch Foundations', zh: 'PyTorch 基础' },
    desc: {
      en: 'Tensors, autograd, training loops, and GPU acceleration, everything you need to think in PyTorch before you open a research paper.',
      zh: '从 tensor、autograd、训练循环到 GPU 加速，在你开始读论文之前，先真正建立 PyTorch 思维。',
    },
    projects: {
      en: ['MNIST classifier from scratch', 'Custom Dataset + DataLoader', 'Transfer learning on CIFAR-10'],
      zh: ['从零实现 MNIST 分类器', '自定义 Dataset + DataLoader', '在 CIFAR-10 上做迁移学习'],
    },
    duration: { en: '3–4 weeks', zh: '3–4 周' },
  },
  {
    icon: '🤖',
    slug: 'transformer-deep-dive',
    badge: 'badge-purple',
    level: { en: 'Intermediate', zh: '进阶' },
    title: { en: 'Transformer Architecture', zh: 'Transformer 架构' },
    desc: {
      en: 'Attention is all you need, and you will fully implement it. Scaled dot-product to multi-head attention to a full GPT in PyTorch.',
      zh: '不只是“Attention is all you need”，而是亲手把它完整实现。从缩放点积注意力，到多头注意力，再到完整 GPT。',
    },
    projects: {
      en: ['Self-attention layer in NumPy', 'Build a mini-GPT', 'Fine-tune BERT for classification'],
      zh: ['用 NumPy 实现 self-attention', '构建 mini-GPT', '微调 BERT 做分类'],
    },
    duration: { en: '4–5 weeks', zh: '4–5 周' },
  },
  {
    icon: '🎮',
    slug: 'reinforcement-learning',
    badge: 'badge-orange',
    level: { en: 'Intermediate', zh: '进阶' },
    title: { en: 'Reinforcement Learning', zh: '强化学习' },
    desc: {
      en: 'Bellman equations to PPO, derived, coded, and debugged. Train agents on CartPole, Atari Pong, and MuJoCo HalfCheetah.',
      zh: '从 Bellman 方程到 PPO，全部推导、编码并调试。训练 CartPole、Atari Pong 和 MuJoCo HalfCheetah 智能体。',
    },
    projects: {
      en: ['DQN for Atari Pong', 'Tianshou CartPole pipeline', 'PPO MuJoCo agent'],
      zh: ['Atari Pong 的 DQN', 'Tianshou CartPole 流水线', 'PPO MuJoCo 智能体'],
    },
    duration: { en: '4–5 weeks', zh: '4–5 周' },
  },
] as const;

const STATS = {
  en: [
    { value: '3', label: 'Core Tracks' },
    { value: '30+', label: 'Hands-on Projects' },
    { value: '100%', label: 'Python / PyTorch' },
    { value: '$0', label: 'Cost' },
  ],
  zh: [
    { value: '3', label: '核心主线' },
    { value: '30+', label: '实战项目' },
    { value: '100%', label: 'Python / PyTorch' },
    { value: '¥0', label: '学习成本' },
  ],
};

const WHY_ITEMS = {
  en: [
    {
      icon: '📐',
      title: 'Math you can actually use',
      body: 'Every equation, from Bellman optimality to GAE, is mapped directly to PyTorch code. No hand-waving.',
    },
    {
      icon: '🔨',
      title: 'Build before you use',
      body: 'You implement attention from scratch before touching Hugging Face. You code DQN before using Tianshou.',
    },
    {
      icon: '🏭',
      title: 'Production patterns',
      body: 'Type annotations, structured configs, reproducible seeds, and experiment logging are part of the learning path.',
    },
    {
      icon: '🖥️',
      title: 'Hardware-aware',
      body: 'Every project explains what runs on M4, 4090, A100, or multi-GPU machines. No mystery hardware budgeting.',
    },
  ],
  zh: [
    {
      icon: '📐',
      title: '真正能用上的数学',
      body: '从 Bellman 最优性到 GAE，每个公式都直接映射到 PyTorch 代码，不搞空泛讲解。',
    },
    {
      icon: '🔨',
      title: '先自己实现，再用库',
      body: '你会先从零实现 attention，再接触 Hugging Face；先写 DQN，再上 Tianshou。',
    },
    {
      icon: '🏭',
      title: '工程化训练方式',
      body: '类型标注、结构化配置、可复现随机种子、实验日志，这些都不是附加项，而是主线内容。',
    },
    {
      icon: '🖥️',
      title: '硬件感知',
      body: '每个项目都会说明 M4、4090、A100、多卡机器分别适合什么，不再靠猜。',
    },
  ],
};

export default function HomePage() {
  const { locale } = useSitePreferences();
  const isZh = locale === 'zh';

  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden">
          <div className="w-[800px] h-[400px] rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(ellipse, #6366f1 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="badge badge-purple mb-4">🚀 {isZh ? '项目驱动课程体系' : 'Project-driven curriculum'}</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-[var(--text-primary)] leading-tight mb-6">
            {isZh ? '面向 Python 工程师的' : 'Deep Learning for'}<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#818cf8,#a78bfa,#f472b6)' }}>
              {isZh ? '深度学习实战路线' : 'Python Engineers'}
            </span>
          </h1>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-4">
            {isZh
              ? '通过真实项目学习 PyTorch、Transformer 和强化学习，而不是只看理论。每个概念最终都落到可运行、可调试、可复现的工程代码上。'
              : 'Learn PyTorch, Transformers, and Reinforcement Learning by building real projects, not just reading theory. Every concept lands in production-quality code with tests, logging, and reproducible results.'}
          </p>
          <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto mb-10">
            {isZh
              ? '没有付费墙，没有逼你注册的视频站，只有结构化内容、starter code，以及从“我会 Python”走到“我能训练智能体”的清晰路线。'
              : 'No paywalls. No signup wall. Just structured content, starter code, and a clear roadmap from “I know Python” to “I train agents.”'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/roadmap" className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold text-lg transition-colors shadow-lg shadow-brand-500/25">
              {isZh ? '开始学习路线 →' : 'Start the Roadmap →'}
            </Link>
            <Link href="/projects" className="px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text-primary)] hover:border-slate-500 font-semibold text-lg transition-colors">
              {isZh ? '浏览项目' : 'Browse Projects'}
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS[locale].map(({ value, label }) => (
            <div key={label} className="card text-center">
              <div className="text-3xl font-extrabold text-brand-400">{value}</div>
              <div className="text-sm text-[var(--text-muted)] mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">{isZh ? '为什么这套课程值得学？' : 'Why this curriculum?'}</h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            {isZh ? '大多数 ML 课程把概念拆开教，而这里从第一天开始就把数学、代码和工程连在一起。' : 'Most ML courses teach concepts in isolation. This one connects math, code, and engineering from day one.'}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {WHY_ITEMS[locale].map((item) => (
            <div key={item.title} className="card">
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-bold text-[var(--text-primary)] mb-1">{item.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-3">{isZh ? '三条核心学习主线' : 'Three Core Tracks'}</h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto">
            {isZh ? '你可以顺序学，也可以按目标并行推进。每条主线最终都落到能写进作品集的项目。' : 'Sequential or parallel, pick your path. Each track culminates in a portfolio-ready project.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TRACKS.map((track) => (
            <Link key={track.slug} href={`/courses/${track.slug}`} className="card group flex flex-col gap-4 hover:no-underline">
              <div className="flex items-start justify-between">
                <span className="text-4xl">{track.icon}</span>
                <div className="flex flex-col items-end gap-1">
                  <span className={`badge ${track.badge}`}>{track.level[locale]}</span>
                  <span className="text-xs text-[var(--text-muted)]">{track.duration[locale]}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-brand-300 transition-colors">{track.title[locale]}</h3>
              <p className="text-[var(--text-muted)] text-sm flex-1">{track.desc[locale]}</p>
              <ul className="space-y-1">
                {track.projects[locale].map((p) => (
                  <li key={p} className="text-xs text-[var(--text-muted)] flex items-start gap-2">
                    <span className="text-brand-400 mt-0.5">▸</span> {p}
                  </li>
                ))}
              </ul>
              <span className="text-sm text-brand-400 font-medium group-hover:underline">
                {isZh ? '进入主线 →' : 'Start track →'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-24 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Link href="/math" className="card group">
          <div className="text-3xl mb-3">∑</div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-brand-300 transition-colors">{isZh ? '数学基础' : 'Math Foundations'}</h3>
          <p className="text-[var(--text-muted)] text-sm">
            {isZh ? '线性代数、微积分、概率统计，都结合 NumPy 和 PyTorch 场景讲解，只讲深度学习真正用得上的部分。' : 'Linear algebra, calculus, probability, illustrated with NumPy and PyTorch instead of abstract symbolism.'}
          </p>
        </Link>
        <Link href="/systems/training-inference" className="card group">
          <div className="text-3xl mb-3">⚙️</div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-brand-300 transition-colors">{isZh ? '训练与推理' : 'Training & Inference'}</h3>
          <p className="text-[var(--text-muted)] text-sm">
            {isZh ? 'PyTorch、分布式训练、混合精度、vLLM、KV cache、profiling 和显存管理的双语技术总览。' : 'A bilingual overview of PyTorch, distributed training, mixed precision, vLLM, KV cache, profiling, and memory management.'}
          </p>
        </Link>
        <Link href="/systems/optimization-concepts" className="card group">
          <div className="text-3xl mb-3">🧭</div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-brand-300 transition-colors">{isZh ? '优化概念' : 'Optimization Concepts'}</h3>
          <p className="text-[var(--text-muted)] text-sm">
            {isZh ? 'reward design、credit assignment、探索与利用、off-policy / on-policy 等关键概念。' : 'Core concepts like reward design, credit assignment, exploration vs exploitation, and off-policy vs on-policy.'}
          </p>
        </Link>
        <Link href="/systems/model-thinking" className="card group">
          <div className="text-3xl mb-3">🧠</div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-brand-300 transition-colors">{isZh ? '模型判断力' : 'Model Thinking'}</h3>
          <p className="text-[var(--text-muted)] text-sm">
            {isZh ? '理解长上下文、RAG、LoRA、幻觉、量化、KV cache 成本与模型架构 tradeoff。' : 'Understand long context, RAG, LoRA, hallucination, quantization, KV cache cost, and architecture tradeoffs.'}
          </p>
        </Link>
        <Link href="/hardware" className="card group">
          <div className="text-3xl mb-3">🖥️</div>
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-brand-300 transition-colors">{isZh ? '硬件指南' : 'Hardware Guide'}</h3>
          <p className="text-[var(--text-muted)] text-sm">
            {isZh ? 'GPU 选择、云端和本地训练、混合精度、性能分析，每个项目都带硬件建议，不再盲猜。' : 'GPU selection, cloud vs local training, mixed precision, and profiling, with hardware recommendation tables for each project.'}
          </p>
        </Link>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-24 text-center">
        <div className="card p-10" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(167,139,250,0.06))', border: '1px solid rgba(99,102,241,0.25)' }}>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{isZh ? '准备开始了吗？' : 'Ready to start?'}</h2>
          <p className="text-[var(--text-muted)] mb-6">
            {isZh ? '这条路线会带你在 14–20 周内，从熟悉 Python 到能训练 MuJoCo 智能体。你可以按顺序学，也可以跳到最需要的部分。' : 'The roadmap takes you from Python competency to training MuJoCo agents in 14–20 weeks. Follow it sequentially, or jump straight to the track you need.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/roadmap" className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-colors">
              {isZh ? '查看完整路线' : 'View Full Roadmap'}
            </Link>
            <Link href="/courses" className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text-primary)] hover:border-slate-500 font-semibold transition-colors">
              {isZh ? '浏览课程' : 'Browse Courses'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
