import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transformer Architecture',
  description: 'Implement attention, multi-head attention, and full GPT/BERT from scratch in PyTorch.',
};

const MODULES = [
  { id: 1,  title: 'Why Attention?',               desc: 'RNN limitations, sequence modelling context, intuition for attention.' },
  { id: 2,  title: 'Scaled Dot-Product Attention', desc: 'QKV formulation, softmax scaling, mask mechanics — implement in NumPy.' },
  { id: 3,  title: 'Multi-Head Attention',          desc: 'Parallel attention heads, concat & project — PyTorch nn.Module.' },
  { id: 4,  title: 'Positional Encoding',           desc: 'Sinusoidal PE, learned PE, RoPE — trade-offs and code.' },
  { id: 5,  title: 'Feed-Forward & Residuals',      desc: 'Layer norm position debate, pre-norm vs post-norm, GELU activation.' },
  { id: 6,  title: 'Encoder Stack (BERT-style)',    desc: 'Stack blocks, CLS token, MLM pre-training objective.' },
  { id: 7,  title: 'Decoder Stack (GPT-style)',     desc: 'Causal masking, autoregressive generation, KV caching.' },
  { id: 8,  title: 'Training at Scale',             desc: 'Batch size, LR warmup, gradient clipping, mixed precision.' },
  { id: 9,  title: 'Fine-tuning & Hugging Face',   desc: 'Trainer API, LoRA adapters, PEFT overview.' },
  { id: 10, title: 'Capstone: Mini-GPT',            desc: 'Train character-level GPT on Shakespeare. ~10M params.', isCapstone: true },
];

export default function TransformerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/courses" className="hover:text-slate-300">Courses</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Transformer Architecture</span>
      </nav>

      <div className="flex items-start gap-4 mb-6">
        <span className="text-5xl">🤖</span>
        <div>
          <span className="badge badge-purple mb-2">Intermediate</span>
          <h1 className="text-4xl font-extrabold text-white">Transformer Architecture</h1>
        </div>
      </div>

      <p className="text-slate-400 text-lg mb-4 max-w-2xl">
        "Attention Is All You Need" in 10 modules. You will implement every component
        from scratch before touching any framework shortcut.
      </p>

      <div className="flex gap-6 text-sm text-slate-500 mb-12">
        <span>⏱ ~30 hours</span>
        <span>📦 10 modules</span>
        <span>🐍 PyTorch 2.x, Hugging Face</span>
      </div>

      <div className="card mb-10">
        <h2 className="font-semibold text-white mb-2">Prerequisites</h2>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>▸ PyTorch Foundations (or equivalent)</li>
          <li>▸ Matrix multiplication, softmax, log probabilities</li>
          <li>▸ Basic NLP intuition (tokenization, embeddings)</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Modules</h2>
      <div className="space-y-3">
        {MODULES.map((mod) => (
          <div key={mod.id}
               className={`card flex items-start gap-4 ${mod.isCapstone ? 'border-brand-500/50' : ''}`}>
            <span className={`text-lg font-mono font-bold shrink-0 ${mod.isCapstone ? 'text-brand-400' : 'text-slate-600'}`}>
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

      <div className="mt-10 p-6 rounded-2xl"
           style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(99,102,241,0.10))',
                    border: '1px solid rgba(168,85,247,0.3)' }}>
        <h3 className="text-lg font-bold text-white mb-2">🏁 Capstone: Mini-GPT</h3>
        <p className="text-slate-400 text-sm mb-4">
          Implement a character-level GPT (Karpathy-style) from scratch: tokenizer, embedding, 
          causal transformer blocks, and autoregressive sampling. Train on Shakespeare corpus.
        </p>
        <Link href="/projects/mini-gpt"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500
                         text-white text-sm font-semibold transition-colors">
          View Project Guide →
        </Link>
      </div>
    </div>
  );
}
