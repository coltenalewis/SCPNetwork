'use client';

import { useEffect, useMemo, useState } from 'react';

const HERO_BACKDROP_URL =
  'https://chatgpt.com/backend-api/estuary/content?id=file_00000000a85071f78690afc2cedb112f&ts=492093&p=fs&cid=1&sig=9e9d5824eac8120b48d26a1d2d289e7680c1dd154b31bf03efaebce1adcbd16c&v=0';

const previewPanels = [
  {
    title: '🌾 Farm Dashboard',
    detail: 'Daily priorities, arrivals, and weather windows in one place.',
    points: ['11 active chores', '2 arrivals expected', 'Irrigation watch 14:00']
  },
  {
    title: '🗓️ Volunteer Schedule',
    detail: 'Clear shifts and guidance reduce uncertainty before arrival.',
    points: ['Mon: Orchard support', 'Tue: Compost + seed trays', 'Wed: Animal round']
  },
  {
    title: '🐓 Animal Log',
    detail: 'Health records and routines shared across caretakers.',
    points: ['Goat Daisy fed 07:00', 'Henhouse cleaned', 'Vet reminder in 2 weeks']
  },
  {
    title: '💬 Community Discussion',
    detail: 'Regional peers exchange practical, moderated knowledge.',
    points: ['Soil restoration Q&A', 'Tool-safety checklist', 'Host orientation template']
  }
];

const sections = [
  {
    title: '🤝 Enhanced Vetting Through Transparency and Preparation',
    body:
      'After a volunteer is approved through existing WWOOF channels, the platform can serve as a deeper onboarding environment where hosts may optionally share protocols, expectations, schedules, safety procedures, and daily routines. This allows prospective WWOOFers to understand not only what a farm does, but how life on that farm actually operates, reducing misunderstandings and improving placement success. Volunteers can submit additional information about skills, dietary needs, physical capabilities, comfort levels with animals or machinery, language preferences, and travel logistics.'
  },
  {
    title: '💬 Moderated Communication and Pre-Arrival Connection',
    body:
      'Clear communication before arrival is one of the strongest predictors of a positive exchange. The platform can provide moderated messaging spaces where hosts and volunteers can discuss logistics, ask questions, and build rapport while maintaining safety standards. Structured channels reduce reliance on scattered email threads or external messaging apps and allow WWOOF organizations to intervene if needed, supporting both independence and accountability.'
  },
  {
    title: '📋 Presence Awareness, Feedback, and Well-Being',
    body:
      'Once volunteers arrive, the system can offer optional presence tracking and daily check-ins that help hosts maintain awareness of who is on site, working, or away—especially valuable for larger farms or remote locations. This is not surveillance, but a practical safety layer for emergencies, evacuations, or unexpected situations. Structured feedback tools also help both hosts and volunteers flag concerns early and celebrate successes.'
  },
  {
    title: '🐐 Farm Protocols, Animal Care Context, and Daily Life Orientation',
    body:
      'Many farms operate with complex routines involving animals, crops, tools, and seasonal workflows. The platform allows hosts to document these systems in accessible formats—from feeding schedules and safety guidelines to quiet hours and communal responsibilities. Volunteers can review this information before arrival, reducing onboarding time and preventing accidental harm to animals, infrastructure, or crops.'
  },
  {
    title: '🌐 A Living Global Community Layer',
    body:
      'Beyond individual placements, the platform can foster a broader sense of belonging across regions. Optional discussion spaces, resource sharing, travel tips, and peer advice enable participants to learn from one another while maintaining respectful moderation aligned with WWOOF values. This creates a unified digital commons rooted in sustainability, cooperation, and cultural exchange.'
  },
  {
    title: '🌿 Respecting Autonomy While Strengthening Trust',
    body:
      'Participation remains flexible. Farms choose what to share, which features to enable, and how to interact digitally. The goal is empowerment through optional tools that enhance clarity and safety without imposing unnecessary administrative burden—preserving local autonomy while offering global support infrastructure.'
  }
];

const farmSkills = [
  '🌱 Seedling Care',
  '🚜 Tractor Basics',
  '🛠️ Fence Repair',
  '🐓 Animal Feeding',
  '🍲 Communal Cooking',
  '🧺 Harvest Sorting',
  '💧 Irrigation Checks',
  '🌾 Compost Systems'
];

const regions = [
  { name: '🌎 Latin America', value: 'Agroforestry collaboration and seed circles.' },
  { name: '🌍 Europe', value: 'Soil health workshops and tool-sharing networks.' },
  { name: '🌏 East Africa', value: 'Water stewardship and dry-season planning resources.' },
  { name: '🌊 Oceania', value: 'Biodiversity notes and seasonal resilience exchanges.' }
];

const chatFlow = [
  'Host: Welcome! We’ll start your first morning with a calm site orientation. 😊',
  'Volunteer: Perfect, I reviewed the farm protocol and packing guide. ✅',
  'Host: Great. Please arrive by 17:00 so we can introduce the team and spaces. 🌿',
  'Volunteer: Sounds good—thank you for the clear guidance! 🙌'
];

export default function HomePage() {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [activeRegion, setActiveRegion] = useState(regions[0]);
  const [chatCount, setChatCount] = useState(1);
  const [step, setStep] = useState(0);

  const [name, setName] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const id = setInterval(() => setPreviewIndex((p) => (p + 1) % previewPanels.length), 3800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setChatCount((c) => Math.min(c + 1, chatFlow.length)), 1800);
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
    }, 220);
    return () => clearInterval(id);
  }, [videoPlaying]);

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
        className="relative min-h-[92vh] w-full overflow-hidden border-b border-white/20"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(49,87,90,0.58), rgba(69,40,98,0.46), rgba(230,145,58,0.26)), url(${HERO_BACKDROP_URL}), url('/wwoof-backdrop.svg')`,
          backgroundSize: 'cover, cover, cover',
          backgroundPosition: 'center, center, center'
        }}
      >
        <div className="absolute inset-0 backdrop-blur-[3px]" />
        <div className="relative mx-auto grid w-full max-w-[1500px] gap-8 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-16">
          <div className="rounded-[2rem] bg-[#f8f2e6]/86 p-6 shadow-2xl ring-1 ring-white/60 md:p-10">
            <p className="mb-4 inline-flex rounded-full bg-[#e6d5b6] px-4 py-1 text-sm font-semibold">🌍 A Unified Support Platform for the Global WWOOF Community</p>
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">Technology as a quiet support layer for trust, preparedness, and meaningful human exchange.</h1>
            <p className="mt-5 text-lg leading-relaxed text-[#494930]">
              The World Wide Opportunities on Organic Farms network has connected hosts and volunteers for decades. This concept introduces a complementary platform that strengthens coordination, safety, and transparency while preserving WWOOF’s human-centered spirit.
            </p>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#5f5a3f]">Prepared by Colten Lewis</p>
            <a href="#onboarding" className="mt-6 inline-flex rounded-full bg-[#2f6f49] px-6 py-3 font-semibold text-white transition hover:bg-[#24583a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6f49]">
              🌱 View interactive onboarding demo
            </a>
          </div>

          <div className="rounded-[2rem] bg-[#f6f2e8]/88 p-5 shadow-2xl ring-1 ring-white/60 md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">✨ Live Concept Preview</h2>
              <span className="text-sm text-[#655b45]">{previewIndex + 1} / {previewPanels.length}</span>
            </div>
            <div className="relative min-h-[300px] overflow-hidden rounded-3xl bg-gradient-to-br from-[#e9f3e3] via-[#f7efe1] to-[#ffe8cc]">
              {previewPanels.map((panel, i) => (
                <article
                  key={panel.title}
                  className={`absolute inset-4 rounded-2xl border border-[#d6c8ad] bg-white/88 p-4 transition duration-700 ${
                    i === previewIndex ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                >
                  <h3 className="text-lg font-semibold text-[#2d6644]">{panel.title}</h3>
                  <p className="mt-1 text-sm text-[#5a4f38]">{panel.detail}</p>
                  <ul className="mt-4 space-y-2 text-sm">
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

      <main className="mx-auto w-full max-w-[1500px] space-y-8 px-4 py-10 md:px-10">
        <section id="onboarding" className="grid gap-6 rounded-[2rem] bg-[#f9f4e9] p-5 ring-1 ring-[#dbcdb0] md:grid-cols-2 md:p-8">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">🧭 Interactive onboarding demo</h2>
            <p className="mt-3 leading-relaxed text-[#4f4835]">
              This second-layer experience begins after normal WWOOF approval and helps both sides prepare with confidence. Hosts can share protocols and expectations; volunteers can present practical readiness details before arrival.
            </p>
            <div className="mt-5 rounded-2xl bg-[#eaf4e7] p-4 text-sm">
              Step {Math.min(step + 1, 5)} of 5
              <div className="mt-2 h-2 rounded-full bg-[#cfe2c6]">
                <div className="h-2 rounded-full bg-[#4c8654] transition-all" style={{ width: `${(Math.min(step + 1, 5) / 5) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 ring-1 ring-[#dbcdb0]">
            <h3 className="font-semibold">✅ Volunteer readiness wizard</h3>
            {error && <p className="mt-2 rounded-xl bg-[#fff2e7] p-2 text-sm text-[#9f4f20]">{error}</p>}

            <div className="mt-4 min-h-[260px]">
              {step === 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-[#5a5038]">1) The user’s name or preferred nickname</p>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Maya / M" className="w-full rounded-xl border border-[#d8cab0] p-3" />
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
                  <p className="text-sm text-[#5a5038]">4) Watch safety video simulation</p>
                  <button
                    onClick={() => {
                      if (videoProgress < 100) setVideoPlaying(true);
                    }}
                    className="rounded-full bg-[#2f6f49] px-4 py-2 text-sm font-semibold text-white"
                  >
                    ▶️ Play safety video
                  </button>
                  <div className="h-3 rounded-full bg-[#dfd3bc]">
                    <div className="h-3 rounded-full bg-[#4f8a58] transition-all" style={{ width: `${videoProgress}%` }} />
                  </div>
                  <p className="text-sm text-[#5a5038]">Progress: {videoProgress}% {videoProgress >= 100 ? '✅ Complete' : '⏳ In progress'}</p>
                </div>
              )}

              {step === 4 && (
                <div className="rounded-2xl bg-[#ecf8e8] p-4 text-[#35623a]">
                  🎉 Onboarding complete! Hosts can now view your readiness profile and prepare a safer, smoother arrival.
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-full border border-[#d2c3a8] px-4 py-2">Back</button>
              <button onClick={nextStep} className="rounded-full bg-[#e08a3c] px-4 py-2 font-semibold text-white">Next</button>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          {sections.slice(0, 4).map((s) => (
            <article key={s.title} className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-[#514a36]">{s.body}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 rounded-3xl bg-[#faf4e8] p-6 ring-1 ring-[#ddcfb4] md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold">🌐 Global community layer</h3>
            <p className="mt-2 text-[#514a36]">Hover or focus a region to preview active peer-learning opportunities and practical collaboration topics.</p>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {regions.map((r) => (
                <button
                  key={r.name}
                  onMouseEnter={() => setActiveRegion(r)}
                  onFocus={() => setActiveRegion(r)}
                  onClick={() => setActiveRegion(r)}
                  className={`rounded-2xl border p-3 text-left transition ${activeRegion.name === r.name ? 'border-[#4f8a58] bg-[#eef7eb]' : 'border-[#ddcfb4] bg-white/80'}`}
                >
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-[#5b503a]">{r.value}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-[#d9cab0]">
            <h4 className="font-semibold">💬 Moderated pre-arrival message flow</h4>
            <div className="mt-3 space-y-2">
              {chatFlow.slice(0, chatCount).map((line) => (
                <p key={line} className="rounded-xl bg-[#f6f2e8] p-2 text-sm">{line}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
            <h3 className="text-xl font-semibold">🌿 Respecting autonomy while strengthening trust</h3>
            <p className="mt-3 leading-relaxed text-[#514a36]">{sections[5].body}</p>
          </article>
          <article className="rounded-3xl bg-[#fbf7ef] p-6 ring-1 ring-[#ddcfb4]">
            <h3 className="text-xl font-semibold">✨ Supporting the future of meaningful agricultural exchange</h3>
            <p className="mt-3 leading-relaxed text-[#514a36]">
              As global travel evolves and expectations around safety, transparency, and communication rise, a human-centered digital environment helps WWOOF stay resilient and welcoming for decades to come. The platform supports personal connection; it does not replace it. 🌻
            </p>
          </article>
        </section>

        <section className="rounded-3xl bg-[#f4ecdd] p-8 text-center ring-1 ring-[#d8c8aa]">
          <h2 className="text-2xl font-semibold">Prepared by Colten Lewis</h2>
          <p className="mt-2 text-[#554d39]">I welcome feedback and collaboration on this proposal concept.</p>
          <p className="mt-3 font-medium">📧 colten.lewis@example.com · ☎️ +1 (555) 013-2041</p>
        </section>
      </main>

      <footer className="w-full border-t border-[#ddcfb4] bg-[#efe3ce] px-4 py-6 text-center text-sm text-[#5e5541]">
        Proposal microsite concept for WWOOF global coordination and community resilience.
      </footer>
    </div>
  );
}
