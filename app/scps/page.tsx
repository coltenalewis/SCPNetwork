'use client';

import { AppShell } from '@/components/AppShell';
import { ChatLayout } from '@/components/ChatLayout';
import { useStore } from '@/lib/store';

export default function ScpsPage() {
  const { state, dispatch } = useStore();
  const scpConversation = state.conversations.filter((conversation) => conversation.id === 'scp-049');

  const readyToBegin =
    state.procurement.every((request) => request.status === 'delivered') &&
    state.procurement.length > 0 &&
    state.testSession.phase === 'waiting';

  const handleComplete = () => {
    const createdAt = new Date().toISOString();
    dispatch({
      type: 'ADD_DOCUMENT',
      payload: {
        id: `doc-report-${Date.now()}`,
        title: 'Post-Test Report',
        docId: `REPORT-049-${new Date().getTime().toString().slice(-6)}`,
        clearanceRequired: 2,
        author: state.player?.firstName ? `${state.player.firstName} ${state.player.lastName}` : 'Researcher',
        createdAt,
        tags: ['report', 'scp-049'],
        body: [
          'SCP FOUNDATION // SITE-47',
          'Classification: Post-Test Summary',
          'Session Notes: SCP-049 remained cooperative within containment parameters.',
          'Deviation Log: None recorded beyond procedural notes.',
          'Recommendations: Proceed with controlled stimuli and reinforced medical scanning.',
          'Director Evaluation: Pending review.'
        ]
      }
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif-${Date.now()}`,
        type: 'alert',
        title: 'Post-Test Report Generated',
        detail: 'Report filed to documents panel for Director review.',
        timestamp: createdAt,
        unread: true
      }
    });
    dispatch({ type: 'ADVANCE_PHASE', payload: 'reporting' });
  };

  return (
    <AppShell>
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">SCP Subjects</h1>
              <p className="text-sm text-slate-400">SCP-049 active. Additional subjects locked.</p>
            </div>
            {state.testSession.phase === 'execution' ? (
              <button
                onClick={handleComplete}
                className="px-4 py-2 rounded-md text-sm font-semibold bg-accent-600 text-slate-900"
              >
                Complete Test
              </button>
            ) : (
              <button
                onClick={() => dispatch({ type: 'ADVANCE_PHASE', payload: readyToBegin ? 'execution' : 'waiting' })}
                className={`px-4 py-2 rounded-md text-sm font-semibold ${
                  readyToBegin ? 'bg-accent-600 text-slate-900' : 'bg-slate-800 text-slate-400'
                }`}
                disabled={!readyToBegin}
              >
                {readyToBegin ? 'Begin Test' : 'Awaiting Materials'}
              </button>
            )}
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slateCore-900 border border-slate-800 rounded-lg p-4">
              <div className="text-xs uppercase text-slate-500">Containment</div>
              <div className="text-sm text-slate-300 mt-2">Medical suite, dual guard rotation, biometric lockout.</div>
            </div>
            <div className="bg-slateCore-900 border border-slate-800 rounded-lg p-4">
              <div className="text-xs uppercase text-slate-500">Test Plan</div>
              <div className="text-sm text-slate-300 mt-2">Interview-led, protocol revision 2.1, minimal stimuli.</div>
            </div>
            <div className="bg-slateCore-900 border border-slate-800 rounded-lg p-4">
              <div className="text-xs uppercase text-slate-500">Phase</div>
              <div className="text-sm text-slate-300 mt-2">{state.testSession.phase}</div>
              <div className="text-xs text-slate-500 mt-1">Invited Staff: {state.testSession.invitedStaff.length}</div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <ChatLayout conversations={scpConversation} defaultId="scp-049" />
        </div>
      </div>
    </AppShell>
  );
}
