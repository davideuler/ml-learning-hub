import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: DQN Atari Pong',
  description: 'Implement Deep Q-Networks with experience replay and target network to beat the Pong AI.',
};

const STEPS = [
  'Environment Setup / 环境准备: Atari wrappers, frame stack, and preprocessing must match the DQN recipe. / Atari wrappers、帧堆叠和预处理必须与 DQN 标准流程一致。',
  'Replay Buffer / 回放缓存: store transitions efficiently and sample uniformly. / 高效存储 transition，并做均匀采样。',
  'Q-Network / Q 网络: build the convolutional Q-network over stacked frames. / 在堆叠帧上构建卷积 Q 网络。',
  'Optimization / 优化: use TD targets, target network sync, epsilon-greedy, and gradient clipping. / 使用 TD target、target network 同步、epsilon-greedy 和梯度裁剪。',
  'Evaluation / 评估: compare train reward and evaluation reward, not just one lucky rollout. / 对比训练奖励和评估奖励，而不是只看一次好运 rollout。',
];

const REFERENCES = [
  { label: 'Playing Atari with Deep Reinforcement Learning', href: 'https://arxiv.org/abs/1312.5602' },
  { label: 'Nature DQN paper', href: 'https://www.nature.com/articles/nature14236' },
  { label: 'CleanRL DQN', href: 'https://github.com/vwxyzjn/cleanrl' },
];

export default function DQNPongPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8"><Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link><span className="mx-2">/</span><span className="text-[var(--text-primary)]">DQN Pong</span></nav>
      <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-4">DQN Atari Pong / DQN 训练 Atari Pong</h1>
      <p className="text-[var(--text-muted)] mb-8">This project teaches value-based RL the hard way: delayed rewards, unstable targets, and the need for replay buffers and target networks. <br />这个项目会让你真正理解 value-based RL 的难点，包括延迟奖励、目标不稳定，以及 replay buffer 和 target network 为什么必要。</p>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Code walkthrough / 代码要点解释</h2><p className="text-sm text-[var(--text-muted)]">The CNN is not the hard part. Stability is. Replay breaks temporal correlation, the target network slows bootstrap drift, and epsilon scheduling controls exploration. <br />CNN 不是最难部分，稳定性才是。replay 用来打破时序相关性，target network 用来减缓 bootstrap 漂移，epsilon 调度则控制探索强度。</p></div>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Build Steps / 构建步骤</h2><div className="space-y-3 mb-8">{STEPS.map((s, i) => <div key={i} className="card text-sm text-[var(--text-muted)]"><span className="font-semibold text-[var(--text-primary)]">{i + 1}.</span> {s}</div>)}</div>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Common Pitfalls / 常见坑</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>▸ Wrong preprocessing makes results incomparable / 预处理错了，结果就不可比</li><li>▸ Updating target net too often destabilizes training / target net 更新太频繁会导致训练不稳</li><li>▸ Judging success from one episode is misleading / 只看一局游戏就下结论很容易误判</li></ul></div>
      <div className="card"><h2 className="font-bold text-[var(--text-primary)] mb-3">References / 参考资料</h2><ul className="space-y-2 text-sm">{REFERENCES.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-brand-200">{r.label}</a></li>)}</ul></div>
    </div>
  );
}
