import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Project: BERT Sentiment Fine-tune' };

const STEPS = [
  {
    title: 'Prepare the dataset pipeline',
    body: 'Load GLUE SST-2 with datasets, inspect class balance, tokenize with AutoTokenizer, and build a minimal error-analysis split before training.',
  },
  {
    title: 'Baseline with Trainer',
    body: 'Fine-tune bert-base-uncased end-to-end with Hugging Face Trainer. Track learning rate, warmup ratio, validation accuracy, and confusion cases.',
  },
  {
    title: 'Parameter-efficient fine-tuning',
    body: 'Add a LoRA branch and compare trainable parameter count, VRAM usage, training speed, and final validation accuracy.',
  },
  {
    title: 'Evaluation and failure analysis',
    body: 'Inspect false positives and false negatives, especially negation-heavy sentences and sarcastic expressions. Tie failure patterns back to training data.',
  },
  {
    title: 'Packaging for inference',
    body: 'Export a prediction script, batch inference function, and tiny FastAPI endpoint so the model becomes a reusable service, not just a notebook result.',
  },
];

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
        using Hugging Face Trainer. Includes a LoRA adapter branch so you can compare full fine-tuning
        against parameter-efficient fine-tuning under different hardware budgets.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { k: 'Dataset', v: 'GLUE SST-2' },
          { k: 'Target', v: '94%+ acc' },
          { k: 'Time', v: '2–4 hrs' },
          { k: 'Hardware', v: 'M4 / 4090' },
        ].map(({ k, v }) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-slate-500">{k}</div>
            <div className="font-bold text-white mt-1">{v}</div>
          </div>
        ))}
      </div>
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
      <div className="space-y-4 mt-8">
        {STEPS.map((step, idx) => (
          <div key={step.title} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-purple-400/40 font-mono w-8 shrink-0">{idx + 1}</span>
            <div>
              <h3 className="font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 card border-purple-500/30">
        <h2 className="font-bold text-white mb-3">Hardware guidance</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>▸ <strong className="text-white">Mac M4 Pro 128G:</strong> Full fine-tune of BERT-base is realistic for this project, just slower.</li>
          <li>▸ <strong className="text-white">RTX 4090:</strong> Best default option, leaves room for hyperparameter sweeps and LoRA comparisons.</li>
          <li>▸ <strong className="text-white">A100:</strong> Useful if you batch multiple GLUE tasks or compare larger encoder models.</li>
          <li>▸ <strong className="text-white">8x L20:</strong> Overkill for SST-2 alone, but appropriate for multi-task fine-tuning pipelines.</li>
        </ul>
      </div>
    </div>
  );
}
