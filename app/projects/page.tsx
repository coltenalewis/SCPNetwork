import Link from 'next/link';
import { RobloxCoverImage } from '@/components/RobloxCoverImage';
import { projects } from '@/lib/content';

const filters = ['All', 'Systems', 'Live Ops', 'UI', 'Performance', 'Production', 'Web Tools'];

export default function ProjectsPage({ searchParams }: { searchParams?: { tag?: string } }) {
  const active = searchParams?.tag && filters.includes(searchParams.tag) ? searchParams.tag : 'All';
  const list = projects.filter((p) => active === 'All' || p.tags.includes(active));

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-white">
      <Link href="/" className="text-sm text-cyan-200">← Back</Link>
      <h1 className="mt-3 text-4xl font-semibold">Projects</h1>
      <p className="mt-2 text-sm text-slate-300">Click any hashtag from cards across the site to jump directly into a filtered project set.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link key={f} href={f === 'All' ? '/projects' : `/projects?tag=${encodeURIComponent(f)}`} className={`rounded-full px-3 py-1 text-sm ${active === f ? 'bg-cyan-300 text-slate-950' : 'border border-white/30 bg-white/5 text-slate-100'}`}>
            #{f}
          </Link>
        ))}
      </div>
      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((project) => (
          <article key={project.slug} className="rounded-2xl border border-white/15 bg-[#0a1120]/70 p-4 backdrop-blur-xl">
            <RobloxCoverImage target={project.url} alt={project.title} />
            <h2 className="mt-3 text-lg font-semibold">{project.title}</h2>
            <p className="text-sm text-slate-200">{project.oneLiner}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags.map((projectTag) => (
                <Link key={projectTag + project.slug} href={`/projects?tag=${encodeURIComponent(projectTag)}`} className="text-xs text-orange-200 hover:text-orange-100">
                  #{projectTag}
                </Link>
              ))}
            </div>
            <Link href={`/projects/${project.slug}`} className="mt-2 inline-block text-sm font-semibold text-orange-200">Deep Dive</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
