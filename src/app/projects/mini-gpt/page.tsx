import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: Mini-GPT',
  description: 'Build a character-level GPT from scratch in PyTorch.',
};

const STEPS = [
  { n: 1, title: 'Tokenizer',         body: 'Character-level tokenizer: build vocab, encode/decode strings, handle special tokens.' },
  { n: 2, title: 'Embedding Layer',   body: 'Token + positional embeddings. Understand why we need both.' },
  { n: 3, title: 'Attention Block',   body: 'Causal (masked) multi-head attention. Implement & unit-test masking logic.' },
  { n: 4, title: 'Transformer Block', body: 'LayerNorm → Attention → residual → LayerNorm → FFN → residual (pre-norm order).' },
  { n: 5, title: 'GPT Model',         body: 'Stack N blocks, add final LayerNorm + linear head. Count parameters.' },
  { n: 6, title: 'Training',          body: 'Cross-entropy loss on next token, AdamW optimizer, cosine LR schedule.' },
  { n: 7, title: 'Sampling',          body: 'Greedy, top-k, nucleus (top-p) sampling. Temperature scaling.' },
  { n: 8, title: 'Stretch Goals',     body: 'Flash Attention, multi-GPU (DDP), word-level tokenizer, perplexity eval.' },
];

const PITFALLS = [
  {
    title: 'Wrong mask convention',
    body: 'A single sign error in the causal mask lets tokens attend to the future. Unit-test with a tiny 4-token example before you trust any loss curve.',
  },
  {
    title: 'Forgetting to shift targets',
    body: 'Language modeling predicts the next token. Inputs and labels must be offset by one position, or the model will learn a trivial identity map.',
  },
  {
    title: 'Using dropout during sampling',
    body: 'If you forget model.eval(), generated text quality looks random and inconsistent because dropout remains active at inference time.',
  },
  {
    title: 'No gradient clipping',
    body: 'Small GPTs can still spike gradients early in training. Clip grad norm and monitor loss explosions, especially on longer context lengths.',
  },
  {
    title: 'KV cache bugs from tensor shape assumptions',
    body: 'If you extend the project to cached decoding, shape mismatches often come from mixing batch-first and time-first assumptions. Write explicit asserts.',
  },
  {
    title: 'Comparing runs with different tokenization',
    body: 'Character-level and word-level perplexity are not directly comparable. Keep tokenization fixed if you want meaningful benchmark comparisons.',
  },
];

const HARDWARE_ROWS = [
  { hw: 'Mac M4 Pro 128G', train: '✅ ~35–50 min', longer_ctx: '⚠️ Manageable', sweeps: '❌ Limited' },
  { hw: 'RTX 4090', train: '✅ ~15–25 min', longer_ctx: '✅ Good', sweeps: '✅ Good for ablations' },
  { hw: 'A100 80GB', train: '✅ ~10–15 min', longer_ctx: '✅ Excellent', sweeps: '✅ Excellent' },
  { hw: '8× L20', train: '⚠️ Overkill', longer_ctx: '✅ Best for scaling', sweeps: '✅ Best for many experiments' },
];

export default function MiniGPTPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]">Mini-GPT</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">📝</span>
        <div>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-purple">Transformers</span>
            <span className="badge badge-blue">Intermediate</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">Mini-GPT (Shakespeare)</h1>
        </div>
      </div>

      <p className="text-[var(--text-muted)] mb-8">
        Implement a character-level GPT — every single component from scratch in PyTorch.
        No Hugging Face for the model itself. Train on Shakespeare's complete works and watch
        it generate vaguely Elizabethan text.
      </p>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">What you learn</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>▸ How token embeddings, positional information, and masked attention fit together</li>
          <li>▸ Why pre-norm residual blocks are easier to train than naive transformer stacks</li>
          <li>▸ How sampling strategy changes perceived model quality, even with the same checkpoint</li>
          <li>▸ How to think about context length, parameter count, and throughput tradeoffs</li>
          <li>▸ Why GPT training is mostly about data pipeline discipline and tensor shape sanity</li>
        </ul>
      </div>

      {/* Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { k: 'Params',    v: '~10M' },
          { k: 'Dataset',   v: 'Shakespeare 1MB' },
          { k: 'Hardware',  v: '4090 / A100' },
          { k: 'Train time',v: '~20–30 min' },
        ].map(({ k, v }) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-[var(--text-muted)]">{k}</div>
            <div className="font-bold text-[var(--text-primary)] mt-1">{v}</div>
          </div>
        ))}
      </div>

      {/* Starter code snippet */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Starter Architecture Sketch</h2>
        <pre className="text-xs leading-relaxed overflow-x-auto rounded-xl p-4 bg-[var(--code-bg)] border border-[var(--border)]">{`import torch
import torch.nn as nn
import torch.nn.functional as F

class CausalSelfAttention(nn.Module):
    def __init__(self, n_embd: int, n_head: int, block_size: int, dropout: float = 0.1):
        super().__init__()
        assert n_embd % n_head == 0
        self.n_head = n_head
        self.head_dim = n_embd // n_head
        self.qkv  = nn.Linear(n_embd, 3 * n_embd, bias=False)
        self.proj = nn.Linear(n_embd, n_embd)
        self.drop = nn.Dropout(dropout)
        # Causal mask — lower triangular
        mask = torch.tril(torch.ones(block_size, block_size))
        self.register_buffer('mask', mask.view(1, 1, block_size, block_size))

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        B, T, C = x.size()
        q, k, v = self.qkv(x).split(C, dim=2)
        # Reshape to (B, n_head, T, head_dim)
        def reshape(t): return t.view(B, T, self.n_head, self.head_dim).transpose(1, 2)
        q, k, v = reshape(q), reshape(k), reshape(v)
        scale = self.head_dim ** -0.5
        att = (q @ k.transpose(-2, -1)) * scale
        att = att.masked_fill(self.mask[:, :, :T, :T] == 0, float('-inf'))
        att = F.softmax(att, dim=-1)
        att = self.drop(att)
        out = att @ v  # (B, n_head, T, head_dim)
        out = out.transpose(1, 2).contiguous().view(B, T, C)
        return self.proj(out)`}</pre>
      </div>

      {/* Steps */}
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Build Steps</h2>
      <div className="space-y-4">
        {STEPS.map((s) => (
          <div key={s.n} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-brand-400/40 font-mono w-8 shrink-0">
              {s.n}
            </span>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">{s.title}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 mt-12">Common Pitfalls</h2>
      <div className="space-y-3 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.title} className="card border-yellow-500/20">
            <p className="text-sm font-semibold text-yellow-400 mb-1">⚠️ {p.title}</p>
            <p className="text-xs text-[var(--text-muted)]">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Hardware Comparison</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-xs text-[var(--text-muted)] border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Hardware</th>
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Base train run</th>
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Longer context</th>
              <th className="text-left py-2 text-[var(--text-primary)] font-semibold">Ablation sweeps</th>
            </tr>
          </thead>
          <tbody>
            {HARDWARE_ROWS.map((r) => (
              <tr key={r.hw} className="border-b border-[var(--border)]">
                <td className="py-2 pr-4 text-[var(--text-primary)] font-medium">{r.hw}</td>
                <td className="py-2 pr-4">{r.train}</td>
                <td className="py-2 pr-4">{r.longer_ctx}</td>
                <td className="py-2">{r.sweeps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rubric */}
      <div className="mt-10 card">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Grading Rubric</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>✅ Model trains without NaN losses</li>
          <li>✅ Validation loss decreases monotonically for 1000 steps</li>
          <li>✅ Generated text passes the &quot;Shakespeare vibe check&quot; (coherent words)</li>
          <li>⭐ Stretch: Flash Attention speed-up ≥ 1.5× on RTX 4090</li>
          <li>⭐ Stretch: Perplexity &lt; 5.0 on held-out validation set</li>
        </ul>
      </div>
    </div>
  );
}
