import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PyTorch Foundations',
  description: 'Learn PyTorch from tensors to full training pipelines — with mathematical foundations, common pitfalls, and 10 hands-on modules.',
};

const MODULES = [
  {
    id: 1,
    title: 'Tensor Fundamentals',
    desc: 'Creation, indexing, slicing, broadcasting, dtype/device management. Every DL operation bottoms out here — master this and everything else clicks into place.',
  },
  {
    id: 2,
    title: 'Autograd & Backpropagation',
    desc: 'Computational graph construction, .backward() mechanics, gradient accumulation, detaching nodes. You will trace a gradient manually before trusting the engine.',
  },
  {
    id: 3,
    title: 'Building Models (nn.Module)',
    desc: 'Layer registration, forward() design, parameter inspection with named_parameters(), custom layers, module composition patterns.',
  },
  {
    id: 4,
    title: 'Optimizers & Loss Functions',
    desc: 'SGD with momentum, Adam and AdamW, learning rate schedules, CrossEntropyLoss vs NLLLoss, MSE, Huber — when to use each and why it matters.',
  },
  {
    id: 5,
    title: 'Data Pipeline',
    desc: 'Dataset and IterableDataset, DataLoader, transforms and Compose, custom collate_fn, prefetching, pin_memory — building a bottleneck-free pipeline.',
  },
  {
    id: 6,
    title: 'Training Loop Patterns',
    desc: 'Validation loop, checkpoint saving/loading, early stopping, TensorBoard integration, reproducibility with seed management.',
  },
  {
    id: 7,
    title: 'GPU Acceleration',
    desc: 'CUDA tensors, .to(device), device-agnostic code patterns, profiling GPU utilisation with torch.profiler, identifying CPU-GPU transfer bottlenecks.',
  },
  {
    id: 8,
    title: 'Convolutional Networks in Depth',
    desc: 'Conv2d mechanics, receptive field calculation, batch norm, residual connections, building ResNet from scratch — every architectural decision explained.',
  },
  {
    id: 9,
    title: 'Mixed Precision & torch.compile',
    desc: 'AMP with autocast, GradScaler mechanics, bfloat16 vs float16 tradeoffs, torch.compile modes (default, reduce-overhead, max-autotune), warmup behaviour.',
  },
  {
    id: 10,
    title: 'Experiment Tracking',
    desc: 'Weights & Biases setup, logging scalars/histograms/images, run sweeps, TensorBoard as an alternative, writing model cards for reproducibility.',
    isCapstone: true,
  },
];

const MATH_BLOCKS = [
  {
    title: 'Tensors as N-dimensional Arrays',
    content: [
      'A tensor is a generalisation of scalars (rank 0), vectors (rank 1), and matrices (rank 2) to arbitrary rank. Every PyTorch operation maps to a linear algebra primitive.',
      'Key attributes: shape (the size along each dimension), dtype (float32 by default), and device (cpu or cuda:N).',
      '  x = torch.randn(N, C, H, W)   # shape: (batch, channels, height, width)',
      'Broadcasting: tensors with compatible shapes are automatically expanded. Shape (N, 1) + (1, M) → (N, M). The rule: dimensions are aligned right, and any dim of size 1 can broadcast to match the other tensor.',
      '  # Matrix multiply: (B, M, K) @ (B, K, N) → (B, M, N)',
      '  out = torch.bmm(A, B)   # batched matmul — the core of attention',
    ],
  },
  {
    title: 'Autograd: Reverse-Mode Automatic Differentiation',
    content: [
      'When requires_grad=True, PyTorch records every operation into a directed acyclic computational graph. .backward() traverses it in reverse, applying the chain rule at each node.',
      'For a scalar loss L and parameters θ = {W₁, b₁, W₂, b₂, ...}:',
      '  dL/dWᵢ = dL/dz_{i+1} · dz_{i+1}/dWᵢ   (chain rule at layer i)',
      'This is reverse-mode AD (backpropagation). It computes all partial derivatives ∂L/∂θ in a single backward pass — O(1) backward passes regardless of the number of parameters.',
      '  loss.backward()        # populates .grad for every leaf with requires_grad=True',
      '  w.grad                 # ∂L/∂w — use this to update w',
      'Leaf nodes are user-created tensors (e.g., model parameters). Non-leaf nodes are intermediate results. Calling .detach() removes a tensor from the graph, stopping gradient flow.',
    ],
  },
  {
    title: 'Gradient Descent: θ ← θ − α∇L(θ)',
    content: [
      'The gradient ∇L(θ) points in the direction of steepest ascent of the loss. We move opposite to it at learning rate α:',
      '  θ_{t+1} = θ_t − α · ∇_{θ_t} L(θ_t)',
      'Convergence condition for smooth convex L: α < 2/L_smooth, where L_smooth is the Lipschitz constant of the gradient. In practice, tune α empirically — too large causes divergence, too small causes slow convergence.',
      'SGD with momentum accumulates a velocity vector v for faster convergence in narrow valleys:',
      '  v_{t+1} = β·v_t + ∇L(θ_t)',
      '  θ_{t+1} = θ_t − α·v_{t+1}    (β = 0.9 is standard)',
      'Adam adaptively scales α per-parameter using first (m) and second (v) moment estimates of the gradient. This is why it usually needs less tuning than SGD.',
    ],
  },
  {
    title: 'Cross-Entropy Loss: Maximum Likelihood Estimation',
    content: [
      'For C-class classification, the cross-entropy loss between true distribution y (one-hot) and predicted softmax probabilities ŷ is:',
      '  L = −∑ᵢ yᵢ · log(ŷᵢ) = −log(ŷ_{true_class})',
      'Why cross-entropy? Minimising it is equivalent to maximising the log-likelihood of the true labels under the model — i.e., MLE. The model learns to assign high probability to the correct class.',
      'PyTorch combines log_softmax and NLLLoss into one stable operation:',
      '  criterion = nn.CrossEntropyLoss()        # expects raw logits, NOT softmax',
      '  loss = criterion(logits, targets)        # logits: (N,C), targets: (N,) int',
      'Numerical stability: computing log(softmax(x)) naively can overflow. PyTorch uses log_softmax internally: log(exp(xᵢ)/∑exp(xⱼ)) = xᵢ − log(∑exp(xⱼ)).',
    ],
  },
  {
    title: 'Convolution: Output Size and Receptive Fields',
    content: [
      'A 2D convolution of input W×H with kernel K×K, padding P, and stride S produces output of size:',
      '  W_out = ⌊(W − K + 2P) / S⌋ + 1',
      'For K=3, P=1, S=1: W_out = W (same-padding). For K=3, P=0, S=2: W_out = ⌊(W−3)/2⌋+1 (strided downsample).',
      'Receptive field of a unit in layer l (all K=3, S=1, P=1):',
      '  RF_l = RF_{l-1} + 2   → RF grows by 2 per layer',
      '  After 5 layers: RF = 11×11   After 10 layers: RF = 21×21',
      'This is why deep networks can model large spatial patterns efficiently — each layer enlarges the receptive field without increasing kernel size.',
      '  conv = nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3, padding=1)',
      '  # in: (N, 3, H, W)  →  out: (N, 64, H, W)   (same spatial size)',
    ],
  },
  {
    title: 'Batch Normalisation',
    content: [
      'For a mini-batch B = {x₁, ..., xₘ}, batch norm computes per-feature statistics:',
      '  μ_B = (1/m) ∑ xᵢ       σ²_B = (1/m) ∑ (xᵢ − μ_B)²',
      'Then normalises and scales with learnable parameters γ (scale) and β (shift):',
      '  x̂ᵢ = (xᵢ − μ_B) / √(σ²_B + ε)       (ε = 1e-5, avoids division by zero)',
      '  yᵢ = γ · x̂ᵢ + β',
      'Why it helps: keeps activations from drifting across layers (covariate shift), allows higher learning rates, acts as mild regulariser. γ and β are learned — the network can choose to undo normalisation if needed.',
      'At inference: uses running mean/variance accumulated during training (not batch stats).',
      '  bn = nn.BatchNorm2d(num_features=64)   # one γ,β per channel',
    ],
  },
];

const PITFALLS = [
  {
    icon: '⚠️',
    title: 'Forgetting .zero_grad() before backward',
    body: 'PyTorch accumulates gradients by default. If you skip zero_grad(), each step adds new gradients to the previous ones. Your parameter updates will be wrong and loss will behave erratically. Always call optimizer.zero_grad() at the top of your training step.',
  },
  {
    icon: '⚠️',
    title: 'In-place ops on leaf tensors break autograd',
    body: 'x += 1 (in-place add) modifies the tensor that autograd is tracking, corrupting the computational graph. You get: "a leaf Variable that requires grad has been used in an in-place operation". Use x = x + 1 (out-of-place) instead.',
  },
  {
    icon: '⚠️',
    title: 'Shape mismatch: NCHW vs NHWC',
    body: 'PyTorch is NCHW by default (batch, channels, height, width). NumPy and many image libraries use NHWC. A (256, 256, 3) image from PIL needs torch.permute(2,0,1) or transforms.ToTensor() to become (3, 256, 256). Mismatching this silently produces wrong results.',
  },
  {
    icon: '⚠️',
    title: 'Loss not reducing? Systematic checks',
    body: 'Common culprits: (1) learning rate too high — try 10× smaller; (2) labels are off-by-one — CrossEntropyLoss expects 0-indexed class integers; (3) NaN loss — from log(0) in manual loss or exploding gradients — add gradient clipping; (4) model not in train mode — call model.train() before your loop.',
  },
  {
    icon: '⚠️',
    title: 'DataLoader num_workers > 0 on Windows/macOS',
    body: 'On Windows and macOS, multiprocessing requires the entry point to be protected. Wrap your training script in if __name__ == "__main__": or you\'ll get an infinite process spawn loop. This catches everyone the first time. On Linux it works without the guard.',
  },
  {
    icon: '⚠️',
    title: '.numpy() fails on CUDA tensors',
    body: 'tensor.numpy() requires the tensor to be on CPU and not require gradients. On a CUDA tensor you get: "can\'t convert cuda:0 device type tensor to numpy". Fix: tensor.cpu().detach().numpy(). Detach removes the gradient tracking; cpu() moves to host RAM.',
  },
];

export default function PyTorchFoundationsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/courses" className="hover:text-slate-300">Courses</Link>
        <span className="mx-2">/</span>
        <span className="text-white">PyTorch Foundations</span>
      </nav>

      <div className="flex items-start gap-4 mb-6">
        <span className="text-5xl">🔥</span>
        <div>
          <span className="badge badge-blue mb-2">Beginner</span>
          <h1 className="text-4xl font-extrabold text-white">PyTorch Foundations</h1>
        </div>
      </div>

      <p className="text-slate-400 text-lg mb-4 max-w-2xl">
        Start with tensors, end with a production-ready training pipeline. Every concept
        maps directly to code you will write and run. Math is shown before code — not hidden behind it.
      </p>

      <div className="flex gap-6 text-sm text-slate-500 mb-12">
        <span>⏱ ~28 hours</span>
        <span>📦 10 modules</span>
        <span>🐍 Python 3.10+, PyTorch 2.x</span>
      </div>

      {/* Prerequisites */}
      <div className="card mb-10">
        <h2 className="font-semibold text-white mb-2">Prerequisites</h2>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>▸ Comfortable with Python (OOP, list comprehensions, type hints)</li>
          <li>▸ NumPy basics — arrays, vectorized ops, broadcasting</li>
          <li>▸ High-school calculus — what a derivative is, chain rule conceptually</li>
          <li>▸ Basic linear algebra — matrix multiplication, dot products (intuition is enough)</li>
        </ul>
      </div>

      {/* Math Foundations */}
      <h2 className="text-2xl font-bold text-white mb-2">Mathematical Foundations</h2>
      <p className="text-slate-400 text-sm mb-6 max-w-2xl">
        Every equation below is used directly in code in the corresponding module.
        This section exists so notation is never a surprise — return here whenever something
        in a module feels abstract.
      </p>

      <div className="space-y-4 mb-12">
        {MATH_BLOCKS.map((block) => (
          <div key={block.title} className="card">
            <h3 className="font-semibold text-white mb-3">{block.title}</h3>
            <div className="space-y-2">
              {block.content.map((line, i) => (
                line.startsWith('  ') ? (
                  <pre key={i} className="text-sm font-mono text-brand-300 bg-blue-950/30 rounded px-3 py-2 overflow-x-auto">
                    {line.trim()}
                  </pre>
                ) : (
                  <p key={i} className="text-sm text-slate-400">{line}</p>
                )
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Common Pitfalls */}
      <h2 className="text-2xl font-bold text-white mb-6">Common Pitfalls</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.title} className="card border-yellow-500/20">
            <div className="flex items-center gap-2 mb-1">
              <span>{p.icon}</span>
              <h3 className="font-semibold text-white text-sm">{p.title}</h3>
            </div>
            <p className="text-xs text-slate-400">{p.body}</p>
          </div>
        ))}
      </div>

      {/* Modules */}
      <h2 className="text-2xl font-bold text-white mb-6">Course Modules</h2>
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

      {/* Module 9 detail — Mixed Precision */}
      <div className="card mt-6 mb-4">
        <h3 className="font-semibold text-white mb-3">Module 09 Deep Dive: Mixed Precision & torch.compile</h3>
        <pre className="text-xs leading-relaxed mb-3">{`# AMP Training Loop (float16 for CUDA, or bfloat16 on A100/H100)
from torch.cuda.amp import autocast, GradScaler

scaler = GradScaler()    # only needed for float16, not bfloat16

for x, y in train_loader:
    x, y = x.to(device), y.to(device)
    optimizer.zero_grad()

    with autocast(dtype=torch.float16):   # fp16 forward pass
        logits = model(x)
        loss = criterion(logits, y)

    scaler.scale(loss).backward()         # scale to avoid fp16 underflow
    scaler.unscale_(optimizer)            # unscale before clip
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    scaler.step(optimizer)
    scaler.update()

# ---
# torch.compile: ~15-40% speedup after warmup compilation
model = torch.compile(model, mode="default")
# Modes: "default" | "reduce-overhead" (for small batches) | "max-autotune" (RTX 4090+)
# First 2-3 batches are slow — the graph is being traced. Don't benchmark them.`}</pre>
        <p className="text-xs text-slate-500">
          Module 09 covers when to use fp16 vs bfloat16, GradScaler internals (loss scaling factor dynamics),
          and which torch.compile mode to choose for your hardware.
        </p>
      </div>

      {/* Module 10 detail — Experiment Tracking */}
      <div className="card mb-10">
        <h3 className="font-semibold text-white mb-3">Module 10 Deep Dive: Experiment Tracking</h3>
        <pre className="text-xs leading-relaxed mb-3">{`# Weights & Biases — the industry standard for experiment tracking
pip install wandb
wandb login   # paste your API key once

import wandb

wandb.init(
    project="pytorch-foundations-capstone",
    config={
        "learning_rate": 1e-3,
        "batch_size": 128,
        "epochs": 50,
        "architecture": "ResNet18",
    }
)

for epoch in range(config.epochs):
    for x, y in train_loader:
        loss = train_step(x, y)
        wandb.log({
            "train/loss": loss,
            "train/accuracy": acc,
            "learning_rate": scheduler.get_last_lr()[0],
        }, step=global_step)

    # Log validation metrics
    val_acc = evaluate(val_loader)
    wandb.log({"val/accuracy": val_acc}, step=global_step)

    # Log model checkpoint as artifact
    artifact = wandb.Artifact("model-checkpoint", type="model")
    artifact.add_file(f"checkpoints/epoch_{epoch}.pt")
    wandb.log_artifact(artifact)

wandb.finish()

# ---
# TensorBoard alternative (no account needed, local only)
from torch.utils.tensorboard import SummaryWriter
writer = SummaryWriter("runs/experiment_1")
writer.add_scalar("Loss/train", loss, global_step)
writer.add_histogram("gradients/conv1", model.conv1.weight.grad, global_step)
writer.add_images("inputs", x[:8], global_step)  # log sample images`}</pre>
        <p className="text-xs text-slate-500">
          Module 10 also covers writing a model card — a brief document describing your model's training data,
          architecture, evaluation results, and known limitations. Required for any model you share.
        </p>
      </div>

      {/* Capstone CTA */}
      <div className="mt-4 p-6 rounded-2xl"
           style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.10))',
                    border: '1px solid rgba(99,102,241,0.3)' }}>
        <h3 className="text-lg font-bold text-white mb-2">🏁 Capstone Project: CNN Classifier on CIFAR-10</h3>
        <p className="text-slate-400 text-sm mb-4">
          Implement a ResNet-18-style convolutional network from scratch using the math above.
          Train it on CIFAR-10 with AMP, gradient checkpointing, and a cosine LR schedule.
          Log all metrics and model checkpoints to W&B. Profile GPU utilisation with torch.profiler.
          Target: &gt;93% validation accuracy. Export a model card when done.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects/cnn-classifier"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-400
                           text-white text-sm font-semibold transition-colors">
            View Project Guide →
          </Link>
          <Link href="/hardware"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-brand-500/40 hover:border-brand-400
                           text-brand-200 text-sm font-semibold transition-colors">
            Hardware Setup →
          </Link>
        </div>
      </div>
    </div>
  );
}
