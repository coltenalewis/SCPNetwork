import { createInitialState } from './seed';
import { AnankeState } from './types';

const STORAGE_KEY = 'ananke_cache_v01';

export const loadState = (): AnankeState | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AnankeState>;
    const base = createInitialState();
    return {
      ...base,
      ...parsed,
      journals: parsed.journals ?? base.journals,
      timeline: parsed.timeline ?? base.timeline,
      nodes: parsed.nodes ?? base.nodes,
      links: parsed.links ?? base.links,
      goals: parsed.goals ?? base.goals,
      milestones: parsed.milestones ?? base.milestones,
      ideas: parsed.ideas ?? base.ideas,
      preferences: { ...base.preferences, ...(parsed.preferences ?? {}) }
    };
  } catch (error) {
    console.error('Failed to load ANANKE cache', error);
    return null;
  }
};

export const saveState = (state: AnankeState) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
