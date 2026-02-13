import { AnankeState } from './types';

const now = new Date();
const isoDay = now.toISOString().slice(0, 10);
const month = now.toISOString().slice(0, 7);

export const createInitialState = (): AnankeState => ({
  version: 1,
  journals: [],
  timeline: [
    {
      id: 'tl-1',
      title: 'Quarter planning review',
      date: isoDay,
      type: 'milestone',
      monthFocus: 'Ship ANANKE prototype'
    }
  ],
  nodes: [
    {
      id: 'node-1',
      title: 'ANANKE v0.1 launch',
      type: 'Milestone',
      status: 'active',
      targetDate: isoDay,
      linkedCalendarItemIds: ['tl-1'],
      whyItMatters: 'Creates operational continuity for goals, journal, and causality.'
    }
  ],
  links: [],
  goals: [
    {
      id: 'goal-1',
      title: 'Build calm operational life system',
      horizon: 'year',
      theme: 'Consistency over intensity',
      milestones: ['ms-1']
    }
  ],
  milestones: [
    {
      id: 'ms-1',
      title: 'Deploy ANANKE prototype',
      month,
      status: 'active',
      goalId: 'goal-1'
    }
  ],
  ideas: [],
  preferences: {
    northStarMonth: 'Convert captured thoughts into structured time.',
    monthlyTheme: 'Execution discipline'
  }
});
