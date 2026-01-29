'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { DirectorMessage } from '@/lib/types';

const buildMessage = (role: DirectorMessage['role'], content: string): DirectorMessage => ({
  id: `director-msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
  timestamp: new Date().toISOString()
});

export const DirectorChat = () => {
  const { state, dispatch } = useStore();
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [pendingItem, setPendingItem] = useState<{
    itemName: string;
    description: string;
    cost: number;
  } | null>(null);

  const canRequest = state.missionStatus === 'briefing';

  const sendDirectorMessage = async () => {
    if (!input.trim() || isSending || !canRequest) return;
    const message = buildMessage('player', input.trim());
    dispatch({ type: 'ADD_DIRECTOR_MESSAGE', payload: message });
    setIsSending(true);

    try {
      const response = await fetch('/api/director', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request: message.content,
          budget: state.budget,
          messages: [...state.directorMessages, message].map((entry) => ({
            role: entry.role,
            content: entry.content
          }))
        })
      });

      if (!response.ok) {
        dispatch({
          type: 'ADD_DIRECTOR_MESSAGE',
          payload: buildMessage('system', 'Director channel unavailable. Please retry.')
        });
        return;
      }

      const data = (await response.json()) as {
        reply?: string | null;
        item?: { itemName: string; description: string; cost: number } | null;
      };

      if (data.reply) {
        dispatch({ type: 'ADD_DIRECTOR_MESSAGE', payload: buildMessage('director', data.reply) });
      }

      if (data.item) {
        setPendingItem({
          itemName: data.item.itemName,
          description: data.item.description,
          cost: Number(data.item.cost ?? 0)
        });
        dispatch({
          type: 'ADD_DIRECTOR_MESSAGE',
          payload: buildMessage(
            'director',
            `Procurement evaluation complete: ${data.item.itemName}. Cost ${data.item.cost}. Review and respond.`
          )
        });
      }
    } catch (error) {
      dispatch({
        type: 'ADD_DIRECTOR_MESSAGE',
        payload: buildMessage('system', 'Director channel unavailable. Please retry.')
      });
    } finally {
      setIsSending(false);
      setInput('');
    }
  };

  const acceptItem = () => {
    if (!pendingItem) return;
    if (pendingItem.cost > state.budget) {
      dispatch({
        type: 'ADD_DIRECTOR_MESSAGE',
        payload: buildMessage('system', 'Insufficient budget to accept this request.')
      });
      return;
    }
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: `item-${Date.now()}`,
        name: pendingItem.itemName,
        description: pendingItem.description,
        cost: pendingItem.cost,
        quantity: 1
      }
    });
    dispatch({ type: 'SET_BUDGET', payload: state.budget - pendingItem.cost });
    dispatch({
      type: 'ADD_DIRECTOR_MESSAGE',
      payload: buildMessage('director', `Approved. ${pendingItem.itemName} added to inventory.`)
    });
    setPendingItem(null);
  };

  const denyItem = () => {
    if (!pendingItem) return;
    dispatch({
      type: 'ADD_DIRECTOR_MESSAGE',
      payload: buildMessage('director', `Denied by researcher. ${pendingItem.itemName} will not be procured.`)
    });
    setPendingItem(null);
  };

  const requestAppeal = () => {
    if (!pendingItem) return;
    setInput(`Appeal for ${pendingItem.itemName}: `);
  };

  return (
    <section className="bg-slateCore-900 border border-slate-800 rounded-xl shadow-panel flex flex-col h-full min-h-0">
      <div className="border-b border-slate-800 px-6 py-4">
        <h2 className="text-lg font-semibold">Director Communications</h2>
        <p className="text-sm text-slate-400">
          Request items or ask research questions. The Director responds with pricing or guidance.
        </p>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 p-6">
        {state.directorMessages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'player' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xl rounded-lg border px-4 py-3 text-sm shadow-sm ${
                message.role === 'player'
                  ? 'bg-accent-600/20 border-accent-500 text-white'
                  : message.role === 'system'
                  ? 'bg-red-950/70 border-red-500/70 text-red-100'
                  : 'bg-slateCore-900 border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>
                  {message.role === 'player' ? 'Researcher' : message.role === 'director' ? 'Director' : 'System'}
                </span>
                <span>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div>{message.content}</div>
            </div>
          </div>
        ))}
      </div>
      {pendingItem && (
        <div className="border-t border-slate-800 bg-slate-900/50 px-6 py-4 text-xs text-slate-200 space-y-2">
          <p className="font-semibold">Director Proposal: {pendingItem.itemName}</p>
          <p className="text-slate-400">{pendingItem.description}</p>
          <p className="text-slate-400">Cost: ₡{pendingItem.cost.toLocaleString()}</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={acceptItem}
              className="px-3 py-1 bg-accent-600 text-slate-900 rounded-md text-xs font-semibold"
            >
              Accept
            </button>
            <button
              onClick={denyItem}
              className="px-3 py-1 border border-slate-700 text-slate-300 rounded-md text-xs"
            >
              Deny
            </button>
            <button
              onClick={requestAppeal}
              className="px-3 py-1 border border-slate-700 text-slate-300 rounded-md text-xs"
            >
              Appeal/Clarify
            </button>
          </div>
        </div>
      )}
      <div className="border-t border-slate-800 p-4 bg-slateCore-900/90">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={canRequest ? 'Message the Director...' : 'Procurement closed.'}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
            disabled={!canRequest || isSending}
          />
          <button
            onClick={sendDirectorMessage}
            disabled={!canRequest || isSending || !input.trim()}
            className="px-4 py-2 bg-accent-600 text-slate-900 rounded-md text-sm font-semibold disabled:opacity-60"
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </section>
  );
};
