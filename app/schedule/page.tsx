'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

const clientProjects = {
  BloxLock: 'Natsuo',
} as const;

export default function SchedulePage() {
  const [selectedProject, setSelectedProject] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Pacific/Honolulu';

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredCode = clientProjects[selectedProject as keyof typeof clientProjects];

    if (!selectedProject) {
      setError('Please select a project.');
      setIsAuthorized(false);
      return;
    }

    if (requiredCode && accessCode.trim() === requiredCode) {
      setError('');
      setIsAuthorized(true);
      return;
    }

    setError('Incorrect project code. Please try again.');
    setIsAuthorized(false);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-14">
      <div className="card p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--accent)' }}>Client Portal</p>
        <h1 className="mt-2 font-display text-4xl" style={{ color: 'var(--ink)' }}>Product Delivery Schedule</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>
          Select your project and enter your code to access the current development calendar.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="flex flex-col gap-2 text-sm font-medium" style={{ color: 'var(--ink-soft)' }}>
            Project
            <select
              className="input-field"
              value={selectedProject}
              onChange={(event) => {
                setSelectedProject(event.target.value);
                setIsAuthorized(false);
                setError('');
              }}
            >
              <option value="">Select a project</option>
              <option value="BloxLock">BloxLock</option>
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium" style={{ color: 'var(--ink-soft)' }}>
            Project code
            <input
              type="password"
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
              className="input-field"
              placeholder="Enter code"
            />
          </label>

          <button type="submit" className="btn-fill">Unlock</button>
        </form>

        {error ? <p className="mt-4 text-sm text-rose-600">{error}</p> : null}

        {isAuthorized ? (
          <div className="card-flat mt-8 overflow-hidden p-2">
            <iframe
              src={`https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=${encodeURIComponent(userTimeZone)}&showPrint=0&title=Development%20Schedule&mode=WEEK&src=YWMwZTA5ZmRjZDliZjM2M2M4ODAwZmZmMTIzMjM3MzY2ZjU3Y2VjMTg2YzVmMDlmNzNkYjc3Njg2MGEwYjU5OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23f4511e`}
              style={{ border: '1px solid var(--border)' }}
              width="800"
              height="600"
              frameBorder="0"
              scrolling="no"
              title="Development Schedule"
              className="h-[600px] w-full rounded-xl"
            />
          </div>
        ) : null}

        <Link href="/" className="link-back mt-8">← Back to home</Link>
      </div>
    </main>
  );
}
