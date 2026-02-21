'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Linkedin } from 'lucide-react';
import { aiIntegrationContent, capabilityGroups, profileLinks, projects, workHistory } from '@/lib/content';
import { RobloxCoverImage } from './RobloxCoverImage';

const panel =
  'rounded-3xl border border-white/15 bg-[#0a1120]/65 backdrop-blur-xl shadow-[0_0_40px_rgba(30,64,175,0.22)] transition duration-300 hover:border-cyan-200/40 hover:shadow-[0_0_45px_rgba(56,189,248,0.2)]';

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 text-white md:pt-24">
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glitch-text text-xs uppercase tracking-[0.25em] text-cyan-100/80">
        Now Serving · Systems + Spectacle
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mt-4 flex items-center gap-3">
          <RobloxCoverImage target="https://www.roblox.com/users/133970833/profile" alt="Roblox Avatar" className="h-14 w-14 overflow-hidden rounded-full border border-cyan-200/50" />
          <h1 className="bg-gradient-to-r from-cyan-100 via-white to-orange-200 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">Colten Lewis</h1>
        </div>
      </motion.div>
      <p className="mt-3 text-lg text-slate-200">Valkorianous · Roblox Systems Developer & Creative Producer</p>
      <p className="mt-4 max-w-2xl text-lg text-slate-200/90">I build scalable game systems, live experiences, and developer tools from prototype to production.</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href="#work-history" className="rounded-xl bg-cyan-400/90 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20">View Work</a>
        <a href="/projects" className="rounded-xl border border-orange-300/60 px-5 py-3 font-semibold text-orange-100 transition hover:bg-orange-300/10">Projects</a>
        <a href="/creations" className="rounded-xl border border-cyan-300/60 px-5 py-3 font-semibold text-cyan-100 transition hover:bg-cyan-300/10">Creations</a>
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-cyan-50">
        <a aria-label="LinkedIn profile" className="inline-flex items-center gap-2 hover:text-white" href={profileLinks.linkedIn} target="_blank"><Linkedin size={16} /> LinkedIn</a>
        <a className="inline-flex items-center gap-2 hover:text-white" href={profileLinks.creatorHub} target="_blank">Creator Hub</a>
        <a className="inline-flex items-center gap-2 hover:text-white" href={profileLinks.chesapeake} target="_blank">Chesapeake Studios</a>
      </div>
    </section>
  );
}

export function WorkHistoryPreview() {
  return (
    <section id="work-history" className={`reveal-on-scroll mx-auto mt-16 max-w-6xl px-4 py-8 ${panel}`}>
      <h2 className="text-3xl font-semibold text-white">Work History</h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {workHistory.map((entry) => (
            <article key={entry.id} className="rounded-2xl border border-white/15 bg-black/30 p-5 transition hover:border-cyan-200/30">
              <p className="text-sm text-cyan-100/80">{entry.company}</p>
              <h3 className="glitch-text text-xl font-semibold text-white">{entry.role}</h3>
              <p className="text-sm text-slate-300">{entry.dates}</p>
              {entry.summary.map((line) => <p key={line} className="mt-3 text-sm text-slate-100/90">{line}</p>)}
              <ul className="mt-3 space-y-2">
                {entry.links.map((link) => (
                  <li key={link.url + link.label}>
                    {link.url === '#' ? <span className="inline-flex items-center gap-2 text-sm text-slate-300">• {link.label}</span> : <a href={link.url} target="_blank" className="inline-flex items-center gap-2 text-sm text-orange-200 hover:text-orange-100">• {link.label} <ExternalLink size={14} /></a>}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-slate-900/80 via-[#101c34]/80 to-[#2f1a16]/80 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">Web Experience Highlight</p>
          <div className="code-window mt-4 rounded-xl border border-white/15 p-4 text-xs text-cyan-100/85">
            <p>{'>'} project: wai-and-aina-farms-pwa</p>
            <p>{'>'} platform: mobile + desktop PWA</p>
            <p>{'>'} modules: staffing / scheduling / animal tracking</p>
            <p>{'>'} analytics + AI snapshot reports: enabled</p>
          </div>
          <p className="mt-4 text-sm text-slate-300">Nov 2025 to Mar 2026 full-stack delivery focused on management ops and reporting velocity.</p>
        </div>
      </div>
    </section>
  );
}

export function FeaturedProjects() {
  return (
    <section className="mx-auto mt-14 max-w-6xl px-4" id="projects">
      <div className="mb-5 flex items-end justify-between text-white"><h2 className="text-3xl font-semibold">Featured Projects</h2><Link href="/projects" className="text-sm font-semibold">View all</Link></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <motion.article key={project.slug} whileHover={{ y: -4, scale: 1.01 }} className={`${panel} reveal-on-scroll p-4`}>
            <RobloxCoverImage target={project.url} alt={project.title} />
            <h3 className="mt-3 text-lg font-semibold text-white">{project.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">{project.roleBadges.map((b) => <span key={b} className="rounded-full bg-cyan-300/15 px-2 py-1 text-xs text-cyan-100">{b}</span>)}</div>
            <p className="mt-2 text-sm text-slate-200">{project.oneLiner}</p>
            <div className="mt-2 flex flex-wrap gap-2">{project.tags.map((t) => <Link key={t+project.slug} href={`/projects?tag=${encodeURIComponent(t)}`} className="text-xs text-orange-200 hover:text-orange-100">#{t}</Link>)}</div>
            <Link href={`/projects/${project.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-cyan-100">Deep Dive <ArrowRight size={14} /></Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="mx-auto mt-14 max-w-6xl px-4">
      <h2 className="text-3xl font-semibold text-white">Systems & Capabilities</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">{capabilityGroups.map((g) => <article key={g.title} className={`${panel} reveal-on-scroll p-5`}><h3 className="text-xl font-semibold text-cyan-100">{g.title}</h3><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-200">{g.items.map((i) => <li key={i}>{i}</li>)}</ul></article>)}</div>
    </section>
  );
}

export function AIIntegrationSection() {
  return (
    <section className="mx-auto mt-14 max-w-6xl px-4">
      <article className={`${panel} reveal-on-scroll p-6`}>
        <div className="flex items-center gap-2"><span className="text-orange-300">✦</span><h2 className="text-3xl font-semibold text-white">AI & Intelligent Systems Integration</h2></div>
        {aiIntegrationContent.intro.map((paragraph) => <p key={paragraph} className="mt-4 text-slate-200">{paragraph}</p>)}
        <h3 className="mt-6 text-xl font-semibold text-cyan-100">Applications and Systems</h3>
        <ul className="mt-3 space-y-3 text-slate-200">{aiIntegrationContent.applications.map((app) => <li key={app.title}><span className="font-semibold text-white">{app.title}</span> — {app.description}</li>)}</ul>
        <p className="mt-4 text-slate-200">{aiIntegrationContent.closing}</p>
      </article>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="mx-auto mt-14 max-w-6xl px-4 pb-12">
      <article className={`${panel} reveal-on-scroll p-6`}>
        <h2 className="text-3xl font-semibold text-white">About</h2>
        <p className="mt-3 max-w-3xl text-slate-200">I produce and program Roblox experiences with a systems-first mindset: define clear goals, ship clean architecture, and run dependable live operations. I specialize in bridging creative direction, technical execution, and production leadership.</p>
      </article>
      <footer className="mt-8 border-t border-white/20 pt-4 text-sm text-cyan-100">
        <div className="flex flex-wrap gap-3">
          <a href={profileLinks.linkedIn} target="_blank">LinkedIn</a>
          <a href={profileLinks.creatorHub} target="_blank">Creator Hub</a>
          <a href={profileLinks.chesapeake} target="_blank">Chesapeake Studios</a>
          <span>{profileLinks.discord}</span>
        </div>
      </footer>
    </section>
  );
}
