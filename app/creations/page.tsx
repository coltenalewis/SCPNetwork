import Link from 'next/link';
import { personalCreations } from '@/lib/content';

export default function CreationsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-white">
      <Link href="/" className="text-sm text-cyan-200">← Back</Link>
      <h1 className="mt-3 text-4xl font-semibold">Personal Projects & Creations</h1>
      <p className="mt-2 text-slate-300">Environmental art studies, UI explorations, and gameplay system showcases.</p>

      <section className="mt-8 rounded-2xl border border-white/15 bg-[#0a1120]/70 p-5">
        <h2 className="text-2xl font-semibold">Environmental Art Preview</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {personalCreations.environmentalArt.map((img) => (
            <img key={img} src={img} alt="Environmental art preview" className="h-52 w-full rounded-xl object-cover" />
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-white/15 bg-[#0a1120]/70 p-5">
        <h2 className="text-2xl font-semibold">Random Builds</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {personalCreations.randomBuilds.map((img) => (
            <img key={img} src={img} alt="Random build" className="h-52 w-full rounded-xl object-cover" />
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-white/15 bg-[#0a1120]/70 p-5">
        <h2 className="text-2xl font-semibold">Video Reels</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {personalCreations.videos.map((video) => (
            <video key={video} src={video} controls className="w-full rounded-xl" />
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 rounded-2xl border border-white/15 bg-[#0a1120]/70 p-5 lg:grid-cols-2">
        <article>
          <h2 className="text-2xl font-semibold">Sketchfab Embeds</h2>
          <div className="mt-3 space-y-4">
            {personalCreations.sketchfabEmbeds.map((src) => (
              <iframe key={src} src={src} title="Sketchfab model" className="h-72 w-full rounded-xl border border-white/10" allow="autoplay; fullscreen; xr-spatial-tracking" />
            ))}
          </div>
        </article>
        <article>
          <h2 className="text-2xl font-semibold">UI Inspiration</h2>
          <img src={personalCreations.uiReference} alt="Witcher UI inspiration" className="mt-3 w-full rounded-xl object-cover" />
        </article>
      </section>
    </main>
  );
}
