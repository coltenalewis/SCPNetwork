'use client';

import { useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { useClearSave } from '@/lib/store';

export default function SettingsPage() {
  const [confirming, setConfirming] = useState(false);
  const clearSave = useClearSave();

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Settings</h1>
          <p className="text-sm text-slate-400">Interface preferences and save management.</p>
        </div>
        <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-6 shadow-panel max-w-2xl">
          <h2 className="text-lg font-semibold">Clear Save Data</h2>
          <p className="text-sm text-slate-400 mt-2">Wipes local progress, resets onboarding, and clears logs.</p>
          <button
            onClick={() => setConfirming(true)}
            className="mt-4 px-4 py-2 bg-danger-500 text-white rounded-md text-sm"
          >
            Clear Save Data
          </button>
        </div>
        {confirming && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-6 shadow-panel w-full max-w-md">
              <h3 className="text-lg font-semibold">Confirm Reset</h3>
              <p className="text-sm text-slate-400 mt-2">This will permanently wipe your local save.</p>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    clearSave();
                    setConfirming(false);
                    window.location.reload();
                  }}
                  className="px-4 py-2 bg-danger-500 text-white rounded-md text-sm"
                >
                  Confirm Wipe
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  className="px-4 py-2 border border-slate-700 rounded-md text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
