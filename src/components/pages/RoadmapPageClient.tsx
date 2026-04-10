'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useSitePreferences } from '@/components/providers/SiteProviders';

export const metadata: Metadata = {
  title: 'Learning Roadmap',
  description: 'Step-by-step roadmap from Python basics to production ML: PyTorch, Transformers, RL.',
};

const PHASES = [
  {
    id: 1,
    icon: '🐍',
    color: 'border-green-500',
    en: {
      title: 'Python & Math Foundations',
      duration: '2–3 weeks',
      summary: 'The bedrock. Skip it if you are already comfortable with NumPy broadcasting and can derive a partial derivative by hand.',
      items: [
        { label: 'NumPy vectorised ops & broadcasting' },
        { label: 'Linear algebra: matrices, eigenvectors, SVD', href: '/math#linear-algebra' },
        { label: 'Calculus: partial derivatives, chain rule', href: '/math#calculus' },
        { label: 'Probability & statistics: expectation, Bayes, MLE', href: '/math#probability' },
        { label: 'Python typing, dataclasses, protocols', note: 'Used throughout all projects' },
      ],
    },
    zh: {
      title: 'Python 与数学基础',
      duration: '2–3 周',
      summary: '这是地基。如果你已经熟悉 NumPy broadcasting，并且能手推偏导，可以适当跳过一部分。',
      items: [
        { label: 'NumPy 向量化操作与 broadcasting' },
        { label: '线性代数：矩阵、特征向量、SVD', href: '/math#linear-algebra' },
        { label: '微积分：偏导数、链式法则', href: '/math#calculus' },
        { label: '概率统计：期望、贝叶斯、极大似然', href: '/math#probability' },
        { label: 'Python typing、dataclasses、protocols', note: '后续全部项目都会用到' },
      ],
    },
  },
  {
    id: 2,
    icon: '🔥',
    color: 'border-blue-500',
    en: {
      title: 'PyTorch Core',
      duration: '3–4 weeks',
      summary: 'Build the mental model for tensors, autograd, and training loops before adding model complexity.',
      items: [
        { label: 'Tensor ops, device management (CPU/GPU/MPS)', href: '/courses/pytorch-foundations' },
        { label: 'Autograd & computational graph' },
        { label: 'nn.Module, optimisers, loss functions' },
        { label: 'DataLoader, Dataset, transforms' },
        { label: 'Training loop patterns: clipping, scheduling, validation' },
        { label: 'Project: CNN image classifier', href: '/projects/cnn-classifier', note: 'First portfolio project' },
      ],
    },
    zh: {
      title: 'PyTorch 核心能力',
      duration: '3–4 周',
      summary: '在增加模型复杂度之前，先建立对 tensor、autograd 和训练循环的稳定心智模型。',
      items: [
        { label: 'Tensor 操作与设备管理（CPU/GPU/MPS）', href: '/courses/pytorch-foundations' },
        { label: 'Autograd 与计算图' },
        { label: 'nn.Module、优化器、损失函数' },
        { label: 'DataLoader、Dataset、transforms' },
        { label: '训练循环模式：梯度裁剪、调度器、验证' },
        { label: '项目：CNN 图像分类器', href: '/projects/cnn-classifier', note: '第一个作品集项目' },
      ],
    },
  },
  {
    id: 3,
    icon: '🤖',
    color: 'border-purple-500',
    en: {
      title: 'Transformer Architecture',
      duration: '4–5 weeks',
      summary: 'The architecture behind every frontier model. Implement each component from scratch so nothing remains a black box.',
      items: [
        { label: 'Scaled dot-product attention', href: '/courses/transformer-deep-dive' },
        { label: 'Positional encoding & multi-head attention' },
        { label: 'Layer norm, residuals, feed-forward blocks' },
        { label: 'Encoder / decoder stacks' },
        { label: 'Pre-training vs fine-tuning: BERT vs GPT' },
        { label: 'Hugging Face: Trainer, tokenizers, model hub' },
        { label: 'Project: Build mini-GPT', href: '/projects/mini-gpt', note: 'Generative LM from scratch' },
        { label: 'Project: BERT fine-tune for NLP', href: '/projects/bert-finetune', note: 'Classification pipeline' },
      ],
    },
    zh: {
      title: 'Transformer 架构',
      duration: '4–5 周',
      summary: '所有前沿模型背后的主力架构。你会从零实现每个组件，不再把它们当黑盒。',
      items: [
        { label: '缩放点积注意力', href: '/courses/transformer-deep-dive' },
        { label: '位置编码与多头注意力' },
        { label: 'LayerNorm、残差连接、前馈网络' },
        { label: 'Encoder / Decoder 堆叠' },
        { label: '预训练与微调：BERT vs GPT' },
        { label: 'Hugging Face：Trainer、tokenizer、model hub' },
        { label: '项目：构建 mini-GPT', href: '/projects/mini-gpt', note: '从零实现生成式语言模型' },
        { label: '项目：微调 BERT 做 NLP 任务', href: '/projects/bert-finetune', note: '分类流水线' },
      ],
    },
  },
  {
    id: 4,
    icon: '🎮',
    color: 'border-orange-500',
    en: {
      title: 'Reinforcement Learning',
      duration: '4–5 weeks',
      summary: 'Sequential decision making from first principles. The math maps directly to every algorithm you implement.',
      items: [
        { label: 'MDPs, Bellman equations, value functions', href: '/courses/reinforcement-learning' },
        { label: 'Dynamic programming: policy & value iteration' },
        { label: 'Monte Carlo & temporal difference methods' },
        { label: 'Q-learning & DQN' },
        { label: 'Policy gradient theorem & REINFORCE' },
        { label: 'Actor-Critic and PPO' },
        { label: 'RL libraries: Tianshou pipeline', href: '/projects/tianshou-cartpole' },
        { label: 'Project: DQN for Atari Pong', href: '/projects/dqn-pong', note: 'CNN + replay buffer' },
        { label: 'Project: PPO MuJoCo HalfCheetah', href: '/projects/ppo-mujoco', note: 'Capstone' },
      ],
    },
    zh: {
      title: '强化学习',
      duration: '4–5 周',
      summary: '从第一性原理理解序列决策问题，数学内容会直接映射到你写下的每个算法。',
      items: [
        { label: 'MDP、Bellman 方程、价值函数', href: '/courses/reinforcement-learning' },
        { label: '动态规划：策略迭代与价值迭代' },
        { label: 'Monte Carlo 与时序差分方法' },
        { label: 'Q-learning 与 DQN' },
        { label: '策略梯度定理与 REINFORCE' },
        { label: 'Actor-Critic 与 PPO' },
        { label: 'RL 库：Tianshou 流水线', href: '/projects/tianshou-cartpole' },
        { label: '项目：Atari Pong 的 DQN', href: '/projects/dqn-pong', note: 'CNN + replay buffer' },
        { label: '项目：PPO MuJoCo HalfCheetah', href: '/projects/ppo-mujoco', note: '压轴项目' },
      ],
    },
  },
  {
    id: 5,
    icon: '🚀',
    color: 'border-teal-500',
    en: {
      title: 'Production & Scale',
      duration: '2–3 weeks',
      summary: 'Close the gap between working code and code you can run overnight at scale.',
      items: [
        { label: 'Mixed precision training', href: '/hardware#mixed-precision' },
        { label: 'Gradient checkpointing & memory profiling' },
        { label: 'Distributed training basics', href: '/hardware#distributed' },
        { label: 'Model export: TorchScript, ONNX, torch.compile' },
        { label: 'FastAPI + Docker inference server', href: '/projects/inference-server' },
        { label: 'Hyperparameter sweeps with W&B or Optuna' },
      ],
    },
    zh: {
      title: '生产化与规模化',
      duration: '2–3 周',
      summary: '补上“代码能跑”和“代码能稳定跑一夜并扩展”的差距。',
      items: [
        { label: '混合精度训练', href: '/hardware#mixed-precision' },
        { label: '梯度检查点与内存分析' },
        { label: '分布式训练基础', href: '/hardware#distributed' },
        { label: '模型导出：TorchScript、ONNX、torch.compile' },
        { label: 'FastAPI + Docker 推理服务', href: '/projects/inference-server' },
        { label: '用 W&B 或 Optuna 做超参数搜索' },
      ],
    },
  },
] as const;

export function RoadmapPageClient() {
  const { locale } = useSitePreferences();
  const isZh = locale === 'zh';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">{isZh ? '学习路线图' : 'Learning Roadmap'}</h1>
        <p className="text-[var(--text-muted)] text-lg max-w-2xl mb-4">
          {isZh
            ? '这是一条从 Python 工程能力走向生产级 ML 工程能力的结构化路径。总计约 14–20 周，每个阶段都至少会产出一个能放进作品集的真实项目。'
            : 'A structured path from Python competency to production ML engineer. Estimated total: 14–20 weeks at 10–15 hrs/week, with real portfolio projects at the end of each phase.'}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">{isZh ? '阶段 1–2：基础' : 'Phase 1–2: Foundation'}</span>
          <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30">{isZh ? '阶段 3：Transformer' : 'Phase 3: Transformers'}</span>
          <span className="px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">{isZh ? '阶段 4：强化学习' : 'Phase 4: RL'}</span>
          <span className="px-3 py-1 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/30">{isZh ? '阶段 5：规模化' : 'Phase 5: Scale'}</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-[22px] top-0 bottom-0 w-0.5 bg-[var(--border)]" />
        <div className="space-y-10">
          {PHASES.map((phase) => (
            <div key={phase.id} className="relative flex gap-6">
              <div className={`relative z-10 flex-shrink-0 w-11 h-11 rounded-full border-2 ${phase.color} bg-[var(--bg-card)] flex items-center justify-center text-xl`}>
                {phase.icon}
              </div>

              <div className="flex-1 pb-4">
                <div className="flex flex-wrap items-baseline gap-3 mb-2">
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">
                    {isZh ? `阶段 ${phase.id}：${phase[locale].title}` : `Phase ${phase.id}: ${phase[locale].title}`}
                  </h2>
                  <span className="badge badge-blue text-xs">{phase[locale].duration}</span>
                </div>

                <p className="text-sm text-[var(--text-muted)] mb-3 max-w-xl">{phase[locale].summary}</p>

                <ul className="space-y-2">
                  {phase[locale].items.map((item) => (
                    <li key={item.label} className="flex items-start gap-3 text-sm">
                      <span className="text-brand-400 mt-0.5 shrink-0">▸</span>
                      <span className="flex flex-wrap items-center gap-2">
                        {('href' in item && item.href) ? (
                          <Link href={('href' in item && item.href) || '/'} className="text-[var(--text-primary)] hover:text-brand-300 transition-colors">
                            {item.label}
                          </Link>
                        ) : (
                          <span className="text-[var(--text-muted)]">{item.label}</span>
                        )}
                        {('note' in item && item.note) && <span className="text-xs text-[var(--text-muted)] italic">{item.note}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 card text-center p-8" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.10), rgba(249,115,22,0.06))', border: '1px solid rgba(99,102,241,0.20)' }}>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{isZh ? '从你最熟悉的地方开始' : 'Start with what you know'}</h3>
        <p className="text-[var(--text-muted)] text-sm mb-6 max-w-md mx-auto">
          {isZh
            ? '如果你已经熟悉 Python 和 NumPy，可以从 PyTorch Foundations 开始。已经懂 PyTorch，就直接进入 Transformer 或强化学习。'
            : 'Comfortable with Python and NumPy? Start with PyTorch Foundations. Already know PyTorch? Jump straight to Transformers or RL.'}
        </p>
        <Link href="/projects" className="inline-block px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-colors">
          {isZh ? '浏览全部项目 →' : 'Browse All Projects →'}
        </Link>
      </div>
    </div>
  );
}
