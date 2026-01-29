'use client';

import { AppShell } from '@/components/AppShell';
import { ChatLayout } from '@/components/ChatLayout';
import { useStore } from '@/lib/store';

const staffRoster = [
  { name: 'Dr. Mbeki', role: 'Head Researcher', trait: 'Analytical' },
  { name: 'Dr. Hale', role: 'Research Scientist', trait: 'Protocol Stickler' },
  { name: 'Dr. Ionescu', role: 'Research Scientist', trait: 'Persuasive' },
  { name: 'Dr. Nakamura', role: 'Research Scientist', trait: 'Field Experience' }
];

export default function PersonnelPage() {
  const { state, dispatch } = useStore();
  const conversations = state.conversations.filter((conversation) =>
    ['director', 'head-research', 'security', 'ethics', 'procurement', 'class-d'].includes(conversation.id)
  );

  return (
    <AppShell>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-semibold">Personnel Directory</h1>
          <p className="text-sm text-slate-400">Engage staff, manage availability, and assign test assistants.</p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            {staffRoster.map((staff) => (
              <div key={staff.name} className="bg-slateCore-900 border border-slate-800 rounded-lg p-3">
                <div className="text-sm font-semibold">{staff.name}</div>
                <div className="text-xs text-slate-400">{staff.role}</div>
                <div className="text-xs text-accent-400 mt-2">Trait: {staff.trait}</div>
                <button
                  onClick={() => dispatch({ type: 'INVITE_STAFF', payload: staff.name })}
                  className="mt-3 text-xs px-3 py-1 border border-slate-700 rounded-md"
                >
                  Invite to Test
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <ChatLayout conversations={conversations} defaultId="director" />
        </div>
      </div>
    </AppShell>
  );
}
