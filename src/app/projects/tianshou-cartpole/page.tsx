import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: Tianshou CartPole Pipeline',
  description: 'Use Tianshou to build a reusable DQN experiment pipeline on CartPole-v1.',
};

const STEPS = [
  {
    title: 'Model the problem like an engineer',
    body: 'Start with CartPole-v1 so you can focus on the library workflow, not environment complexity. Define config, seed handling, and logging before writing any training code.',
  },
  {
    title: 'Build the Q-network and wrap it in DQNPolicy',
    body: 'Implement a small MLP Q-network, instantiate a DQNPolicy, and let Tianshou handle action selection, target network management, and the Bellman update.',
  },
  {
    title: 'Wire up Collector and vectorised environments',
    body: 'Use SubprocVectorEnv (or DummyVectorEnv for debug), attach a Collector, and let the trainer drive environment interaction. No manual env step loops.',
  },
  {
    title: 'Add VectorReplayBuffer and offpolicy_trainer',
    body: 'Configure VectorReplayBuffer for multi-env experience, hook up offpolicy_trainer with callbacks. This is where script hacking becomes reusable experiment infrastructure.',
  },
  {
    title: 'Instrument and compare',
    body: 'Track reward curves, training speed, and code size. Compare against the hand-written DQN to understand what Tianshou abstracts — and what it hides.',
  },
  {
    title: 'Generalise the template',
    body: 'Swap CartPole for LunarLander or a simple Atari game with minimal changes. The goal is a pipeline you can reuse across RL experiments, not just this one environment.',
  },
];

const PITFALLS = [
  {
    title: 'SubprocVectorEnv pickling errors',
    body: 'Environment factory functions must be serialisable. Use lambda: gym.make("CartPole-v1") only at the top level, or wrap inside a named function. Closures over local variables will fail silently or crash on spawn.',
  },
  {
    title: 'VectorReplayBuffer shape mismatch',
    body: 'VectorReplayBuffer expects buffer_num to match the number of envs exactly. A mismatch produces cryptic indexing errors during sampling rather than a clear message at construction.',
  },
  {
    title: 'Policy in train vs eval mode',
    body: 'Tianshou calls policy.train() / policy.eval() automatically during trainer phases. If you manually set eval mode outside the trainer, you may silently break epsilon-greedy exploration.',
  },
  {
    title: 'Epsilon schedule not wired',
    body: 'DQNPolicy does not schedule epsilon for you. Set eps_train and eps_test separately, and remember to anneal eps_train via a train_fn callback in the trainer.',
  },
  {
    title: 'Logger flush timing',
    body: 'Tianshou\'s logger accumulates stats and flushes on intervals. If training ends before a flush, the last few reward values may never appear in TensorBoard. Always call logger.save_data() in stop_fn.',
  },
];

const HARDWARE_ROWS = [
  { hw: 'Mac M4 Pro (128 GB)', cartpole: '✅ Excellent — no GPU needed', lunar: '✅ Good', atari_single: '⚠️ Slow but works', atari_sweep: '❌ Too slow for multi-seed' },
  { hw: 'RTX 4090',            cartpole: '✅ Instant',                   lunar: '✅ Instant', atari_single: '✅ Fast',           atari_sweep: '✅ Good for a few seeds' },
  { hw: 'A100 80GB',           cartpole: '✅ Instant',                   lunar: '✅ Instant', atari_single: '✅ Very fast',       atari_sweep: '✅ Recommended' },
  { hw: '8× L20',              cartpole: '✅ Overkill',                  lunar: '✅ Overkill', atari_single: '✅ Fastest',        atari_sweep: '✅ Best for large sweeps' },
];

export default function TianshouCartPolePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/projects" className="hover:text-slate-300">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Tianshou CartPole</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">🧰</span>
        <div>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-orange">RL</span>
            <span className="badge badge-blue">Intermediate</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Tianshou CartPole Pipeline</h1>
        </div>
      </div>

      <p className="text-slate-400 mb-8">
        Learn a production-grade RL library without drowning in complexity. This project turns a simple DQN agent
        into a reusable experiment pipeline: typed configs, vectorised collectors, replay buffers, and trainer
        hooks — the infrastructure a real team uses for repeatable RL research.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { k: 'Environment', v: 'CartPole-v1' },
          { k: 'Library',     v: 'Tianshou ≥ 1.1' },
          { k: 'Time',        v: '6–8 hrs' },
          { k: 'Hardware',    v: 'Any (CPU fine)' },
        ].map(({ k, v }) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-slate-500">{k}</div>
            <div className="font-bold text-white mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="card mb-10">
        <h2 className="font-bold text-white mb-3">What you learn</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>▸ How RL libraries separate policy logic, data collection, and optimisation</li>
          <li>▸ How to configure vectorised environments and replay buffers cleanly</li>
          <li>▸ When a framework speeds you up and when it hides important detail</li>
          <li>▸ How to design an RL codebase that scales beyond a single notebook</li>
        </ul>
      </div>

      {/* Starter Code */}
      <h2 className="text-xl font-bold text-white mb-4">Starter Code</h2>
      <p className="text-sm text-slate-400 mb-4">
        The scaffold below handles environment setup, policy construction, buffer, and trainer wiring.
        Your job: implement <code className="text-orange-300">QNet</code>, configure hyperparameters,
        add epsilon annealing in <code className="text-orange-300">train_fn</code>, and instrument logging.
      </p>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-10 rounded-xl p-4 bg-slate-900 border border-slate-700">{`# tianshou_cartpole.py  — skeleton to complete
import gymnasium as gym
import torch
import torch.nn as nn
from tianshou.data import Collector, VectorReplayBuffer
from tianshou.env import DummyVectorEnv
from tianshou.policy import DQNPolicy
from tianshou.trainer import OffpolicyTrainer
from tianshou.utils import TensorboardLogger
from torch.utils.tensorboard import SummaryWriter

# ── Config ────────────────────────────────────────────────────────────────────
SEED          = 42
N_TRAIN_ENVS  = 10
N_TEST_ENVS   = 100
BUFFER_SIZE   = 20_000
BATCH_SIZE    = 64
EPOCH         = 10
STEP_PER_EPOCH = 10_000
EPS_TRAIN     = 0.1   # TODO: anneal from 1.0 to 0.05
EPS_TEST      = 0.05
LR            = 1e-3
GAMMA         = 0.9
TARGET_FREQ   = 320   # steps between target net hard copy

# ── Q-Network (TODO: implement this) ─────────────────────────────────────────
class QNet(nn.Module):
    """Small MLP for CartPole-v1 (obs_dim=4, n_actions=2)."""
    def __init__(self, obs_dim: int, n_actions: int):
        super().__init__()
        # TODO: build MLP — e.g. Linear(obs_dim, 128), ReLU, Linear(128, n_actions)
        raise NotImplementedError

    def forward(self, obs, state=None):
        # Tianshou passes obs as a numpy array or tensor depending on env config.
        # Cast to float tensor before feeding to layers.
        # Return (logits, state) — state=None for feed-forward nets.
        raise NotImplementedError


# ── Environments ──────────────────────────────────────────────────────────────
def make_env():
    return gym.make("CartPole-v1")

train_envs = DummyVectorEnv([make_env for _ in range(N_TRAIN_ENVS)])
test_envs  = DummyVectorEnv([make_env for _ in range(N_TEST_ENVS)])

# ── Policy ────────────────────────────────────────────────────────────────────
obs_dim   = 4
n_actions = 2
net       = QNet(obs_dim, n_actions)
optim     = torch.optim.Adam(net.parameters(), lr=LR)

policy = DQNPolicy(
    model=net,
    optim=optim,
    action_space=gym.spaces.Discrete(n_actions),
    discount_factor=GAMMA,
    estimation_step=1,
    target_update_freq=TARGET_FREQ,
)
policy.set_eps(EPS_TRAIN)

# ── Buffer & Collectors ───────────────────────────────────────────────────────
buffer        = VectorReplayBuffer(BUFFER_SIZE, buffer_num=N_TRAIN_ENVS)
train_collector = Collector(policy, train_envs, buffer, exploration_noise=True)
test_collector  = Collector(policy, test_envs, exploration_noise=False)

# Pre-fill buffer with random transitions before training begins.
train_collector.collect(n_step=BUFFER_SIZE // 10, random=True)

# ── Logger ────────────────────────────────────────────────────────────────────
writer = SummaryWriter("runs/tianshou_cartpole")
logger = TensorboardLogger(writer)

# ── Trainer ───────────────────────────────────────────────────────────────────
def train_fn(epoch, env_step):
    # TODO: linearly decay epsilon from 1.0 → EPS_TRAIN over first 10k steps
    policy.set_eps(EPS_TRAIN)

def test_fn(epoch, env_step):
    policy.set_eps(EPS_TEST)

def stop_fn(mean_rewards):
    return mean_rewards >= 195.0  # CartPole solved threshold

result = OffpolicyTrainer(
    policy=policy,
    train_collector=train_collector,
    test_collector=test_collector,
    max_epoch=EPOCH,
    step_per_epoch=STEP_PER_EPOCH,
    step_per_collect=10,
    update_per_step=0.1,
    episode_per_test=10,
    batch_size=BATCH_SIZE,
    train_fn=train_fn,
    test_fn=test_fn,
    stop_fn=stop_fn,
    logger=logger,
).run()

print(f"Finished training: best_reward={result['best_reward']:.1f}")
`}</pre>

      {/* Build Steps */}
      <h2 className="text-xl font-bold text-white mb-6">Build Steps</h2>
      <div className="space-y-4 mb-12">
        {STEPS.map((step, idx) => (
          <div key={step.title} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-orange-400/40 font-mono w-8 shrink-0">{idx + 1}</span>
            <div>
              <h3 className="font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pitfalls */}
      <h2 className="text-xl font-bold text-white mb-4">Common Pitfalls</h2>
      <div className="space-y-3 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.title} className="card border-yellow-500/20">
            <p className="text-sm font-semibold text-yellow-400 mb-1">⚠️ {p.title}</p>
            <p className="text-xs text-slate-400">{p.body}</p>
          </div>
        ))}
      </div>

      {/* Hardware Table */}
      <h2 className="text-xl font-bold text-white mb-4">Hardware Comparison</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-xs text-slate-400 border-collapse">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 pr-4 text-slate-300 font-semibold">Hardware</th>
              <th className="text-left py-2 pr-4 text-slate-300 font-semibold">CartPole</th>
              <th className="text-left py-2 pr-4 text-slate-300 font-semibold">LunarLander</th>
              <th className="text-left py-2 pr-4 text-slate-300 font-semibold">Atari (1 seed)</th>
              <th className="text-left py-2 text-slate-300 font-semibold">Atari (sweep)</th>
            </tr>
          </thead>
          <tbody>
            {HARDWARE_ROWS.map((r) => (
              <tr key={r.hw} className="border-b border-slate-800">
                <td className="py-2 pr-4 text-white font-medium">{r.hw}</td>
                <td className="py-2 pr-4">{r.cartpole}</td>
                <td className="py-2 pr-4">{r.lunar}</td>
                <td className="py-2 pr-4">{r.atari_single}</td>
                <td className="py-2">{r.atari_sweep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card border-orange-500/30">
        <p className="text-sm text-slate-400">
          <strong className="text-white">Recommended sequence:</strong> finish the hand-written{' '}
          <Link href="/projects/dqn-pong" className="text-brand-300 hover:underline">DQN Pong project</Link> first,
          then return here. That way you understand what Tianshou is abstracting instead of cargo-culting the API.
        </p>
      </div>
    </div>
  );
}
