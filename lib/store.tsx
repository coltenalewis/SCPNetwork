'use client';

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { createInitialState } from './seed';
import { clearState, loadState, saveState } from './storage';
import { GameState, Message, Objective, PlayerProfile, ScpProfileSettings } from './types';

interface GameAction {
  type:
    | 'LOAD_STATE'
    | 'CREATE_PROFILE'
    | 'SEND_MESSAGE'
    | 'UPDATE_SCP_SETTINGS'
    | 'CLEAR_SAVE';
  payload?: any;
}

interface StoreContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const clamp = (value: number, min = 0, max = 100) => Math.min(max, Math.max(min, value));

const hasAnyPhrase = (content: string, phrases: string[]) => {
  const normalized = content.toLowerCase();
  return phrases.some((phrase) => normalized.includes(phrase.toLowerCase()));
};

const updateObjectives = (objectives: Objective[], message: Message) =>
  objectives.map((objective) => {
    if (objective.completedAt) {
      return objective;
    }
    if (!objective.triggerPhrases.length) {
      return objective;
    }
    if (hasAnyPhrase(message.content, objective.triggerPhrases)) {
      return { ...objective, completedAt: new Date().toISOString() };
    }
    return objective;
  });

const updateMetrics = (metrics: ScpProfileSettings['metrics'], message: Message) => {
  const lowerContent = message.content.toLowerCase();
  const positivePhrases = ['please', 'thank', 'appreciate', 'cooperate', 'understand'];
  const negativePhrases = ['threat', 'terminate', 'breach', 'kill', 'refuse', 'hostile'];
  const hasPositive = hasAnyPhrase(lowerContent, positivePhrases);
  const hasNegative = hasAnyPhrase(lowerContent, negativePhrases);
  const lengthBoost = Math.min(2, Math.floor(message.content.length / 120));

  return metrics.map((metric) => {
    const label = metric.label.toLowerCase();
    let delta = 0;

    if (label.includes('rapport') || label.includes('trust') || label.includes('compliance')) {
      delta += hasPositive ? 3 : 0;
      delta -= hasNegative ? 2 : 0;
      delta += message.role === 'player' ? 1 : 0;
      delta += lengthBoost;
    } else if (label.includes('agitation') || label.includes('hostility') || label.includes('stress')) {
      delta += hasNegative ? 3 : 0;
      delta -= hasPositive ? 2 : 0;
      delta -= message.role === 'npc' ? 1 : 0;
    } else {
      delta += hasPositive ? 1 : 0;
      delta -= hasNegative ? 1 : 0;
      delta += message.role === 'player' ? lengthBoost : 0;
    }

    if (delta === 0 && lengthBoost > 0) {
      delta = message.role === 'player' ? 1 : 0;
    }

    return { ...metric, value: clamp(metric.value + delta) };
  });
};

const applyMessageUpdates = (state: GameState, message: Message): GameState => ({
  ...state,
  messages: [...state.messages, message],
  scpSettings: {
    ...state.scpSettings,
    metrics: updateMetrics(state.scpSettings.metrics, message),
    objectives: updateObjectives(state.scpSettings.objectives, message)
  }
});

const reducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.payload as GameState;
    case 'CREATE_PROFILE': {
      return {
        ...state,
        player: action.payload as PlayerProfile
      };
    }
    case 'SEND_MESSAGE': {
      const { conversationId, message } = action.payload as {
        conversationId: string;
        message: Message;
      };
      if (!conversationId) {
        return state;
      }
      return applyMessageUpdates(state, message);
    }
    case 'UPDATE_SCP_SETTINGS': {
      return {
        ...state,
        scpSettings: action.payload as ScpProfileSettings
      };
    }
    case 'CLEAR_SAVE': {
      return createInitialState();
    }
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, createInitialState());

  useEffect(() => {
    const loaded = loadState();
    if (loaded) {
      dispatch({ type: 'LOAD_STATE', payload: loaded });
    }
  }, []);

  useEffect(() => {
    if (state.player) {
      saveState(state);
    }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};

export const useClearSave = () => {
  const { dispatch } = useStore();
  return () => {
    clearState();
    dispatch({ type: 'CLEAR_SAVE' });
  };
};
