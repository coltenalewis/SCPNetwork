export type LinkItem = {
  label: string;
  url: string;
  type: 'game' | 'community';
};

export type WorkEntry = {
  id: string;
  company: string;
  role: string;
  dates: string;
  summary: string[];
  links: LinkItem[];
};

export type Project = {
  slug: string;
  title: string;
  url: string;
  roleBadges: string[];
  oneLiner: string;
  tags: string[];
  overview: string;
  responsibilities: string[];
  systems: string[];
  highlights: string[];
  problem: string;
  solution: string;
  outcome: string;
};

export type AiIntegrationContent = {
  intro: string[];
  applications: { title: string; description: string }[];
  closing: string;
};

export const profileLinks = {
  linkedIn: 'https://www.linkedin.com/in/colten-lewis-2b05a7220/',
  creatorHub: '[CREATOR_HUB_URL_PLACEHOLDER]',
  chesapeake: 'https://www.roblox.com/communities/17005184/Chesapeake-Studios',
  email: '[EMAIL_PLACEHOLDER]',
  discord: '[DISCORD_PLACEHOLDER]'
};

export const workHistory: WorkEntry[] = [
  {
    id: 'chesapeake',
    company: 'Chesapeake Studios',
    role: 'Creative Producer / Programmer',
    dates: 'Dec 2024 – Dec 2025',
    summary: [
      'Led production across multiple live Roblox titles by coordinating planning, sprint execution, and feature direction between design, engineering, and content teams. Defined release priorities and translated studio goals into scoped, shippable milestones.',
      'Oversaw systems updates and live operations loops, while also contributing environmental art direction and UI design across title initiatives like His Majesty’s Government and The Foundation: SCP Roleplay. Used community feedback to guide iteration and maintain quality across updates.'
    ],
    links: [
      { label: 'Oath of Office', url: 'https://www.roblox.com/games/110814051639689/Oath-of-Office-Political-Simulator', type: 'game' },
      { label: "His Majesty's Government", url: 'https://www.roblox.com/games/97694071689916/His-Majestys-Government', type: 'game' },
      { label: 'The Foundation: SCP Roleplay', url: 'https://www.roblox.com/games/90503149907738/The-Foundation-SCP-Roleplay', type: 'game' },
      { label: 'Chesapeake Studios', url: 'https://www.roblox.com/communities/17005184/Chesapeake-Studios', type: 'community' }
    ]
  },
  {
    id: 'aot',
    company: 'Attack on Titan: Freedom Awaits',
    role: 'Programmer',
    dates: 'Nov 2020 – Jan 2021',
    summary: [
      'Built gameplay-facing systems and implementation support for a high-interest Roblox title that operated at large player scale. Focused on dependable feature delivery and maintainable scripting patterns as the game expanded.',
      'Worked closely with team leads to ship updates quickly without sacrificing experience consistency.'
    ],
    links: [
      {
        label: 'Attack on Titan: Freedom Awaits',
        url: 'https://www.roblox.com/games/6034188975/NEW-FOREST-Attack-on-Titan-Freedom-Awaits-Demo?',
        type: 'game'
      }
    ]
  },
  {
    id: 'swuo',
    company: 'Star Wars Universe Online',
    role: 'Development Manager',
    dates: 'Nov 2018 – Jan 2021',
    summary: [
      'Managed development coordination across contributors, balancing delivery timelines with quality standards for live content. Supported team communication, task routing, and release readiness for ongoing updates.',
      'Helped maintain and evolve systems at scale while keeping the content pipeline moving across development, polish, and deployment phases.'
    ],
    links: [
      {
        label: 'Star Wars Universe Online',
        url: 'https://www.roblox.com/games/3971269762/Star-Wars-Universe-Online-MAIN-MENU-UPDATE?',
        type: 'game'
      }
    ]
  }
];

export const projects: Project[] = [
  {
    slug: 'oath-of-office',
    title: 'Oath of Office',
    url: 'https://www.roblox.com/games/110814051639689/Oath-of-Office-Political-Simulator',
    roleBadges: ['Producer', 'Programmer', 'Environmental Artist', 'UI Design'],
    oneLiner: 'Designed and shipped governance, progression, and live-balancing systems for political roleplay loops.',
    tags: ['Systems', 'Live Ops', 'Production'],
    overview: 'A live political simulator requiring robust progression states, role permissions, and event reliability.',
    responsibilities: ['Roadmap planning', 'System direction', 'Engineering execution', 'Release cadence'],
    systems: ['Role authority framework', 'Session-safe progression', 'Live update controls'],
    highlights: ['Modular service patterns', 'Runtime balancing support', 'Operational rollout planning'],
    problem: 'Feature growth risked inconsistent state logic and difficult live update handling.',
    solution: 'Implemented modular systems and release process checkpoints tied to operational telemetry.',
    outcome: 'Enabled safer updates, clearer ownership boundaries, and more stable live feature iteration.'
  },
  {
    slug: 'his-majestys-government',
    title: "His Majesty's Government",
    url: 'https://www.roblox.com/games/97694071689916/His-Majestys-Government',
    roleBadges: ['Producer', 'Programmer', 'Environmental Artist', 'UI Design'],
    oneLiner: 'Built scalable role and session systems aligned with production milestones and content teams.',
    tags: ['Systems', 'Production', 'UI'],
    overview: 'A structure-heavy roleplay title needing reliable state management and predictable feature delivery.',
    responsibilities: ['Feature scoping', 'Cross-team coordination', 'Gameplay systems implementation'],
    systems: ['Permission hierarchies', 'Session continuity logic', 'UI flow optimization'],
    highlights: ['Service-layer architecture', 'Dependency-light UI patterning', 'Milestone release documentation'],
    problem: 'As scope expanded, feature dependencies became harder to ship cleanly.',
    solution: 'Introduced defined integration checkpoints and modular systems with clearer interfaces.',
    outcome: 'Reduced rollout friction and improved handoff quality across disciplines.'
  },
  {
    slug: 'foundation-scp-roleplay',
    title: 'The Foundation: SCP Roleplay',
    url: 'https://www.roblox.com/games/90503149907738/The-Foundation-SCP-Roleplay',
    roleBadges: ['Producer', 'Programmer', 'Environmental Artist', 'UI Design'],
    oneLiner: 'Directed live systems updates for high-complexity roleplay scenarios and content pacing.',
    tags: ['Systems', 'Live Ops', 'Performance'],
    overview: 'A live SCP roleplay environment where systems reliability and update quality directly impact retention.',
    responsibilities: ['Production oversight', 'Live operations planning', 'Systems design and tuning'],
    systems: ['Round-state management', 'Progression balancing', 'Incident-safe update workflow'],
    highlights: ['Performance-aware architecture', 'Feedback-loop iteration', 'Operational launch readiness'],
    problem: 'Frequent live updates required consistency across gameplay and infrastructure.',
    solution: 'Combined production-level planning with modular system upgrades and guardrails.',
    outcome: 'Maintained stable experiences while increasing delivery pace.'
  },
  {
    slug: 'attack-on-titan-freedom-awaits',
    title: 'Attack on Titan: Freedom Awaits',
    url: 'https://www.roblox.com/games/6034188975/NEW-FOREST-Attack-on-Titan-Freedom-Awaits-Demo?',
    roleBadges: ['Programmer'],
    oneLiner: 'Implemented gameplay systems to support a fast-growing title with large-scale player demand.',
    tags: ['Systems', 'Performance'],
    overview: 'Anime-inspired action title requiring responsive systems and maintainable gameplay scripting.',
    responsibilities: ['Core scripting', 'Gameplay support', 'Update reliability'],
    systems: ['Combat-adjacent logic hooks', 'Player state handling', 'Patch-safe system adjustments'],
    highlights: ['Scale-aware implementation', 'Low-friction debug patterns', 'Coordination with design'],
    problem: 'Rapid growth increased pressure on consistency and runtime performance.',
    solution: 'Focused on structured code organization and operationally safe feature changes.',
    outcome: 'Supported large-scale play while preserving a stable development rhythm.'
  },
  {
    slug: 'star-wars-universe-online',
    title: 'Star Wars Universe Online',
    url: 'https://www.roblox.com/games/3971269762/Star-Wars-Universe-Online-MAIN-MENU-UPDATE?',
    roleBadges: ['Dev Manager'],
    oneLiner: 'Managed contributors and content pipelines while supporting long-running system maintenance.',
    tags: ['Production', 'Live Ops', 'Systems'],
    overview: 'Long-running project with broad contributor needs and continuous release expectations.',
    responsibilities: ['Development management', 'Delivery coordination', 'System maintenance planning'],
    systems: ['Content pipeline support', 'Operational release structure', 'Team coordination workflow'],
    highlights: ['Cross-discipline planning', 'Scalable process design', 'Long-horizon maintenance'],
    problem: 'Sustaining quality over long release cycles required stronger coordination systems.',
    solution: 'Improved production structure, role clarity, and release process consistency.',
    outcome: 'Enabled steady content output and resilient long-term project operations.'
  }
];

export const capabilityGroups = [
  {
    title: 'Roblox Development',
    items: [
      'Client/server architecture',
      'Data persistence patterns',
      'Modular service frameworks',
      'Server performance/scalability',
      'Gameplay systems (combat/progression/economies/customization)',
      'UI/UX implementation',
      'Live operations support and ongoing updates'
    ]
  },
  {
    title: 'Web & Tools',
    items: [
      'React, Next.js, and Tailwind application development',
      'Supabase familiarity and similar data/back-end service integrations',
      'JavaScript + TypeScript web tooling',
      'Discord bots, dashboards, and internal production tools'
    ]
  },
  {
    title: '3D, Pipeline & Platforms',
    items: [
      'Low-to-medium poly modeling with UV unwrap + texturing',
      'Terrain/environmental art (terrain + part-based)',
      'Level design',
      'Substance Painter 3D, Blender, and Roblox Studio workflows',
      'Visual Studio Code + GitHub collaboration and source control practices'
    ]
  },
  {
    title: 'Production',
    items: ['Project management', 'Feature scoping, milestone delivery, live release lifecycle', 'Cross-discipline coordination']
  }
];

export const aiIntegrationContent: AiIntegrationContent = {
  intro: [
    'I design and implement AI-assisted systems as practical infrastructure that enhances both player experiences and development workflows. My focus is on production-ready solutions that improve scalability, operational awareness, and delivery speed rather than novelty features. Across analytics, gameplay, moderation, and project management, I integrate AI as a controlled augmentation layer alongside deterministic systems, ensuring outputs remain reliable, interpretable, and aligned with design intent.',
    'These capabilities have been applied to interpret complex telemetry, forecast production timelines, generate context-aware content, and streamline repetitive engineering tasks. By embedding AI into internal tooling and pipelines, I reduce manual workload, accelerate iteration cycles, and maintain high code quality, allowing teams to ship features faster without compromising stability or maintainability.'
  ],
  applications: [
    {
      title: 'Analytics Interpretation & Forecasting',
      description:
        'AI-assisted pipelines that analyze usage data to surface trends, anomalies, and actionable insights for capacity planning, feature prioritization, and retention strategy.'
    },
    {
      title: 'Production Modeling & Task Management',
      description:
        'Systems that evaluate scope, dependencies, and team velocity to forecast timelines, identify bottlenecks, and optimize milestone planning for live projects.'
    },
    {
      title: 'Dynamic NPC Dialogue Frameworks',
      description:
        'Context-aware dialogue generation constrained by gameplay state, tone guidelines, and safety rules, enabling scalable narrative interactions without rigid scripting trees.'
    },
    {
      title: 'Moderation & Community Safety Tooling',
      description:
        'AI-assisted workflows that flag high-risk content, prioritize reports, and reduce manual review load while operating alongside rule-based filters for consistency and transparency.'
    },
    {
      title: 'Workflow Automation & Developer Productivity',
      description:
        'Internal tools for rapid prototyping, documentation generation, code scaffolding, refactoring, and system design support, significantly reducing development time and repetitive engineering effort.'
    }
  ],
  closing:
    'Overall, these integrations function as force multipliers for production teams, enabling faster iteration, improved decision-making, and more efficient use of engineering resources while keeping core architecture deterministic, maintainable, and production-safe.'
};
