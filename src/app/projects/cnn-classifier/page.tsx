import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: CNN Image Classifier',
  description: 'Build a ResNet-style CNN and train it on CIFAR-10 in PyTorch.',
};

const STEPS = [
  { title: { en: 'Data Pipeline', zh: '数据管线' }, body: { en: 'Use CIFAR-10 with train augmentation, normalization, and batch visualization before training.', zh: '使用 CIFAR-10，并在训练前完成数据增强、归一化和 batch 可视化检查。' } },
  { title: { en: 'Build the Model', zh: '构建模型' }, body: { en: 'Stack ResBlocks with downsampling stages and a final classifier head.', zh: '堆叠带下采样阶段的 ResBlock，并接上最终分类头。' } },
  { title: { en: 'Training Loop', zh: '训练循环' }, body: { en: 'Train with AdamW, OneCycleLR, mixed precision, and gradient clipping.', zh: '使用 AdamW、OneCycleLR、混合精度和梯度裁剪进行训练。' } },
  { title: { en: 'Evaluation', zh: '评估' }, body: { en: 'Track top-1 accuracy, confusion matrix, and per-class failure cases.', zh: '跟踪 top-1 accuracy、confusion matrix 和类别级失败案例。' } },
  { title: { en: 'Logging and Export', zh: '日志与导出' }, body: { en: 'Use TensorBoard and export the trained model to TorchScript.', zh: '使用 TensorBoard，并把训练好的模型导出到 TorchScript。' } },
] as const;

const PITFALLS = [
  { title: { en: 'Wrong normalization stats', zh: '归一化统计值错误' }, body: { en: 'Incorrect CIFAR-10 mean/std silently lowers final accuracy.', zh: '如果 CIFAR-10 的 mean/std 用错，最终精度会静默下降。' } },
  { title: { en: 'Broken residual shortcut', zh: '残差 shortcut 写坏' }, body: { en: 'A wrong projection shortcut breaks optimization and slows convergence badly.', zh: '如果 projection shortcut 写错，会显著破坏优化稳定性。' } },
  { title: { en: 'Scheduler timing mismatch', zh: '调度器步进时机不对' }, body: { en: 'OneCycleLR must match total training steps, not just epoch count.', zh: 'OneCycleLR 需要匹配总 step 数，而不是只看 epoch 数。' } },
] as const;

const REFERENCES = [
  { label: 'Deep Residual Learning for Image Recognition', href: 'https://arxiv.org/abs/1512.03385' },
  { label: 'PyTorch CIFAR tutorial', href: 'https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html' },
  { label: 'TorchVision docs', href: 'https://pytorch.org/vision/stable/index.html' },
  { label: 'TensorBoard with PyTorch', href: 'https://pytorch.org/tutorials/intermediate/tensorboard_tutorial.html' },
];

export default function CNNClassifierPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]">CNN Classifier</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">🖼️</span>
        <div>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-blue">PyTorch</span>
            <span className="badge badge-green">Beginner</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)]">CNN Image Classifier / CNN 图像分类器</h1>
        </div>
      </div>

      <p className="text-[var(--text-muted)] mb-8">
        Build a ResNet-style convolutional image classifier on CIFAR-10, then evaluate, export, and understand the full training workflow end to end.<br />
        在 CIFAR-10 上构建一个 ResNet 风格卷积分类器，并完成评估、导出和端到端训练流程理解。
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          ['Dataset / 数据集', 'CIFAR-10'],
          ['Classes / 类别数', '10'],
          ['Target / 目标', '>90% acc'],
          ['Train time / 训练时间', '~15 min'],
        ].map(([k, v]) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-[var(--text-muted)]">{k}</div>
            <div className="font-bold text-[var(--text-primary)] mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">What you learn / 你会学到什么</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>▸ Residual connections and why they help deep CNN optimization / 残差连接为何能帮助深层 CNN 优化</li>
          <li>▸ Data augmentation and its effect on generalization / 数据增强如何影响泛化能力</li>
          <li>▸ Mixed precision and practical PyTorch training patterns / 混合精度与实用 PyTorch 训练模式</li>
          <li>▸ Confusion-matrix based error analysis / 基于 confusion matrix 的错误分析</li>
          <li>▸ Model export and deployment readiness / 模型导出与部署准备</li>
        </ul>
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Starter Code / 起始代码</h2>
      <p className="text-sm text-[var(--text-muted)] mb-4">
        The code below gives you the training scaffold. The most important thing is to understand why the residual block, optimizer, scheduler, and data transforms have to line up correctly.<br />
        下面这段代码给出训练骨架。真正关键的是理解为什么残差块、优化器、调度器和数据变换必须彼此配合正确。
      </p>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-8 rounded-xl p-4">{`class ResBlock(nn.Module):
    def __init__(self, in_ch, out_ch, stride=1):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, stride=stride, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
        )
        self.shortcut = nn.Identity() if stride == 1 and in_ch == out_ch else nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 1, stride=stride, bias=False),
            nn.BatchNorm2d(out_ch),
        )
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x):
        return self.relu(self.conv(x) + self.shortcut(x))`}</pre>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Code walkthrough / 代码要点解释</h2>
        <div className="space-y-4 text-sm text-[var(--text-muted)]">
          <div>
            <p className="font-semibold text-[var(--text-primary)]">Residual path is not decoration / 残差路径不是装饰</p>
            <p>The shortcut path keeps gradient flow alive through deeper stacks. Without it, optimization gets much harder as depth increases.<br />shortcut 路径会让梯度在更深网络中仍然保持流动，没有它，深层优化会明显更难。</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)]">Normalization and augmentation define the training regime / 归一化和增强决定训练制度</p>
            <p>Many bad runs are not architecture failures, they are data pipeline failures. CIFAR-10 normalization and augmentation choices directly affect convergence.<br />很多失败训练不是架构失败，而是数据管线失败。CIFAR-10 的归一化和增强策略会直接影响收敛效果。</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)]">Scheduler timing matters / 调度器时机非常关键</p>
            <p>OneCycleLR only works as intended if total steps match the actual training loop. Otherwise the learning-rate curve collapses too early.<br />只有当 OneCycleLR 的总 step 数与真实训练循环对齐时，它才会按设计工作，否则学习率曲线会过早崩塌。</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Build Steps / 构建步骤</h2>
      <div className="space-y-4 mb-12">
        {STEPS.map((step, idx) => (
          <div key={step.title.en} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-brand-400/40 font-mono w-8 shrink-0">{idx + 1}</span>
            <div>
              <h3 className="font-semibold text-[var(--text-primary)]">{step.title.en} / {step.title.zh}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{step.body.en}<br />{step.body.zh}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Common Pitfalls / 常见坑</h2>
      <div className="space-y-3 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.title.en} className="card border-yellow-500/20">
            <p className="text-sm font-semibold text-yellow-400 mb-1">⚠️ {p.title.en} / {p.title.zh}</p>
            <p className="text-xs text-[var(--text-muted)]">{p.body.en}<br />{p.body.zh}</p>
          </div>
        ))}
      </div>

      <div className="card mb-10">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">Success Criteria / 完成标准</h2>
        <ul className="text-sm space-y-2 text-[var(--text-muted)]">
          <li>✅ Validation accuracy reaches a strong baseline / 验证集准确率达到可靠 baseline</li>
          <li>✅ Confusion matrix and class-level errors are analyzed / 完成 confusion matrix 和类别级错误分析</li>
          <li>✅ TensorBoard logs are complete / TensorBoard 日志完整</li>
          <li>✅ Exported model passes inference sanity check / 导出模型通过推理检查</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="font-bold text-[var(--text-primary)] mb-3">References / 参考资料</h2>
        <ul className="space-y-2 text-sm">
          {REFERENCES.map((ref) => (
            <li key={ref.href}><a href={ref.href} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-brand-200">{ref.label}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
