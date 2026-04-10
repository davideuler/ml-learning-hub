import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: Tianshou CartPole Pipeline',
  description: 'Use Tianshou to build a reusable DQN experiment pipeline on CartPole-v1.',
};

const REFERENCES = [
  { label: 'Tianshou docs', href: 'https://tianshou.org/' },
  { label: 'Tianshou GitHub', href: 'https://github.com/thu-ml/tianshou' },
  { label: 'CartPole environment docs', href: 'https://gymnasium.farama.org/environments/classic_control/cart_pole/' },
];

export default function TianshouCartPolePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8"><Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link><span className="mx-2">/</span><span className="text-[var(--text-primary)]">Tianshou CartPole</span></nav>
      <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-4">Tianshou CartPole Pipeline / Tianshou CartPole 实验管线</h1>
      <p className="text-[var(--text-muted)] mb-8">This project teaches you how to stop writing reinforcement learning infrastructure from scratch every time. Instead, you learn how collectors, policies, replay buffers, and trainers fit together in a reusable pipeline. <br />这个项目会让你不再每次都从零手写强化学习基础设施，而是理解 collector、policy、replay buffer 和 trainer 如何组成可复用实验管线。</p>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Code walkthrough / 代码要点解释</h2><p className="text-sm text-[var(--text-muted)]">The main lesson is abstraction. Tianshou hides a lot of boilerplate, but you still need to understand what each abstraction is doing or you will not know how to debug training failures. <br />核心 lesson 是 abstraction。Tianshou 帮你隐藏了很多样板代码，但如果你不理解每层 abstraction 在做什么，训练失败时你就不知道该怎么 debug。</p></div>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">What you learn / 你会学到什么</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>▸ DQN pipeline with a framework / 使用框架搭建 DQN 管线</li><li>▸ Collector and vectorized env usage / Collector 与向量化环境使用</li><li>▸ Config-driven experimentation / 配置驱动实验</li><li>▸ Reusable RL engineering patterns / 可复用 RL 工程模式</li></ul></div>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Common Pitfalls / 常见坑</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>▸ Using the framework without understanding transitions / 只会调用框架，不理解 transition 流动</li><li>▸ Wrong env seed handling / 环境 seed 处理错误</li><li>▸ Confusing trainer metrics with true evaluation / 把 trainer 指标误当成真实评估</li></ul></div>
      <div className="card"><h2 className="font-bold text-[var(--text-primary)] mb-3">References / 参考资料</h2><ul className="space-y-2 text-sm">{REFERENCES.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-brand-200">{r.label}</a></li>)}</ul></div>
    </div>
  );
}
