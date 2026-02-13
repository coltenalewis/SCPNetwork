export type NodeType =
  | 'Project'
  | 'Game'
  | 'Trip'
  | 'Milestone'
  | 'Decision'
  | 'Habit'
  | 'Reflection';

export type LinkType = 'dependency' | 'enables' | 'blocks' | 'influences' | 'caused-by';

export interface JournalCheckIn {
  mood: number;
  energy: number;
  focus: number;
  stress: number;
  deepWorkHours: number;
  intent: string;
}

export interface JournalEntry {
  id: string;
  createdAt: string;
  checkIn: JournalCheckIn;
  content: string;
  tags: string[];
  proposedGoals: string[];
  proposedTimeline: string[];
}

export interface TimelineItem {
  id: string;
  title: string;
  date: string;
  type: 'event' | 'work-block' | 'travel' | 'deadline' | 'milestone';
  monthFocus: string;
  notes?: string;
  nodeId?: string;
}

export interface GraphNode {
  id: string;
  title: string;
  type: NodeType;
  status: 'idea' | 'active' | 'blocked' | 'done';
  targetDate?: string;
  linkedCalendarItemIds: string[];
  whyItMatters: string;
}

export interface GraphLink {
  id: string;
  from: string;
  to: string;
  type: LinkType;
}

export interface Milestone {
  id: string;
  title: string;
  month: string;
  status: 'planned' | 'active' | 'done';
  goalId?: string;
}

export interface Goal {
  id: string;
  title: string;
  horizon: '3-5y' | 'year' | 'quarter' | 'month';
  theme: string;
  milestones: string[];
}

export interface IdeaItem {
  id: string;
  text: string;
  category: 'career' | 'finance' | 'travel' | 'health' | 'relationships' | 'knowledge';
  createdAt: string;
}

export interface Preferences {
  northStarMonth: string;
  monthlyTheme: string;
  openAiKey?: string;
}

export interface AnankeState {
  version: number;
  journals: JournalEntry[];
  timeline: TimelineItem[];
  nodes: GraphNode[];
  links: GraphLink[];
  goals: Goal[];
  milestones: Milestone[];
  ideas: IdeaItem[];
  preferences: Preferences;
}
