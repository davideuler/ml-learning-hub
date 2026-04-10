import type { Metadata } from 'next';
import Link from 'next/link';
import { BilingualText } from '@/components/common/BilingualText';

export const metadata: Metadata = {
  title: 'Model Thinking',
  description: 'Bilingual explanations of the model behaviors and tradeoffs AI engineers should understand.',
};

const QUESTIONS = [
  {
    en: { title: 'Why does long context often hurt performance?', body: 'Longer context does not mean uniformly useful context. As sequence length grows, irrelevant tokens, retrieval noise, attention dilution, and optimization mismatch all make the signal weaker. Models also have positional biases and limited effective use of very long history.' },
    zh: { title: '为什么上下文一长性能反而会掉？', body: '上下文更长，并不代表上下文更有用。随着序列变长，无关 token、检索噪声、注意力稀释和训练分布不匹配都会让有效信号变弱。模型本身也存在位置偏置，对超长历史的有效利用能力有限。' },
  },
  {
    en: { title: 'Why can RAG make results worse?', body: 'RAG fails when retrieval quality is poor, chunking is wrong, ranking is weak, or irrelevant evidence crowds out the model’s own knowledge. Retrieval helps only when it improves the information available to the model, not when it adds noise faster than it adds truth.' },
    zh: { title: '为什么 RAG 有时反而更差？', body: '当检索质量差、切块策略不对、排序弱，或者无关证据把模型原有知识挤掉时，RAG 就会变差。检索只有在真正提高信息质量时才有帮助，如果加噪音的速度比加事实的速度还快，结果就会更糟。' },
  },
  {
    en: { title: 'Why is LoRA sometimes effective and sometimes weak?', body: 'LoRA works best when the base model already contains most of the needed capability and only needs low-rank task adaptation. If the base model is too weak, too misaligned with the task, or target modules are chosen poorly, low-rank updates may not be enough.' },
    zh: { title: '为什么 LoRA 有时有效，有时没用？', body: 'LoRA 最适合 base model 已经具备大部分能力、只需要低秩任务适配的场景。如果 base model 太弱、和任务不匹配，或者 target module 选得不好，低秩更新就可能不够。' },
  },
  {
    en: { title: 'Why do models hallucinate?', body: 'Hallucination happens when the model is forced to continue generation under uncertainty. It predicts plausible-looking text from statistical patterns, not guaranteed truth. Weak grounding, poor retrieval, prompt ambiguity, and overconfident decoding all make hallucination worse.' },
    zh: { title: '为什么模型会 hallucinate？', body: 'hallucination 本质上是模型在不确定条件下被迫继续生成。它产出的往往是“统计上像真的文本”，而不是真正经过验证的事实。grounding 弱、检索差、prompt 模糊和过度自信的解码都会加剧 hallucination。' },
  },
  {
    en: { title: 'Why can tiny temperature changes alter output a lot?', body: 'Temperature changes the sharpness of the token distribution. Near decision boundaries, a small temperature adjustment can dramatically change which token families become likely, especially when many candidates have similar probabilities.' },
    zh: { title: '为什么 temperature 改一点，输出差别会很大？', body: 'temperature 会改变 token 分布的尖锐程度。在决策边界附近，即使是很小的 temperature 变化，也可能显著改变哪些 token 家族变得更可能，尤其当多个候选 token 概率接近时。' },
  },
  {
    en: { title: 'Why can quantization reduce quality?', body: 'Quantization trades numerical precision for memory and speed. That helps throughput, but it can distort activations, attention scores, and logits, especially in sensitive layers. The effect depends on bit width, calibration, and which components are quantized.' },
    zh: { title: '为什么量化后质量会掉？', body: '量化是用数值精度换显存和速度。这样确实能提升吞吐，但也可能扭曲 activation、attention 分数和 logits，尤其在敏感层上更明显。影响程度取决于 bit 宽度、校准方法和量化到哪些组件。' },
  },
  {
    en: { title: 'Why do long context and KV cache become a cost bottleneck?', body: 'Autoregressive decoding stores past keys and values for every generated token. As context length and concurrent users grow, KV cache memory explodes. This can saturate GPU memory before compute is fully used, making serving cost far more painful than people expect.' },
    zh: { title: '为什么长上下文和 KV cache 会卡住系统成本？', body: '自回归解码会为每个已生成 token 存储历史 key 和 value。随着上下文长度和并发用户增长，KV cache 会迅速膨胀。很多时候 GPU 显存在算力被吃满之前就先被打爆，导致 serving 成本比想象中更痛。' },
  },
  {
    en: { title: 'Pretrain vs finetune vs post-train', body: 'Pretraining builds broad general capability from massive corpora. Fine-tuning adapts that capability to a narrower task or domain. Post-training improves behavior after pretraining, often through instruction tuning, preference optimization, safety shaping, or tool-use alignment.' },
    zh: { title: 'pretrain、finetune、post-train 的区别', body: 'pretraining 是在海量语料上建立广泛通用能力；fine-tuning 是把这些能力适配到更窄的任务或领域；post-training 则是在预训练之后继续改善行为，常见形式包括指令微调、偏好优化、安全对齐和工具使用对齐。' },
  },
  {
    en: { title: 'Why does tokenization affect system ability?', body: 'Tokenization decides how text is segmented before the model sees it. This changes sequence length, multilingual efficiency, code handling, rare term representation, and effective context usage. A tokenizer is not preprocessing trivia, it shapes the model’s operating interface to language.' },
    zh: { title: 'tokenization 为什么会影响系统能力？', body: 'tokenization 决定文本在进入模型前如何被切分。它会影响序列长度、多语言效率、代码处理、稀有术语表示和上下文利用率。tokenizer 不是无关紧要的预处理，而是在塑造模型接触语言的操作接口。' },
  },
  {
    en: { title: 'What is the real cost of context length?', body: 'Longer context increases compute, memory, latency, cache size, and often retrieval complexity. It also changes batching efficiency. The true cost is not just the input token bill, it is a full systems cost across training and serving.' },
    zh: { title: 'context length 的真实代价是什么？', body: '更长上下文会提高计算、显存、延迟、cache 大小，甚至还会增加检索复杂度，也会改变 batching 效率。它的真实代价不只是输入 token 费用，而是训练和 serving 全链路上的系统成本。' },
  },
  {
    en: { title: 'What is KV cache?', body: 'KV cache stores attention keys and values from previous tokens so the model does not recompute them during autoregressive decoding. It greatly improves speed, but memory grows with sequence length, layer count, and concurrency.' },
    zh: { title: 'KV cache 是什么？', body: 'KV cache 会缓存先前 token 的 attention key 和 value，让模型在自回归解码时不必重复计算。它能显著提速，但内存占用会随着序列长度、层数和并发量一起增长。' },
  },
  {
    en: { title: 'Why is attention complexity expensive?', body: 'Standard attention compares tokens pairwise, so memory and compute often scale poorly with sequence length. That is why long-context systems need approximations, sparse designs, Flash Attention-style optimizations, or cache-efficient serving tricks.' },
    zh: { title: 'attention complexity 为什么贵？', body: '标准 attention 需要 token 两两比较，所以计算和显存通常会随着序列长度迅速恶化。这也是为什么长上下文系统需要近似方法、稀疏设计、Flash Attention 优化和更节省 cache 的 serving 技巧。' },
  },
  {
    en: { title: 'Why does MoE save compute but add complexity?', body: 'Mixture-of-Experts activates only part of the model per token, which can reduce active compute cost. But routing, load balancing, communication overhead, serving complexity, and expert underutilization make the system much harder to train and deploy.' },
    zh: { title: 'MoE 为什么省算力但更复杂？', body: 'MoE 会让每个 token 只激活部分专家，因此能减少有效计算成本。但路由、负载均衡、通信开销、服务复杂度和专家利用率问题，会让训练和部署系统都难很多。' },
  },
  {
    en: { title: 'Why can LoRA save memory?', body: 'LoRA freezes most base-model weights and trains only small low-rank adapters. That reduces trainable parameter count, optimizer state size, and update memory. The tradeoff is that adaptation capacity is constrained by the low-rank structure.' },
    zh: { title: 'LoRA 为什么能省显存？', body: 'LoRA 会冻结大部分 base model 权重，只训练小规模低秩 adapter。这会降低可训练参数量、优化器状态大小和更新内存。代价是适配能力被低秩结构限制住了。' },
  },
  {
    en: { title: 'Diffusion vs autoregressive vs encoder-decoder', body: 'Autoregressive models generate token by token and dominate text generation. Encoder-decoder models excel in conditional mapping tasks like translation and summarization. Diffusion models iteratively denoise and are especially strong in image, video, and some multimodal generation settings.' },
    zh: { title: 'diffusion / autoregressive / encoder-decoder 的差异', body: 'autoregressive 模型按 token 逐步生成，是文本生成的主流；encoder-decoder 模型擅长翻译、摘要这类条件映射任务；diffusion 模型通过逐步去噪生成，在图像、视频和部分多模态生成场景里尤其强。' },
  },
  {
    en: { title: 'Retrieval vs parametric memory', body: 'Parametric memory is what the model stores in weights. Retrieval gives the model external information at inference time. Retrieval is fresher and more controllable, but noisier and more system-dependent. Parametric memory is faster at runtime, but harder to update precisely.' },
    zh: { title: 'retrieval 和 parametric memory 的边界', body: 'parametric memory 指模型权重里内化的知识；retrieval 则是在推理时给模型补充外部信息。retrieval 更新更灵活、可控性更强，但更依赖系统质量，也更容易引入噪声；parametric memory 运行时更快，但很难精确更新。' },
  },
];

export default function ModelThinkingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8">
        <Link href="/" className="hover:text-[var(--text-primary)]"><BilingualText en="Home" zh="首页" /></Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--text-primary)]"><BilingualText en="Model Thinking" zh="模型判断力" /></span>
      </nav>

      <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
        <BilingualText en="Model Behaviors and System Tradeoffs" zh="模型行为与系统取舍" />
      </h1>
      <p className="text-[var(--text-muted)] mb-10 max-w-3xl">
        <BilingualText
          en="Strong AI engineers do not just use models. They understand the recurring failure modes, tradeoffs, and hidden system costs behind them."
          zh="强的 AI 工程师不只是会调用模型，而是理解模型背后反复出现的失败模式、取舍逻辑和隐藏系统成本。"
        />
      </p>

      <div className="space-y-4">
        {QUESTIONS.map((item) => (
          <div key={item.en.title} className="card">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3"><BilingualText en={item.en.title} zh={item.zh.title} /></h2>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed"><BilingualText en={item.en.body} zh={item.zh.body} /></p>
          </div>
        ))}
      </div>
    </div>
  );
}
