import type { Metadata } from 'next';
import Link from 'next/link';
import { FullCodeSample } from '@/components/projects/FullCodeSample';

export const metadata: Metadata = {
  title: 'Project: DQN Atari Pong',
  description: 'Implement Deep Q-Networks with experience replay and target network to beat the Pong AI.',
};

const STATS = [
  ['Environment / 环境', 'Pong-v5'],
  ['Method / 方法', 'DQN'],
  ['Observation / 输入', '4×84×84'],
  ['Goal / 目标', 'Beat baseline'],
] as const;

const STEPS = [
  { title: 'Environment Setup / 环境准备', body: 'Install gymnasium[atari] and apply standard wrappers such as frame skip, grayscale warp, and frame stacking. / 安装 gymnasium[atari]，并应用标准 Atari wrapper，比如 frame skip、灰度缩放和 frame stacking。' },
  { title: 'Replay Buffer / 回放缓存', body: 'Implement an efficient transition store and verify sample shapes before any long training run. / 实现高效 transition 存储，并在长时间训练前先验证采样 shape 是否正确。' },
  { title: 'Q-Network / Q 网络', body: 'Build the canonical convolutional Q-network on top of stacked frames. / 在堆叠帧输入上实现经典卷积 Q 网络。' },
  { title: 'Optimization / 优化', body: 'Use TD loss, target network syncing, epsilon-greedy exploration, and gradient clipping. / 使用 TD loss、target network 同步、epsilon-greedy 探索和梯度裁剪。' },
  { title: 'Evaluation / 评估', body: 'Track smoothed rewards and run real evaluation episodes with exploration disabled. / 跟踪平滑奖励，并在关闭探索后做真实评估回合。' },
] as const;

const PITFALLS = [
  { title: 'Wrong preprocessing / 预处理错误', body: 'Atari preprocessing is part of the algorithm, not a cosmetic detail. If frame skip or resize differs, your results are not comparable. / Atari 预处理是算法的一部分，不是装饰细节。如果 frame skip 或 resize 不一致，结果就不可比。' },
  { title: 'Target sync too aggressive / target 同步太激进', body: 'Updating the target network too often can destabilize learning and erase the point of a delayed bootstrap target. / target network 更新太频繁，会破坏延迟 bootstrap target 的意义，训练更不稳定。' },
  { title: 'Overtrusting one episode / 过度相信单局表现', body: 'One good episode in Pong means almost nothing. You need repeated evaluation and smoothed curves. / Pong 里单局表现几乎没有意义，必须看重复评估和奖励曲线。' },
] as const;

const REFERENCES = [
  { label: 'Playing Atari with Deep Reinforcement Learning', href: 'https://arxiv.org/abs/1312.5602' },
  { label: 'Nature DQN paper', href: 'https://www.nature.com/articles/nature14236' },
  { label: 'CleanRL DQN', href: 'https://github.com/vwxyzjn/cleanrl' },
  { label: 'Gymnasium Atari docs', href: 'https://gymnasium.farama.org/environments/atari/' },
];

export default function DQNPongPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]">DQN Pong</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">🕹️</span>
        <div>
          <div className="flex gap-2 mb-2"><span className="badge badge-orange">RL</span><span className="badge badge-green">Intermediate</span></div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">DQN Atari Pong / DQN 训练 Atari Pong</h1>
        </div>
      </div>

      <p className="text-[var(--text-muted)] mb-8">This project teaches value-based RL the hard way: delayed rewards, unstable bootstrap targets, and why replay buffers and target networks are absolutely necessary. <br />这个项目会让你真正理解 value-based RL 的难点，包括延迟奖励、bootstrap target 不稳定，以及 replay buffer 和 target network 为什么必要。</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">{STATS.map(([k, v]) => <div key={k} className="card text-center py-3"><div className="text-sm text-[var(--text-muted)]">{k}</div><div className="font-bold text-[var(--text-primary)] mt-1">{v}</div></div>)}</div>

      <div className="card mb-8">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Project Background / 项目背景</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">DQN is one of the first deep reinforcement learning systems that clearly showed neural networks could learn control policies directly from pixels. Pong matters because it is simple enough to study but difficult enough to expose the instability of value learning. <br />DQN 是最早清楚证明“神经网络可以直接从像素学习控制策略”的深度强化学习系统之一。Pong 之所以重要，是因为它足够简单，适合研究；但又足够难，能真实暴露 value learning 的不稳定性。</p>
      </div>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Problem it solves / 它要解决什么问题</h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">The problem is not just “play Pong.” The deeper problem is how to learn stable action values from high-dimensional visual input when rewards are delayed and each update changes the future target. DQN solves this with replay buffers, target networks, and convolutional Q estimation. <br />这个项目要解决的并不只是“玩 Pong”，更深层的问题是：当输入是高维图像、奖励是延迟到来的，而且每次更新都会改变未来目标时，如何稳定学出动作价值。DQN 给出的解法是 replay buffer、target network 和卷积式 Q 值估计。</p>
      </div>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">What you learn / 你会学到什么</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>▸ Why replay buffers reduce temporal correlation / 为什么 replay buffer 可以降低时间相关性</li>
          <li>▸ Why target networks stabilize Q-learning / 为什么 target network 能稳定 Q-learning</li>
          <li>▸ How Atari preprocessing changes learning dynamics / Atari 预处理如何改变学习动态</li>
          <li>▸ How to evaluate RL properly instead of cherry-picking rollouts / 如何正确评估 RL，而不是挑漂亮 rollout</li>
        </ul>
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Starter Code / 起始代码</h2>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-8 rounded-xl p-4">{`class QNet(nn.Module):
    def __init__(self, n_actions: int):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(4, 32, 8, stride=4), nn.ReLU(),
            nn.Conv2d(32, 64, 4, stride=2), nn.ReLU(),
            nn.Conv2d(64, 64, 3, stride=1), nn.ReLU(),
            nn.Flatten(),
            nn.Linear(3136, 512), nn.ReLU(),
            nn.Linear(512, n_actions),
        )
    def forward(self, x):
        return self.net(x / 255.0)`}</pre>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Code walkthrough / 代码要点解释</h2>
        <div className="space-y-4 text-sm text-[var(--text-muted)]">
          <p><span className="font-semibold text-[var(--text-primary)]">The CNN is not the hard part / CNN 不是最难的部分：</span> most of the difficulty in DQN comes from unstable targets and correlated data, not from visual feature extraction itself. / DQN 真正的难点大多不在视觉特征提取，而在不稳定目标和强相关数据。</p>
          <p><span className="font-semibold text-[var(--text-primary)]">Replay changes the data distribution / replay 改变数据分布：</span> without replay, sequential observations are too correlated and SGD becomes extremely noisy. / 没有 replay，连续 observation 相关性太强，SGD 会非常不稳定。</p>
          <p><span className="font-semibold text-[var(--text-primary)]">Target networks slow down feedback loops / target network 减缓反馈回路：</span> bootstrapping on a network that is changing every step creates self-chasing dynamics. The target copy reduces that feedback loop. / 如果每一步都用快速变化的网络做 bootstrap，就会出现自我追逐。target copy 的存在就是为了减缓这个反馈回路。</p>
          <p><span className="font-semibold text-[var(--text-primary)]">The training step is the real engine / 真正的核心在训练步：</span> sample a batch from replay, compute online Q-values, build the delayed target with the target network, and optimize TD error. If this path is wrong, the whole agent appears to learn but actually drifts. / 真正的引擎是训练步：从 replay 采样、计算 online Q 值、用 target network 构造延迟目标，再最小化 TD error。这个链条一旦写错，agent 看似在学，实际上会漂移。</p>
          <p><span className="font-semibold text-[var(--text-primary)]">Evaluation must be separated from exploration / 评估必须与探索解耦：</span> if epsilon stays high during evaluation, you are mostly measuring noise rather than learned control. / 如果评估时 epsilon 仍然很高，你测到的基本只是噪声，而不是学到的控制能力。</p>
        </div>
      </div>

      <FullCodeSample projectSlug="dqn-pong" />

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Build Steps / 构建步骤</h2>
      <div className="space-y-3 mb-8">{STEPS.map((s) => <div key={s.title} className="card"><h3 className="font-semibold text-[var(--text-primary)]">{s.title}</h3><p className="text-sm text-[var(--text-muted)] mt-1">{s.body}</p></div>)}</div>

      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Common Pitfalls / 常见坑</h2><div className="space-y-3">{PITFALLS.map((p) => <div key={p.title}><p className="text-sm font-semibold text-yellow-400">⚠️ {p.title}</p><p className="text-xs text-[var(--text-muted)]">{p.body}</p></div>)}</div></div>

      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Success Criteria / 完成标准</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>✅ The agent consistently improves against random or weak policies / agent 对随机或弱策略能稳定提升</li><li>✅ Evaluation is done with exploration largely disabled / 评估时基本关闭探索</li><li>✅ You can explain why replay and target network are both needed / 你能解释 replay 和 target network 为什么缺一不可</li></ul></div>

      <div className="card"><h2 className="font-bold text-[var(--text-primary)] mb-3">References / 参考资料</h2><ul className="space-y-2 text-sm">{REFERENCES.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-brand-200">{r.label}</a></li>)}</ul></div>
    </div>
  );
}
