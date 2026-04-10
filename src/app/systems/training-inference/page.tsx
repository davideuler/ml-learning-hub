import type { Metadata } from 'next';
import Link from 'next/link';
import { BilingualText } from '@/components/common/BilingualText';

export const metadata: Metadata = {
  title: 'Training and Inference Systems',
  description: 'Bilingual overview of core technologies for model training and inference optimization.',
};

const TOPICS = [
  {
    en: { title: 'PyTorch', body: 'PyTorch is still the default execution layer for modern model training. You need to understand tensors, autograd, nn.Module composition, dataloaders, checkpointing, and distributed wrappers. Even when higher-level frameworks appear, serious debugging still drops you back into raw PyTorch.' },
    zh: { title: 'PyTorch', body: 'PyTorch 仍然是现代模型训练的默认执行层。你需要真正理解 tensor、autograd、nn.Module 组织方式、dataloader、checkpoint 和分布式封装。即使上层框架再高级，真正调试时还是会回到原生 PyTorch。' },
  },
  {
    en: { title: 'Distributed training', body: 'Once models or datasets grow, single-device training stops being enough. You need to understand data parallelism, tensor parallelism, pipeline parallelism, gradient synchronization cost, checkpoint sharding, and fault recovery. Distributed training is not just “more GPUs”, it is systems engineering under bandwidth constraints.' },
    zh: { title: '分布式训练', body: '当模型或数据规模继续变大，单卡训练就不够了。你需要理解数据并行、张量并行、流水线并行、梯度同步成本、分片 checkpoint 与故障恢复。分布式训练不是“多几张卡”这么简单，而是在带宽约束下做系统工程。' },
  },
  {
    en: { title: 'Mixed precision', body: 'Mixed precision cuts memory usage and increases throughput, but only if you understand numerical stability. You should know fp16, bf16, loss scaling, gradient overflow, accumulation precision, and when fp32 fallback is necessary.' },
    zh: { title: '混合精度', body: '混合精度能显著降低显存占用并提升吞吐，但前提是你理解数值稳定性。需要懂 fp16、bf16、loss scaling、梯度溢出、累积精度，以及什么时候必须回退到 fp32。' },
  },
  {
    en: { title: 'LoRA / PEFT / fine-tuning', body: 'Most real teams do not pretrain from scratch, they adapt existing models. You need to understand full fine-tuning versus PEFT, rank selection, target modules, optimizer state cost, and why a base model that is mismatched to the task can make LoRA look worse than it really is.' },
    zh: { title: 'LoRA / PEFT / 微调', body: '现实中的大多数团队并不会从零预训练，而是适配已有模型。你需要理解完整微调和 PEFT 的区别、rank 选择、target module、优化器状态成本，以及为什么 base model 与任务不匹配时会让 LoRA 看起来“失效”。' },
  },
  {
    en: { title: 'Inference optimization', body: 'Inference is where product reality hits model ambition. Throughput, latency, prompt length, batching strategy, quantization, memory reuse, and cache policy all matter. Training gets headlines, but inference cost determines whether a product survives.' },
    zh: { title: '推理优化', body: '推理阶段是产品现实和模型野心真正相撞的地方。吞吐、延迟、prompt 长度、batching 策略、量化、内存复用和 cache 策略都很关键。训练更吸引眼球，但推理成本往往决定产品能不能活下来。' },
  },
  {
    en: { title: 'vLLM / tensor parallel / KV cache', body: 'Modern serving stacks like vLLM exist because naive autoregressive inference wastes memory and leaves GPUs underutilized. You need to understand paged attention, tensor-parallel layout, KV cache growth, and why long-context serving can become a memory bottleneck before it becomes a compute bottleneck.' },
    zh: { title: 'vLLM / 张量并行 / KV cache', body: '像 vLLM 这样的现代推理栈之所以重要，是因为朴素的自回归推理会浪费大量内存，并让 GPU 利用率很差。你需要理解 paged attention、tensor parallel 布局、KV cache 增长机制，以及为什么长上下文服务常常先撞上内存瓶颈，而不是算力瓶颈。' },
  },
  {
    en: { title: 'Batching and serving', body: 'Serving is not just “host the model”. You need dynamic batching, queue control, timeout strategy, concurrency limits, admission control, and fallback behavior. A good serving system protects latency while preserving GPU utilization.' },
    zh: { title: 'Batching 与 Serving', body: '服务部署不只是“把模型挂起来”。你需要动态 batching、队列控制、超时策略、并发限制、准入控制和 fallback 行为。好的 serving 系统要在保护延迟的同时维持 GPU 利用率。' },
  },
  {
    en: { title: 'Profiling', body: 'If you do not profile, you are guessing. You should be able to inspect kernel time, dataloader stalls, host-device transfer overhead, memory peaks, layer hotspots, and token-per-second throughput. Profiling converts hand-wavy intuition into actual optimization work.' },
    zh: { title: '性能分析（Profiling）', body: '如果你不做 profiling，本质上就是在猜。你应该能检查 kernel 时间、dataloader 卡顿、主机到设备传输开销、显存峰值、层级热点，以及每秒 token 吞吐。profiling 会把模糊直觉变成真正可执行的优化工作。' },
  },
  {
    en: { title: 'GPU memory management', body: 'Modern AI engineering is often memory engineering. You need to reason about activations, optimizer states, gradients, checkpoints, KV cache, fragmentation, sequence length, micro-batches, and memory offloading. A lot of “model scaling” is just learning how not to run out of VRAM.' },
    zh: { title: 'GPU 显存管理', body: '现代 AI 工程很多时候本质上就是显存工程。你需要能推理 activation、优化器状态、梯度、checkpoint、KV cache、碎片化、序列长度、micro-batch 和内存 offloading。很多所谓“模型扩展”，其实只是学会如何不把显存打爆。' },
  },
];

export default function TrainingInferencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--text-primary)]"><BilingualText en="Home" zh="首页" /></Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]"><BilingualText en="Training & Inference" zh="训练与推理" /></span>
      </nav>

      <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
        <BilingualText en="Training and Inference Optimization" zh="模型训练与推理优化" />
      </h1>
      <p className="text-[var(--text-muted)] mb-10 max-w-3xl">
        <BilingualText
          en="This page maps the core engineering stack behind modern model training and inference systems. The goal is not buzzword familiarity. The goal is operational judgment."
          zh="这个页面梳理现代模型训练与推理系统背后的核心工程栈。目标不是认识几个流行词，而是建立真正的工程判断力。"
        />
      </p>

      <div className="space-y-4">
        {TOPICS.map((topic) => (
          <div key={topic.en.title} className="card">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3"><BilingualText en={topic.en.title} zh={topic.zh.title} /></h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed"><BilingualText en={topic.en.body} zh={topic.zh.body} /></p>
          </div>
        ))}
      </div>
    </div>
  );
}
