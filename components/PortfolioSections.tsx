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
    <section className="mx-auto max-w-4xl px-6 pt-24 md:pt-32">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center gap-5">
          <RobloxCoverImage
            target="https://www.roblox.com/users/133970833/profile"
            alt="Roblox Avatar"
            className="pond-rock-avatar relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full"
          />
          <div>
            <h1 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--ink)' }}>
              Colten Lewis
            </h1>
            <p className="mt-1 text-[15px] font-medium" style={{ color: 'var(--ink-mute)' }}>
              Roblox Systems Developer & Creative Producer
            </p>
          </div>
        </div>
      </motion.div>

      <p className="mt-8 max-w-2xl text-[17px] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
        8+ years building on Roblox — from early passion projects to producing live-ops titles with 70M+ combined visits.
        I ship scalable game systems, lead cross-functional dev teams, and own full-lifecycle production from concept through live service.
      </p>

      <p className="mt-3 text-sm" style={{ color: 'var(--ink-mute)' }}>
        Primary timezone: EST (Eastern Standard Time)
      </p>

      {/* Buttons act as "rocks" — solid elements the water ripples around */}
      <div className="pond-rock-row mt-8">
        <a href="#work-history" className="btn-fill">View Work</a>
        <a href="/projects" className="btn-ghost">Projects</a>
        <a href="/creations" className="btn-ghost">Creations</a>
        <a href="/code-example" className="btn-ghost">Code Example</a>
        <a href="/schedule" className="btn-ghost">Client Portal</a>
      </div>

      <div className="pond-rock-links mt-6 text-sm" style={{ color: 'var(--ink-mute)' }}>
        <a aria-label="LinkedIn profile" className="inline-flex items-center gap-2 transition-colors hover:text-[var(--ink)]" href={profileLinks.linkedIn} target="_blank">
          <Linkedin size={15} /> LinkedIn
        </a>
        <a className="inline-flex items-center gap-2 transition-colors hover:text-[var(--ink)]" href={profileLinks.creatorHub} target="_blank">
          <Roblox size={15} /> Creator Hub
        </a>
      </div>

      <div className="divider mt-14" />
    </section>
  );
}

export function WorkHistoryPreview() {
  return (
    <section id="work-history" className="mx-auto mt-16 max-w-4xl px-6">
      <h2 className="heading heading-accent">Work History</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {workHistory.map((entry) => (
          <article key={entry.id} className="card reveal-on-scroll p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--accent)' }}>{entry.company}</p>
            <h3 className="mt-1 font-display text-xl" style={{ color: 'var(--ink)' }}>{entry.role}</h3>
            <p className="mt-1 text-sm" style={{ color: 'var(--ink-mute)' }}>{entry.dates}</p>
            {entry.summary.map((line) => (
              <p key={line} className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{line}</p>
            ))}
            {entry.id === 'wai-and-aina-farms' && (
              <img src={waiImage} alt="Wai and Aina website" className="mt-4 w-full rounded-xl" style={{ border: '1px solid var(--border)' }} />
            )}
            <ul className="mt-4 space-y-2">
              {entry.links.map((link) => (
                <li key={link.url + link.label}>
                  {link.url === '#' ? (
                    <span className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--ink-mute)' }}>· {link.label}</span>
                  ) : (
                    <a href={link.url} target="_blank" className="link-accent">
                      · {link.label} <ExternalLink size={13} />
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
    <section className="mx-auto mt-20 max-w-4xl px-6" id="projects">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="heading heading-accent">Featured Projects</h2>
        <Link href="/projects" className="link-accent">
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.article key={project.slug} whileHover={{ y: -3 }} className="card reveal-on-scroll overflow-hidden">
            <RobloxCoverImage target={project.url} alt={project.title} />
            <div className="p-5">
              <h3 className="font-display text-lg" style={{ color: 'var(--ink)' }}>{project.title}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.roleBadges.map((b) => (
                  <span key={b} className="badge">{b}</span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{project.oneLiner}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <Link key={t + project.slug} href={`/projects?tag=${encodeURIComponent(t)}`} className="text-xs transition-colors" style={{ color: 'var(--accent)' }}>
                    #{t}
                  </Link>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="link-accent mt-4">
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
    <section id="capabilities" className="mx-auto mt-20 max-w-4xl px-6">
      <h2 className="heading heading-accent">Systems & Capabilities</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {capabilityGroups.map((g) => (
          <article key={g.title} className="card reveal-on-scroll p-6">
            <h3 className="font-display text-xl" style={{ color: 'var(--accent)' }}>{g.title}</h3>
            <ul className="mt-4 space-y-2 pl-4 text-sm leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
              {g.items.map((i) => (
                <li key={i} className="relative pl-3 before:absolute before:left-0 before:top-[10px] before:h-[4px] before:w-[4px] before:rounded-full" style={{ ['--tw-before-bg' as string]: 'var(--accent)' }}>
                  <span className="before:bg-[var(--accent)]">{i}</span>
                </li>
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
    <section className="mx-auto mt-20 max-w-4xl px-6">
      <article className="card reveal-on-scroll p-8">
        <h2 className="heading heading-accent">AI & Intelligent Systems</h2>
        <p className="mt-5" style={{ color: 'var(--ink-soft)' }}>
          I use AI as a practical production tool for faster delivery, cleaner workflows, and better decision support.
        </p>
        <ul className="mt-4 space-y-3 pl-4" style={{ color: 'var(--ink-soft)' }}>
          {aiIntegrationContent.applications.slice(0, 3).map((app) => (
            <li key={app.title} className="text-[15px] leading-relaxed">
              <span className="font-semibold" style={{ color: 'var(--ink)' }}>{app.title}:</span> {app.description}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="mx-auto mt-20 max-w-4xl px-6 pb-20">
      <article className="card reveal-on-scroll p-8">
        <h2 className="heading heading-accent">About</h2>
        <p className="mt-5 max-w-3xl leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          I produce and program Roblox experiences with a systems-first mindset: define clear goals, ship clean architecture, and run dependable live operations.
        </p>
      </article>

      <article className="card mt-6 p-8">
        <h3 className="font-display text-xl" style={{ color: 'var(--ink)' }}>Work Status</h3>
        <p className="mt-3 flex items-center gap-2" style={{ color: 'var(--ink-soft)' }}>
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" /> Available for full-time work.
        </p>
        <p className="mt-2 text-sm" style={{ color: 'var(--ink-mute)' }}>Payment method: USD only. Payment type can be negotiated.</p>
        <p className="mt-1 text-sm" style={{ color: 'var(--ink-mute)' }}>Email: coltenalewis@gmail.com</p>
      </article>

      <footer className="divider mt-12" />
      <div className="mt-5 flex flex-wrap gap-5 text-sm" style={{ color: 'var(--ink-mute)' }}>
        <a href={profileLinks.linkedIn} target="_blank" className="transition-colors hover:text-[var(--ink)]">LinkedIn</a>
        <a href={profileLinks.creatorHub} target="_blank" className="transition-colors hover:text-[var(--ink)]">Creator Hub</a>
        <span style={{ color: 'var(--accent-light)' }}>CocoDev</span>
      </div>
    </section>
  );
}
