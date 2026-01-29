'use client';

import Link from 'next/link';
import { ScpSettings } from '@/components/ScpSettings';
import { useStore } from '@/lib/store';

export default function AdminPage() {
  const { state } = useStore();

  return (
    <div className="min-h-screen h-screen flex flex-col text-slate-100">
      <header className="border-b border-slate-800 bg-slateCore-900/90 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">SCP FOUNDATION // SITE-47</p>
          <h1 className="text-xl font-semibold">Admin Console</h1>
        </div>
        <Link
          href="/"
          className="text-xs px-3 py-2 border border-slate-700 rounded-md text-slate-300 hover:border-accent-500"
        >
          Back to Interview
        </Link>
      </header>
      <main className="flex-1 overflow-hidden p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-6 h-full min-h-0">
          <section className="space-y-6 overflow-y-auto min-h-0 pr-1">
            <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-6 shadow-panel">
              <h2 className="text-lg font-semibold">Character Metrics</h2>
              <p className="text-sm text-slate-400">Track quantitative state during roleplay.</p>
              <div className="mt-4 space-y-3">
                {state.scpSettings.metrics.map((metric) => (
                  <div key={metric.id} className="flex items-center justify-between text-sm">
                    <span>{metric.label}</span>
                    <span className="text-accent-400 font-semibold">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-6 shadow-panel">
              <h2 className="text-lg font-semibold">Objectives</h2>
              <p className="text-sm text-slate-400">Complete these goals during the interview.</p>
              <div className="mt-4 space-y-3">
                {state.scpSettings.objectives.map((objective) => (
                  <div
                    key={objective.id}
                    className="flex items-start gap-3 rounded-lg border border-slate-800/70 p-3 text-sm"
                  >
                    <div
                      className={`mt-1 h-4 w-4 rounded-full border flex items-center justify-center text-[10px] ${
                        objective.completedAt
                          ? 'border-emerald-500/60 bg-emerald-500/20 text-emerald-300'
                          : 'border-slate-600 text-slate-500'
                      }`}
                    >
                      {objective.completedAt ? '✓' : ''}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-slate-200">{objective.title}</span>
                        <span className="text-[11px] uppercase tracking-wide text-slate-500">
                          {objective.completedAt ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{objective.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="overflow-y-auto min-h-0 pr-1">
            <ScpSettings />
          </section>
        </div>
      </main>
    </div>
  );
}
