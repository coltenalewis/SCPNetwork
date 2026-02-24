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
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-14 text-white">
      <div className="rounded-2xl border border-white/15 bg-[#0a1120]/70 p-6 shadow-[0_0_40px_rgba(30,64,175,0.2)] backdrop-blur-xl">
        <p className="text-sm tracking-[0.18em] text-cyan-100/80">CLIENT PORTAL</p>
        <h1 className="mt-2 text-4xl font-semibold">Product Delivery Schedule</h1>
        <p className="mt-3 max-w-3xl text-slate-200">
          Select your project and enter your code to access the current development calendar.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Project
            <select
              className="rounded-xl border border-cyan-200/30 bg-black/30 px-3 py-2 text-white outline-none focus:border-cyan-200"
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

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Project code
            <input
              type="password"
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
              className="rounded-xl border border-cyan-200/30 bg-black/30 px-3 py-2 text-white outline-none focus:border-cyan-200"
              placeholder="Enter code"
            />
          </label>

          <button
            type="submit"
            className="rounded-xl bg-cyan-400/90 px-5 py-2.5 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20"
          >
            Unlock
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

        {isAuthorized ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-black/30 p-2">
            <iframe
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Pacific%2FHonolulu&showPrint=0&title=Development%20Schedule&mode=WEEK&src=YWMwZTA5ZmRjZDliZjM2M2M4ODAwZmZmMTIzMjM3MzY2ZjU3Y2VjMTg2YzVmMDlmNzNkYjc3Njg2MGEwYjU5OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23f4511e"
              style={{ border: 'solid 1px #777' }}
              width="800"
              height="600"
              frameBorder="0"
              scrolling="no"
              title="Development Schedule"
              className="h-[600px] w-full"
            />
          </div>
        ) : null}

        <Link href="/" className="mt-8 inline-flex text-sm text-cyan-100 hover:text-cyan-50">
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
