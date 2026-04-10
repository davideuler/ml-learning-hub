'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useSitePreferences } from '@/components/providers/SiteProviders';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Hands-on ML projects: CNN classifiers, Mini-GPT, BERT, DQN, PPO, Tianshou, and inference systems.',
};

const PROJECTS = [
  {
    slug: 'cnn-classifier',
    icon: '🖼️',
    badge: 'badge-blue',
    track: { en: 'PyTorch', zh: 'PyTorch' },
    difficulty: { en: 'Beginner', zh: '入门' },
    time: { en: '4–6 hrs', zh: '4–6 小时' },
    title: { en: 'CNN Image Classifier', zh: 'CNN 图像分类器' },
    desc: {
      en: 'Build a ResNet-18-style CNN from scratch, train on CIFAR-10, and target >90% accuracy.',
      zh: '从零构建 ResNet-18 风格 CNN，在 CIFAR-10 上训练，并把精度做到 90% 以上。',
    },
    tags: { en: ['CNN', 'Transfer Learning', 'CIFAR-10'], zh: ['CNN', '迁移学习', 'CIFAR-10'] },
  },
  {
    slug: 'mini-gpt',
    icon: '📝',
    badge: 'badge-purple',
    track: { en: 'Transformers', zh: 'Transformer' },
    difficulty: { en: 'Intermediate', zh: '进阶' },
    time: { en: '8–12 hrs', zh: '8–12 小时' },
    title: { en: 'Mini-GPT (Shakespeare)', zh: 'Mini-GPT（莎士比亚）' },
    desc: {
      en: 'Character-level GPT with causal attention and sampling. Trains on a single GPU in about 20 minutes.',
      zh: '带 causal attention 和采样的字符级 GPT，单卡大约 20 分钟即可训练。',
    },
    tags: { en: ['GPT', 'Attention', 'LM'], zh: ['GPT', '注意力', '语言模型'] },
  },
  {
    slug: 'bert-finetune',
    icon: '🔍',
    badge: 'badge-purple',
    track: { en: 'Transformers', zh: 'Transformer' },
    difficulty: { en: 'Intermediate', zh: '进阶' },
    time: { en: '4–6 hrs', zh: '4–6 小时' },
    title: { en: 'BERT Sentiment Fine-tune', zh: 'BERT 情感分类微调' },
    desc: {
      en: 'Fine-tune BERT on SST-2 using Hugging Face Trainer, with an optional LoRA branch included.',
      zh: '使用 Hugging Face Trainer 在 SST-2 上微调 BERT，并包含可选的 LoRA 分支。',
    },
    tags: { en: ['BERT', 'Fine-tuning', 'NLP', 'LoRA'], zh: ['BERT', '微调', 'NLP', 'LoRA'] },
  },
  {
    slug: 'dqn-pong',
    icon: '🏓',
    badge: 'badge-orange',
    track: { en: 'RL', zh: '强化学习' },
    difficulty: { en: 'Intermediate', zh: '进阶' },
    time: { en: '10–14 hrs', zh: '10–14 小时' },
    title: { en: 'DQN Atari Pong', zh: 'DQN Atari Pong' },
    desc: {
      en: 'Full DQN with replay buffer and target network. Train an agent to beat the Pong opponent.',
      zh: '完整实现带 replay buffer 和 target network 的 DQN，训练智能体打赢 Pong 对手。',
    },
    tags: { en: ['DQN', 'Atari', 'CNN'], zh: ['DQN', 'Atari', 'CNN'] },
  },
  {
    slug: 'ppo-mujoco',
    icon: '🦾',
    badge: 'badge-orange',
    track: { en: 'RL', zh: '强化学习' },
    difficulty: { en: 'Advanced', zh: '高级' },
    time: { en: '12–18 hrs', zh: '12–18 小时' },
    title: { en: 'PPO MuJoCo HalfCheetah', zh: 'PPO MuJoCo HalfCheetah' },
    desc: {
      en: 'Implement PPO + GAE and train a HalfCheetah-v4 agent with logging and video recording.',
      zh: '实现 PPO + GAE，训练 HalfCheetah-v4 智能体，并加入日志与视频记录。',
    },
    tags: { en: ['PPO', 'MuJoCo', 'Actor-Critic'], zh: ['PPO', 'MuJoCo', 'Actor-Critic'] },
  },
  {
    slug: 'tianshou-cartpole',
    icon: '🧰',
    badge: 'badge-orange',
    track: { en: 'RL', zh: '强化学习' },
    difficulty: { en: 'Intermediate', zh: '进阶' },
    time: { en: '6–8 hrs', zh: '6–8 小时' },
    title: { en: 'Tianshou CartPole Pipeline', zh: 'Tianshou CartPole 流水线' },
    desc: {
      en: 'Use Tianshou to build a reusable RL training pipeline with collectors, replay buffers, and trainers.',
      zh: '使用 Tianshou 构建可复用的 RL 训练流水线，包含 collector、replay buffer 和 trainer。',
    },
    tags: { en: ['Tianshou', 'CartPole', 'RL Library'], zh: ['Tianshou', 'CartPole', 'RL 库'] },
  },
  {
    slug: 'inference-server',
    icon: '🚀',
    badge: 'badge-green',
    track: { en: 'Production', zh: '生产化' },
    difficulty: { en: 'Intermediate', zh: '进阶' },
    time: { en: '6–8 hrs', zh: '6–8 小时' },
    title: { en: 'FastAPI Inference Server', zh: 'FastAPI 推理服务' },
    desc: {
      en: 'Wrap a trained PyTorch model in FastAPI, add batching, Docker packaging, and a health endpoint.',
      zh: '把训练好的 PyTorch 模型封装进 FastAPI，并加入 batching、Docker 打包与健康检查接口。',
    },
    tags: { en: ['FastAPI', 'Docker', 'ONNX'], zh: ['FastAPI', 'Docker', 'ONNX'] },
  },
] as const;

export function ProjectsPageClient() {
  const { locale } = useSitePreferences();
  const isZh = locale === 'zh';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">{isZh ? '项目实战' : 'Projects'}</h1>
      <p className="text-[var(--text-muted)] mb-12 max-w-2xl">
        {isZh
          ? '每一个知识点都会通过真实项目被再次强化。项目页包含 starter code、完成标准、硬件建议和可扩展方向。'
          : 'Every concept is reinforced by building something real. Projects include starter code, grading rubrics, and stretch goals.'}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="card group flex flex-col gap-3 hover:no-underline">
            <div className="flex items-start justify-between">
              <span className="text-3xl">{p.icon}</span>
              <span className={`badge ${p.badge} shrink-0`}>{p.track[locale]}</span>
            </div>
            <h2 className="text-base font-bold text-[var(--text-primary)] group-hover:text-brand-300 transition-colors">{p.title[locale]}</h2>
            <p className="text-[var(--text-muted)] text-sm flex-1">{p.desc[locale]}</p>
            <div className="flex flex-wrap gap-1">
              {p.tags[locale].map((t) => (
                <span key={t} className="badge badge-blue text-xs">{t}</span>
              ))}
            </div>
            <div className="flex gap-4 text-xs text-[var(--text-muted)] pt-1 border-t border-[var(--border)]">
              <span>⚡ {p.difficulty[locale]}</span>
              <span>⏱ {p.time[locale]}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
