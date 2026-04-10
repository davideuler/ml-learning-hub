import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Project: FastAPI Inference Server' };

const REFERENCES = [
  { label: 'FastAPI docs', href: 'https://fastapi.tiangolo.com/' },
  { label: 'vLLM docs', href: 'https://docs.vllm.ai/' },
  { label: 'Prometheus docs', href: 'https://prometheus.io/docs/introduction/overview/' },
];

export default function InferenceServerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8"><Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link><span className="mx-2">/</span><span className="text-[var(--text-primary)]">Inference Server</span></nav>
      <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-4">FastAPI Inference Server / FastAPI 推理服务</h1>
      <p className="text-[var(--text-muted)] mb-8">A model is not useful in production until it is wrapped in a stable API, observed with metrics, and optimized for latency and throughput. <br />一个模型在生产环境中要真正有用，必须被包装成稳定 API，带监控指标，并对延迟和吞吐做过优化。</p>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">What you learn / 你会学到什么</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>▸ Clean model loading lifecycle / 干净的模型加载生命周期</li><li>▸ API schema and payload validation / API schema 与 payload 校验</li><li>▸ Batching, latency, throughput tradeoffs / batching、延迟与吞吐权衡</li><li>▸ Observability and production debugging / 可观测性与生产调试</li></ul></div>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-8 rounded-xl p-4">{`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PredictRequest(BaseModel):
    text: str

@app.post("/predict")
def predict(req: PredictRequest):
    return {"output": model_infer(req.text)}`}</pre>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Code walkthrough / 代码要点解释</h2><p className="text-sm text-[var(--text-muted)]">The important idea is separation of concerns: request validation, preprocessing, model inference, and postprocessing should not be tangled together. That makes profiling and scaling much easier. <br />核心思想是职责分离，请求校验、预处理、模型推理和后处理不要搅在一起，这样 profiling 和扩容才会容易很多。</p></div>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Success Criteria / 完成标准</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>✅ /health and /predict endpoints work / /health 与 /predict 接口可用</li><li>✅ Load testing produces stable latency metrics / 压测后能得到稳定延迟指标</li><li>✅ Basic batching or throughput optimization is demonstrated / 展示基础 batching 或吞吐优化</li></ul></div>
      <div className="card"><h2 className="font-bold text-[var(--text-primary)] mb-3">References / 参考资料</h2><ul className="space-y-2 text-sm">{REFERENCES.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-brand-200">{r.label}</a></li>)}</ul></div>
    </div>
  );
}
