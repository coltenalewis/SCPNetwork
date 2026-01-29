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

export interface Objective {
  id: string;
  title: string;
  description: string;
  triggerPhrases: string[];
  completedAt?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  quantity: number;
}

export interface DirectorRequest {
  id: string;
  request: string;
  itemName: string;
  description: string;
  cost: number;
  status: 'pending' | 'accepted' | 'denied';
  createdAt: string;
}

export interface ScpProfileSettings {
  guide: string;
  metrics: CharacterMetric[];
  objectives: Objective[];
}

export type MissionStatus = 'briefing' | 'interview' | 'completed' | 'terminated';
export type ResearchStatus = 'pending' | 'complete' | 'skipped';
export type RoleplayMode = 'chat' | 'action';

export interface GameState {
  version: number;
  player: PlayerProfile | null;
  messages: Message[];
  scpSettings: ScpProfileSettings;
  budget: number;
  inventory: InventoryItem[];
  directorRequest: DirectorRequest | null;
  missionStatus: MissionStatus;
  researchStatus: ResearchStatus;
  researchStartedAt?: string;
  researchEndsAt?: string;
  mode: RoleplayMode;
}
