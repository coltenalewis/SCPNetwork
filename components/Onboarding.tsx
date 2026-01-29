'use client';

import { useMemo, useState } from 'react';
import { useStore } from '@/lib/store';
import { firstNames, lastNames } from '@/lib/seed';
import { PlayerProfile } from '@/lib/types';

export const Onboarding = () => {
  const { dispatch } = useStore();
  const [firstName, setFirstName] = useState(firstNames[0]);
  const [lastName, setLastName] = useState(lastNames[0]);

  const profile = useMemo<PlayerProfile>(
    () => ({
      firstName,
      lastName,
      roleTitle: 'Junior Researcher',
      clearanceLevel: 2,
      reputation: 45,
      trust: 40,
      createdAt: new Date().toISOString()
    }),
    [firstName, lastName]
  );

  const handleCreate = () => {
    dispatch({ type: 'CREATE_PROFILE', payload: profile });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif-${Date.now()}`,
        type: 'message',
        title: 'Assignment received',
        detail: 'Test Cycle 049-A assigned. Review briefing.',
        timestamp: new Date().toISOString(),
        unread: true
      }
    });
  };

  const handleRandom = () => {
    setFirstName(firstNames[Math.floor(Math.random() * firstNames.length)]);
    setLastName(lastNames[Math.floor(Math.random() * lastNames.length)]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slateCore-950">
      <div className="bg-slateCore-900 border border-slate-800 rounded-xl shadow-panel w-full max-w-xl p-8 space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">SCP FOUNDATION // SITE-47</p>
          <h1 className="text-2xl font-semibold mt-2">Researcher Onboarding</h1>
          <p className="text-sm text-slate-400 mt-2">
            Create your Foundation profile. Assignment will begin immediately after confirmation.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="text-sm text-slate-300">
            First Name
            <select
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
            >
              {firstNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-slate-300">
            Last Name
            <select
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
            >
              {lastNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-accent-600 text-slate-900 rounded-md text-sm font-semibold"
          >
            Confirm Assignment
          </button>
          <button
            onClick={handleRandom}
            className="px-4 py-2 border border-slate-700 rounded-md text-sm text-slate-300"
          >
            Generate Random
          </button>
        </div>
        <div className="text-xs text-slate-500">
          Role: Junior Researcher • Clearance Level 2 • Initial Trust 40
        </div>
      </div>
    </div>
  );
};
