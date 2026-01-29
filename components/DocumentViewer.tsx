'use client';

import { useMemo, useState } from 'react';
import { DocumentItem } from '@/lib/types';
import { useStore } from '@/lib/store';

export const DocumentViewer = ({ documents }: { documents: DocumentItem[] }) => {
  const { state } = useStore();
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(documents[0]?.id);

  const filtered = useMemo(() => {
    return documents.filter((doc) =>
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.docId.toLowerCase().includes(query.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }, [documents, query]);

  const active = filtered.find((doc) => doc.id === activeId) ?? filtered[0];
  const clearance = state.player?.clearanceLevel ?? 1;

  return (
    <div className="h-full flex">
      <aside className="w-72 border-r border-slate-800 bg-slateCore-900/90 p-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search documents"
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
        />
        <div className="mt-4 space-y-2 overflow-y-auto max-h-[70vh] scrollbar-thin">
          {filtered.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveId(doc.id)}
              className={`w-full text-left px-3 py-2 rounded-md border ${
                doc.id === active?.id ? 'bg-slate-800 border-slate-700' : 'border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="text-sm">{doc.title}</div>
              <div className="text-xs text-slate-500">{doc.docId}</div>
            </button>
          ))}
        </div>
      </aside>
      <section className="flex-1 p-6 overflow-y-auto scrollbar-thin">
        {active ? (
          <article className="bg-slateCore-900 border border-slate-800 rounded-xl p-6 space-y-4 shadow-panel">
            <header>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">SCP FOUNDATION // SITE-47</p>
                  <h2 className="text-xl font-semibold mt-2 font-mono">{active.title}</h2>
                </div>
                <div className="text-xs text-slate-400">
                  Clearance Required: L{active.clearanceRequired}
                </div>
              </div>
              {clearance < active.clearanceRequired && (
                <div className="mt-3 border border-danger-500 text-danger-500 text-xs px-3 py-2 rounded">
                  Clearance insufficient. Content redacted.
                </div>
              )}
              <div className="mt-3 text-xs text-slate-500">Doc ID: {active.docId} • Author: {active.author}</div>
            </header>
            <div className="space-y-3 text-sm text-slate-200 leading-relaxed">
              {active.body.map((line, index) => (
                <p key={line + index} className={clearance < active.clearanceRequired ? 'redaction' : ''}>
                  {line}
                </p>
              ))}
            </div>
            <footer className="text-xs text-slate-500">Last Updated: {new Date(active.createdAt).toLocaleString()}</footer>
          </article>
        ) : (
          <div className="text-slate-400">No documents found.</div>
        )}
      </section>
    </div>
  );
};
