'use client';

import { FormEvent, useState } from 'react';
import { AnankeShell } from '@/components/AnankeShell';
import { useStore } from '@/lib/store';

export default function GoalsPage() {
  const { state, dispatch } = useStore();
  const [title, setTitle] = useState('');
  const [horizon, setHorizon] = useState<'3-5y' | 'year' | 'quarter' | 'month'>('quarter');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_GOAL', payload: { id: crypto.randomUUID(), title, horizon, theme: 'Intentional progression', milestones: [] } });
    setTitle('');
  };

  return (
    <AnankeShell>
      <div className="panel-grid">
        <section className="panel">
          <h2>Long-Range Structure</h2>
          <p className="small">3–5 year vision → yearly themes → quarterly focuses → monthly objectives.</p>
          {state.goals.map((g) => <p key={g.id}><b>{g.horizon}</b> — {g.title}</p>)}
        </section>
        <form className="panel" onSubmit={onSubmit}>
          <h2>Create Goal</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Goal title" />
          <select value={horizon} onChange={(e) => setHorizon(e.target.value as any)}>
            <option value="3-5y">3-5y</option><option value="year">year</option><option value="quarter">quarter</option><option value="month">month</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
    </AnankeShell>
  );
}
