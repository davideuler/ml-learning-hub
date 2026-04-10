import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: DQN Atari Pong',
  description: 'Implement Deep Q-Networks with experience replay and target network to beat the Pong AI.',
};

const STEPS = [
  {
    n: 1,
    title: 'Environment Setup',
    body: 'Install gymnasium[atari] + ale-py. Wrap Pong-v5 with standard Atari wrappers: NoopReset, MaxAndSkip, EpisodicLife, FireReset, WarpFrame (84×84 grayscale), FrameStack(4).',
  },
  {
    n: 2,
    title: 'Replay Buffer',
    body: 'Implement a circular buffer storing (s, a, r, s\', done) tuples. Use numpy arrays for efficiency. Target size: 100,000 transitions.',
  },
  {
    n: 3,
    title: 'Q-Network (CNN)',
    body: 'Three conv layers (32→64→64 filters) followed by two linear layers. Input: 4×84×84 stacked frames. Output: Q-values for each of 6 actions.',
  },
  {
    n: 4,
    title: 'Training Loop',
    body: 'ε-greedy action selection with linear decay from 1.0 to 0.05 over 1M steps. Sample 32-batch from replay buffer; compute TD targets using target network.',
  },
  {
    n: 5,
    title: 'Target Network',
    body: 'Hard-copy online weights to target network every 1000 steps. This stabilises the training signal significantly.',
  },
  {
    n: 6,
    title: 'Loss & Optimizer',
    body: 'Huber loss (smooth_l1_loss) between predicted Q(s,a) and Bellman target. RMSProp or Adam, lr=1e-4, gradient clipping at 10.',
  },
  {
    n: 7,
    title: 'Evaluation & Logging',
    body: 'Run evaluation episodes every 50k steps with ε=0.05. Log mean episode reward, episode length, loss, and ε to TensorBoard or W&B.',
  },
  {
    n: 8,
    title: 'Stretch Goals',
    body: 'Double DQN (decouple action selection from evaluation), Dueling DQN (separate value/advantage streams), Prioritised Experience Replay.',
  },
];

const PITFALLS = [
  {
    title: 'Replay buffer too small',
    body: 'Atari observations are highly correlated. A tiny replay buffer makes DQN overfit to recent frames and destabilizes Q targets.',
  },
  {
    title: 'Wrong done mask around life loss',
    body: 'EpisodicLife wrappers treat life loss like terminal for learning but not for full environment reset. Mixing these signals incorrectly hurts training a lot.',
  },
  {
    title: 'Target network copied too rarely',
    body: 'If the target network lags too much, learning becomes stale. If you update it too often, DQN loses the stabilizing effect entirely.',
  },
  {
    title: 'No-op and fire reset wrappers omitted',
    body: 'Pong needs proper reset behaviour. If you skip Atari wrappers, comparisons to published results become meaningless and exploration weakens.',
  },
  {
    title: 'Storing float32 frames in replay',
    body: 'Use uint8 for frame storage and normalize only on batch load. Float32 replay buffers waste memory and reduce effective experience capacity.',
  },
  {
    title: 'Epsilon decay ends before the agent has seen enough',
    body: 'If exploration collapses too early, DQN locks into poor paddle behaviour. Plot epsilon and reward together, not reward alone.',
  },
];

const HARDWARE_ROWS = [
  { hw: 'Mac M4 Pro 128G', single_run: '⚠️ Debug only', double_dqn: '❌ Not practical', sweep: '❌ No' },
  { hw: 'RTX 4090', single_run: '✅ Best default', double_dqn: '✅ Good', sweep: '⚠️ Limited sweeps' },
  { hw: 'A100 80GB', single_run: '✅ Excellent', double_dqn: '✅ Excellent', sweep: '✅ Strong' },
  { hw: '8× L20', single_run: '⚠️ Overkill', double_dqn: '✅ Best for variants', sweep: '✅ Best for many seeds' },
];

export default function DQNPongPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]">DQN Pong</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">🏓</span>
        <div>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-orange">RL</span>
            <span className="badge badge-blue">Intermediate</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">DQN Atari Pong</h1>
        </div>
      </div>

      <p className="text-[var(--text-muted)] mb-8">
        Implement the original DeepMind Deep Q-Network from scratch in PyTorch. Train it to beat
        the built-in AI opponent in Pong-v5. You will own every component: CNN, replay buffer,
        target network, ε-greedy exploration.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { k: 'Environment', v: 'Pong-v5' },
          { k: 'Target score', v: '+18 avg' },
          { k: 'Steps',       v: '~3M' },
          { k: 'Hardware',    v: '4090 / A100' },
        ].map(({ k, v }) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-[var(--text-muted)]">{k}</div>
            <div className="font-bold text-[var(--text-primary)] mt-1">{v}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Starter Code: Q-Network</h2>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-10 rounded-xl p-4 bg-[var(--code-bg)] border border-[var(--border)]">{`import torch
import torch.nn as nn

class QNetwork(nn.Module):
    """Atari-style CNN Q-network (Mnih et al., 2015)."""

    def __init__(self, n_actions: int):
        super().__init__()
        self.cnn = nn.Sequential(
            nn.Conv2d(4, 32, kernel_size=8, stride=4),  # (4, 84, 84) -> (32, 20, 20)
            nn.ReLU(),
            nn.Conv2d(32, 64, kernel_size=4, stride=2), # -> (64, 9, 9)
            nn.ReLU(),
            nn.Conv2d(64, 64, kernel_size=3, stride=1), # -> (64, 7, 7)
            nn.ReLU(),
        )
        self.fc = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 512),
            nn.ReLU(),
            nn.Linear(512, n_actions),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        # x: (B, 4, 84, 84) uint8 -> normalise to float
        return self.fc(self.cnn(x.float() / 255.0))


class ReplayBuffer:
    """Fixed-size circular replay buffer."""

    def __init__(self, capacity: int, obs_shape=(4, 84, 84)):
        import numpy as np
        self.cap = capacity
        self.ptr = self.size = 0
        self.obs  = np.zeros((capacity, *obs_shape), dtype=np.uint8)
        self.next_obs = np.zeros_like(self.obs)
        self.actions  = np.zeros(capacity, dtype=np.int64)
        self.rewards  = np.zeros(capacity, dtype=np.float32)
        self.dones    = np.zeros(capacity, dtype=np.float32)

    def push(self, obs, action, reward, next_obs, done):
        self.obs[self.ptr]      = obs
        self.next_obs[self.ptr] = next_obs
        self.actions[self.ptr]  = action
        self.rewards[self.ptr]  = reward
        self.dones[self.ptr]    = float(done)
        self.ptr  = (self.ptr + 1) % self.cap
        self.size = min(self.size + 1, self.cap)

    def sample(self, batch_size: int, device):
        import numpy as np, torch
        idx = np.random.randint(0, self.size, size=batch_size)
        return (
            torch.from_numpy(self.obs[idx]).to(device),
            torch.from_numpy(self.actions[idx]).to(device),
            torch.from_numpy(self.rewards[idx]).to(device),
            torch.from_numpy(self.next_obs[idx]).to(device),
            torch.from_numpy(self.dones[idx]).to(device),
        )`}</pre>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Build Steps</h2>
      <div className="space-y-4">
        {STEPS.map((s) => (
          <div key={s.n} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-orange-400/40 font-mono w-8 shrink-0">
              {s.n}
            </span>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">{s.title}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 mt-12">Common Pitfalls</h2>
      <div className="space-y-3 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.title} className="card border-yellow-500/20">
            <p className="text-sm font-semibold text-yellow-400 mb-1">⚠️ {p.title}</p>
            <p className="text-xs text-[var(--text-muted)]">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Hardware Comparison</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-xs text-[var(--text-muted)] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Hardware</th>
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Single DQN run</th>
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Double/Dueling DQN</th>
              <th className="text-left py-2 text-[var(--text-primary)] font-semibold">Multi-seed sweep</th>
            </tr>
          </thead>
          <tbody>
            {HARDWARE_ROWS.map((r) => (
              <tr key={r.hw} className="border-b border-[var(--border)]">
                <td className="py-2 pr-4 text-[var(--text-primary)] font-medium">{r.hw}</td>
                <td className="py-2 pr-4">{r.single_run}</td>
                <td className="py-2 pr-4">{r.double_dqn}</td>
                <td className="py-2">{r.sweep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 card">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Grading Rubric</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>✅ Agent trains without NaN Q-values</li>
          <li>✅ Mean episode reward ≥ +5 after 1M steps</li>
          <li>✅ Mean episode reward ≥ +18 after 3M steps (beats AI)</li>
          <li>✅ TensorBoard shows upward reward trend</li>
          <li>⭐ Stretch: Double DQN — compare learning curves</li>
          <li>⭐ Stretch: Prioritised Experience Replay — sample efficiency</li>
        </ul>
      </div>

      <div className="mt-6 card border-orange-500/30">
        <p className="text-sm text-[var(--text-muted)]">
          <strong className="text-[var(--text-primary)]">Prerequisite:</strong> Complete the{' '}
          <Link href="/courses/reinforcement-learning" className="text-brand-300 hover:underline">
            RL course
          </Link>{' '}
          through Module 5 (DQN) before starting this project.
          Estimated compute: ~3M environment steps takes 4–6 hours on an RTX 4090, or comfortably less on an A100.
        </p>
      </div>
    </div>
  );
}
