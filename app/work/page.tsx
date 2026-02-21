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
    <main className="mx-auto max-w-5xl px-4 py-10 text-white">
      <Link href="/" className="text-sm text-cyan-200">← Back</Link>
      <h1 className="mt-3 text-4xl font-semibold">Work History</h1>
      <p className="mt-2 text-slate-300">Recruiter skim page for production leadership, systems ownership, and shipped Roblox work.</p>
      <section className="mt-8 space-y-4 rounded-3xl border border-white/15 bg-[#081122]/75 p-5 backdrop-blur-xl">
        {workHistory.map((entry) => {
          const expanded = open.includes(entry.id);
          return (
            <article key={entry.id} className="rounded-2xl border border-white/15 bg-black/30 p-4">
              <button onClick={() => toggle(entry.id)} className="flex w-full items-center justify-between text-left" aria-expanded={expanded}>
                <div>
                  <p className="text-sm text-cyan-100/85">{entry.company}</p>
                  <h2 className="text-2xl font-semibold">{entry.role}</h2>
                  <p className="text-sm text-slate-300">{entry.dates}</p>
                </div>
                <ChevronDown className={expanded ? 'rotate-180 transition' : 'transition'} />
              </button>
              {expanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  {entry.summary.map((s) => <p key={s} className="mt-3 text-sm text-slate-100/90">{s}</p>)}
                  <ul className="mt-4 grid gap-3 md:grid-cols-2">
                    {entry.links.map((link) => (
                      <li key={link.url} className="rounded-xl border border-white/10 bg-black/20 p-3">
                        <RobloxCoverImage target={link.url} alt={link.label} />
                        <a href={link.url} target="_blank" className="mt-2 inline-flex items-center gap-2 text-sm text-orange-200">{link.label} <ExternalLink size={14} /></a>
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
