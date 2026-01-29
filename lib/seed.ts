import { GameState } from './types';

const now = () => new Date().toISOString();

export const firstNames = ['Avery', 'Morgan', 'Riley', 'Jamie', 'Quinn', 'Dakota', 'Emerson'];
export const lastNames = ['Nguyen', 'Patel', 'Sato', 'Ramirez', 'Okafor', 'Ivanov', 'Kowalski'];

export const createInitialState = (): GameState => ({
  version: 1,
  player: null,
  messages: [
    {
      id: 'msg-049-1',
      role: 'system',
      speaker: 'System',
      content: 'Conversation initialized with SCP-049. Maintain protocol and log deviations.',
      timestamp: now()
    },
    {
      id: 'msg-049-2',
      role: 'npc',
      speaker: 'SCP-049',
      content: 'I remain prepared to assist your physicians in addressing the Pestilence.',
      timestamp: now()
    }
  ],
  scpSettings: {
    guide:
      'SCP-049 is articulate, clinical, and convinced it can cure the Pestilence. It avoids humor, prefers procedural language, and respects authority cues. It never leaves containment or acts outside its established limits.',
    metrics: [
      { id: 'compliance', label: 'Compliance', value: 68 },
      { id: 'rapport', label: 'Rapport', value: 52 },
      { id: 'agitation', label: 'Agitation', value: 18 }
    ]
  }
});
