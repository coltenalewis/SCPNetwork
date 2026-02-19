'use client';

import { useEffect, useMemo, useState } from 'react';

const HERO_BACKDROP_URL =
  'https://media.discordapp.net/attachments/814008763530346507/1474158663538049228/7f2be857-ebe5-4ddc-b80b-cb067de43253.png?ex=6998d4bd&is=6997833d&hm=feedd7d47dc7c1d9b17f96cac6621a03f070633f76860e1ecacdc80a1a3bfd3a&=&format=webp&quality=lossless&width=656&height=438';

const previewPanels = [
  {
    title: '🌾 Farm Dashboard',
    points: ['11 active chores', '2 arrivals expected', 'Irrigation check at 14:00']
  },
  {
    title: '🗓️ Volunteer Schedule',
    points: ['Mon: Orchard support', 'Tue: Compost + seed trays', 'Wed: Animal round']
  },
  {
    title: '🐓 Animal Log',
    points: ['Daisy fed 07:00', 'Henhouse cleaned', 'Vet reminder in 2 weeks']
  },
  {
    title: '💬 Community Discussion',
    points: ['Soil restoration Q&A', 'Tool safety checklist', 'Host orientation template']
  }
];

const farmSkills = ['🌱 Seedling Care', '🚜 Tractor Basics', '🛠️ Fence Repair', '🐓 Animal Feeding', '🍲 Communal Cooking', '💧 Irrigation Checks'];

const protocolRows = [
  { animal: '🐐 Daisy', feed: 2.2, health: 98, milk: 3.6 },
  { animal: '🐐 Clover', feed: 2.6, health: 96, milk: 4.1 },
  { animal: '🐓 Hens', feed: 5.1, health: 94, milk: 0 },
  { animal: '🐄 Maple', feed: 8.4, health: 92, milk: 12.3 }
];

const forumSeed = [
  'How do you prepare volunteers for first-day tool safety? 🧰',
  'Any region-specific compost methods for wet climates? 🌧️',
  'Best communication rhythm before volunteer arrival? 💬',
  'Template for quiet-hours and shared-space agreements? 🏡'
];

const chatTimeline = [
  'Host typing: Welcome! We are excited for your arrival next week…',
  'Volunteer typing: Thank you! I reviewed your protocol summary and packing notes.',
  'Host typing: Great. I have now approved your pre-arrival onboarding packet.',
  'System: ✅ Farm owner approved — embedded onboarding unlocked.'
];

export default function HomePage() {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [error, setError] = useState('');
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [forumIndex, setForumIndex] = useState(0);
  const [protocolFrame, setProtocolFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPreviewIndex((p) => (p + 1) % previewPanels.length), 3800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!videoPlaying) return;
    const id = setInterval(() => {
      setVideoProgress((p) => {
        if (p >= 100) {
          setVideoPlaying(false);
          return 100;
        }
        return p + 5;
      });
    }, 180);
    return () => clearInterval(id);
  }, [videoPlaying]);

  useEffect(() => {
    const current = chatTimeline[typedIndex];
    if (!current) return;
    if (typedText.length < current.length) {
      const t = setTimeout(() => setTypedText(current.slice(0, typedText.length + 1)), 25);
      return () => clearTimeout(t);
    }
    const pause = setTimeout(() => {
      if (typedIndex < chatTimeline.length - 1) {
        setTypedIndex((i) => i + 1);
        setTypedText('');
      }
    }, 1200);
    return () => clearTimeout(pause);
  }, [typedText, typedIndex]);

  useEffect(() => {
    const id = setInterval(() => setForumIndex((i) => (i + 1) % forumSeed.length), 1800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setProtocolFrame((f) => f + 1), 1100);
    return () => clearInterval(id);
  }, []);

  const canContinue = useMemo(() => {
    if (step === 0) return name.trim().length > 1;
    if (step === 1) return skills.length > 0;
    if (step === 2) return contractAccepted;
    if (step === 3) return videoProgress >= 100;
    return true;
  }, [step, name, skills, contractAccepted, videoProgress]);

  const nextStep = () => {
    if (!canContinue) {
      if (step === 0) setError('Please add your name or preferred nickname.');
      if (step === 1) setError('Please choose at least one farm-specific skill.');
      if (step === 2) setError('Please acknowledge the mini farm agreement.');
      if (step === 3) setError('Please finish the safety video to unlock the next step.');
      return;
    }
    setError('');
    setStep((s) => Math.min(s + 1, 4));
  };

  return (
    <div className="min-h-screen w-full bg-[#efe8d8] text-[#2a2f22]">
      <section
        className="relative min-h-[95vh] w-full overflow-hidden border-b border-white/20"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(44,97,109,0.56), rgba(94,56,120,0.45), rgba(224,142,56,0.24)), url(${HERO_BACKDROP_URL}), url('/wwoof-backdrop.svg')`,
          backgroundSize: 'cover, cover, cover',
          backgroundPosition: 'center, center, center'
        }}
      >
        <div className="absolute inset-0 backdrop-blur-[3px]" />
        <div className="relative mx-auto grid w-full max-w-[1600px] gap-7 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-16">
          <div className="rounded-[2rem] bg-[#f8f2e6]/88 p-6 shadow-2xl ring-1 ring-white/60 md:p-10">
            <p className="mb-4 inline-flex rounded-full bg-[#e6d5b6] px-4 py-1 text-sm font-semibold">🌍 A Unified Support Platform for the Global WWOOF Community</p>
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">Technology as a calm support layer for trust, preparedness, and meaningful exchange.</h1>
            <p className="mt-4 text-lg leading-relaxed text-[#494930]">
              Hello, my name is Colten Lewis. I’m a 23-year-old game developer and web programmer, and I’ve been WWOOFing for nearly five months. During my time at Wai & Aina Farm, I built an internal web application to support daily operations, improve time management, and provide clearer farm analysis. This proposal expands that learning into a broader WWOOF support platform.
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#5f5a3f]">Prepared by Colten Lewis</p>
            <a href="#vetting" className="mt-6 inline-flex rounded-full bg-[#2f6f49] px-6 py-3 font-semibold text-white transition hover:bg-[#24583a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6f49]">
              🌱 Jump to enhanced vetting + onboarding demo
            </a>
          </div>

          <div className="rounded-[2rem] bg-[#f6f2e8]/90 p-5 shadow-2xl ring-1 ring-white/60 md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">✨ Live Concept Preview</h2>
              <span className="text-sm text-[#655b45]">{previewIndex + 1} / {previewPanels.length}</span>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#e9f3e3] via-[#f7efe1] to-[#ffe8cc]">
              {previewPanels.map((panel, i) => (
                <article
                  key={panel.title}
                  className={`absolute inset-4 rounded-2xl border border-[#d6c8ad] bg-white/88 p-4 transition duration-700 ${
                    i === previewIndex ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                >
                  <h3 className="text-lg font-semibold text-[#2d6644]">{panel.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {panel.points.map((p) => (
                      <li key={p} className="rounded-xl bg-[#f7f2e8] px-3 py-2">{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1600px] space-y-8 px-4 py-10 md:px-10">
        <section id="vetting" className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
          <h2 className="text-2xl font-semibold">🤝 Enhanced Vetting Through Transparency and Preparation</h2>
          <p className="mt-3 leading-relaxed text-[#514a36]">
            After standard WWOOF approval, hosts can optionally share practical protocols, expectations, schedules, and safety routines. Volunteers can contribute useful context around skills, dietary needs, physical capabilities, language preferences, and logistics. The goal is better clarity before arrival and stronger placement outcomes.
          </p>

          <details className="mt-5 rounded-2xl border border-[#d8caaf] bg-white p-4" open>
            <summary className="cursor-pointer text-lg font-semibold">🧭 Expand interactive onboarding demo</summary>
            <div className="mt-4 grid gap-5 md:grid-cols-2">
              <div>
                <p className="text-sm text-[#4f4835]">Step {Math.min(step + 1, 5)} of 5</p>
                <div className="mt-2 h-2 rounded-full bg-[#cfe2c6]">
                  <div className="h-2 rounded-full bg-[#4c8654] transition-all" style={{ width: `${(Math.min(step + 1, 5) / 5) * 100}%` }} />
                </div>
              </div>
              <div className="rounded-2xl bg-[#fffdf9] p-4 ring-1 ring-[#dbcdb0]">
                <h3 className="font-semibold">✅ Volunteer readiness wizard</h3>
                {error && <p className="mt-2 rounded-xl bg-[#fff2e7] p-2 text-sm text-[#9f4f20]">{error}</p>}
                <div className="mt-4 min-h-[250px]">
                  {step === 0 && (
                    <div className="space-y-3">
                      <p className="text-sm text-[#5a5038]">1) Name or preferred nickname</p>
                      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Colten / Col" className="w-full rounded-xl border border-[#d8cab0] p-3" />
                    </div>
                  )}
                  {step === 1 && (
                    <div>
                      <p className="mb-3 text-sm text-[#5a5038]">2) Select farm-specific skills</p>
                      <div className="grid grid-cols-2 gap-2">
                        {farmSkills.map((skill) => {
                          const active = skills.includes(skill);
                          return (
                            <button
                              key={skill}
                              onClick={() => setSkills((prev) => (active ? prev.filter((s) => s !== skill) : [...prev, skill]))}
                              className={`rounded-xl border p-2 text-left text-sm transition active:scale-[0.98] ${active ? 'border-[#4c8654] bg-[#edf7ea]' : 'border-[#ddceb3] bg-[#fffdf9]'}`}
                            >
                              {skill} {active ? '✅' : ''}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="space-y-3">
                      <p className="text-sm text-[#5a5038]">3) Mini contract acknowledgement</p>
                      <div className="rounded-2xl bg-[#f8f3e8] p-3 text-sm text-[#534a36]">
                        I agree to respect quiet hours, animal handling rules, shared kitchen standards, and emergency communication procedures.
                      </div>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={contractAccepted} onChange={(e) => setContractAccepted(e.target.checked)} />
                        I acknowledge and accept this farm agreement.
                      </label>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="space-y-3">
                      <p className="text-sm text-[#5a5038]">4) Safety video simulation</p>
                      <button onClick={() => videoProgress < 100 && setVideoPlaying(true)} className="rounded-full bg-[#2f6f49] px-4 py-2 text-sm font-semibold text-white">▶️ Play safety video</button>
                      <div className="h-3 rounded-full bg-[#dfd3bc]">
                        <div className="h-3 rounded-full bg-[#4f8a58] transition-all" style={{ width: `${videoProgress}%` }} />
                      </div>
                      <p className="text-sm text-[#5a5038]">Progress: {videoProgress}% {videoProgress >= 100 ? '✅ Complete' : '⏳ In progress'}</p>
                    </div>
                  )}
                  {step === 4 && <div className="rounded-2xl bg-[#ecf8e8] p-4 text-[#35623a]">🎉 Onboarding complete! Ready for arrival support.</div>}
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-full border border-[#d2c3a8] px-4 py-2">Back</button>
                  <button onClick={nextStep} className="rounded-full bg-[#e08a3c] px-4 py-2 font-semibold text-white">Next</button>
                </div>
              </div>
            </div>
          </details>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
            <h3 className="text-xl font-semibold">💬 Moderated Communication and Pre-Arrival Connection</h3>
            <p className="mt-2 text-[#514a36]">A calm, moderated flow helps hosts and volunteers coordinate respectfully and consistently.</p>
            <div className="mt-4 rounded-2xl bg-[#fff] p-4 ring-1 ring-[#d9cab0]">
              <p className="min-h-[50px] rounded-xl bg-[#f6f2e8] p-3 text-sm font-mono">{typedText}<span className="animate-pulse">|</span></p>
              <div className="mt-3 rounded-xl border border-dashed border-[#d8caaf] bg-[#f9f5ec] p-3 text-sm text-[#5c523b]">
                <p className="font-semibold">Embedded onboarding section (preview only)</p>
                <p className="mt-1">[ Profile ✅ ] [ Skills ✅ ] [ Contract ✅ ] [ Safety video 🔒 ]</p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
            <h3 className="text-xl font-semibold">🐐 Farm Protocols, Animal Care Context, and Daily Life Orientation</h3>
            <p className="mt-2 text-[#514a36]">Animated operations snapshot with changing values, goat context, and a mini yield graph.</p>
            <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-[#d9cab0]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f5efe1]">
                  <tr>
                    <th className="p-2">Animal</th>
                    <th className="p-2">Feed kg</th>
                    <th className="p-2">Health</th>
                    <th className="p-2">Milk L</th>
                  </tr>
                </thead>
                <tbody>
                  {protocolRows.map((row, i) => {
                    const wobble = ((protocolFrame + i) % 3) * 0.1;
                    return (
                      <tr key={row.animal} className="border-t border-[#eee3cf]">
                        <td className="p-2">{row.animal}</td>
                        <td className="p-2">{(row.feed + wobble).toFixed(1)}</td>
                        <td className="p-2">{Math.max(88, row.health - ((protocolFrame + i) % 4))}%</td>
                        <td className="p-2">{Math.max(0, row.milk + wobble).toFixed(1)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="p-3">
                <p className="text-xs text-[#675e45]">Mini milk yield trend 🥛</p>
                <div className="mt-2 flex h-16 items-end gap-2">
                  {[42, 51, 47, 58, 62, 55].map((h, i) => (
                    <div key={h + i} className="w-6 rounded-t bg-[#80a869] transition-all" style={{ height: `${h + ((protocolFrame + i) % 4) * 2}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-3xl bg-[#faf4e8] p-6 ring-1 ring-[#ddcfb4]">
          <h3 className="text-2xl font-semibold">🌐 Global Community Layer</h3>
          <p className="mt-2 text-[#514a36]">An animated forum feed shows practical questions and peer-to-peer support in motion.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[0, 1, 2, 3].map((i) => {
              const idx = (forumIndex + i) % forumSeed.length;
              return (
                <article key={`${idx}-${i}`} className="rounded-2xl bg-white p-4 ring-1 ring-[#d9cab0] transition hover:-translate-y-0.5">
                  <p className="text-sm font-semibold">{forumSeed[idx]}</p>
                  <p className="mt-2 text-xs text-[#6b6248]">Replies: {6 + ((forumIndex + i) % 9)} · Upvotes: {14 + ((forumIndex + i) % 20)}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl bg-[#f4ecdd] p-8 text-center ring-1 ring-[#d8c8aa]">
          <h2 className="text-2xl font-semibold">✨ Supporting the Future of Meaningful Agricultural Exchange</h2>
          <p className="mt-2 text-[#554d39]">
            This proposal is intended to strengthen trust, preparedness, and resilience across WWOOF while preserving local autonomy and cultural diversity.
          </p>
          <p className="mt-4 font-medium">Prepared by Colten Lewis</p>
          <p className="mt-2 font-medium">📧 coltenalewis@gmail.com · ☎️ 317-602-0112</p>
        </section>
      </main>

      <footer className="w-full border-t border-[#ddcfb4] bg-[#efe3ce] px-4 py-6 text-center text-sm text-[#5e5541]">
        Proposal microsite concept for WWOOF global coordination and community resilience.
      </footer>
    </div>
  );
}
