export type Role = 'player' | 'npc' | 'system';

export interface PlayerProfile {
  firstName: string;
  lastName: string;
  roleTitle: string;
  clearanceLevel: number;
  reputation: number;
  trust: number;
  createdAt: string;
}

export interface FacilityStats {
  readiness: number;
  securityAvailable: number;
  staffAvailable: number;
  ethicsAttention: number;
  incidentHeat: number;
}

export interface GameClock {
  day: number;
  hour: number;
  minute: number;
  tickRate: number;
}

export interface Message {
  id: string;
  role: Role;
  speaker: string;
  content: string;
  timestamp: string;
  clearanceTag?: string;
}

export interface Conversation {
  id: string;
  title: string;
  participants: string[];
  messages: Message[];
  unreadCount: number;
}

export interface DocumentItem {
  id: string;
  title: string;
  docId: string;
  clearanceRequired: number;
  author: string;
  createdAt: string;
  body: string[];
  tags: string[];
}

export interface ProcurementItem {
  name: string;
  quantity: number;
  risk: 'low' | 'medium' | 'high';
}

export interface ApprovalRecord {
  by: string;
  status: 'approved' | 'denied' | 'pending' | 'modified';
  note?: string;
  timestamp: string;
}

export interface ProcurementRequest {
  id: string;
  items: ProcurementItem[];
  rationale: string;
  estimatedCost: number;
  status: 'draft' | 'submitted' | 'approved' | 'denied' | 'delivering' | 'delivered';
  etaMinutes?: number;
  approvals: ApprovalRecord[];
}

export type TestPhase =
  | 'assignment'
  | 'preparation'
  | 'waiting'
  | 'execution'
  | 'reporting'
  | 'complete';

export interface TestSession049 {
  phase: TestPhase;
  objectives: string[];
  requiredMaterials: string[];
  invitedStaff: string[];
  classDMode: 'interview' | 'file';
  logs: string[];
  results: string[];
  budgetRemaining: number;
}

export interface NotificationItem {
  id: string;
  type: 'approval' | 'delivery' | 'message' | 'alert';
  title: string;
  detail: string;
  timestamp: string;
  unread: boolean;
}

export interface GameState {
  version: number;
  player: PlayerProfile | null;
  facility: FacilityStats;
  clock: GameClock;
  conversations: Conversation[];
  documents: DocumentItem[];
  procurement: ProcurementRequest[];
  testSession: TestSession049;
  notifications: NotificationItem[];
}
