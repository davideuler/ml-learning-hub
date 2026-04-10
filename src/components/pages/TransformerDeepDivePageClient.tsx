'use client';

import Link from 'next/link';
import type { Metadata } from 'next';
import { useSitePreferences } from '@/components/providers/SiteProviders';

export const metadata: Metadata = {
  title: 'Transformer Deep Dive',
  description: 'Master attention, multi-head attention, positional encoding, and GPT/BERT implementation with detailed beginner-friendly modules.',
};

const COPY = {
  en: {
    breadcrumb: 'Transformer Deep Dive',
    title: 'Transformer Deep Dive',
    intro: 'This course is for learners who want to stop treating attention as a buzzword and start treating it as a system they can reason about, implement, and modify. By the end, you should be able to read a transformer paper, build a simplified version, and understand the engineering tradeoffs.',
    guideTitle: 'How beginners should use this course',
    guideItems: [
      'Do not skip the hand-built attention implementation, even if you already use Hugging Face.',
      'Keep a scratchpad for tensor shapes and memory costs. Transformers punish fuzzy thinking.',
      'When confused, reduce sequence length and model width until the system becomes inspectable.',
      'Use the Mini-GPT capstone as proof that the architecture finally makes sense.',
    ],
    mathTitle: 'Mathematical Foundations',
    modulesTitle: 'Detailed Modules',
    learn: 'You will learn',
    practice: 'Hands-on practice',
    output: 'Expected output',
    pitfallsTitle: 'Common Pitfalls',
    capstoneTitle: '🏁 Capstone: Mini-GPT',
    capstoneBody: 'The capstone is where abstraction debt gets paid off. If you can build, train, inspect, and sample from a Mini-GPT you truly understand, you are ready to fine-tune larger models and reason about modern LLM systems with confidence.',
    capstoneCta: 'View Mini-GPT Guide →',
    bertCta: 'View BERT Fine-Tuning Project →',
    hours: '~34 hours',
    modulesCount: '11 modules',
  },
  zh: {
    breadcrumb: 'Transformer 深度剖析',
    title: 'Transformer 深度剖析',
    intro: '这门课面向那些不想再把 attention 当成流行词，而是想把它真正当成一个可以推导、实现、修改和调试的系统来理解的学习者。完成后，你应该能够读 transformer 论文、自己实现简化版，并理解背后的工程取舍。',
    guideTitle: '初学者应该怎样使用这门课',
    guideItems: [
      '即使你已经会用 Hugging Face，也不要跳过手写 attention 的部分。',
      '准备一个专门记录 tensor shape 和显存开销的草稿本，Transformer 非常惩罚模糊理解。',
      '一旦迷糊，就把序列长度和模型宽度降下来，先让系统变得可观察。',
      '把 Mini-GPT 压轴项目当成你真正理解这套架构的证明。',
    ],
    mathTitle: '数学基础',
    modulesTitle: '详细模块',
    learn: '你将掌握',
    practice: '动手练习',
    output: '阶段产出',
    pitfallsTitle: '常见坑',
    capstoneTitle: '🏁 压轴项目：Mini-GPT',
    capstoneBody: '压轴项目就是你偿还抽象理解欠债的地方。如果你能真正构建、训练、观察并采样一个 Mini-GPT，那你就已经准备好微调更大的模型，并自信地理解现代 LLM 系统。',
    capstoneCta: '查看 Mini-GPT 指南 →',
    bertCta: '查看 BERT 微调项目 →',
    hours: '约 34 小时',
    modulesCount: '11 个模块',
  },
} as const;

const MODULES = [
  {
    id: 1,
    en: { title: 'Why Attention Replaced RNNs', summary: 'Build intuition for the sequence bottlenecks that made attention transformative.', learn: ['Why fixed hidden states limit long-context reasoning', 'How attention reframes sequence modeling as information retrieval', 'Why parallelism matters so much for training speed'], practice: 'Compare a toy RNN context bottleneck against a simple attention lookup example.', output: 'A notebook that explains visually why attention scales better than recurrence.' },
    zh: { title: '为什么 Attention 取代了 RNN', summary: '先建立序列建模瓶颈的直觉，理解 attention 为什么会带来范式变化。', learn: ['为什么固定大小 hidden state 会限制长上下文建模', 'attention 如何把序列建模重写成信息检索问题', '为什么并行性对训练速度如此重要'], practice: '对比一个 toy RNN 的上下文瓶颈和一个简单 attention 检索例子。', output: '一个可视化 notebook，解释为什么 attention 比 recurrence 更容易扩展。' },
  },
  {
    id: 2,
    en: { title: 'Scaled Dot-Product Attention', summary: 'Derive and implement the attention formula from first principles.', learn: ['What queries, keys, and values mean operationally', 'Why the √d scaling exists', 'How masking changes the attention distribution'], practice: 'Implement attention in pure PyTorch tensor ops and verify against library output.', output: 'A tested attention function with printed tensor shapes and mask behavior.' },
    zh: { title: '缩放点积注意力', summary: '从第一性原理推导并实现 attention 公式。', learn: ['从操作层面理解 query、key、value', '为什么必须除以 √d', 'mask 如何改变注意力分布'], practice: '用纯 PyTorch tensor 运算实现 attention，并与库输出做对比验证。', output: '一个带 shape 打印和 mask 行为测试的 attention 函数。' },
  },
  {
    id: 3,
    en: { title: 'Multi-Head Attention', summary: 'Split representation space into multiple heads and understand why that helps.', learn: ['How head dimension relates to model dimension', 'Why different heads can learn different token relationships', 'How to reshape and concatenate attention heads safely'], practice: 'Write a minimal multi-head block and inspect parameter counts.', output: 'A custom multi-head attention module with assertions for each shape transformation.' },
    zh: { title: '多头注意力', summary: '把表示空间拆成多个 head，并真正理解这样做的价值。', learn: ['head 维度与模型维度之间的关系', '为什么不同 head 会学到不同 token 关系', '如何安全地 reshape 和拼接各个 head'], practice: '写一个最小多头注意力模块，并检查参数量。', output: '一个带 shape 断言的自定义 multi-head attention 模块。' },
  },
  {
    id: 4,
    en: { title: 'Positional Encoding and RoPE', summary: 'Restore sequence order in a model that is otherwise permutation-invariant.', learn: ['Difference between learned, sinusoidal, and rotary positional methods', 'Why RoPE became the default for modern decoder-only LLMs', 'How positional choice affects extrapolation to longer sequences'], practice: 'Plot sinusoidal encodings and compare them to learned embeddings on a toy task.', output: 'A short report on which positional scheme fits short versus long contexts.' },
    zh: { title: '位置编码与 RoPE', summary: '给一个本来对顺序不敏感的模型重新注入序列位置信息。', learn: ['learned、sinusoidal 和 rotary 三类位置方法的区别', '为什么 RoPE 成了现代 decoder-only LLM 的主流选择', '位置编码方案如何影响长序列外推能力'], practice: '画出 sinusoidal 编码，并在 toy task 上和 learned embedding 对比。', output: '一份简短说明，分析短上下文与长上下文该选哪种位置编码。' },
  },
  {
    id: 5,
    en: { title: 'Transformer Block Anatomy', summary: 'Understand residuals, layer norm, and feed-forward networks as one coherent unit.', learn: ['Why pre-norm is easier to train than post-norm', 'How FFN width contributes a huge share of model capacity', 'How residual paths stabilize optimization'], practice: 'Assemble a full transformer block from attention, LayerNorm, and FFN parts.', output: 'A reusable transformer block class with configurable activation and norm placement.' },
    zh: { title: 'Transformer Block 解剖', summary: '把残差、LayerNorm 和前馈网络当成一个整体来理解。', learn: ['为什么 pre-norm 比 post-norm 更容易训练', '为什么 FFN 宽度贡献了大量模型容量', '残差路径如何帮助优化稳定'], practice: '用 attention、LayerNorm 和 FFN 组装一个完整 transformer block。', output: '一个支持配置激活函数和 norm 位置的可复用 block 类。' },
  },
  {
    id: 6,
    en: { title: 'Encoder Models: BERT-Style Thinking', summary: 'Learn how bidirectional transformer stacks power classification and retrieval.', learn: ['How CLS pooling and token-level representations differ', 'Why masked language modeling creates contextual encoders', 'How encoder models differ from decoder models'], practice: 'Build a tiny masked-token training loop for a toy vocabulary.', output: 'A minimal encoder experiment that predicts masked tokens and logs validation loss.' },
    zh: { title: 'Encoder 模型：BERT 风格思维', summary: '理解双向 transformer stack 如何支撑分类与检索任务。', learn: ['CLS pooling 与 token-level 表征的区别', '为什么 MLM 会形成上下文化 encoder', 'encoder 模型与 decoder 模型本质上解决的问题有何不同'], practice: '用 toy vocabulary 写一个最小 masked-token 训练循环。', output: '一个能预测被 mask token 并记录验证损失的最小 encoder 实验。' },
  },
  {
    id: 7,
    en: { title: 'Decoder Models: GPT-Style Thinking', summary: 'Build causal language models that generate one token at a time.', learn: ['How causal masks enforce left-to-right generation', 'Why next-token prediction is enough to learn rich structure', 'How KV caching improves inference throughput'], practice: 'Train a tiny decoder on character-level text and sample outputs every epoch.', output: 'A small autoregressive model that can generate coherent toy text.' },
    zh: { title: 'Decoder 模型：GPT 风格思维', summary: '构建一次只生成一个 token 的因果语言模型。', learn: ['causal mask 如何强制模型只能从左到右生成', '为什么 next-token prediction 足以学到丰富结构', 'KV cache 如何提升推理吞吐量'], practice: '在字符级文本上训练一个小 decoder，并在每个 epoch 后采样输出。', output: '一个能生成连贯 toy 文本的小型自回归模型。' },
  },
  {
    id: 8,
    en: { title: 'Training Recipes That Actually Work', summary: 'Learn the practical ingredients that make transformer training stable.', learn: ['Why warmup schedules matter disproportionately in early training', 'How gradient clipping and AMP interact', 'How to choose context length, batch size, and width under hardware limits'], practice: 'Train the same small model with and without warmup and compare early loss behavior.', output: 'A benchmark note showing which recipe changes improved stability.' },
    zh: { title: '真正有效的训练配方', summary: '掌握那些让 transformer 训练稳定下来的关键工程细节。', learn: ['为什么 warmup 在训练早期格外重要', '梯度裁剪与 AMP 会如何相互影响', '在硬件约束下如何选择 context length、batch size 和模型宽度'], practice: '用同一个小模型对比有无 warmup 的训练过程，并观察早期 loss 行为。', output: '一份 benchmark 说明，记录哪些训练配方改动提升了稳定性。' },
  },
  {
    id: 9,
    en: { title: 'Fine-tuning and PEFT', summary: 'Take pre-trained transformers and adapt them without wasting compute.', learn: ['Difference between full fine-tuning and LoRA adaptation', 'How PEFT changes memory and speed constraints', 'How to compare parameter-efficient runs fairly'], practice: 'Apply LoRA to a small Hugging Face model on a custom classification task.', output: 'A fair comparison between full fine-tuning and PEFT adaptation.' },
    zh: { title: '微调与 PEFT', summary: '在不浪费算力的前提下，把预训练 transformer 适配到新任务。', learn: ['完整微调与 LoRA 适配的区别', 'PEFT 如何改变显存和速度约束', '如何公平比较参数高效微调方案'], practice: '在一个自定义分类任务上，对小型 Hugging Face 模型应用 LoRA。', output: '一份完整微调与 PEFT 适配的对比结果。' },
  },
  {
    id: 10,
    isCapstone: true,
    en: { title: 'Mini-GPT Capstone Build', summary: 'Integrate tokenizer, embeddings, attention blocks, and sampling into one complete model.', learn: ['How all sub-components connect end to end', 'How to debug generation quality instead of only training loss', 'How to structure a research-style build from scratch'], practice: 'Train a character-level GPT on Shakespeare and inspect generations over time.', output: 'A working Mini-GPT with saved checkpoints and generation scripts.' },
    zh: { title: 'Mini-GPT 压轴构建', summary: '把 tokenizer、embedding、attention blocks 和 sampling 组合成一个完整模型。', learn: ['理解所有子模块如何端到端串起来', '学会调试生成质量，而不仅仅盯着训练 loss', '掌握从零组织研究型实现的方式'], practice: '在莎士比亚语料上训练字符级 GPT，并观察生成结果如何演化。', output: '一个可运行的 Mini-GPT，包含 checkpoint 和生成脚本。' },
  },
  {
    id: 11,
    en: { title: 'Modern Transformer Variants', summary: 'Survey the frontier so learners can read current papers without getting lost.', learn: ['What Flash Attention changes in practice', 'Why MoE, GQA, and SSMs exist', 'How to reason about tradeoffs instead of chasing acronyms'], practice: 'Read one modern architecture paper and summarize its core engineering tradeoff.', output: 'A one-page architecture map explaining when each variant matters.' },
    zh: { title: '现代 Transformer 变体', summary: '带你快速建立前沿地图，读当前论文时不再一头雾水。', learn: ['Flash Attention 在实践中到底改变了什么', '为什么会出现 MoE、GQA 和 SSM 这些路线', '如何从工程取舍角度理解，而不是追新名词'], practice: '读一篇现代架构论文，并总结它最核心的工程 tradeoff。', output: '一页架构地图，解释不同变体各自在什么场景下重要。' },
  },
] as const;

const MATH_BLOCKS = [
  { en: { title: 'Attention as weighted retrieval', content: ['The model computes relevance scores between a token query and all available keys.', 'Softmax turns those scores into weights, and the output becomes a weighted mixture of values.', 'This is the conceptual heart of transformer behavior, and it is simpler than the jargon suggests.'] }, zh: { title: '把 Attention 看作加权检索', content: ['模型会计算一个 token 的 query 与所有 key 的相关性分数。', 'softmax 会把这些分数变成权重，最终输出就是 value 的加权混合。', '这就是 transformer 行为的概念核心，比术语本身简单得多。'] } },
  { en: { title: 'Why scaling and normalization matter', content: ['Without scaling, large dot products saturate softmax and kill gradients.', 'Without normalization and residual structure, deep transformer stacks become hard to optimize.', 'A surprising amount of transformer engineering is really variance control.'] }, zh: { title: '为什么缩放与归一化如此重要', content: ['没有缩放，大点积会让 softmax 饱和并杀死梯度。', '没有归一化和残差结构，深层 transformer 堆叠会很难优化。', '大量 transformer 工程问题，本质上其实是在做方差控制。'] } },
  { en: { title: 'Cross-entropy and next-token prediction', content: ['Decoder-only language models learn by maximizing the probability of the next token.', 'That simple objective forces the model to internalize grammar, context, and world structure.', 'This is why next-token prediction became the foundation of modern LLM pretraining.'] }, zh: { title: '交叉熵与下一个 token 预测', content: ['decoder-only 语言模型通过最大化下一个 token 的概率来学习。', '这个看似简单的目标，会迫使模型内化语法、上下文和世界结构。', '这也是为什么 next-token prediction 成为现代 LLM 预训练的基础。'] } },
] as const;

const PITFALLS = [
  { en: { title: 'Mask bugs that do not crash', body: 'Attention masks often fail silently. The model still trains, but it trains on the wrong visibility pattern. Unit-test masking on tiny examples.' }, zh: { title: '不会报错的 mask bug', body: 'attention mask 经常是静默失败。模型看起来还能训练，但其实学的是错误可见性模式。一定要用极小例子做单元测试。' } },
  { en: { title: 'Tensor reshapes without meaning', body: 'A transpose or view can look harmless while destroying head layout assumptions. Write shape comments everywhere until the block is stable.' }, zh: { title: '没有语义约束的 tensor reshape', body: '一个 transpose 或 view 看起来无害，却可能破坏 head 布局假设。在模块稳定前，shape 注释要写满。' } },
  { en: { title: 'Confusing encoder and decoder use cases', body: 'BERT-style models are not just smaller GPTs. They solve different problems and expose different training objectives.' }, zh: { title: '混淆 encoder 和 decoder 的用途', body: 'BERT 风格模型不是“小一点的 GPT”。它们解决的问题不同，训练目标也不同。' } },
  { en: { title: 'Treating generation quality as purely model size', body: 'Sampling temperature, top-k, top-p, and repetition control matter a lot. Sometimes the checkpoint is fine and the sampler is the problem.' }, zh: { title: '把生成质量全归因于模型大小', body: 'temperature、top-k、top-p 和重复惩罚对结果影响非常大。有时 checkpoint 没问题，问题出在 sampler。' } },
] as const;

export function TransformerDeepDivePageClient() {
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
        <span className="text-5xl">🤖</span>
        <div>
          <span className="badge badge-purple mb-2">{isZh ? '进阶' : 'Intermediate'}</span>
          <h1 className="text-4xl font-extrabold text-[var(--text-primary)]">{t.title}</h1>
        </div>
      </div>

      <p className="text-[var(--text-muted)] text-lg mb-4 max-w-3xl">{t.intro}</p>

      <div className="flex gap-6 text-sm text-[var(--text-muted)] mb-12 flex-wrap">
        <span>⏱ {t.hours}</span>
        <span>📦 {t.modulesCount}</span>
        <span>🐍 PyTorch 2.x · Hugging Face · PEFT</span>
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
              {block[locale].content.map((line) => <p key={line} className="text-sm text-[var(--text-muted)]">{line}</p>)}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">{t.modulesTitle}</h2>
      <div className="space-y-4">
        {MODULES.map((mod) => (
          <div key={mod.id} className={`card ${('isCapstone' in mod && mod.isCapstone) ? 'border-brand-500/50' : ''}`}>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className={`text-lg font-mono font-bold ${('isCapstone' in mod && mod.isCapstone) ? 'text-brand-400' : 'text-[var(--text-muted)]'}`}>{String(mod.id).padStart(2, '0')}</span>
              <h3 className="font-semibold text-[var(--text-primary)]">{mod[locale].title}</h3>
              {('isCapstone' in mod && mod.isCapstone) && <span className="badge badge-purple">Capstone</span>}
            </div>
            <p className="text-sm text-[var(--text-muted)] mb-4">{mod[locale].summary}</p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-[var(--text-primary)] mb-2">{t.learn}</p>
                <ul className="space-y-1 text-[var(--text-muted)]">{mod[locale].learn.map((item) => <li key={item}>▸ {item}</li>)}</ul>
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
            <div className="flex items-center gap-2 mb-1"><span>⚠️</span><h3 className="font-semibold text-[var(--text-primary)] text-sm">{p[locale].title}</h3></div>
            <p className="text-xs text-[var(--text-muted)]">{p[locale].body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(99,102,241,0.10))', border: '1px solid rgba(168,85,247,0.3)' }}>
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t.capstoneTitle}</h3>
        <p className="text-[var(--text-muted)] text-sm mb-4">{t.capstoneBody}</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects/mini-gpt" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors">{t.capstoneCta}</Link>
          <Link href="/projects/bert-finetune" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/40 hover:border-purple-400 text-purple-200 text-sm font-semibold transition-colors">{t.bertCta}</Link>
        </div>
      </div>
    </div>
  );
}
