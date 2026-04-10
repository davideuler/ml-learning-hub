'use client';

import Link from 'next/link';
import { useSitePreferences } from '@/components/providers/SiteProviders';

const COPY = {
  en: {
    breadcrumb: 'Math',
    title: 'Math Foundations for Machine Learning',
    intro: 'This page turns abstract math into practical ML intuition. Instead of formal proof-first presentation, each section connects the concept to PyTorch code, model behavior, and common engineering decisions.',
    keyEquations: 'Key Equations',
    implementation: 'PyTorch Implementation',
    topics: 'Topics in this section',
    why: 'Why this matters for ML',
    pitfallsTitle: 'Common Pitfalls',
    pitfallsIntro: 'These mistakes do not produce immediate errors. They quietly create wrong results, weak intuition, or unstable training.',
    calloutTitle: 'Apply this math in the mini-GPT project',
    calloutBody: 'The mini-GPT project uses attention (linear algebra), backprop through transformer blocks (calculus), cross-entropy training (probability + information theory), and AdamW with cosine decay (optimization). This page is the theory map behind that implementation.',
    calloutLink: 'View mini-GPT project →',
    side1Title: 'BERT Fine-tuning',
    side1Body: 'MLE, cross-entropy, AdamW with warmup, and representation learning in one workflow.',
    side2Title: 'PPO MuJoCo Agent',
    side2Body: 'Policy gradients, KL divergence, entropy bonus, and GAE in a real RL setting.',
    explore: 'Explore project →',
    sections: [
      {
        id: 'linear-algebra', icon: '📐', badge: 'Foundation', badgeColor: 'badge-blue', title: 'Linear Algebra',
        intro: [
          'A vector is not just an array. In machine learning it represents a direction and magnitude inside feature space. Word embeddings, image features, and hidden states are all vectors.',
          'Matrix multiplication is the language of neural networks. When you compute y = W @ x, you are applying a learned linear transformation that rotates, scales, and mixes information.',
          'SVD and low-rank approximation matter because modern techniques like LoRA exploit the fact that useful updates often live in a low-dimensional subspace.'
        ],
        equations: [
          { label: 'Matrix-vector product', math: 'y = W @ x' },
          { label: 'Attention score', math: 'score = Q @ Kᵀ / √d_k' },
          { label: 'SVD decomposition', math: 'A = U Σ Vᵀ' },
          { label: 'L2 norm', math: '‖x‖₂ = √(xᵀx)' },
        ],
        code: `import torch\n\nq = torch.randn(8, 64)\nk = torch.randn(8, 64)\nscores = q @ k.T / q.shape[-1] ** 0.5\n\nA = torch.randn(32, 64)\nU, S, Vh = torch.linalg.svd(A, full_matrices=False)\nA_approx = (U[:, :8] * S[:8]) @ Vh[:8, :]\nprint(torch.linalg.norm(A - A_approx))`,
        cards: [
          { name: 'Vectors and dot products', note: 'Geometric intuition behind embeddings and similarity' },
          { name: 'Matrix multiplication', note: 'The core operation in every dense layer and attention projection' },
          { name: 'Low-rank approximation', note: 'Important for LoRA, compression, and representation structure' },
        ],
        mlWhy: 'Without linear algebra, attention, embeddings, LoRA, PCA, and tensor shape reasoning all feel mysterious.',
      },
      {
        id: 'calculus', icon: '∂', badge: 'Core', badgeColor: 'badge-orange', title: 'Differential Calculus',
        intro: [
          'Derivatives measure how a small change in input affects the output. In ML that means how changing a parameter changes the loss.',
          'The chain rule is the heart of backpropagation. Deep learning works because gradients can flow backward through a composed computation graph.',
          'Curvature matters too. Even if you never compute a full Hessian, optimizer behavior makes more sense once you understand local geometry.'
        ],
        equations: [
          { label: 'Derivative', math: 'f\'(x) = lim_{h→0} (f(x+h)-f(x))/h' },
          { label: 'Gradient descent', math: 'w ← w − α ∇L(w)' },
          { label: 'Chain rule', math: 'dL/dx = dL/dy · dy/dx' },
        ],
        code: `import torch\n\nx = torch.tensor([3.0], requires_grad=True)\ny = (2 * x + 1) ** 3\ny.backward()\nprint(x.grad)`,
        cards: [
          { name: 'Derivatives', note: 'How sensitive the loss is to each parameter' },
          { name: 'Chain rule', note: 'Why backprop is possible in deep networks' },
          { name: 'Gradient flow', note: 'Explains exploding, vanishing, and clipping' },
        ],
        mlWhy: 'If you understand calculus, autograd stops feeling magical and training bugs become much easier to diagnose.',
      },
      {
        id: 'probability', icon: '🎲', badge: 'Core', badgeColor: 'badge-orange', title: 'Probability & Statistics',
        intro: [
          'Machine learning is full of uncertainty. Model outputs often represent probabilities, not certainties.',
          'Cross-entropy is not just a library function. It is the negative log-likelihood objective behind classification.',
          'Regularization, Bayesian intuition, sampling, and policy gradients all become easier once probability feels native.'
        ],
        equations: [
          { label: 'Cross-entropy', math: 'L = -Σ y log p̂' },
          { label: 'MLE objective', math: 'θ* = argmax Σ log P(x|θ)' },
          { label: 'KL divergence', math: 'D_KL(P ‖ Q) = Σ P(x) log(P(x)/Q(x))' },
        ],
        code: `import torch\nimport torch.nn.functional as F\n\nlogits = torch.tensor([[2.0, 1.0, 0.1]])\nlabels = torch.tensor([0])\nloss = F.cross_entropy(logits, labels)\nprint(loss)`,
        cards: [
          { name: 'Likelihood', note: 'The statistical meaning behind common training objectives' },
          { name: 'Distributions', note: 'Normal, categorical, Bernoulli, and sampling intuition' },
          { name: 'KL divergence', note: 'Shows up in VAEs, PPO, distillation, and calibration' },
        ],
        mlWhy: 'Probability unifies classification, uncertainty, regularization, generation, and reinforcement learning.',
      },
      {
        id: 'information-theory', icon: '📡', badge: 'Advanced', badgeColor: 'badge-purple', title: 'Information Theory',
        intro: [
          'Entropy measures uncertainty. Low entropy means confident predictions, high entropy means uncertainty.',
          'Cross-entropy links the true distribution and model distribution. That is why it is central in classification and language modeling.',
          'Perplexity gives a readable measure of language-model uncertainty and predictive sharpness.'
        ],
        equations: [
          { label: 'Entropy', math: 'H(X) = -Σ p(x) log p(x)' },
          { label: 'Cross-entropy', math: 'H(p, q) = -Σ p(x) log q(x)' },
          { label: 'Perplexity', math: 'PP = exp(H)' },
        ],
        code: `import torch\n\ndef entropy(probs):\n    return -(probs * torch.log(probs + 1e-8)).sum()\n\nprint(entropy(torch.tensor([0.25, 0.25, 0.25, 0.25])))`,
        cards: [
          { name: 'Entropy', note: 'A clean measure of uncertainty' },
          { name: 'Cross-entropy', note: 'The training loss behind classifiers and LMs' },
          { name: 'Perplexity', note: 'A practical metric for language models' },
        ],
        mlWhy: 'Information theory explains why cross-entropy works and how to interpret uncertainty in modern AI systems.',
      },
      {
        id: 'optimization', icon: '⛰️', badge: 'Advanced', badgeColor: 'badge-purple', title: 'Optimization',
        intro: [
          'Training a model means solving a high-dimensional optimization problem under noise, approximation, and hardware constraints.',
          'Learning rate schedules, weight decay, momentum, and adaptive optimizers are not trivia. They shape whether training converges at all.',
          'A lot of practical ML is optimization engineering disguised as architecture work.'
        ],
        equations: [
          { label: 'SGD update', math: 'w ← w − α g' },
          { label: 'Momentum', math: 'v ← βv + g,   w ← w − αv' },
          { label: 'AdamW intuition', math: 'adaptive step sizes + decoupled weight decay' },
        ],
        code: `import torch\nmodel = torch.nn.Linear(128, 10)\nopt = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)\nfor step in range(10):\n    loss = model(torch.randn(32, 128)).pow(2).mean()\n    opt.zero_grad()\n    loss.backward()\n    opt.step()`,
        cards: [
          { name: 'Learning rate', note: 'The single most important hyperparameter in many runs' },
          { name: 'Weight decay', note: 'Controls capacity and affects generalization' },
          { name: 'Adaptive optimizers', note: 'Adam, AdamW, RMSProp, and when they help' },
        ],
        mlWhy: 'Even a great architecture fails if optimization is unstable, under-tuned, or misunderstood.',
      },
    ],
    pitfalls: [
      { icon: '⚠️', title: 'Memorising formulas without operational meaning', body: 'If you cannot tie a formula to tensors, losses, or model behavior, it will not help you debug real systems.' },
      { icon: '⚠️', title: 'Ignoring shapes while learning math', body: 'A lot of practical understanding comes from knowing what dimensions each object carries in code.' },
      { icon: '⚠️', title: 'Treating optimizers as black boxes', body: 'Many training failures are optimization failures, not architecture failures.' },
      { icon: '⚠️', title: 'Separating math from implementation', body: 'The fastest way to really learn is to pair each concept with a short PyTorch experiment.' },
    ],
  },
  zh: {
    breadcrumb: '数学',
    title: '机器学习数学基础',
    intro: '这个页面把抽象数学转换成可操作的机器学习直觉。不是证明优先，而是把概念和 PyTorch 代码、模型行为、工程决策直接连起来。',
    keyEquations: '关键公式',
    implementation: 'PyTorch 实现',
    topics: '本节包含的主题',
    why: '这些知识为什么对 ML 重要',
    pitfallsTitle: '常见误区',
    pitfallsIntro: '这些错误通常不会立刻报错，但会悄悄导致结果错误、理解空心，或者训练不稳定。',
    calloutTitle: '把这些数学用到 mini-GPT 项目中',
    calloutBody: 'mini-GPT 项目会真正用到 attention（线性代数）、transformer block 的反向传播（微积分）、交叉熵训练（概率论与信息论），以及 AdamW + cosine decay（优化）。这个页面就是那套实现背后的理论地图。',
    calloutLink: '查看 mini-GPT 项目 →',
    side1Title: 'BERT 微调',
    side1Body: '最大似然、交叉熵、AdamW warmup 和表征学习，都在同一个工作流里出现。',
    side2Title: 'PPO MuJoCo 智能体',
    side2Body: '策略梯度、KL 散度、熵奖励和 GAE 在真实 RL 场景中的落地。',
    explore: '查看项目 →',
    sections: [
      {
        id: 'linear-algebra', icon: '📐', badge: '基础', badgeColor: 'badge-blue', title: '线性代数',
        intro: [
          '向量不只是数组。在机器学习里，它往往表示特征空间中的方向与大小。词向量、图像特征、隐藏状态本质上都是向量。',
          '矩阵乘法就是神经网络的语言。计算 y = W @ x 的过程，本质上是对输入施加一个可学习的线性变换。',
          'SVD 和低秩近似之所以重要，是因为 LoRA 这类现代技术正是建立在“有效更新常常存在于低维子空间”这一事实上。'
        ],
        equations: [
          { label: '矩阵向量乘法', math: 'y = W @ x' },
          { label: '注意力分数', math: 'score = Q @ Kᵀ / √d_k' },
          { label: 'SVD 分解', math: 'A = U Σ Vᵀ' },
          { label: 'L2 范数', math: '‖x‖₂ = √(xᵀx)' },
        ],
        code: `import torch\n\nq = torch.randn(8, 64)\nk = torch.randn(8, 64)\nscores = q @ k.T / q.shape[-1] ** 0.5\n\nA = torch.randn(32, 64)\nU, S, Vh = torch.linalg.svd(A, full_matrices=False)\nA_approx = (U[:, :8] * S[:8]) @ Vh[:8, :]\nprint(torch.linalg.norm(A - A_approx))`,
        cards: [
          { name: '向量与点积', note: 'embedding 和相似度背后的几何直觉' },
          { name: '矩阵乘法', note: '所有全连接层和 attention 投影的核心操作' },
          { name: '低秩近似', note: 'LoRA、压缩和表征结构理解的关键' },
        ],
        mlWhy: '如果不懂线性代数，attention、embedding、LoRA、PCA 和 tensor shape 推理都会显得像黑魔法。',
      },
      {
        id: 'calculus', icon: '∂', badge: '核心', badgeColor: 'badge-orange', title: '微积分',
        intro: [
          '导数描述输入发生微小变化时，输出如何变化。在 ML 里，这意味着参数变化会如何影响损失。',
          '链式法则就是反向传播的核心。深度学习之所以可训练，就是因为梯度能沿着复合计算图一路传回去。',
          '曲率也很重要。即使你不显式计算 Hessian，理解局部几何之后，优化器行为也会清晰很多。'
        ],
        equations: [
          { label: '导数', math: 'f\'(x) = lim_{h→0} (f(x+h)-f(x))/h' },
          { label: '梯度下降', math: 'w ← w − α ∇L(w)' },
          { label: '链式法则', math: 'dL/dx = dL/dy · dy/dx' },
        ],
        code: `import torch\n\nx = torch.tensor([3.0], requires_grad=True)\ny = (2 * x + 1) ** 3\ny.backward()\nprint(x.grad)`,
        cards: [
          { name: '导数', note: '每个参数对损失的敏感度' },
          { name: '链式法则', note: '深层网络能够反向传播的原因' },
          { name: '梯度流', note: '解释梯度爆炸、消失与裁剪' },
        ],
        mlWhy: '理解微积分之后，autograd 就不再神秘，训练 bug 也会更容易定位。',
      },
      {
        id: 'probability', icon: '🎲', badge: '核心', badgeColor: 'badge-orange', title: '概率论与统计',
        intro: [
          '机器学习到处都在处理不确定性。模型输出经常不是“真值”，而是概率分布。',
          '交叉熵不只是一个库函数，它是分类训练背后的负对数似然目标。',
          '正则化、贝叶斯直觉、采样、策略梯度，都会在你懂概率之后更统一。'
        ],
        equations: [
          { label: '交叉熵', math: 'L = -Σ y log p̂' },
          { label: '最大似然', math: 'θ* = argmax Σ log P(x|θ)' },
          { label: 'KL 散度', math: 'D_KL(P ‖ Q) = Σ P(x) log(P(x)/Q(x))' },
        ],
        code: `import torch\nimport torch.nn.functional as F\n\nlogits = torch.tensor([[2.0, 1.0, 0.1]])\nlabels = torch.tensor([0])\nloss = F.cross_entropy(logits, labels)\nprint(loss)`,
        cards: [
          { name: '似然', note: '常见训练目标背后的统计含义' },
          { name: '概率分布', note: 'Normal、Categorical、Bernoulli 与采样直觉' },
          { name: 'KL 散度', note: 'VAE、PPO、蒸馏和校准中都会出现' },
        ],
        mlWhy: '概率论把分类、不确定性、正则化、生成和强化学习统一在同一个框架里。',
      },
      {
        id: 'information-theory', icon: '📡', badge: '进阶', badgeColor: 'badge-purple', title: '信息论',
        intro: [
          '熵衡量不确定性。低熵表示模型很确定，高熵表示模型仍然犹豫。',
          '交叉熵连接了真实分布和模型分布，这就是它在分类和语言建模里如此核心的原因。',
          '困惑度给了我们一个更直观的语言模型不确定性指标。'
        ],
        equations: [
          { label: '熵', math: 'H(X) = -Σ p(x) log p(x)' },
          { label: '交叉熵', math: 'H(p, q) = -Σ p(x) log q(x)' },
          { label: '困惑度', math: 'PP = exp(H)' },
        ],
        code: `import torch\n\ndef entropy(probs):\n    return -(probs * torch.log(probs + 1e-8)).sum()\n\nprint(entropy(torch.tensor([0.25, 0.25, 0.25, 0.25])))`,
        cards: [
          { name: '熵', note: '衡量不确定性的干净指标' },
          { name: '交叉熵', note: '分类器和语言模型背后的训练损失' },
          { name: '困惑度', note: '语言模型常用的可解释评估指标' },
        ],
        mlWhy: '信息论解释了交叉熵为什么有效，也帮助你理解现代 AI 系统里的不确定性。',
      },
      {
        id: 'optimization', icon: '⛰️', badge: '进阶', badgeColor: 'badge-purple', title: '优化',
        intro: [
          '训练模型，本质上是在带噪声、近似和硬件约束的条件下，求解一个高维优化问题。',
          '学习率调度、weight decay、momentum 和自适应优化器都不是琐碎细节，它们决定训练能不能收敛。',
          '很多看似“架构问题”的问题，本质其实是优化工程问题。'
        ],
        equations: [
          { label: 'SGD 更新', math: 'w ← w − α g' },
          { label: 'Momentum', math: 'v ← βv + g,   w ← w − αv' },
          { label: 'AdamW 直觉', math: 'adaptive step sizes + decoupled weight decay' },
        ],
        code: `import torch\nmodel = torch.nn.Linear(128, 10)\nopt = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)\nfor step in range(10):\n    loss = model(torch.randn(32, 128)).pow(2).mean()\n    opt.zero_grad()\n    loss.backward()\n    opt.step()`,
        cards: [
          { name: '学习率', note: '很多训练中最重要的超参数' },
          { name: 'Weight decay', note: '影响模型容量与泛化能力' },
          { name: '自适应优化器', note: 'Adam、AdamW、RMSProp 及其适用场景' },
        ],
        mlWhy: '即使架构很好，只要优化不稳定、调参失当或理解错误，训练一样会失败。',
      },
    ],
    pitfalls: [
      { icon: '⚠️', title: '只背公式，不理解它在系统里的作用', body: '如果你不能把公式映射到 tensor、loss 或模型行为上，它就帮不了你调试真实系统。' },
      { icon: '⚠️', title: '学数学时忽略 shape', body: '很多实战理解都来自于明确每个对象在代码里的维度。' },
      { icon: '⚠️', title: '把优化器当黑盒', body: '很多训练失败本质上是优化失败，而不是架构失败。' },
      { icon: '⚠️', title: '把数学和实现分开学', body: '最高效的学习方式，是每学一个概念就配一个简短 PyTorch 实验。' },
    ],
  },
} as const;

export function MathPageClient() {
  const { locale } = useSitePreferences();
  const t = COPY[locale];
  const isZh = locale === 'zh';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--text-primary)]">{isZh ? '首页' : 'Home'}</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]">{t.breadcrumb}</span>
      </nav>

      <div className="mb-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🧮</span>
          <h1 className="text-4xl font-extrabold text-[var(--text-primary)]">{t.title}</h1>
        </div>
        <p className="text-[var(--text-muted)] text-lg leading-relaxed">{t.intro}</p>
      </div>

      <div className="space-y-10 mb-16">
        {t.sections.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="text-3xl">{sec.icon}</span>
              <span className={`badge ${sec.badgeColor}`}>{sec.badge}</span>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{sec.title}</h2>
            </div>

            <div className="space-y-3 mb-6">
              {sec.intro.map((para) => <p key={para} className="text-[var(--text-muted)] text-sm leading-relaxed">{para}</p>)}
            </div>

            <div className="card mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">{t.keyEquations}</h3>
              <div className="space-y-3">
                {sec.equations.map((eq) => (
                  <div key={eq.label}>
                    <div className="text-xs text-[var(--text-muted)] mb-1">{eq.label}</div>
                    <pre className="text-sm font-mono text-orange-300 bg-orange-950/30 rounded px-3 py-2 overflow-x-auto whitespace-pre">{eq.math}</pre>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wider">{t.implementation}</h3>
              <pre className="bg-[#0d1117] rounded-xl p-4 text-xs text-slate-300 overflow-x-auto leading-relaxed">{sec.code}</pre>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wider">{t.topics}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {sec.cards.map((card) => (
                  <div key={card.name} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <span className="text-orange-400 mt-0.5 shrink-0">▸</span>
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{card.name}</div>
                      <div className="text-xs text-[var(--text-muted)] mt-0.5 leading-relaxed">{card.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card border-orange-500/20 bg-orange-950/10">
              <div className="flex items-start gap-2">
                <span className="text-orange-400 text-sm shrink-0 mt-0.5">→</span>
                <div>
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">{t.why}</span>
                  <p className="text-sm text-[var(--text-muted)] mt-1 leading-relaxed">{sec.mlWhy}</p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{t.pitfallsTitle}</h2>
        <p className="text-[var(--text-muted)] text-sm mb-6 max-w-2xl">{t.pitfallsIntro}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {t.pitfalls.map((p) => (
            <div key={p.title} className="card border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2"><span>{p.icon}</span><h3 className="font-semibold text-[var(--text-primary)] text-sm">{p.title}</h3></div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="card border-orange-500/30 bg-orange-950/10 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🚀</span>
          <div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-1">{t.calloutTitle}</h3>
            <p className="text-sm text-[var(--text-muted)] mb-3 leading-relaxed">{t.calloutBody}</p>
            <Link href="/projects/mini-gpt" className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 font-medium">{t.calloutLink}</Link>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{t.side1Title}</h3>
          <p className="text-xs text-[var(--text-muted)] mb-2">{t.side1Body}</p>
          <Link href="/projects/bert-finetune" className="text-xs text-orange-400 hover:text-orange-300">{t.explore}</Link>
        </div>
        <div className="card">
          <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{t.side2Title}</h3>
          <p className="text-xs text-[var(--text-muted)] mb-2">{t.side2Body}</p>
          <Link href="/projects/ppo-mujoco" className="text-xs text-orange-400 hover:text-orange-300">{t.explore}</Link>
        </div>
      </div>
    </div>
  );
}
