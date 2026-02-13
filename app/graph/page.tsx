'use client';

import { useMemo, useState } from 'react';
import { AnankeShell } from '@/components/AnankeShell';
import { useStore } from '@/lib/store';

export default function GraphPage() {
  const { state } = useStore();
  const [selected, setSelected] = useState(state.nodes[0]?.id || '');
  const node = useMemo(() => state.nodes.find((n) => n.id === selected), [selected, state.nodes]);

  return (
    <AnankeShell>
      <div className="panel-grid">
        <section className="panel">
          <h2>Causality Graph</h2>
          <p className="small">Pan-and-zoom placeholder in v0.1, with explicit relationship schema.</p>
          <div className="node-cloud">
            {state.nodes.map((n) => <button key={n.id} className={selected === n.id ? 'selected' : ''} onClick={() => setSelected(n.id)}>{n.title} · {n.type}</button>)}
          </div>
          <h3>Links</h3>
          {state.links.length ? state.links.map((l) => <p key={l.id}>{l.from} → {l.to} ({l.type})</p>) : <p className="small">No links yet.</p>}
        </section>
        <section className="panel">
          <h2>Node Profile</h2>
          {node ? (
            <>
              <p><b>Title:</b> {node.title}</p>
              <p><b>Type:</b> {node.type}</p>
              <p><b>Status:</b> {node.status}</p>
              <p><b>Target:</b> {node.targetDate || 'N/A'}</p>
              <p><b>Why it matters:</b> {node.whyItMatters}</p>
            </>
          ) : <p>Select a node.</p>}
        </section>
      </div>
    </AnankeShell>
  );
}
