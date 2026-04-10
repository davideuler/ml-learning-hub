import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BilingualText } from '@/components/common/BilingualText';
import { COURSE_MODULES, getModuleLesson } from '@/lib/courseModules';

type RouteParams = {
  courseSlug: string;
  moduleSlug: string;
};

export function generateStaticParams() {
  return COURSE_MODULES.flatMap((course) =>
    course.modules.map((module) => ({ courseSlug: course.courseSlug, moduleSlug: module.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { courseSlug, moduleSlug } = await params;
  const result = getModuleLesson(courseSlug, moduleSlug);
  if (!result) {
    return { title: 'Module Not Found' };
  }

  return {
    title: `${result.module.title.en} | ${result.course.courseTitle.en}`,
    description: result.module.summary.en,
  };
}

export default async function CourseModulePage({ params }: { params: Promise<RouteParams> }) {
  const { courseSlug, moduleSlug } = await params;
  const result = getModuleLesson(courseSlug, moduleSlug);
  if (!result) notFound();

  const { course, module } = result;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <nav className="text-sm text-[var(--text-muted)] mb-8 flex flex-wrap gap-2">
        <Link href="/courses" className="hover:text-[var(--text-primary)]"><BilingualText en="Courses" zh="课程" /></Link>
        <span>/</span>
        <Link href={`/courses/${course.courseSlug}`} className="hover:text-[var(--text-primary)]">{course.courseTitle.en}</Link>
        <span>/</span>
        <span className="text-[var(--text-primary)]">{module.title.en}</span>
      </nav>

      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="badge badge-blue"><BilingualText en={`Module ${module.order}`} zh={`模块 ${module.order}`} /></span>
          <span className="text-sm text-[var(--text-muted)]">{course.courseTitle.en}</span>
        </div>
        <h1 className="text-4xl font-extrabold text-[var(--text-primary)] mb-3">
          <BilingualText en={module.title.en} zh={module.title.zh} />
        </h1>
        <p className="text-lg text-[var(--text-muted)] max-w-3xl">
          <BilingualText en={module.summary.en} zh={module.summary.zh} />
        </p>
      </div>

      <div className="card mb-8">
        <h2 className="font-bold text-[var(--text-primary)] mb-3"><BilingualText en="Why this module matters" zh="为什么这个模块重要" /></h2>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed"><BilingualText en={module.whyItMatters.en} zh={module.whyItMatters.zh} /></p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="font-bold text-[var(--text-primary)] mb-3"><BilingualText en="Prerequisites" zh="先修要求" /></h2>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            {module.prerequisites.en.map((item, idx) => (
              <li key={item}>▸ <BilingualText en={item} zh={module.prerequisites.zh[idx] ?? item} /></li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="font-bold text-[var(--text-primary)] mb-3"><BilingualText en="Learning objectives" zh="学习目标" /></h2>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            {module.objectives.en.map((item, idx) => (
              <li key={item}>▸ <BilingualText en={item} zh={module.objectives.zh[idx] ?? item} /></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="font-bold text-[var(--text-primary)] mb-3"><BilingualText en="Core concepts" zh="核心概念" /></h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {module.concepts.en.map((item, idx) => (
            <div key={item} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="text-sm text-[var(--text-primary)] font-semibold mb-1"><BilingualText en={item} zh={module.concepts.zh[idx] ?? item} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="font-bold text-[var(--text-primary)] mb-3"><BilingualText en="Hands-on practice" zh="动手练习" /></h2>
        <ul className="space-y-2 text-sm text-[var(--text-muted)]">
          {module.practice.en.map((item, idx) => (
            <li key={item}>▸ <BilingualText en={item} zh={module.practice.zh[idx] ?? item} /></li>
          ))}
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="font-bold text-[var(--text-primary)] mb-3"><BilingualText en="Expected output" zh="阶段产出" /></h2>
          <p className="text-sm text-[var(--text-muted)]"><BilingualText en={module.output.en} zh={module.output.zh} /></p>
        </div>
        <div className="card border-yellow-500/20">
          <h2 className="font-bold text-[var(--text-primary)] mb-3"><BilingualText en="Common mistakes" zh="常见错误" /></h2>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            {module.commonMistakes.en.map((item, idx) => (
              <li key={item}>⚠️ <BilingualText en={item} zh={module.commonMistakes.zh[idx] ?? item} /></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card border-brand-500/20">
        <h2 className="font-bold text-[var(--text-primary)] mb-3"><BilingualText en="How to continue" zh="下一步怎么学" /></h2>
        <p className="text-sm text-[var(--text-muted)] mb-4"><BilingualText en={module.nextStep.en} zh={module.nextStep.zh} /></p>
        <Link href={`/courses/${course.courseSlug}`} className="text-sm text-brand-300 hover:text-brand-200 font-medium">
          <BilingualText en="Back to course overview →" zh="回到课程总览 →" />
        </Link>
      </div>
    </div>
  );
}
