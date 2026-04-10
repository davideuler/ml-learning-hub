import type { Metadata } from 'next';
import Link from 'next/link';
import { FullCodeSample } from '@/components/projects/FullCodeSample';

export const metadata: Metadata = {
  title: 'Project: PPO MuJoCo HalfCheetah',
  description: 'Implement PPO from scratch with GAE and train a HalfCheetah-v4 agent to sprint.',
};

const STEPS = [
  { title: 'Rollout pipeline / rollout 管线', body: 'Use vectorized environments, preallocated rollout storage, and clean separation between data collection and policy updates. / 使用向量化环境、预分配 rollout storage，并严格分离数据收集与策略更新。' },
  { title: 'Actor-critic networks / actor-critic 网络', body: 'Implement a Gaussian policy head and value head with sensible initialization. / 实现高斯策略头和值函数头，并使用合理初始化。' },
  { title: 'GAE and PPO loss / GAE 与 PPO 损失', body: 'Compute advantages carefully, normalize them, and implement clipped policy and value objectives. / 小心计算 advantage 并归一化，实现带 clipping 的策略损失和值函数损失。' },
  { title: 'Minibatch optimization / 小批量优化', body: 'Shuffle rollouts into minibatches and run multiple epochs without breaking on-policy assumptions too badly. / 将 rollout 打乱成 minibatch，并做多轮优化，同时尽量不破坏 on-policy 假设。' },
] as const;

const REFERENCES = [
  { label: 'PPO paper', href: 'https://arxiv.org/abs/1707.06347' },
  { label: 'GAE paper', href: 'https://arxiv.org/abs/1506.02438' },
  { label: 'Spinning Up PPO', href: 'https://spinningup.openai.com/en/latest/algorithms/ppo.html' },
  { label: 'CleanRL PPO continuous action', href: 'https://github.com/vwxyzjn/cleanrl' },
];

export default function PPOMujocoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8"><Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link><span className="mx-2">/</span><span className="text-[var(--text-primary)]">PPO MuJoCo</span></nav>
      <div className="flex items-start gap-4 mb-4"><span className="text-5xl">🏃</span><div><div className="flex gap-2 mb-2"><span className="badge badge-orange">RL</span><span className="badge badge-purple">Continuous Control</span></div><h1 className="text-3xl font-extrabold text-[var(--text-primary)]">PPO MuJoCo HalfCheetah / PPO 训练 HalfCheetah</h1></div></div>
      <p className="text-[var(--text-muted)] mb-8">This project is where policy optimization stops being a slogan and becomes engineering. You will implement PPO with GAE, minibatch updates, and rollout management. <br />这个项目会让 policy optimization 不再只是概念，而是真正落到工程实现。你会实现 PPO、GAE、minibatch 更新和 rollout 管理。</p>

      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Project Background / 项目背景</h2><p className="text-sm text-[var(--text-muted)] leading-relaxed">If DQN represents the pixel-control era of value learning, PPO represents the practical rise of policy optimization for continuous control. MuJoCo tasks matter because they force you to deal with smooth action spaces, unstable updates, and the real cost of noisy gradients. <br />如果说 DQN 代表了 value learning 的像素控制时代，那么 PPO 则代表了连续控制里 policy optimization 的实用化。MuJoCo 任务之所以重要，是因为它迫使你面对连续动作空间、不稳定更新，以及高噪声梯度的真实代价。</p></div>

      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Problem it solves / 它要解决什么问题</h2><p className="text-sm text-[var(--text-muted)] leading-relaxed">The deeper problem is how to improve a policy in continuous action spaces without letting each update destroy previously useful behavior. PPO solves this by using clipped policy updates, actor-critic structure, and GAE to control variance while still making progress. <br />这个项目要解决的核心问题是：在连续动作空间里，如何一边改进策略，一边避免每次更新都把原本有用的行为破坏掉。PPO 的解法是 clipped policy update、actor-critic 结构和 GAE，用更稳定的方式持续推进训练。</p></div>

      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">What you learn / 你会学到什么</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>▸ Actor-critic design / actor-critic 设计</li><li>▸ GAE and variance reduction / GAE 与方差降低</li><li>▸ Continuous-action Gaussian policy / 连续动作高斯策略</li><li>▸ Rollout collection and policy update separation / rollout 收集与策略更新分离</li></ul></div>

      <pre className="text-xs leading-relaxed overflow-x-auto mb-8 rounded-xl p-4">{`ratio = torch.exp(new_logp - old_logp)
clip_ratio = torch.clamp(ratio, 1 - eps, 1 + eps)
policy_loss = -(torch.min(ratio * adv, clip_ratio * adv)).mean()
value_loss = ((value - returns) ** 2).mean()`}</pre>

      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Code walkthrough / 代码要点解释</h2><div className="space-y-4 text-sm text-[var(--text-muted)]"><p><span className="font-semibold text-[var(--text-primary)]">The clipped objective defines PPO / clipped objective 定义了 PPO：</span> it constrains policy updates so the new policy cannot drift too far from the old one in a single optimization phase. / 它约束策略更新幅度，避免新策略在单次优化阶段里偏离旧策略太远。</p><p><span className="font-semibold text-[var(--text-primary)]">GAE is practical variance control / GAE 是实用型方差控制：</span> it is what makes PPO training much less noisy in practice. / 它让 PPO 在实践中显著减少训练噪声。</p><p><span className="font-semibold text-[var(--text-primary)]">Rollout storage is part of the algorithm / rollout 存储本身就是算法的一部分：</span> if trajectories, dones, or bootstrap values are assembled incorrectly, the loss may still run while learning silently collapses. / 如果轨迹、done 标志或 bootstrap value 拼错了，loss 可能照样能跑，但学习会静默崩塌。</p><p><span className="font-semibold text-[var(--text-primary)]">The Gaussian head is where continuous control becomes real / 高斯策略头是连续控制真正落地的地方：</span> unlike discrete policies, you must reason about means, log-stds, sampling noise, and entropy regularization. / 与离散策略不同，在这里你必须真正理解均值、log-std、采样噪声和 entropy regularization。</p></div></div>

      <FullCodeSample projectSlug="ppo-mujoco" />

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Build Steps / 构建步骤</h2><div className="space-y-3 mb-8">{STEPS.map((s) => <div key={s.title} className="card"><h3 className="font-semibold text-[var(--text-primary)]">{s.title}</h3><p className="text-sm text-[var(--text-muted)] mt-1">{s.body}</p></div>)}</div>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Common Pitfalls / 常见坑</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>▸ Advantage normalization omitted / 忘了做 advantage normalization</li><li>▸ Ratio clipping implemented incorrectly / ratio clipping 写错</li><li>▸ Mixing rollout and update phases / rollout 阶段和更新阶段混在一起</li><li>▸ Treating MuJoCo reward as instantly stable / 误以为 MuJoCo 奖励很快稳定</li></ul></div>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Success Criteria / 完成标准</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>✅ PPO loss terms are implemented correctly / PPO 各损失项实现正确</li><li>✅ Rollout and update phases are clearly separated / rollout 与 update 阶段清晰分离</li><li>✅ Training curve improves over time / 训练曲线随时间明显改善</li><li>✅ You can explain why clipping matters more than just quoting the formula / 你能解释 clipping 的作用，而不是只会背公式</li></ul></div>
      <div className="card"><h2 className="font-bold text-[var(--text-primary)] mb-3">References / 参考资料</h2><ul className="space-y-2 text-sm">{REFERENCES.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-brand-200">{r.label}</a></li>)}</ul></div>
    </div>
  );
}
