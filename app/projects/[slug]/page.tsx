import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RobloxCoverImage } from '@/components/RobloxCoverImage';
import { projects } from '@/lib/content';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-white">
      <Link href="/projects" className="text-sm text-cyan-200">← Back to projects</Link>
      <h1 className="mt-3 text-4xl font-semibold">{project.title}</h1>
      <div className="mt-4"><RobloxCoverImage target={project.url} alt={project.title} /></div>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <Block title="Overview" body={project.overview} />
        <Block title="Responsibilities" list={project.responsibilities} />
        <Block title="Key systems delivered" list={project.systems} />
        <Block title="Technical highlights" list={project.highlights} />
      </section>
      <section className="mt-6 rounded-2xl border border-white/15 bg-[#0a1120]/70 p-5 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold">Problem → Solution → Outcome</h2>
        <p className="mt-2 text-slate-100"><strong>Problem:</strong> {project.problem}</p>
        <p className="mt-2 text-slate-100"><strong>Solution:</strong> {project.solution}</p>
        <p className="mt-2 text-slate-100"><strong>Outcome:</strong> {project.outcome}</p>
      </section>
      <section className="mt-6 rounded-2xl border border-white/15 bg-[#0a1120]/70 p-5 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold">Architecture Snapshot</h2>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-black/40 p-4 text-sm text-cyan-100">{`Client UI/Event Layer\n   ↓\nService Modules (Gameplay / Data / Admin)\n   ↓\nState + Persistence Adapters\n   ↓\nLive Ops Controls + Release Workflow`}</pre>
      </section>
    </main>
  );
}

function Block({ title, body, list }: { title: string; body?: string; list?: string[] }) {
  return (
    <article className="rounded-2xl border border-white/15 bg-[#0a1120]/70 p-5 backdrop-blur-xl">
      <h2 className="text-xl font-semibold">{title}</h2>
      {body ? <p className="mt-2 text-slate-200">{body}</p> : null}
      {list ? <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-200">{list.map((i)=><li key={i}>{i}</li>)}</ul> : null}
    </article>
  );
}
