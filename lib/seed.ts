import { Conversation, DocumentItem, FacilityStats, GameClock, GameState, TestSession049 } from './types';

const now = () => new Date().toISOString();

export const firstNames = ['Avery', 'Morgan', 'Riley', 'Jamie', 'Quinn', 'Dakota', 'Emerson'];
export const lastNames = ['Nguyen', 'Patel', 'Sato', 'Ramirez', 'Okafor', 'Ivanov', 'Kowalski'];

export const initialFacilityStats: FacilityStats = {
  readiness: 78,
  securityAvailable: 12,
  staffAvailable: 6,
  ethicsAttention: 42,
  incidentHeat: 15
};

export const initialClock: GameClock = {
  day: 14,
  hour: 9,
  minute: 12,
  tickRate: 2
};

export const initialConversations: Conversation[] = [
  {
    id: 'scp-049',
    title: 'SCP-049',
    participants: ['SCP-049', 'You'],
    unreadCount: 1,
    messages: [
      {
        id: 'msg-049-1',
        role: 'system',
        speaker: 'System',
        content: 'Conversation initialized for Test Cycle 049-A. Maintain protocol.',
        timestamp: now()
      },
      {
        id: 'msg-049-2',
        role: 'npc',
        speaker: 'SCP-049',
        content: 'Your facility remains plagued. I will assist, if you permit the necessary procedures.',
        timestamp: now(),
        clearanceTag: 'L2'
      }
    ]
  },
  {
    id: 'director',
    title: 'Site Director',
    participants: ['Director Holt', 'You'],
    unreadCount: 0,
    messages: [
      {
        id: 'msg-dir-1',
        role: 'npc',
        speaker: 'Director Holt',
        content: 'Assignment confirmed. Cycle 049-A is yours. Keep it procedural.',
        timestamp: now(),
        clearanceTag: 'L3'
      }
    ]
  },
  {
    id: 'head-research',
    title: 'Head Researcher',
    participants: ['Dr. Mbeki', 'You'],
    unreadCount: 0,
    messages: [
      {
        id: 'msg-head-1',
        role: 'npc',
        speaker: 'Dr. Mbeki',
        content: 'Draft your proposal early. I will review before submission.',
        timestamp: now()
      }
    ]
  },
  {
    id: 'security',
    title: 'Security Chief',
    participants: ['Chief Navarro', 'You'],
    unreadCount: 0,
    messages: [
      {
        id: 'msg-sec-1',
        role: 'npc',
        speaker: 'Chief Navarro',
        content: 'Containment posture ready. Provide a final headcount for guards.',
        timestamp: now()
      }
    ]
  },
  {
    id: 'ethics',
    title: 'Ethics Liaison',
    participants: ['Ethics Liaison Park', 'You'],
    unreadCount: 0,
    messages: [
      {
        id: 'msg-eth-1',
        role: 'npc',
        speaker: 'Liaison Park',
        content: 'Remember: no coercion beyond approved stimuli. Report deviations promptly.',
        timestamp: now(),
        clearanceTag: 'L2'
      }
    ]
  },
  {
    id: 'procurement',
    title: 'Procurement Officer',
    participants: ['Quartermaster Ruiz', 'You'],
    unreadCount: 0,
    messages: [
      {
        id: 'msg-proc-1',
        role: 'npc',
        speaker: 'Quartermaster Ruiz',
        content: 'Submit your request with quantities. Director approval required for restricted gear.',
        timestamp: now()
      }
    ]
  },
  {
    id: 'class-d',
    title: 'Class-D Interview',
    participants: ['D-9341', 'You'],
    unreadCount: 0,
    messages: [
      {
        id: 'msg-d-1',
        role: 'npc',
        speaker: 'D-9341',
        content: 'They said you had questions about the doctor. Keep it quick.',
        timestamp: now()
      }
    ]
  }
];

export const initialDocuments: DocumentItem[] = [
  {
    id: 'doc-brief-049',
    title: 'SCP-049 Briefing',
    docId: 'SCP-049-BRIEF-02',
    clearanceRequired: 2,
    author: 'Research Admin',
    createdAt: now(),
    tags: ['briefing', 'scp-049'],
    body: [
      'SCP FOUNDATION // SITE-47',
      'Classification: Euclid',
      'Containment: Humanoid entity must remain within isolated medical suite. No physical contact without Level-3 approval and two armed guards.',
      'Interview Caution: Subject is articulate, convinced of curing "the Pestilence". Avoid promises or medical authority validation.',
      'Restrictions: No shared tools. Maintain biometric monitoring and immediate sedation readiness.'
    ]
  }
];

export const initialTestSession: TestSession049 = {
  phase: 'assignment',
  objectives: [
    'Observe response to controlled interview stimuli.',
    'Assess compliance with revised questioning protocol.',
    'Maintain full containment protocol.'
  ],
  requiredMaterials: ['Audio recorder', 'Protective gloves', 'Emergency sedation kit'],
  invitedStaff: [],
  classDMode: 'interview',
  logs: ['Cycle 049-A assigned. Awaiting preparation checklist.'],
  results: [],
  budgetRemaining: 50000
};

export const createInitialState = (): GameState => ({
  version: 1,
  player: null,
  facility: initialFacilityStats,
  clock: initialClock,
  conversations: initialConversations,
  documents: initialDocuments,
  procurement: [],
  testSession: initialTestSession,
  notifications: []
});
