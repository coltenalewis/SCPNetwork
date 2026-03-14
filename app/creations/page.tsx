import Link from 'next/link';
import { personalCreations } from '@/lib/content';

const mapToolImage =
  'https://media.discordapp.net/attachments/718569205397454888/1405944734853234760/image.png?ex=699b2891&is=6999d711&hm=f9ac71b2d38ad211dc51377876dd17e768aad34e7935865b7f8511983f12b7ea&=&format=webp&quality=lossless&width=1481&height=920';

export default function CreationsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <Link href="/" className="link-back">← Back</Link>
      <h1 className="mt-4 font-display text-4xl" style={{ color: 'var(--ink)' }}>Personal Projects & Creations</h1>
      <p className="mt-2 text-sm" style={{ color: 'var(--ink-mute)' }}>
        Interactive showcase of art, systems, and personal prototypes.
      </p>

      {/* 3D carousel */}
      <section className="card mt-10 overflow-hidden p-6">
        <div className="merry-stage">
          <div className="merry-ring">
            {personalCreations.environmentalArt.slice(0, 3).map((img, i) => (
              <article key={img} className={`merry-item merry-item-${i + 1}`}>
                <img src={img} alt="Creation preview" className="h-full w-full object-cover" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Map tool */}
      <section className="card mt-8 p-6">
        <h2 className="heading text-2xl">Python Map Chunk Builder Tool</h2>
        <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          Built a custom Python utility that takes map PNG files, converts them into chunk-based world data, and outputs import-ready data for Roblox world
          generation pipelines.
        </p>
        <img src={mapToolImage} alt="Python chunk world builder screenshot" className="mt-5 w-full rounded-xl" style={{ border: '1px solid var(--border)' }} />
      </section>

      {/* Videos */}
      <section className="card mt-8 p-6">
        <h2 className="heading text-2xl">Video Reels</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {personalCreations.videos.map((video) => (
            <video key={video} src={video} controls className="w-full rounded-xl" style={{ border: '1px solid var(--border)' }} />
          ))}
        </div>
      </section>

      {/* Sketchfab + UI ref */}
      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="card p-6">
          <h2 className="heading text-2xl">Sketchfab Embeds</h2>
          <div className="mt-5 space-y-5">
            {personalCreations.sketchfabEmbeds.map((src) => (
              <iframe key={src} src={src} title="Sketchfab model" className="h-72 w-full rounded-xl" style={{ border: '1px solid var(--border)' }} allow="autoplay; fullscreen; xr-spatial-tracking" />
            ))}
          </div>
        </article>
        <article className="card p-6">
          <h2 className="heading text-2xl">UI Inspiration</h2>
          <img src={personalCreations.uiReference} alt="Witcher UI inspiration" className="mt-5 w-full rounded-xl object-cover" />
        </article>
      </section>
    </main>
  );
}
