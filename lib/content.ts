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

export type MediaItem = {
  label: string;
  url: string;
  type: 'image' | 'video' | 'embed';
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
  media?: MediaItem[];
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
    id: 'wai-and-aina-farms',
    company: 'Wai and Aina Farms',
    role: 'Full Stack Web Developer',
    dates: 'Nov 2025 – Mar 2026',
    summary: [
      'Built and shipped a full-stack PWA used on both mobile and desktop for farm operations, including staff management and project management dashboards with custom scheduling and role-based user management.',
      'Delivered animal tracking flows, productivity analytics, and a guide system with AI-assisted report snapshot creation to improve field reporting speed and day-to-day operations visibility.'
    ],
    links: [{ label: 'Private client platform (case-study available on request)', url: '#', type: 'community' }]
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
    tags: ['Systems', 'Live Ops', 'Performance', 'UI'],
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
    tags: ['Systems', 'Performance', 'UI'],
    overview: 'Anime-inspired action title requiring responsive systems and maintainable gameplay scripting.',
    responsibilities: ['Core scripting', 'Gameplay support', 'Update reliability'],
    systems: ['Combat-adjacent logic hooks', 'Player state handling', 'Patch-safe system adjustments'],
    highlights: ['Scale-aware implementation', 'Low-friction debug patterns', 'Coordination with design'],
    problem: 'Rapid growth increased pressure on consistency and runtime performance.',
    solution: 'Focused on structured code organization and operationally safe feature changes.',
    outcome: 'Supported large-scale play while preserving a stable development rhythm.',
    media: [
      {
        label: 'Crate system with duplicate-item point refunds for ODM unlock flow',
        url: 'https://i.gyazo.com/09ab95d6b31e1d2ad15b4a684014ab11.mp4',
        type: 'video'
      },
      {
        label: 'Character customization system: hair, facial options, clothing, blades, zoom, and rotation',
        url: 'https://i.gyazo.com/3da6070c0ab6727cee82308aefdccde4.mp4',
        type: 'video'
      },
      {
        label: 'Menu animation transition sample',
        url: 'https://images-ext-1.discordapp.net/external/KY6w_jzPamgOsvAI0hTJNQlAKDOZTUAAZrUiXtIgwgQ/https/i.gyazo.com/39df5725926b9dca744655ceb074ea75.mp4',
        type: 'video'
      }
    ]
  },
  {
    slug: 'star-wars-universe-online',
    title: 'Star Wars Universe Online',
    url: 'https://www.roblox.com/games/3971269762/Star-Wars-Universe-Online-MAIN-MENU-UPDATE?',
    roleBadges: ['Dev Manager', 'UI Design'],
    oneLiner: 'Managed contributors and content pipelines while supporting long-running system maintenance.',
    tags: ['Production', 'Live Ops', 'Systems', 'UI'],
    overview: 'Long-running project with broad contributor needs and continuous release expectations.',
    responsibilities: ['Development management', 'Delivery coordination', 'System maintenance planning'],
    systems: ['Content pipeline support', 'Operational release structure', 'Team coordination workflow'],
    highlights: ['Cross-discipline planning', 'Scalable process design', 'Long-horizon maintenance'],
    problem: 'Sustaining quality over long release cycles required stronger coordination systems.',
    solution: 'Improved production structure, role clarity, and release process consistency.',
    outcome: 'Enabled steady content output and resilient long-term project operations.'
  },
  {
    slug: 'wai-and-aina-farms-pwa',
    title: 'Wai and Aina Farms Operations PWA',
    url: 'https://www.linkedin.com/in/colten-lewis-2b05a7220/',
    roleBadges: ['Full Stack', 'PWA', 'Productivity'],
    oneLiner: 'Built a cross-device farm operations system for staffing, projects, analytics, and AI-assisted reporting.',
    tags: ['Web Tools', 'Production', 'Systems'],
    overview: 'A mobile-and-desktop production platform designed for day-to-day farm operations and team coordination.',
    responsibilities: ['Full-stack architecture', 'Role and user management', 'Scheduling and operations dashboard design'],
    systems: ['Custom scheduling engine', 'Animal tracking workflow', 'Guide system with AI-assisted report snapshot creation'],
    highlights: ['PWA responsiveness', 'Operational analytics views', 'Production-safe management tooling'],
    problem: 'The team needed one reliable workflow across staff, assets, and project execution on both mobile and desktop.',
    solution: 'Designed a unified PWA dashboard with management modules, analytics, and practical AI-augmented reporting paths.',
    outcome: 'Improved operational visibility and reduced administrative overhead for recurring management tasks.'
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

export const personalCreations = {
  environmentalArt: [
    'https://media.discordapp.net/attachments/884199583683584011/884201449721061426/26c7cd0a203d3f765f049de653a742ee.png?ex=699b8145&is=699a2fc5&hm=82d0c7dd1972fb04a5bd6d6dc69635e8497eafe06648a385ac5ef60ff28a9008&=&format=webp&quality=lossless&width=1860&height=900',
    'https://media.discordapp.net/attachments/884199583683584011/884201513772277842/fb47dff755868c0f9e6c79a10d10d4ae.png?ex=699b8154&is=699a2fd4&hm=2974e1a27f02ed5fe25d7bb22938f31dcf513ab470ff4f1ea90adec9900d5b02&=&format=webp&quality=lossless&width=1860&height=901',
    'https://media.discordapp.net/attachments/884199583683584011/884201187006615592/c98ec460db489f877e96a1af15ba5f4f.png?ex=699b8106&is=699a2f86&hm=883e13cc5517f1c54341452e62a4046832b90f278f37429cc05aafb44eb3caab&=&format=webp&quality=lossless&width=1650&height=920'
  ],
  randomBuilds: [
    'https://media.discordapp.net/attachments/884200145837785098/1100609337828843580/CleanShot_2023-04-25_at_15.png?ex=699b1292&is=6999c112&hm=5f38a032955c500866ba2890f79f0e5c9b97b6714fa56f21d29342b092596dd7&=&format=webp&quality=lossless&width=1240&height=1039',
    'https://media.discordapp.net/attachments/884200145837785098/1100609289103626240/CleanShot_2023-04-25_at_15.png?ex=699b1286&is=6999c106&hm=9092308cf7b47396d45f7b9ab4e2d181ae54364648ecb78311dd59157299b724&=&format=webp&quality=lossless&width=1546&height=920',
    'https://media.discordapp.net/attachments/884200145837785098/1316137766878449674/image.png?ex=699b6550&is=699a13d0&hm=60b0cb1939a5a2259b799a87787e4779ee6aaf285ce8724d804cb3903295ff03&=&format=webp&quality=lossless&width=1563&height=920'
  ],
  videos: [
    'https://cdn.discordapp.com/attachments/884199583683584011/1042504331624198144/2021-12-24_12-21-20.mp4?ex=699b48d1&is=6999f751&hm=6a3ca2195a8f8f93c91bc0bc7d5295cdc089375029b7f0f22660b13fe22edce7&',
    'https://i.gyazo.com/6fafc03c0f0cd87e82ffc965b0f9afac.mp4',
    'https://cdn.discordapp.com/attachments/884201778734841876/1114723143307759657/CleanShot_2023-06-03_at_21.08.55.mov?ex=699b0093&is=6999af13&hm=35f0e5f6d707c313b6de28785abd259e0176b89fe69abcbc892d11e42d7ff1c7&',
    'https://cdn.discordapp.com/attachments/884201778734841876/1114723547013726228/Untitled.mov?ex=699b00f4&is=6999af74&hm=de2dc835a71eaff9f0ab8a37ffbff8c25366d6399c341f1067d4a06b40de7abf&',
    'https://cdn.discordapp.com/attachments/1083861208467247135/1114724656260329563/Preview.mp4_1.mov?ex=699b01fc&is=6999b07c&hm=6a41e6d311cf59186f463bd6c2ba20bd07dd762ee87e38570e3b61190f6258a6&',
    'https://cdn.discordapp.com/attachments/1158430709778751538/1158430978411339796/CleanShot_2023-09-30_at_16.11.29.mp4?ex=699b25eb&is=6999d46b&hm=f1596bf607c8306c1472c085d387fc0b7e2827f9344f95d034d6cf912480ef0c&',
    'https://gyazo.com/3278e39190ecaccf98d4945ae3134d23.mp4'
  ],
  uiReference: 'https://media.discordapp.net/attachments/884193229686308864/884193396229541888/a27f3710bf581adf0eeab53fe1d74a4d.png?ex=699b79c5&is=699a2845&hm=b43f97723ad182dc16a7d96a83d7308cf8e7371be4e6986dc47cd43397f47748&=&format=webp&quality=lossless&width=1504&height=844',
  sketchfabEmbeds: [
    'https://sketchfab.com/models/b73c4d3a76474c3f92ca86833e343417/embed',
    'https://sketchfab.com/models/13f8f4dde73a4b0b936309fcb2ea732f/embed'
  ],
  marvelContribution: {
    title: 'Sub Contribution · Spider-Man Swinging Mechanic',
    description: 'Contributed movement scripting and feel tuning support for Spider-Man swinging in a Marvel-themed Roblox project.',
    video: 'https://cdn.discordapp.com/attachments/1114726899936141454/1114727016911085608/Spider-Man_got_jumped_Skywalker_SW_TMU.mp4?ex=699b042f&is=6999b2af&hm=1116aa6b6ec03932ad7baf5bcf10c2311615ac490bd28f879503dd4569b75fdc&',
    gameLink: 'https://www.roblox.com/games/3127396113/Avengers-Testing-Server-NYC-DEMO-RELEASE'
  }
};

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
