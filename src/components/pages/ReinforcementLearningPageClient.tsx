'use client';

import Link from 'next/link';
import type { Metadata } from 'next';
import { useSitePreferences } from '@/components/providers/SiteProviders';

export const metadata: Metadata = {
  title: 'Reinforcement Learning',
  description: 'From MDPs to PPO with detailed, beginner-friendly modules and Tianshou engineering workflow.',
};

const COPY = {
  en: {
    breadcrumb: 'Reinforcement Learning',
    title: 'Reinforcement Learning',
    intro: 'RL is where many smart engineers get lost because it mixes probability, optimization, function approximation, and systems issues all at once. This course slows the field down into understandable steps, then rebuilds it into scratch implementations and Tianshou workflows.',
    guideTitle: 'How beginners should use this course',
    guideItems: ['Start with tabular environments. They are not toys, they are microscopes.', 'Plot everything: reward, episode length, value estimates, exploration rate, and losses.', 'Keep your scratch implementations even after switching to Tianshou. They are your debugging reference.', 'Do not trust any RL result you cannot reproduce across seeds and reruns.'],
    mathTitle: 'Mathematical Foundations',
    modulesTitle: 'Detailed Modules',
    learn: 'You will learn',
    practice: 'Hands-on practice',
    output: 'Expected output',
    pitfallsTitle: 'Common Pitfalls',
    capstoneTitle: '🏁 Capstone: PPO MuJoCo Agent',
    capstoneBody: 'The capstone forces you to combine theory, implementation, logging discipline, and engineering judgment. If you can finish this project and explain why PPO worked or failed, you have moved from RL tourist to RL practitioner.',
    ppoCta: 'View PPO Guide →',
    tianshouCta: 'View Tianshou Project →',
    hours: '~34 hours',
    modulesCount: '11 modules',
    moduleCta: 'Open module lesson →',
  },
  zh: {
    breadcrumb: '强化学习',
    title: '强化学习',
    intro: '强化学习让很多聪明工程师栽跟头，因为它同时混合了概率、优化、函数逼近和系统工程问题。这门课会把这个领域拆成可理解的步骤，再一步步重建成从零实现和 Tianshou 工程工作流。',
    guideTitle: '初学者应该怎样使用这门课',
    guideItems: ['从表格型环境开始，它们不是玩具，而是显微镜。', '把所有东西都画出来：reward、episode length、value estimates、探索率和 loss。', '即使切到 Tianshou，也要保留你的 scratch 实现，它们是最好的 debug 参考。', '凡是不能跨随机种子和重复运行复现的 RL 结果，都不要轻信。'],
    mathTitle: '数学基础',
    modulesTitle: '详细模块',
    learn: '你将掌握',
    practice: '动手练习',
    output: '阶段产出',
    pitfallsTitle: '常见坑',
    capstoneTitle: '🏁 压轴项目：PPO MuJoCo 智能体',
    capstoneBody: '这个压轴项目会逼你把理论、实现、日志纪律和工程判断结合起来。如果你能完成它，并解释 PPO 为什么成功或失败，那你就已经从 RL 观光客进化成了 RL 实践者。',
    ppoCta: '查看 PPO 指南 →',
    tianshouCta: '查看 Tianshou 项目 →',
    hours: '约 34 小时',
    modulesCount: '11 个模块',
    moduleCta: '进入模块单页 →',
  },
} as const;

const MODULE_SLUGS = ['mdps-bellman','dynamic-programming','monte-carlo-methods','temporal-difference-learning','deep-q-networks','policy-gradients','actor-critic','ppo','tianshou-engineering','cartpole-project','ppo-mujoco-capstone'] as const;

const MODULES = [
  { id: 1, en: { title: 'MDPs and Bellman Thinking', summary: 'Learn the formal language of RL before touching algorithms.', learn: ['What states, actions, rewards, transitions, and return actually mean', 'Why Bellman equations sit at the center of RL reasoning', 'How discounting changes optimization goals'], practice: 'Model a toy GridWorld as an MDP and write out returns for several trajectories.', output: 'A short MDP worksheet with Bellman updates done by hand.' }, zh: { title: 'MDP 与 Bellman 思维', summary: '在碰算法之前，先掌握强化学习的形式化语言。', learn: ['真正理解 state、action、reward、transition 和 return', '为什么 Bellman 方程处在 RL 推理的中心', 'discount factor 如何改变优化目标'], practice: '把一个 toy GridWorld 建模成 MDP，并手写多条轨迹的 return。', output: '一份手算 Bellman 更新的 MDP 小练习。' } },
  { id: 2, en: { title: 'Dynamic Programming', summary: 'Solve small environments exactly so value iteration intuition becomes concrete.', learn: ['Difference between policy evaluation and policy improvement', 'How value iteration converges to an optimal policy', 'Why tabular exact methods matter even if they do not scale'], practice: 'Implement policy iteration and value iteration on GridWorld.', output: 'A working tabular solver plus value heatmaps.' }, zh: { title: '动态规划', summary: '在小环境上做精确求解，把 value iteration 的直觉真正建立起来。', learn: ['策略评估与策略改进的区别', 'value iteration 如何收敛到最优策略', '为什么表格型精确方法即使不扩展，也依然重要'], practice: '在 GridWorld 上实现 policy iteration 和 value iteration。', output: '一个可运行的表格求解器，以及价值热力图。' } },
  { id: 3, en: { title: 'Monte Carlo Methods', summary: 'Estimate value from full episodes without bootstrapping.', learn: ['How first-visit and every-visit Monte Carlo differ', 'Why Monte Carlo can be unbiased but high variance', 'How importance sampling enters off-policy correction'], practice: 'Estimate state values from sampled episodes and compare variance across seeds.', output: 'A notebook comparing Monte Carlo estimates against exact tabular solutions.' }, zh: { title: 'Monte Carlo 方法', summary: '不依赖 bootstrapping，而是直接从完整 episode 估计价值。', learn: ['first-visit 与 every-visit Monte Carlo 的区别', '为什么 Monte Carlo 可以无偏但高方差', 'importance sampling 如何进入 off-policy 校正'], practice: '用采样 episode 估计 state value，并比较不同 seed 的方差。', output: '一个把 Monte Carlo 估计和精确表格解做对比的 notebook。' } },
  { id: 4, en: { title: 'Temporal Difference Learning', summary: 'Bridge Monte Carlo and dynamic programming with bootstrapped learning.', learn: ['How TD(0), SARSA, and Q-learning differ', 'Why off-policy Q-learning can learn optimal behavior from exploratory data', 'How done masks and bootstrapping interact'], practice: 'Train TD variants on Taxi-v3 and compare convergence speed.', output: 'A benchmark plot showing reward curves for SARSA vs Q-learning.' }, zh: { title: '时序差分学习', summary: '通过 bootstrapped learning 把 Monte Carlo 和动态规划连接起来。', learn: ['TD(0)、SARSA 和 Q-learning 的区别', '为什么 off-policy 的 Q-learning 能从探索数据中学出最优行为', 'done mask 和 bootstrapping 如何相互作用'], practice: '在 Taxi-v3 上训练多种 TD 变体，并比较收敛速度。', output: '一张对比 SARSA 和 Q-learning reward 曲线的 benchmark 图。' } },
  { id: 5, en: { title: 'Deep Q-Networks', summary: 'Move from tables to neural approximators without losing algorithmic clarity.', learn: ['Why replay buffers and target networks stabilize learning', 'How ε-greedy exploration influences data quality', 'Why Atari preprocessing is part of the algorithm'], practice: 'Build a DQN agent for Pong or CartPole with replay and target updates.', output: 'A scratch DQN implementation with reward and Q-value stability plots.' }, zh: { title: '深度 Q 网络', summary: '从表格方法走向神经网络逼近，同时不失去算法清晰度。', learn: ['为什么 replay buffer 和 target network 会稳定训练', 'ε-greedy 探索如何影响数据质量', '为什么 Atari preprocessing 是算法的一部分'], practice: '为 Pong 或 CartPole 构建带 replay 和 target update 的 DQN 智能体。', output: '一份从零实现的 DQN，包含 reward 和 Q-value 稳定性曲线。' } },
  { id: 6, en: { title: 'Policy Gradient and REINFORCE', summary: 'Optimize policies directly and understand the variance pain that comes with it.', learn: ['Where the log-derivative trick comes from', 'Why policy gradients are unbiased but noisy', 'How baselines reduce variance without bias'], practice: 'Train REINFORCE on CartPole and compare raw returns with baseline-corrected returns.', output: 'A small experiment showing why variance reduction matters.' }, zh: { title: '策略梯度与 REINFORCE', summary: '直接优化策略，并真正感受它伴随而来的方差痛苦。', learn: ['log-derivative trick 从何而来', '为什么策略梯度无偏但很噪', 'baseline 如何在不引入偏差时降低方差'], practice: '在 CartPole 上训练 REINFORCE，并对比加入 baseline 前后的回报。', output: '一个说明方差降低为什么关键的小实验。' } },
  { id: 7, en: { title: 'Actor-Critic Methods', summary: 'Combine value estimation and policy learning into a more practical training loop.', learn: ['How the critic provides lower-variance learning signals', 'Why advantage estimates bridge value and policy learning', 'How n-step returns improve learning speed'], practice: 'Implement a simple A2C loop on a low-dimensional environment.', output: 'A working actor-critic baseline with policy and value loss tracking.' }, zh: { title: 'Actor-Critic 方法', summary: '把价值估计和策略学习结合进一个更实用的训练循环。', learn: ['critic 如何提供更低方差的学习信号', '为什么 advantage 是价值学习和策略学习的桥梁', 'n-step return 如何提升学习速度'], practice: '在一个低维环境上实现简单的 A2C 训练循环。', output: '一个带 policy loss 和 value loss 跟踪的 actor-critic baseline。' } },
  { id: 8, en: { title: 'Proximal Policy Optimization', summary: 'Learn the standard practical policy-gradient algorithm used in many modern baselines.', learn: ['Why clipped objectives stabilize updates', 'How GAE balances bias and variance', 'How rollout length, mini-batches, and entropy bonuses interact'], practice: 'Build PPO in PyTorch and train on a continuous-control task.', output: 'A PPO trainer with separate actor/critic losses and rollout diagnostics.' }, zh: { title: '近端策略优化 PPO', summary: '掌握现代强化学习基线中最常见的实用策略梯度算法。', learn: ['为什么 clip objective 能稳定更新', 'GAE 如何平衡 bias 与 variance', 'rollout 长度、mini-batch 和 entropy bonus 如何相互影响'], practice: '用 PyTorch 构建 PPO，并在连续控制任务上训练。', output: '一个带 actor/critic 分离损失和 rollout 诊断信息的 PPO trainer。' } },
  { id: 9, en: { title: 'RL Engineering with Tianshou', summary: 'Move from algorithm demos to reproducible experiment pipelines.', learn: ['How Tianshou structures policies, collectors, buffers, and trainers', 'Why libraries matter once experiments become repetitive', 'How to preserve understanding while still using abstractions'], practice: 'Rebuild a previous scratch algorithm using Tianshou components.', output: 'A clean experiment config that reruns the same policy reliably.' }, zh: { title: '用 Tianshou 做 RL 工程化', summary: '从算法 demo 走向可复现实验流水线。', learn: ['Tianshou 如何组织 policy、collector、buffer 和 trainer', '当实验开始重复时，为什么库抽象会变得重要', '如何在使用抽象的同时仍保持理解力'], practice: '用 Tianshou 组件重建一个你之前手写过的算法。', output: '一个能稳定复现实验结果的配置化实验流程。' } },
  { id: 10, en: { title: 'CartPole Pipeline Project', summary: 'Turn a small RL experiment into a real engineering workflow.', learn: ['How to parameterize runs and compare seeds systematically', 'How to save checkpoints and evaluation policies', 'How to prepare a lightweight RL experiment for reuse'], practice: 'Package a CartPole Tianshou pipeline with config files and logging.', output: 'A reusable RL project template with training and evaluation entrypoints.' }, zh: { title: 'CartPole 流水线项目', summary: '把一个小型 RL 实验变成真正的工程工作流。', learn: ['如何参数化实验并系统比较不同 seed', '如何保存 checkpoint 和评估策略', '如何把轻量 RL 实验打包成可复用模板'], practice: '用配置文件和日志系统打包一个 CartPole 的 Tianshou 流水线。', output: '一个包含训练与评估入口的可复用 RL 项目模板。' } },
  { id: 11, isCapstone: true, en: { title: 'Capstone: PPO on MuJoCo', summary: 'Apply everything to a harder continuous-control setting.', learn: ['How PPO behaves in continuous action spaces', 'How reward scale and observation normalization affect training', 'How to compare scratch and library implementations critically'], practice: 'Train HalfCheetah-v4 with scratch PPO and compare it with a Tianshou implementation.', output: 'A capstone report with reward curves, failure modes, and engineering tradeoffs.' }, zh: { title: '压轴：MuJoCo 上的 PPO', summary: '把所有内容带到一个更难的连续控制场景中。', learn: ['PPO 在连续动作空间中会如何表现', 'reward scale 与 observation normalization 如何影响训练', '如何严谨比较手写实现和库实现'], practice: '用 scratch PPO 训练 HalfCheetah-v4，并和 Tianshou 实现做对比。', output: '一份包含 reward 曲线、失败模式和工程 tradeoff 的压轴报告。' } },
] as const;

const MATH_BLOCKS = [
  { en: { title: 'Return and discounting', content: ['RL optimizes expected future return, not immediate reward alone.', 'Discounting captures the intuition that near-term outcomes usually matter more or are more certain.', 'Once this clicks, most value-function equations become easier to interpret.'] }, zh: { title: '回报与折扣因子', content: ['强化学习优化的是未来总回报的期望，而不是即时奖励本身。', '折扣因子表达了“近处结果通常更重要或更确定”的直觉。', '一旦这个点想明白，大部分 value function 方程就都更容易读懂。'] } },
  { en: { title: 'Bellman recursion', content: ['Bellman equations decompose a long-horizon problem into one-step reward plus future value.', 'That recursive structure unifies dynamic programming, TD, Q-learning, and PPO thinking.', 'RL feels fragmented until you see this shared backbone clearly.'] }, zh: { title: 'Bellman 递归', content: ['Bellman 方程把长时程问题拆成“一步奖励 + 未来价值”。', '这套递归结构把动态规划、TD、Q-learning 和 PPO 串在了一起。', '在看清这条主干之前，强化学习会显得非常碎片化。'] } },
  { en: { title: 'Bias-variance tradeoffs everywhere', content: ['Monte Carlo, TD, GAE, replay buffers, and target networks all manage different bias-variance tradeoffs.', 'A lot of RL engineering is about accepting tolerable bias in exchange for trainable variance.', 'Once learners see that, the field stops looking random and starts looking structured.'] }, zh: { title: '无处不在的 bias-variance tradeoff', content: ['Monte Carlo、TD、GAE、replay buffer 和 target network 都在处理不同层面的 bias-variance tradeoff。', '很多 RL 工程本质上是在接受可容忍偏差，以换取可训练的方差。', '一旦看到这一点，整个领域就不再像随机拼盘，而开始显现结构。'] } },
] as const;

const PITFALLS = [
  { en: { title: 'Treating reward as ground-truth quality', body: 'Reward is only as good as the environment signal. Agents can exploit reward design flaws while still looking successful.' }, zh: { title: '把 reward 当成真实质量指标', body: 'reward 的好坏完全取决于环境设计。智能体可能钻奖励漏洞，但看起来仍然“成功”。' } },
  { en: { title: 'Debugging too late', body: 'A rollout collection bug can waste hours silently. Validate tiny runs and inspect transitions before committing to long training.' }, zh: { title: '调试太晚', body: '一个 rollout 收集 bug 可以静默浪费你几个小时。在长训之前，先验证小规模运行并检查 transition。' } },
  { en: { title: 'Ignoring variance across seeds', body: 'One good run proves almost nothing. RL outcomes often swing dramatically with seed choice.' }, zh: { title: '忽略随机种子间方差', body: '一次好结果几乎不能证明什么。RL 的结果常常会随着 seed 大幅波动。' } },
  { en: { title: 'Jumping to MuJoCo too early', body: 'If CartPole and Taxi are not deeply understood, PPO on continuous control will feel like magic and failure will be impossible to diagnose.' }, zh: { title: '过早跳到 MuJoCo', body: '如果你还没真正吃透 CartPole 和 Taxi，那连续控制上的 PPO 会像魔法一样，失败时也无法定位原因。' } },
] as const;

export function ReinforcementLearningPageClient() {
  const { locale } = useSitePreferences();
  const t = COPY[locale];
  const isZh = locale === 'zh';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/courses" className="hover:text-[var(--text-primary)]">{isZh ? '课程' : 'Courses'}</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]">{t.breadcrumb}</span>
      </nav>

      <div className="flex items-start gap-4 mb-6">
        <span className="text-5xl">🎮</span>
        <div>
          <span className="badge badge-orange mb-2">{isZh ? '进阶' : 'Intermediate'}</span>
          <h1 className="text-4xl font-extrabold text-[var(--text-primary)]">{t.title}</h1>
        </div>
      </div>

      <p className="text-[var(--text-muted)] text-lg mb-4 max-w-3xl">{t.intro}</p>

      <div className="flex gap-6 text-sm text-[var(--text-muted)] mb-12 flex-wrap">
        <span>⏱ {t.hours}</span>
        <span>📦 {t.modulesCount}</span>
        <span>🐍 PyTorch 2.x · Gymnasium · Tianshou</span>
      </div>

      <div className="card mb-10">
        <h2 className="font-semibold text-[var(--text-primary)] mb-2">{t.guideTitle}</h2>
        <ul className="text-sm text-[var(--text-muted)] space-y-2">
          {t.guideItems.map((item) => <li key={item}>▸ {item}</li>)}
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{t.mathTitle}</h2>
      <div className="space-y-4 mb-12">
        {MATH_BLOCKS.map((block) => (
          <div key={block.en.title} className="card">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">{block[locale].title}</h3>
            <div className="space-y-2">{block[locale].content.map((line) => <p key={line} className="text-sm text-[var(--text-muted)]">{line}</p>)}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{t.modulesTitle}</h2>
      <div className="space-y-4">
        {MODULES.map((mod) => (
          <div key={mod.id} className={`card ${('isCapstone' in mod && mod.isCapstone) ? 'border-orange-500/50' : ''}`}>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className={`text-lg font-mono font-bold ${('isCapstone' in mod && mod.isCapstone) ? 'text-orange-400' : 'text-[var(--text-muted)]'}`}>{String(mod.id).padStart(2, '0')}</span>
              <h3 className="font-semibold text-[var(--text-primary)]">{mod[locale].title}</h3>
              {('isCapstone' in mod && mod.isCapstone) && <span className="badge badge-orange">Capstone</span>}
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">{mod[locale].summary}</p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div><p className="font-semibold text-[var(--text-primary)] mb-2">{t.learn}</p><ul className="space-y-1 text-[var(--text-muted)]">{mod[locale].learn.map((item) => <li key={item}>▸ {item}</li>)}</ul></div>
              <div><p className="font-semibold text-[var(--text-primary)] mb-2">{t.practice}</p><p className="text-[var(--text-muted)]">{mod[locale].practice}</p></div>
              <div><p className="font-semibold text-[var(--text-primary)] mb-2">{t.output}</p><p className="text-[var(--text-muted)]">{mod[locale].output}</p></div>
            </div>
            <div className="mt-4">
              <Link href={`/courses/reinforcement-learning/${MODULE_SLUGS[mod.id - 1]}`} className="text-sm text-brand-300 hover:text-brand-200 font-medium">{t.moduleCta}</Link>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-12 mb-6">{t.pitfallsTitle}</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.en.title} className="card border-yellow-500/20">
            <div className="flex items-center gap-2 mb-1"><span>⚠️</span><h3 className="font-semibold text-[var(--text-primary)] text-sm">{p[locale].title}</h3></div>
            <p className="text-xs text-[var(--text-muted)]">{p[locale].body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,179,8,0.08))', border: '1px solid rgba(249,115,22,0.3)' }}>
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t.capstoneTitle}</h3>
        <p className="text-[var(--text-muted)] text-sm mb-4">{t.capstoneBody}</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects/ppo-mujoco" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold transition-colors">{t.ppoCta}</Link>
          <Link href="/projects/tianshou-cartpole" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-orange-500/40 hover:border-orange-400 text-orange-200 text-sm font-semibold transition-colors">{t.tianshouCta}</Link>
        </div>
      </div>
    </div>
  );
}
