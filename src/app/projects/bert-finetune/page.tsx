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

const PITFALLS = [
  {
    title: 'Tokenization truncation hiding errors',
    body: 'If you truncate blindly, long examples may lose the actual sentiment cue. Always inspect sequence length distribution before fixing max_length.',
  },
  {
    title: 'Learning rate too high for full fine-tuning',
    body: 'BERT-base is usually happiest in the 1e-5 to 5e-5 range. Using a CNN-style learning rate will destroy pre-trained representations fast.',
  },
  {
    title: 'LoRA comparison without equal eval settings',
    body: 'If full fine-tuning and LoRA runs use different seeds, batch sizes, or epoch counts, the comparison is noise, not evidence.',
  },
  {
    title: 'Using accuracy alone on a tiny validation split',
    body: 'For SST-2 accuracy is standard, but still inspect confusion cases and confidence calibration. A single number hides failure modes.',
  },
  {
    title: 'Forgetting model.eval() during validation',
    body: 'Dropout and layer norm behaviour make validation noisy if you keep the model in train mode. This mistake shows up more often than people admit.',
  },
  {
    title: 'MPS / CUDA dtype mismatch in PEFT stacks',
    body: 'When combining transformers, peft, and mixed precision, make sure adapter weights and base weights agree on dtype. Silent casting kills speed and sometimes stability.',
  },
];

const HARDWARE_ROWS = [
  { hw: 'Mac M4 Pro 128G', full_ft: '✅ Slow but viable', lora: '✅ Easy', multitask: '⚠️ Limited' },
  { hw: 'RTX 4090', full_ft: '✅ Best default', lora: '✅ Excellent', multitask: '✅ Good' },
  { hw: 'A100 80GB', full_ft: '✅ Excellent', lora: '✅ Overkill', multitask: '✅ Excellent' },
  { hw: '8× L20', full_ft: '⚠️ Overkill for SST-2', lora: '⚠️ Overkill', multitask: '✅ Best for pipelines' },
];

export default function BERTFinetunePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]">BERT Fine-tune</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">🔍</span>
        <div>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-purple">Transformers</span>
            <span className="badge badge-blue">Intermediate</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">BERT Sentiment Fine-tune</h1>
        </div>
      </div>

      <p className="text-[var(--text-muted)] mb-8">
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
            <div className="text-sm text-[var(--text-muted)]">{k}</div>
            <div className="font-bold text-[var(--text-primary)] mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">What you learn</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>▸ The difference between using a pre-trained encoder and training from scratch</li>
          <li>▸ How classification heads sit on top of [CLS] representations</li>
          <li>▸ How LoRA changes trainable parameter count, VRAM budget, and iteration speed</li>
          <li>▸ How to evaluate NLP models beyond a single validation accuracy number</li>
          <li>▸ How to package a fine-tuned transformer into a callable service</li>
        </ul>
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Starter Code: Trainer + LoRA Scaffold</h2>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-10 rounded-xl p-4 bg-[var(--code-bg)] border border-[var(--border)]">{`from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    DataCollatorWithPadding,
    TrainingArguments,
    Trainer,
)

MODEL_NAME = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
raw = load_dataset("glue", "sst2")

def preprocess(batch):
    return tokenizer(batch["sentence"], truncation=True, max_length=128)

encoded = raw.map(preprocess, batched=True)
collator = DataCollatorWithPadding(tokenizer=tokenizer)

model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)

# TODO: add a PEFT LoRA branch here for comparison
# from peft import LoraConfig, get_peft_model
# peft_cfg = LoraConfig(r=8, lora_alpha=16, target_modules=[...])
# model = get_peft_model(model, peft_cfg)

args = TrainingArguments(
    output_dir="runs/bert-sst2",
    learning_rate=2e-5,
    per_device_train_batch_size=32,
    per_device_eval_batch_size=64,
    num_train_epochs=3,
    weight_decay=0.01,
    evaluation_strategy="epoch",
    save_strategy="epoch",
    load_best_model_at_end=True,
    report_to=["tensorboard"],
)

def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = logits.argmax(-1)
    acc = (preds == labels).mean()
    return {"accuracy": float(acc)}

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=encoded["train"],
    eval_dataset=encoded["validation"],
    tokenizer=tokenizer,
    data_collator=collator,
    compute_metrics=compute_metrics,
)

trainer.train()`}</pre>

      <div className="card">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Key Concepts</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
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
              <h3 className="font-semibold text-[var(--text-primary)]">{step.title}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{step.body}</p>
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
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">Full fine-tune</th>
              <th className="text-left py-2 pr-4 text-[var(--text-primary)] font-semibold">LoRA run</th>
              <th className="text-left py-2 text-[var(--text-primary)] font-semibold">Multi-task experiments</th>
            </tr>
          </thead>
          <tbody>
            {HARDWARE_ROWS.map((r) => (
              <tr key={r.hw} className="border-b border-[var(--border)]">
                <td className="py-2 pr-4 text-[var(--text-primary)] font-medium">{r.hw}</td>
                <td className="py-2 pr-4">{r.full_ft}</td>
                <td className="py-2 pr-4">{r.lora}</td>
                <td className="py-2">{r.multitask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Success Criteria</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>✅ Validation accuracy ≥ 93% with a reproducible seed and config</li>
          <li>✅ Full fine-tune and LoRA runs are compared under matched settings</li>
          <li>✅ At least 20 failure cases are manually reviewed and categorized</li>
          <li>✅ Best model is exported with tokenizer and inference script</li>
          <li>⭐ Stretch: Compare BERT against DistilBERT on speed vs accuracy</li>
          <li>⭐ Stretch: Add confidence calibration or temperature scaling</li>
        </ul>
      </div>
    </div>
  );
}
