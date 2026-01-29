'use client';

import { useEffect, useMemo, useState } from 'react';
import { useStore } from '@/lib/store';

const TWO_MINUTES_MS = 2 * 60 * 1000;

const Redacted = ({ children }: { children: string }) => (
  <span className="bg-slate-900 text-transparent px-1 rounded-sm">{children}</span>
);

export const ResearchInquiry = () => {
  const { state, dispatch } = useStore();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (state.researchStatus !== 'pending') return;
    if (!state.researchStartedAt || !state.researchEndsAt) {
      const startedAt = new Date().toISOString();
      const endsAt = new Date(Date.now() + TWO_MINUTES_MS).toISOString();
      dispatch({
        type: 'SET_RESEARCH_STATUS',
        payload: { status: 'pending', startedAt, endsAt }
      });
    }
  }, [dispatch, state.researchEndsAt, state.researchStartedAt, state.researchStatus]);

  useEffect(() => {
    if (state.researchStatus !== 'pending') return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [state.researchStatus]);

  const remainingMs = useMemo(() => {
    if (!state.researchEndsAt) return TWO_MINUTES_MS;
    return Math.max(0, new Date(state.researchEndsAt).getTime() - now);
  }, [now, state.researchEndsAt]);

  useEffect(() => {
    if (state.researchStatus !== 'pending') return;
    if (remainingMs === 0) {
      dispatch({ type: 'SET_RESEARCH_STATUS', payload: { status: 'complete' } });
    }
  }, [dispatch, remainingMs, state.researchStatus]);

  if (state.researchStatus !== 'pending') {
    return null;
  }

  const minutes = Math.floor(remainingMs / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6">
      <div className="max-w-3xl w-full bg-stone-100 text-stone-900 rounded-xl shadow-panel border border-stone-300 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-300">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-stone-500">Research Inquiry</p>
            <h2 className="text-xl font-semibold">SCP-049 Briefing Dossier</h2>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-500">Time Remaining</p>
            <p className="text-lg font-semibold">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          </div>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6 font-mono text-[13px] leading-relaxed">
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Summary</h3>
            <p>
              SCP-049 is contained at Site-47. Subject demonstrates cooperative behavior with medical personnel while
              retaining the belief that it can cure the <Redacted>Pestilence</Redacted>. All interviews must maintain
              Class-3 medical protocol and fail-safe containment procedures.
            </p>
          </section>
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Containment</h3>
            <p>
              Primary chamber is equipped with <Redacted>Hazard Grade Filtration</Redacted> and remote lockdown
              controls. No physical contact without Director approval. Emergency protocol <Redacted>Omega-7</Redacted>{' '}
              is on standby.
            </p>
          </section>
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Interview Objectives</h3>
            <ul className="mt-2 space-y-2">
              {state.scpSettings.objectives.map((objective) => (
                <li
                  key={objective.id}
                  className="rounded-md border border-amber-400/40 bg-amber-200/60 px-3 py-2 text-amber-900"
                >
                  <strong>{objective.title}:</strong> {objective.description}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">Safety Notes</h3>
            <p>
              Subject may attempt to request additional materials or <Redacted>Class-D personnel</Redacted>. All
              requisitions must be approved through the Director channel prior to interview commencement.
            </p>
          </section>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-300">
          <p className="text-xs text-stone-500">
            Review the dossier. You may skip if already briefed, but objectives are locked to this inquiry.
          </p>
          <button
            onClick={() => dispatch({ type: 'SET_RESEARCH_STATUS', payload: { status: 'skipped' } })}
            className="px-4 py-2 text-sm border border-stone-400 rounded-md text-stone-700"
          >
            Skip Briefing
          </button>
        </div>
      </div>
    </div>
  );
};
