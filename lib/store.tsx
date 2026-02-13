'use client';

import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { createInitialState } from './seed';
import { loadState, saveState } from './storage';
import { AnankeState, Goal, GraphLink, GraphNode, IdeaItem, JournalEntry, Milestone, TimelineItem } from './types';

type Action =
  | { type: 'LOAD'; payload: AnankeState }
  | { type: 'SET_PREFS'; payload: Partial<AnankeState['preferences']> }
  | { type: 'ADD_JOURNAL'; payload: JournalEntry }
  | { type: 'ADD_TIMELINE'; payload: TimelineItem }
  | { type: 'ADD_NODE'; payload: GraphNode }
  | { type: 'ADD_LINK'; payload: GraphLink }
  | { type: 'ADD_GOAL'; payload: Goal }
  | { type: 'ADD_MILESTONE'; payload: Milestone }
  | { type: 'ADD_IDEA'; payload: IdeaItem };

const reducer = (state: AnankeState, action: Action): AnankeState => {
  switch (action.type) {
    case 'LOAD':
      return action.payload;
    case 'SET_PREFS':
      return { ...state, preferences: { ...state.preferences, ...action.payload } };
    case 'ADD_JOURNAL':
      return { ...state, journals: [action.payload, ...state.journals] };
    case 'ADD_TIMELINE':
      return { ...state, timeline: [action.payload, ...state.timeline] };
    case 'ADD_NODE':
      return { ...state, nodes: [action.payload, ...state.nodes] };
    case 'ADD_LINK':
      return { ...state, links: [action.payload, ...state.links] };
    case 'ADD_GOAL':
      return { ...state, goals: [action.payload, ...state.goals] };
    case 'ADD_MILESTONE':
      return { ...state, milestones: [action.payload, ...state.milestones] };
    case 'ADD_IDEA':
      return { ...state, ideas: [action.payload, ...state.ideas] };
    default:
      return state;
  }
};

const StoreContext = createContext<{
  state: AnankeState;
  dispatch: React.Dispatch<Action>;
  unlocked: boolean;
  unlock: (password: string) => boolean;
  lock: () => void;
} | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, createInitialState());
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const loaded = loadState();
    if (loaded) dispatch({ type: 'LOAD', payload: loaded });
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      unlocked,
      unlock: (password: string) => {
        const ok = password === 'ColtenLewis';
        setUnlocked(ok);
        return ok;
      },
      lock: () => setUnlocked(false)
    }),
    [state, unlocked]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
};
