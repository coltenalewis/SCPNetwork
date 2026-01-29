'use client';

import { useState } from 'react';
import { Conversation, Message } from '@/lib/types';
import { useStore } from '@/lib/store';

const contextChips: Record<string, string[]> = {
  'scp-049': ['Request Protocol Clarification', 'Ask About the Pestilence', 'Begin Formal Interview'],
  director: ['Request Budget Increase', 'Submit Proposal', 'Provide Status Update'],
  security: ['Request Additional Guards', 'Confirm Restraints', 'Review Emergency Procedures'],
  ethics: ['Confirm Boundaries', 'Request Review', 'Report Compliance'],
  procurement: ['Submit Request', 'Ask About ETA', 'Revise Order'],
  'class-d': ['Ask About Prior Contact', 'Assess Compliance', 'End Interview']
};

export const ChatLayout = ({ conversations, defaultId }: { conversations: Conversation[]; defaultId?: string }) => {
  const { dispatch, state } = useStore();
  const [activeId, setActiveId] = useState(defaultId ?? conversations[0]?.id);
  const active = conversations.find((conversation) => conversation.id === activeId) ?? conversations[0];

  const chips = contextChips[active?.id ?? ''] ?? ['Request Status', 'Ask for Guidance'];

  const sendMessage = (content: string) => {
    if (!active) return;
    const message: Message = {
      id: `msg-${Date.now()}`,
      role: 'player',
      speaker: `${state.player?.firstName ?? 'Researcher'}`,
      content,
      timestamp: new Date().toISOString()
    };
    dispatch({ type: 'SEND_MESSAGE', payload: { conversationId: active.id, message } });
  };

  return (
    <div className="h-full flex">
      <aside className="w-64 border-r border-slate-800 bg-slateCore-900/90 p-4 overflow-y-auto">
        <h2 className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-4">Threads</h2>
        <div className="space-y-2">
          {conversations.map((conversation) => {
            const activeClass = conversation.id === active?.id;
            return (
              <button
                key={conversation.id}
                onClick={() => {
                  setActiveId(conversation.id);
                  dispatch({ type: 'MARK_CONVERSATION_READ', payload: conversation.id });
                }}
                className={`w-full text-left px-3 py-2 rounded-md border transition ${
                  activeClass
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-slateCore-900 border-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between text-sm">
                  <span>{conversation.title}</span>
                  {conversation.unreadCount > 0 && (
                    <span className="text-[10px] bg-danger-500 text-white rounded-full px-2">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {conversation.messages[conversation.messages.length - 1]?.content.slice(0, 32) ?? 'No messages yet'}
                </div>
              </button>
            );
          })}
        </div>
      </aside>
      <section className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {active?.messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'player' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xl rounded-lg border px-4 py-3 text-sm shadow-sm ${
                  message.role === 'player'
                    ? 'bg-accent-600/20 border-accent-500 text-white'
                    : message.role === 'system'
                    ? 'bg-slate-800/70 border-slate-700 text-slate-300'
                    : 'bg-slateCore-900 border-slate-700 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span>{message.speaker}</span>
                  <span>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {message.clearanceTag && (
                  <div className="text-[10px] uppercase text-accent-400 mb-1">Clearance {message.clearanceTag}</div>
                )}
                <div>{message.content}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 p-4 bg-slateCore-900/90">
          <div className="flex flex-wrap gap-2 mb-3">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => sendMessage(chip)}
                className="text-xs px-3 py-1 rounded-full border border-slate-700 text-slate-300 hover:border-accent-500"
              >
                {chip}
              </button>
            ))}
          </div>
          <ChatInput onSend={sendMessage} />
        </div>
      </section>
      <aside className="w-72 border-l border-slate-800 bg-slateCore-900/90 p-4 space-y-4">
        <div>
          <h3 className="text-xs uppercase tracking-[0.3em] text-slate-500">Active Context</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-300">
            <div>Phase: {state.testSession.phase}</div>
            <div>Objectives:</div>
            <ul className="list-disc list-inside text-xs text-slate-400">
              {state.testSession.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
            <div className="text-xs text-slate-400">Budget Remaining: ${state.testSession.budgetRemaining.toLocaleString()}</div>
            <div className="text-xs text-slate-400">
              Pending Approvals: {state.procurement.filter((request) => request.status === 'submitted').length}
            </div>
            <div className="text-xs text-slate-400">
              Deliveries: {state.procurement.filter((request) => request.status === 'delivered').length}
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-500">
          Logs:
          <ul className="mt-2 space-y-1">
            {state.testSession.logs.slice(-4).map((log) => (
              <li key={log} className="text-[11px] text-slate-400">• {log}</li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

const ChatInput = ({ onSend }: { onSend: (content: string) => void }) => {
  const [value, setValue] = useState('');

  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Enter response..."
        className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
      />
      <button
        onClick={() => {
          if (!value.trim()) return;
          onSend(value.trim());
          setValue('');
        }}
        className="px-4 py-2 bg-accent-600 text-slate-900 rounded-md text-sm font-semibold"
      >
        Send
      </button>
    </div>
  );
};
