'use client';

import { useEffect, useMemo, useState } from 'react';

const HERO_BACKDROP_URL =
  'https://media.discordapp.net/attachments/814008763530346507/1474158663538049228/7f2be857-ebe5-4ddc-b80b-cb067de43253.png?ex=6998d4bd&is=6997833d&hm=feedd7d47dc7c1d9b17f96cac6621a03f070633f76860e1ecacdc80a1a3bfd3a&=&format=webp&quality=lossless&width=656&height=438';

const scheduleDays = ['Mon', 'Tue', 'Wed', 'Thu'];

const scheduleData: Record<string, { title: string; owner: string; window: string; status: 'Queue' | 'In Progress' | 'Done' }[]> = {
  Mon: [
    { title: 'Irrigation manifold check', owner: 'Host Team', window: '07:30-08:15', status: 'Queue' },
    { title: 'Goat feed cycle A', owner: 'WWOOFer', window: '08:30-09:00', status: 'In Progress' },
    { title: 'Compost temperature log', owner: 'WWOOFer', window: '16:00-16:20', status: 'Done' }
  ],
  Tue: [
    { title: 'Seed tray prep', owner: 'WWOOFer', window: '08:00-09:10', status: 'Queue' },
    { title: 'Perimeter fence walk', owner: 'Host Team', window: '10:00-10:40', status: 'In Progress' },
    { title: 'Tool return plus inventory', owner: 'WWOOFer', window: '17:00-17:20', status: 'Done' }
  ],
  Wed: [
    { title: 'Livestock hydration audit', owner: 'Host Team', window: '07:00-07:45', status: 'Queue' },
    { title: 'Harvest lane sorting', owner: 'WWOOFer', window: '09:00-10:00', status: 'In Progress' },
    { title: 'Safety huddle', owner: 'All', window: '12:30-12:45', status: 'Done' }
  ],
  Thu: [
    { title: 'Drip line pressure map', owner: 'Host Team', window: '07:40-08:20', status: 'Queue' },
    { title: 'Egg station sanitation', owner: 'WWOOFer', window: '09:15-09:40', status: 'In Progress' },
    { title: 'Daily closeout report', owner: 'WWOOFer', window: '17:10-17:30', status: 'Done' }
  ]
};

const forumSeed = [
  'How are farms handling pre arrival allergy disclosures this season? 🌱',
  'Best template for tractor safety and competency tags? 🚜',
  'Any low cost protocols for storm evacuation readiness? 🌧️',
  'How do hosts structure first 48 hour orientation blocks? 🧭'
];

const baseLivestock = [
  { animal: '🐐 Daisy', dmi: 2.25, bcs: 3.4, fcr: 1.83, scc: 182000, milk: 3.6 },
  { animal: '🐐 Clover', dmi: 2.48, bcs: 3.3, fcr: 1.91, scc: 165000, milk: 4.1 },
  { animal: '🐄 Maple', dmi: 8.4, bcs: 3.1, fcr: 1.74, scc: 121000, milk: 12.3 },
  { animal: '🐓 Layer Coop', dmi: 5.1, bcs: 3.0, fcr: 2.11, scc: 0, milk: 0 }
];

const farmSkills = ['🌱 Seedling Care', '🚜 Tractor Basics', '🛠️ Fence Repair', '🐓 Animal Feeding', '🍲 Communal Cooking', '💧 Irrigation Checks'];

const threadMessages = [
  { from: 'Host - Farmer Joe', text: 'Hi. Thanks for confirming your dates. Have you reviewed livestock safety notes?', ts: '09:08' },
  { from: 'WWOOFer', text: 'Yes. I reviewed handling protocols and completed tool basics.', ts: '09:10' },
  { from: 'Host - Farmer Joe', text: 'Great. I am approving your pre arrival packet now.', ts: '09:11' },
  { from: 'System', text: 'Approval complete. Onboarding is now available.', ts: '09:12' }
];

export default function HomePage() {
  const [day, setDay] = useState<keyof typeof scheduleData>('Mon');
  const [forumIndex, setForumIndex] = useState(0);
  const [protocolFrame, setProtocolFrame] = useState(0);
  const [chatVisible, setChatVisible] = useState(1);

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setForumIndex((i) => (i + 1) % forumSeed.length), 5200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setProtocolFrame((f) => f + 1), 1200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setChatVisible((v) => Math.min(v + 1, threadMessages.length)), 1400);
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

  const canContinue = useMemo(() => {
    if (step === 0) return name.trim().length > 1;
    if (step === 1) return skills.length > 0;
    if (step === 2) return contractAccepted;
    if (step === 3) return videoProgress >= 100;
    return false;
  }, [step, name, skills, contractAccepted, videoProgress]);

  return (
    <div className="min-h-screen w-full bg-[#efe8d8] text-[#23281f]">
      <section
        className="relative min-h-[92vh] w-full overflow-hidden border-b border-white/20"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(7,16,23,0.72), rgba(19,26,36,0.7), rgba(24,45,49,0.58)), url(${HERO_BACKDROP_URL}), url('/wwoof-backdrop.svg')`,
          backgroundSize: 'cover, cover, cover',
          backgroundPosition: 'center, center, center'
        }}
      >
        <div className="absolute inset-0 bg-[#071019]/35 backdrop-blur-[2px]" />
        <div className="relative mx-auto grid w-full max-w-[1600px] gap-7 px-4 py-10 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-16">
          <div className="rounded-[2rem] bg-[#fff8eb]/95 p-6 shadow-2xl ring-1 ring-white/80 md:p-10">
            <p className="mb-4 inline-flex rounded-full bg-[#f0e1c3] px-4 py-1 text-sm font-semibold text-[#2c2d22]">🌍 A Unified Support Platform for the Global WWOOF Community</p>
            <h1 className="text-3xl font-semibold leading-tight text-[#1a241c] md:text-5xl">Technology as a calm support layer for trust, preparedness, and meaningful exchange.</h1>
            <p className="mt-5 text-base leading-relaxed text-[#414028] md:text-lg">
              This proposal outlines a digital platform designed to strengthen coordination, transparency, safety, and community across the global WWOOF network while preserving the human centered values that define the organization. Developed through firsthand experience working on an active host farm, the system focuses on practical tools that support daily operations, improve communication, and reduce uncertainty for both hosts and volunteers. Rather than replacing existing WWOOF application processes, the platform is intended to function as a complementary layer of preparation and ongoing support, helping ensure that placements begin with clear expectations, mutual understanding, and confidence on all sides.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#414028] md:text-lg">
              During extended work on a functioning organic farm, an internal web application was created to assist with task organization, time management, and operational visibility. The insights gained from real world use inform this broader concept: a unified environment where farms can share protocols, volunteers can prepare effectively, communication can remain structured and respectful, and both parties can maintain awareness throughout the exchange. The goal is not to introduce complexity, but to quietly remove friction so that the core experience of cultural exchange, learning, and sustainable agriculture can flourish.
            </p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#605a3e]">Prepared by Colten Lewis</p>
            <a href="#schedule" className="mt-6 inline-flex rounded-full bg-[#2f6f49] px-6 py-3 font-semibold text-white transition hover:bg-[#24583a]">Explore platform demos</a>
          </div>

          <div className="rounded-[2rem] bg-[#fff8eb]/92 p-5 shadow-2xl ring-1 ring-white/70 md:p-8">
            <h2 className="mb-3 text-xl font-semibold text-[#1a241c]">📌 Proposal preview</h2>
            <div className="space-y-3 text-sm text-[#4f4d33]">
              <p className="rounded-xl bg-white p-3 ring-1 ring-[#ddcfb4]">Operations scheduling for hosts and volunteers</p>
              <p className="rounded-xl bg-white p-3 ring-1 ring-[#ddcfb4]">Pre arrival communication with approval workflow</p>
              <p className="rounded-xl bg-white p-3 ring-1 ring-[#ddcfb4]">Animal telemetry dashboards and trend analysis</p>
              <p className="rounded-xl bg-white p-3 ring-1 ring-[#ddcfb4]">Configurable onboarding modules by farm</p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1600px] space-y-8 px-4 py-10 md:px-10">
        <section id="schedule" className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
          <h2 className="text-2xl font-semibold">🗓️ Farm operations schedule demo</h2>
          <p className="mt-2 text-[#4f4835]">Simplified hub style schedule board showing daily task windows, ownership, and execution status.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {scheduleDays.map((d) => (
              <button key={d} onClick={() => setDay(d as keyof typeof scheduleData)} className={`rounded-full px-4 py-2 text-sm ${day === d ? 'bg-[#2f6f49] text-white' : 'bg-[#eadfc7]'}`}>
                {d}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {['Queue', 'In Progress', 'Done'].map((column) => (
              <article key={column} className="rounded-2xl bg-white p-4 ring-1 ring-[#d8caaf]">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#665d43]">{column}</h3>
                <div className="mt-3 space-y-2">
                  {scheduleData[day]
                    .filter((item) => item.status === column)
                    .map((item) => (
                      <div key={item.title} className="rounded-xl bg-[#f7f2e8] p-3">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="mt-1 text-xs text-[#665d43]">Owner: {item.owner}</p>
                        <p className="text-xs text-[#665d43]">Window: {item.window}</p>
                      </div>
                    ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <article className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
              <h3 className="text-xl font-semibold">💬 Pre arrival communication thread</h3>
              <p className="mt-2 text-[#514a36]">Structured host to WWOOFer messaging with clear approval handoff and embedded onboarding access.</p>
              <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-[#d9cab0]">
                <div className="space-y-2">
                  {threadMessages.slice(0, chatVisible).map((m, i) => {
                    const isHost = m.from.includes('Host');
                    const isSystem = m.from === 'System';
                    return (
                      <div key={`${m.ts}-${i}`} className={`max-w-[88%] rounded-xl p-3 text-sm ${isSystem ? 'bg-[#e8f4e7] text-[#2d653a]' : isHost ? 'ml-auto bg-[#eef2ff]' : 'bg-[#f7f2e8]'}`}>
                        <p className="font-semibold">{m.from}</p>
                        <p>{m.text}</p>
                        <p className="mt-1 text-[11px] opacity-70">{m.ts}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex">
                  <a href="#onboarding" className="ml-auto inline-flex items-center rounded-full bg-[#2f6f49] px-4 py-2 text-sm font-semibold text-white shadow-sm">Onboarding &gt;</a>
                </div>
              </div>
            </article>

            <article id="onboarding" className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
              <h3 className="text-xl font-semibold">🤝 Enhanced vetting and onboarding module</h3>
              <p className="mt-2 text-[#514a36]">Optional post approval workflow, intentionally secondary to operations and communication systems.</p>
              <details className="mt-4 rounded-2xl border border-[#d8caaf] bg-white p-4">
                <summary className="cursor-pointer text-lg font-semibold">Farmer Joe&apos;s Farm</summary>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-[#4f4835]">Step {Math.min(step + 1, 5)} of 5</p>
                    <div className="mt-2 h-2 rounded-full bg-[#cfe2c6]">
                      <div className="h-2 rounded-full bg-[#4c8654] transition-all" style={{ width: `${(Math.min(step + 1, 5) / 5) * 100}%` }} />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-[#fffdf9] p-4 ring-1 ring-[#dbcdb0]">
                    <div className="min-h-[250px]">
                      {step === 0 && (
                        <div className="space-y-3">
                          <p className="text-sm text-[#5a5038]">1) Name or preferred nickname</p>
                          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Colten / Col" className="w-full rounded-xl border border-[#d8cab0] p-3" />
                        </div>
                      )}
                      {step === 1 && (
                        <div>
                          <p className="mb-3 text-sm text-[#5a5038]">2) Select farm specific skills</p>
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
                          <p className="mt-3 text-xs text-[#6b6248]">Host operators can define custom skill tags, role labels, and proficiency bands per farm as part of a modular taxonomy.</p>
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
                          <p className="text-xs text-[#6b6248]">Agreements are customizable per host. Farms can attach custom orientation videos and policy modules.</p>
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
                      <button
                        onClick={() => setStep((s) => Math.min(s + 1, 4))}
                        disabled={!canContinue}
                        className={`rounded-full px-4 py-2 font-semibold text-white ${canContinue ? 'bg-[#e08a3c]' : 'cursor-not-allowed bg-[#cdbb9f]'}`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </details>
            </article>
          </div>

          <article className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
            <h3 className="text-xl font-semibold">🐐 Animal analytics dashboard</h3>
            <p className="mt-2 text-[#514a36]">Technical metrics: dry matter intake (DMI), body condition score (BCS), feed conversion ratio (FCR), and somatic cell count (SCC).</p>
            <div className="mt-4 overflow-hidden rounded-2xl bg-white ring-1 ring-[#d9cab0]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f5efe1]">
                  <tr>
                    <th className="p-2">Livestock</th>
                    <th className="p-2">DMI kg/day</th>
                    <th className="p-2">BCS</th>
                    <th className="p-2">FCR</th>
                    <th className="p-2">SCC</th>
                  </tr>
                </thead>
                <tbody>
                  {baseLivestock.map((row, i) => {
                    const wobble = ((protocolFrame + i) % 4) * 0.04;
                    const scc = row.scc === 0 ? '-' : `${Math.max(100000, row.scc + ((protocolFrame + i) % 5) * 3200).toLocaleString()}`;
                    return (
                      <tr key={row.animal} className="border-t border-[#eee3cf]">
                        <td className="p-2">{row.animal}</td>
                        <td className="p-2">{(row.dmi + wobble).toFixed(2)}</td>
                        <td className="p-2">{(row.bcs + wobble / 2).toFixed(2)}</td>
                        <td className="p-2">{(row.fcr + wobble / 3).toFixed(2)}</td>
                        <td className="p-2">{scc}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-white p-3 ring-1 ring-[#d9cab0]">
                <p className="text-xs text-[#675e45]">7 day milk yield trendline (L/day) 🥛</p>
                <div className="mt-2 flex h-20 items-end gap-2">
                  {[34, 39, 37, 42, 45, 44, 48].map((h, i) => (
                    <div key={h + i} className="w-6 rounded-t bg-[#80a869] transition-all" style={{ height: `${h + ((protocolFrame + i) % 3) * 2}%` }} />
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-white p-3 ring-1 ring-[#d9cab0]">
                <p className="text-xs text-[#675e45]">Feed efficiency trend</p>
                <div className="mt-2 flex h-20 items-end gap-2">
                  {[56, 52, 58, 61, 59, 63, 66].map((h, i) => (
                    <div key={h + i} className="w-6 rounded-t bg-[#66a4a1] transition-all" style={{ height: `${h + ((protocolFrame + i) % 2) * 2}%` }} />
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-white p-3 ring-1 ring-[#d9cab0]">
                <p className="text-xs text-[#675e45]">SCC control status</p>
                <div className="mt-2 h-20 rounded-lg bg-[#f5efe1] p-2">
                  <div className="h-2 w-[82%] rounded-full bg-[#7ea96a]" />
                  <div className="mt-2 h-2 w-[68%] rounded-full bg-[#87b876]" />
                  <div className="mt-2 h-2 w-[76%] rounded-full bg-[#6e9f5e]" />
                </div>
              </div>
              <div className="rounded-xl bg-white p-3 ring-1 ring-[#d9cab0]">
                <p className="text-xs text-[#675e45]">Protocol compliance heatmap</p>
                <div className="mt-2 grid grid-cols-6 gap-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className={`h-4 rounded ${i % 5 === 0 ? 'bg-[#b9d7b4]' : i % 3 === 0 ? 'bg-[#97bf8f]' : 'bg-[#dce9d8]'}`} />
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-3xl bg-[#faf4e8] p-6 ring-1 ring-[#ddcfb4]">
          <h3 className="text-2xl font-semibold">🌐 Global Community Layer</h3>
          <p className="mt-2 text-[#514a36]">Slower rotating community forum feed for questions, templates, and practice sharing across regions.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[0, 1, 2, 3].map((i) => {
              const idx = (forumIndex + i) % forumSeed.length;
              return (
                <article key={`${idx}-${i}`} className="rounded-2xl bg-white p-4 ring-1 ring-[#d9cab0] transition hover:-translate-y-0.5">
                  <p className="text-sm font-semibold">{forumSeed[idx]}</p>
                  <p className="mt-2 text-xs text-[#6b6248]">Replies: {9 + ((forumIndex + i) % 10)} · Upvotes: {21 + ((forumIndex + i) % 23)}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl bg-[#f4ecdd] p-6 ring-1 ring-[#d8c8aa]">
          <h3 className="text-2xl font-semibold">📊 Platform signal highlights</h3>
          <p className="mt-2 text-[#554d39]">
            Over time, this platform can collect structured operational and readiness signals to help tailor better experiences for WWOOFers and hosts alike. By combining onboarding completion, communication response quality, protocol adherence, and schedule outcomes, farms can identify where support is needed early and improve placements with evidence based iteration.
          </p>
          <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
            {[
              ['Host readiness completion', '94%'],
              ['Pre arrival protocol acknowledgment', '88%'],
              ['First week conflict reduction', '31%'],
              ['Safety check in compliance', '97%']
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white p-3 ring-1 ring-[#dfcfb3]">
                <p className="text-[#5b513a]">{k}</p>
                <p className="text-xl font-semibold text-[#2f6f49]">{v}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-[#f4ecdd] p-8 text-center ring-1 ring-[#d8c8aa]">
          <h2 className="text-2xl font-semibold">✨ Supporting the Future of Meaningful Agricultural Exchange</h2>
          <p className="mt-2 text-[#554d39]">This proposal strengthens trust, preparedness, and resilience across WWOOF while preserving local autonomy.</p>
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
