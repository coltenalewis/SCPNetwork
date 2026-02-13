'use client';

import { FormEvent, useState } from 'react';
import { AnankeShell } from '@/components/AnankeShell';
import { useStore } from '@/lib/store';

export default function CalendarPage() {
  const { state, dispatch } = useStore();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [type, setType] = useState<'event' | 'work-block' | 'travel' | 'deadline' | 'milestone'>('event');

  const month = date.slice(0, 7);

  const onCreate = (e: FormEvent) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    dispatch({ type: 'ADD_TIMELINE', payload: { id, title, date, type, monthFocus: state.preferences.monthlyTheme } });
    dispatch({
      type: 'ADD_NODE',
      payload: {
        id: `node-${id}`,
        title,
        type: type === 'milestone' ? 'Milestone' : 'Project',
        status: 'active',
        targetDate: date,
        linkedCalendarItemIds: [id],
        whyItMatters: 'Created from calendar to preserve time-causality continuity.'
      }
    });
    setTitle('');
  };

  return (
    <AnankeShell>
      <div className="panel-grid">
        <section className="panel">
          <h2>Calendar Spine ({month})</h2>
          <p className="small">Month-first planning with day granularity.</p>
          <p>Focus statement: {state.preferences.northStarMonth}</p>
          <p>Theme: {state.preferences.monthlyTheme}</p>
          {state.timeline.map((item) => <p key={item.id}>{item.date} — {item.title} <span className="small">({item.type})</span></p>)}
        </section>
        <form className="panel" onSubmit={onCreate}>
          <h2>Schedule Item</h2>
          <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <select value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="event">event</option><option value="work-block">work-block</option><option value="travel">travel</option><option value="deadline">deadline</option><option value="milestone">milestone</option>
          </select>
          <button type="submit">Confirm</button>
        </form>
      </div>
    </AnankeShell>
  );
}
