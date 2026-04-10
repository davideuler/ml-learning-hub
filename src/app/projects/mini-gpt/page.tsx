import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: Mini-GPT',
  description: 'Build a character-level GPT from scratch in PyTorch.',
};

const COPY = {
  en: {
    breadcrumb: 'Mini-GPT',
    title: 'Mini-GPT (Shakespeare)',
    intro: 'This project turns transformer theory into a working language model. You will build a small GPT from scratch, train it on Shakespeare, and learn how architecture, optimization, and sampling decisions change generation quality.',
    learnTitle: 'What you learn',
    codeTitle: 'Starter Architecture Sketch',
    codeIntro: 'This sketch shows the minimum architectural skeleton. The goal is not to copy blindly. The goal is to understand why embeddings, masking, residual paths, and logits all connect the way they do.',
    codeWalkthrough: 'Code walkthrough',
    stepsTitle: 'Build Steps',
    pitfallsTitle: 'Common Pitfalls',
    hardwareTitle: 'Hardware Comparison',
    rubricTitle: 'Grading Rubric',
    refsTitle: 'References',
    stats: [
      { k: 'Dataset', v: 'Tiny Shakespeare' },
      { k: 'Model', v: 'Decoder-only GPT' },
      { k: 'Target', v: 'Coherent samples' },
      { k: 'Train time', v: '~10–90 min' },
    ],
    learn: [
      'How token embeddings and positional embeddings work together',
      'How causal masking prevents information leakage from future tokens',
      'How transformer blocks stack attention and feed-forward computation',
      'How sampling strategy changes the quality and diversity of generated text',
      'How to reason about context length, perplexity, and training stability',
    ],
    walkthrough: [
      { title: 'Embedding tables are learned lookup systems', body: 'The token embedding turns discrete ids into dense vectors. Positional embeddings add order information so the model can distinguish “A then B” from “B then A”.' },
      { title: 'Masked attention is the heart of autoregression', body: 'The lower-triangular mask forces each token to see only the past. If this mask is wrong, the model cheats during training and collapses at generation time.' },
      { title: 'Residual structure makes depth trainable', body: 'Each transformer block adds attention and feed-forward updates on top of the previous representation. Residual paths and normalization are what make deeper models train stably.' },
      { title: 'The final linear head projects hidden states back to vocabulary logits', body: 'This is where the model turns representation space into next-token probabilities. Training with cross-entropy teaches the model to push the right token above the rest.' },
    ],
    references: [
      { label: 'Attention Is All You Need', href: 'https://arxiv.org/abs/1706.03762' },
      { label: 'The Illustrated Transformer', href: 'https://jalammar.github.io/illustrated-transformer/' },
      { label: 'nanoGPT by Andrej Karpathy', href: 'https://github.com/karpathy/nanoGPT' },
      { label: 'PyTorch Transformer docs', href: 'https://pytorch.org/docs/stable/generated/torch.nn.Transformer.html' },
    ],
  },
  zh: {
    breadcrumb: 'Mini-GPT',
    title: 'Mini-GPT（莎士比亚语料）',
    intro: '这个项目会把 transformer 理论真正落成一个可运行语言模型。你会从零构建一个小型 GPT，在 Shakespeare 语料上训练，并观察架构、优化和采样策略如何影响生成质量。',
    learnTitle: '你会学到什么',
    codeTitle: 'Starter Architecture Sketch',
    codeIntro: '这段代码给出最小架构骨架。目标不是盲抄，而是真正理解 embedding、mask、residual path 和 logits 为什么要这样连接。',
    codeWalkthrough: '代码要点解释',
    stepsTitle: '构建步骤',
    pitfallsTitle: '常见坑',
    hardwareTitle: '硬件对比',
    rubricTitle: '完成标准',
    refsTitle: '参考资料',
    stats: [
      { k: '数据集', v: 'Tiny Shakespeare' },
      { k: '模型', v: 'Decoder-only GPT' },
      { k: '目标', v: '生成连贯文本' },
      { k: '训练时间', v: '约 10–90 分钟' },
    ],
    learn: [
      'token embedding 和 positional embedding 如何配合',
      'causal masking 如何阻止未来信息泄漏',
      'transformer block 如何堆叠 attention 与前馈计算',
      '采样策略如何改变文本质量与多样性',
      '如何理解 context length、perplexity 和训练稳定性',
    ],
    walkthrough: [
      { title: 'Embedding 表本质上是可学习查表系统', body: 'token embedding 会把离散 id 映射成稠密向量。位置 embedding 再补上顺序信息，让模型知道“A 在 B 前面”和“B 在 A 前面”不是一回事。' },
      { title: '带 mask 的 attention 是自回归建模核心', body: '下三角 mask 强制每个 token 只能看见过去。如果 mask 写错，模型训练时就会作弊，到了生成时会明显崩掉。' },
      { title: 'Residual 结构让深层模型可训练', body: '每个 transformer block 都是在上一层表示的基础上再加 attention 和前馈更新。真正让深层训练稳定的关键是 residual path 和 normalization。' },
      { title: '最终线性头把隐藏状态投回词表 logits', body: '这一步把表示空间重新映射成下一个 token 的概率分布。交叉熵训练的目标，就是让正确 token 的 logit 被持续推高。' },
    ],
    references: [
      { label: 'Attention Is All You Need', href: 'https://arxiv.org/abs/1706.03762' },
      { label: 'The Illustrated Transformer', href: 'https://jalammar.github.io/illustrated-transformer/' },
      { label: 'Andrej Karpathy 的 nanoGPT', href: 'https://github.com/karpathy/nanoGPT' },
      { label: 'PyTorch Transformer 文档', href: 'https://pytorch.org/docs/stable/generated/torch.nn.Transformer.html' },
    ],
  },
} as const;

const STEPS = [
  { n: 1, title: { en: 'Tokenizer', zh: 'Tokenizer' }, body: { en: 'Character-level tokenizer: build vocab, encode/decode strings, handle special tokens.', zh: '字符级 tokenizer，构建词表、实现 encode/decode，并处理特殊 token。' } },
  { n: 2, title: { en: 'Embedding Layer', zh: 'Embedding 层' }, body: { en: 'Token + positional embeddings. Understand why we need both.', zh: '实现 token embedding 和 positional embedding，并理解两者都不可缺。' } },
  { n: 3, title: { en: 'Attention Block', zh: 'Attention Block' }, body: { en: 'Causal multi-head attention with explicit masking and unit tests.', zh: '实现带显式 mask 和单元测试的 causal 多头注意力。' } },
  { n: 4, title: { en: 'Transformer Block', zh: 'Transformer Block' }, body: { en: 'LayerNorm → Attention → residual → LayerNorm → FFN → residual.', zh: 'LayerNorm → Attention → residual → LayerNorm → FFN → residual。' } },
  { n: 5, title: { en: 'GPT Model', zh: 'GPT 模型' }, body: { en: 'Stack N blocks, add final norm and linear head, then count parameters.', zh: '堆叠 N 个 block，加入最终 norm 和线性头，并统计参数量。' } },
  { n: 6, title: { en: 'Training', zh: '训练' }, body: { en: 'Use cross-entropy, AdamW, and cosine decay to train next-token prediction.', zh: '用交叉熵、AdamW 和 cosine decay 训练 next-token prediction。' } },
  { n: 7, title: { en: 'Sampling', zh: '采样' }, body: { en: 'Compare greedy, top-k, top-p, and temperature-based decoding.', zh: '对比 greedy、top-k、top-p 和 temperature 解码。' } },
  { n: 8, title: { en: 'Stretch Goals', zh: '扩展目标' }, body: { en: 'Try Flash Attention, longer context, DDP, or a better tokenizer.', zh: '尝试 Flash Attention、更长上下文、DDP 或更好的 tokenizer。' } },
] as const;

const PITFALLS = [
  { title: { en: 'Wrong mask convention', zh: 'mask 方向写错' }, body: { en: 'One sign error in the causal mask lets tokens see the future. Unit-test on a 4-token example before trusting the loss.', zh: 'causal mask 只要符号方向错一次，token 就会偷看未来。先在 4-token 的极小例子上做单元测试，再相信 loss。' } },
  { title: { en: 'Forgetting to shift targets', zh: '忘记错位标签' }, body: { en: 'Language modeling predicts the next token. Inputs and labels must be offset by one position.', zh: '语言模型预测的是“下一个 token”，所以输入和标签必须错开一位。' } },
  { title: { en: 'Sampling with dropout on', zh: '采样时忘记关闭 dropout' }, body: { en: 'If model.eval() is missing, output quality becomes noisy and unstable during generation.', zh: '如果忘记 model.eval()，生成结果会因为 dropout 仍然开启而变得噪声很大。' } },
  { title: { en: 'Ignoring gradient clipping', zh: '忽略梯度裁剪' }, body: { en: 'Even small GPTs can spike gradients early in training. Clip and monitor loss explosions.', zh: '即使是小 GPT，在训练早期也会出现梯度尖峰。要做裁剪，并监控 loss 爆炸。' } },
] as const;

const HARDWARE_ROWS = [
  { hw: 'MacBook M4 Pro', base: '✅ Small run', long: '⚠️ Limited', sweep: '❌ Painful' },
  { hw: 'RTX 4090', base: '✅ Comfortable', long: '✅ Good', sweep: '✅ Strong' },
  { hw: 'A100 80GB', base: '✅ Easy', long: '✅ Excellent', sweep: '✅ Excellent' },
];

export default function MiniGPTPage() {
  const locale = 'en' as const;
  const t = COPY[locale];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]">{t.breadcrumb}</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">🧠</span>
        <div>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-purple">Transformer</span>
            <span className="badge badge-green">Intermediate</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">{t.title}</h1>
        </div>
      </div>

      <p className="text-[var(--text-muted)] mb-8"><span className="block mb-2">{COPY.en.intro}</span><span className="block">{COPY.zh.intro}</span></p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {COPY.en.stats.map((item, idx) => (
          <div key={item.k} className="card text-center py-3">
            <div className="text-sm text-[var(--text-muted)]">{item.k} / {COPY.zh.stats[idx].k}</div>
            <div className="font-bold text-[var(--text-primary)] mt-1">{item.v} / {COPY.zh.stats[idx].v}</div>
          </div>
        ))}
      </div>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">{COPY.en.learnTitle} / {COPY.zh.learnTitle}</h2>
        <ul className="text-sm space-y-3 text-[var(--text-muted)]">
          {COPY.en.learn.map((item, idx) => <li key={item}>▸ {item}<br />▸ {COPY.zh.learn[idx]}</li>)}
        </ul>
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">{COPY.en.codeTitle} / {COPY.zh.codeTitle}</h2>
      <p className="text-sm text-[var(--text-muted)] mb-4">{COPY.en.codeIntro}<br />{COPY.zh.codeIntro}</p>
      <pre className="text-xs leading-relaxed overflow-x-auto rounded-xl p-4 mb-8">{`import torch
import torch.nn as nn

class MiniGPT(nn.Module):
    def __init__(self, vocab_size, n_embd, block_size):
        super().__init__()
        self.token_emb = nn.Embedding(vocab_size, n_embd)
        self.pos_emb = nn.Embedding(block_size, n_embd)
        self.blocks = nn.Sequential(...)
        self.ln_f = nn.LayerNorm(n_embd)
        self.head = nn.Linear(n_embd, vocab_size)

    def forward(self, idx):
        B, T = idx.shape
        tok = self.token_emb(idx)
        pos = self.pos_emb(torch.arange(T, device=idx.device))
        x = tok + pos
        x = self.blocks(x)
        x = self.ln_f(x)
        return self.head(x)`}</pre>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">{COPY.en.codeWalkthrough} / {COPY.zh.codeWalkthrough}</h2>
        <div className="space-y-4 text-sm text-[var(--text-muted)]">
          {COPY.en.walkthrough.map((item, idx) => (
            <div key={item.title}>
              <p className="font-semibold text-[var(--text-primary)]">{item.title}</p>
              <p>{item.body}</p>
              <p className="mt-1">{COPY.zh.walkthrough[idx].title}</p>
              <p>{COPY.zh.walkthrough[idx].body}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">{COPY.en.stepsTitle} / {COPY.zh.stepsTitle}</h2>
      <div className="space-y-4 mb-12">
        {STEPS.map((s) => (
          <div key={s.n} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-brand-400/40 font-mono w-8 shrink-0">{s.n}</span>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">{s.title.en} / {s.title.zh}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{s.body.en}<br />{s.body.zh}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">{COPY.en.pitfallsTitle} / {COPY.zh.pitfallsTitle}</h2>
      <div className="space-y-3 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.title.en} className="card border-yellow-500/20">
            <p className="text-sm font-semibold text-yellow-400 mb-1">⚠️ {p.title.en} / {p.title.zh}</p>
            <p className="text-xs text-[var(--text-muted)]">{p.body.en}<br />{p.body.zh}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">{COPY.en.hardwareTitle} / {COPY.zh.hardwareTitle}</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-xs text-[var(--text-muted)] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Hardware</th>
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Base train</th>
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Long context</th>
              <th className="text-left py-2 text-[var(--text-primary)] font-semibold">Sweep</th>
            </tr>
          </thead>
          <tbody>
            {HARDWARE_ROWS.map((r) => (
              <tr key={r.hw} className="border-b border-[var(--border)]">
                <td className="py-2 pr-4 text-[var(--text-primary)] font-medium">{r.hw}</td>
                <td className="py-2 pr-4">{r.base}</td>
                <td className="py-2 pr-4">{r.long}</td>
                <td className="py-2">{r.sweep}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">{COPY.en.rubricTitle} / {COPY.zh.rubricTitle}</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>✅ Model trains without mask bugs or divergence / 模型训练无 mask bug、无明显发散</li>
          <li>✅ Generation quality improves across checkpoints / 生成质量会随着 checkpoint 提升</li>
          <li>✅ Sampling script supports temperature and top-k / 采样脚本支持 temperature 和 top-k</li>
          <li>✅ You can explain why each architecture piece exists / 你能解释每个架构部件存在的原因</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">{COPY.en.refsTitle} / {COPY.zh.refsTitle}</h2>
        <ul className="space-y-2 text-sm">
          {COPY.en.references.map((ref, idx) => (
            <li key={ref.href}><a href={ref.href} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-brand-200">{ref.label}</a><div className="text-[var(--text-muted)]">{COPY.zh.references[idx].label}</div></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
