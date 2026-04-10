import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Math Foundations',
  description: 'Linear algebra, calculus, and probability for deep learning — illustrated in NumPy and PyTorch.',
};

const SECTIONS = [
  {
    id: 'linear-algebra',
    icon: '📐',
    title: 'Linear Algebra',
    topics: [
      { name: 'Vectors & dot products',   note: 'The geometry behind attention scores' },
      { name: 'Matrix multiplication',    note: 'Why (A @ B).T == B.T @ A.T matters for backprop' },
      { name: 'Eigenvalues / vectors',    note: 'Intuition via SVD for embedding spaces' },
      { name: 'Broadcasting rules',       note: 'NumPy/PyTorch shape arithmetic made explicit' },
    ],
    mathExample: 'Attention score: $\\text{score}(Q, K) = \\frac{QK^T}{\\sqrt{d_k}}$',
  },
  {
    id: 'calculus',
    icon: '∂',
    title: 'Differential Calculus',
    topics: [
      { name: 'Partial derivatives',      note: 'One weight at a time' },
      { name: 'Chain rule',               note: 'How autograd works at every layer' },
      { name: 'Jacobians & Hessians',     note: 'Gradient accumulation & second-order methods' },
      { name: 'Gradient descent geometry',note: 'Loss landscapes, saddle points, local minima' },
    ],
    mathExample: 'Chain rule: $\\frac{\\partial L}{\\partial w} = \\frac{\\partial L}{\\partial y} \\cdot \\frac{\\partial y}{\\partial w}$',
  },
  {
    id: 'probability',
    icon: '🎲',
    title: 'Probability & Statistics',
    topics: [
      { name: 'Probability distributions', note: 'Bernoulli, Gaussian, Categorical — in PyTorch' },
      { name: 'MLE & MAP estimation',      note: 'Why cross-entropy is log-likelihood' },
      { name: 'KL divergence',             note: 'Foundation of VAEs and policy gradient' },
      { name: 'Expectation & variance',    note: 'Baseline subtraction in REINFORCE' },
    ],
    mathExample: 'Cross-entropy: $H(p, q) = -\\sum_x p(x) \\log q(x)$',
  },
  {
    id: 'information-theory',
    icon: '📡',
    title: 'Information Theory',
    topics: [
      { name: 'Entropy',          note: 'Measuring uncertainty in probability distributions' },
      { name: 'KL divergence',    note: 'How far two distributions are apart' },
      { name: 'Mutual information',note: 'Feature selection and representation learning' },
      { name: 'Perplexity',       note: 'Language model quality metric explained' },
    ],
    mathExample: 'KL divergence: $D_{KL}(P \\| Q) = \\sum_x P(x) \\log \\frac{P(x)}{Q(x)}$',
  },
];

export default function MathPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-white mb-4">Math Foundations</h1>
      <p className="text-slate-400 text-lg max-w-2xl mb-12">
        Every concept here is anchored to code. No proofs for their own sake —
        only the math you will encounter in every training run.
      </p>

      <div className="space-y-8">
        {SECTIONS.map((sec) => (
          <div key={sec.id} id={sec.id} className="card scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{sec.icon}</span>
              <h2 className="text-xl font-bold text-white">{sec.title}</h2>
            </div>

            {/* Math formula display */}
            <div className="bg-[#1a1a2e] rounded-xl px-4 py-3 mb-5 font-mono text-sm text-brand-300 overflow-x-auto">
              {sec.mathExample}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {sec.topics.map((t) => (
                <div key={t.name}
                     className="flex items-start gap-3 p-3 rounded-xl"
                     style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-brand-400 mt-0.5">▸</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{t.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note on KaTeX */}
      <div className="mt-12 card border-brand-500/30">
        <p className="text-sm text-slate-400">
          <strong className="text-white">Note:</strong> Full math pages with interactive LaTeX rendering
          (KaTeX) and runnable NumPy/PyTorch code cells will be added in v0.2.
          Install <code className="text-brand-300">@tailwindcss/typography</code> and enable the
          KaTeX CSS import in <code className="text-brand-300">globals.css</code> for rendered equations.
        </p>
      </div>
    </div>
  );
}
