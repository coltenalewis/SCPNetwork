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

  const sendMessage = async (content: string) => {
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
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Enter response..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
            disabled={isSending}
          />
          <button
            onClick={() => {
              if (!input.trim()) return;
              sendMessage(input.trim());
              setInput('');
            }}
            className="px-4 py-2 bg-accent-600 text-slate-900 rounded-md text-sm font-semibold disabled:opacity-60"
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};
