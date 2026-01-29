'use client';

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { createInitialState } from './seed';
import { clearState, loadState, saveState } from './storage';
import { GameState, Message, PlayerProfile, ScpProfileSettings } from './types';

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
      return {
        ...state,
        messages: [...state.messages, message]
      };
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
