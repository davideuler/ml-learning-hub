import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Project: FastAPI Inference Server' };

const STEPS = [
  {
    title: 'Wrap the model cleanly',
    body: 'Load checkpoints once at process startup, separate preprocessing from inference, and expose a pure predict() function before you add any API layer.',
  },
  {
    title: 'Design the API contract',
    body: 'Create /health, /predict, and /metrics endpoints, validate payloads with Pydantic, and define clear batch and timeout limits.',
  },
  {
    title: 'Optimise throughput',
    body: 'Add async request collection, dynamic batching, autocast where appropriate, and optional ONNX export for CPU-friendly deployments.',
  },
  {
    title: 'Containerise and observe',
    body: 'Use a multi-stage Docker build, add structured logging, Prometheus metrics, and a simple load-test script so the service can be benchmarked.',
  },
];

export default function InferenceServerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/projects" className="hover:text-slate-300">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Inference Server</span>
      </nav>
      <span className="text-5xl">🚀</span>
      <h1 className="text-3xl font-extrabold text-white mt-4 mb-4">FastAPI Inference Server</h1>
      <div className="flex gap-2 mb-6">
        <span className="badge badge-green">Production</span>
        <span className="badge badge-blue">Intermediate</span>
      </div>
      <p className="text-slate-400 mb-8">
        Package a trained PyTorch model into a production-ready FastAPI service with dynamic batching,
        Docker containerisation, and ONNX export for CPU inference. This is the bridge from model training to something an actual product team can ship.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          { k: 'Framework', v: 'FastAPI' },
          { k: 'Focus', v: 'Serving' },
          { k: 'Time', v: '6–8 hrs' },
          { k: 'Hardware', v: 'Any' },
        ].map(({ k, v }) => (
          <div key={k} className="card text-center py-3">
            <div className="text-sm text-slate-500">{k}</div>
            <div className="font-bold text-white mt-1">{v}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h2 className="font-bold text-white mb-3">Stack</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>▸ FastAPI + uvicorn async server</li>
          <li>▸ Dynamic batching with asyncio.Queue</li>
          <li>▸ ONNX export + onnxruntime-gpu</li>
          <li>▸ Docker multi-stage build (cuda base → slim)</li>
          <li>▸ /health, /predict, /metrics endpoints</li>
        </ul>
      </div>
      <div className="space-y-4 mt-8">
        {STEPS.map((step, idx) => (
          <div key={step.title} className="card flex gap-4">
            <span className="text-2xl font-extrabold text-green-400/40 font-mono w-8 shrink-0">{idx + 1}</span>
            <div>
              <h3 className="font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 card border-green-500/30">
        <h2 className="font-bold text-white mb-3">Hardware guidance</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>▸ <strong className="text-white">Mac M4 Pro 128G:</strong> Perfect for local development and CPU inference demos.</li>
          <li>▸ <strong className="text-white">RTX 4090:</strong> Best when serving medium-sized PyTorch models with GPU batching.</li>
          <li>▸ <strong className="text-white">A100:</strong> Ideal for high-throughput serving or benchmarking larger transformer backends.</li>
          <li>▸ <strong className="text-white">8x L20:</strong> Useful for multi-model serving or route-by-model production setups.</li>
        </ul>
      </div>
    </div>
  );
}
