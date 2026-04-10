import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Project: BERT Sentiment Fine-tune' };

export default function BERTFinetunePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/projects" className="hover:text-slate-300">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-white">BERT Fine-tune</span>
      </nav>
      <span className="text-5xl">🔍</span>
      <h1 className="text-3xl font-extrabold text-white mt-4 mb-4">BERT Sentiment Fine-tune</h1>
      <div className="flex gap-2 mb-6">
        <span className="badge badge-purple">Transformers</span>
        <span className="badge badge-blue">Intermediate</span>
      </div>
      <p className="text-slate-400 mb-8">
        Fine-tune <code className="text-brand-300">bert-base-uncased</code> on SST-2 sentiment classification
        using Hugging Face Trainer. Includes LoRA adapter variant to compare parameter-efficient fine-tuning.
        Full guide in v0.2.
      </p>
      <div className="card">
        <h2 className="font-bold text-white mb-3">Key Concepts</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>▸ Tokenization with AutoTokenizer</li>
          <li>▸ Classification head on [CLS] token</li>
          <li>▸ Differential LR (lower for pre-trained layers)</li>
          <li>▸ LoRA adapters (rank=8) — 0.1% trainable params</li>
          <li>▸ Evaluation on GLUE SST-2 benchmark</li>
        </ul>
      </div>
    </div>
  );
}
