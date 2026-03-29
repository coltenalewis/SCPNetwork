'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { RobloxCoverImage } from '@/components/RobloxCoverImage';
import { workHistory } from '@/lib/content';

export default function WorkPage() {
  const [open, setOpen] = useState<string[]>(workHistory.map((w) => w.id));
  const toggle = (id: string) => setOpen((curr) => (curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]));

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/" className="link-back">← Back</Link>
      <h1 className="mt-4 font-display text-4xl" style={{ color: 'var(--ink)' }}>Work History</h1>
      <p className="mt-2 text-sm" style={{ color: 'var(--ink-mute)' }}>
        Production leadership, systems ownership, and shipped Roblox work.
      </p>

      <section className="mt-10 space-y-4">
        {workHistory.map((entry) => {
          const expanded = open.includes(entry.id);
          return (
            <article key={entry.id} className="card overflow-hidden">
              <button onClick={() => toggle(entry.id)} className="flex w-full items-center justify-between p-6 text-left" aria-expanded={expanded}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--accent)' }}>{entry.company}</p>
                  <h2 className="mt-1 font-display text-2xl" style={{ color: 'var(--ink)' }}>{entry.role}</h2>
                  <p className="mt-1 text-sm" style={{ color: 'var(--ink-mute)' }}>{entry.dates}</p>
                </div>
                <ChevronDown
                  size={20}
                  className={`shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                  style={{ color: 'var(--ink-mute)' }}
                />
              </button>
              {expanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-6">
                  {entry.summary.map((s) => (
                    <p key={s} className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{s}</p>
                  ))}
                  <ul className="mt-5 grid gap-4 md:grid-cols-2">
                    {entry.links.map((link) => (
                      <li key={link.url} className="card-flat overflow-hidden p-3">
                        <RobloxCoverImage target={link.url} alt={link.label} className="relative h-28 w-full overflow-hidden rounded-xl bg-surface-warm" />
                        {link.url === '#' ? (
                          <span className="mt-2 block text-sm" style={{ color: 'var(--ink-mute)' }}>{link.label}</span>
                        ) : (
                          <a href={link.url} target="_blank" className="link-accent mt-2">
                            {link.label} <ExternalLink size={13} />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
