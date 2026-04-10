'use client';

import Link from 'next/link';
import type { Metadata } from 'next';
import { useSitePreferences } from '@/components/providers/SiteProviders';

export const metadata: Metadata = {
  title: 'PyTorch Foundations',
  description: 'Learn PyTorch from tensors to full training pipelines with detailed, beginner-friendly modules.',
};

const COPY = {
  en: {
    breadcrumb: 'PyTorch Foundations',
    title: 'PyTorch Foundations',
    intro:
      'This course is designed for Python engineers who want to become dangerous with modern deep learning tooling, but without pretending that abstractions are enough. You start with tensors and end with a reproducible, GPU-aware training workflow that supports real projects.',
    guideTitle: 'How beginners should use this course',
    guideItems: [
      'Do the modules in order. They were designed to reduce cognitive load, not maximize novelty.',
      'Re-type the code, do not just read it. Muscle memory matters in PyTorch.',
      'Keep one running notebook of mistakes, fixes, and shape notes. That becomes your real learning asset.',
      'Finish the capstone before moving to Transformers. Otherwise the abstraction gap stays too high.',
    ],
    mathTitle: 'Mathematical Foundations',
    modulesTitle: 'Detailed Modules',
    learn: 'You will learn',
    practice: 'Hands-on practice',
    output: 'Expected output',
    pitfallsTitle: 'Common Pitfalls',
    capstoneTitle: '🏁 Capstone Project: CNN Classifier on CIFAR-10',
    capstoneBody:
      'Your goal is not just to train a model. It is to prove you can structure data loading, model design, optimization, logging, and evaluation into a coherent pipeline. Once you can do that, Transformers stop feeling like magic and start feeling like just another architecture class.',
    projectGuide: 'View Project Guide →',
    hardware: 'Hardware Setup →',
    hours: '~28 hours',
    modulesCount: '10 modules',
  },
  zh: {
    breadcrumb: 'PyTorch 基础',
    title: 'PyTorch 基础',
    intro:
      '这门课面向已经会 Python、但希望真正掌握现代深度学习工程实践的开发者。你会从 tensor 出发，一步步走到可复现、可上 GPU、可支撑真实项目的训练工作流，而不是停留在会调 API 的层面。',
    guideTitle: '初学者应该怎样使用这门课',
    guideItems: [
      '按顺序学习这些模块，它们的设计目标是降低认知负担，而不是追求炫技。',
      '尽量自己重新敲代码，不要只看。PyTorch 的熟练度很大程度来自肌肉记忆。',
      '准备一个持续记录错误、修复方法和 shape 备注的笔记本，它会成为你真正的学习资产。',
      '在进入 Transformer 之前先完成 capstone，否则抽象层会跳得太快。',
    ],
    mathTitle: '数学基础',
    modulesTitle: '详细模块',
    learn: '你将掌握',
    practice: '动手练习',
    output: '阶段产出',
    pitfallsTitle: '常见坑',
    capstoneTitle: '🏁 压轴项目：CIFAR-10 CNN 分类器',
    capstoneBody:
      '你的目标不只是把模型训起来，而是证明自己能把数据加载、模型设计、优化器、日志记录和评估整合成一个完整工作流。做到这一点后，Transformer 就不会再像魔法，而只是另一类架构。',
    projectGuide: '查看项目指南 →',
    hardware: '查看硬件建议 →',
    hours: '约 28 小时',
    modulesCount: '10 个模块',
  },
} as const;

const MODULES = [
  {
    id: 1,
    en: {
      title: 'Tensor Fundamentals',
      summary: 'Understand tensors as the core data structure behind every neural network operation.',
      learn: [
        'Create tensors from Python lists, NumPy arrays, and random initializers',
        'Read shape, dtype, and device information without confusion',
        'Use indexing, slicing, reshape, permute, and broadcasting correctly',
      ],
      practice: 'Write a small tensor workbook that reproduces matrix multiply, elementwise ops, and broadcasting edge cases by hand.',
      output: 'A notebook that explains 10 core tensor operations with input/output shape annotations.',
    },
    zh: {
      title: 'Tensor 基础',
      summary: '理解 tensor 作为所有神经网络计算底层数据结构的角色。',
      learn: [
        '从 Python 列表、NumPy 数组和随机初始化器创建 tensor',
        '准确理解 shape、dtype 和 device 信息',
        '正确使用 indexing、slicing、reshape、permute 和 broadcasting',
      ],
      practice: '写一个小型 tensor 练习本，手动复现矩阵乘法、逐元素运算和 broadcasting 边界情况。',
      output: '一个带输入输出 shape 标注的 notebook，解释 10 个核心 tensor 操作。',
    },
  },
  {
    id: 2,
    en: {
      title: 'Autograd & Backpropagation',
      summary: 'See how PyTorch builds computational graphs and computes gradients automatically.',
      learn: [
        'Track which tensors require gradients and why',
        'Interpret .grad, .backward(), and detach() in practical training code',
        'Manually compute a simple derivative and compare it with autograd output',
      ],
      practice: 'Build a one-layer linear regression example and print every gradient during training.',
      output: 'A minimal script that demonstrates gradient accumulation, zeroing, and graph detachment.',
    },
    zh: {
      title: 'Autograd 与反向传播',
      summary: '看清 PyTorch 如何构建计算图，以及它是如何自动求梯度的。',
      learn: [
        '理解哪些 tensor 需要梯度，以及原因',
        '在真实训练代码中读懂 .grad、.backward() 和 detach()',
        '手工计算一个简单导数，并与 autograd 输出对比',
      ],
      practice: '构建一个单层线性回归例子，在训练过程中打印每一步梯度。',
      output: '一个最小脚本，展示梯度累积、清零和计算图断开。',
    },
  },
  {
    id: 3,
    en: {
      title: 'Building Models with nn.Module',
      summary: 'Learn the standard PyTorch abstraction for defining trainable models and reusable blocks.',
      learn: [
        'Register layers and parameters correctly inside __init__',
        'Design clear forward() methods and inspect named parameters',
        'Compose small layers into larger reusable modules',
      ],
      practice: 'Implement an MLP classifier twice: once in a flat class, once with reusable blocks.',
      output: 'A clean nn.Module-based MLP with parameter counts and shape tracing.',
    },
    zh: {
      title: '用 nn.Module 构建模型',
      summary: '掌握 PyTorch 中定义可训练模型和可复用模块的标准抽象。',
      learn: [
        '在 __init__ 中正确注册层和参数',
        '设计清晰的 forward()，并检查 named parameters',
        '把小层组合成更大的可复用模块',
      ],
      practice: '把一个 MLP 分类器实现两遍，一遍平铺写法，一遍模块化写法。',
      output: '一个结构清晰、带参数统计和 shape 跟踪的 nn.Module MLP。',
    },
  },
  {
    id: 4,
    en: {
      title: 'Losses, Optimizers, and Schedulers',
      summary: 'Understand how objective choice and parameter updates affect learning dynamics.',
      learn: [
        'Use CrossEntropyLoss, MSELoss, and Huber loss in the right contexts',
        'Compare SGD, Adam, and AdamW on the same toy problem',
        'Apply step, cosine, and warmup schedules intentionally',
      ],
      practice: 'Train the same model with three optimizers and plot the loss curves side by side.',
      output: 'A short experiment report explaining optimizer and scheduler tradeoffs.',
    },
    zh: {
      title: '损失函数、优化器与学习率调度',
      summary: '理解目标函数和参数更新方式如何改变训练动力学。',
      learn: [
        '在正确场景下使用 CrossEntropyLoss、MSELoss 和 Huber loss',
        '在同一个 toy problem 上比较 SGD、Adam 和 AdamW',
        '有意识地使用 step、cosine 和 warmup 调度策略',
      ],
      practice: '用三个优化器训练同一个模型，并把 loss 曲线画在一起。',
      output: '一份简短实验报告，解释优化器和调度器的取舍。',
    },
  },
  {
    id: 5,
    en: {
      title: 'Data Pipeline Design',
      summary: 'Build robust Dataset and DataLoader pipelines that do not become training bottlenecks.',
      learn: [
        'Write custom Dataset classes for structured local data',
        'Use transforms, collate_fn, pin_memory, and num_workers effectively',
        'Debug shape and label issues before they poison training',
      ],
      practice: 'Create a CIFAR-style image loader plus a custom collate function for variable metadata.',
      output: 'A reusable data pipeline template that can be reused in later projects.',
    },
    zh: {
      title: '数据管线设计',
      summary: '构建不会成为训练瓶颈的稳健 Dataset 和 DataLoader 管线。',
      learn: [
        '为本地结构化数据编写自定义 Dataset',
        '有效使用 transforms、collate_fn、pin_memory 和 num_workers',
        '在训练被污染前提前发现 shape 和 label 问题',
      ],
      practice: '实现一个 CIFAR 风格图像加载器，并加入处理变长元信息的 collate 函数。',
      output: '一个后续项目可复用的数据管线模板。',
    },
  },
  {
    id: 6,
    en: {
      title: 'Training Loop Patterns',
      summary: 'Move beyond toy examples into a training loop you would actually keep in a real project.',
      learn: [
        'Separate train, validation, and checkpoint logic cleanly',
        'Track reproducibility with seeds, config dictionaries, and metrics logging',
        'Know when to use early stopping and when not to trust it',
      ],
      practice: 'Refactor a messy training script into train_one_epoch(), evaluate(), and save_checkpoint() functions.',
      output: 'A production-style training loop skeleton with metric logging and checkpoint restore.',
    },
    zh: {
      title: '训练循环模式',
      summary: '从 toy example 走向真实项目里会保留的训练循环结构。',
      learn: [
        '清晰拆分训练、验证和 checkpoint 逻辑',
        '用随机种子、配置字典和日志跟踪可复现性',
        '知道什么时候该用 early stopping，什么时候不该迷信它',
      ],
      practice: '把一份混乱的训练脚本重构成 train_one_epoch()、evaluate() 和 save_checkpoint()。',
      output: '一个带指标记录和 checkpoint 恢复能力的工程化训练循环骨架。',
    },
  },
  {
    id: 7,
    en: {
      title: 'GPU Acceleration Basics',
      summary: 'Learn how to write device-aware code that runs on Mac, CUDA, and larger accelerators.',
      learn: [
        'Move tensors and models safely across cpu, mps, and cuda devices',
        'Profile CPU-GPU transfer overhead and identify bottlenecks',
        'Avoid common mistakes around dtype, host-device sync, and batch sizing',
      ],
      practice: 'Benchmark the same training step on CPU and GPU and explain the observed speed difference.',
      output: 'A device-agnostic training script with simple timing instrumentation.',
    },
    zh: {
      title: 'GPU 加速基础',
      summary: '学会写能在 Mac、CUDA 和更大加速器上运行的 device-aware 代码。',
      learn: [
        '安全地在 cpu、mps 和 cuda 之间迁移 tensor 与模型',
        '分析 CPU-GPU 传输开销并识别瓶颈',
        '避免 dtype、主机设备同步和 batch size 上的常见错误',
      ],
      practice: '在 CPU 和 GPU 上基准测试同一步训练，并解释速度差异。',
      output: '一份带基础计时能力、设备无关的训练脚本。',
    },
  },
  {
    id: 8,
    en: {
      title: 'Convolutional Networks in Depth',
      summary: 'Understand CNN mechanics before using ResNet-like architectures as black boxes.',
      learn: [
        'Compute output shapes and receptive fields correctly',
        'Understand why batch norm and residual connections help optimization',
        'Build a small CNN and then deepen it into a ResNet-style model',
      ],
      practice: 'Implement a CIFAR classifier with conv blocks, batch norm, dropout, and residual shortcuts.',
      output: 'A CNN baseline and a ResNet-style upgrade with comparison metrics.',
    },
    zh: {
      title: '深入理解卷积网络',
      summary: '在把 ResNet 这类架构当黑盒之前，先真正理解 CNN 的运作机制。',
      learn: [
        '正确计算输出 shape 和感受野',
        '理解 batch norm 和残差连接为何帮助优化',
        '从一个小 CNN 逐步扩展到 ResNet 风格模型',
      ],
      practice: '实现一个带 conv blocks、batch norm、dropout 和残差 shortcut 的 CIFAR 分类器。',
      output: '一个 CNN baseline，以及一个带对比指标的 ResNet 风格升级版本。',
    },
  },
  {
    id: 9,
    en: {
      title: 'Mixed Precision and torch.compile',
      summary: 'Add speed without losing training stability or turning your loop into mystery meat.',
      learn: [
        'Use autocast and GradScaler correctly',
        'Understand fp16 versus bf16 tradeoffs across different hardware',
        'Know when torch.compile gives real wins and when it is not worth it',
      ],
      practice: 'Benchmark one training run with and without AMP and compile warmup.',
      output: 'A benchmark note with throughput, VRAM use, and any numerical issues observed.',
    },
    zh: {
      title: '混合精度与 torch.compile',
      summary: '在不牺牲训练稳定性的前提下获得速度提升，而不是把训练循环变成谜团。',
      learn: [
        '正确使用 autocast 和 GradScaler',
        '理解不同硬件上 fp16 与 bf16 的取舍',
        '知道 torch.compile 何时真正带来收益，何时不值得',
      ],
      practice: '对比一次开启和不开启 AMP 与 compile warmup 的训练运行。',
      output: '一份记录吞吐量、显存占用和数值问题的 benchmark 说明。',
    },
  },
  {
    id: 10,
    isCapstone: true,
    en: {
      title: 'Experiment Tracking Capstone',
      summary: 'Wrap everything into a reproducible experiment workflow that another engineer can rerun.',
      learn: [
        'Log metrics, configs, checkpoints, and artifacts systematically',
        'Compare multiple runs and document what changed',
        'Write a simple model card that explains scope and limitations',
      ],
      practice: 'Run a small hyperparameter sweep on CIFAR-10 and compare the top three runs.',
      output: 'A reproducible capstone run with logs, checkpoints, and a model card.',
    },
    zh: {
      title: '实验跟踪压轴模块',
      summary: '把所有内容整合成一个别人也能复现实验结果的工作流。',
      learn: [
        '系统记录指标、配置、checkpoint 和 artifact',
        '比较多次运行并清楚说明变化点',
        '撰写解释模型适用范围与局限性的简洁 model card',
      ],
      practice: '在 CIFAR-10 上做一个小型超参数 sweep，并比较前三个结果。',
      output: '一次带日志、checkpoint 和 model card 的可复现压轴实验。',
    },
  },
] as const;

const MATH_BLOCKS = [
  {
    en: {
      title: 'Tensors as N-dimensional arrays',
      content: [
        'A tensor generalizes scalars, vectors, and matrices into one consistent abstraction.',
        'If you understand shape, rank, and broadcasting, most PyTorch code stops feeling magical.',
        'Many deep learning bugs are just silent tensor-shape misunderstandings in disguise.',
      ],
    },
    zh: {
      title: 'Tensor 作为 N 维数组',
      content: [
        'tensor 是标量、向量和矩阵的统一推广。',
        '如果你真正理解了 shape、rank 和 broadcasting，大部分 PyTorch 代码就不会再像魔法。',
        '很多深度学习 bug，本质上只是被掩盖的 tensor shape 理解错误。',
      ],
    },
  },
  {
    en: {
      title: 'Backpropagation as chain rule',
      content: [
        'Autograd is just repeated chain rule application across a computational graph.',
        'The model is not learning by magic. It is receiving gradient signals layer by layer.',
        'When training breaks, you often need to reason about where the gradient is vanishing, exploding, or detached.',
      ],
    },
    zh: {
      title: '把反向传播看作链式法则',
      content: [
        'autograd 本质上就是在计算图上反复应用链式法则。',
        '模型不是在“神秘地学习”，而是一层一层接收梯度信号。',
        '当训练出问题时，你往往需要判断梯度是在消失、爆炸，还是被错误地截断了。',
      ],
    },
  },
  {
    en: {
      title: 'Gradient descent and optimization',
      content: [
        'The optimizer moves parameters in the direction that reduces loss, but the step size and geometry matter.',
        'This is why learning rate choice often matters more than architecture choice in early experiments.',
        'Momentum and adaptive optimizers change how quickly and smoothly training converges.',
      ],
    },
    zh: {
      title: '梯度下降与优化',
      content: [
        '优化器会把参数往降低 loss 的方向推，但步长和几何结构都很关键。',
        '这也是为什么在早期实验中，学习率往往比架构选择更重要。',
        '动量和自适应优化器会改变训练收敛的速度与平滑程度。',
      ],
    },
  },
] as const;

const PITFALLS = [
  {
    en: { title: 'Skipping shape checks', body: 'Beginners often trust the model too early. Print shapes aggressively until your mental model matches the tensors moving through the network.' },
    zh: { title: '跳过 shape 检查', body: '初学者常常过早相信模型。应该频繁打印 shape，直到你的脑内模型和真实流动的 tensor 完全对齐。' },
  },
  {
    en: { title: 'Mixing train and eval mode', body: 'BatchNorm and dropout behave differently in training and evaluation. If you forget model.eval(), your validation numbers lie to you.' },
    zh: { title: '混淆 train 和 eval 模式', body: 'BatchNorm 和 dropout 在训练与评估中的行为不同。如果忘记调用 model.eval()，你的验证结果就是假的。' },
  },
  {
    en: { title: 'Changing too many variables at once', body: 'If you modify model, optimizer, scheduler, augmentations, and batch size together, you learn nothing from the result.' },
    zh: { title: '一次改太多变量', body: '如果你同时改模型、优化器、调度器、数据增强和 batch size，最后其实什么也学不到。' },
  },
  {
    en: { title: 'Trusting a single good run', body: 'A lucky seed can make a bad setup look competent. Save configs and compare more than one run whenever possible.' },
    zh: { title: '相信一次幸运运行', body: '一个幸运的随机种子可能让糟糕配置看起来不错。尽量保存配置，并比较不止一次运行。' },
  },
] as const;

export function PyTorchFoundationsPageClient() {
  const { locale } = useSitePreferences();
  const t = COPY[locale];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/courses" className="hover:text-[var(--text-primary)]">{locale === 'zh' ? '课程' : 'Courses'}</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]">{t.breadcrumb}</span>
      </nav>

      <div className="flex items-start gap-4 mb-6">
        <span className="text-5xl">🔥</span>
        <div>
          <span className="badge badge-blue mb-2">{locale === 'zh' ? '入门' : 'Beginner'}</span>
          <h1 className="text-4xl font-extrabold text-[var(--text-primary)]">{t.title}</h1>
        </div>
      </div>

      <p className="text-[var(--text-muted)] text-lg mb-4 max-w-3xl">{t.intro}</p>

      <div className="flex gap-6 text-sm text-[var(--text-muted)] mb-12 flex-wrap">
        <span>⏱ {t.hours}</span>
        <span>📦 {t.modulesCount}</span>
        <span>🐍 Python 3.10+ · PyTorch 2.x</span>
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
            <div className="space-y-2">
              {block[locale].content.map((line) => (
                <p key={line} className="text-sm text-[var(--text-muted)]">{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{t.modulesTitle}</h2>
      <div className="space-y-4">
        {MODULES.map((mod) => (
          <div key={mod.id} className={`card ${('isCapstone' in mod && mod.isCapstone) ? 'border-brand-500/50' : ''}`}>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className={`text-lg font-mono font-bold ${('isCapstone' in mod && mod.isCapstone) ? 'text-brand-400' : 'text-[var(--text-muted)]'}`}>
                {String(mod.id).padStart(2, '0')}
              </span>
              <h3 className="font-semibold text-[var(--text-primary)]">{mod[locale].title}</h3>
              {('isCapstone' in mod && mod.isCapstone) && <span className="badge badge-purple">Capstone</span>}
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">{mod[locale].summary}</p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-[var(--text-primary)] mb-2">{t.learn}</p>
                <ul className="space-y-1 text-[var(--text-muted)]">
                  {mod[locale].learn.map((item) => <li key={item}>▸ {item}</li>)}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)] mb-2">{t.practice}</p>
                <p className="text-[var(--text-muted)]">{mod[locale].practice}</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)] mb-2">{t.output}</p>
                <p className="text-[var(--text-muted)]">{mod[locale].output}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-12 mb-6">{t.pitfallsTitle}</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.en.title} className="card border-yellow-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span>⚠️</span>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm">{p[locale].title}</h3>
            </div>
            <p className="text-xs text-[var(--text-muted)]">{p[locale].body}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.10))', border: '1px solid rgba(99,102,241,0.3)' }}>
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t.capstoneTitle}</h3>
        <p className="text-[var(--text-muted)] text-sm mb-4">{t.capstoneBody}</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects/cnn-classifier" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold transition-colors">
            {t.projectGuide}
          </Link>
          <Link href="/hardware" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-brand-500/40 hover:border-brand-400 text-brand-200 text-sm font-semibold transition-colors">
            {t.hardware}
          </Link>
        </div>
      </div>
    </div>
  );
}
