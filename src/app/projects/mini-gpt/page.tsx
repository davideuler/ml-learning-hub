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

export default function MiniGPTPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/projects" className="hover:text-slate-300">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Mini-GPT</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">📝</span>
        <div>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-purple">Transformers</span>
            <span className="badge badge-blue">Intermediate</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Mini-GPT (Shakespeare)</h1>
        </div>
      </div>

      <p className="text-slate-400 mb-8">
        Implement a character-level GPT — every single component from scratch in PyTorch.
        No Hugging Face for the model itself. Train on Shakespeare's complete works and watch
        it generate vaguely Elizabethan text.
      </p>

      {/* Specs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { k: 'Params',    v: '~10M' },
          { k: 'Dataset',   v: 'Shakespeare 1MB' },
          { k: 'GPU',       v: '1× RTX 3090' },
          { k: 'Train time',v: '~20 min' },
        ].map(({ k, v }) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-slate-500">{k}</div>
            <div className="font-bold text-white mt-1">{v}</div>
          </div>
        ))}
      </div>

      {/* Starter code snippet */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Starter Architecture Sketch</h2>
        <pre className="text-xs leading-relaxed overflow-x-auto">{`import torch
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
      <h2 className="text-xl font-bold text-white mb-6">Build Steps</h2>
      <div className="space-y-4">
        {STEPS.map((s) => (
          <div key={s.n} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-brand-400/40 font-mono w-8 shrink-0">
              {s.n}
            </span>
            <div>
              <h3 className="font-semibold text-white">{s.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{s.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rubric */}
      <div className="mt-10 card">
        <h2 className="font-bold text-white mb-3">Grading Rubric</h2>
        <ul className="text-sm space-y-2 text-slate-400">
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
