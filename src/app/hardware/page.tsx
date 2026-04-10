import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hardware Guide',
  description: 'GPU selection, cloud vs local, mixed precision, and profiling for PyTorch workloads.',
};

const GPUS = [
  { name: 'RTX 4060',  vram: '8 GB',  price: '$300',  verdict: '🟡 Entry', useCase: 'CIFAR, small LMs' },
  { name: 'RTX 4090',  vram: '24 GB', price: '$1,600', verdict: '🟢 Best/$ local', useCase: 'Most fine-tunes, RL' },
  { name: 'A100 40G',  vram: '40 GB', price: 'Cloud',  verdict: '🟢 Pro', useCase: 'LLM pre-training' },
  { name: 'H100 SXM',  vram: '80 GB', price: 'Cloud',  verdict: '⭐ Fastest', useCase: 'Full model training' },
  { name: 'RTX 3090',  vram: '24 GB', price: '~$700 used', verdict: '🟢 Value', useCase: 'Most DL tasks' },
];

const CLOUD = [
  { name: 'Lambda Labs', note: 'Cheapest A100/H100, no-fuss setup', href: 'https://lambdalabs.com' },
  { name: 'Vast.ai',     note: 'Spot market, cheapest for short runs',href: 'https://vast.ai' },
  { name: 'RunPod',      note: 'Good UI, persistent storage',         href: 'https://runpod.io' },
  { name: 'Google Colab',note: 'Free T4, great for notebooks',        href: 'https://colab.research.google.com' },
];

export default function HardwarePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-white mb-4">Hardware Guide</h1>
      <p className="text-slate-400 text-lg max-w-2xl mb-12">
        Practical advice on GPU selection, cloud vs. local, and squeezing maximum efficiency
        from your PyTorch workloads.
      </p>

      {/* GPU table */}
      <section id="gpus" className="mb-14 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white mb-6">GPU Comparison</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]" style={{ background: 'var(--bg-card)' }}>
                {['GPU', 'VRAM', 'Price', 'Verdict', 'Best For'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-slate-400 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GPUS.map((g, i) => (
                <tr key={g.name}
                    className="border-b border-[var(--border)] hover:bg-white/5 transition-colors"
                    style={{ background: i % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-card)' }}>
                  <td className="px-4 py-3 font-mono font-semibold text-white">{g.name}</td>
                  <td className="px-4 py-3 text-slate-300">{g.vram}</td>
                  <td className="px-4 py-3 text-slate-300">{g.price}</td>
                  <td className="px-4 py-3">{g.verdict}</td>
                  <td className="px-4 py-3 text-slate-400">{g.useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cloud */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">Cloud Providers</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {CLOUD.map((c) => (
            <a key={c.name} href={c.href} target="_blank" rel="noopener noreferrer"
               className="card hover:no-underline group">
              <div className="font-bold text-white group-hover:text-brand-300 transition-colors">
                {c.name} ↗
              </div>
              <div className="text-sm text-slate-400 mt-1">{c.note}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Mixed precision */}
      <section id="mixed-precision" className="mb-14 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white mb-4">Mixed Precision (AMP)</h2>
        <p className="text-slate-400 text-sm mb-4">
          Enable <code className="text-brand-300">torch.cuda.amp</code> to get ~2× training
          speed and halve VRAM usage with minimal code change:
        </p>
        <pre className="text-xs leading-relaxed">{`from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()

for batch in loader:
    optimizer.zero_grad()
    with autocast():          # fp16 forward pass
        loss = model(batch)
    scaler.scale(loss).backward()
    scaler.unscale_(optimizer)
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    scaler.step(optimizer)
    scaler.update()`}</pre>
      </section>

      {/* Distributed */}
      <section id="distributed" className="mb-14 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white mb-4">Distributed Training (DDP)</h2>
        <p className="text-slate-400 text-sm mb-4">
          PyTorch <code className="text-brand-300">DistributedDataParallel</code> is the
          standard way to scale across multiple GPUs on one machine:
        </p>
        <pre className="text-xs leading-relaxed">{`# Launch with: torchrun --nproc_per_node=NUM_GPUS train.py
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP

dist.init_process_group(backend='nccl')
rank = dist.get_rank()
torch.cuda.set_device(rank)

model = MyModel().cuda(rank)
model = DDP(model, device_ids=[rank])

# Use DistributedSampler for DataLoader
sampler = DistributedSampler(dataset)
loader  = DataLoader(dataset, sampler=sampler, batch_size=64)`}</pre>
      </section>

      {/* Profiling */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Profiling</h2>
        <div className="space-y-3">
          {[
            ['torch.profiler', 'Built-in — generates Chrome trace JSON. Find GPU idle time and kernel launches.'],
            ['nvidia-smi',     'Quick: watch -n 0.5 nvidia-smi  — check GPU utilisation & VRAM.'],
            ['W&B / TensorBoard', 'Log system metrics (GPU %, VRAM, temp) automatically alongside training metrics.'],
            ['nvtx markers',  'Add torch.cuda.nvtx.range_push/pop around your hotspots for NSight profiling.'],
          ].map(([t, d]) => (
            <div key={t as string} className="card flex gap-4">
              <code className="text-brand-300 text-sm shrink-0">{t}</code>
              <span className="text-slate-400 text-sm">{d}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
