import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RobloxCoverImage } from '@/components/RobloxCoverImage';
import { personalCreations, projects } from '@/lib/content';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/projects" className="link-back">← Back to projects</Link>
      <h1 className="mt-4 font-display text-4xl" style={{ color: 'var(--ink)' }}>{project.title}</h1>
      <div className="mt-6 overflow-hidden rounded-card" style={{ border: '1px solid var(--border)' }}>
        <RobloxCoverImage target={project.url} alt={project.title} className="relative h-52 w-full overflow-hidden" />
      </div>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <SimpleBlock title="Responsibilities" list={project.responsibilities} />
        <SimpleBlock title="Key Systems Delivered" list={project.systems} />
      </section>

      {project.media?.length ? (
        <section className="card mt-8 p-6">
          <h2 className="heading text-2xl">Implementation Media</h2>
          <div className="mt-5 grid gap-5">
            {project.media.map((item) => (
              <article key={item.url} className="card-flat overflow-hidden p-4">
                <p className="mb-3 text-sm font-medium" style={{ color: 'var(--ink-soft)' }}>{item.label}</p>
                <video className="w-full rounded-xl" controls src={item.url} />
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {project.slug === 'attack-on-titan-freedom-awaits' ? (
        <section className="card mt-8 p-6">
          <h2 className="font-display text-xl" style={{ color: 'var(--ink)' }}>Additional Contribution</h2>
          <p className="mt-3" style={{ color: 'var(--ink-soft)' }}>{personalCreations.marvelContribution.description}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-[2fr_1fr]">
            <video className="w-full rounded-xl" controls src={personalCreations.marvelContribution.video} />
            <a href={personalCreations.marvelContribution.gameLink} target="_blank" className="btn-ghost self-start">
              Open Marvel game link ↗
            </a>
          </div>
        </section>
      ) : null}
    </main>
  );
}

function SimpleBlock({ title, list }: { title: string; list: string[] }) {
  return (
    <article className="card p-6">
      <h2 className="font-display text-xl" style={{ color: 'var(--ink)' }}>{title}</h2>
      <ul className="mt-3 space-y-2 pl-4 text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
        {list.map((i) => <li key={i} className="relative pl-3 before:absolute before:left-0 before:top-[10px] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]">{i}</li>)}
      </ul>
    </article>
  );
}
