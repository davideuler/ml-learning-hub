import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: PPO MuJoCo HalfCheetah',
  description: 'Implement PPO from scratch with GAE and train a HalfCheetah-v4 agent to sprint.',
};

const REFERENCES = [
  { label: 'PPO paper', href: 'https://arxiv.org/abs/1707.06347' },
  { label: 'GAE paper', href: 'https://arxiv.org/abs/1506.02438' },
  { label: 'Spinning Up PPO', href: 'https://spinningup.openai.com/en/latest/algorithms/ppo.html' },
];

export default function PPOMujocoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8"><Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link><span className="mx-2">/</span><span className="text-[var(--text-primary)]">PPO MuJoCo</span></nav>
      <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-4">PPO MuJoCo HalfCheetah / PPO 训练 HalfCheetah</h1>
      <p className="text-[var(--text-muted)] mb-8">This project is where policy optimization stops being a slogan and becomes engineering. You will implement PPO with GAE, minibatch updates, and rollout management. <br />这个项目会让 policy optimization 不再只是概念，而是真正落到工程实现。你会实现 PPO、GAE、minibatch 更新和 rollout 管理。</p>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Code walkthrough / 代码要点解释</h2><p className="text-sm text-[var(--text-muted)]">The clipped objective is the defining idea. It limits how far the new policy is allowed to move from the old one, which makes updates more stable than naive policy gradient. <br />clipped objective 是 PPO 的核心，它限制新旧策略之间的偏移幅度，因此比朴素 policy gradient 更稳定。</p></div>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">What you learn / 你会学到什么</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>▸ Actor-critic design / actor-critic 设计</li><li>▸ GAE and variance reduction / GAE 与方差降低</li><li>▸ Continuous-action Gaussian policy / 连续动作高斯策略</li><li>▸ Rollout collection and policy update separation / rollout 收集与策略更新分离</li></ul></div>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Common Pitfalls / 常见坑</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>▸ Advantage normalization omitted / 忘了做 advantage normalization</li><li>▸ Ratio clipping implemented incorrectly / ratio clipping 写错</li><li>▸ Mixing rollout and update phases / rollout 阶段和更新阶段混在一起</li></ul></div>
      <div className="card"><h2 className="font-bold text-[var(--text-primary)] mb-3">References / 参考资料</h2><ul className="space-y-2 text-sm">{REFERENCES.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-brand-200">{r.label}</a></li>)}</ul></div>
    </div>
  );
}
