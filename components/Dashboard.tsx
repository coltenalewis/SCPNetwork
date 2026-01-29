'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { DirectorRequest, InventoryItem } from '@/lib/types';

const formatCredits = (amount: number) => `₡${amount.toLocaleString()}`;

export const Dashboard = () => {
  const { state, dispatch } = useStore();
  const router = useRouter();
  const [requestText, setRequestText] = useState('');
  const [appealText, setAppealText] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  const directorRequest = state.directorRequest;
  const canRequest = state.missionStatus === 'briefing';
  const canStartInterview = state.researchStatus !== 'pending' && state.missionStatus === 'briefing';

  const remainingObjectives = useMemo(
    () => state.scpSettings.objectives.filter((objective) => !objective.completedAt),
    [state.scpSettings.objectives]
  );

  const submitDirectorRequest = async (appeal = false) => {
    const message = appeal ? appealText.trim() : requestText.trim();
    const baseRequest = directorRequest?.request ?? requestText.trim();
    if (!message || !canRequest) return;
    setIsRequesting(true);
    try {
      const response = await fetch('/api/director', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request: baseRequest,
          appeal: appeal ? message : undefined,
          budget: state.budget
        })
      });
      if (!response.ok) {
        dispatch({
          type: 'SET_DIRECTOR_REQUEST',
          payload: {
            id: `director-${Date.now()}`,
            request: baseRequest,
            itemName: 'Denied',
            description: 'Director channel unavailable. Check API connectivity.',
            cost: 0,
            status: 'denied',
            createdAt: new Date().toISOString()
          } satisfies DirectorRequest
        });
        return;
      }
      const data = (await response.json()) as { itemName?: string; description?: string; cost?: number };
      dispatch({
        type: 'SET_DIRECTOR_REQUEST',
        payload: {
          id: `director-${Date.now()}`,
          request: baseRequest,
          itemName: data.itemName ?? 'Requested Asset',
          description: data.description ?? 'No description returned.',
          cost: Number(data.cost ?? 0),
          status: 'pending',
          createdAt: new Date().toISOString()
        } satisfies DirectorRequest
      });
      if (!appeal) {
        setRequestText('');
      } else {
        setAppealText('');
      }
    } finally {
      setIsRequesting(false);
    }
  };

  const acceptRequest = (request: DirectorRequest) => {
    if (request.cost > state.budget) {
      dispatch({
        type: 'SET_DIRECTOR_REQUEST',
        payload: { ...request, status: 'denied', description: 'Denied: insufficient budget.' }
      });
      return;
    }
    const newItem: InventoryItem = {
      id: request.id,
      name: request.itemName,
      description: request.description,
      cost: request.cost,
      quantity: 1
    };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    dispatch({ type: 'SET_BUDGET', payload: state.budget - request.cost });
    dispatch({ type: 'SET_DIRECTOR_REQUEST', payload: { ...request, status: 'accepted' } });
  };

  const denyRequest = (request: DirectorRequest) => {
    dispatch({ type: 'SET_DIRECTOR_REQUEST', payload: { ...request, status: 'denied' } });
  };

  return (
    <section className="bg-slateCore-900 border border-slate-800 rounded-xl shadow-panel p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Researcher Dashboard</p>
          <h2 className="text-lg font-semibold">Mission Status: {state.missionStatus}</h2>
          <p className="text-xs text-slate-400">
            Budget Remaining: <span className="text-accent-400 font-semibold">{formatCredits(state.budget)}</span>
          </p>
        </div>
        <div className="text-xs text-slate-500">Procurement Console</div>
      </div>

      {state.missionStatus === 'completed' && (
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          Mission complete. All objectives achieved. Next SCP subject locked pending Directorate approval.
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-6">
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-800 p-4">
            <h3 className="text-sm font-semibold text-slate-200">Objectives</h3>
            <p className="text-xs text-slate-500 mt-1">
              {remainingObjectives.length} remaining · Complete all to close the mission.
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {state.scpSettings.objectives.map((objective) => (
                <li
                  key={objective.id}
                  className={`rounded-md border px-3 py-2 ${
                    objective.completedAt
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-200'
                  }`}
                >
                  <strong>{objective.title}</strong> — {objective.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-800 p-4">
            <h3 className="text-sm font-semibold text-slate-200">Inventory</h3>
            <p className="text-xs text-slate-500 mt-1">Usable during the interview in Action mode.</p>
            {state.inventory.length === 0 ? (
              <p className="text-xs text-slate-500 mt-2">No items acquired yet.</p>
            ) : (
              <div className="mt-3 space-y-2 text-sm">
                {state.inventory.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-200">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.description}</p>
                    </div>
                    <span className="text-xs text-slate-400">x{item.quantity}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-800 p-4">
            <h3 className="text-sm font-semibold text-slate-200">Director Procurement</h3>
            <p className="text-xs text-slate-500 mt-1">
              Request custom items before the interview. Director returns pricing for approval.
            </p>
            <textarea
              value={requestText}
              onChange={(event) => setRequestText(event.target.value)}
              placeholder="Request item (e.g., Class D personnel, medical kit, containment restraints)."
              className="mt-3 w-full min-h-[90px] bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
              disabled={!canRequest || isRequesting}
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                {canRequest ? 'Procurement available until interview starts.' : 'Procurement closed.'}
              </span>
              <button
                onClick={() => submitDirectorRequest()}
                disabled={!canRequest || isRequesting || !requestText.trim()}
                className="px-3 py-2 bg-accent-600 text-slate-900 rounded-md text-xs font-semibold disabled:opacity-60"
              >
                {isRequesting ? 'Requesting...' : 'Send Request'}
              </button>
            </div>
          </div>

          {directorRequest && (
            <div className="rounded-lg border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-200">Director Response</h4>
                <span
                  className={`text-[11px] uppercase tracking-wide ${
                    directorRequest.status === 'accepted'
                      ? 'text-emerald-300'
                      : directorRequest.status === 'denied'
                      ? 'text-red-300'
                      : 'text-amber-300'
                  }`}
                >
                  {directorRequest.status}
                </span>
              </div>
              <div className="text-sm">
                <p className="font-semibold">{directorRequest.itemName}</p>
                <p className="text-xs text-slate-400">{directorRequest.description}</p>
                <p className="text-xs text-slate-400 mt-2">
                  Cost: <span className="text-accent-400">{formatCredits(directorRequest.cost)}</span>
                </p>
              </div>
              {directorRequest.status === 'pending' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => acceptRequest(directorRequest)}
                    className="px-3 py-1 bg-accent-600 text-slate-900 rounded-md text-xs font-semibold"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => denyRequest(directorRequest)}
                    className="px-3 py-1 border border-slate-700 text-slate-300 rounded-md text-xs"
                  >
                    Deny
                  </button>
                </div>
              )}
              {directorRequest.status === 'denied' && canRequest && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-400">
                    Submit a persuasion note to the Director if you want to appeal the denial.
                  </p>
                  <textarea
                    value={appealText}
                    onChange={(event) => setAppealText(event.target.value)}
                    placeholder="Appeal message (e.g., containment risk, medical necessity, budget justification)."
                    className="w-full min-h-[70px] bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
                    disabled={isRequesting}
                  />
                  <button
                    onClick={() => submitDirectorRequest(true)}
                    disabled={isRequesting || !appealText.trim()}
                    className="px-3 py-1 border border-slate-700 text-slate-300 rounded-md text-xs"
                  >
                    Submit Appeal
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="rounded-lg border border-slate-800 p-4">
            <h3 className="text-sm font-semibold text-slate-200">Interview Control</h3>
            <p className="text-xs text-slate-500 mt-1">
              Complete the research inquiry, then begin the live SCP interview.
            </p>
            <button
              onClick={() => {
                dispatch({ type: 'SET_MISSION_STATUS', payload: 'interview' });
                router.push('/');
              }}
              disabled={!canStartInterview}
              className="mt-3 px-3 py-2 border border-slate-700 rounded-md text-xs text-slate-300 disabled:opacity-60"
            >
              Proceed to Interview
            </button>
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-500">
        Procurement must be finalized before entering the interview. You can appeal Director denials if the request is
        mission-critical.
      </div>
    </section>
  );
};
