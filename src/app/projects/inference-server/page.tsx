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

const PITFALLS = [
  {
    title: 'Loading the model per request',
    body: 'If checkpoint loading happens inside the request path, latency becomes catastrophic and throughput collapses immediately.',
  },
  {
    title: 'No separation between preprocessing and prediction',
    body: 'If tokenization, image transforms, and model inference are all tangled in one endpoint, debugging and benchmarking become painful.',
  },
  {
    title: 'No timeout or batch-size guardrails',
    body: 'Unbounded request size turns a neat demo into a denial-of-service machine. Define limits explicitly in the API contract.',
  },
  {
    title: 'Async FastAPI with blocking GPU code',
    body: 'async def does not magically make GPU inference non-blocking. Think about worker processes, request queues, and realistic concurrency.',
  },
  {
    title: 'No parity check after ONNX export',
    body: 'Export success means nothing if outputs drift. Always compare logits or predictions on a known validation batch.',
  },
  {
    title: 'Observability added too late',
    body: 'If you do not add structured logs and metrics from day one, performance regressions become guesswork instead of engineering.',
  },
];

const HARDWARE_ROWS = [
  { hw: 'Mac M4 Pro 128G', local_dev: '✅ Excellent', gpu_serving: '❌ No', load_test: '⚠️ Light only' },
  { hw: 'RTX 4090', local_dev: '✅ Excellent', gpu_serving: '✅ Best default', load_test: '✅ Good' },
  { hw: 'A100 80GB', local_dev: '✅ Excellent', gpu_serving: '✅ Excellent', load_test: '✅ Best' },
  { hw: '8× L20', local_dev: '⚠️ Overkill', gpu_serving: '✅ Multi-model ready', load_test: '✅ Best for routing tests' },
];

export default function InferenceServerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/projects" className="hover:text-slate-300">Projects</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Inference Server</span>
      </nav>

      <div className="flex items-start gap-4 mb-4">
        <span className="text-5xl">🚀</span>
        <div>
          <div className="flex gap-2 mb-2">
            <span className="badge badge-green">Production</span>
            <span className="badge badge-blue">Intermediate</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">FastAPI Inference Server</h1>
        </div>
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

      <div className="card mb-10">
        <h2 className="font-bold text-white mb-3">What you learn</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>▸ How to turn a notebook model into a real callable service boundary</li>
          <li>▸ How batching, latency, and throughput trade off against each other</li>
          <li>▸ Why model serving is mostly systems design, not just framework syntax</li>
          <li>▸ How ONNX and Docker fit into deployment portability</li>
          <li>▸ How to instrument a service so regressions can be measured instead of guessed</li>
        </ul>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Starter Code: FastAPI Serving Skeleton</h2>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-10 rounded-xl p-4 bg-slate-900 border border-slate-700">{`from contextlib import asynccontextmanager
from fastapi import FastAPI
from pydantic import BaseModel
import torch

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

class PredictRequest(BaseModel):
    texts: list[str]

class PredictResponse(BaseModel):
    predictions: list[int]
    scores: list[float]

def load_model():
    # TODO: replace with your actual model/tokenizer loading logic
    model = torch.jit.load("model.ts", map_location=DEVICE)
    model.eval()
    return model

def preprocess(texts: list[str]) -> torch.Tensor:
    # TODO: tokenize / numericalize / batch pad
    raise NotImplementedError

@torch.no_grad()
def predict_batch(model, texts: list[str]):
    inputs = preprocess(texts).to(DEVICE)
    logits = model(inputs)
    probs = logits.softmax(dim=-1)
    preds = probs.argmax(dim=-1)
    return preds.cpu().tolist(), probs.max(dim=-1).values.cpu().tolist()

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = load_model()
    yield

app = FastAPI(lifespan=lifespan)

@app.get("/health")
def health():
    return {"status": "ok", "device": DEVICE}

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    preds, scores = predict_batch(app.state.model, req.texts)
    return PredictResponse(predictions=preds, scores=scores)`}</pre>

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

      <h2 className="text-xl font-bold text-white mb-4 mt-12">Common Pitfalls</h2>
      <div className="space-y-3 mb-12">
        {PITFALLS.map((p) => (
          <div key={p.title} className="card border-yellow-500/20">
            <p className="text-sm font-semibold text-yellow-400 mb-1">⚠️ {p.title}</p>
            <p className="text-xs text-slate-400">{p.body}</p>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-white mb-4">Hardware Comparison</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-xs text-slate-400 border-collapse">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 pr-4 text-slate-300 font-semibold">Hardware</th>
              <th className="text-left py-2 pr-4 text-slate-300 font-semibold">Local dev</th>
              <th className="text-left py-2 pr-4 text-slate-300 font-semibold">GPU serving</th>
              <th className="text-left py-2 text-slate-300 font-semibold">Load testing</th>
            </tr>
          </thead>
          <tbody>
            {HARDWARE_ROWS.map((r) => (
              <tr key={r.hw} className="border-b border-slate-800">
                <td className="py-2 pr-4 text-white font-medium">{r.hw}</td>
                <td className="py-2 pr-4">{r.local_dev}</td>
                <td className="py-2 pr-4">{r.gpu_serving}</td>
                <td className="py-2">{r.load_test}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2 className="font-bold text-white mb-3">Success Criteria</h2>
        <ul className="text-sm space-y-2 text-slate-400">
          <li>✅ Service boots with model loaded once and health endpoint passes</li>
          <li>✅ Prediction endpoint returns validated structured outputs</li>
          <li>✅ Docker image builds and runs locally with the same API contract</li>
          <li>✅ ONNX or TorchScript export matches PyTorch outputs on a validation batch</li>
          <li>⭐ Stretch: Add request batching queue with latency histogram</li>
          <li>⭐ Stretch: Add Prometheus metrics and load-test report</li>
        </ul>
      </div>
    </div>
  );
}
