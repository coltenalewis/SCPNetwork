'use client';

import { useEffect, useMemo, useState } from 'react';

const HERO_BACKDROP_URL =
  'https://media.discordapp.net/attachments/814008763530346507/1474158663538049228/7f2be857-ebe5-4ddc-b80b-cb067de43253.png?ex=6998d4bd&is=6997833d&hm=feedd7d47dc7c1d9b17f96cac6621a03f070633f76860e1ecacdc80a1a3bfd3a&=&format=webp&quality=lossless&width=656&height=438';

const scheduleDays = ['Mon', 'Tue', 'Wed', 'Thu'];

const scheduleEvents: Record<string, { time: string; title: string; owner: string; color: string }[]> = {
  Mon: [
    { time: '07:30', title: 'Irrigation manifold check', owner: 'Host Team', color: 'bg-[#d7ecff]' },
    { time: '09:00', title: 'Goat feed cycle A', owner: 'WWOOFer', color: 'bg-[#e6f7df]' },
    { time: '16:00', title: 'Compost temperature log', owner: 'WWOOFer', color: 'bg-[#ffeccf]' }
  ],
  Tue: [
    { time: '08:00', title: 'Seed tray prep', owner: 'WWOOFer', color: 'bg-[#e6f7df]' },
    { time: '10:00', title: 'Perimeter fence walk', owner: 'Host Team', color: 'bg-[#d7ecff]' },
    { time: '17:00', title: 'Tool inventory closeout', owner: 'WWOOFer', color: 'bg-[#ffeccf]' }
  ],
  Wed: [
    { time: '07:00', title: 'Livestock hydration audit', owner: 'Host Team', color: 'bg-[#d7ecff]' },
    { time: '09:15', title: 'Harvest lane sorting', owner: 'WWOOFer', color: 'bg-[#e6f7df]' },
    { time: '12:30', title: 'Safety huddle', owner: 'All', color: 'bg-[#efe4ff]' }
  ],
  Thu: [
    { time: '07:40', title: 'Drip line pressure map', owner: 'Host Team', color: 'bg-[#d7ecff]' },
    { time: '09:20', title: 'Egg station sanitation', owner: 'WWOOFer', color: 'bg-[#e6f7df]' },
    { time: '17:10', title: 'Daily closeout report', owner: 'WWOOFer', color: 'bg-[#ffeccf]' }
  ]
};

const forumSeed = [
  'How are farms handling pre arrival allergy disclosures this season? 🌱',
  'Best template for tractor safety and competency tags? 🚜',
  'Any low cost protocols for storm evacuation readiness? 🌧️',
  'How do hosts structure first 48 hour orientation blocks? 🧭'
];

const baseLivestock = [
  { animal: '🐐 Daisy', dmi: 2.25, bcs: 3.4, fcr: 1.83, scc: 182000 },
  { animal: '🐐 Clover', dmi: 2.48, bcs: 3.3, fcr: 1.91, scc: 165000 },
  { animal: '🐄 Maple', dmi: 8.4, bcs: 3.1, fcr: 1.74, scc: 121000 },
  { animal: '🐓 Layer Coop', dmi: 5.1, bcs: 3.0, fcr: 2.11, scc: 0 }
];

const farmSkills = ['🌱 Seedling Care', '🚜 Tractor Basics', '🛠️ Fence Repair', '🐓 Animal Feeding', '🍲 Communal Cooking', '💧 Irrigation Checks'];

const threadMessages = [
  { from: 'Host - Farmer Joe', text: 'Hi. Thanks for confirming your dates. Have you reviewed livestock safety notes?', ts: '09:08' },
  { from: 'WWOOFer', text: 'Yes. I reviewed handling protocols and completed tool basics.', ts: '09:10' },
  { from: 'Host - Farmer Joe', text: 'Great. I am approving your pre arrival packet now.', ts: '09:11' },
  { from: 'System', text: 'Approval complete. Onboarding is now available.', ts: '09:12' }
];

export default function HomePage() {
  const [day, setDay] = useState<keyof typeof scheduleEvents>('Mon');
  const [forumIndex, setForumIndex] = useState(0);
  const [protocolFrame, setProtocolFrame] = useState(0);
  const [chatVisible, setChatVisible] = useState(0);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const [gameRunning, setGameRunning] = useState(false);
  const [goatY, setGoatY] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [obstacleX, setObstacleX] = useState(92);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setForumIndex((i) => (i + 1) % forumSeed.length), 5200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setProtocolFrame((f) => f + 1), 1200);
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
    if (chatVisible === 0 || chatVisible >= threadMessages.length) return;
    const id = setTimeout(() => setChatVisible((v) => Math.min(v + 1, threadMessages.length)), 1100);
    return () => clearTimeout(id);
  }, [chatVisible]);

  useEffect(() => {
    if (!gameRunning) return;
    const id = setInterval(() => {
      setGoatY((y) => {
        const nextV = velocity - 0.9;
        const nextY = Math.max(0, y + nextV);
        setVelocity(nextY === 0 ? 0 : nextV);
        return nextY;
      });
      setObstacleX((x) => {
        const next = x - 2.6;
        if (next < -8) {
          setScore((s) => s + 1);
          return 100;
        }
        return next;
      });
    }, 40);
    return () => clearInterval(id);
  }, [gameRunning, velocity]);

  useEffect(() => {
    if (!gameRunning) return;
    const goatLeft = 10;
    const obstacleNear = obstacleX < goatLeft + 8 && obstacleX > goatLeft - 6;
    if (obstacleNear && goatY < 10) {
      setGameRunning(false);
      setBestScore((b) => Math.max(b, score));
    }
  }, [obstacleX, goatY, gameRunning, score]);

  const canContinue = useMemo(() => {
    if (step === 0) return name.trim().length > 1;
    if (step === 1) return skills.length > 0;
    if (step === 2) return contractAccepted;
    if (step === 3) return videoProgress >= 100;
    return false;
  }, [step, name, skills, contractAccepted, videoProgress]);

  const startChatAnimation = () => setChatVisible(1);

  const goToOnboarding = () => {
    setOnboardingOpen(true);
    requestAnimationFrame(() => {
      document.getElementById('onboarding')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const startGame = () => {
    setScore(0);
    setObstacleX(92);
    setGoatY(0);
    setVelocity(0);
    setGameRunning(true);
  };

  const jump = () => {
    if (!gameRunning) return;
    setVelocity(8.5);
  };

  return (
    <div className="min-h-screen w-full bg-[#efe8d8] text-[#23281f]">
      <section
        className="relative min-h-[88vh] w-full overflow-hidden border-b border-white/20"
        style={{
          backgroundImage: `radial-gradient(circle at 16% 18%, rgba(123,231,255,0.25), transparent 35%), radial-gradient(circle at 82% 15%, rgba(205,126,255,0.24), transparent 32%), linear-gradient(135deg, rgba(7,16,23,0.76), rgba(16,29,41,0.72), rgba(24,47,54,0.62)), url(${HERO_BACKDROP_URL}), url('/wwoof-backdrop.svg')`,
          backgroundSize: 'cover, cover, cover, cover, cover',
          backgroundPosition: 'center, center, center, center, center'
        }}
      >
        <div className="absolute inset-0 bg-[#09131d]/40 backdrop-blur-[2px]" />
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#70dcff]/20 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-16 h-72 w-72 rounded-full bg-[#c58cff]/18 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-10 md:px-10 md:py-16">
          <div className="rounded-[2rem] border border-white/55 bg-[#fff9ed]/95 p-6 shadow-2xl md:p-10">
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
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1600px] space-y-8 px-4 py-10 md:px-10">
        <section className="rounded-3xl bg-[#fbf7ef] p-5 ring-1 ring-[#ddcfb4] md:p-6">
          <p className="text-sm text-[#4f4835]">The sections below are demonstrative examples of what can live inside the unified web application and how each module supports host and WWOOFer outcomes.</p>
        </section>

        <section id="schedule" className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
          <h2 className="text-2xl font-semibold">🗓️ Farm operations schedule</h2>
          <p className="mt-2 text-[#4f4835]">A calendar style operations layer centralizes daily priorities, ownership, and execution timing so hosts and volunteers can work from one trusted rhythm.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {scheduleDays.map((d) => (
              <button key={d} onClick={() => setDay(d as keyof typeof scheduleEvents)} className={`rounded-full px-4 py-2 text-sm ${day === d ? 'bg-[#2f6f49] text-white' : 'bg-[#eadfc7]'}`}>
                {d}
              </button>
            ))}
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#d8caaf] bg-white">
            <div className="grid grid-cols-[80px_1fr] border-b border-[#e8dcc8] bg-[#f8f3ea] text-xs text-[#665d43]">
              <div className="p-2 font-semibold">Time</div>
              <div className="p-2 font-semibold">Calendar lane</div>
            </div>
            <div className="max-h-[360px] overflow-y-auto">
              {['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((slot) => {
                const event = scheduleEvents[day].find((e) => e.time.startsWith(slot.slice(0, 2)));
                return (
                  <div key={slot} className="grid grid-cols-[80px_1fr] border-b border-[#f0e6d5]">
                    <div className="p-2 text-xs text-[#6a6146]">{slot}</div>
                    <div className="p-2">
                      {event ? (
                        <div className={`rounded-xl p-3 text-sm ring-1 ring-[#d3c5ab] ${event.color}`}>
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-xs text-[#5f553e]">Owner: {event.owner}</p>
                          <p className="text-xs text-[#5f553e]">Start: {event.time}</p>
                        </div>
                      ) : (
                        <div className="h-12 rounded-xl bg-[#faf6ee]" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <article className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
              <h3 className="text-xl font-semibold">💬 Pre arrival communication</h3>
              <p className="mt-2 text-[#514a36]">This messaging flow demonstrates how approvals, logistics, and readiness updates can happen in a structured conversation channel before arrival.</p>
              <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-[#d9cab0]">
                {chatVisible === 0 && (
                  <div className="mb-3 flex justify-end">
                    <div className="relative rounded-2xl bg-[#e8f1ff] px-4 py-3 text-sm text-[#243f66] ring-1 ring-[#bfd3ef]">
                      Start simulated host chat
                      <span className="absolute -right-2 top-4 h-3 w-3 rotate-45 bg-[#e8f1ff] ring-1 ring-[#bfd3ef]" />
                      <button onClick={startChatAnimation} className="ml-3 rounded-full bg-[#275e85] px-3 py-1 font-semibold text-white">Play</button>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  {threadMessages.slice(0, chatVisible).map((m, i) => {
                    const isHost = m.from.includes('Host');
                    const isSystem = m.from === 'System';
                    return (
                      <div key={`${m.ts}-${i}`} className={`max-w-[88%] rounded-2xl p-3 text-sm shadow-sm ${isSystem ? 'bg-[#e8f4e7] text-[#2d653a]' : isHost ? 'ml-auto bg-[#eef2ff]' : 'bg-[#f7f2e8]'}`}>
                        <p className="font-semibold">{m.from}</p>
                        <p>{m.text}</p>
                        <p className="mt-1 text-[11px] opacity-70">{m.ts}</p>
                      </div>
                    );
                  })}
                </div>
                {chatVisible >= threadMessages.length && (
                  <div className="mt-3 flex justify-end">
                    <div className="relative rounded-2xl bg-[#dff2e0] px-4 py-3 text-sm text-[#1f4f2d] ring-1 ring-[#b7dcb9]">
                      Continue to onboarding
                      <span className="absolute -right-2 top-4 h-3 w-3 rotate-45 bg-[#dff2e0] ring-1 ring-[#b7dcb9]" />
                      <button onClick={goToOnboarding} className="ml-3 inline-flex rounded-full bg-[#2f6f49] px-3 py-1 font-semibold text-white">Onboarding &gt;</button>
                    </div>
                  </div>
                )}
              </div>
            </article>

            <article id="onboarding" className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
              <h3 className="text-xl font-semibold">🤝 Onboarding module</h3>
              <p className="mt-2 text-[#514a36]">This workflow demonstrates configurable readiness capture that each host can adapt without changing the wider application architecture.</p>
              <details open={onboardingOpen} onToggle={(e) => setOnboardingOpen((e.target as HTMLDetailsElement).open)} className="mt-4 rounded-2xl border border-[#d8caaf] bg-white p-4">
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
            <p className="mt-2 text-[#514a36]">This analytics area shows how host teams can track livestock condition and protocol adherence with a practical operational dashboard.</p>
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
          <p className="mt-2 text-[#514a36]">This community layer demonstrates how knowledge exchange, troubleshooting, and regional collaboration can remain active and searchable across farms.</p>
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

        <section className="rounded-3xl bg-[#ecf3e5] p-6 ring-1 ring-[#c7d7b3]">
          <h3 className="text-2xl font-semibold">🎮 Community games demo: Goat Run</h3>
          <p className="mt-2 text-[#43533e]">A light engagement module where WWOOFers can compete on mini challenges inside the same community platform.</p>
          <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-[#c8d7b5]">
            <div className="mb-3 flex items-center justify-between text-sm">
              <p>Score: <span className="font-semibold">{score}</span></p>
              <p>Best: <span className="font-semibold">{bestScore}</span></p>
            </div>
            <div className="relative h-36 overflow-hidden rounded-xl bg-gradient-to-b from-[#d9f1ff] to-[#eef7e6]">
              <div className="absolute bottom-0 h-8 w-full bg-[#85b66a]" />
              <div className="absolute bottom-8 text-2xl" style={{ left: '10%', transform: `translateY(-${goatY}px)` }}>🐐</div>
              <div className="absolute bottom-8 text-2xl" style={{ left: `${obstacleX}%` }}>🌵</div>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={startGame} className="rounded-full bg-[#2f6f49] px-4 py-2 text-sm font-semibold text-white">Start Goat Run</button>
              <button onClick={jump} className="rounded-full bg-[#3d7db8] px-4 py-2 text-sm font-semibold text-white">Jump</button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-[#f4ecdd] p-6 ring-1 ring-[#d8c8aa]">
          <h3 className="text-2xl font-semibold">📊 Platform signal highlights</h3>
          <p className="mt-2 text-[#554d39]">
            These signals illustrate how the platform can collect structured readiness and operations data to help tailor stronger placements, faster interventions, and better host plus WWOOFer experiences over time.
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
