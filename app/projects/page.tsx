import Link from 'next/link';
import { RobloxCoverImage } from '@/components/RobloxCoverImage';
import { projects } from '@/lib/content';

const filters = ['All', 'Systems', 'Live Ops', 'UI', 'Performance', 'Production', 'Web Tools'];

export default function ProjectsPage({ searchParams }: { searchParams?: { tag?: string } }) {
  const active = searchParams?.tag && filters.includes(searchParams.tag) ? searchParams.tag : 'All';
  const list = projects.filter((p) => active === 'All' || p.tags.includes(active));

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <Link href="/" className="link-back">← Back</Link>
      <h1 className="mt-4 font-display text-4xl" style={{ color: 'var(--ink)' }}>Projects</h1>
      <p className="mt-2 text-sm" style={{ color: 'var(--ink-mute)' }}>
        Click any hashtag from cards across the site to jump directly into a filtered project set.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f}
            href={f === 'All' ? '/projects' : `/projects?tag=${encodeURIComponent(f)}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === f
                ? 'text-white'
                : 'text-[var(--ink-soft)]'
            }`}
            style={active === f
              ? { background: 'var(--ink)', color: 'var(--bg)' }
              : { border: '1px solid var(--border)', background: 'var(--bg-card)' }
            }
          >
            #{f}
          </Link>
        ))}
      </div>
      <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((project) => (
          <article key={project.slug} className="card overflow-hidden">
            <RobloxCoverImage target={project.url} alt={project.title} />
            <div className="p-5">
              <h2 className="font-display text-lg" style={{ color: 'var(--ink)' }}>{project.title}</h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{project.oneLiner}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((projectTag) => (
                  <Link key={projectTag + project.slug} href={`/projects?tag=${encodeURIComponent(projectTag)}`} className="text-xs" style={{ color: 'var(--accent)' }}>
                    #{projectTag}
                  </Link>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="link-accent mt-4">Deep Dive <span>→</span></Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
