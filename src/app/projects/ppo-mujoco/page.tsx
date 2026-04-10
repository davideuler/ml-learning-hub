import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: PPO MuJoCo HalfCheetah',
  description: 'Implement PPO from scratch with GAE and train a HalfCheetah-v4 agent to sprint.',
};

const STEPS = [
  {
    title: 'Set up the rollout pipeline',
    body: 'Instantiate HalfCheetah-v4 via gymnasium, wrap N parallel copies with SubprocVectorEnv or AsyncVectorEnv, pre-allocate rollout storage tensors, and add running observation normalisation (RunningMeanStd). Keep data collection and optimisation as completely separate phases from the start.',
  },
  {
    title: 'Implement actor-critic networks',
    body: 'Use a Gaussian policy output (learned log-std as a parameter, not a head) for continuous action, a separate value head for V(s), and orthogonal weight initialisation with gain=√2 for hidden layers and 0.01 for the policy output layer. These choices stabilise early training significantly.',
  },
  {
    title: 'Compute GAE and normalise advantages',
    body: 'Bootstrap the last value, walk backwards through the rollout to compute δ_t = r_t + γV(s_{t+1}) − V(s_t), accumulate Â_t = δ_t + γλÂ_{t+1}. Normalise advantages per minibatch (not per rollout) to mean=0, std=1. This is the single highest-impact hyperparameter decision in PPO.',
  },
  {
    title: 'Add PPO clipping, value loss, and entropy',
    body: 'Compute probability ratios r_t(θ) = π_θ/π_{old}, apply min-clip with ε=0.2, add Huber value loss (c₁=0.5), subtract entropy bonus (c₂=0.01). Optionally clip value function at rollout value ± ε. Log the clipping fraction — if >0.1 consistently, your learning rate or rollout length needs tuning.',
  },
  {
    title: 'Run K epochs over minibatches',
    body: 'Shuffle the rollout data, split into minibatches of size 64, run K=10 optimisation epochs. Use a single Adam optimiser with lr=3e-4 and linear LR decay to zero over training. Clip gradients by global norm at 0.5. Terminate a PPO epoch early if the mean KL divergence exceeds 0.015 (early stopping).',
  },
  {
    title: 'Compare against Tianshou baseline',
    body: 'After your scratch implementation trains successfully, implement the same agent using Tianshou\'s PPOPolicy and OnpolicyTrainer. Overlay reward curves, training time, and line count. This comparison is the learning objective — you should understand every line the library replaced.',
  },
];

const PITFALLS = [
  { title: 'Wrong advantage normalisation scope',  body: 'Normalise advantages per minibatch, not per full rollout. Rollout-level normalisation is more common but per-minibatch is what the original PPO paper describes and is slightly more stable.' },
  { title: 'Log-std clamping',                     body: 'Clamp log_std to [-20, 2] or similar. Unclamped, it can collapse to −∞ (deterministic policy, no gradient) or explode to +∞ (uniform noise, no learning).' },
  { title: 'Value function gradient stop',          body: 'When using a shared trunk, ensure the value loss gradient does not corrupt the policy head. Some implementations detach the value loss path from the actor parameters. Most just use a low c₁ coefficient (0.5 works).' },
  { title: 'Old policy log-probs stale after N envs', body: 'When using vectorised envs, the old log-probs stored in rollout storage are per-step, not per-episode. They go stale after the first optimisation epoch. Always recompute π_old once at the start of PPO update, before the K-epoch loop.' },
  { title: 'Observation normalisation mismatch',   body: 'If you normalise observations during rollout collection but forget to apply the same running stats at test time, evaluation rewards will be inconsistent and usually terrible.' },
  { title: 'MuJoCo licence / install',              body: 'HalfCheetah-v4 requires mujoco >= 2.3 and gymnasium[mujoco]. On headless servers, set MUJOCO_GL=egl or osmesa. Missing this causes cryptic segfaults.' },
];

const HARDWARE_ROWS = [
  { hw: 'Mac M4 Pro (128 GB)', verdict: 'Development only',     halfcheetah: '~8 hrs / 5M steps',  multi_seed: '❌ Too slow for multiple seeds', sweep: '❌' },
  { hw: 'RTX 4090',            verdict: 'Recommended baseline', halfcheetah: '~2 hrs / 5M steps',  multi_seed: '⚠️ 3–4 seeds OK',               sweep: '⚠️ Small sweeps' },
  { hw: 'A100 80GB',           verdict: 'Best value',           halfcheetah: '~45 min / 5M steps', multi_seed: '✅ 8+ seeds in parallel',        sweep: '✅ Good for ablations' },
  { hw: '8× L20',              verdict: 'Large sweeps',         halfcheetah: '~20 min / 5M steps', multi_seed: '✅ Dozens of seeds',             sweep: '✅ Full hyperparameter sweeps' },
];

export default function PPOMuJoCoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]">PPO MuJoCo</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">🦾</span>
        <div>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-orange">RL</span>
            <span className="badge badge-purple">Advanced</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">PPO MuJoCo HalfCheetah</h1>
        </div>
      </div>

      <p className="text-[var(--text-muted)] mb-8">
        Full PPO from scratch — clip objective, GAE, entropy bonus, observation normalisation.
        Train a HalfCheetah-v4 agent to reach 5k+ cumulative reward, then compare your implementation against
        a Tianshou-powered baseline to understand both the fundamentals and the engineering abstractions.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { k: 'Environment', v: 'HalfCheetah-v4' },
          { k: 'Target',      v: '5k+ reward' },
          { k: 'Time',        v: '8–16 hrs' },
          { k: 'Hardware',    v: '4090 / A100' },
        ].map(({ k, v }) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-[var(--text-muted)]">{k}</div>
            <div className="font-bold text-[var(--text-primary)] mt-1">{v}</div>
          </div>
        ))}
      </div>

      {/* PPO Checklist */}
      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">PPO Implementation Checklist</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>✅ Actor-Critic with shared MLP trunk (optional) and separate heads</li>
          <li>✅ Gaussian policy with learned log-std parameter</li>
          <li>✅ Orthogonal initialisation (gain=√2 for hidden, 0.01 for policy head)</li>
          <li>✅ GAE (γ=0.99, λ=0.95) advantage estimates</li>
          <li>✅ Per-minibatch advantage normalisation</li>
          <li>✅ Clipped surrogate objective (ε=0.2)</li>
          <li>✅ Value function clipping + Huber loss (c₁=0.5)</li>
          <li>✅ Entropy bonus (c₂=0.01) for exploration</li>
          <li>✅ K=10 optimisation epochs per rollout</li>
          <li>✅ Adam lr=3e-4 with linear decay to 0</li>
          <li>✅ Gradient clipping (max_norm=0.5)</li>
          <li>✅ Running observation normalisation (RunningMeanStd)</li>
        </ul>
      </div>

      {/* Starter Code */}
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Starter Code</h2>
      <p className="text-sm text-[var(--text-muted)] mb-4">
        This skeleton provides the actor-critic network, GAE computation, and the training loop frame.
        Fill in the clipped PPO loss, value loss, and entropy bonus inside <code className="text-orange-300">ppo_update()</code>.
      </p>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-10 rounded-xl p-4 bg-[var(--code-bg)] border border-[var(--border)]">{`# ppo_mujoco.py  — skeleton to complete
import torch
import torch.nn as nn
from torch.distributions import Normal
import gymnasium as gym
import numpy as np

# ── Config ────────────────────────────────────────────────────────────────────
ENV_ID        = "HalfCheetah-v4"
N_ENVS        = 16
ROLLOUT_STEPS = 2048          # steps per env per rollout
GAMMA         = 0.99
LAM           = 0.95          # GAE lambda
CLIP_EPS      = 0.2
ENTROPY_COEF  = 0.01
VALUE_COEF    = 0.5
MAX_GRAD_NORM = 0.5
N_EPOCHS      = 10
MINIBATCH     = 64
LR            = 3e-4
TOTAL_STEPS   = 5_000_000

# ── Actor-Critic Network ──────────────────────────────────────────────────────
class ActorCritic(nn.Module):
    def __init__(self, obs_dim: int, act_dim: int):
        super().__init__()
        self.trunk = nn.Sequential(
            nn.Linear(obs_dim, 64), nn.Tanh(),
            nn.Linear(64, 64),     nn.Tanh(),
        )
        self.actor_mean  = nn.Linear(64, act_dim)
        self.actor_logstd = nn.Parameter(torch.zeros(act_dim))
        self.critic       = nn.Linear(64, 1)
        self._init_weights()

    def _init_weights(self):
        for layer in self.trunk:
            if isinstance(layer, nn.Linear):
                nn.init.orthogonal_(layer.weight, gain=np.sqrt(2))
                nn.init.constant_(layer.bias, 0.0)
        nn.init.orthogonal_(self.actor_mean.weight, gain=0.01)
        nn.init.orthogonal_(self.critic.weight, gain=1.0)

    def forward(self, obs):
        x    = self.trunk(obs)
        mean = self.actor_mean(x)
        std  = torch.exp(self.actor_logstd.clamp(-20, 2))
        val  = self.critic(x).squeeze(-1)
        return Normal(mean, std), val

    def get_value(self, obs):
        return self.critic(self.trunk(obs)).squeeze(-1)


# ── GAE computation ───────────────────────────────────────────────────────────
def compute_gae(rewards, values, dones, next_value, gamma=GAMMA, lam=LAM):
    """
    rewards, values, dones: tensors of shape (T, N_ENVS)
    next_value: tensor of shape (N_ENVS,)  — V(s_{T+1})
    Returns advantages of shape (T, N_ENVS).
    """
    T = rewards.shape[0]
    advantages = torch.zeros_like(rewards)
    last_adv   = torch.zeros(rewards.shape[1], device=rewards.device)
    for t in reversed(range(T)):
        next_val  = values[t + 1] if t < T - 1 else next_value
        mask      = 1.0 - dones[t]
        delta     = rewards[t] + gamma * next_val * mask - values[t]
        last_adv  = delta + gamma * lam * mask * last_adv
        advantages[t] = last_adv
    returns = advantages + values
    return advantages, returns


# ── PPO update (TODO: implement) ──────────────────────────────────────────────
def ppo_update(model, optimizer, obs_b, act_b, logp_old_b, adv_b, ret_b):
    """
    One minibatch update. All tensors already moved to device.
    Steps:
      1. Forward pass → dist, value
      2. Compute new log-probs from dist
      3. Probability ratio r = exp(logp_new - logp_old)
      4. Clipped surrogate loss: -mean(min(r*adv, clip(r,1-ε,1+ε)*adv))
      5. Value loss: Huber(value, ret_b) * VALUE_COEF
      6. Entropy bonus: -dist.entropy().mean() * ENTROPY_COEF
      7. Total loss = policy_loss + value_loss - entropy_loss
      8. Backward + grad clip + optimizer step
    Return: dict of scalar losses for logging.
    """
    # TODO: fill in
    raise NotImplementedError


# ── Training loop (sketch) ────────────────────────────────────────────────────
if __name__ == "__main__":
    import gymnasium.vector
    envs = gymnasium.vector.SyncVectorEnv([lambda: gym.make(ENV_ID)] * N_ENVS)
    obs_dim = envs.single_observation_space.shape[0]
    act_dim = envs.single_action_space.shape[0]

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model  = ActorCritic(obs_dim, act_dim).to(device)
    optim  = torch.optim.Adam(model.parameters(), lr=LR, eps=1e-5)

    obs, _ = envs.reset()
    steps_done = 0

    while steps_done < TOTAL_STEPS:
        # ── Rollout collection ─────────────────────────────
        obs_list, act_list, logp_list, rew_list, done_list, val_list = [], [], [], [], [], []
        for _ in range(ROLLOUT_STEPS):
            obs_t = torch.FloatTensor(obs).to(device)
            with torch.no_grad():
                dist, val = model(obs_t)
                action     = dist.sample()
                logp       = dist.log_prob(action).sum(-1)

            next_obs, rew, term, trunc, _ = envs.step(action.cpu().numpy())
            done = term | trunc

            obs_list.append(obs_t);  act_list.append(action)
            logp_list.append(logp);  rew_list.append(torch.FloatTensor(rew).to(device))
            done_list.append(torch.FloatTensor(done.astype(float)).to(device))
            val_list.append(val)
            obs = next_obs

        steps_done += ROLLOUT_STEPS * N_ENVS

        # ── GAE ───────────────────────────────────────────
        with torch.no_grad():
            next_val = model.get_value(torch.FloatTensor(obs).to(device))
        values     = torch.stack(val_list)
        rewards    = torch.stack(rew_list)
        dones      = torch.stack(done_list)
        advantages, returns = compute_gae(rewards, values, dones, next_val)

        # ── Flatten rollout ────────────────────────────────
        obs_b  = torch.stack(obs_list).flatten(0, 1)
        act_b  = torch.stack(act_list).flatten(0, 1)
        logp_b = torch.stack(logp_list).flatten(0, 1)
        adv_b  = advantages.flatten(0, 1)
        ret_b  = returns.flatten(0, 1)

        # ── PPO epochs ────────────────────────────────────
        for _ in range(N_EPOCHS):
            idx = torch.randperm(obs_b.shape[0])
            for start in range(0, obs_b.shape[0], MINIBATCH):
                mb = idx[start:start + MINIBATCH]
                # Normalise advantages per minibatch
                adv_mb = adv_b[mb]
                adv_mb = (adv_mb - adv_mb.mean()) / (adv_mb.std() + 1e-8)
                ppo_update(model, optim, obs_b[mb], act_b[mb], logp_b[mb], adv_mb, ret_b[mb])

    print("Training complete.")
`}</pre>

      {/* Build Steps */}
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Build Steps</h2>
      <div className="space-y-4 mb-12">
        {STEPS.map((step, idx) => (
          <div key={step.title} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-orange-400/40 font-mono w-8 shrink-0">{idx + 1}</span>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">{step.title}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pitfalls */}
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Common Pitfalls</h2>
      <div className="space-y-3 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.title} className="card border-yellow-500/20">
            <p className="text-sm font-semibold text-yellow-400 mb-1">⚠️ {p.title}</p>
            <p className="text-xs text-[var(--text-muted)]">{p.body}</p>
          </div>
        ))}
      </div>

      {/* Grading */}
      <div className="card mb-8">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Success Criteria</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>✅ No NaN losses during first 500k steps</li>
          <li>✅ Episode reward ≥ 1000 after 1M steps</li>
          <li>✅ Episode reward ≥ 5000 after 5M steps</li>
          <li>✅ Reward curve trends upward in W&B / TensorBoard</li>
          <li>✅ Policy video shows forward locomotion, not random twitching</li>
          <li>⭐ Stretch: Match or beat Tianshou baseline reward curve</li>
          <li>⭐ Stretch: Run 5 seeds, report mean ± std</li>
        </ul>
      </div>

      {/* Hardware Table */}
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Hardware Comparison</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-xs text-[var(--text-muted)] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Hardware</th>
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Verdict</th>
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">5M steps</th>
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Multi-seed</th>
              <th className="text-left py-2 text-[var(--text-primary)] font-semibold">HP Sweep</th>
            </tr>
          </thead>
          <tbody>
            {HARDWARE_ROWS.map((r) => (
              <tr key={r.hw} className="border-b border-[var(--border)]">
                <td className="py-2 pr-4 text-[var(--text-primary)] font-medium">{r.hw}</td>
                <td className="py-2 pr-4">{r.verdict}</td>
                <td className="py-2 pr-4">{r.halfcheetah}</td>
                <td className="py-2 pr-4">{r.multi_seed}</td>
                <td className="py-2">{r.sweep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card border-orange-500/30">
        <p className="text-sm text-[var(--text-muted)]">
          <strong className="text-[var(--text-primary)]">Prerequisite:</strong> Complete the{' '}
          <Link href="/courses/reinforcement-learning" className="text-brand-300 hover:underline">RL course</Link>{' '}
          through Module 8 (PPO theory) before starting this project. Read the original{' '}
          <span className="text-[var(--text-primary)]">Schulman et al. 2017</span> paper alongside — the math section on the
          course page maps directly to every component here.
        </p>
      </div>
    </div>
  );
}
