import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Project: FastAPI Inference Server' };

const STEPS = [
  { title: 'Wrap the model cleanly / 干净封装模型', body: 'Load checkpoints once at startup, isolate preprocessing, and expose a pure inference function before building the API layer. / 在启动时一次性加载 checkpoint，隔离预处理逻辑，并在接入 API 层前先得到纯粹的 inference 函数。' },
  { title: 'Design the API contract / 设计接口契约', body: 'Define /health, /predict, and input validation with explicit timeout and batch-size assumptions. / 定义 /health、/predict 和输入校验，并明确 timeout 与 batch-size 假设。' },
  { title: 'Optimize throughput / 优化吞吐', body: 'Use batching, async request collection, and mixed precision where appropriate. / 在合适场景下使用 batching、异步请求收集和混合精度。' },
  { title: 'Observe and test / 监控与测试', body: 'Add structured logs, Prometheus metrics, and simple load tests before calling it production-ready. / 加入结构化日志、Prometheus 指标和基础压测，再谈生产可用。' },
] as const;

const REFERENCES = [
  { label: 'FastAPI docs', href: 'https://fastapi.tiangolo.com/' },
  { label: 'vLLM docs', href: 'https://docs.vllm.ai/' },
  { label: 'Prometheus docs', href: 'https://prometheus.io/docs/introduction/overview/' },
  { label: 'Pydantic docs', href: 'https://docs.pydantic.dev/latest/' },
];

export default function InferenceServerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8"><Link href="/projects" className="hover:text-[var(--text-primary)]">Projects</Link><span className="mx-2">/</span><span className="text-[var(--text-primary)]">Inference Server</span></nav>
      <div className="flex items-start gap-4 mb-4"><span className="text-5xl">⚡</span><div><div className="flex gap-2 mb-2"><span className="badge badge-purple">Serving</span><span className="badge badge-green">Intermediate</span></div><h1 className="text-3xl font-extrabold text-[var(--text-primary)]">FastAPI Inference Server / FastAPI 推理服务</h1></div></div>
      <p className="text-[var(--text-muted)] mb-8">A model is not useful in production until it is wrapped in a stable API, observed with metrics, and optimized for latency and throughput. <br />一个模型在生产环境中要真正有用，必须被包装成稳定 API，带监控指标，并对延迟和吞吐做过优化。</p>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">What you learn / 你会学到什么</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>▸ Model lifecycle design / 模型生命周期设计</li><li>▸ Input validation and API schema / 输入校验与 API schema</li><li>▸ Throughput vs latency tradeoffs / 吞吐与延迟权衡</li><li>▸ Observability and production debugging / 可观测性与生产调试</li></ul></div>
      <pre className="text-xs leading-relaxed overflow-x-auto mb-8 rounded-xl p-4">{`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class PredictRequest(BaseModel):
    text: str

@app.post("/predict")
def predict(req: PredictRequest):
    x = preprocess(req.text)
    y = model_infer(x)
    return postprocess(y)`}</pre>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Code walkthrough / 代码要点解释</h2><div className="space-y-4 text-sm text-[var(--text-muted)]"><p><span className="font-semibold text-[var(--text-primary)]">Separation of concerns / 职责分离：</span> request validation, preprocessing, model inference, and postprocessing should stay independent so you can profile and replace each layer separately. / 请求校验、预处理、模型推理和后处理应该彼此独立，这样才能分别做 profiling 和替换。</p><p><span className="font-semibold text-[var(--text-primary)]">Serving is a systems problem / serving 本质上是系统问题：</span> model quality alone does not guarantee user experience. Queueing, batching, timeouts, and observability matter just as much. / 模型质量本身并不能保证用户体验，队列、batching、timeout 和可观测性同样关键。</p></div></div>
      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">Build Steps / 构建步骤</h2><div className="space-y-3 mb-8">{STEPS.map((s) => <div key={s.title} className="card"><h3 className="font-semibold text-[var(--text-primary)]">{s.title}</h3><p className="text-sm text-[var(--text-muted)] mt-1">{s.body}</p></div>)}</div>
      <div className="card mb-8"><h2 className="font-bold text-[var(--text-primary)] mb-3">Success Criteria / 完成标准</h2><ul className="text-sm space-y-2 text-[var(--text-muted)]"><li>✅ /health and /predict endpoints work / /health 与 /predict 可用</li><li>✅ Latency is measured under load / 能在压测下测量延迟</li><li>✅ At least one throughput optimization is demonstrated / 至少展示一种吞吐优化手段</li></ul></div>
      <div className="card"><h2 className="font-bold text-[var(--text-primary)] mb-3">References / 参考资料</h2><ul className="space-y-2 text-sm">{REFERENCES.map((r) => <li key={r.href}><a href={r.href} target="_blank" rel="noreferrer" className="text-brand-300 hover:text-brand-200">{r.label}</a></li>)}</ul></div>
    </div>
  );
}
