import { createInitialState } from './seed';
import { GameState } from './types';

const STORAGE_KEY = 'scp_facility_save_v1';

export const loadState = (): GameState | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<GameState>;
    const base = createInitialState();
    return {
      ...base,
      ...parsed,
      player: parsed.player ?? base.player,
      messages: parsed.messages ?? base.messages,
      scpSettings: {
        ...base.scpSettings,
        ...parsed.scpSettings,
        metrics: parsed.scpSettings?.metrics ?? base.scpSettings.metrics,
        objectives: parsed.scpSettings?.objectives ?? base.scpSettings.objectives
      },
      budget: parsed.budget ?? base.budget,
      inventory: parsed.inventory ?? base.inventory,
      directorRequest: parsed.directorRequest ?? base.directorRequest,
      missionStatus: parsed.missionStatus ?? base.missionStatus,
      researchStatus: parsed.researchStatus ?? base.researchStatus,
      researchStartedAt: parsed.researchStartedAt ?? base.researchStartedAt,
      researchEndsAt: parsed.researchEndsAt ?? base.researchEndsAt,
      mode: parsed.mode ?? base.mode
    };
  } catch (error) {
    console.error('Failed to load save data', error);
    return null;
  }
};

export const saveState = (state: GameState) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to persist save data', error);
  }
};

export const clearState = () => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
};
