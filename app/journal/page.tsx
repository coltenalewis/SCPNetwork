'use client';

import { FormEvent, useState } from 'react';
import { AnankeShell } from '@/components/AnankeShell';
import { useStore } from '@/lib/store';

export default function JournalPage() {
  const { dispatch, state } = useStore();
  const [content, setContent] = useState('');
  const [intent, setIntent] = useState('');
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [focus, setFocus] = useState(3);
  const [stress, setStress] = useState(3);
  const [deepWorkHours, setDeepWorkHours] = useState(2);
  const [ai, setAi] = useState(true);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const tags = ai ? ['reflection', focus > 3 ? 'deep-work' : 'stability'] : [];
    const proposedGoals = ai ? ['Convert this entry into a monthly objective review.'] : [];
    const proposedTimeline = ai ? ['Schedule 2-hour deep work block tomorrow morning.'] : [];
    dispatch({
      type: 'ADD_JOURNAL',
      payload: {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        checkIn: { mood, energy, focus, stress, deepWorkHours, intent },
        content,
        tags,
        proposedGoals,
        proposedTimeline
      }
    });
    setContent('');
    setIntent('');
  };

  return (
    <AnankeShell>
      <div className="panel-grid">
        <form className="panel" onSubmit={onSubmit}>
          <h2>Journal Capture</h2>
          <p className="small">Structured check-in then freeform writing. Suggestions are proposed, never auto-committed.</p>
          <input placeholder="Today's intent" value={intent} onChange={(e) => setIntent(e.target.value)} />
          <div className="sliders">
            <label>Mood <input type="range" min={1} max={5} value={mood} onChange={(e) => setMood(Number(e.target.value))} /></label>
            <label>Energy <input type="range" min={1} max={5} value={energy} onChange={(e) => setEnergy(Number(e.target.value))} /></label>
            <label>Focus <input type="range" min={1} max={5} value={focus} onChange={(e) => setFocus(Number(e.target.value))} /></label>
            <label>Stress <input type="range" min={1} max={5} value={stress} onChange={(e) => setStress(Number(e.target.value))} /></label>
            <label>Deep work hours <input type="number" min={0} step={0.5} value={deepWorkHours} onChange={(e) => setDeepWorkHours(Number(e.target.value))} /></label>
          </div>
          <textarea rows={8} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write freely..." />
          <label className="small"><input type="checkbox" checked={ai} onChange={(e) => setAi(e.target.checked)} /> Optional AI assist</label>
          <button type="submit">Submit</button>
        </form>
        <section className="panel">
          <h2>Archive</h2>
          {state.journals.map((j) => (
            <article key={j.id} className="entry">
              <p className="small">{new Date(j.createdAt).toLocaleString()}</p>
              <p>{j.content || j.checkIn.intent}</p>
              {j.tags.length ? <p className="small">Tags: {j.tags.join(', ')}</p> : null}
            </article>
          ))}
        </section>
      </div>
    </AnankeShell>
  );
}
