'use client';

import { useMemo } from 'react';
import { useStore } from '@/lib/store';
import { InventoryItem } from '@/lib/types';

const formatCredits = (amount: number) => `₡${amount.toLocaleString()}`;

export const Dashboard = () => {
  const { state, dispatch } = useStore();
  const canStartInterview = state.researchStatus !== 'pending' && state.missionStatus === 'briefing';

  const remainingObjectives = useMemo(
    () => state.scpSettings.objectives.filter((objective) => !objective.completedAt),
    [state.scpSettings.objectives]
  );

  const acceptRequest = (request: { id: string; itemName: string; description: string; cost: number }) => {
    if (request.cost > state.budget) {
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
        <div className="text-xs text-slate-500">Research Overview</div>
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
            <h3 className="text-sm font-semibold text-slate-200">Interview Control</h3>
            <p className="text-xs text-slate-500 mt-1">
              Complete the research inquiry, then begin the live SCP interview.
            </p>
            <button
              onClick={() => {
                dispatch({ type: 'SET_MISSION_STATUS', payload: 'interview' });
              }}
              disabled={!canStartInterview}
              className="mt-3 px-3 py-2 border border-slate-700 rounded-md text-xs text-slate-300 disabled:opacity-60"
            >
              Proceed to Interview
            </button>
            {!canStartInterview && (
              <p className="text-xs text-slate-500 mt-2">
                Review the briefing and complete procurement before entering the interview room.
              </p>
            )}
          </div>
          <div className="rounded-lg border border-slate-800 p-4">
            <h3 className="text-sm font-semibold text-slate-200">Acquisition Notes</h3>
            <p className="text-xs text-slate-500 mt-1">
              Director procurement now runs in its own chat console. Approved items will appear in the inventory list.
            </p>
            <button
              onClick={() => dispatch({ type: 'SET_DIRECTOR_REQUEST', payload: null })}
              className="mt-3 px-3 py-2 border border-slate-700 rounded-md text-xs text-slate-300"
            >
              Clear Last Request
            </button>
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-500">
        Procurement must be finalized before entering the interview. Use the Director chat to request items or ask
        research questions.
      </div>
    </section>
  );
};
