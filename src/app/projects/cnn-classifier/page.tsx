import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: CNN Image Classifier',
  description: 'Build a ResNet-style CNN and train it on CIFAR-10 in PyTorch.',
};

export default function CNNClassifierPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/projects" className="hover:text-slate-300">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-white">CNN Classifier</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">🖼️</span>
        <div>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-blue">PyTorch</span>
            <span className="badge badge-green">Beginner</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">CNN Image Classifier</h1>
        </div>
      </div>

      <p className="text-slate-400 mb-8">
        Build a ResNet-18-style convolutional neural network entirely from scratch.
        Train it on CIFAR-10, track metrics with TensorBoard, and target &gt;90% validation accuracy.
        This is the canonical PyTorch project that verifies you understand every moving part.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { k: 'Dataset',   v: 'CIFAR-10' },
          { k: 'Classes',   v: '10' },
          { k: 'Target',    v: '>90% acc' },
          { k: 'Train time',v: '~15 min' },
        ].map(({ k, v }) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-slate-500">{k}</div>
            <div className="font-bold text-white mt-1">{v}</div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Starter Code: ResBlock</h2>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-10">{`import torch.nn as nn

class ResBlock(nn.Module):
    """Basic residual block with optional downsampling."""
    def __init__(self, in_ch: int, out_ch: int, stride: int = 1):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, stride=stride, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
        )
        # Projection shortcut when dims change
        self.shortcut = (
            nn.Sequential(
                nn.Conv2d(in_ch, out_ch, 1, stride=stride, bias=False),
                nn.BatchNorm2d(out_ch),
            ) if stride != 1 or in_ch != out_ch else nn.Identity()
        )
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x):
        return self.relu(self.conv(x) + self.shortcut(x))`}</pre>

      <h2 className="text-xl font-bold text-white mb-6">Build Steps</h2>
      <div className="space-y-3">
        {[
          ['1', 'Data Pipeline', 'torchvision.datasets.CIFAR10 + augmentations (RandomCrop, HorizontalFlip, Normalize).'],
          ['2', 'Model',         'Stack ResBlocks: 64→128→256→512 channels, global average pooling, linear head.'],
          ['3', 'Training Loop', 'AdamW optimizer, OneCycleLR scheduler, gradient clipping, mixed precision (amp).'],
          ['4', 'Evaluation',    'Top-1 accuracy, confusion matrix, per-class precision/recall.'],
          ['5', 'Logging',       'TensorBoard: loss curves, LR curve, sample grid, first-layer filter visualisation.'],
          ['6', 'Export',        'Save best checkpoint, export to TorchScript, verify inference parity.'],
        ].map(([n, t, b]) => (
          <div key={n} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-brand-400/40 font-mono w-8 shrink-0">{n}</span>
            <div>
              <h3 className="font-semibold text-white">{t}</h3>
              <p className="text-sm text-slate-400 mt-1">{b}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 card">
        <h2 className="font-bold text-white mb-3">Grading Rubric</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>✅ Trains without NaN / divergence</li>
          <li>✅ Val accuracy ≥ 88% (passes), ≥ 91% (excellent)</li>
          <li>✅ TensorBoard shows loss + accuracy curves</li>
          <li>⭐ Stretch: Beat ResNet-18 baseline with a custom architecture change</li>
          <li>⭐ Stretch: Add test-time augmentation (TTA) for +0.5% accuracy</li>
        </ul>
      </div>
    </div>
  );
}
