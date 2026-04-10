import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transformer Deep Dive',
  description: 'Master attention, multi-head attention, positional encoding, and build GPT/BERT from scratch in PyTorch — with full mathematical foundations.',
};

const MODULES = [
  {
    id: 1,
    title: 'Why Attention?',
    desc: 'RNNs process sequences left-to-right, accumulating context into a fixed-size hidden state — a severe bottleneck for long sequences. Attention lets every position attend directly to every other position. This module derives the information-retrieval framing (query/key/value) and builds intuition before touching a single weight matrix.',
  },
  {
    id: 2,
    title: 'Scaled Dot-Product Attention',
    desc: 'Derive the score(Q,K) = softmax(QKᵀ / √d_k)·V formula from first principles. Implement it in NumPy, verify against PyTorch\'s F.scaled_dot_product_attention, and measure how the √d_k scaling prevents softmax from collapsing into near-one-hot distributions for large d_k.',
  },
  {
    id: 3,
    title: 'Multi-Head Attention',
    desc: 'Project d_model into h heads of d_k = d_model/h each, run attention in parallel, concat, and project back with W^O. Different heads learn syntactic vs. semantic vs. coreference patterns. Build nn.MultiheadAttention from scratch, count parameters, and verify output against PyTorch\'s built-in.',
  },
  {
    id: 4,
    title: 'Positional Encoding',
    desc: 'Transformers are permutation-invariant by default — positional information must be injected. Compare sinusoidal PE (fixed, allows length extrapolation via dot-product properties), learned absolute PE (simpler, slightly better empirically), and RoPE (rotate Q,K before attention — used in LLaMA, generalises better to unseen lengths).',
  },
  {
    id: 5,
    title: 'Feed-Forward Sublayer & Residuals',
    desc: 'Each transformer block contains a two-layer FFN with d_ff = 4×d_model. The residual connection x + Sublayer(x) stabilises gradient flow. LayerNorm placement (pre-norm vs. post-norm) changes training dynamics significantly — pre-norm is now standard in decoder-only LLMs. Implement GELU and SwiGLU activations and benchmark convergence.',
  },
  {
    id: 6,
    title: 'Encoder Stack (BERT-style)',
    desc: 'Stack N encoder blocks (bidirectional attention, no causal mask). Add CLS token, segment embeddings, and the MLM pre-training objective. Implement Masked Language Modelling — randomly mask 15% of tokens, predict them. Understand why BERT representations are contextual but not generative.',
  },
  {
    id: 7,
    title: 'Decoder Stack (GPT-style)',
    desc: 'Apply a causal mask (M[i,j] = -inf if j > i) so position t cannot attend to future tokens. Implement autoregressive generation with KV caching — at inference, cache past K and V tensors and only compute the new token\'s Q. Profile memory and throughput with and without the cache.',
  },
  {
    id: 8,
    title: 'Training at Scale',
    desc: 'Walk through the full training recipe: cosine LR schedule with linear warmup (critical for avoiding early loss explosions), gradient clipping (norm=1.0), mixed precision with torch.amp, and gradient accumulation for large effective batch sizes. Reproduce the warmup curve from "Attention Is All You Need".',
  },
  {
    id: 9,
    title: 'Fine-tuning & PEFT',
    desc: 'Full fine-tuning costs GPU memory proportional to model size. LoRA (Low-Rank Adaptation) freezes base weights and trains two small rank-r matrices per layer: ΔW = BA where B ∈ ℝ^{d×r}, A ∈ ℝ^{r×k}. Use Hugging Face PEFT library to apply LoRA to GPT-2, fine-tune on a custom dataset, and merge adapters back into base weights.',
  },
  {
    id: 10,
    title: 'Capstone: Mini-GPT',
    desc: 'Build a character-level GPT (~10M params) from scratch: BPE tokenizer, embedding layer, N causal transformer blocks, and nucleus sampling. Train on Shakespeare. You will write every line — no nn.Transformer allowed.',
    isCapstone: true,
  },
  {
    id: 11,
    title: 'Modern Variants',
    desc: 'Survey the post-2022 frontier: Flash Attention 2 (IO-aware recomputation, 2–4× throughput), Mamba/SSMs (linear-time sequence modelling as an alternative to attention), Mixture of Experts (MoE — route each token to k of N expert FFNs; used in Mixtral and GPT-4), Grouped Query Attention (GQA — share K,V heads across Q heads, used in LLaMA-3), and speculative decoding (draft small model, verify with large model — up to 3× inference speedup).',
  },
];

const MATH_BLOCKS = [
  {
    title: 'Scaled Dot-Product Attention',
    content: [
      'Q, K, V matrices have shape (batch, heads, seq_len, d_k) where d_k = d_model / n_heads.',
      'The attention output is:',
      '  score(Q,K) = softmax(QKᵀ / √d_k) · V',
      'Why √d_k? The dot product QKᵀ has variance proportional to d_k. Without scaling, large d_k pushes the softmax into near-zero gradient regions (saturation). Dividing by √d_k restores unit variance.',
      'Time complexity: O(n²·d) — every pair of positions must be compared. Memory: O(n²) for the attention matrix. This is why long contexts (n > 32k) are expensive and motivate Flash Attention.',
    ],
  },
  {
    title: 'Multi-Head Attention',
    content: [
      'Split d_model into h heads, each of dimension d_k = d_model / h. For head i:',
      '  head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)',
      'Concatenate and project:',
      '  MultiHead(Q,K,V) = Concat(head_1, ..., head_h) W^O',
      'Each head attends to a different representation subspace — some learn syntactic agreement, others coreference, others positional patterns.',
      'Parameter count: 4 matrices × d_model² (W_Q, W_K, W_V all ∈ ℝ^{d_model × d_model}, W^O ∈ ℝ^{d_model × d_model}). For d_model=768 this is ~2.4M parameters per attention sublayer.',
    ],
  },
  {
    title: 'Positional Encoding (Sinusoidal & RoPE)',
    content: [
      'Transformers have no inherent notion of order. The original paper injects position as:',
      '  PE(pos, 2i)   = sin(pos / 10000^(2i / d_model))',
      '  PE(pos, 2i+1) = cos(pos / 10000^(2i / d_model))',
      'These are added to the input embeddings. The key property: PE(pos + k) can be expressed as a linear function of PE(pos), so the model can attend by relative position via dot products.',
      'RoPE (Rotary Position Embedding): instead of adding positional vectors, rotate Q and K by a position-dependent angle θ_m before attention. The inner product ⟨Rq_m, Rk_n⟩ naturally depends only on the relative position m-n. RoPE generalises to unseen sequence lengths better and is the standard in modern LLMs (GPT-NeoX, LLaMA, Mistral).',
    ],
  },
  {
    title: 'Layer Normalization',
    content: [
      'LayerNorm normalises across the feature dimension (not batch), making it sequence-length agnostic:',
      '  LayerNorm(x) = γ · (x − μ) / (σ + ε) + β',
      'where μ and σ are computed over d_model features for each token independently. γ and β are learned per-feature scalars.',
      'Pre-norm (GPT-style): apply LN before attention and FFN sublayers — x + Sublayer(LN(x)). More numerically stable, enables higher learning rates, current standard for decoder-only LLMs.',
      'Post-norm (original "Attention Is All You Need"): apply LN after the residual — LN(x + Sublayer(x)). Requires careful LR warmup; gradients near the output can vanish before LN.',
      'Why not BatchNorm? Sequences have variable length and batch statistics are unreliable for NLP; LayerNorm computes statistics per token per layer, independent of batch size.',
    ],
  },
  {
    title: 'Feed-Forward Network (FFN)',
    content: [
      'Each transformer block applies a two-layer fully-connected network after attention:',
      '  FFN(x) = max(0, xW_1 + b_1)W_2 + b_2',
      'Or with GELU activation (smoother gradient, used in BERT/GPT):',
      '  FFN(x) = GELU(xW_1 + b_1) W_2 + b_2',
      'd_ff = 4 × d_model is the standard expansion ratio. SwiGLU (used in LLaMA, PaLM) uses d_ff = (8/3) × d_model with a gated structure:',
      '  SwiGLU(x) = (xW_1 ⊙ σ(xW_gate)) W_2',
      'Parameter count per block: 2 × d_model × d_ff. For d_model=4096, d_ff=16384 this is ~134M parameters — the FFN dominates model size in large models.',
    ],
  },
  {
    title: 'Causal Masking & Autoregression',
    content: [
      'To prevent position t from attending to future tokens j > t, add a mask before softmax:',
      '  M[i,j] = −∞  if j > i,  else 0',
      'Training uses teacher forcing: the full target sequence is fed as input, shifted right, and all next-token predictions are computed in parallel. This is O(n) forward passes worth of work in a single forward pass.',
      'Inference uses autoregressive decoding: generate one token at a time. KV caching avoids recomputing past K,V:',
      '  KV cache memory = 2 × n_layers × seq_len × d_model × bytes_per_element',
      'For LLaMA-2-70B at fp16: 2 × 80 × 4096 × 8192 × 2 ≈ 8.6 GB for a 4096-token context. This is why KV cache is the main bottleneck for serving long-context models.',
    ],
  },
  {
    title: 'Cross-Entropy Training Objective',
    content: [
      'The language model is trained to predict the next token via maximum likelihood:',
      '  L = −(1/T) Σ_t log P(x_{t+1} | x_{0..t})',
      'This is exact MLE on the next-token prediction distribution. No reward signal, no separate critic — just cross-entropy over the vocabulary at each position.',
      'Perplexity: PP = exp(L) — the geometric mean number of equally likely choices the model perceives at each step. Lower is better. GPT-2 (1.5B) achieves ~35 on WikiText-103; GPT-3 ~20; modern 7B models ~8–12.',
      'Why does causal LM work as a pretraining objective? To predict the next token well, the model must learn grammar, world facts, reasoning patterns, and discourse structure — essentially compressing the training corpus into weights. Fine-tuning then specialises those representations.',
    ],
  },
];

const PITFALLS = [
  {
    icon: '⚠️',
    title: 'Attention mask sign conventions',
    body: 'PyTorch and Hugging Face use opposite conventions: PyTorch\'s attn_mask adds the mask value (use −inf for positions to ignore), while HF uses a boolean attention_mask where 1=attend, 0=ignore. Mixing these silently passes the wrong thing through softmax — your model still trains, but attends to padding.',
  },
  {
    icon: '⚠️',
    title: 'KV cache invalidation',
    body: 'If you regenerate or modify any earlier part of the sequence (e.g., beam search, speculative decoding rollback), the cached K,V tensors are stale. Continuing with a mismatched cache produces subtly wrong outputs with no runtime error. Always invalidate on sequence modification.',
  },
  {
    icon: '⚠️',
    title: 'Post-norm without LR warmup',
    body: 'Post-norm architectures (original Transformer) are sensitive to the learning rate in early training. Without a gradual linear warmup (typically 4000–10000 steps), the residual stream variance explodes before LayerNorm can stabilise it. Pre-norm largely solves this but still benefits from warmup.',
  },
  {
    icon: '⚠️',
    title: 'Head dimension not integer',
    body: 'd_model / n_heads must be an exact integer. This is never checked at graph construction time — you get a silent shape error or incorrect tensor view only when you run the model. Check divisibility as an assertion in your __init__: assert d_model % n_heads == 0.',
  },
  {
    icon: '⚠️',
    title: 'Flash Attention and non-contiguous tensors',
    body: 'Flash Attention\'s CUDA kernels require contiguous memory layout. Calling view() or transpose() without .contiguous() first creates non-contiguous tensors that cause a cryptic CUDA assert or wrong results. Always call tensor.contiguous() after any reshape before passing to FlashAttention.',
  },
  {
    icon: '⚠️',
    title: 'LoRA rank too high',
    body: 'LoRA with rank=64 on a small model (e.g., GPT-2 124M) adds parameters comparable to full fine-tuning — defeating the purpose. For most tasks, r=4 to r=16 is sufficient and trains faster. Use higher rank only if you observe underfitting and have verified it\'s not a learning rate issue.',
  },
];

export default function TransformerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/courses" className="hover:text-slate-300">Courses</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Transformer Deep Dive</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <span className="text-5xl">🤖</span>
        <div>
          <span className="badge badge-purple mb-2">Intermediate</span>
          <h1 className="text-4xl font-extrabold text-white">Transformer Deep Dive</h1>
        </div>
      </div>

      <p className="text-slate-400 text-lg mb-4 max-w-2xl">
        "Attention Is All You Need" — fully unpacked across 11 modules. You implement every
        component from scratch before touching any framework shortcut. Every equation is derived;
        every pitfall is documented. By the end you will have trained a working Mini-GPT and
        understand exactly what Hugging Face is doing under the hood.
      </p>

      {/* Duration row */}
      <div className="flex gap-6 text-sm text-slate-500 mb-12">
        <span>⏱ ~34 hours</span>
        <span>📦 11 modules</span>
        <span>🐍 PyTorch 2.x · Hugging Face · PEFT</span>
      </div>

      {/* Prerequisites */}
      <div className="card mb-10">
        <h2 className="font-semibold text-white mb-2">Prerequisites</h2>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>▸ PyTorch Foundations (training loops, nn.Module, DataLoader)</li>
          <li>▸ Matrix multiplication, softmax, log probabilities, chain rule</li>
          <li>▸ Basic NLP intuition (tokenization, embeddings, vocabulary)</li>
          <li>▸ Comfort reading research papers — we reference the original 2017 paper throughout</li>
        </ul>
      </div>

      {/* Math Foundations */}
      <h2 className="text-2xl font-bold text-white mb-2">Mathematical Foundations</h2>
      <p className="text-slate-400 text-sm mb-6 max-w-2xl">
        Every key equation is derived inline in its module. This reference section gives you the
        full picture up front so notation is never a surprise mid-lecture. Equations that appear in
        code are shown in the same form used in the implementation.
      </p>

      <div className="space-y-4 mb-12">
        {MATH_BLOCKS.map((block) => (
          <div key={block.title} className="card">
            <h3 className="font-semibold text-white mb-3">{block.title}</h3>
            <div className="space-y-2">
              {block.content.map((line, i) =>
                line.startsWith('  ') ? (
                  <pre key={i} className="text-sm font-mono text-orange-300 bg-orange-950/30 rounded px-3 py-2 overflow-x-auto my-2">
                    {line.trim()}
                  </pre>
                ) : (
                  <p key={i} className="text-sm text-slate-400">{line}</p>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Why Transformers matter */}
      <div className="card mb-10">
        <h2 className="font-semibold text-white mb-2">Why this course matters</h2>
        <p className="text-sm text-slate-400">
          Every modern large language model — GPT-4, Claude, Gemini, LLaMA — is a transformer.
          BERT-style encoders power search ranking, classification, and retrieval at every major tech company.
          Understanding transformers at the equation level is the prerequisite for fine-tuning (see{' '}
          <Link href="/projects/bert-finetune" className="text-purple-400 hover:text-purple-300 underline">
            BERT Fine-Tuning project
          </Link>
          ), for reading modern architecture papers (Mamba, Mistral, MoE), and for debugging
          the subtle failure modes that appear when you move beyond tutorial examples into real workloads.
          This course gives you the mathematical foundation and the hands-on implementation experience
          to operate confidently at that level.
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
          <div
            key={mod.id}
            className={`card flex items-start gap-4 ${mod.isCapstone ? 'border-brand-500/50' : ''}`}
          >
            <span
              className={`text-lg font-mono font-bold shrink-0 ${
                mod.isCapstone ? 'text-brand-400' : 'text-slate-600'
              }`}
            >
              {String(mod.id).padStart(2, '0')}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{mod.title}</h3>
                {mod.isCapstone && <span className="badge badge-purple">Capstone</span>}
              </div>
              <p className="text-sm text-slate-400 mt-0.5">{mod.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Capstone CTA */}
      <div
        className="mt-10 p-6 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(99,102,241,0.10))',
          border: '1px solid rgba(168,85,247,0.3)',
        }}
      >
        <h3 className="text-lg font-bold text-white mb-2">🏁 Capstone: Mini-GPT</h3>
        <p className="text-slate-400 text-sm mb-4">
          Implement a character-level GPT from scratch — BPE tokenizer, token + positional embeddings,
          N causal transformer blocks with pre-norm and GELU, and nucleus sampling for generation.
          Train on the Shakespeare corpus (~1M characters) and watch the model go from noise to
          coherent iambic pentameter in real time. Every line of{' '}
          <span className="font-mono text-purple-300">nn.Transformer</span> is off-limits — you write it all.
          Then extend it to fine-tune on a custom dataset using the BERT Fine-Tuning project workflow.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects/mini-gpt"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500
                       text-white text-sm font-semibold transition-colors"
          >
            View Mini-GPT Guide →
          </Link>
          <Link
            href="/projects/bert-finetune"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-500/40 hover:border-purple-400
                       text-purple-200 text-sm font-semibold transition-colors"
          >
            View BERT Fine-Tuning Project →
          </Link>
        </div>
      </div>
    </div>
  );
}
