import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: Tianshou CartPole Pipeline',
  description: 'Use Tianshou to build a reusable DQN experiment pipeline on CartPole-v1.',
};

const STEPS = [
  { title: 'Model the workflow / 先建模工作流', body: 'Define config, seeds, and logging before writing training code so experiments stay reproducible. / 在写训练代码前先定义配置、seed 和日志，让实验可复现。' },
  { title: 'Build policy and collectors / 搭建 policy 与 collector', body: 'Implement a small Q-network, wrap it in DQNPolicy, and connect collectors to vectorized environments. / 实现小型 Q 网络，封装成 DQNPolicy，并把 collector 接到向量化环境。' },
  { title: 'Use the trainer abstraction / 使用 trainer 抽象', body: 'Let Tianshou handle the experiment loop while you focus on metrics and failure analysis. / 让 Tianshou 处理实验循环，而你把注意力放在指标和错误分析上。' },
  { title: 'Generalize the pipeline / 推广管线', body: 'Make the same code easy to extend from CartPole to harder tasks. / 让同一套代码从 CartPole 平滑扩展到更难任务。' },
] as const;

const REFERENCES = [
  { label: 'Tianshou docs', href: 'https://tianshou.org/' },
  { label: 'Tianshou GitHub', href: 'https://github.com/thu-ml/tianshou' },
  { label: 'CartPole environment docs', href: 'https://gymnasium.farama.org/environments/classic_control/cart_pole/' },
  { label: 'Tianshou examples', href: 'https://github.com/thu-ml/tianshou/tree/master/examples' },
];

export default function TianshouCartPolePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8"><Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link><span className="mx-2">/</span><span className="text-[var(--text-primary)]">Tianshou CartPole</span></nav>
      <div className="flex items-start gap-4 mb-4"><span className="text-5xl">🧩</span><div><div className="flex gap-2 mb-2"><span className="badge badge-orange">RL</span><span className="badge badge-blue">Framework</span></div><h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Tianshou CartPole Pipeline / Tianshou CartPole 实验管线</h1></div></div>
      <p className="text-[var(--text-muted)] mb-8">This project teaches you how to stop rewriting reinforcement learning infrastructure from scratch. Instead, you learn how collectors, policies, replay buffers, and trainers fit together into a reusable experiment pipeline. <br />这个项目会让你不再反复重写强化学习基础设施，而是理解 collector、policy、replay buffer 和 trainer 如何组成可复用实验管线。</p>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">What you learn / 你会学到什么</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>▸ DQN pipeline with a framework / 使用框架搭建 DQN 管线</li><li>▸ Collector and vectorized env usage / Collector 与向量化环境使用</li><li>▸ Config-driven experimentation / 配置驱动实验</li><li>▸ Reusable RL engineering patterns / 可复用 RL 工程模式</li></ul></div>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-8 rounded-xl p-4">{`policy = ts.policy.DQNPolicy(
    model=q_net,
    optim=optim,
    discount_factor=0.99,
    estimation_step=3,
    target_update_freq=320,
)`}</pre>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Code walkthrough / 代码要点解释</h2><div className="space-y-4 text-sm text-[var(--text-muted)]"><p><span className="font-semibold text-[var(--text-primary)]">Abstraction is the main lesson / abstraction 才是核心 lesson：</span> Tianshou hides boilerplate, but you still need to understand what flows through each abstraction or you will not know how to debug. / Tianshou 会隐藏大量样板代码，但如果你不知道每层 abstraction 里流动的是什么，训练失败时就没法 debug。</p><p><span className="font-semibold text-[var(--text-primary)]">Frameworks change what you optimize for / 框架改变你的优化重心：</span> instead of hand-writing loops, you spend more effort on experiment design, metrics, and reproducibility. / 你不再花大量时间手写循环，而是把精力更多放在实验设计、指标和可复现性上。</p></div></div>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Build Steps / 构建步骤</h2><div className="space-y-3 mb-8">{STEPS.map((s) => <div key={s.title} className="card"><h3 className="font-semibold text-[var(--text-primary)]">{s.title}</h3><p className="text-sm text-[var(--text-muted)] mt-1">{s.body}</p></div>)}</div>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Common Pitfalls / 常见坑</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>▸ Using the framework without understanding transitions / 只会调用框架，不理解 transition 流动</li><li>▸ Wrong env seed handling / 环境 seed 处理错误</li><li>▸ Confusing trainer metrics with true evaluation / 把 trainer 指标误当成真实评估</li><li>▸ Reusing configs without checking hidden defaults / 复用配置时忽略隐藏默认值</li></ul></div>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Success Criteria / 完成标准</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>✅ CartPole training is reproducible across seeds / CartPole 训练结果在多 seed 下可复现</li><li>✅ You can explain what collector, policy, and trainer each own / 你能解释 collector、policy、trainer 各自负责什么</li><li>✅ The pipeline is easy to extend to a second environment / 这套管线可以平滑扩展到第二个环境</li></ul></div>
      <div className="card"><h2 className="font-bold text-[var(--text-primary)] mb-3">References / 参考资料</h2><ul className="space-y-2 text-sm">{REFERENCES.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-brand-200">{r.label}</a></li>)}</ul></div>
    </div>
  );
}
