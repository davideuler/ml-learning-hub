import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Project: FastAPI Inference Server' };

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
        Docker containerisation, and ONNX export for CPU inference. Full guide in v0.2.
      </p>
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
    </div>
  );
}
