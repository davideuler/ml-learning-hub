import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hardware Guide',
  description: 'Machine-specific setup, configuration, and tuning for Mac M4 Pro, RTX 4090, A100, and 8×L40S PyTorch workloads.',
};

const MACHINE_TABLE = [
  {
    name: 'Mac M4 Pro 128GB',
    vram: '128 GB (unified)',
    bandwidth: '273 GB/s',
    fp16tflops: '~14.7 TFLOPS',
    bf16: '✅ (via MPS)',
    useCase: 'Prototyping, fine-tuning ≤13B models',
  },
  {
    name: 'RTX 4090 24GB',
    vram: '24 GB GDDR6X',
    bandwidth: '1,008 GB/s',
    fp16tflops: '82.6 TFLOPS',
    bf16: '✅',
    useCase: 'Local training, RL, fine-tuning ≤7B',
  },
  {
    name: 'A100 80GB',
    vram: '80 GB HBM2e',
    bandwidth: '2,000 GB/s',
    fp16tflops: '312 TFLOPS',
    bf16: '✅ (native, fast)',
    useCase: 'LLM training/fine-tuning, long-context',
  },
  {
    name: '8× L40S (cluster)',
    vram: '48 GB × 8 = 384 GB',
    bandwidth: '864 GB/s × 8',
    fp16tflops: '91.6 × 8 TFLOPS',
    bf16: '✅',
    useCase: 'Large-scale multi-GPU training, FSDP',
  },
];

const CLOUD_PROVIDERS = [
  { name: 'Lambda Labs',    gpus: 'A100, H100, A10',    on_demand: '$1.10–$2.49/hr', spot: 'N/A',          notes: 'Cheapest on-demand A100, simple UI, persistent storage' },
  { name: 'RunPod',         gpus: 'A100, H100, L40S',   on_demand: '$1.49–$3.49/hr', spot: '$0.79–$1.49/hr',notes: 'Good UI, templates, community cloud' },
  { name: 'Vast.ai',        gpus: 'A100, 4090, L40S',   on_demand: 'Varies',         spot: '$0.40–$1.20/hr',notes: 'Cheapest spot, P2P marketplace, verify host reliability' },
  { name: 'CoreWeave',      gpus: 'A100, H100, L40S',   on_demand: '$2.06–$4.25/hr', spot: 'Kubernetes',   notes: 'Kubernetes-native, scales to 1000s of GPUs, enterprise SLAs' },
  { name: 'Google Colab',   gpus: 'T4, A100 (Pro+)',    on_demand: 'Free / $12/mo',  spot: 'N/A',          notes: 'Great for notebooks, session limits, no persistent env' },
];

export default function HardwarePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-white mb-4">Hardware Guide</h1>
      <p className="text-slate-400 text-lg max-w-2xl mb-4">
        Machine-specific setup, tuning, and gotchas for every GPU in our curriculum.
        Stop wasting hours on environment errors — start from a known-working baseline.
      </p>
      <p className="text-sm text-slate-500 mb-12">
        Jump to: {' '}
        <a href="#comparison" className="text-brand-300 hover:underline">Comparison</a> ·{' '}
        <a href="#m4pro" className="text-brand-300 hover:underline">M4 Pro</a> ·{' '}
        <a href="#rtx4090" className="text-brand-300 hover:underline">RTX 4090</a> ·{' '}
        <a href="#a100" className="text-brand-300 hover:underline">A100</a> ·{' '}
        <a href="#l40s" className="text-brand-300 hover:underline">8× L40S</a> ·{' '}
        <a href="#mixed-precision" className="text-brand-300 hover:underline">Mixed Precision</a> ·{' '}
        <a href="#memory-opt" className="text-brand-300 hover:underline">Memory Opt</a> ·{' '}
        <a href="#profiling" className="text-brand-300 hover:underline">Profiling</a>
      </p>

      {/* ── 1. Machine Comparison Table ─────────────────────────────── */}
      <section id="comparison" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white mb-6">Machine Comparison</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]" style={{ background: 'var(--bg-card)' }}>
                {['Machine', 'VRAM', 'Bandwidth', 'FP16 TFLOPS', 'BF16', 'Best Use Case'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-slate-400 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MACHINE_TABLE.map((m, i) => (
                <tr key={m.name}
                    className="border-b border-[var(--border)] hover:bg-white/5 transition-colors"
                    style={{ background: i % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-card)' }}>
                  <td className="px-4 py-3 font-mono font-semibold text-white whitespace-nowrap">{m.name}</td>
                  <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{m.vram}</td>
                  <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{m.bandwidth}</td>
                  <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{m.fp16tflops}</td>
                  <td className="px-4 py-3 text-center">{m.bf16}</td>
                  <td className="px-4 py-3 text-slate-400">{m.useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          * M4 Pro TFLOPS are for the Neural Engine; MPS compute is lower but memory bandwidth advantage is significant.
          L40S uses PCIe interconnect (not NVLink) — see multi-GPU section for implications.
        </p>
      </section>

      {/* ── 2. Mac M4 Pro ───────────────────────────────────────────── */}
      <section id="m4pro" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🍎</span>
          <div>
            <h2 className="text-2xl font-bold text-white">Mac M4 Pro 128GB</h2>
            <p className="text-slate-400 text-sm">Apple Silicon · MPS backend · Unified memory architecture</p>
          </div>
        </div>

        <div className="card mb-4">
          <h3 className="font-semibold text-white mb-1">Why unified memory matters</h3>
          <p className="text-sm text-slate-400">
            Unlike discrete GPUs where VRAM is separate from system RAM, the M4 Pro shares 128 GB
            between CPU and GPU with 273 GB/s bandwidth. A 70B model in 4-bit (≈35 GB) fits in one machine
            and the GPU never stalls waiting for data transfers. No PCIe bottleneck.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3">Environment Setup</h3>
        <pre className="text-xs leading-relaxed mb-4">{`# 1. Install Homebrew (if not present)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install miniforge (Apple-native conda — do NOT use Anaconda on M-series)
brew install miniforge
conda init zsh   # or bash

# 3. Create environment
conda create -n ml python=3.11 -y
conda activate ml

# 4. Install PyTorch nightly (stable 2.x also supports MPS)
pip install torch torchvision torchaudio

# 5. Verify MPS is available
python -c "import torch; print(torch.backends.mps.is_available())"
# → True`}</pre>

        <h3 className="text-lg font-semibold text-white mb-3">PyTorch Configuration</h3>
        <pre className="text-xs leading-relaxed mb-4">{`import torch

# Detect and select device
if torch.backends.mps.is_available():
    device = torch.device("mps")
elif torch.cuda.is_available():
    device = torch.device("cuda")
else:
    device = torch.device("cpu")

print(f"Using device: {device}")

# Move model to MPS
model = MyModel().to(device)

# Move tensors to MPS
x = torch.randn(32, 3, 224, 224).to(device)
y = model(x)  # runs on Metal Performance Shaders`}</pre>

        <h3 className="text-lg font-semibold text-white mb-3">Workloads That Fit</h3>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {[
            ['✅ Recommended', 'Fine-tuning ≤13B models (QLoRA), RL experiments, CNN training, prototyping any architecture, running LLM inference (llama.cpp / MLX)'],
            ['⚠️ Possible', 'Fine-tuning 30B+ models with 4-bit quant, FSDP across unified memory slices (experimental)'],
            ['❌ Avoid', 'Multi-GPU training (no NVLink equivalent), float64 heavy workloads, ops not yet ported to MPS'],
          ].map(([label, desc]) => (
            <div key={label as string} className="card">
              <div className="text-sm font-semibold text-white mb-1">{label}</div>
              <div className="text-xs text-slate-400">{desc}</div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-white mb-3">Performance Tips</h3>
        <pre className="text-xs leading-relaxed mb-4">{`# Use float32 or float16 — float64 not supported on MPS
model = model.to(torch.float16)   # halves memory, usually fine

# Set env var to enable MPS memory growth (avoid OOM on large batches)
import os
os.environ["PYTORCH_MPS_HIGH_WATERMARK_RATIO"] = "0.0"  # 0.0 = unlimited

# For inference, use torch.no_grad() to skip graph construction
with torch.no_grad():
    output = model(input_tensor)

# MLX is often faster than PyTorch MPS for inference-only workloads
# pip install mlx
# Use mlx.core instead of torch for pure inference pipelines`}</pre>

        <div className="card border-yellow-500/20">
          <h3 className="font-semibold text-white mb-2">⚠️ Known Gotchas</h3>
          <ul className="text-sm text-slate-400 space-y-1.5">
            <li>▸ <strong className="text-white">No float64:</strong> Operations requiring float64 silently fall back to CPU. Use <code className="text-brand-300">model.double()</code> only when CPU fallback is acceptable.</li>
            <li>▸ <strong className="text-white">Partial op support:</strong> Some complex ops (certain scatter operations, some sparse tensor ops) fall back to CPU mid-forward-pass. Profile to detect.</li>
            <li>▸ <strong className="text-white">No torch.compile (MPS):</strong> As of PyTorch 2.3, <code className="text-brand-300">torch.compile</code> does not support the MPS backend. Skip it.</li>
            <li>▸ <strong className="text-white">AMP with MPS:</strong> Use <code className="text-brand-300">torch.autocast("mps", dtype=torch.float16)</code> — not the CUDA variant.</li>
            <li>▸ <strong className="text-white">Memory pressure:</strong> MPS shares memory with the OS. Close Chrome/other apps when training large models — you're competing for the same pool.</li>
          </ul>
        </div>
      </section>

      {/* ── 3. RTX 4090 ─────────────────────────────────────────────── */}
      <section id="rtx4090" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">⚡</span>
          <div>
            <h2 className="text-2xl font-bold text-white">RTX 4090 24GB</h2>
            <p className="text-slate-400 text-sm">Ada Lovelace · CUDA 12.x · Best local GPU for the money</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3">Environment Setup</h3>
        <pre className="text-xs leading-relaxed mb-4">{`# Ubuntu 22.04 recommended for RTX 4090

# 1. Install CUDA Toolkit 12.1+ (match your driver version)
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update && sudo apt-get -y install cuda-12-1

# Verify
nvcc --version   # should show 12.1+
nvidia-smi       # should show RTX 4090 with driver 530+

# 2. Create environment
conda create -n ml python=3.11 -y && conda activate ml

# 3. Install PyTorch with CUDA 12.1
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# 4. Install Flash Attention 2 (significant speedup for transformers)
pip install flash-attn --no-build-isolation
# Takes ~10 minutes to compile — this is normal

# Verify CUDA
python -c "import torch; print(torch.cuda.get_device_name(0))"
# → NVIDIA GeForce RTX 4090`}</pre>

        <h3 className="text-lg font-semibold text-white mb-3">PyTorch Configuration</h3>
        <pre className="text-xs leading-relaxed mb-4">{`import torch
from torch.cuda.amp import autocast, GradScaler

device = torch.device("cuda")
model = MyModel().to(device)

# torch.compile with max-autotune (20-40% speedup after warmup)
# First 2-3 batches are slow (compilation) — this is normal
model = torch.compile(model, mode="max-autotune")

# AMP training loop (fp16 on RTX 4090 — NOT bf16, use float16 for Ada)
scaler = GradScaler()

for batch_idx, (x, y) in enumerate(loader):
    x, y = x.to(device), y.to(device)
    optimizer.zero_grad()

    with autocast(dtype=torch.float16):   # fp16 forward
        logits = model(x)
        loss = criterion(logits, y)

    scaler.scale(loss).backward()
    scaler.unscale_(optimizer)
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    scaler.step(optimizer)
    scaler.update()`}</pre>

        <h3 className="text-lg font-semibold text-white mb-3">VRAM Budget Planning</h3>
        <pre className="text-xs leading-relaxed mb-4">{`# Rule of thumb for transformer fine-tuning on RTX 4090 (24 GB):
#   Model params × 4 bytes (fp32 weights)
#   + Model params × 4 bytes (fp32 gradients)
#   + Model params × 8 bytes (Adam states: m + v)
#   + Activations (batch-size-dependent)
#
# Example: 7B model in fp16 full fine-tune
#   Weights:    7e9 × 2 = 14 GB  (fp16)
#   Gradients:  7e9 × 2 = 14 GB  → doesn't fit!
#
# Solution 1: LoRA / QLoRA (only tune ~1% of params)
pip install bitsandbytes peft
# 7B in 4-bit + LoRA ≈ 6 GB — fits easily

# Solution 2: Gradient checkpointing (trades compute for memory)
model.gradient_checkpointing_enable()
# Recomputes activations during backward; ~30% slower but ~60% less VRAM

# Solution 3: Gradient accumulation (simulate larger batches)
accum_steps = 8  # effective batch = batch_size × 8
for i, (x, y) in enumerate(loader):
    with autocast(dtype=torch.float16):
        loss = model(x, labels=y).loss / accum_steps
    scaler.scale(loss).backward()
    if (i + 1) % accum_steps == 0:
        scaler.step(optimizer)
        scaler.update()
        optimizer.zero_grad()`}</pre>

        <h3 className="text-lg font-semibold text-white mb-3">Performance Tips</h3>
        <pre className="text-xs leading-relaxed mb-4">{`# Enable TF32 (default on Ampere+, verify it's on)
torch.backends.cuda.matmul.allow_tf32 = True
torch.backends.cudnn.allow_tf32 = True

# Use Flash Attention 2 in your transformer
from flash_attn import flash_attn_qkvpacked_func
# Or if using HuggingFace:
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    attn_implementation="flash_attention_2",
    torch_dtype=torch.float16,
    device_map="auto"
)

# Increase DataLoader workers (saturate GPU)
loader = DataLoader(dataset, num_workers=8, pin_memory=True, prefetch_factor=2)

# Monitor VRAM in real-time
watch -n 0.5 nvidia-smi --query-gpu=memory.used,memory.free,utilization.gpu --format=csv`}</pre>

        <div className="card border-yellow-500/20">
          <h3 className="font-semibold text-white mb-2">⚠️ Known Gotchas</h3>
          <ul className="text-sm text-slate-400 space-y-1.5">
            <li>▸ <strong className="text-white">Use float16, NOT bfloat16:</strong> Ada Lovelace supports both, but fp16 tensor cores are faster. bfloat16 is preferred on A100/H100.</li>
            <li>▸ <strong className="text-white">torch.compile warmup:</strong> First few forward passes are slow (compilation). Don't benchmark before step ~5.</li>
            <li>▸ <strong className="text-white">Flash Attention requires contiguous memory:</strong> Ensure Q/K/V tensors are contiguous before passing to flash_attn.</li>
            <li>▸ <strong className="text-white">CUDA OOM is not always VRAM:</strong> Sometimes it's fragmentation. Try <code className="text-brand-300">torch.cuda.empty_cache()</code> between runs in a notebook.</li>
            <li>▸ <strong className="text-white">nvcc mismatch:</strong> PyTorch CUDA version must match the installed toolkit for custom CUDA extensions (like flash-attn).</li>
          </ul>
        </div>
      </section>

      {/* ── 4. A100 80GB ────────────────────────────────────────────── */}
      <section id="a100" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">☁️</span>
          <div>
            <h2 className="text-2xl font-bold text-white">A100 80GB (Cloud)</h2>
            <p className="text-slate-400 text-sm">Ampere · HBM2e · Native BF16 · Lambda Labs / RunPod</p>
          </div>
        </div>

        <div className="card mb-4">
          <h3 className="font-semibold text-white mb-1">A100 vs H100 — when does it matter?</h3>
          <p className="text-sm text-slate-400">
            H100 SXM is 3× faster for FP8 training and has NVLink 4.0 (900 GB/s vs 600 GB/s).
            But at ~2× the price, A100 80G is the workhorse for most LLM fine-tuning jobs.
            Choose H100 only when you're training 70B+ from scratch or need maximum throughput.
            For fine-tuning &lt;70B, A100 80G is usually the right call economically.
          </p>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3">Cloud Setup (Lambda Labs)</h3>
        <pre className="text-xs leading-relaxed mb-4">{`# Lambda Labs: https://lambdalabs.com/service/gpu-cloud
# Select: A100 80G SXM — ~$1.10/hr on-demand as of 2025

# SSH into instance
ssh ubuntu@<your-instance-ip>

# Lambda images come with CUDA 12.x and PyTorch pre-installed
# Verify:
python -c "import torch; print(torch.__version__, torch.cuda.get_device_name(0))"
# → 2.x.x  NVIDIA A100-SXM4-80GB

# If starting fresh:
conda create -n ml python=3.11 -y && conda activate ml
pip install torch --index-url https://download.pytorch.org/whl/cu121
pip install flash-attn --no-build-isolation  # 5-10 min compile

# RunPod alternative: use the "RunPod PyTorch" template
# It ships with torch pre-compiled, saving 10-15 minutes on launch`}</pre>

        <h3 className="text-lg font-semibold text-white mb-3">PyTorch Configuration — Use BF16, Not FP16</h3>
        <pre className="text-xs leading-relaxed mb-4">{`import torch

device = torch.device("cuda")
model = MyModel().to(device)

# A100 has native bfloat16 hardware support
# bfloat16 = same dynamic range as float32, lower precision (8-bit mantissa)
# This means: no GradScaler needed! bfloat16 doesn't overflow like fp16.

# BF16 training loop — simpler than FP16 AMP
model = model.to(torch.bfloat16)

for x, y in loader:
    x = x.to(device, dtype=torch.bfloat16)
    y = y.to(device)
    optimizer.zero_grad()

    with torch.autocast("cuda", dtype=torch.bfloat16):
        loss = model(x, labels=y).loss

    loss.backward()   # No GradScaler needed with bfloat16
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    optimizer.step()

# TF32 is enabled by default on A100 — verify
print(torch.backends.cuda.matmul.allow_tf32)  # → True
# TF32 uses 10-bit mantissa for matmul, full 8-bit exponent — ~10% speedup`}</pre>

        <h3 className="text-lg font-semibold text-white mb-3">Workload Sizing (80GB VRAM)</h3>
        <pre className="text-xs leading-relaxed mb-4">{`# What fits in 80GB for fine-tuning:
#
# Full fine-tune (bf16):
#   13B model → ~104 GB (needs ZeRO-3 or FSDP — marginally too large solo)
#   7B model  →  ~56 GB ✅ fits with 24GB headroom for activations
#
# QLoRA / 4-bit quantized:
#   70B model → ~35 GB ✅ fits!
#   Llama 3 70B + bitsandbytes 4-bit + LoRA → typical: 42-48 GB total
#
# Batch size rule of thumb for 7B fine-tune:
#   Activations per token ≈ 2 × n_layers × hidden_dim × 2 bytes (bf16)
#   For Llama-7B: 2 × 32 × 4096 × 2 ≈ 0.5 MB/token
#   Sequence length 2048, batch 8 → 8 GB activations
#   → Comfortable at batch=8, seq=2048 with gradient checkpointing OFF

from transformers import AutoModelForCausalLM, BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.bfloat16,  # compute in bf16
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
)
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3-70b-hf",
    quantization_config=bnb_config,
    device_map="auto"
)`}</pre>

        <div className="card border-yellow-500/20">
          <h3 className="font-semibold text-white mb-2">⚠️ Known Gotchas</h3>
          <ul className="text-sm text-slate-400 space-y-1.5">
            <li>▸ <strong className="text-white">Don't use FP16 GradScaler on A100:</strong> BF16 doesn't overflow so the scaler is unnecessary and adds complexity.</li>
            <li>▸ <strong className="text-white">Lambda Labs billing:</strong> You're billed from instance start, not when you SSH in. Terminate (don't just stop) instances you're not using.</li>
            <li>▸ <strong className="text-white">Persistent storage is separate:</strong> Instance disk is ephemeral on Lambda. Use Persistent Storage ($0.20/GB/mo) for checkpoints.</li>
            <li>▸ <strong className="text-white">A100 PCIe vs SXM:</strong> A100-PCIe has 400 GB/s bandwidth; A100-SXM has 2 TB/s. For multi-GPU, always prefer SXM variants — significant impact on gradient sync.</li>
          </ul>
        </div>
      </section>

      {/* ── 5. 8× L40S Multi-GPU ────────────────────────────────────── */}
      <section id="l40s" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🖥️</span>
          <div>
            <h2 className="text-2xl font-bold text-white">8× L40S Multi-GPU Cluster</h2>
            <p className="text-slate-400 text-sm">Ada Lovelace · 48GB × 8 · PCIe interconnect · FSDP/DDP</p>
          </div>
        </div>

        <div className="card border-yellow-500/20 mb-6">
          <h3 className="font-semibold text-white mb-2">⚠️ Critical: L40S Uses PCIe, Not NVLink</h3>
          <p className="text-sm text-slate-400">
            Unlike A100/H100 SXM which use NVLink (600–900 GB/s GPU-to-GPU), the L40S uses PCIe 4.0
            for inter-GPU communication (~64 GB/s bidirectional). This is ~10× less bandwidth. For
            large gradient tensors, this means all-reduce can become the bottleneck. Design your
            training to minimise communication (FSDP, gradient accumulation, larger micro-batches).
          </p>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3">DDP vs FSDP Decision Guide</h3>
        <div className="overflow-x-auto rounded-xl border border-[var(--border)] mb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]" style={{ background: 'var(--bg-card)' }}>
                {['', 'DDP', 'FSDP'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-slate-400 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Model fits on 1 GPU?', '✅ Use DDP', '✅ Still works, but adds overhead'],
                ['Model > 1 GPU VRAM?', '❌ OOM', '✅ Required (shards params across GPUs)'],
                ['Communication cost', 'Lower (only gradients)', 'Higher (params + grads + optim states)'],
                ['Code complexity', 'Simple — 5 lines', 'More config, but HuggingFace Trainer handles it'],
                ['Best for L40S PCIe?', 'Yes, when model fits', 'Yes, with reduce-scatter to minimize comms'],
              ].map(([label, ddp, fsdp], i) => (
                <tr key={i}
                    className="border-b border-[var(--border)]"
                    style={{ background: i % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-card)' }}>
                  <td className="px-4 py-3 text-slate-300 font-medium">{label}</td>
                  <td className="px-4 py-3 text-slate-400">{ddp}</td>
                  <td className="px-4 py-3 text-slate-400">{fsdp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-white mb-3">DDP Setup</h3>
        <pre className="text-xs leading-relaxed mb-4">{`# Launch with torchrun (replaces torch.distributed.launch)
torchrun --nproc_per_node=8 --nnodes=1 train.py

# train.py
import torch
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
from torch.utils.data.distributed import DistributedSampler

dist.init_process_group(backend="nccl")  # NCCL is fastest for GPU-to-GPU
rank = dist.get_rank()                   # 0–7
local_rank = int(os.environ["LOCAL_RANK"])
world_size = dist.get_world_size()       # 8

torch.cuda.set_device(local_rank)
device = torch.device(f"cuda:{local_rank}")

model = MyModel().to(device)
model = DDP(model, device_ids=[local_rank])

# DistributedSampler ensures each GPU sees different data
sampler = DistributedSampler(dataset, num_replicas=world_size, rank=rank)
loader  = DataLoader(dataset, sampler=sampler, batch_size=32, num_workers=4)

# Don't forget to set sampler epoch each epoch
for epoch in range(num_epochs):
    sampler.set_epoch(epoch)   # ensures shuffling differs per epoch
    for x, y in loader:
        ...

dist.destroy_process_group()`}</pre>

        <h3 className="text-lg font-semibold text-white mb-3">FSDP Setup (for 70B+ models)</h3>
        <pre className="text-xs leading-relaxed mb-4">{`from torch.distributed.fsdp import FullyShardedDataParallel as FSDP
from torch.distributed.fsdp.fully_sharded_data_parallel import (
    CPUOffload, BackwardPrefetch, MixedPrecision
)
from torch.distributed.fsdp.wrap import transformer_auto_wrap_policy
from transformers.models.llama.modeling_llama import LlamaDecoderLayer

# FSDP shards parameters, gradients, and optimizer states across GPUs
# With 8× L40S (48GB each = 384GB total), you can fit a 70B model:
#   70B × 2 bytes (bf16) = 140 GB
#   + optimizer states (AdamW): 70B × 8 bytes = 560 GB
#   → Too large for one GPU, FSDP distributes it

fsdp_config = dict(
    auto_wrap_policy=transformer_auto_wrap_policy(
        transformer_layer_cls={LlamaDecoderLayer}
    ),
    mixed_precision=MixedPrecision(
        param_dtype=torch.bfloat16,
        reduce_dtype=torch.bfloat16,
        buffer_dtype=torch.bfloat16,
    ),
    backward_prefetch=BackwardPrefetch.BACKWARD_PRE,  # overlap comms
    cpu_offload=CPUOffload(offload_params=False),     # True if OOM persists
)
model = FSDP(model, **fsdp_config)`}</pre>

        <h3 className="text-lg font-semibold text-white mb-3">NCCL Tuning for PCIe Topology</h3>
        <pre className="text-xs leading-relaxed mb-4">{`# L40S on PCIe: tune NCCL to avoid redundant copies
export NCCL_P2P_DISABLE=0         # keep P2P enabled if NVLink exists
export NCCL_IB_DISABLE=1          # no InfiniBand on typical cloud
export NCCL_SOCKET_IFNAME=eth0    # use primary network interface
export NCCL_DEBUG=WARN            # INFO is verbose; use only for debugging
export NCCL_ALGO=Ring             # Ring all-reduce suits PCIe topology
export NCCL_BUFFSIZE=16777216     # 16MB NCCL buffer (default is 4MB)

# Per-GPU memory budget math for 8× L40S:
#   Total pool: 8 × 48 GB = 384 GB
#   For 70B model in bf16:
#     Parameters: 70B × 2 = 140 GB → 140/8 = 17.5 GB/GPU
#     Gradients:  70B × 2 = 140 GB → 17.5 GB/GPU
#     Adam m,v:   70B × 8 = 560 GB → 70 GB/GPU  ← bottleneck
#   Total: 105 GB/GPU → DOES NOT FIT with standard Adam
#   → Use 8-bit Adam (bitsandbytes) or Adafactor (no v state = halved mem)
pip install bitsandbytes
import bitsandbytes as bnb
optimizer = bnb.optim.AdamW8bit(model.parameters(), lr=2e-5)`}</pre>

        <div className="card border-yellow-500/20">
          <h3 className="font-semibold text-white mb-2">⚠️ Known Gotchas</h3>
          <ul className="text-sm text-slate-400 space-y-1.5">
            <li>▸ <strong className="text-white">L40S ≠ NVLink:</strong> Never assume NVLink on L40S. PCIe means all-reduce is ~10× slower per-byte. Gradient accumulation (16+ steps) is your friend.</li>
            <li>▸ <strong className="text-white">Gradient sync overhead:</strong> With large models, gradient all-reduce can take 30-50% of step time. Use <code className="text-brand-300">model.no_sync()</code> context during accumulation steps.</li>
            <li>▸ <strong className="text-white">FSDP checkpoint saving:</strong> Must use <code className="text-brand-300">FULL_STATE_DICT</code> policy to save a consolidated checkpoint — otherwise you get 8 shards.</li>
            <li>▸ <strong className="text-white">torchrun vs old launch:</strong> Always use <code className="text-brand-300">torchrun</code>. The old <code className="text-brand-300">-m torch.distributed.launch</code> is deprecated since PyTorch 1.9.</li>
          </ul>
        </div>
      </section>

      {/* ── 6. Mixed Precision Guide ─────────────────────────────────── */}
      <section id="mixed-precision" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white mb-6">Mixed Precision Guide</h2>

        <div className="card mb-6">
          <h3 className="font-semibold text-white mb-3">Decision Tree: Which Precision?</h3>
          <div className="space-y-2 text-sm text-slate-400">
            <p>1. <strong className="text-white">On A100/H100?</strong> → Use <code className="text-brand-300">bfloat16</code>. No GradScaler, better dynamic range, same speed.</p>
            <p>2. <strong className="text-white">On RTX 4090 / consumer GPU?</strong> → Use <code className="text-brand-300">float16</code> with GradScaler. Better tensor core utilisation than bf16 on Ada.</p>
            <p>3. <strong className="text-white">On M4 Pro MPS?</strong> → Use <code className="text-brand-300">float16</code> with <code className="text-brand-300">torch.autocast("mps")</code>. No GradScaler needed for most workloads.</p>
            <p>4. <strong className="text-white">Training instability / NaN loss?</strong> → First try GradScaler if using fp16. If still unstable, switch to bf16 — its wider exponent range is more numerically stable.</p>
            <p>5. <strong className="text-white">Inference only?</strong> → Use <code className="text-brand-300">torch.no_grad()</code> + fp16 or bf16. No scaler needed ever for inference.</p>
          </div>
        </div>

        <pre className="text-xs leading-relaxed mb-4">{`# FP16 training (RTX 4090, consumer GPUs)
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()
for x, y in loader:
    optimizer.zero_grad()
    with autocast(dtype=torch.float16):
        loss = model(x, labels=y).loss
    scaler.scale(loss).backward()
    scaler.unscale_(optimizer)
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    scaler.step(optimizer)
    scaler.update()

# ---

# BF16 training (A100, H100 — simpler, no scaler)
for x, y in loader:
    optimizer.zero_grad()
    with torch.autocast("cuda", dtype=torch.bfloat16):
        loss = model(x, labels=y).loss
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    optimizer.step()`}</pre>
      </section>

      {/* ── 7. Memory Optimization ──────────────────────────────────── */}
      <section id="memory-opt" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white mb-6">Memory Optimization Techniques</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Gradient Checkpointing</h3>
            <p className="text-sm text-slate-400 mb-3">
              Instead of storing all activations during the forward pass (needed for backward),
              recompute them on-the-fly during backward. Reduces activation memory by ~60%
              at the cost of ~33% longer backward pass (one extra forward per layer).
            </p>
            <pre className="text-xs leading-relaxed">{`# PyTorch native
model.gradient_checkpointing_enable()

# HuggingFace — same thing
model = AutoModelForCausalLM.from_pretrained(
    "...", use_cache=False  # must disable KV-cache when checkpointing
)
model.gradient_checkpointing_enable()

# Verify memory savings:
# Without: 7B model training ≈ 80 GB (activations dominate at long seqlens)
# With: 7B model training ≈ 32 GB (activations recomputed per layer)`}</pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Gradient Accumulation Math</h3>
            <p className="text-sm text-slate-400 mb-3">
              Simulate a larger effective batch without materialising all gradients at once.
            </p>
            <pre className="text-xs leading-relaxed">{`# Effective batch size = micro_batch_size × accumulation_steps × num_gpus
# Example: micro_batch=4, accum=8, gpus=8 → effective batch = 256

accum_steps = 8
optimizer.zero_grad()

for step, (x, y) in enumerate(loader):
    # Scale loss to average across accumulation steps
    with autocast(dtype=torch.bfloat16):
        loss = model(x, labels=y).loss / accum_steps
    loss.backward()

    if (step + 1) % accum_steps == 0:
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        scheduler.step()
        optimizer.zero_grad()

# With DDP: use no_sync() to skip gradient sync on intermediate steps
for step, (x, y) in enumerate(loader):
    is_sync_step = (step + 1) % accum_steps == 0
    ctx = contextlib.nullcontext() if is_sync_step else model.no_sync()
    with ctx:
        loss = model(x, labels=y).loss / accum_steps
        loss.backward()`}</pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">CPU Offloading</h3>
            <pre className="text-xs leading-relaxed">{`# ZeRO-3 with CPU offload via DeepSpeed
# Moves optimizer states + parameters to CPU RAM when not in use
# Enables fitting models that don't fit in GPU VRAM at all

pip install deepspeed

# ds_config.json
{
  "zero_optimization": {
    "stage": 3,
    "offload_optimizer": { "device": "cpu", "pin_memory": true },
    "offload_param": { "device": "cpu", "pin_memory": true }
  },
  "bf16": { "enabled": true }
}

# 70B model on single A100 80GB with ZeRO-3 + CPU offload is feasible
# (slow, but possible for inference/small batch fine-tuning)`}</pre>
          </div>
        </div>
      </section>

      {/* ── 8. Profiling Tools ──────────────────────────────────────── */}
      <section id="profiling" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white mb-6">Profiling Tools</h2>

        <div className="space-y-4">
          {[
            {
              tool: 'torch.profiler',
              desc: 'Built-in profiler. Generates Chrome trace JSON for kernel-level analysis.',
              code: `from torch.profiler import profile, record_function, ProfilerActivity

with profile(
    activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
    on_trace_ready=torch.profiler.tensorboard_trace_handler('./log/profiler'),
    record_shapes=True, with_stack=True
) as prof:
    for step, (x, y) in enumerate(loader):
        with record_function("forward"):
            loss = model(x, labels=y).loss
        with record_function("backward"):
            loss.backward()
        if step >= 5: break  # profile a few steps, not the whole run

# Open Chrome → chrome://tracing → load ./log/profiler/*.json`,
            },
            {
              tool: 'nvidia-smi',
              desc: 'Quick VRAM and GPU utilisation monitoring.',
              code: `# Continuous monitoring every 0.5s
watch -n 0.5 nvidia-smi --query-gpu=name,utilization.gpu,memory.used,memory.free,temperature.gpu --format=csv,noheader

# Log to file for post-training analysis
nvidia-smi dmon -s u -d 1 > gpu_stats.txt`,
            },
            {
              tool: 'torch.cuda.memory_summary()',
              desc: 'Detailed breakdown of CUDA memory allocation.',
              code: `# After an OOM or suspicious memory usage:
print(torch.cuda.memory_summary(device=0))
# Shows: allocated, reserved, peak, fragmentation info

# Track peak memory
torch.cuda.reset_peak_memory_stats()
# ... run your training step ...
peak = torch.cuda.max_memory_allocated() / 1e9
print(f"Peak VRAM: {peak:.2f} GB")`,
            },
            {
              tool: 'Weights & Biases',
              desc: 'Log system metrics alongside training metrics automatically.',
              code: `import wandb
wandb.init(project="my-training-run")

# Log GPU stats every N steps (wandb.agent does this automatically)
wandb.log({
    "loss": loss.item(),
    "gpu_memory_gb": torch.cuda.memory_allocated() / 1e9,
    "learning_rate": scheduler.get_last_lr()[0],
}, step=global_step)`,
            },
          ].map(({ tool, desc, code }) => (
            <div key={tool} className="card">
              <div className="flex items-start gap-3 mb-3">
                <code className="text-brand-300 text-sm font-mono shrink-0">{tool}</code>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
              <pre className="text-xs leading-relaxed">{code}</pre>
            </div>
          ))}
        </div>
      </section>

      {/* ── 9. Cloud Provider Comparison ────────────────────────────── */}
      <section id="cloud" className="mb-8 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white mb-6">Cloud Provider Comparison</h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)]" style={{ background: 'var(--bg-card)' }}>
                {['Provider', 'GPUs Available', 'On-Demand', 'Spot', 'Notes'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-slate-400 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CLOUD_PROVIDERS.map((p, i) => (
                <tr key={p.name}
                    className="border-b border-[var(--border)] hover:bg-white/5 transition-colors"
                    style={{ background: i % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-card)' }}>
                  <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">{p.name}</td>
                  <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{p.gpus}</td>
                  <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{p.on_demand}</td>
                  <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{p.spot}</td>
                  <td className="px-4 py-3 text-slate-400">{p.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Prices as of 2025 — verify current rates before committing to long runs.
          Always set a budget alert. An 8×A100 left running overnight is ~$200.
        </p>
      </section>
    </div>
  );
}
