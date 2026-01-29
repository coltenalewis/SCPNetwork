'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { createInitialState } from './seed';
import { clearState, loadState, saveState } from './storage';
import {
  Conversation,
  DocumentItem,
  GameState,
  Message,
  NotificationItem,
  PlayerProfile,
  ProcurementRequest,
  TestPhase
} from './types';
import { useGameClock } from './useGameClock';

interface GameAction {
  type:
    | 'LOAD_STATE'
    | 'CREATE_PROFILE'
    | 'TICK_TIME'
    | 'SEND_MESSAGE'
    | 'MARK_CONVERSATION_READ'
    | 'ADD_DOCUMENT'
    | 'ADD_NOTIFICATION'
    | 'ACK_NOTIFICATION'
    | 'ADD_PROCUREMENT'
    | 'UPDATE_PROCUREMENT_STATUS'
    | 'ADVANCE_PHASE'
    | 'INVITE_STAFF'
    | 'DEDUCT_BUDGET'
    | 'CLEAR_SAVE';
  payload?: any;
}

interface StoreContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  unreadNotifications: number;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const advanceClock = (clock: GameState['clock']) => {
  let { day, hour, minute } = clock;
  minute += 1;
  if (minute >= 60) {
    minute = 0;
    hour += 1;
  }
  if (hour >= 24) {
    hour = 0;
    day += 1;
  }
  return { ...clock, day, hour, minute };
};

const updateConversation = (conversations: Conversation[], id: string, updater: (c: Conversation) => Conversation) => {
  return conversations.map((conversation) =>
    conversation.id === id ? updater(conversation) : conversation
  );
};

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
    case 'TICK_TIME': {
      const updated = advanceClock(state.clock);
      const procurement: ProcurementRequest[] = state.procurement.map((request) => {
        if (request.status === 'delivering' && request.etaMinutes && request.etaMinutes > 0) {
          const eta = request.etaMinutes - 1;
          if (eta <= 0) {
            return { ...request, etaMinutes: 0, status: 'delivered' as const };
          }
          return { ...request, etaMinutes: eta };
        }
        return request;
      });
      return { ...state, clock: updated, procurement };
    }
    case 'SEND_MESSAGE': {
      const { conversationId, message } = action.payload as {
        conversationId: string;
        message: Message;
      };
      return {
        ...state,
        conversations: updateConversation(state.conversations, conversationId, (conversation) => ({
          ...conversation,
          messages: [...conversation.messages, message]
        }))
      };
    }
    case 'MARK_CONVERSATION_READ': {
      const id = action.payload as string;
      return {
        ...state,
        conversations: updateConversation(state.conversations, id, (conversation) => ({
          ...conversation,
          unreadCount: 0
        }))
      };
    }
    case 'ADD_DOCUMENT': {
      return { ...state, documents: [action.payload as DocumentItem, ...state.documents] };
    }
    case 'ADD_NOTIFICATION': {
      return { ...state, notifications: [action.payload as NotificationItem, ...state.notifications] };
    }
    case 'ACK_NOTIFICATION': {
      const id = action.payload as string;
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === id ? { ...notification, unread: false } : notification
        )
      };
    }
    case 'ADD_PROCUREMENT': {
      return { ...state, procurement: [action.payload as ProcurementRequest, ...state.procurement] };
    }
    case 'UPDATE_PROCUREMENT_STATUS': {
      const { id, status, etaMinutes } = action.payload as {
        id: string;
        status: ProcurementRequest['status'];
        etaMinutes?: number;
      };
      return {
        ...state,
        procurement: state.procurement.map((request) =>
          request.id === id ? { ...request, status, etaMinutes } : request
        )
      };
    }
    case 'ADVANCE_PHASE': {
      const phase = action.payload as TestPhase;
      return {
        ...state,
        testSession: {
          ...state.testSession,
          phase
        }
      };
    }
    case 'INVITE_STAFF': {
      const staff = action.payload as string;
      if (state.testSession.invitedStaff.includes(staff)) {
        return state;
      }
      return {
        ...state,
        testSession: {
          ...state.testSession,
          invitedStaff: [...state.testSession.invitedStaff, staff]
        }
      };
    }
    case 'DEDUCT_BUDGET': {
      const delta = action.payload as number;
      return {
        ...state,
        testSession: {
          ...state.testSession,
          budgetRemaining: Math.max(0, state.testSession.budgetRemaining - delta)
        }
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

  const handleTick = useCallback(() => {
    dispatch({ type: 'TICK_TIME' });
  }, []);

  useGameClock({ clock: state.clock, onTick: handleTick });

  const unreadNotifications = useMemo(() => {
    const notifUnread = state.notifications.filter((note) => note.unread).length;
    const convoUnread = state.conversations.reduce((sum, convo) => sum + convo.unreadCount, 0);
    return notifUnread + convoUnread;
  }, [state.notifications, state.conversations]);

  const value = useMemo(
    () => ({ state, dispatch, unreadNotifications }),
    [state, dispatch, unreadNotifications]
  );

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
