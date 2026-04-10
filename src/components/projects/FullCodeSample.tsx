import { PROJECT_CODE_SAMPLES } from '@/lib/projectCodeSamples';

export function FullCodeSample({ projectSlug }: { projectSlug: keyof typeof PROJECT_CODE_SAMPLES }) {
  const sample = PROJECT_CODE_SAMPLES[projectSlug];

  return (
    <div className="card mb-10">
      <div className="mb-3">
        <h2 className="font-bold text-[var(--text-primary)]">Full runnable code / 完整可运行代码</h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          {sample.description} Save this as <span className="font-mono text-[var(--text-primary)]">{sample.filename}</span> and install the listed dependencies for the project stack.
          <br />
          {sample.description} 可将下面代码保存为 <span className="font-mono text-[var(--text-primary)]">{sample.filename}</span>，并安装对应项目依赖后直接运行。
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div>
          <h3 className="font-semibold text-[var(--text-primary)] mb-2">Dependencies / 依赖</h3>
          <ul className="text-sm space-y-2 text-[var(--text-muted)]">
            {sample.dependencies.map((dep) => <li key={dep}>▸ {dep}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-[var(--text-primary)] mb-2">Run commands / 运行命令</h3>
          <div className="space-y-2">
            {sample.runCommands.map((cmd) => (
              <pre key={cmd} className="text-xs leading-relaxed overflow-x-auto rounded-xl p-3">{cmd}</pre>
            ))}
          </div>
        </div>
      </div>
      <pre className="text-xs leading-relaxed overflow-x-auto rounded-xl p-4">{sample.code}</pre>
    </div>
  );
}
