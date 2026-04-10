import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Math Foundations for ML',
  description: 'Linear algebra, calculus, probability, information theory, and optimization — grounded in PyTorch and NumPy code, not abstract proofs.',
};

const SECTIONS = [
  {
    id: 'linear-algebra',
    icon: '📐',
    badge: 'Foundation',
    badgeColor: 'badge-blue',
    title: 'Linear Algebra',
    intro: [
      'A vector is not just an array — it is a direction and magnitude in a high-dimensional feature space. When a neural network embeds a word, it maps that word to a point in ℝ^512. The dot product of two embeddings measures cosine similarity: how well two directions align. This is the entire geometric intuition behind attention.',
      'Matrix multiplication is a linear transformation. When you write y = W @ x, you are rotating and scaling the vector x into a new space. The rows of W define where each basis vector lands. This transformation preserves lines and the origin — that is the definition of linearity — and it is why composing layers is just composing matrices.',
      'Singular Value Decomposition (SVD) decomposes any matrix A into A = UΣVᵀ. The columns of U and V are orthonormal bases; Σ is diagonal with non-negative entries (singular values) in descending order. LoRA adapters exploit this: instead of fine-tuning a weight matrix W ∈ ℝ^{m×n} directly, they learn a low-rank perturbation ΔW = BA where B ∈ ℝ^{m×r} and A ∈ ℝ^{r×n}, with r ≪ min(m,n).',
    ],
    equations: [
      { label: 'Matrix-vector product (linear transform)', math: 'y = W @ x        # W: (out, in),  x: (in,),  y: (out,)' },
      { label: 'Attention score (scaled dot-product)', math: 'score = Q @ Kᵀ / √d_k   # Q,K: (seq, d_k)  → (seq, seq)' },
      { label: 'SVD decomposition', math: 'A = U Σ Vᵀ        # U: (m,m), Σ: (m,n), V: (n,n)' },
      { label: 'L2 norm (vector)', math: '‖x‖₂ = √(x₁² + x₂² + ⋯ + xₙ²) = √(xᵀx)' },
      { label: 'Frobenius norm (matrix)', math: '‖A‖_F = √(Σᵢ Σⱼ aᵢⱼ²) = √(trace(AᵀA))' },
      { label: 'Eigendecomposition', math: 'A v = λ v     →    A = Q Λ Qᵀ  (symmetric A)' },
    ],
    code: `import torch

# --- Vectors as geometric objects ---
q = torch.randn(8, 64)      # (seq=8, d_k=64)  query matrix
k = torch.randn(8, 64)      # (seq=8, d_k=64)  key matrix

# Scaled dot-product attention scores
d_k = q.shape[-1]
scores = q @ k.T / d_k ** 0.5      # (8, 8)

# --- SVD: decompose and reconstruct ---
A = torch.randn(32, 64)
U, S, Vh = torch.linalg.svd(A, full_matrices=False)
# U: (32,32), S: (32,), Vh: (32,64)

# Reconstruct with top-k singular values (low-rank approx)
k_rank = 8
A_approx = (U[:, :k_rank] * S[:k_rank]) @ Vh[:k_rank, :]
print(f"Reconstruction error: {torch.linalg.norm(A - A_approx):.4f}")

# --- Norms ---
x = torch.tensor([3.0, 4.0])
print(f"L1: {torch.linalg.norm(x, ord=1)}")   # 7.0  (MAE-like)
print(f"L2: {torch.linalg.norm(x, ord=2)}")   # 5.0  (MSE-like)

W = torch.randn(4, 4)
print(f"Frobenius: {torch.linalg.norm(W, 'fro'):.4f}")

# --- einsum for multi-head attention (batched) ---
# q: (batch, heads, seq, d_k)
q = torch.randn(2, 4, 8, 16)
k = torch.randn(2, 4, 8, 16)
# 'bhid,bhjd->bhij': dot product over d_k dim for each (b, h, i, j)
attn = torch.einsum('bhid,bhjd->bhij', q, k) / 16 ** 0.5
print(f"Attention shape: {attn.shape}")  # (2, 4, 8, 8)`,
    cards: [
      { name: 'Vectors & inner products', note: 'Cosine similarity, dot products, geometric intuition behind embeddings' },
      { name: 'Matrix multiplication', note: 'Composition of linear maps; W @ x rotates and scales into new space' },
      { name: 'Eigendecomposition', note: 'PCA extracts principal directions via eigen-analysis of covariance matrix' },
      { name: 'SVD & low-rank approximation', note: 'LoRA, PCA, and noise removal all exploit truncated SVD' },
      { name: 'Norms: L1, L2, Frobenius', note: 'L1 ↔ MAE, L2 ↔ MSE, Frobenius ↔ weight magnitude regularization' },
      { name: 'Broadcasting rules', note: 'Shape (batch, seq, d) + (1, 1, d) — understand or suffer silent bugs' },
    ],
    mlWhy: 'Every layer in a neural network is a matrix multiplication. Attention is QKᵀ/√d_k. LoRA is a low-rank weight perturbation. PCA is eigendecomposition. Knowing linear algebra lets you read architecture papers without guessing.',
  },
  {
    id: 'calculus',
    icon: '∂',
    badge: 'Core',
    badgeColor: 'badge-orange',
    title: 'Differential Calculus',
    intro: [
      'A derivative is a local linear approximation. At any point w, the function f(w) behaves like a line: f(w + ε) ≈ f(w) + f′(w)·ε. The gradient ∇f generalises this to multiple dimensions — it is the direction of steepest ascent. Gradient descent steps in the opposite direction to reduce the loss.',
      'The chain rule is backpropagation. When you have a composition L = f(g(h(x))), the derivative with respect to x is dL/dx = (dL/df)(df/dg)(dg/dh)(dh/dx). PyTorch\'s autograd implements this exactly: it records a DAG of operations during the forward pass, then traverses it in reverse during .backward(), multiplying Jacobians at each node. This is called reverse-mode automatic differentiation.',
      'The Jacobian of a function f: ℝⁿ → ℝᵐ is the m×n matrix of all first-order partial derivatives. For scalar losses (m=1), the Jacobian is just the gradient — a row vector. The Hessian is the matrix of second derivatives; it encodes curvature. Adam implicitly approximates the diagonal of the Hessian using running squared gradients, enabling adaptive learning rates per parameter.',
    ],
    equations: [
      { label: 'Derivative (local linear approx)', math: 'f(w + ε) ≈ f(w) + f′(w)·ε   →   f′(w) = lim_{ε→0} [f(w+ε) − f(w)] / ε' },
      { label: 'Chain rule (backprop)', math: 'dL/dw = dL/dy · dy/dw        # y = f(w),  L = g(y)' },
      { label: 'Gradient descent update', math: 'w ← w − α · ∇_w L(w)' },
      { label: 'Jacobian (vector → vector)', math: 'J_{ij} = ∂fᵢ/∂xⱼ     J ∈ ℝ^{m×n}  for  f: ℝⁿ → ℝᵐ' },
      { label: 'Hessian (second-order curvature)', math: 'H_{ij} = ∂²L / ∂wᵢ ∂wⱼ     H ∈ ℝ^{n×n}' },
    ],
    code: `import torch

# --- Manual chain rule vs autograd ---
def manual_grad(x_val: float) -> float:
    # f(x) = (2x + 1)^3
    # df/dx = 3*(2x+1)^2 * 2
    return 3 * (2 * x_val + 1) ** 2 * 2

x = torch.tensor([3.0], requires_grad=True)
y = (2 * x + 1) ** 3          # forward pass
y.backward()                   # reverse-mode AD
print(f"Autograd grad: {x.grad.item():.2f}")   # 392.0
print(f"Manual grad:   {manual_grad(3.0):.2f}") # 392.0

# --- DAG inspection ---
# Each tensor has a .grad_fn that points to its creator
z = x * 2 + 1
w = z ** 3
print(w.grad_fn)               # PowBackward0
print(w.grad_fn.next_functions) # [(AddBackward0, 0)]

# --- torch.no_grad: inference / frozen layers ---
with torch.no_grad():
    y_inf = (2 * x + 1) ** 3   # no DAG built, faster
    # y_inf.backward()  # would error

# --- Gradient of a linear layer (manual) ---
# y = W @ x + b,  dL/dW = dL/dy ⊗ x^T (outer product)
W = torch.randn(4, 3, requires_grad=True)
x_in = torch.randn(3, requires_grad=True)
b = torch.zeros(4, requires_grad=True)
y_out = W @ x_in + b
loss = y_out.sum()
loss.backward()
print(f"dL/dW shape: {W.grad.shape}")  # (4, 3)
print(f"dL/dx shape: {x_in.grad.shape}")  # (3,)`,
    cards: [
      { name: 'Partial derivatives', note: 'Gradient of loss w.r.t. each weight, holding others fixed' },
      { name: 'Chain rule → backprop', note: 'Every backward pass is just repeated chain-rule application on the DAG' },
      { name: 'Jacobians', note: 'Gradient flow through matrix ops; shape determines how error propagates' },
      { name: 'Hessian & curvature', note: 'Flat regions, saddle points, why 2nd-order info helps (Adam, L-BFGS)' },
      { name: 'Reverse-mode AD', note: 'O(n) for scalar outputs — why autograd scales to billions of parameters' },
      { name: 'Gradient clipping', note: 'clip_grad_norm_ prevents exploding gradients in RNNs and transformers' },
    ],
    mlWhy: 'Backprop is chain rule. Autograd automates it. Understanding the DAG explains why .detach() matters, why in-place ops break training, and how gradient checkpointing trades compute for memory.',
  },
  {
    id: 'probability',
    icon: '🎲',
    badge: 'Core',
    badgeColor: 'badge-orange',
    title: 'Probability & Statistics',
    intro: [
      'Machine learning is fundamentally about uncertainty. A neural network that outputs logits is implicitly defining a probability distribution over classes. Cross-entropy loss is just the negative log-likelihood of the correct label under that distribution. Maximising the likelihood of the data is Maximum Likelihood Estimation (MLE) — and MLE with cross-entropy is exactly what you do when you train a classifier.',
      'MAP estimation adds a prior: instead of maximising log P(data|θ), you maximise log P(data|θ) + log P(θ). With a Gaussian prior (L2 regularization), this gives MAP = MLE + λ‖θ‖². The prior penalises large weights, acting as regularization. This is why L2 regularization has a probabilistic interpretation as a Gaussian prior over parameters.',
      'The reparameterization trick is what makes VAEs trainable. To sample z ~ N(μ, σ²), rewrite it as z = μ + σ·ε where ε ~ N(0,1). Now gradients can flow through μ and σ during backprop — only ε is stochastic and does not need gradients. Similarly, in REINFORCE, the policy gradient theorem replaces ∇E[R] with E[R · ∇log π], making the expectation differentiable via Monte Carlo sampling.',
    ],
    equations: [
      { label: 'Cross-entropy = negative log-likelihood', math: 'L = -Σᵢ yᵢ log(p̂ᵢ)   where p̂ = softmax(logits)' },
      { label: 'MLE objective', math: 'θ* = argmax_θ Σᵢ log P(xᵢ | θ) = argmin_θ H(p, q)' },
      { label: 'MAP = MLE + log prior (L2 reg)', math: 'θ_MAP = argmax_θ [log P(data|θ) + log P(θ)]' },
      { label: 'KL divergence', math: 'D_KL(P ‖ Q) = 𝔼_{x~P} [log P(x)/Q(x)] = Σ P(x) log P(x)/Q(x)' },
      { label: 'Reparameterization trick', math: 'z ~ N(μ, σ²)   →   z = μ + σ · ε,   ε ~ N(0, 1)' },
      { label: 'REINFORCE gradient', math: '∇_θ J(θ) = 𝔼_τ [Σ_t ∇_θ log π_θ(aₜ|sₜ) · R(τ)]' },
    ],
    code: `import torch
import torch.distributions as D
import torch.nn.functional as F

# --- Distributions API ---
normal = D.Normal(loc=0.0, scale=1.0)
sample = normal.sample((4,))             # (4,)
log_prob = normal.log_prob(sample)       # (4,)

cat = D.Categorical(logits=torch.tensor([1.0, 2.0, 0.5]))
action = cat.sample()                    # integer in {0, 1, 2}
print(f"action={action.item()}, log_prob={cat.log_prob(action):.4f}")

# --- Cross-entropy IS negative log-likelihood ---
logits = torch.tensor([[2.0, 1.0, 0.1]])   # raw scores
labels = torch.tensor([0])                  # true class
ce_loss = F.cross_entropy(logits, labels)   # standard CE
nll = -F.log_softmax(logits, dim=-1)[0, 0] # manual NLL
print(f"CE: {ce_loss:.4f}, NLL: {nll:.4f}")  # identical!

# --- KL divergence ---
p = D.Normal(loc=torch.tensor([0.0]), scale=torch.tensor([1.0]))
q = D.Normal(loc=torch.tensor([1.0]), scale=torch.tensor([2.0]))
kl = D.kl_divergence(p, q)
print(f"KL(P‖Q) = {kl.item():.4f}")

# --- Reparameterization trick (VAE sampler) ---
def reparameterize(mu: torch.Tensor, log_var: torch.Tensor) -> torch.Tensor:
    std = torch.exp(0.5 * log_var)   # σ
    eps = torch.randn_like(std)       # ε ~ N(0,1)
    return mu + std * eps             # z = μ + σε  ← gradients flow!

mu = torch.zeros(8, 16, requires_grad=True)
log_var = torch.zeros(8, 16, requires_grad=True)
z = reparameterize(mu, log_var)
loss = z.sum()
loss.backward()   # gradients reach mu and log_var ✓

# --- log-sum-exp for numerical stability ---
def stable_log_softmax(x: torch.Tensor) -> torch.Tensor:
    c = x.max(dim=-1, keepdim=True).values   # shift by max
    return x - c - torch.log(torch.exp(x - c).sum(dim=-1, keepdim=True))

# Bad:  torch.log(torch.exp(x).sum())  ← overflows for large x
# Good: F.log_softmax(x, dim=-1)       ← numerically stable`,
    cards: [
      { name: 'Probability distributions', note: 'Normal, Categorical, Bernoulli — the building blocks of probabilistic models' },
      { name: 'MLE → cross-entropy loss', note: 'Minimising CE = maximising data likelihood under the model distribution' },
      { name: 'MAP estimation & L2 reg', note: 'Gaussian prior → L2 penalty; Laplace prior → L1 penalty' },
      { name: 'KL divergence', note: 'Measures distribution divergence; central to VAEs and PPO' },
      { name: 'Reparameterization trick', note: 'Move stochasticity outside the computation graph → differentiable sampling' },
      { name: 'REINFORCE & policy gradients', note: 'Log-derivative trick: ∇𝔼[R] = 𝔼[R · ∇log π] — enables RL with backprop' },
    ],
    mlWhy: 'Classification is MLE. Regularization is MAP. VAEs use reparameterization. PPO clips the KL between old and new policies. Understanding probability gives you a unified view of why seemingly different techniques share the same mathematics.',
  },
  {
    id: 'information-theory',
    icon: '📡',
    badge: 'Advanced',
    badgeColor: 'badge-purple',
    title: 'Information Theory',
    intro: [
      'Shannon entropy H(X) = -Σ p(x) log p(x) measures the average surprise in a distribution. A fair coin has H = 1 bit. A certain outcome has H = 0 bits. In ML, entropy is both a loss (cross-entropy) and a regularizer (entropy bonus in PPO encourages exploration). A model with high entropy over outputs is uncertain; low entropy means confident predictions.',
      'Cross-entropy H(p, q) = -Σ p(x) log q(x) decomposes into H(p, q) = H(p) + D_KL(p‖q). When the true distribution p is one-hot (classification), H(p) = 0, so minimising cross-entropy is equivalent to minimising KL divergence from the model q to the true distribution p. This is why CE loss is the right choice for classification — it is the KL-optimal training objective.',
      'Perplexity PP = exp(H) is the exponential of entropy. For a language model with average log-probability -H per token, perplexity is the "effective vocabulary size" the model is choosing from. A perplexity of 10 means the model is as uncertain as a uniform distribution over 10 tokens. Lower is better — and comparing perplexities across models is only valid if computed on the same tokenization and test set.',
    ],
    equations: [
      { label: 'Shannon entropy', math: 'H(X) = -Σ_{x} p(x) log₂ p(x)      (bits, using log base 2)' },
      { label: 'Cross-entropy loss (classification)', math: 'H(p, q) = -Σ_{x} p(x) log q(x)   where p = one-hot, q = softmax output' },
      { label: 'CE = entropy + KL divergence', math: 'H(p, q) = H(p) + D_KL(p ‖ q)    →   minimising CE minimises D_KL(p‖q)' },
      { label: 'Mutual information', math: 'I(X; Y) = H(X) - H(X|Y) = D_KL(P(X,Y) ‖ P(X)P(Y))' },
      { label: 'Perplexity', math: 'PP = exp(H) = exp(-1/N Σᵢ log P(xᵢ))   where N is token count' },
    ],
    code: `import torch
import torch.nn.functional as F
import math

# --- Shannon entropy ---
def entropy(probs: torch.Tensor, eps: float = 1e-8) -> torch.Tensor:
    """H(X) = -Σ p log p. Expects a probability vector."""
    return -(probs * torch.log(probs + eps)).sum(dim=-1)

uniform_4 = torch.full((4,), 0.25)
certain = torch.tensor([1.0, 0.0, 0.0, 0.0])
print(f"H(uniform 4): {entropy(uniform_4):.4f}")   # 1.386 nats ≈ 2 bits
print(f"H(certain):   {entropy(certain):.4f}")      # 0.0 nats

# --- Cross-entropy loss ---
logits = torch.tensor([[3.0, 1.0, 0.5, 0.1]])   # model output
target = torch.tensor([0])                         # correct class

ce = F.cross_entropy(logits, target)          # pytorch builtin
manual_ce = -F.log_softmax(logits, dim=-1)[0, target]
print(f"CE loss: {ce.item():.4f}, Manual: {manual_ce.item():.4f}")

# Entropy bonus (used in PPO to encourage exploration)
log_probs = F.log_softmax(logits, dim=-1)
probs = log_probs.exp()
policy_entropy = -(probs * log_probs).sum(dim=-1)
print(f"Policy entropy: {policy_entropy.item():.4f}")

# --- Perplexity of a language model ---
token_log_probs = torch.tensor([-2.1, -1.8, -3.2, -1.5, -2.4])  # per-token
avg_nll = -token_log_probs.mean()                                  # H ≈ avg NLL
perplexity = torch.exp(avg_nll)
print(f"Perplexity: {perplexity.item():.2f}")   # lower = better LM

# --- Mutual information (approximation) ---
# In practice, used via objectives like InfoNCE (contrastive learning)
# I(X;Y) = H(X) - H(X|Y) ≥ 0  always
# Maximising I(representations; labels) → informative features`,
    cards: [
      { name: 'Shannon entropy', note: 'Bits of uncertainty; uniform = max entropy; deterministic = zero entropy' },
      { name: 'Cross-entropy loss', note: 'H(p,q) is the gold-standard classification loss — derived from KL theory' },
      { name: 'KL divergence', math: 'D_KL(P‖Q) ≥ 0; equals 0 iff P=Q. Not symmetric — P‖Q ≠ Q‖P', note: 'Asymmetric — "forward" vs "reverse" KL have different behaviors' },
      { name: 'Mutual information', note: 'How much knowing Y reduces uncertainty about X; used in InfoNCE, MINE' },
      { name: 'Perplexity', note: 'exp(H): effective branching factor. GPT-4 achieves single-digit perplexity on common benchmarks' },
      { name: 'Entropy bonus in RL', note: 'PPO adds c·H[π] to prevent premature collapse to deterministic policies' },
    ],
    mlWhy: 'Cross-entropy is not just a "standard loss" — it is the KL-optimal training signal. Entropy bonuses prevent RL policies from collapsing. Perplexity is the universal LM comparison metric. Mutual information underlies contrastive representation learning (SimCLR, CLIP).',
  },
  {
    id: 'optimization',
    icon: '⚡',
    badge: 'Critical',
    badgeColor: 'badge-orange',
    title: 'Optimization Theory',
    intro: [
      'Gradient descent is the engine of deep learning. Vanilla SGD takes steps proportional to the negative gradient: θ ← θ − α·∇L. Adding momentum accumulates a velocity term that dampens oscillations and accelerates through flat regions. This is how you go from SGD to SGD with momentum — and momentum is the first building block of every modern optimizer.',
      'Adam (Adaptive Moment Estimation) further adapts the learning rate per parameter using running statistics. The first moment m̂ tracks the gradient mean (like momentum); the second moment v̂ tracks the gradient variance (like AdaGrad). Dividing m̂ by √v̂ + ε gives large steps where gradients are consistent and small steps where they are noisy. The bias-correction terms (1 − β₁ᵗ) and (1 − β₂ᵗ) matter critically in the first few iterations when the running averages are initialised at zero.',
      'Weight decay and L2 regularization are equivalent for SGD but not for Adam. For SGD, adding λ‖θ‖² to the loss is the same as decaying weights by (1 − αλ) each step. For Adam, however, the gradient-based adaptive scaling interferes with L2 regularization — effectively reducing the regularization on parameters with large historical gradients. AdamW fixes this by applying weight decay directly to the parameters, independent of the gradient scaling. Always use AdamW when you care about generalization.',
    ],
    equations: [
      { label: 'SGD with momentum', math: 'v ← β·v − α·∇_θ L\nθ ← θ + v' },
      { label: 'Adam update rule', math: 'm ← β₁·m + (1−β₁)·g          # 1st moment (mean)\nv ← β₂·v + (1−β₂)·g²         # 2nd moment (variance)\nm̂ = m / (1−β₁ᵗ)               # bias-corrected\nv̂ = v / (1−β₂ᵗ)               # bias-corrected\nθ ← θ − α · m̂ / (√v̂ + ε)' },
      { label: 'Cosine annealing schedule', math: 'α_t = α_min + ½(α_max − α_min)(1 + cos(πt/T))' },
      { label: 'Gradient clipping', math: 'if ‖g‖ > max_norm:  g ← g · max_norm / ‖g‖' },
      { label: 'AdamW (decoupled weight decay)', math: 'θ ← θ − α · m̂/(√v̂+ε) − α·λ·θ   # λ applied to θ, not gradient' },
    ],
    code: `import torch
import torch.nn as nn
import math

# --- Manual Adam implementation ---
def adam_step(
    params: list[torch.Tensor],
    grads:  list[torch.Tensor],
    ms:     list[torch.Tensor],
    vs:     list[torch.Tensor],
    t: int,
    lr: float = 1e-3,
    beta1: float = 0.9,
    beta2: float = 0.999,
    eps: float = 1e-8,
) -> None:
    for p, g, m, v in zip(params, grads, ms, vs):
        m.mul_(beta1).add_(g, alpha=1 - beta1)          # m ← β₁m + (1-β₁)g
        v.mul_(beta2).addcmul_(g, g, value=1 - beta2)   # v ← β₂v + (1-β₂)g²
        m_hat = m / (1 - beta1 ** t)                     # bias correction
        v_hat = v / (1 - beta2 ** t)
        p.add_(m_hat / (v_hat.sqrt() + eps), alpha=-lr)  # θ ← θ - α·m̂/√v̂+ε

# --- Using torch.optim.AdamW (correct for transformers) ---
model = nn.Linear(64, 32)
optimizer = torch.optim.AdamW(
    model.parameters(),
    lr=1e-3,
    betas=(0.9, 0.999),
    weight_decay=0.01,   # decoupled: applied to θ directly
)

# --- Linear warmup + cosine decay schedule (standard for LLMs) ---
def get_lr(step: int, warmup_steps: int, max_steps: int,
           lr_max: float, lr_min: float) -> float:
    if step < warmup_steps:
        return lr_max * step / warmup_steps                      # linear warmup
    progress = (step - warmup_steps) / (max_steps - warmup_steps)
    return lr_min + 0.5 * (lr_max - lr_min) * (1 + math.cos(math.pi * progress))

# --- Gradient clipping (critical for transformers & RNNs) ---
loss = torch.randn(1, requires_grad=True).sum()
loss.backward()
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
optimizer.step()
optimizer.zero_grad()

# --- Gradient accumulation (simulate larger batch with small GPU) ---
ACCUM_STEPS = 4
optimizer.zero_grad()
for i in range(ACCUM_STEPS):
    x = torch.randn(8, 64)
    out = model(x)
    loss = out.sum() / ACCUM_STEPS   # ← CRITICAL: divide before backward
    loss.backward()                   # accumulates gradients
optimizer.step()
optimizer.zero_grad()`,
    cards: [
      { name: 'SGD with momentum', note: 'Velocity accumulation: faster through flat regions, less oscillation in ravines' },
      { name: 'AdaGrad → RMSProp → Adam', note: 'Each iteration added adaptive per-parameter LR and exponential moving averages' },
      { name: 'Bias correction in Adam', note: 'Without (1−β₁ᵗ) correction, first steps are severely underestimated' },
      { name: 'AdamW vs Adam + L2', note: 'L2 reg ≠ weight decay for Adam; AdamW decouples and fixes this properly' },
      { name: 'LR schedules', math: 'Linear warmup prevents early divergence; cosine decay improves final convergence', note: 'Linear warmup + cosine decay is standard for LLMs; schedule-free methods emerging' },
      { name: 'Gradient clipping', note: 'clip_grad_norm_ is not optional for transformers — gradient explosions are real' },
    ],
    mlWhy: 'Most training instabilities trace back to the optimizer. Using Adam instead of AdamW leaks regularization. Forgetting gradient clipping causes NaN losses. Skipping LR warmup diverges transformers in the first 100 steps. These are not edge cases — they are common training failures.',
  },
];

const PITFALLS = [
  {
    icon: '⚠️',
    title: 'Broadcasting shape bugs',
    body: 'A tensor of shape (batch, d_model) added to (batch, seq, d_model) broadcasts silently. No error — wrong result. Always check shapes explicitly with assert x.shape == (B, T, D) at key points in your forward pass.',
  },
  {
    icon: '⚠️',
    title: 'Forgetting .detach() between iterations',
    body: 'If you reuse a tensor from the previous step (e.g., hidden state in an RNN or old_log_probs in PPO) without .detach(), the computation graph from the previous iteration stays in memory and gradients accumulate incorrectly. Always detach before reuse.',
  },
  {
    icon: '⚠️',
    title: 'In-place ops break autograd',
    body: 'x += 1 or x[mask] = 0 modifies data that the autograd graph needs for backward. Use x = x + 1 or out-of-place tensor operations. In-place ops inside nn.Module forward methods are especially dangerous and produce cryptic runtime errors.',
  },
  {
    icon: '⚠️',
    title: 'Numerical instability: log(0) and softmax overflow',
    body: 'torch.log(torch.softmax(x)) loses precision for large logits. Always use F.log_softmax(x, dim=-1) or F.cross_entropy (which combines log_softmax + NLL internally). torch.softmax with large inputs will return inf or nan silently.',
  },
  {
    icon: '⚠️',
    title: 'L2 reg ≠ weight decay for Adam',
    body: 'Adding weight_decay to Adam optimizer is NOT the same as L2 regularization — the adaptive gradient scaling interferes. Use torch.optim.AdamW, which applies decay directly to parameters (decoupled from gradient scaling). This matters for generalization on large models.',
  },
  {
    icon: '⚠️',
    title: 'Gradient accumulation: forgetting to scale the loss',
    body: 'When accumulating gradients over N mini-batches, you must divide the loss by N before each backward call: loss = loss / ACCUM_STEPS. Otherwise your effective loss is N× larger, destabilising training. optimizer.zero_grad() must come before the accumulation loop, not inside it.',
  },
];

export default function MathPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-white">Math Foundations</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <span className="text-5xl">∑</span>
        <div>
          <span className="badge badge-orange mb-2">Reference</span>
          <h1 className="text-4xl font-extrabold text-white">Math Foundations for ML</h1>
        </div>
      </div>

      <p className="text-slate-400 text-lg mb-4 max-w-2xl">
        Five mathematical pillars that underpin every neural network: linear algebra, calculus,
        probability, information theory, and optimization — each grounded in working PyTorch code.
        No proofs for their own sake. Only the math you will encounter in every training run.
      </p>

      <div className="flex flex-wrap gap-6 text-sm text-slate-500 mb-12">
        <span>📐 5 sections</span>
        <span>🐍 PyTorch 2.x · NumPy</span>
        <span>🎯 Target: Python engineers learning ML</span>
      </div>

      {/* Quick navigation */}
      <div className="card mb-12">
        <h2 className="font-semibold text-white mb-3">Jump to section</h2>
        <div className="flex flex-wrap gap-3">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`}
               className="text-sm text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
              {s.icon} {s.title}
            </a>
          ))}
          <a href="#pitfalls"
             className="text-sm text-yellow-400 hover:text-yellow-300 bg-yellow-500/10 hover:bg-yellow-500/20 px-3 py-1.5 rounded-lg transition-colors">
            ⚠️ Common Pitfalls
          </a>
        </div>
      </div>

      {/* Main sections */}
      {SECTIONS.map((sec) => (
        <section key={sec.id} id={sec.id} className="mb-16 scroll-mt-20">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-4xl">{sec.icon}</span>
            <div>
              <span className="badge badge-orange mb-1">{sec.badge}</span>
              <h2 className="text-2xl font-bold text-white">{sec.title}</h2>
            </div>
          </div>

          {/* Conceptual explanation */}
          <div className="space-y-3 mb-6">
            {sec.intro.map((para, i) => (
              <p key={i} className="text-slate-400 text-sm leading-relaxed">{para}</p>
            ))}
          </div>

          {/* Key equations */}
          <div className="card mb-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Key Equations</h3>
            <div className="space-y-3">
              {sec.equations.map((eq) => (
                <div key={eq.label}>
                  <div className="text-xs text-slate-500 mb-1">{eq.label}</div>
                  <pre className="text-sm font-mono text-orange-300 bg-orange-950/30 rounded px-3 py-2 overflow-x-auto whitespace-pre">
                    {eq.math}
                  </pre>
                </div>
              ))}
            </div>
          </div>

          {/* Code snippet */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">PyTorch Implementation</h3>
            <pre className="bg-[#0d1117] rounded-xl p-4 text-xs text-slate-300 overflow-x-auto leading-relaxed">
              {sec.code}
            </pre>
          </div>

          {/* Topic cards */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Topics in this section</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sec.cards.map((card) => (
                <div key={card.name}
                     className="flex items-start gap-3 p-3 rounded-xl"
                     style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-orange-400 mt-0.5 shrink-0">▸</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{card.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{card.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why this matters */}
          <div className="card border-orange-500/20 bg-orange-950/10">
            <div className="flex items-start gap-2">
              <span className="text-orange-400 text-sm shrink-0 mt-0.5">→</span>
              <div>
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Why this matters for ML</span>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">{sec.mlWhy}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pitfalls */}
      <section id="pitfalls" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold text-white mb-2">Common Pitfalls</h2>
        <p className="text-slate-400 text-sm mb-6 max-w-2xl">
          These mistakes do not produce immediate errors — they silently produce wrong results,
          slower convergence, or instability that takes hours to diagnose.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {PITFALLS.map((p) => (
            <div key={p.title} className="card border-yellow-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span>{p.icon}</span>
                <h3 className="font-semibold text-white text-sm">{p.title}</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project callout */}
      <div className="card border-orange-500/30 bg-orange-950/10 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-3xl">🚀</span>
          <div>
            <h3 className="font-semibold text-white mb-1">Apply this math in the mini-GPT project</h3>
            <p className="text-sm text-slate-400 mb-3 leading-relaxed">
              The mini-GPT project implements attention (linear algebra), backprop through transformers
              (calculus), cross-entropy training (information theory + probability), and AdamW with
              cosine decay (optimization). Everything on this page appears in the training loop.
            </p>
            <Link href="/projects/mini-gpt"
                  className="inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 font-medium">
              View mini-GPT project →
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary project links */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold text-white text-sm mb-1">BERT Fine-tuning</h3>
          <p className="text-xs text-slate-500 mb-2">MLE, cross-entropy, AdamW with warmup — all in one project</p>
          <Link href="/projects/bert-finetune" className="text-xs text-orange-400 hover:text-orange-300">
            Explore project →
          </Link>
        </div>
        <div className="card">
          <h3 className="font-semibold text-white text-sm mb-1">PPO MuJoCo Agent</h3>
          <p className="text-xs text-slate-500 mb-2">Policy gradients, KL divergence, entropy bonus, GAE in practice</p>
          <Link href="/projects/ppo-mujoco" className="text-xs text-orange-400 hover:text-orange-300">
            Explore project →
          </Link>
        </div>
      </div>
    </div>
  );
}
