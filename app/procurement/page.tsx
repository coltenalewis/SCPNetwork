'use client';

import Link from 'next/link';
import { Dashboard } from '@/components/Dashboard';
import { DirectorChat } from '@/components/DirectorChat';
import { Onboarding } from '@/components/Onboarding';
import { ResearchInquiry } from '@/components/ResearchInquiry';
import { useStore, useClearSave } from '@/lib/store';

export default function ProcurementPage() {
  const { state } = useStore();
  const clearSave = useClearSave();

  if (!state.player) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen h-screen flex flex-col text-slate-100">
      <header className="border-b border-slate-800 bg-slateCore-900/90 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">SCP FOUNDATION // PROCUREMENT</p>
          <h1 className="text-xl font-semibold">Research & Procurement Console</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs px-3 py-2 border border-slate-700 rounded-md text-slate-300 hover:border-accent-500"
          >
            Interview Room
          </Link>
          <button
            onClick={() => {
              clearSave();
              window.location.reload();
            }}
            className="text-xs px-3 py-2 border border-slate-700 rounded-md text-slate-300"
          >
            Clear Save Data
          </button>
        </div>
      </header>
      <main className="flex-1 overflow-hidden p-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-6 h-full min-h-0">
          <div className="overflow-y-auto pr-1 min-h-0">
            <Dashboard />
          </div>
          <div className="min-h-0">
            <DirectorChat />
          </div>
        </div>
      </main>
      <ResearchInquiry />
    </div>
  );
}
