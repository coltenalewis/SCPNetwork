'use client';

import { useMemo, useState } from 'react';
import { useStore } from '@/lib/store';
import { Message } from '@/lib/types';

const starterChips = [
  'Confirm containment status.',
  'Ask SCP-049 to describe the Pestilence.',
  'Begin structured interview.'
];

const logSystemMessage = (dispatch: ReturnType<typeof useStore>['dispatch'], content: string) => {
  dispatch({
    type: 'SEND_MESSAGE',
    payload: {
      conversationId: 'scp-049',
      message: {
        id: `msg-${Date.now()}-system`,
        role: 'system',
        speaker: 'System',
        content,
        timestamp: new Date().toISOString()
      }
    }
  });
};

export const ScpChat = () => {
  const { state, dispatch } = useStore();
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const aiSpeaker = useMemo(() => 'SCP-049', []);
  const [selectedItemId, setSelectedItemId] = useState<string>('');

  const canInteract = state.missionStatus === 'interview';

  const sendMessage = async (content: string) => {
    if (!canInteract) {
      logSystemMessage(dispatch, 'Interview not started. Begin the research inquiry and start the interview.');
      return;
    }
    if (isSending) return;
    const message: Message = {
      id: `msg-${Date.now()}`,
      role: 'player',
      speaker: `${state.player?.firstName ?? 'Researcher'} ${state.player?.lastName ?? ''}`.trim(),
      content,
      timestamp: new Date().toISOString()
    };
    dispatch({ type: 'SEND_MESSAGE', payload: { conversationId: 'scp-049', message } });
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guide: state.scpSettings.guide,
          mode: state.mode,
          inventory: state.inventory.map((item) => ({
            name: item.name,
            description: item.description,
            quantity: item.quantity
          })),
          messages: [...state.messages, message].map((entry) => ({
            role: entry.role,
            content: entry.content,
            speaker: entry.speaker
          }))
        })
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
        const errorMessage =
          errorBody?.error ??
          'AI response unavailable. Check that your API route is running and the server has access to OPENAI_API_KEY.';
        logSystemMessage(dispatch, errorMessage);
        return;
      }

      const data = (await response.json()) as { reply?: string };
      if (!data.reply) {
        logSystemMessage(dispatch, 'AI response unavailable. The server did not return a response payload.');
        return;
      }

      dispatch({
        type: 'SEND_MESSAGE',
        payload: {
          conversationId: 'scp-049',
          message: {
            id: `msg-${Date.now()}-npc`,
            role: 'npc',
            speaker: aiSpeaker,
            content: data.reply,
            timestamp: new Date().toISOString()
          }
        }
      });
    } catch (error) {
      logSystemMessage(dispatch, 'AI response unavailable. Network error while contacting the AI service.');
    } finally {
      setIsSending(false);
    }
  };

  const sendAction = async (actionContent: string, itemId?: string) => {
    if (!canInteract) {
      logSystemMessage(dispatch, 'Interview not started. Begin the research inquiry and start the interview.');
      return;
    }
    await sendMessage(`[ACTION] ${actionContent}`);
    if (itemId) {
      dispatch({ type: 'DECREMENT_ITEM', payload: itemId });
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto space-y-4 p-6">
        {state.messages.map((message) => (
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
              <div
                className={`flex items-center justify-between text-xs mb-2 ${
                  message.role === 'system' ? 'text-red-200' : 'text-slate-400'
                }`}
              >
                <span>{message.speaker}</span>
                <span>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div>{message.content}</div>
            </div>
          </div>
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="max-w-xl rounded-lg border px-4 py-3 text-sm shadow-sm bg-slateCore-900 border-slate-700 text-slate-200 animate-pulse">
              <div className="flex items-center justify-between text-xs mb-2 text-slate-400">
                <span>{aiSpeaker}</span>
                <span>{`${aiSpeaker} is thinking...`}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="inline-flex h-2 w-2 rounded-full bg-slate-500" />
                <span className="inline-flex h-2 w-2 rounded-full bg-slate-600" />
                <span className="inline-flex h-2 w-2 rounded-full bg-slate-500" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-slate-800 p-4 bg-slateCore-900/90">
        <div className="flex flex-wrap gap-2 mb-3">
          {starterChips.map((chip) => (
            <button
              key={chip}
              onClick={() => sendMessage(chip)}
              className="text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-300 hover:border-accent-500"
            >
              {chip}
            </button>
          ))}
        </div>
        {state.mode === 'action' && (
          <div className="flex flex-wrap items-center gap-2 mb-3 rounded-md border border-slate-800 bg-slate-900/40 px-3 py-2 text-xs text-slate-300">
            <span className="uppercase tracking-[0.2em] text-[10px] text-slate-500">Action Mode</span>
            <button
              onClick={async () => {
                await sendAction('Terminate the test immediately.');
                dispatch({ type: 'SET_MISSION_STATUS', payload: 'terminated' });
              }}
              className="px-2 py-1 border border-danger-500 text-danger-400 rounded-md"
            >
              Terminate Test
            </button>
            <div className="flex items-center gap-2">
              <select
                value={selectedItemId}
                onChange={(event) => setSelectedItemId(event.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-md px-2 py-1 text-xs"
              >
                <option value="">Select inventory item</option>
                {state.inventory.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.quantity})
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  if (!selectedItemId) return;
                  const item = state.inventory.find((entry) => entry.id === selectedItemId);
                  if (!item) return;
                  sendAction(`Use inventory item: ${item.name}. ${item.description}`, item.id);
                  setSelectedItemId('');
                }}
                className="px-2 py-1 border border-slate-700 rounded-md text-slate-300"
                disabled={!selectedItemId}
              >
                Use Item
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Enter response..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
            disabled={isSending || !canInteract || state.mode === 'action'}
          />
          <button
            onClick={() => {
              if (!input.trim()) return;
              sendMessage(input.trim());
              setInput('');
            }}
            className="px-4 py-2 bg-accent-600 text-slate-900 rounded-md text-sm font-semibold disabled:opacity-60"
            disabled={isSending || !canInteract || state.mode === 'action'}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
        {!canInteract && (
          <p className="mt-2 text-xs text-slate-500">
            Complete the research inquiry and start the interview to send messages.
          </p>
        )}
        {state.mode === 'action' && (
          <p className="mt-2 text-xs text-slate-500">
            Action mode limits actions to terminating the test or using inventory items.
          </p>
        )}
      </div>
    </div>
  );
};
