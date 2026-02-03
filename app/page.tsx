'use client';

import { useMemo, useState } from 'react';

type Step = 'landing' | 'category' | 'modules' | 'customize' | 'summary' | 'dashboard';

type Category = {
  id: string;
  title: string;
  description: string;
  modules: Module[];
};

type Module = {
  id: string;
  name: string;
  description: string;
  includes: string[];
  bestFor: string;
  subModules: SubModule[];
};

type SubModule = {
  id: string;
  name: string;
  description: string;
};

const categories: Category[] = [
  {
    id: 'core-foundations',
    title: 'Core Foundations',
    description: 'Reliable data, stats, and config systems that every build needs.',
    modules: [
      {
        id: 'datastore-profile-core',
        name: 'DataStore Profile Core',
        description: 'Versioning, migrations, and safe saves with session locks.',
        includes: ['Schema versioning', 'Safe saves', 'Session locks', 'Migration helpers'],
        bestFor: 'Best for any game with persistent data.',
        subModules: [
          { id: 'save-queues', name: 'Save queues', description: 'Retry logic with throttling.' },
          { id: 'backup-snapshots', name: 'Backup snapshots', description: 'Optional archive copies.' },
          { id: 'session-recovery', name: 'Session recovery', description: 'Auto-heal crashed sessions.' }
        ]
      },
      {
        id: 'player-stats-core',
        name: 'Player Stats & Attributes Core',
        description: 'Clean stat definitions with server authority and replication rules.',
        includes: ['Stat registry', 'Replication rules', 'Access helpers'],
        bestFor: 'Best for RPG, RP, or progression loops.',
        subModules: [
          { id: 'stat-templates', name: 'Stat templates', description: 'Reusable stat presets.' },
          { id: 'trait-hooks', name: 'Trait hooks', description: 'Triggers for stat thresholds.' }
        ]
      },
      {
        id: 'settings-config-system',
        name: 'Settings & Config System',
        description: 'Feature flags, environment toggles, and safe rollouts.',
        includes: ['Feature flags', 'Environment toggles', 'Rollout guards'],
        bestFor: 'Best for live updates and staged releases.',
        subModules: [
          { id: 'regional-flags', name: 'Regional flags', description: 'Region-specific toggles.' },
          { id: 'rollback-tools', name: 'Rollback tools', description: 'Safe revert switches.' }
        ]
      }
    ]
  },
  {
    id: 'competitive-match',
    title: 'Competitive & Match',
    description: 'Round flow, matchmaking, and mode control for competitive loops.',
    modules: [
      {
        id: 'timer-state-machine',
        name: 'Timer + State Machine',
        description: 'Round phases, intermission, overtime, and transitions.',
        includes: ['Round phases', 'Overtime', 'Transition hooks'],
        bestFor: 'Best for round-based competitive games.',
        subModules: [
          { id: 'spectator-mode', name: 'Spectator mode', description: 'Watch while waiting.' },
          { id: 'anti-stall', name: 'Anti-stall mechanics', description: 'Prevent slow play.' }
        ]
      },
      {
        id: 'matchmaking-queue',
        name: 'Matchmaking + Queue',
        description: 'Party and solo queues, balancing, join-in-progress toggles.',
        includes: ['Party queue', 'Role balance', 'Join-in-progress'],
        bestFor: 'Best for session-based experiences.',
        subModules: [
          { id: 'ranked-hooks', name: 'Ranked ladder hooks', description: 'Ranking integration.' },
          { id: 'priority-queue', name: 'Priority queue', description: 'VIP routing logic.' }
        ]
      },
      {
        id: 'team-role-assignment',
        name: 'Team & Role Assignment',
        description: 'Factions, auto-balance, loadout constraints.',
        includes: ['Faction setup', 'Auto-balance', 'Loadout rules'],
        bestFor: 'Best for games with roles and squads.',
        subModules: [
          { id: 'role-constraints', name: 'Role constraints', description: 'Role limits + rules.' },
          { id: 'loadout-locks', name: 'Loadout locks', description: 'Prevent mismatched kits.' }
        ]
      }
    ]
  },
  {
    id: 'economy-progression',
    title: 'Economy & Progression',
    description: 'Currencies, progression, and retention loops that stay balanced.',
    modules: [
      {
        id: 'currency-wallet',
        name: 'Currency & Wallet System',
        description: 'Multiple currencies, sinks/sources, inflation controls.',
        includes: ['Multi-currency', 'Inflation controls', 'Ledger rules'],
        bestFor: 'Best for economy-driven games.',
        subModules: [
          { id: 'price-elasticity', name: 'Price elasticity', description: 'Dynamic pricing rules.' },
          { id: 'limited-rotations', name: 'Limited rotations', description: 'Timed inventory cycles.' }
        ]
      },
      {
        id: 'daily-weekly-rewards',
        name: 'Daily/Weekly Rewards',
        description: 'Streaks, catch-up logic, and anti-abuse checks.',
        includes: ['Streaks', 'Catch-up logic', 'Anti-abuse'],
        bestFor: 'Best for retention-focused loops.',
        subModules: [
          { id: 'calendar-streaks', name: 'Calendar streaks', description: 'Visual streak calendar.' },
          { id: 'bonus-days', name: 'Bonus days', description: 'Bonus reward multipliers.' }
        ]
      },
      {
        id: 'quests-objectives',
        name: 'Quests & Objectives',
        description: 'Templates, tracking, and reward pipelines.',
        includes: ['Quest templates', 'Tracking hooks', 'Reward pipeline'],
        bestFor: 'Best for guided progression.',
        subModules: [
          { id: 'quest-chains', name: 'Quest chains', description: 'Linked quest paths.' },
          { id: 'milestone-badges', name: 'Milestone badges', description: 'Achievement badges.' }
        ]
      }
    ]
  },
  {
    id: 'admin-ops',
    title: 'Admin & Ops',
    description: 'Moderation, logging, and live ops control for safe launches.',
    modules: [
      {
        id: 'admin-permissions',
        name: 'Admin Commands + Permissions',
        description: 'Role keys, permission gates, and audit logs.',
        includes: ['Role keys', 'Audit logs', 'Command framework'],
        bestFor: 'Best for trust and control.',
        subModules: [
          { id: 'role-ladders', name: 'Role ladders', description: 'Tiered permission layers.' },
          { id: 'action-history', name: 'Action history', description: 'Audit export history.' }
        ]
      },
      {
        id: 'moderation-tools',
        name: 'Moderation Tools',
        description: 'Kick/ban/mute tools with escalation notes.',
        includes: ['Kick/ban/mute', 'Escalation notes', 'History'],
        bestFor: 'Best for community safety.',
        subModules: [
          { id: 'soft-bans', name: 'Soft bans', description: 'Timed restrictions.' },
          { id: 'case-notes', name: 'Case notes', description: 'Moderator notes.' }
        ]
      }
    ]
  },
  {
    id: 'social-community',
    title: 'Social & Community',
    description: 'Social systems, party flow, and community integration.',
    modules: [
      {
        id: 'party-system',
        name: 'Party System',
        description: 'Invites, teleport follow, and party chat hooks.',
        includes: ['Invites', 'Teleport follow', 'Party chat'],
        bestFor: 'Best for RP and social gameplay.',
        subModules: [
          { id: 'party-presence', name: 'Party presence', description: 'Presence tracking.' },
          { id: 'party-reconnect', name: 'Party reconnect', description: 'Auto rejoin.' }
        ]
      },
      {
        id: 'guild-group',
        name: 'Guild/Group Integration',
        description: 'Rank sync, perks, group-locked content.',
        includes: ['Rank sync', 'Perk sync', 'Group gating'],
        bestFor: 'Best for community-driven games.',
        subModules: [
          { id: 'group-rewards', name: 'Group rewards', description: 'Group-only perks.' },
          { id: 'rank-badges', name: 'Rank badges', description: 'Ranked cosmetics.' }
        ]
      }
    ]
  }
];

const aiSuggestions = [
  {
    id: 'mvp',
    label: 'Suggest a fast MVP',
    message: 'Keep it tight: Core Foundations + DataStore Core + Stats Core.',
    modules: ['datastore-profile-core', 'player-stats-core']
  },
  {
    id: 'competitive',
    label: 'Competitive game',
    message: 'Consider Timer + State Machine, Matchmaking + Queue, and Team Assignment.',
    modules: ['timer-state-machine', 'matchmaking-queue', 'team-role-assignment']
  },
  {
    id: 'rp',
    label: 'RP or social game',
    message: 'Focus on Party System, Admin + Permissions, and DataStore Core.',
    modules: ['party-system', 'admin-permissions', 'datastore-profile-core']
  }
];

const portfolioHighlights = [
  {
    id: 'leaderboard-core',
    title: 'Leaderboard + Stats Core',
    summary: 'Reliable seasonal rankings for a competitive arena.',
    shipped: ['Stat schema', 'Season resets', 'Anti-exploit scoring']
  },
  {
    id: 'match-system',
    title: 'Timer + Match System',
    summary: 'Stabilized match flow and reduced aborts.',
    shipped: ['State machine', 'Overtime logic', 'Round hooks']
  },
  {
    id: 'admin-kit',
    title: 'Admin + Permissions Kit',
    summary: 'Secure ops tooling for community safety.',
    shipped: ['Role gates', 'Audit logs', 'Command UI']
  }
];

export default function HomePage() {
  const [step, setStep] = useState<Step>('landing');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedSubModules, setSelectedSubModules] = useState<string[]>([]);
  const [aiOpen, setAiOpen] = useState(true);
  const [aiMessage, setAiMessage] = useState(
    'Tell me what you’re building. I’ll suggest a small, clean system set.'
  );
  const [universeEntries, setUniverseEntries] = useState<Array<{ id: string; label: string }>>([]);
  const [universeId, setUniverseId] = useState('');
  const [universeLabel, setUniverseLabel] = useState('');

  const progress = useMemo(() => {
    const map: Record<Step, number> = {
      landing: 10,
      category: 30,
      modules: 55,
      customize: 75,
      summary: 90,
      dashboard: 100
    };
    return map[step];
  }, [step]);

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategoryId),
    [selectedCategoryId]
  );

  const selectedModuleItems = useMemo(() => {
    return categories.flatMap((category) => category.modules).filter((module) => selectedModules.includes(module.id));
  }, [selectedModules]);

  const selectedSubModuleItems = useMemo(() => {
    return selectedModuleItems
      .flatMap((module) => module.subModules)
      .filter((item) => selectedSubModules.includes(item.id));
  }, [selectedModuleItems, selectedSubModules]);

  const toggleModule = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const toggleSubModule = (subModuleId: string) => {
    setSelectedSubModules((prev) =>
      prev.includes(subModuleId) ? prev.filter((id) => id !== subModuleId) : [...prev, subModuleId]
    );
  };

  const handleAiSuggestion = (id: string) => {
    const suggestion = aiSuggestions.find((item) => item.id === id);
    if (!suggestion) return;
    setAiMessage(suggestion.message);
    setSelectedModules((prev) => Array.from(new Set([...prev, ...suggestion.modules])));
  };

  const handleAddUniverse = () => {
    if (!universeId.trim()) return;
    setUniverseEntries((prev) => [...prev, { id: universeId.trim(), label: universeLabel.trim() || 'Primary' }]);
    setUniverseId('');
    setUniverseLabel('');
  };

  return (
    <div className="min-h-screen bg-cream text-espresso">
      <div className="fixed inset-x-0 top-0 z-40 h-1 bg-cream">
        <div className="h-full rounded-full bg-espresso/70 transition-all duration-700" style={{ width: `${progress}%` }} />
      </div>

      <header className="sticky top-0 z-30 border-b border-espresso/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-espresso/20 bg-espresso text-xs font-semibold text-cream">
              Coco
            </div>
            <div className="leading-tight">
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-espresso/50">Coco</p>
              <p className="text-sm font-semibold">Modular Roblox Systems</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-espresso/50">
            <button onClick={() => setStep('landing')} className="hover:text-espresso">
              Home
            </button>
            <button onClick={() => setStep('category')} className="hover:text-espresso">
              Start an Order
            </button>
            <button onClick={() => setStep('summary')} className="hover:text-espresso">
              Receipt
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-16">
        {step === 'landing' && (
          <section className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Welcome</p>
              <h1 className="text-4xl font-semibold leading-tight">Coco builds modular Roblox systems.</h1>
              <p className="text-sm text-espresso/70">
                Proven foundations. Customizable modules. Clean delivery.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setStep('category')}
                  className="rounded-full bg-espresso px-5 py-2 text-xs font-semibold uppercase tracking-widest text-cream shadow-soft"
                >
                  Start an Order
                </button>
                <button
                  onClick={() => setStep('summary')}
                  className="rounded-full border border-espresso/20 px-5 py-2 text-xs font-semibold uppercase tracking-widest"
                >
                  View Portfolio
                </button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
              <div className="absolute inset-0 opacity-40">
                <div className="steam" />
                <div className="steam steam-delayed" />
              </div>
              <div className="relative space-y-4">
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Ambient</p>
                <div className="h-32 rounded-2xl border border-espresso/10 bg-espresso/5" />
                <div className="h-2 w-full rounded-full bg-espresso/10">
                  <div className="h-full w-1/2 rounded-full bg-espresso/60 animate-cup-fill" />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Quiet motion</p>
              </div>
            </div>
          </section>
        )}

        {step === 'category' && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Step 1</p>
                <h2 className="text-3xl font-semibold">What kind of system are you building?</h2>
                <p className="text-sm text-espresso/70">Choose a core category to start your order.</p>
              </div>
              <button
                onClick={() => setStep('landing')}
                className="text-xs uppercase tracking-[0.3em] text-espresso/50"
              >
                Back
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategoryId(category.id);
                    setStep('modules');
                  }}
                  className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 text-left shadow-soft transition hover:-translate-y-1"
                >
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <p className="mt-2 text-sm text-espresso/70">{category.description}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 'modules' && selectedCategory && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Step 2</p>
                <h2 className="text-3xl font-semibold">Select systems in {selectedCategory.title}.</h2>
                <p className="text-sm text-espresso/70">Add modules that match your loop.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('category')}
                  className="text-xs uppercase tracking-[0.3em] text-espresso/50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('customize')}
                  className="rounded-full bg-espresso px-4 py-2 text-xs uppercase tracking-widest text-cream"
                >
                  Continue
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {selectedCategory.modules.map((module) => {
                const isSelected = selectedModules.includes(module.id);
                return (
                  <button
                    key={module.id}
                    onClick={() => toggleModule(module.id)}
                    className={`rounded-3xl border p-6 text-left shadow-soft transition hover:-translate-y-1 ${
                      isSelected ? 'border-espresso bg-espresso text-cream' : 'border-espresso/10 bg-cream/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold">{module.name}</h3>
                      {isSelected && <span className="text-xs uppercase tracking-[0.3em]">Selected</span>}
                    </div>
                    <p className="mt-2 text-xs opacity-80">{module.description}</p>
                    <p className="mt-3 text-[0.65rem] uppercase tracking-[0.3em] opacity-70">
                      {module.bestFor}
                    </p>
                    <ul className="mt-3 space-y-1 text-[0.65rem] opacity-70">
                      {module.includes.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            {aiOpen && (
              <div className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">AI Barista</p>
                    <p className="text-sm font-semibold">Short, clear recommendations.</p>
                  </div>
                  <button
                    onClick={() => setAiOpen(false)}
                    className="text-xs uppercase tracking-[0.3em] text-espresso/50"
                  >
                    Minimize
                  </button>
                </div>
                <div className="mt-4 rounded-2xl border border-espresso/10 bg-cream/90 p-4 text-sm text-espresso/70">
                  {aiMessage}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {aiSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleAiSuggestion(suggestion.id)}
                      className="rounded-full border border-espresso/20 px-3 py-1 text-xs"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {!aiOpen && (
              <button
                onClick={() => setAiOpen(true)}
                className="rounded-full border border-espresso/20 px-4 py-2 text-xs uppercase tracking-widest"
              >
                Open AI Barista
              </button>
            )}
          </section>
        )}

        {step === 'customize' && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Step 3</p>
                <h2 className="text-3xl font-semibold">Refine with sub-modules.</h2>
                <p className="text-sm text-espresso/70">Select details for each system you chose.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('modules')}
                  className="text-xs uppercase tracking-[0.3em] text-espresso/50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('summary')}
                  className="rounded-full bg-espresso px-4 py-2 text-xs uppercase tracking-widest text-cream"
                >
                  Continue
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {selectedModuleItems.map((module) => (
                <div key={module.id} className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{module.name}</h3>
                      <p className="text-sm text-espresso/70">{module.description}</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-espresso/50">Details</span>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {module.subModules.map((subModule) => {
                      const isSelected = selectedSubModules.includes(subModule.id);
                      return (
                        <button
                          key={subModule.id}
                          onClick={() => toggleSubModule(subModule.id)}
                          className={`rounded-2xl border p-4 text-left transition ${
                            isSelected
                              ? 'border-espresso bg-espresso text-cream'
                              : 'border-espresso/10 bg-cream/90'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-semibold">{subModule.name}</h4>
                            {isSelected && <span className="text-[0.6rem] uppercase tracking-[0.3em]">Added</span>}
                          </div>
                          <p className="mt-2 text-xs opacity-80">{subModule.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {step === 'summary' && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Summary</p>
                <h2 className="text-3xl font-semibold">Receipt summary</h2>
                <p className="text-sm text-espresso/70">Confirm your selections before the dashboard.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('customize')}
                  className="text-xs uppercase tracking-[0.3em] text-espresso/50"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep('dashboard')}
                  className="rounded-full bg-espresso px-4 py-2 text-xs uppercase tracking-widest text-cream"
                >
                  Continue
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
                <h3 className="text-lg font-semibold">Your build</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Category</p>
                    <p className="mt-2">{selectedCategory?.title ?? 'Not selected'}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Modules</p>
                    <ul className="mt-2 space-y-1 text-xs text-espresso/70">
                      {selectedModuleItems.length === 0 && <li>None selected.</li>}
                      {selectedModuleItems.map((module) => (
                        <li key={module.id}>• {module.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Sub-modules</p>
                    <ul className="mt-2 space-y-1 text-xs text-espresso/70">
                      {selectedSubModuleItems.length === 0 && <li>No refinements selected.</li>}
                      {selectedSubModuleItems.map((item) => (
                        <li key={item.id}>• {item.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Portfolio</p>
                <div className="mt-4 space-y-4">
                  {portfolioHighlights.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-espresso/10 bg-cream/90 p-4">
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <p className="mt-2 text-xs text-espresso/70">{item.summary}</p>
                      <ul className="mt-3 space-y-1 text-[0.65rem] text-espresso/60">
                        {item.shipped.map((detail) => (
                          <li key={detail}>• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {step === 'dashboard' && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Dashboard</p>
                <h2 className="text-3xl font-semibold">Client access & licensing</h2>
                <p className="text-sm text-espresso/70">Manage Universe IDs and access status.</p>
              </div>
              <button
                onClick={() => setStep('summary')}
                className="text-xs uppercase tracking-[0.3em] text-espresso/50"
              >
                Back
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
                <h3 className="text-lg font-semibold">Active systems</h3>
                <ul className="mt-4 space-y-2 text-sm text-espresso/70">
                  {selectedModuleItems.length === 0 && <li>No modules selected yet.</li>}
                  {selectedModuleItems.map((module) => (
                    <li key={module.id} className="flex items-center justify-between">
                      <span>{module.name}</span>
                      <span className="text-[0.65rem] uppercase tracking-[0.3em] text-espresso/50">Requested</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">License key</p>
                <div className="mt-4 rounded-2xl border border-espresso/10 bg-cream/90 p-4 text-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Token</p>
                  <p className="mt-2 font-mono text-sm">COCO-48F2-19AS-7XQ9</p>
                  <p className="mt-3 text-xs text-espresso/60">
                    Store securely (Roblox Secrets Store recommended).
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Universe access</h3>
                  <p className="text-sm text-espresso/70">Whitelist the experiences that can load your systems.</p>
                </div>
                <button
                  onClick={handleAddUniverse}
                  className="rounded-full bg-espresso px-4 py-2 text-xs uppercase tracking-widest text-cream"
                >
                  Add Universe
                </button>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <input
                  value={universeId}
                  onChange={(event) => setUniverseId(event.target.value)}
                  className="rounded-full border border-espresso/20 bg-transparent px-4 py-2 text-sm"
                  placeholder="Universe ID"
                />
                <input
                  value={universeLabel}
                  onChange={(event) => setUniverseLabel(event.target.value)}
                  className="rounded-full border border-espresso/20 bg-transparent px-4 py-2 text-sm"
                  placeholder="Label (optional)"
                />
              </div>
              <div className="mt-6 space-y-3">
                {universeEntries.length === 0 && (
                  <p className="text-sm text-espresso/60">No Universe IDs added yet.</p>
                )}
                {universeEntries.map((entry) => (
                  <div
                    key={`${entry.id}-${entry.label}`}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-espresso/10 bg-cream/90 p-4 text-sm"
                  >
                    <div>
                      <p className="font-semibold">{entry.label}</p>
                      <p className="text-xs text-espresso/60">Universe ID: {entry.id}</p>
                    </div>
                    <span className="text-[0.65rem] uppercase tracking-[0.3em] text-espresso/50">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-espresso/10 bg-cream/90">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-espresso/70">
            Coco brews modular Roblox systems—built from proven bases, customized to taste.
          </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-espresso/50">
            <span>contact@coco.dev</span>
            <span>Build slots: 2 open</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
