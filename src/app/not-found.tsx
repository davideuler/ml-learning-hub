import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <div className="text-7xl mb-6">🤖</div>
      <h1 className="text-4xl font-extrabold text-white mb-4">404 — Not Found</h1>
      <p className="text-slate-400 mb-8">
        This page hasn't been built yet — or the gradient vanished during backprop.
      </p>
      <Link href="/"
            className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-colors">
        Back to Homepage
      </Link>
    </div>
  );
}
