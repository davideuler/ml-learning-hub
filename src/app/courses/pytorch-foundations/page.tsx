import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'PyTorch Foundations',
  description: 'Learn PyTorch from tensors to full training pipelines.',
};

const MODULES = [
  { id: 1, title: 'Tensor Fundamentals',         desc: 'Creation, indexing, broadcasting, dtype/device management.' },
  { id: 2, title: 'Autograd & Backpropagation',  desc: 'Computational graph, .backward(), gradient accumulation.' },
  { id: 3, title: 'Building Models (nn.Module)', desc: 'Layers, parameter registration, model inspection.' },
  { id: 4, title: 'Optimizers & Loss Functions', desc: 'SGD, Adam, CrossEntropy, MSE — when and why.' },
  { id: 5, title: 'Data Pipeline',               desc: 'Dataset, DataLoader, transforms, custom collate_fn.' },
  { id: 6, title: 'Training Loop Patterns',      desc: 'Validation, checkpointing, early stopping, TensorBoard.' },
  { id: 7, title: 'GPU Acceleration',            desc: 'CUDA tensors, .to(device), profiling bottlenecks.' },
  { id: 8, title: 'Capstone: CNN Classifier',    desc: 'Build and evaluate a ResNet-style classifier on CIFAR-10.', isCapstone: true },
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
        maps directly to code you will write and run.
      </p>

      <div className="flex gap-6 text-sm text-slate-500 mb-12">
        <span>⏱ ~20 hours</span>
        <span>📦 8 modules</span>
        <span>🐍 Python 3.10+, PyTorch 2.x</span>
      </div>

      {/* Prerequisites */}
      <div className="card mb-10">
        <h2 className="font-semibold text-white mb-2">Prerequisites</h2>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>▸ Comfortable with Python (OOP, list comprehensions, type hints)</li>
          <li>▸ NumPy basics (arrays, vectorized ops)</li>
          <li>▸ High-school calculus (what a derivative is)</li>
        </ul>
      </div>

      {/* Modules */}
      <h2 className="text-2xl font-bold text-white mb-6">Modules</h2>
      <div className="space-y-3">
        {MODULES.map((mod) => (
          <div key={mod.id}
               className={`card flex items-start gap-4 ${mod.isCapstone ? 'border-brand-500/50' : ''}`}>
            <span className={`text-lg font-mono font-bold ${mod.isCapstone ? 'text-brand-400' : 'text-slate-600'}`}>
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

      {/* Capstone CTA */}
      <div className="mt-10 p-6 rounded-2xl"
           style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.10))',
                    border: '1px solid rgba(99,102,241,0.3)' }}>
        <h3 className="text-lg font-bold text-white mb-2">🏁 Capstone Project: CNN Classifier</h3>
        <p className="text-slate-400 text-sm mb-4">
          Implement a ResNet-18-style convolutional network, train it on CIFAR-10, profile GPU utilization,
          and export checkpoints. Target: &gt;90% validation accuracy.
        </p>
        <Link href="/projects/cnn-classifier"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-400
                         text-white text-sm font-semibold transition-colors">
          View Project Guide →
        </Link>
      </div>
    </div>
  );
}
