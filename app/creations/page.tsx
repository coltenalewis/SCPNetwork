import Link from 'next/link';
import { personalCreations } from '@/lib/content';

const mapToolImage =
  'https://media.discordapp.net/attachments/718569205397454888/1405944734853234760/image.png?ex=699b2891&is=6999d711&hm=f9ac71b2d38ad211dc51377876dd17e768aad34e7935865b7f8511983f12b7ea&=&format=webp&quality=lossless&width=1481&height=920';

export default function CreationsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-white">
      <Link href="/" className="text-sm text-cyan-200">← Back</Link>
      <h1 className="mt-3 text-4xl font-semibold">Personal Projects & Creations</h1>
      <p className="mt-2 text-slate-300">Interactive showcase of art, systems, and personal prototypes.</p>

      <section className="mt-8 rounded-2xl border border-white/15 bg-[#0a1120]/70 p-5">
        <h2 className="text-2xl font-semibold">3D Showcase Carousel</h2>
        <p className="mt-2 text-sm text-slate-300">Hover a card to bring it to the front.</p>
        <div className="merry-stage mt-4">
          <div className="merry-ring">
            {personalCreations.environmentalArt.slice(0, 3).map((img, i) => (
              <article key={img} className={`merry-item merry-item-${i + 1}`}>
                <img src={img} alt="Creation preview" className="h-full w-full rounded-xl object-cover" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-white/15 bg-[#0a1120]/70 p-5">
        <h2 className="text-2xl font-semibold">Python Map Chunk Builder Tool</h2>
        <p className="mt-3 text-slate-200">
          Built a custom Python utility that takes map PNG files, converts them into chunk-based world data, and outputs import-ready data for Roblox world
          generation pipelines.
        </p>
        <img src={mapToolImage} alt="Python chunk world builder screenshot" className="mt-4 w-full rounded-xl border border-white/10" />
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
