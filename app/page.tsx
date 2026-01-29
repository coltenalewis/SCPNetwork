'use client';

import { Onboarding } from '@/components/Onboarding';
import { ScpChat } from '@/components/ScpChat';
import { useStore, useClearSave } from '@/lib/store';
import Link from 'next/link';

export default function HomePage() {
  const { state } = useStore();
  const clearSave = useClearSave();

  if (!state.player) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen h-screen flex flex-col text-slate-100">
      <header className="border-b border-slate-800 bg-slateCore-900/90 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">SCP FOUNDATION // SITE-47</p>
          <h1 className="text-xl font-semibold">SCP-049 Interview Console</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="text-xs px-3 py-2 border border-slate-700 rounded-md text-slate-300 hover:border-accent-500"
          >
            Admin Console
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
        <section className="bg-slateCore-900 border border-slate-800 rounded-xl shadow-panel flex flex-col h-full min-h-0">
          <div className="border-b border-slate-800 px-6 py-4">
            <h2 className="text-lg font-semibold">Live SCP-049 Thread</h2>
            <p className="text-sm text-slate-400">Single-thread roleplay chat with SCP-049.</p>
          </div>
          <ScpChat />
        </section>
      </main>
    </div>
  );
}
