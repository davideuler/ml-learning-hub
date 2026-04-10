export type ProjectCodeSample = {
  title: string;
  description: string;
  language: 'python';
  filename: string;
  code: string;
  dependencies: string[];
  runCommands: string[];
};

export const PROJECT_CODE_SAMPLES: Record<string, ProjectCodeSample> = {
  'mini-gpt': {
    title: 'Runnable Mini-GPT training script',
    description: 'A compact PyTorch script that trains a tiny character-level GPT on a local text file.',
    language: 'python',
    filename: 'mini_gpt_train.py',
    dependencies: ['python>=3.10', 'torch', 'input.txt (Tiny Shakespeare or another text corpus)'],
    runCommands: ['pip install torch', 'python mini_gpt_train.py'],
    code: `import math
import torch
import torch.nn as nn
import torch.nn.functional as F

text = open("input.txt", "r", encoding="utf-8").read()
chars = sorted(list(set(text)))
stoi = {ch: i for i, ch in enumerate(chars)}
itos = {i: ch for ch, i in stoi.items()}
encode = lambda s: [stoi[c] for c in s]
decode = lambda xs: ''.join(itos[i] for i in xs)

device = 'cuda' if torch.cuda.is_available() else 'cpu'
block_size = 128
batch_size = 32
n_embd = 192
n_head = 6
n_layer = 6
dropout = 0.1
max_iters = 2000
eval_interval = 200
lr = 3e-4

ids = torch.tensor(encode(text), dtype=torch.long)
split = int(0.9 * len(ids))
train_ids, val_ids = ids[:split], ids[split:]


def get_batch(split_name: str):
    data = train_ids if split_name == 'train' else val_ids
    ix = torch.randint(len(data) - block_size - 1, (batch_size,))
    x = torch.stack([data[i:i+block_size] for i in ix])
    y = torch.stack([data[i+1:i+block_size+1] for i in ix])
    return x.to(device), y.to(device)


class Head(nn.Module):
    def __init__(self, head_size: int):
        super().__init__()
        self.key = nn.Linear(n_embd, head_size, bias=False)
        self.query = nn.Linear(n_embd, head_size, bias=False)
        self.value = nn.Linear(n_embd, head_size, bias=False)
        self.register_buffer('tril', torch.tril(torch.ones(block_size, block_size)))
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        B, T, C = x.shape
        k = self.key(x)
        q = self.query(x)
        wei = q @ k.transpose(-2, -1) * (k.size(-1) ** -0.5)
        wei = wei.masked_fill(self.tril[:T, :T] == 0, float('-inf'))
        wei = self.dropout(F.softmax(wei, dim=-1))
        v = self.value(x)
        return wei @ v


class MultiHeadAttention(nn.Module):
    def __init__(self, num_heads: int, head_size: int):
        super().__init__()
        self.heads = nn.ModuleList([Head(head_size) for _ in range(num_heads)])
        self.proj = nn.Linear(num_heads * head_size, n_embd)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x):
        return self.dropout(self.proj(torch.cat([h(x) for h in self.heads], dim=-1)))


class FeedForward(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(n_embd, 4 * n_embd),
            nn.ReLU(),
            nn.Linear(4 * n_embd, n_embd),
            nn.Dropout(dropout),
        )

    def forward(self, x):
        return self.net(x)


class Block(nn.Module):
    def __init__(self):
        super().__init__()
        head_size = n_embd // n_head
        self.sa = MultiHeadAttention(n_head, head_size)
        self.ffwd = FeedForward()
        self.ln1 = nn.LayerNorm(n_embd)
        self.ln2 = nn.LayerNorm(n_embd)

    def forward(self, x):
        x = x + self.sa(self.ln1(x))
        x = x + self.ffwd(self.ln2(x))
        return x


class MiniGPT(nn.Module):
    def __init__(self):
        super().__init__()
        vocab_size = len(chars)
        self.token_embedding_table = nn.Embedding(vocab_size, n_embd)
        self.position_embedding_table = nn.Embedding(block_size, n_embd)
        self.blocks = nn.Sequential(*[Block() for _ in range(n_layer)])
        self.ln_f = nn.LayerNorm(n_embd)
        self.lm_head = nn.Linear(n_embd, vocab_size)

    def forward(self, idx, targets=None):
        B, T = idx.shape
        tok_emb = self.token_embedding_table(idx)
        pos_emb = self.position_embedding_table(torch.arange(T, device=idx.device))
        x = tok_emb + pos_emb
        x = self.blocks(x)
        x = self.ln_f(x)
        logits = self.lm_head(x)
        loss = None
        if targets is not None:
            B, T, C = logits.shape
            loss = F.cross_entropy(logits.view(B * T, C), targets.view(B * T))
        return logits, loss

    @torch.no_grad()
    def generate(self, idx, max_new_tokens: int):
        for _ in range(max_new_tokens):
            idx_cond = idx[:, -block_size:]
            logits, _ = self(idx_cond)
            probs = F.softmax(logits[:, -1, :], dim=-1)
            idx_next = torch.multinomial(probs, num_samples=1)
            idx = torch.cat((idx, idx_next), dim=1)
        return idx


model = MiniGPT().to(device)
optimizer = torch.optim.AdamW(model.parameters(), lr=lr)

for step in range(max_iters):
    xb, yb = get_batch('train')
    _, loss = model(xb, yb)
    optimizer.zero_grad(set_to_none=True)
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
    optimizer.step()

    if step % eval_interval == 0:
        model.eval()
        vx, vy = get_batch('val')
        _, vloss = model(vx, vy)
        print(f"step={step} train_loss={loss.item():.4f} val_loss={vloss.item():.4f}")
        model.train()

context = torch.zeros((1, 1), dtype=torch.long, device=device)
print(decode(model.generate(context, 300)[0].tolist()))
`
  },
  'cnn-classifier': {
    title: 'Runnable CIFAR-10 CNN trainer',
    description: 'A compact PyTorch script for training a ResNet-style classifier on CIFAR-10.',
    language: 'python',
    filename: 'cnn_cifar10_train.py',
    dependencies: ['python>=3.10', 'torch', 'torchvision'],
    runCommands: ['pip install torch torchvision', 'python cnn_cifar10_train.py'],
    code: `import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from torchvision import datasets, transforms


device = 'cuda' if torch.cuda.is_available() else 'cpu'
BATCH_SIZE = 128
EPOCHS = 10
LR = 3e-4

train_tfms = transforms.Compose([
    transforms.RandomCrop(32, padding=4),
    transforms.RandomHorizontalFlip(),
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465), (0.2470, 0.2435, 0.2616)),
])

test_tfms = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465), (0.2470, 0.2435, 0.2616)),
])

train_ds = datasets.CIFAR10(root='data', train=True, download=True, transform=train_tfms)
test_ds = datasets.CIFAR10(root='data', train=False, download=True, transform=test_tfms)
train_loader = DataLoader(train_ds, batch_size=BATCH_SIZE, shuffle=True, num_workers=2)
test_loader = DataLoader(test_ds, batch_size=BATCH_SIZE, shuffle=False, num_workers=2)


class ResBlock(nn.Module):
    def __init__(self, in_ch, out_ch, stride=1):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, stride=stride, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
        )
        self.shortcut = nn.Identity() if stride == 1 and in_ch == out_ch else nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 1, stride=stride, bias=False),
            nn.BatchNorm2d(out_ch),
        )
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x):
        return self.relu(self.conv(x) + self.shortcut(x))


class SmallResNet(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.stem = nn.Sequential(
            nn.Conv2d(3, 64, 3, padding=1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
        )
        self.layer1 = nn.Sequential(ResBlock(64, 64), ResBlock(64, 64))
        self.layer2 = nn.Sequential(ResBlock(64, 128, stride=2), ResBlock(128, 128))
        self.layer3 = nn.Sequential(ResBlock(128, 256, stride=2), ResBlock(256, 256))
        self.pool = nn.AdaptiveAvgPool2d(1)
        self.fc = nn.Linear(256, num_classes)

    def forward(self, x):
        x = self.stem(x)
        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = self.pool(x).flatten(1)
        return self.fc(x)


model = SmallResNet().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=LR, weight_decay=1e-4)

for epoch in range(EPOCHS):
    model.train()
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        logits = model(images)
        loss = criterion(logits, labels)
        optimizer.zero_grad(set_to_none=True)
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()

    model.eval()
    correct = total = 0
    with torch.no_grad():
        for images, labels in test_loader:
            images, labels = images.to(device), labels.to(device)
            preds = model(images).argmax(dim=1)
            correct += (preds == labels).sum().item()
            total += labels.size(0)
    print(f"epoch={epoch+1} acc={correct/total:.4f}")
`
  },
  'bert-finetune': {
    title: 'Runnable BERT fine-tuning script',
    description: 'A Hugging Face training script for SST-2 sentiment classification with optional LoRA.',
    language: 'python',
    filename: 'bert_sst2_train.py',
    dependencies: ['python>=3.10', 'transformers', 'datasets', 'evaluate', 'torch', 'peft (optional for LoRA)'],
    runCommands: ['pip install torch transformers datasets evaluate', 'pip install peft  # optional, only if USE_LORA=True', 'python bert_sst2_train.py'],
    code: `from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
import evaluate

USE_LORA = False
MODEL_NAME = 'bert-base-uncased'

dataset = load_dataset('glue', 'sst2')
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
metric = evaluate.load('glue', 'sst2')


def tokenize(batch):
    return tokenizer(batch['sentence'], truncation=True, padding='max_length', max_length=128)

encoded = dataset.map(tokenize, batched=True)
encoded = encoded.rename_column('label', 'labels')
encoded.set_format(type='torch', columns=['input_ids', 'attention_mask', 'labels'])

model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)
if USE_LORA:
    from peft import LoraConfig, get_peft_model
    config = LoraConfig(r=8, lora_alpha=16, target_modules=['query', 'value'], lora_dropout=0.05)
    model = get_peft_model(model, config)


def compute_metrics(eval_pred):
    logits, labels = eval_pred
    preds = logits.argmax(axis=-1)
    return metric.compute(predictions=preds, references=labels)

args = TrainingArguments(
    output_dir='runs/bert-sst2',
    learning_rate=2e-5,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=32,
    num_train_epochs=2,
    evaluation_strategy='epoch',
    save_strategy='epoch',
    logging_steps=50,
    weight_decay=0.01,
    report_to='none',
)

trainer = Trainer(
    model=model,
    args=args,
    train_dataset=encoded['train'],
    eval_dataset=encoded['validation'],
    tokenizer=tokenizer,
    compute_metrics=compute_metrics,
)

trainer.train()
print(trainer.evaluate())
`
  },
  'dqn-pong': {
    title: 'Runnable DQN Pong trainer',
    description: 'A compact Atari DQN training script with replay buffer, target network, and evaluation loop.',
    language: 'python',
    filename: 'dqn_pong_train.py',
    dependencies: ['python>=3.10', 'torch', 'gymnasium[atari,accept-rom-license]', 'ale-py', 'numpy'],
    runCommands: ['pip install torch numpy ale-py "gymnasium[atari,accept-rom-license]"', 'python dqn_pong_train.py'],
    code: `import random
from collections import deque

import gymnasium as gym
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F


def make_env():
    env = gym.make('ALE/Pong-v5', frameskip=4)
    env = gym.wrappers.AtariPreprocessing(env, grayscale_obs=True, scale_obs=False)
    env = gym.wrappers.FrameStackObservation(env, 4)
    return env


class ReplayBuffer:
    def __init__(self, capacity=100000):
        self.buffer = deque(maxlen=capacity)

    def push(self, *transition):
        self.buffer.append(transition)

    def sample(self, batch_size):
        batch = random.sample(self.buffer, batch_size)
        s, a, r, ns, d = zip(*batch)
        return np.array(s), np.array(a), np.array(r), np.array(ns), np.array(d)

    def __len__(self):
        return len(self.buffer)


class QNet(nn.Module):
    def __init__(self, n_actions):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(4, 32, 8, stride=4), nn.ReLU(),
            nn.Conv2d(32, 64, 4, stride=2), nn.ReLU(),
            nn.Conv2d(64, 64, 3, stride=1), nn.ReLU(),
            nn.Flatten(),
            nn.Linear(3136, 512), nn.ReLU(),
            nn.Linear(512, n_actions),
        )

    def forward(self, x):
        return self.net(x.float() / 255.0)


device = 'cuda' if torch.cuda.is_available() else 'cpu'
env = make_env()
n_actions = env.action_space.n
q_net = QNet(n_actions).to(device)
target_net = QNet(n_actions).to(device)
target_net.load_state_dict(q_net.state_dict())
optimizer = torch.optim.Adam(q_net.parameters(), lr=1e-4)
replay = ReplayBuffer()

gamma = 0.99
batch_size = 32
warmup = 5000
target_update = 1000
epsilon_start, epsilon_end = 1.0, 0.05

obs, _ = env.reset(seed=42)
for step in range(20000):
    epsilon = max(epsilon_end, epsilon_start - step / 100000)
    if random.random() < epsilon:
        action = env.action_space.sample()
    else:
        with torch.no_grad():
            x = torch.tensor(np.array(obs), device=device).unsqueeze(0)
            action = q_net(x).argmax(dim=1).item()

    next_obs, reward, terminated, truncated, _ = env.step(action)
    done = terminated or truncated
    replay.push(np.array(obs), action, reward, np.array(next_obs), done)
    obs = next_obs

    if done:
        obs, _ = env.reset()

    if len(replay) < warmup:
        continue

    states, actions, rewards, next_states, dones = replay.sample(batch_size)
    states = torch.tensor(states, device=device)
    actions = torch.tensor(actions, device=device).long()
    rewards = torch.tensor(rewards, device=device).float()
    next_states = torch.tensor(next_states, device=device)
    dones = torch.tensor(dones, device=device).float()

    q_values = q_net(states).gather(1, actions.unsqueeze(1)).squeeze(1)
    with torch.no_grad():
        target_q = target_net(next_states).max(dim=1).values
        targets = rewards + gamma * (1 - dones) * target_q

    loss = F.smooth_l1_loss(q_values, targets)
    optimizer.zero_grad(set_to_none=True)
    loss.backward()
    torch.nn.utils.clip_grad_norm_(q_net.parameters(), 10.0)
    optimizer.step()

    if step % target_update == 0:
        target_net.load_state_dict(q_net.state_dict())
        print(f'step={step} loss={loss.item():.4f} epsilon={epsilon:.3f}')
`
  },
  'inference-server': {
    title: 'Runnable FastAPI inference server',
    description: 'A complete FastAPI inference service with health checks, validation, and simple metrics.',
    language: 'python',
    filename: 'inference_server.py',
    dependencies: ['python>=3.10', 'fastapi', 'uvicorn', 'pydantic'],
    runCommands: ['pip install fastapi uvicorn pydantic', 'uvicorn inference_server:app --host 0.0.0.0 --port 8000'],
    code: `from collections import Counter
from contextlib import asynccontextmanager
import time

from fastapi import FastAPI
from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
    text: str = Field(min_length=1, max_length=2000)


class PredictResponse(BaseModel):
    label: str
    score: float
    latency_ms: float


class DummySentimentModel:
    def predict(self, text: str):
        positive_words = {'good', 'great', 'love', 'excellent', 'amazing'}
        tokens = text.lower().split()
        score = sum(token in positive_words for token in tokens) / max(len(tokens), 1)
        label = 'positive' if score >= 0.2 else 'negative'
        return label, float(score)


metrics = Counter()
model = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    model = DummySentimentModel()
    yield


app = FastAPI(title='Inference Server Demo', lifespan=lifespan)


@app.get('/health')
def health():
    return {'status': 'ok', 'model_loaded': model is not None}


@app.get('/metrics')
def get_metrics():
    return dict(metrics)


@app.post('/predict', response_model=PredictResponse)
def predict(req: PredictRequest):
    start = time.perf_counter()
    label, score = model.predict(req.text)
    latency_ms = (time.perf_counter() - start) * 1000
    metrics['predict_requests_total'] += 1
    return PredictResponse(label=label, score=score, latency_ms=latency_ms)
`
  },
  'ppo-mujoco': {
    title: 'Runnable PPO continuous-control trainer',
    description: 'A compact PPO implementation for continuous control environments like HalfCheetah.',
    language: 'python',
    filename: 'ppo_continuous_train.py',
    dependencies: ['python>=3.10', 'torch', 'gymnasium[mujoco]', 'numpy'],
    runCommands: ['pip install torch numpy "gymnasium[mujoco]"', 'python ppo_continuous_train.py'],
    code: `import gymnasium as gym
import numpy as np
import torch
import torch.nn as nn
from torch.distributions import Normal


device = 'cuda' if torch.cuda.is_available() else 'cpu'
env = gym.make('HalfCheetah-v4')
obs_dim = env.observation_space.shape[0]
act_dim = env.action_space.shape[0]


class ActorCritic(nn.Module):
    def __init__(self):
        super().__init__()
        self.backbone = nn.Sequential(nn.Linear(obs_dim, 128), nn.Tanh(), nn.Linear(128, 128), nn.Tanh())
        self.mu = nn.Linear(128, act_dim)
        self.log_std = nn.Parameter(torch.zeros(act_dim))
        self.value = nn.Linear(128, 1)

    def forward(self, x):
        h = self.backbone(x)
        return self.mu(h), self.log_std.exp().expand_as(self.mu(h)), self.value(h)


model = ActorCritic().to(device)
optimizer = torch.optim.Adam(model.parameters(), lr=3e-4)
clip_eps = 0.2
gamma = 0.99
lam = 0.95


for episode in range(10):
    obs, _ = env.reset(seed=episode)
    traj = []
    done = False
    while not done:
        x = torch.tensor(obs, dtype=torch.float32, device=device).unsqueeze(0)
        mu, std, value = model(x)
        dist = Normal(mu, std)
        action = dist.sample()
        logp = dist.log_prob(action).sum(dim=-1)
        next_obs, reward, terminated, truncated, _ = env.step(action.squeeze(0).cpu().numpy())
        traj.append((obs, action.squeeze(0).detach().cpu().numpy(), reward, value.item(), logp.item(), terminated or truncated))
        obs = next_obs
        done = terminated or truncated

    rewards = [t[2] for t in traj]
    values = [t[3] for t in traj] + [0.0]
    advs, gae = [], 0.0
    for t in reversed(range(len(traj))):
        delta = rewards[t] + gamma * values[t + 1] * (1 - traj[t][5]) - values[t]
        gae = delta + gamma * lam * (1 - traj[t][5]) * gae
        advs.insert(0, gae)
    returns = [a + v for a, v in zip(advs, values[:-1])]

    obs_t = torch.tensor(np.array([t[0] for t in traj]), dtype=torch.float32, device=device)
    act_t = torch.tensor(np.array([t[1] for t in traj]), dtype=torch.float32, device=device)
    old_logp = torch.tensor([t[4] for t in traj], dtype=torch.float32, device=device)
    adv_t = torch.tensor(advs, dtype=torch.float32, device=device)
    ret_t = torch.tensor(returns, dtype=torch.float32, device=device)
    adv_t = (adv_t - adv_t.mean()) / (adv_t.std() + 1e-8)

    mu, std, values_pred = model(obs_t)
    dist = Normal(mu, std)
    new_logp = dist.log_prob(act_t).sum(dim=-1)
    ratio = torch.exp(new_logp - old_logp)
    clipped = torch.clamp(ratio, 1 - clip_eps, 1 + clip_eps)
    policy_loss = -(torch.min(ratio * adv_t, clipped * adv_t)).mean()
    value_loss = ((values_pred.squeeze(-1) - ret_t) ** 2).mean()
    loss = policy_loss + 0.5 * value_loss

    optimizer.zero_grad(set_to_none=True)
    loss.backward()
    optimizer.step()
    print(f'episode={episode} return={sum(rewards):.1f} loss={loss.item():.4f}')
`
  },
  'tianshou-cartpole': {
    title: 'Runnable Tianshou CartPole pipeline',
    description: 'A minimal but complete Tianshou DQN training pipeline on CartPole-v1.',
    language: 'python',
    filename: 'tianshou_cartpole.py',
    dependencies: ['python>=3.10', 'torch', 'tianshou', 'gymnasium', 'numpy'],
    runCommands: ['pip install torch tianshou gymnasium numpy', 'python tianshou_cartpole.py'],
    code: `import gymnasium as gym
import numpy as np
import torch
import torch.nn as nn
from tianshou.data import Collector, VectorReplayBuffer
from tianshou.env import DummyVectorEnv
from tianshou.policy import DQNPolicy
from tianshou.trainer import offpolicy_trainer


train_envs = DummyVectorEnv([lambda: gym.make('CartPole-v1') for _ in range(4)])
test_envs = DummyVectorEnv([lambda: gym.make('CartPole-v1') for _ in range(4)])
state_shape = train_envs.observation_space.shape or train_envs.observation_space.n
action_shape = train_envs.action_space.n


class Net(nn.Module):
    def __init__(self):
        super().__init__()
        self.model = nn.Sequential(
            nn.Linear(state_shape[0], 128), nn.ReLU(),
            nn.Linear(128, 128), nn.ReLU(),
            nn.Linear(128, action_shape),
        )

    def forward(self, obs, state=None, info=None):
        if not isinstance(obs, torch.Tensor):
            obs = torch.tensor(obs, dtype=torch.float32)
        return self.model(obs), state


net = Net()
optim = torch.optim.Adam(net.parameters(), lr=1e-3)
policy = DQNPolicy(
    model=net,
    optim=optim,
    discount_factor=0.99,
    estimation_step=3,
    target_update_freq=320,
)

train_collector = Collector(policy, train_envs, VectorReplayBuffer(20000, len(train_envs)))
test_collector = Collector(policy, test_envs)
train_collector.collect(n_step=1024)

result = offpolicy_trainer(
    policy,
    train_collector,
    test_collector,
    max_epoch=5,
    step_per_epoch=2000,
    step_per_collect=10,
    episode_per_test=5,
    batch_size=64,
    update_per_step=0.1,
)
print(result)
`
  },
};
