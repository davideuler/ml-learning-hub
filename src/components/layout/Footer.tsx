export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} ML Learning Hub — Built for Python engineers.</p>
        <div className="flex gap-6">
          <a href="/roadmap"  className="hover:text-slate-300 transition-colors">Roadmap</a>
          <a href="/courses"  className="hover:text-slate-300 transition-colors">Courses</a>
          <a href="/projects" className="hover:text-slate-300 transition-colors">Projects</a>
        </div>
      </div>
    </footer>
  );
}
