'use client';

import { useMemo, useState } from 'react';

const bases = [
  {
    id: 'starter-shot',
    name: 'Starter Shot',
    description: 'Fast MVP or drop-in install with clean defaults and fast turnaround.',
    bestFor: 'Best for fresh launches or quick fixes.',
    timeline: 'Timeline: 1-2 weeks'
  },
  {
    id: 'house-latte',
    name: 'House Latte',
    description: 'Full integration into an existing codebase and gameplay loop.',
    bestFor: 'Best for teams shipping live experiences.',
    timeline: 'Timeline: 3-5 weeks'
  },
  {
    id: 'cold-brew-ops',
    name: 'Cold Brew Ops',
    description: 'Ongoing updates, tuning, and live-ops support with steady velocity.',
    bestFor: 'Best for long-term live-ops.',
    timeline: 'Timeline: Monthly cadence'
  }
];

const moduleCategories = [
  {
    id: 'core',
    name: 'Core Foundations',
    items: [
      {
        id: 'datastore-profile-core',
        name: 'DataStore Profile Core',
        tags: ['foundational', 'popular'],
        description: 'Versioning, migrations, safe saves, and session locks.',
        includes: ['Schema versioning', 'Safe saves', 'Session locking', 'Migration helpers']
      },
      {
        id: 'player-stats-core',
        name: 'Player Stats & Attributes Core',
        tags: ['foundational'],
        description: 'Stat definitions, replication rules, server authority.',
        includes: ['Stat registry', 'Replication rules', 'Server authority', 'Access helpers']
      },
      {
        id: 'leaderboard-system',
        name: 'Leaderboard System',
        tags: ['popular'],
        description: 'Global, weekly, seasonal boards with anti-exploit scoring.',
        includes: ['Seasonal tables', 'Anti-exploit scoring', 'Rollovers']
      },
      {
        id: 'settings-config-system',
        name: 'Settings & Config System',
        tags: ['foundational'],
        description: 'Feature flags, environment toggles, safe rollout switches.',
        includes: ['Feature flags', 'Environment toggles', 'Rollout controls']
      }
    ]
  },
  {
    id: 'competitive',
    name: 'Competitive & Match',
    items: [
      {
        id: 'timer-state-machine',
        name: 'Timer + State Machine',
        tags: ['best for competitive'],
        description: 'Round phases, intermission, overtime, and transitions.',
        includes: ['Round phases', 'Intermission', 'Overtime', 'Transition hooks']
      },
      {
        id: 'matchmaking-queue',
        name: 'Matchmaking + Queue',
        tags: ['popular', 'best for competitive'],
        description: 'Party and solo queues, balancing, join-in-progress toggles.',
        includes: ['Party/solo', 'Role balancing', 'Join-in-progress']
      },
      {
        id: 'team-role-assignment',
        name: 'Team & Role Assignment',
        tags: ['best for competitive'],
        description: 'Factions, auto-balancing, loadout constraints.',
        includes: ['Faction setup', 'Auto-balance', 'Loadout rules']
      },
      {
        id: 'arena-rotation',
        name: 'Arena Rotation + Map Voting',
        tags: ['popular'],
        description: 'Weighted randomness, skip logic, map metadata.',
        includes: ['Map metadata', 'Weighted rotation', 'Voting logic']
      }
    ]
  },
  {
    id: 'economy',
    name: 'Economy & Retention',
    items: [
      {
        id: 'currency-wallet',
        name: 'Currency & Wallet System',
        tags: ['popular'],
        description: 'Multiple currencies, sinks/sources, inflation controls.',
        includes: ['Multi-currency', 'Inflation controls', 'Wallet rules']
      },
      {
        id: 'shop-dev-products',
        name: 'Shop & Dev Products',
        tags: ['best for RP'],
        description: 'Bundles, receipts, retry logic, entitlement caching.',
        includes: ['Bundles', 'Receipt retries', 'Entitlement cache']
      },
      {
        id: 'daily-weekly-rewards',
        name: 'Daily/Weekly Rewards',
        tags: ['retention'],
        description: 'Streaks, catch-up logic, anti-abuse filters.',
        includes: ['Streaks', 'Catch-up', 'Anti-abuse']
      },
      {
        id: 'quests-objectives',
        name: 'Quests & Objectives',
        tags: ['retention'],
        description: 'Templates, tracking, and reward pipelines.',
        includes: ['Quest templates', 'Tracking hooks', 'Rewards']
      },
      {
        id: 'progression-prestige',
        name: 'Progression & Prestige Loop',
        tags: ['retention'],
        description: 'Levels, XP curves, resets with perks.',
        includes: ['XP curves', 'Prestige resets', 'Perk hooks']
      },
      {
        id: 'event-scheduler',
        name: 'Event Scheduler',
        tags: ['seasonal'],
        description: 'Seasonal events, timed drops, limited items.',
        includes: ['Seasonal timers', 'Drop logic', 'Limited items']
      }
    ]
  },
  {
    id: 'admin',
    name: 'Admin & Ops',
    items: [
      {
        id: 'admin-permissions',
        name: 'Admin Commands + Permissions',
        tags: ['foundational'],
        description: 'Role keys, permission gates, audit logs.',
        includes: ['Role keys', 'Permission gates', 'Audit logs']
      },
      {
        id: 'moderation-tools',
        name: 'Moderation Tools',
        tags: ['ops'],
        description: 'Kick/ban/mute tools with escalation notes.',
        includes: ['Kick/ban/mute', 'Escalation notes', 'History']
      },
      {
        id: 'live-ops-panel',
        name: 'Live Ops Panel',
        tags: ['ops'],
        description: 'Toggle features, spawn items, adjust rewards.',
        includes: ['Feature toggles', 'Spawn tools', 'Reward tuning']
      },
      {
        id: 'incident-logging',
        name: 'Error/Incident Logging',
        tags: ['ops'],
        description: 'Server logs, alerts, reproduction metadata.',
        includes: ['Log pipeline', 'Alert routing', 'Metadata']
      }
    ]
  },
  {
    id: 'social',
    name: 'Social & Community',
    items: [
      {
        id: 'party-system',
        name: 'Party System',
        tags: ['best for RP'],
        description: 'Invites, teleport follow, party chat hooks.',
        includes: ['Invites', 'Teleport follow', 'Party chat']
      },
      {
        id: 'guild-group',
        name: 'Guild/Group Integration',
        tags: ['community'],
        description: 'Rank sync, perks, group-locked content.',
        includes: ['Rank sync', 'Perk sync', 'Group gating']
      },
      {
        id: 'social-ui',
        name: 'Social UI Components',
        tags: ['polish'],
        description: 'Profile cards, badges, and titles.',
        includes: ['Profile cards', 'Badges', 'Titles']
      }
    ]
  },
  {
    id: 'polish',
    name: 'Polish & UX',
    items: [
      {
        id: 'ui-kit',
        name: 'UI Kit for Roblox',
        tags: ['polish'],
        description: 'Consistent components, toasts, modals.',
        includes: ['Component kit', 'Toasts', 'Modals']
      },
      {
        id: 'animation-feedback',
        name: 'Animation & Feedback Pass',
        tags: ['polish'],
        description: 'Micro-animations, audio cues, satisfying feedback.',
        includes: ['Micro-animations', 'Audio cues', 'Feel tuning']
      },
      {
        id: 'performance-pass',
        name: 'Performance Optimization Pass',
        tags: ['polish'],
        description: 'Streaming, replication tuning, object pooling.',
        includes: ['Streaming tuning', 'Replication', 'Pooling']
      }
    ]
  }
];

const customizations = [
  {
    id: 'ui-skinning',
    name: 'UI Skinning',
    description: 'Premium UI layer aligned to your brand and theme.'
  },
  {
    id: 'performance-pass',
    name: 'Performance Pass',
    description: 'Profiling, bottleneck fixes, and runtime polish.'
  },
  {
    id: 'telemetry-hooks',
    name: 'Telemetry Hooks',
    description: 'Analytics events, funnel tracking, and observability.'
  },
  {
    id: 'anti-exploit',
    name: 'Anti-Exploit Guardrails',
    description: 'Server-side checks, exploit flags, and audit review.'
  },
  {
    id: 'documentation',
    name: 'Documentation Pack',
    description: 'Clean docs with setup steps, API references, and handoff notes.'
  },
  {
    id: 'integration-help',
    name: 'Integration Help',
    description: 'Pairing session to fit modules into your existing stack.'
  }
];

const productCatalog = [
  {
    id: 'leaderboard-stats',
    name: 'Leaderboard + Stats Core',
    category: 'Core Foundations',
    description: 'The trusted base for ranking, stat integrity, and season resets.',
    solves: 'Reliable progression + competitive visibility.',
    includes: ['Stat schema', 'Leaderboard sync', 'Season rollovers', 'Anti-exploit scoring'],
    requirements: ['DataStore access', 'Server authority layer'],
    addOns: ['Prestige tiers', 'Season rewards', 'Regional ladders']
  },
  {
    id: 'timer-match',
    name: 'Timer + Match System',
    category: 'Competitive & Match',
    description: 'Round flow, intermission, overtime, and match handling.',
    solves: 'Consistent match pacing and game mode stability.',
    includes: ['State machine', 'Timer controls', 'Phase hooks'],
    requirements: ['Game mode definitions', 'UI event hooks'],
    addOns: ['Spectator mode', 'Rejoin support', 'Anti-stall mechanics']
  },
  {
    id: 'admin-permissions-kit',
    name: 'Admin + Permissions Kit',
    category: 'Admin & Ops',
    description: 'Secure operations control with audit logs and escalation tools.',
    solves: 'Safe moderation and live controls.',
    includes: ['Role keys', 'Audit logs', 'Command framework'],
    requirements: ['Role definitions', 'Command UI or console'],
    addOns: ['Discord alerts', 'Escalation ladders', 'Custom reporting']
  },
  {
    id: 'economy-wallet',
    name: 'Economy + Wallet System',
    category: 'Economy & Retention',
    description: 'Multi-currency wallet with sinks and source control.',
    solves: 'Stable long-term economy and retention loops.',
    includes: ['Currency rules', 'Wallet ledger', 'Anti-inflation controls'],
    requirements: ['Shop or rewards loop'],
    addOns: ['Price elasticity', 'Limited rotations', 'Analytics events']
  },
  {
    id: 'matchmaking-queue',
    name: 'Matchmaking + Queue',
    category: 'Competitive & Match',
    description: 'Queue logic for party/solo, role balance, and fill rules.',
    solves: 'Healthier matchmaking and fair sessions.',
    includes: ['Party queue', 'Role balancing', 'Join-in-progress toggles'],
    requirements: ['Player role rules', 'Match server hooks'],
    addOns: ['Ranked ladder hooks', 'Cross-region rules', 'Priority queue']
  },
  {
    id: 'event-scheduler',
    name: 'Event Scheduler',
    category: 'Economy & Retention',
    description: 'Timed drops and seasonal event orchestration.',
    solves: 'Live-event cadence with less manual effort.',
    includes: ['Event calendar', 'Drop triggers', 'Limited-time flags'],
    requirements: ['Item definition list'],
    addOns: ['Announcement hooks', 'Event quests', 'Event-specific UI']
  },
  {
    id: 'ui-kit',
    name: 'UI Kit for Roblox',
    category: 'Polish & UX',
    description: 'Unified UI components for consistent menus and prompts.',
    solves: 'Reliable UI consistency across systems.',
    includes: ['Components', 'Toasts', 'Modal patterns'],
    requirements: ['UI styling direction'],
    addOns: ['Theme variants', 'Accessibility pass', 'Motion tuning']
  },
  {
    id: 'live-ops-panel',
    name: 'Live Ops Panel',
    category: 'Admin & Ops',
    description: 'Remote controls for feature toggles and rewards tuning.',
    solves: 'Safer live updates and quicker response.',
    includes: ['Feature toggles', 'Reward tuning', 'Deployment notes'],
    requirements: ['Admin account mapping'],
    addOns: ['Analytics overlays', 'Alert routing', 'Inventory tools']
  }
];

const buildLogs = [
  {
    id: 'log-leaderboard',
    name: 'Leaderboard + Stats Core',
    goal: 'Ship reliable seasonal ranking for a competitive arena.',
    role: 'Systems architecture + data pipeline.',
    shipped: ['Season resets', 'Stat migration flow', 'Anti-exploit scoring rules']
  },
  {
    id: 'log-timer',
    name: 'Timer + Match System',
    goal: 'Stabilize round flow and reduce match aborts.',
    role: 'Gameplay systems + UI hooks.',
    shipped: ['State machine', 'Intermission flow', 'Overtime logic']
  },
  {
    id: 'log-admin',
    name: 'Admin + Permissions Kit',
    goal: 'Give moderators fast tools without compromising safety.',
    role: 'Ops tooling + audit design.',
    shipped: ['Permission gates', 'Audit logs', 'Quick action commands']
  },
  {
    id: 'log-web',
    name: 'Ops Dashboard (Web)',
    goal: 'Track live event health and user spikes in real time.',
    role: 'Full-stack build + data integrations.',
    shipped: ['Live metrics', 'Alert routing', 'Event calendars']
  }
];

const shelfItems = [
  { id: 'trophy', label: 'Leaderboard' },
  { id: 'clock', label: 'Timer' },
  { id: 'badge', label: 'Permissions' },
  { id: 'coin', label: 'Economy' },
  { id: 'star', label: 'Rewards' }
];

const archetypes = [
  {
    id: 'solo',
    title: 'Solo devs shipping a first serious game',
    pains: ['DataStore reliability', 'Admin tools', 'Retention loops'],
    mapping: 'Starter Shot + core foundations keep scope tight.'
  },
  {
    id: 'studio',
    title: 'Small studios scaling an existing experience',
    pains: ['Match flow', 'Live events', 'Performance issues'],
    mapping: 'House Latte + modules keep the stack consistent.'
  },
  {
    id: 'community',
    title: 'Community-driven RP or competitive projects',
    pains: ['Moderation', 'Economy tuning', 'Social systems'],
    mapping: 'Cold Brew Ops + ongoing tuning keeps it stable.'
  }
];

const aiPresets = [
  {
    id: 'competitive',
    label: "I'm building a competitive game",
    base: 'house-latte',
    modules: ['timer-state-machine', 'matchmaking-queue', 'team-role-assignment', 'datastore-profile-core'],
    reply:
      "For a round-based competitive game, I'd start with House Latte + Timer/State Machine + Queue + Team Assignment + DataStore Core."
  },
  {
    id: 'rp',
    label: "I'm building an RP game",
    base: 'starter-shot',
    modules: ['datastore-profile-core', 'player-stats-core', 'party-system', 'admin-permissions'],
    reply:
      "For RP, I'd start with Starter Shot + DataStore Core + Player Stats + Party System + Admin/Permissions."
  },
  {
    id: 'fast-mvp',
    label: 'Fast MVP mode',
    base: 'starter-shot',
    modules: ['datastore-profile-core', 'player-stats-core', 'ui-kit'],
    reply: 'For a fast MVP, keep it tight: Starter Shot + DataStore Core + Player Stats + UI Kit.'
  }
];

export default function HomePage() {
  const [activeOrderView, setActiveOrderView] = useState<'builder' | 'catalog'>('builder');
  const [selectedBase, setSelectedBase] = useState<string>('house-latte');
  const [selectedModules, setSelectedModules] = useState<string[]>(["datastore-profile-core"]);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>(['ui-skinning']);
  const [expandedMenu, setExpandedMenu] = useState<string | null>('bases');
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(true);
  const [aiMessage, setAiMessage] = useState(
    'Tell me what you’re building, and I’ll recommend a clean base + modules.'
  );

  const selectedModuleItems = useMemo(() => {
    const allModules = moduleCategories.flatMap((category) => category.items);
    return allModules.filter((module) => selectedModules.includes(module.id));
  }, [selectedModules]);

  const selectedCustomizationItems = useMemo(() => {
    return customizations.filter((item) => selectedCustomizations.includes(item.id));
  }, [selectedCustomizations]);

  const selectedBaseItem = useMemo(() => bases.find((base) => base.id === selectedBase), [selectedBase]);

  const complexityLabel = useMemo(() => {
    const score = selectedModules.length + selectedCustomizations.length;
    if (score <= 3) return 'Low complexity';
    if (score <= 6) return 'Medium complexity';
    return 'High complexity';
  }, [selectedModules.length, selectedCustomizations.length]);

  const receiptItems = [
    selectedBaseItem?.name ?? 'No base selected',
    ...selectedModuleItems.map((item) => item.name),
    ...selectedCustomizationItems.map((item) => item.name)
  ];

  const handleToggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleCustomization = (id: string) => {
    setSelectedCustomizations((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAiPreset = (presetId: string) => {
    const preset = aiPresets.find((item) => item.id === presetId);
    if (!preset) return;
    setSelectedBase(preset.base);
    setSelectedModules(preset.modules);
    setAiMessage(preset.reply);
  };

  const activeProductItem = productCatalog.find((item) => item.id === activeProduct);

  return (
    <div className="min-h-screen bg-cream text-espresso">
      <div className="fixed inset-x-0 top-0 z-40 h-1 bg-cream">
        <div className="h-full w-1/3 animate-pour-bar rounded-full bg-espresso/80" />
      </div>

      <header className="sticky top-0 z-30 border-b border-espresso/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full border border-espresso/20 bg-espresso text-cream flex items-center justify-center text-xs font-semibold">
              Coco
            </div>
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-espresso/60">Coco</p>
              <p className="text-sm font-semibold">Modular Roblox Systems</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a className="hover:text-espresso/80" href="#who">
              Who We Are
            </a>
            <a className="hover:text-espresso/80" href="#order">
              Order
            </a>
            <a className="hover:text-espresso/80" href="#portfolio">
              Portfolio
            </a>
          </nav>
          <div className="hidden md:flex">
            <a
              href="#order"
              className="rounded-full bg-espresso px-4 py-2 text-xs font-semibold uppercase tracking-widest text-cream shadow-soft transition hover:-translate-y-0.5"
            >
              Start an Order
            </a>
          </div>
          <div className="md:hidden">
            <button className="rounded-full border border-espresso/20 px-3 py-1 text-xs uppercase tracking-widest">
              Menu
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pb-20">
        <section id="who" className="relative overflow-hidden py-16">
          <div className="absolute right-0 top-6 hidden h-40 w-40 rounded-full bg-espresso/10 blur-3xl md:block" />
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Welcome to Coco</p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Modular Roblox systems, brewed fast and tuned clean.
              </h1>
              <p className="text-base text-espresso/70">
                Coco builds repeatable, production-ready Roblox systems that reduce rework, speed up
                shipping, and scale better than one-off scripts.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#order"
                  className="rounded-full bg-espresso px-5 py-2 text-xs font-semibold uppercase tracking-widest text-cream shadow-soft"
                >
                  Build your order
                </a>
                <a
                  href="#order"
                  className="rounded-full border border-espresso/20 px-5 py-2 text-xs font-semibold uppercase tracking-widest"
                >
                  Browse the menu
                </a>
              </div>
            </div>
            <div className="relative space-y-4 rounded-3xl border border-espresso/15 bg-cream/80 p-6 shadow-soft">
              <div className="absolute -top-6 right-4 h-24 w-24 rounded-full bg-espresso/10 blur-2xl" />
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Ambient</p>
              <div className="relative h-40 overflow-hidden rounded-2xl border border-espresso/10 bg-espresso/5">
                <div className="steam" />
                <div className="steam steam-delayed" />
                <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.3em] text-espresso/50">
                  Steam Drift
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Base', 'Modules', 'Custom'].map((item, index) => (
                  <div
                    key={item}
                    className="flex flex-col items-start gap-2 rounded-2xl border border-espresso/10 bg-cream/90 p-3"
                  >
                    <span className="text-xs uppercase tracking-[0.35em] text-espresso/50">0{index + 1}</span>
                    <span className="text-sm font-semibold">{item}</span>
                    <div className="h-2 w-full rounded-full bg-espresso/10">
                      <div
                        className="h-full rounded-full bg-espresso/60"
                        style={{ width: `${35 + index * 20}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                id: 'bases',
                title: 'Bases',
                description: 'Proven foundations that ship fast.',
                examples: ['Starter Shot', 'House Latte', 'Cold Brew Ops']
              },
              {
                id: 'modules',
                title: 'Modules',
                description: 'Plug-in systems like stats, matchmaking, economy.',
                examples: ['DataStore core', 'Match flow', 'Economy loops']
              },
              {
                id: 'custom',
                title: 'Customizations',
                description: 'Performance, UI skin, guardrails.',
                examples: ['UI skinning', 'Telemetry', 'Anti-exploit']
              }
            ].map((tile) => (
              <button
                key={tile.id}
                onClick={() => setExpandedMenu(expandedMenu === tile.id ? null : tile.id)}
                className="group rounded-3xl border border-espresso/10 bg-cream/80 p-6 text-left shadow-soft transition hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{tile.title}</h3>
                  <span className="rounded-full border border-espresso/10 px-2 py-1 text-[0.6rem] uppercase tracking-[0.3em]">
                    Expand
                  </span>
                </div>
                <p className="mt-2 text-sm text-espresso/70">{tile.description}</p>
                {expandedMenu === tile.id && (
                  <div className="mt-4 space-y-2 text-xs text-espresso/70">
                    {tile.examples.map((example) => (
                      <div key={example} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-espresso/60" />
                        <span>{example}</span>
                      </div>
                    ))}
                    <div className="mt-3 h-2 w-full rounded-full bg-espresso/10">
                      <div className="h-full w-2/3 rounded-full bg-espresso/60 animate-cup-fill" />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">How We Brew</p>
              <h2 className="text-2xl font-semibold">Pick a base. Add modules. Ship and tune.</h2>
              <div className="space-y-4 text-sm text-espresso/70">
                <p>
                  We start with a proven base, add only the modules you need, then tune performance
                  and polish for launch.
                </p>
                <ol className="space-y-2">
                  <li>01 — Choose a base that fits your scope.</li>
                  <li>02 — Layer modules like stats, matchmaking, economy.</li>
                  <li>03 — Customize, tune, and ship with confidence.</li>
                </ol>
              </div>
            </div>
            <div className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Brew Meter</p>
              <div className="mt-4 h-40 rounded-2xl border border-espresso/10 bg-espresso/5 p-4">
                <div className="flex h-full items-end justify-between">
                  {[35, 55, 75].map((height, index) => (
                    <div key={height} className="flex w-1/3 flex-col items-center gap-2">
                      <div className="h-full w-6 rounded-full bg-espresso/10">
                        <div
                          className="animate-cup-fill rounded-full bg-espresso/60"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                      <span className="text-[0.65rem] uppercase tracking-[0.35em] text-espresso/50">
                        Step 0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm text-espresso/70">
                The brew meter rises as you progress. Gentle motion, zero friction.
              </p>
            </div>
          </div>

          <div className="mt-16 space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Who it’s for</p>
            <div className="grid gap-4 md:grid-cols-3">
              {archetypes.map((item) => (
                <div key={item.id} className="rounded-3xl border border-espresso/10 bg-cream/80 p-5 shadow-soft">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <ul className="mt-3 space-y-1 text-xs text-espresso/70">
                    {item.pains.map((pain) => (
                      <li key={pain}>• {pain}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-espresso/60">{item.mapping}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="order" className="py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Order</p>
              <h2 className="text-3xl font-semibold">Choose your base, add modules, customize.</h2>
              <p className="text-sm text-espresso/70">
                Build a package or browse the catalog. Your order tray stays with you.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveOrderView('builder')}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest ${
                  activeOrderView === 'builder'
                    ? 'bg-espresso text-cream'
                    : 'border border-espresso/20 text-espresso'
                }`}
              >
                Build a Package
              </button>
              <button
                onClick={() => setActiveOrderView('catalog')}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest ${
                  activeOrderView === 'catalog'
                    ? 'bg-espresso text-cream'
                    : 'border border-espresso/20 text-espresso'
                }`}
              >
                Browse Products
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_0.6fr]">
            <div className="space-y-8">
              {aiOpen && (
                <div className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-espresso text-cream flex items-center justify-center text-xs font-semibold">
                        AI
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-espresso/50">AI Barista</p>
                        <p className="text-sm font-semibold">Short, practical guidance.</p>
                      </div>
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
                    {aiPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleAiPreset(preset.id)}
                        className="rounded-full border border-espresso/20 px-3 py-1 text-xs"
                      >
                        {preset.label}
                      </button>
                    ))}
                    <button className="rounded-full border border-espresso/20 px-3 py-1 text-xs">
                      Add recommended modules
                    </button>
                    <button className="rounded-full border border-espresso/20 px-3 py-1 text-xs">
                      Show cheaper option
                    </button>
                    <button className="rounded-full border border-espresso/20 px-3 py-1 text-xs">
                      Skip and browse
                    </button>
                    <button className="rounded-full border border-espresso/20 px-3 py-1 text-xs">
                      Place order
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-3 rounded-2xl border border-espresso/10 bg-cream/90 px-4 py-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-espresso/50">Tell me</span>
                    <input
                      placeholder="Tell me what you’re building"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-espresso/40"
                    />
                    <button className="rounded-full bg-espresso px-3 py-1 text-xs uppercase tracking-widest text-cream">
                      Send
                    </button>
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

              {activeOrderView === 'builder' ? (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Stage 1 — Choose a base</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      {bases.map((base) => (
                        <button
                          key={base.id}
                          onClick={() => setSelectedBase(base.id)}
                          className={`rounded-3xl border p-5 text-left shadow-soft transition hover:-translate-y-1 ${
                            selectedBase === base.id
                              ? 'border-espresso bg-espresso text-cream'
                              : 'border-espresso/10 bg-cream/80'
                          }`}
                        >
                          <h4 className="text-sm font-semibold">{base.name}</h4>
                          <p className="mt-2 text-xs opacity-80">{base.description}</p>
                          <p className="mt-3 text-[0.65rem] uppercase tracking-[0.3em] opacity-70">
                            {base.bestFor}
                          </p>
                          <p className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] opacity-70">
                            {base.timeline}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Stage 2 — Pick your modules</h3>
                    {moduleCategories.map((category) => (
                      <div key={category.id} className="space-y-3">
                        <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">{category.name}</p>
                        <div className="grid gap-4 md:grid-cols-2">
                          {category.items.map((module) => (
                            <button
                              key={module.id}
                              onClick={() => handleToggleModule(module.id)}
                              className={`rounded-3xl border p-5 text-left shadow-soft transition hover:-translate-y-1 ${
                                selectedModules.includes(module.id)
                                  ? 'border-espresso bg-espresso text-cream'
                                  : 'border-espresso/10 bg-cream/80'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold">{module.name}</h4>
                                <div className="flex gap-1 text-[0.55rem] uppercase tracking-[0.3em]">
                                  {module.tags.map((tag) => (
                                    <span key={tag} className="rounded-full border px-2 py-1">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <p className="mt-2 text-xs opacity-80">{module.description}</p>
                              <ul className="mt-3 space-y-1 text-[0.65rem] opacity-70">
                                {module.includes.map((item) => (
                                  <li key={item}>• {item}</li>
                                ))}
                              </ul>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Stage 3 — Customizations</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {customizations.map((custom) => (
                        <button
                          key={custom.id}
                          onClick={() => handleToggleCustomization(custom.id)}
                          className={`rounded-3xl border p-5 text-left shadow-soft transition hover:-translate-y-1 ${
                            selectedCustomizations.includes(custom.id)
                              ? 'border-espresso bg-espresso text-cream'
                              : 'border-espresso/10 bg-cream/80'
                          }`}
                        >
                          <h4 className="text-sm font-semibold">{custom.name}</h4>
                          <p className="mt-2 text-xs opacity-80">{custom.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Receipt Preview</p>
                        <h3 className="text-lg font-semibold">Request this order</h3>
                      </div>
                      <span className="rounded-full border border-espresso/20 px-3 py-1 text-xs uppercase tracking-widest">
                        {complexityLabel}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2 rounded-2xl border border-espresso/10 bg-cream/90 p-4 text-sm">
                      {receiptItems.map((item) => (
                        <div key={item} className="flex items-center justify-between">
                          <span>{item}</span>
                          <span className="text-xs uppercase tracking-[0.3em] text-espresso/50">Scope-based</span>
                        </div>
                      ))}
                    </div>
                    <form className="mt-4 grid gap-3 text-xs">
                      <input
                        className="rounded-full border border-espresso/20 bg-transparent px-4 py-2"
                        placeholder="Name"
                      />
                      <input
                        className="rounded-full border border-espresso/20 bg-transparent px-4 py-2"
                        placeholder="Email"
                      />
                      <textarea
                        className="min-h-[96px] rounded-3xl border border-espresso/20 bg-transparent px-4 py-3"
                        placeholder="Tell us about your experience, timeline, and constraints."
                      />
                      <button
                        type="button"
                        className="rounded-full bg-espresso px-4 py-2 text-xs uppercase tracking-widest text-cream"
                      >
                        Request This Order
                      </button>
                      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-espresso/50">
                        Order placed → We review and respond with a build plan.
                      </p>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex gap-3">
                      <input
                        className="rounded-full border border-espresso/20 bg-transparent px-4 py-2 text-xs"
                        placeholder="Search products"
                      />
                      <select className="rounded-full border border-espresso/20 bg-transparent px-4 py-2 text-xs">
                        <option>All categories</option>
                        {moduleCategories.map((category) => (
                          <option key={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">
                      {productCatalog.length} products
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {productCatalog.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => setActiveProduct(product.id)}
                        className="rounded-3xl border border-espresso/10 bg-cream/80 p-5 text-left shadow-soft transition hover:-translate-y-1"
                      >
                        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-espresso/50">
                          {product.category}
                        </p>
                        <h4 className="mt-2 text-sm font-semibold">{product.name}</h4>
                        <p className="mt-2 text-xs text-espresso/70">{product.description}</p>
                        <span className="mt-3 inline-flex rounded-full border border-espresso/20 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em]">
                          View details
                        </span>
                      </button>
                    ))}
                  </div>

                  {activeProductItem && (
                    <div className="rounded-3xl border border-espresso/15 bg-cream/90 p-6 shadow-soft">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">
                            {activeProductItem.category}
                          </p>
                          <h3 className="text-xl font-semibold">{activeProductItem.name}</h3>
                        </div>
                        <button
                          onClick={() => setActiveProduct(null)}
                          className="text-xs uppercase tracking-[0.3em] text-espresso/50"
                        >
                          Close
                        </button>
                      </div>
                      <p className="mt-3 text-sm text-espresso/70">{activeProductItem.description}</p>
                      <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Solves</p>
                          <p className="mt-2 text-sm">{activeProductItem.solves}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Includes</p>
                          <ul className="mt-2 space-y-1 text-xs text-espresso/70">
                            {activeProductItem.includes.map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Requirements</p>
                          <ul className="mt-2 space-y-1 text-xs text-espresso/70">
                            {activeProductItem.requirements.map((item) => (
                              <li key={item}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Add-ons</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {activeProductItem.addOns.map((item) => (
                            <span key={item} className="rounded-full border border-espresso/20 px-3 py-1 text-xs">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button className="rounded-full bg-espresso px-4 py-2 text-xs uppercase tracking-widest text-cream">
                          Request build
                        </button>
                        <button className="rounded-full border border-espresso/20 px-4 py-2 text-xs uppercase tracking-widest">
                          Add to order tray
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <aside className="sticky top-24 h-fit rounded-3xl border border-espresso/15 bg-cream/90 p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Order Tray</p>
                  <h3 className="text-lg font-semibold">Your selections</h3>
                </div>
                <div className="h-10 w-10 rounded-full border border-espresso/20 bg-espresso/10 p-2">
                  <div className="h-full w-full rounded-full bg-espresso/40 animate-cup-fill" />
                </div>
              </div>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Base</p>
                  <p className="mt-2 font-semibold">{selectedBaseItem?.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Modules</p>
                  <ul className="mt-2 space-y-1 text-xs text-espresso/70">
                    {selectedModuleItems.map((item) => (
                      <li key={item.id}>• {item.name}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-espresso/50">Customizations</p>
                  <ul className="mt-2 space-y-1 text-xs text-espresso/70">
                    {selectedCustomizationItems.map((item) => (
                      <li key={item.id}>• {item.name}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-espresso/15 bg-cream/80 p-3 text-xs">
                  <p className="uppercase tracking-[0.3em] text-espresso/50">Complexity</p>
                  <p className="mt-2 text-sm font-semibold">{complexityLabel}</p>
                </div>
                <button className="w-full rounded-full bg-espresso px-4 py-2 text-xs uppercase tracking-widest text-cream">
                  Request Build Slot
                </button>
              </div>
            </aside>
          </div>
        </section>

        <section id="portfolio" className="py-16">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Portfolio + About</p>
              <h2 className="text-3xl font-semibold">Systems builder. Roblox specialist. Full-stack when it matters.</h2>
              <p className="text-sm text-espresso/70">
                Modular architecture, clear service boundaries, and production discipline. Build logs
                tell the story without fluff.
              </p>
              <div className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Skills & Tooling</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {[
                    'Roblox Lua architecture',
                    'Client/server networking',
                    'DataStore patterns',
                    'Modular service frameworks',
                    'UI systems',
                    'Discord bots + web dashboards',
                    'Optional AI hooks'
                  ].map((skill) => (
                    <span key={skill} className="rounded-full border border-espresso/20 px-3 py-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">3D Shelf</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {shelfItems.map((item, index) => (
                  <div key={item.id} className="flex flex-col items-center gap-3 rounded-2xl border border-espresso/10 bg-cream/90 p-4">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl border border-espresso/20 bg-espresso/10 text-sm font-semibold"
                      style={{ animationDelay: `${index * 0.4}s` }}
                    >
                      <span className="shelf-orb" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-espresso/60">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {buildLogs.map((log) => (
              <div key={log.id} className="rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Build log</p>
                <h3 className="mt-2 text-lg font-semibold">{log.name}</h3>
                <p className="mt-2 text-sm text-espresso/70">{log.goal}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.3em] text-espresso/50">Role</p>
                <p className="text-sm">{log.role}</p>
                <ul className="mt-3 space-y-1 text-xs text-espresso/70">
                  {log.shipped.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <a
                  href="#order"
                  className="mt-4 inline-flex rounded-full border border-espresso/20 px-4 py-2 text-xs uppercase tracking-widest"
                >
                  Request something like this
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-espresso/10 bg-cream/80 p-6 shadow-soft">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-espresso/50">Engagement models</p>
                <h3 className="text-xl font-semibold">One-time builds or an ongoing tab.</h3>
                <p className="text-sm text-espresso/70">
                  Consistent improvements and quick fixes, like being a regular at the café.
                </p>
              </div>
              <a
                href="#order"
                className="rounded-full bg-espresso px-4 py-2 text-xs uppercase tracking-widest text-cream"
              >
                Start an order
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-espresso/10 bg-cream/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-espresso/70">
            Coco brews modular Roblox systems—built from proven bases, customized to taste.
          </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-espresso/50">
            <span>contact@coco.dev</span>
            <span>Build slots: 2 open</span>
            <a href="#order" className="text-espresso/80">
              Request a build slot
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
