import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project: CNN Image Classifier',
  description: 'Build a ResNet-style CNN and train it on CIFAR-10 in PyTorch.',
};

const STEPS = [
  {
    title: 'Data Pipeline',
    body: 'torchvision.datasets.CIFAR10 with DataLoader workers. Augment train set with RandomCrop(32, padding=4), RandomHorizontalFlip, and Normalize with CIFAR-10 channel stats. Visualise a batch to verify augmentations before training.',
  },
  {
    title: 'Build the Model',
    body: 'Stack ResBlocks: 3→64→128→256→512 channels with stride-2 downsampling between stages. Add global average pooling after the last stage, followed by a linear classification head. Print parameter count.',
  },
  {
    title: 'Training Loop',
    body: 'AdamW optimizer (weight_decay=5e-4), OneCycleLR scheduler over all epochs, mixed precision with torch.amp.autocast, gradient clipping at max_norm=1.0. Save best checkpoint by validation accuracy.',
  },
  {
    title: 'Evaluation',
    body: 'Top-1 accuracy on the held-out test set. Build a confusion matrix with sklearn, identify the two most-confused class pairs, and check per-class precision/recall.',
  },
  {
    title: 'Logging',
    body: 'TensorBoard: loss and accuracy curves (train/val), LR schedule curve, a grid of sample images with predicted vs true labels, and first-layer filter visualisation.',
  },
  {
    title: 'Export',
    body: 'Save the best checkpoint with optimizer state. Export to TorchScript with torch.jit.script, run a parity check comparing 100 random inputs against the PyTorch model output.',
  },
];

const PITFALLS = [
  {
    title: 'Forgetting to normalise inputs',
    body: 'CIFAR-10 stats are not [0,1] mean/std. Use mean=(0.4914, 0.4822, 0.4465) and std=(0.2470, 0.2435, 0.2616). Training without correct normalisation will converge 5–10% below optimal accuracy.',
  },
  {
    title: 'BatchNorm before the shortcut add',
    body: 'Common ResBlock mistakes include applying BN after the add or skipping BN on the projection shortcut. Either breaks the skip connection\'s identity initialisation property and slows convergence.',
  },
  {
    title: 'OneCycleLR with wrong total_steps',
    body: 'OneCycleLR requires total_steps = epochs × steps_per_epoch. If you pass epochs instead of steps, the LR schedule completes in 1/steps_per_epoch of the intended time, effectively killing the warmup.',
  },
  {
    title: 'DataLoader workers on Windows / fork',
    body: 'Setting num_workers > 0 on Windows or inside a Jupyter notebook without if __name__ == "__main__" guard will deadlock. Wrap your training entry point correctly.',
  },
  {
    title: 'Mixed precision on MPS',
    body: 'torch.amp.autocast("mps") is available from PyTorch 2.3+ but bfloat16 support on MPS is incomplete. Fall back to fp32 or test explicitly; silent dtype mismatches produce NaN losses on MPS.',
  },
  {
    title: 'Training set leak into normalisation stats',
    body: 'Compute normalisation statistics from the training split only. Using full-dataset stats is a subtle data leak that inflates benchmark numbers and will not reproduce on new data.',
  },
];

const HARDWARE_ROWS = [
  { hw: 'MacBook M4 Pro (14-core)', cifar10: '✅ ~15 min (fp32 MPS)', aug_sweep: '⚠️ Slow (>2 hrs)', multi_seed: '❌ Not practical' },
  { hw: 'RTX 4090',                 cifar10: '✅ <5 min (amp)',        aug_sweep: '✅ ~30 min',        multi_seed: '✅ Good for 5 seeds' },
  { hw: 'A100 80GB',                cifar10: '✅ <3 min',             aug_sweep: '✅ <20 min',        multi_seed: '✅ Comfortable' },
  { hw: '8× L20',                   cifar10: '✅ Overkill (<2 min)',  aug_sweep: '✅ Best',           multi_seed: '✅ Best for large sweeps' },
];

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
          { k: 'Dataset',    v: 'CIFAR-10' },
          { k: 'Classes',    v: '10' },
          { k: 'Target',     v: '>90% acc' },
          { k: 'Train time', v: '~15 min' },
        ].map(({ k, v }) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-slate-500">{k}</div>
            <div className="font-bold text-white mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="card mb-10">
        <h2 className="font-bold text-white mb-3">What you learn</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>▸ How residual connections solve the vanishing gradient problem at depth</li>
          <li>▸ Data augmentation strategies and their effect on generalisation</li>
          <li>▸ Mixed-precision training with torch.amp and when it helps vs. hurts</li>
          <li>▸ How to export a model to TorchScript for production deployment</li>
          <li>▸ Reading confusion matrices to diagnose class-level failure modes</li>
        </ul>
      </div>

      {/* Starter Code */}
      <h2 className="text-xl font-bold text-white mb-4">Starter Code: ResBlock &amp; Training Scaffold</h2>
      <p className="text-sm text-slate-400 mb-4">
        The ResBlock below is complete. Your job: implement <code className="text-brand-300">ResNet</code>,
        wire up the DataLoaders with augmentation, write the training loop, and add logging.
      </p>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-10 rounded-xl p-4 bg-slate-900 border border-slate-700">{`import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# ── ResBlock (complete — do not modify) ───────────────────────────────────────
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
        self.shortcut = (
            nn.Sequential(
                nn.Conv2d(in_ch, out_ch, 1, stride=stride, bias=False),
                nn.BatchNorm2d(out_ch),
            ) if stride != 1 or in_ch != out_ch else nn.Identity()
        )
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x):
        return self.relu(self.conv(x) + self.shortcut(x))


# ── ResNet Model (TODO: implement) ────────────────────────────────────────────
class ResNet(nn.Module):
    """Small ResNet for CIFAR-10 (32×32 input)."""
    def __init__(self, num_classes: int = 10):
        super().__init__()
        # TODO: stem: Conv2d(3, 64, 3, padding=1) + BN + ReLU (no maxpool for 32×32)
        # TODO: stage1: 2× ResBlock(64, 64)
        # TODO: stage2: ResBlock(64, 128, stride=2) + ResBlock(128, 128)
        # TODO: stage3: ResBlock(128, 256, stride=2) + ResBlock(256, 256)
        # TODO: stage4: ResBlock(256, 512, stride=2) + ResBlock(512, 512)
        # TODO: global avg pool + Linear(512, num_classes)
        raise NotImplementedError

    def forward(self, x):
        raise NotImplementedError


# ── Data (TODO: fill augmentation + normalisation) ────────────────────────────
CIFAR10_MEAN = (0.4914, 0.4822, 0.4465)
CIFAR10_STD  = (0.2470, 0.2435, 0.2616)

train_transform = transforms.Compose([
    # TODO: RandomCrop(32, padding=4)
    # TODO: RandomHorizontalFlip()
    transforms.ToTensor(),
    transforms.Normalize(CIFAR10_MEAN, CIFAR10_STD),
])
test_transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(CIFAR10_MEAN, CIFAR10_STD),
])

train_ds = datasets.CIFAR10("data", train=True,  download=True, transform=train_transform)
test_ds  = datasets.CIFAR10("data", train=False, download=True, transform=test_transform)
train_loader = DataLoader(train_ds, batch_size=128, shuffle=True,  num_workers=4, pin_memory=True)
test_loader  = DataLoader(test_ds,  batch_size=256, shuffle=False, num_workers=4, pin_memory=True)


# ── Training Loop (TODO: implement) ──────────────────────────────────────────
EPOCHS    = 100
DEVICE    = "cuda" if torch.cuda.is_available() else "mps" if torch.backends.mps.is_available() else "cpu"
model     = ResNet().to(DEVICE)
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=5e-4)
scheduler = torch.optim.lr_scheduler.OneCycleLR(
    optimizer, max_lr=0.1,
    epochs=EPOCHS, steps_per_epoch=len(train_loader),
)
scaler = torch.amp.GradScaler(DEVICE)

def train_one_epoch(epoch: int) -> float:
    model.train()
    total_loss = 0.0
    for imgs, labels in train_loader:
        imgs, labels = imgs.to(DEVICE), labels.to(DEVICE)
        optimizer.zero_grad()
        with torch.amp.autocast(DEVICE):
            # TODO: forward pass + cross-entropy loss
            loss = ...  # type: ignore
        scaler.scale(loss).backward()
        scaler.unscale_(optimizer)
        nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
        scaler.step(optimizer)
        scaler.update()
        scheduler.step()
        total_loss += loss.item()
    return total_loss / len(train_loader)


@torch.no_grad()
def evaluate() -> float:
    model.eval()
    correct = total = 0
    for imgs, labels in test_loader:
        imgs, labels = imgs.to(DEVICE), labels.to(DEVICE)
        preds = model(imgs).argmax(1)
        correct += (preds == labels).sum().item()
        total   += labels.size(0)
    return correct / total
`}</pre>

      {/* Build Steps */}
      <h2 className="text-xl font-bold text-white mb-6">Build Steps</h2>
      <div className="space-y-4 mb-12">
        {STEPS.map((step, idx) => (
          <div key={step.title} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-brand-400/40 font-mono w-8 shrink-0">{idx + 1}</span>
            <div>
              <h3 className="font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pitfalls */}
      <h2 className="text-xl font-bold text-white mb-4">Common Pitfalls</h2>
      <div className="space-y-3 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.title} className="card border-yellow-500/20">
            <p className="text-sm font-semibold text-yellow-400 mb-1">⚠️ {p.title}</p>
            <p className="text-xs text-slate-400">{p.body}</p>
          </div>
        ))}
      </div>

      {/* Hardware Table */}
      <h2 className="text-xl font-bold text-white mb-4">Hardware Comparison</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-xs text-slate-400 border-collapse">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 pr-4 text-slate-300 font-semibold">Hardware</th>
              <th className="text-left py-2 pr-4 text-slate-300 font-semibold">CIFAR-10 (1 run)</th>
              <th className="text-left py-2 pr-4 text-slate-300 font-semibold">Augmentation sweep</th>
              <th className="text-left py-2 text-slate-300 font-semibold">Multi-seed (5×)</th>
            </tr>
          </thead>
          <tbody>
            {HARDWARE_ROWS.map((r) => (
              <tr key={r.hw} className="border-b border-slate-800">
                <td className="py-2 pr-4 text-white font-medium">{r.hw}</td>
                <td className="py-2 pr-4">{r.cifar10}</td>
                <td className="py-2 pr-4">{r.aug_sweep}</td>
                <td className="py-2">{r.multi_seed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Success Criteria */}
      <div className="card">
        <h2 className="font-bold text-white mb-3">Success Criteria</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>✅ Trains to convergence without NaN or divergence</li>
          <li>✅ Validation accuracy ≥ 88% (passes), ≥ 91% (excellent)</li>
          <li>✅ TensorBoard shows loss + accuracy curves for both splits</li>
          <li>✅ TorchScript export passes parity check on 100 random inputs</li>
          <li>⭐ Stretch: Beat the ResNet-18 baseline with a custom architecture change</li>
          <li>⭐ Stretch: Add test-time augmentation (TTA) for +0.5% accuracy</li>
        </ul>
      </div>
    </div>
  );
}
