import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Reinforcement Learning',
  description: 'From MDPs to PPO: RL in PyTorch and Gymnasium — with full mathematical foundations.',
};

const MODULES = [
  { id: 1,  title: 'MDPs & Bellman Equations',            desc: 'States, actions, rewards, discount factor, value functions — formally and intuitively.' },
  { id: 2,  title: 'Dynamic Programming',                 desc: 'Policy evaluation, policy iteration, value iteration — implemented on GridWorld.' },
  { id: 3,  title: 'Monte Carlo Methods',                 desc: 'On-policy MC, off-policy MC, importance sampling — with variance analysis.' },
  { id: 4,  title: 'Temporal Difference Learning',        desc: 'TD(0), SARSA, Q-learning — implement and benchmark each on Taxi-v3.' },
  { id: 5,  title: 'Deep Q-Networks (DQN)',               desc: 'Experience replay, target network, ε-greedy, Atari wrapper. Where it all connects.' },
  { id: 6,  title: 'Policy Gradient (REINFORCE)',         desc: 'Log-derivative trick derivation, baseline subtraction, variance reduction techniques.' },
  { id: 7,  title: 'Actor-Critic (A2C)',                  desc: 'Advantage function, shared networks, n-step returns — and why A2C beats REINFORCE.' },
  { id: 8,  title: 'Proximal Policy Optimization',        desc: 'Clip objective, GAE, entropy regularisation, full PPO in ~200 lines of PyTorch.' },
  { id: 9,  title: 'RL Engineering with Tianshou',        desc: 'Policies, collectors, vector replay buffers, trainer abstractions, and logger hooks.' },
  { id: 10, title: 'Project: Tianshou CartPole Pipeline', desc: 'Package DQN training into a configurable experiment workflow you can reuse.' },
  { id: 11, title: 'Capstone: PPO MuJoCo Agent',          desc: 'Train HalfCheetah-v4 from scratch, then compare against a library-based run.', isCapstone: true },
];

const MATH_BLOCKS = [
  {
    title: 'Markov Decision Process (MDP)',
    latex: false,
    content: [
      'An MDP is a tuple (S, A, P, R, γ) where S is the state space, A the action space, P(s\'|s,a) the transition kernel, R(s,a) the reward function, and γ ∈ [0,1) the discount factor.',
      'The agent seeks a policy π(a|s) that maximises the expected discounted return:',
      '  G_t = R_{t+1} + γR_{t+2} + γ²R_{t+3} + ⋯ = Σ_{k=0}^∞ γᵏ R_{t+k+1}',
    ],
  },
  {
    title: 'Bellman Expectation Equations',
    content: [
      'The state-value function V^π(s) satisfies the Bellman expectation equation:',
      '  V^π(s) = Σ_a π(a|s) Σ_{s\'} P(s\'|s,a) [R(s,a) + γ V^π(s\')]',
      'The action-value function Q^π(s,a) satisfies:',
      '  Q^π(s,a) = R(s,a) + γ Σ_{s\'} P(s\'|s,a) Σ_{a\'} π(a\'|s\') Q^π(s\',a\')',
      'These are fixed-point equations — policy evaluation solves them iteratively.',
    ],
  },
  {
    title: 'Bellman Optimality Equations',
    content: [
      'The optimal value functions V*(s) and Q*(s,a) satisfy:',
      '  V*(s) = max_a Σ_{s\'} P(s\'|s,a) [R(s,a) + γ V*(s\')]',
      '  Q*(s,a) = R(s,a) + γ Σ_{s\'} P(s\'|s,a) max_{a\'} Q*(s\',a\')',
      'Q-learning directly approximates Q* without knowing P, using the TD update:',
      '  Q(s,a) ← Q(s,a) + α [r + γ max_{a\'} Q(s\',a\') − Q(s,a)]',
    ],
  },
  {
    title: 'TD(λ) and Eligibility Traces',
    content: [
      'TD(0) uses a 1-step return; Monte Carlo uses the full episode. TD(λ) interpolates:',
      '  G_t^λ = (1−λ) Σ_{n=1}^∞ λ^{n−1} G_t^{(n)}',
      'where G_t^{(n)} = r_{t+1} + γr_{t+2} + ⋯ + γⁿ V(s_{t+n}) is the n-step return.',
      'Setting λ=0 recovers TD(0); λ=1 recovers Monte Carlo. In practice λ=0.95 (used in GAE) balances bias and variance well.',
    ],
  },
  {
    title: 'Policy Gradient Theorem',
    content: [
      'For a parameterised policy π_θ, the gradient of the expected return J(θ) is:',
      '  ∇_θ J(θ) = 𝔼_{τ~π_θ} [Σ_t ∇_θ log π_θ(a_t|s_t) · Q^π(s_t, a_t)]',
      'This is the Policy Gradient Theorem (Sutton et al., 2000). Subtracting a baseline b(s) that is independent of action does not bias the gradient but can substantially reduce variance:',
      '  ∇_θ J(θ) = 𝔼 [Σ_t ∇_θ log π_θ(a_t|s_t) · (Q^π(s_t,a_t) − b(s_t))]',
      'The advantage function A^π(s,a) = Q^π(s,a) − V^π(s) is the natural baseline choice.',
    ],
  },
  {
    title: 'Generalised Advantage Estimation (GAE)',
    content: [
      'GAE (Schulman et al., 2016) provides a low-variance, slightly-biased advantage estimate. Define the TD residual δ_t = r_t + γV(s_{t+1}) − V(s_t). Then:',
      '  Â_t^{GAE(γ,λ)} = Σ_{l=0}^∞ (γλ)^l δ_{t+l}',
      'This recursively computes as: Â_t = δ_t + γλ Â_{t+1}',
      'λ=1 → high-variance Monte Carlo advantage; λ=0 → low-variance 1-step TD advantage.',
      'Standard choice for PPO: γ=0.99, λ=0.95.',
    ],
  },
  {
    title: 'PPO Clipped Objective',
    content: [
      'Let r_t(θ) = π_θ(a_t|s_t) / π_{θ_old}(a_t|s_t) be the probability ratio. The PPO-Clip objective is:',
      '  L^{CLIP}(θ) = 𝔼_t [ min(r_t(θ)Â_t, clip(r_t(θ), 1−ε, 1+ε)Â_t) ]',
      'With ε=0.2, this prevents the new policy from moving too far from the old one.',
      'Full PPO loss: L = L^{CLIP} − c₁ · L^{VF} + c₂ · S[π_θ]',
      'where L^{VF} is the value function MSE loss and S[π_θ] is an entropy bonus for exploration.',
    ],
  },
];

const PITFALLS = [
  { icon: '⚠️', title: 'Reward scale matters',     body: 'Unscaled rewards destabilise both value function learning and policy gradient variance. Normalise rewards or use running statistics.' },
  { icon: '⚠️', title: 'Replay buffer too small',  body: 'DQN needs enough diversity in the buffer to break correlation. 100k+ transitions is standard; 10k will overfit early transitions.' },
  { icon: '⚠️', title: 'Target network lag',       body: 'Update target network too rarely and divergence risks increase; too frequently and you lose the stabilisation benefit. 1000-step hard copy or 0.005 soft update both work.' },
  { icon: '⚠️', title: 'Forgetting gradient clip', body: 'RL gradients can spike. Always clip by norm (max_norm=0.5 to 10 depending on algorithm). Missing this causes NaN Q-values.' },
  { icon: '⚠️', title: 'Off-by-one in done masks', body: 'The TD target at a terminal step should be r_T, not r_T + γ·V(s\'). A subtle bug here silently corrupts training.' },
  { icon: '⚠️', title: 'PPO stale advantages',     body: 'Recompute advantages fresh each rollout with the current value network. Do not reuse advantages across multiple PPO epochs.' },
];

export default function RLPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/courses" className="hover:text-slate-300">Courses</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Reinforcement Learning</span>
      </nav>

      <div className="flex items-start gap-4 mb-6">
        <span className="text-5xl">🎮</span>
        <div>
          <span className="badge badge-orange mb-2">Intermediate</span>
          <h1 className="text-4xl font-extrabold text-white">Reinforcement Learning</h1>
        </div>
      </div>

      <p className="text-slate-400 text-lg mb-4 max-w-2xl">
        From Markov Decision Processes to Proximal Policy Optimization in 11 modules.
        You implement core algorithms by hand first — understanding every equation — then
        learn how to scale experiments with Tianshou the way a real team would.
      </p>

      <div className="flex gap-6 text-sm text-slate-500 mb-12">
        <span>⏱ ~34 hours</span>
        <span>📦 11 modules</span>
        <span>🐍 PyTorch 2.x · Gymnasium 0.29+ · Tianshou</span>
      </div>

      {/* Prerequisites */}
      <div className="card mb-10">
        <h2 className="font-semibold text-white mb-2">Prerequisites</h2>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>▸ PyTorch Foundations (training loops, nn.Module, DataLoader)</li>
          <li>▸ Probability basics — expectation, conditional probability, Bayes' rule</li>
          <li>▸ Calculus — partial derivatives, chain rule (gradient derivations are shown in full)</li>
          <li>▸ Comfort reading small research papers and library documentation</li>
        </ul>
      </div>

      {/* Math Foundations */}
      <h2 className="text-2xl font-bold text-white mb-2">Mathematical Foundations</h2>
      <p className="text-slate-400 text-sm mb-6 max-w-2xl">
        Every key equation is derived inline in the relevant module. This reference gives you the
        full picture up front so notation is never a surprise mid-lecture.
      </p>

      <div className="space-y-4 mb-12">
        {MATH_BLOCKS.map((block) => (
          <div key={block.title} className="card">
            <h3 className="font-semibold text-white mb-3">{block.title}</h3>
            <div className="space-y-2">
              {block.content.map((line, i) => (
                line.startsWith('  ') ? (
                  <pre key={i} className="text-sm font-mono text-orange-300 bg-orange-950/30 rounded px-3 py-2 overflow-x-auto">
                    {line.trim()}
                  </pre>
                ) : (
                  <p key={i} className="text-sm text-slate-400">{line}</p>
                )
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Why Tianshou */}
      <div className="card mb-10">
        <h2 className="font-semibold text-white mb-2">Why Tianshou matters</h2>
        <p className="text-sm text-slate-400">
          Hand-written RL code teaches you the fundamentals. Tianshou teaches you how to run repeatable
          experiments, swap policies without rewriting everything, and structure collectors, buffers, and
          trainers the way an engineering team actually would. Both skills are required — this course gives
          you both.
        </p>
      </div>

      {/* Common Pitfalls */}
      <h2 className="text-2xl font-bold text-white mb-6">Common Pitfalls</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.title} className="card border-yellow-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span>{p.icon}</span>
              <h3 className="font-semibold text-white text-sm">{p.title}</h3>
            </div>
            <p className="text-xs text-slate-400">{p.body}</p>
          </div>
        ))}
      </div>

      {/* Modules */}
      <h2 className="text-2xl font-bold text-white mb-6">Course Modules</h2>
      <div className="space-y-3">
        {MODULES.map((mod) => (
          <div key={mod.id}
               className={`card flex items-start gap-4 ${mod.isCapstone ? 'border-orange-500/50' : ''}`}>
            <span className={`text-lg font-mono font-bold shrink-0 ${mod.isCapstone ? 'text-orange-400' : 'text-slate-600'}`}>
              {String(mod.id).padStart(2, '0')}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{mod.title}</h3>
                {mod.isCapstone && <span className="badge badge-orange">Capstone</span>}
              </div>
              <p className="text-sm text-slate-400 mt-0.5">{mod.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Capstone CTA */}
      <div className="mt-10 p-6 rounded-2xl"
           style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,179,8,0.08))',
                    border: '1px solid rgba(249,115,22,0.3)' }}>
        <h3 className="text-lg font-bold text-white mb-2">🏁 Capstone: PPO MuJoCo Agent</h3>
        <p className="text-slate-400 text-sm mb-4">
          Implement full PPO (clip + GAE) using the math above, and train a HalfCheetah-v4 agent to sprint forward.
          Then compare your scratch implementation against a Tianshou workflow — you will understand both
          what the library abstracts and why those abstractions exist.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects/ppo-mujoco"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500
                           text-white text-sm font-semibold transition-colors">
            View PPO Guide →
          </Link>
          <Link href="/projects/tianshou-cartpole"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-500/40 hover:border-orange-400
                           text-orange-200 text-sm font-semibold transition-colors">
            View Tianshou Project →
          </Link>
        </div>
      </div>
    </div>
  );
}
