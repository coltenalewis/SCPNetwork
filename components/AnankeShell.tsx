'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import { useStore } from '@/lib/store';

const nav = [
  { href: '/pulse', label: 'Pulse' },
  { href: '/journal', label: 'Journal' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/graph', label: 'Graph' },
  { href: '/goals', label: 'Goals' }
];

export function AnankeShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { unlocked, unlock, lock, dispatch, state } = useStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [idea, setIdea] = useState('');
  const [category, setCategory] = useState<'career' | 'finance' | 'travel' | 'health' | 'relationships' | 'knowledge'>('career');

  const today = useMemo(() => new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }), []);

  if (!unlocked) {
    return (
      <div className="gate-wrap">
        <div className="gate-ring" />
        <form
          className="gate-card"
          onSubmit={(e) => {
            e.preventDefault();
            const ok = unlock(password);
            if (!ok) setError('Invalid seed credential.');
          }}
        >
          <p className="kicker">ANANKE // Login Gate</p>
          <h1>Enter the codex.</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="Seed password"
          />
          <button type="submit">Confirm</button>
          <p className="hint">Prototype seed credential: ColtenLewis (temporary ritual gate).</p>
          {error ? <p className="error">{error}</p> : null}
        </form>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside>
        <h1>ANANKE</h1>
        <p className="muted">{today}</p>
        <nav>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? 'active' : ''}>
              {item.label}
            </Link>
          ))}
        </nav>
        <button className="lock-btn" onClick={lock}>Lock</button>
      </aside>
      <main>{children}</main>
      <section className="idea-stream">
        <h3>Idea Stream</h3>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            if (!idea.trim()) return;
            dispatch({
              type: 'ADD_IDEA',
              payload: { id: crypto.randomUUID(), text: idea, category, createdAt: new Date().toISOString() }
            });
            setIdea('');
          }}
        >
          <textarea value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="Capture raw thought..." rows={4} />
          <select value={category} onChange={(e) => setCategory(e.target.value as any)}>
            <option>career</option><option>finance</option><option>travel</option><option>health</option><option>relationships</option><option>knowledge</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        <div className="idea-list">
          {state.ideas.slice(0, 6).map((item) => (
            <div key={item.id} className="idea-item"><b>{item.category}</b><p>{item.text}</p></div>
          ))}
        </div>
      </section>
    </div>
  );
}
