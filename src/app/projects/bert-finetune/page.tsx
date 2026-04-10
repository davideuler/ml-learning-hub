import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Project: BERT Sentiment Fine-tune' };

const STEPS = [
  { title: 'Prepare the dataset pipeline / 数据准备', body: 'Load GLUE SST-2, tokenize with AutoTokenizer, inspect label balance, and prepare a clean train/validation split. / 加载 GLUE SST-2，用 AutoTokenizer 分词，检查标签分布，并准备干净的训练/验证集。' },
  { title: 'Baseline with Trainer / 先做基线', body: 'Fine-tune bert-base-uncased with Hugging Face Trainer and record learning rate, loss, and validation accuracy. / 先用 Hugging Face Trainer 微调 bert-base-uncased，记录学习率、loss 和验证精度。' },
  { title: 'Add LoRA / 加入 LoRA', body: 'Compare full fine-tuning with LoRA on trainable params, VRAM use, speed, and final accuracy. / 对比全量微调和 LoRA 在可训练参数、显存、速度和最终精度上的差异。' },
  { title: 'Error analysis / 错误分析', body: 'Study false positives, negation-heavy sentences, and label ambiguity to understand where the model still fails. / 重点看 false positives、否定句和标签模糊样本，理解模型仍然失败的地方。' },
];

const PITFALLS = [
  { title: 'Tokenization mismatch / 分词器不匹配', body: 'Using the wrong tokenizer or truncation rule silently damages accuracy. / 如果 tokenizer 或 truncation 规则不匹配，精度会静默下降。' },
  { title: 'Treating LoRA as magic / 把 LoRA 当魔法', body: 'LoRA reduces trainable parameters, but bad rank or target modules still gives weak results. / LoRA 只是降参数量，rank 和 target module 选不好，效果一样会差。' },
  { title: 'Ignoring class-specific failure / 忽略类别级失败', body: 'Average accuracy can look fine while the model still fails on negation or sarcastic examples. / 平均精度看着不错，但模型可能仍然在否定句或讽刺样本上持续失败。' },
];

const REFERENCES = [
  { label: 'BERT paper', href: 'https://arxiv.org/abs/1810.04805' },
  { label: 'PEFT docs', href: 'https://huggingface.co/docs/peft/index' },
  { label: 'Transformers Trainer docs', href: 'https://huggingface.co/docs/transformers/main_classes/trainer' },
  { label: 'GLUE benchmark', href: 'https://gluebenchmark.com/' },
];

export default function BertFinetunePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]">BERT Fine-tune</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">📝</span>
        <div>
          <div className="flex gap-2 mb-2"><span className="badge badge-blue">NLP</span><span className="badge badge-green">Intermediate</span></div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">BERT Sentiment Fine-tune / BERT 情感分类微调</h1>
        </div>
      </div>

      <p className="text-[var(--text-muted)] mb-8">Train a sentiment classifier with BERT, then compare full fine-tuning against LoRA so you understand where PEFT saves memory and where it trades away flexibility. <br />用 BERT 训练情感分类器，并对比全量微调和 LoRA，真正理解 PEFT 在节省显存的同时牺牲了什么、保留了什么。</p>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">What you learn / 你会学到什么</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>▸ Transformer fine-tuning workflow / Transformer 微调完整流程</li>
          <li>▸ LoRA and PEFT tradeoffs / LoRA 与 PEFT 的核心权衡</li>
          <li>▸ Hugging Face Trainer usage / Hugging Face Trainer 实战</li>
          <li>▸ Error analysis for NLP classification / NLP 分类任务错误分析</li>
        </ul>
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Starter Code / 起始代码</h2>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-8 rounded-xl p-4">{`from transformers import AutoTokenizer, AutoModelForSequenceClassification
from peft import LoraConfig, get_peft_model

model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased", num_labels=2
)
peft_config = LoraConfig(r=8, lora_alpha=16, target_modules=["query", "value"])
model = get_peft_model(model, peft_config)`}</pre>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Code walkthrough / 代码要点解释</h2>
        <div className="space-y-4 text-sm text-[var(--text-muted)]">
          <p><span className="font-semibold text-[var(--text-primary)]">Classification head matters / 分类头很关键：</span> the pretrained encoder is general-purpose, but task performance depends on how the classification head and training objective are wired. / 预训练 encoder 是通用表征器，但最终任务表现很依赖分类头和训练目标的连接方式。</p>
          <p><span className="font-semibold text-[var(--text-primary)]">LoRA changes update scope / LoRA 改变更新范围：</span> only low-rank adapters are trained, so memory drops a lot, but adaptation capacity also becomes more constrained. / LoRA 只训练低秩 adapter，所以显存占用会明显下降，但适应能力也更受约束。</p>
          <p><span className="font-semibold text-[var(--text-primary)]">Error analysis beats raw accuracy / 错误分析比只看精度更重要：</span> if the model fails consistently on negation, the architecture may be fine but the training setup still needs work. / 如果模型在否定句上持续失败，架构不一定有问题，训练设置才是重点。 </p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Build Steps / 构建步骤</h2>
      <div className="space-y-4 mb-12">{STEPS.map((s, i) => <div key={i} className="card"><h3 className="font-semibold text-[var(--text-primary)]">{i + 1}. {s.title}</h3><p className="text-sm text-[var(--text-muted)] mt-1">{s.body}</p></div>)}</div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Common Pitfalls / 常见坑</h2>
      <div className="space-y-3 mb-12">{PITFALLS.map((p) => <div key={p.title} className="card border-yellow-500/20"><p className="text-sm font-semibold text-yellow-400 mb-1">⚠️ {p.title}</p><p className="text-xs text-[var(--text-muted)]">{p.body}</p></div>)}</div>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Success Criteria / 完成标准</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>✅ Full fine-tuning and LoRA are both runnable / 全量微调和 LoRA 两条路径都能跑通</li>
          <li>✅ VRAM and parameter-count comparison is explicit / 显存和参数量对比明确</li>
          <li>✅ Validation errors are analyzed, not just scored / 不只是打分，还做了验证错误分析</li>
        </ul>
      </div>

      <div className="card"><h2 className="font-bold text-[var(--text-primary)] mb-3">References / 参考资料</h2><ul className="space-y-2 text-sm">{REFERENCES.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-brand-200">{r.label}</a></li>)}</ul></div>
    </div>
  );
}
