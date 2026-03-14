'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Linkedin, Roblox } from 'lucide-react';
import { aiIntegrationContent, capabilityGroups, profileLinks, projects, workHistory } from '@/lib/content';
import { RobloxCoverImage } from './RobloxCoverImage';

const waiImage =
  'https://media.discordapp.net/attachments/906169400258863114/1474901384934461653/image.png?ex=699b8874&is=699a36f4&hm=f11838aa7ca39d662a92e17b1317a70fec9a33a9ff7acdb8d96fffe909801a2a&=&format=webp&quality=lossless&width=1281&height=535';

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-20 md:pt-28">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-4">
          <RobloxCoverImage
            target="https://www.roblox.com/users/133970833/profile"
            alt="Roblox Avatar"
            className="relative h-20 w-20 overflow-hidden rounded-full border-2 bg-white/50 p-0.5 shadow-soft"
            style={{ borderColor: 'var(--cafe-gold)' }}
          />
          <div>
            <h1 className="font-display text-5xl font-bold tracking-tight text-cafe-ink md:text-6xl">
              Colten Lewis
            </h1>
            <p className="mt-1 text-lg font-medium text-cafe-muted">
              Roblox Systems Developer & Creative Producer
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 max-w-2xl">
        <p className="text-lg leading-relaxed text-cafe-mocha">
          8+ years building on Roblox — from early passion projects to producing live-ops titles with 70M+ combined visits. I ship scalable game systems, lead cross-functional dev teams, and own full-lifecycle production.
        </p>
        <p className="mt-3 text-sm text-cafe-muted">
          Primary timezone: EST (Eastern Standard Time)
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#work-history" className="btn-primary">View Work</a>
        <a href="/projects" className="btn-outline">Projects</a>
        <a href="/creations" className="btn-outline">Creations</a>
        <a href="/code-example" className="btn-outline">Code Example</a>
        <a href="/schedule" className="btn-outline">Client Portal</a>
      </div>

      <div className="mt-6 flex flex-wrap gap-5 text-sm text-cafe-muted">
        <a aria-label="LinkedIn profile" className="inline-flex items-center gap-2 transition hover:text-cafe-ink" href={profileLinks.linkedIn} target="_blank">
          <Linkedin size={16} /> LinkedIn
        </a>
        <a className="inline-flex items-center gap-2 transition hover:text-cafe-ink" href={profileLinks.creatorHub} target="_blank">
          <Roblox size={16} /> Creator Hub
        </a>
      </div>

      <div className="gold-divider mt-10" />
    </section>
  );
}

export function WorkHistoryPreview() {
  return (
    <section id="work-history" className="mx-auto mt-14 max-w-5xl px-4">
      <h2 className="section-title">Work History</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {workHistory.map((entry) => (
          <article key={entry.id} className="cafe-panel reveal-on-scroll p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-cafe-gold">{entry.company}</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-cafe-ink">{entry.role}</h3>
            <p className="mt-1 text-sm text-cafe-muted">{entry.dates}</p>
            {entry.summary.map((line) => (
              <p key={line} className="mt-3 text-sm leading-relaxed text-cafe-mocha">
                {line}
              </p>
            ))}
            {entry.id === 'wai-and-aina-farms' ? (
              <img src={waiImage} alt="Wai and Aina website" className="mt-4 w-full rounded-xl border border-cafe-gold/20" />
            ) : null}
            <ul className="mt-4 space-y-2">
              {entry.links.map((link) => (
                <li key={link.url + link.label}>
                  {link.url === '#' ? (
                    <span className="inline-flex items-center gap-2 text-sm text-cafe-muted">• {link.label}</span>
                  ) : (
                    <a href={link.url} target="_blank" className="inline-flex items-center gap-2 text-sm text-cafe-gold transition hover:text-cafe-espresso">
                      • {link.label} <ExternalLink size={14} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FeaturedProjects() {
  return (
    <section className="mx-auto mt-14 max-w-5xl px-4" id="projects">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="section-title">Featured Projects</h2>
        <Link href="/projects" className="cafe-link">
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.article key={project.slug} whileHover={{ y: -4, scale: 1.01 }} className="cafe-panel reveal-on-scroll overflow-hidden">
            <RobloxCoverImage target={project.url} alt={project.title} />
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold text-cafe-ink">{project.title}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.roleBadges.map((b) => (
                  <span key={b} className="cafe-badge">{b}</span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cafe-mocha">{project.oneLiner}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <Link key={t + project.slug} href={`/projects?tag=${encodeURIComponent(t)}`} className="text-xs text-cafe-gold transition hover:text-cafe-espresso">
                    #{t}
                  </Link>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="cafe-link mt-4">
                Deep Dive <ArrowRight size={14} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto mt-14 max-w-5xl px-4">
      <h2 className="section-title">Systems & Capabilities</h2>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {capabilityGroups.map((g) => (
          <article key={g.title} className="cafe-panel reveal-on-scroll p-6">
            <h3 className="font-display text-xl font-semibold text-cafe-gold">{g.title}</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-cafe-mocha">
              {g.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AIIntegrationSection() {
  return (
    <section className="mx-auto mt-14 max-w-5xl px-4">
      <article className="cafe-panel reveal-on-scroll p-6">
        <h2 className="section-title">AI & Intelligent Systems</h2>
        <p className="mt-4 text-cafe-mocha">I use AI as a practical production tool for faster delivery, cleaner workflows, and better decision support.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-cafe-mocha">
          {aiIntegrationContent.applications.slice(0, 3).map((app) => (
            <li key={app.title}>
              <span className="font-semibold text-cafe-ink">{app.title}:</span> {app.description}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="mx-auto mt-14 max-w-5xl px-4 pb-16">
      <article className="cafe-panel reveal-on-scroll p-6">
        <h2 className="section-title">About</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-cafe-mocha">
          I produce and program Roblox experiences with a systems-first mindset: define clear goals, ship clean architecture, and run dependable live operations.
        </p>
      </article>

      <article className="cafe-panel mt-6 p-6">
        <h3 className="font-display text-xl font-semibold text-cafe-ink">Work Status</h3>
        <p className="mt-3 flex items-center gap-2 text-cafe-mocha">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" /> Available for full-time work.
        </p>
        <p className="mt-2 text-sm text-cafe-muted">Payment method: USD only. Payment type can be negotiated.</p>
        <p className="mt-2 text-sm text-cafe-muted">Email: coltenalewis@gmail.com</p>
      </article>

      <footer className="mt-10 border-t pt-5 text-sm text-cafe-muted" style={{ borderColor: 'rgba(173,140,82,0.2)' }}>
        <div className="flex flex-wrap gap-4">
          <a href={profileLinks.linkedIn} target="_blank" className="transition hover:text-cafe-ink">LinkedIn</a>
          <a href={profileLinks.creatorHub} target="_blank" className="transition hover:text-cafe-ink">Creator Hub</a>
          <span className="text-cafe-latte">CocoDev</span>
        </div>
      </footer>
    </section>
  );
}
