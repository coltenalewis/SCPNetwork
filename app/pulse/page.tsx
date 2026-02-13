'use client';

import { AnankeShell } from '@/components/AnankeShell';
import { useStore } from '@/lib/store';

export default function PulsePage() {
  const { state } = useStore();
  const today = new Date().toISOString().slice(0, 10);
  const nextMilestones = state.milestones.slice(0, 3);

  return (
    <AnankeShell>
      <div className="panel-grid">
        <section className="panel"><h2>Pulse</h2><p>Today: {today}</p><p className="small">North Star: {state.preferences.northStarMonth}</p></section>
        <section className="panel"><h2>Milestone Anchors</h2>{nextMilestones.map((m) => <p key={m.id}>{m.month} — {m.title}</p>)}</section>
        <section className="panel"><h2>Insight Strip</h2><p><b>Constraint:</b> protect sleep before high-focus days.</p><p><b>Momentum:</b> steady journaling improves execution clarity.</p><p><b>Drift:</b> unplanned travel can dilute sprint commitments.</p></section>
      </div>
    </AnankeShell>
  );
}
