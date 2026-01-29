export type Role = 'player' | 'npc' | 'system';

export interface PlayerProfile {
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface Message {
  id: string;
  role: Role;
  speaker: string;
  content: string;
  timestamp: string;
}

export interface CharacterMetric {
  id: string;
  label: string;
  value: number;
}

export interface ScpProfileSettings {
  guide: string;
  metrics: CharacterMetric[];
}

export interface GameState {
  version: number;
  player: PlayerProfile | null;
  messages: Message[];
  scpSettings: ScpProfileSettings;
}
