'use client';

import { useMemo, useState } from 'react';
import { AppShell } from '@/components/AppShell';
import { useStore } from '@/lib/store';
import { ProcurementItem, ProcurementRequest } from '@/lib/types';

const catalog: ProcurementItem[] = [
  { name: 'Audio recorder', quantity: 1, risk: 'low' },
  { name: 'Protective gloves', quantity: 6, risk: 'low' },
  { name: 'Specialized restraints', quantity: 2, risk: 'high' },
  { name: 'Sedation kit', quantity: 1, risk: 'medium' },
  { name: 'Portable med scanner', quantity: 1, risk: 'medium' }
];

const estimateCost = (items: ProcurementItem[]) =>
  items.reduce((sum, item) => {
    const base = item.risk === 'high' ? 12000 : item.risk === 'medium' ? 6000 : 2000;
    return sum + base * item.quantity;
  }, 0);

export default function OperationsPage() {
  const { state, dispatch } = useStore();
  const [selected, setSelected] = useState<ProcurementItem[]>([]);
  const [notes, setNotes] = useState('');

  const estimatedCost = useMemo(() => estimateCost(selected), [selected]);

  const toggleItem = (item: ProcurementItem) => {
    setSelected((prev) => {
      const exists = prev.find((entry) => entry.name === item.name);
      if (exists) {
        return prev.filter((entry) => entry.name !== item.name);
      }
      return [...prev, item];
    });
  };

  const handleSubmit = () => {
    if (selected.length === 0) return;
    const createdAt = new Date().toISOString();
    const request: ProcurementRequest = {
      id: `req-${Date.now()}`,
      items: selected,
      rationale: notes || 'Requesting standard test kit for SCP-049 interview cycle.',
      estimatedCost,
      status: 'submitted',
      approvals: [
        {
          by: 'Quartermaster Ruiz',
          status: 'pending',
          timestamp: new Date().toISOString()
        }
      ]
    };
    dispatch({ type: 'ADD_PROCUREMENT', payload: request });
    dispatch({
      type: 'ADD_DOCUMENT',
      payload: {
        id: `doc-proc-${Date.now()}`,
        title: 'Procurement Request Form',
        docId: `PROC-049-${new Date().getTime().toString().slice(-6)}`,
        clearanceRequired: 2,
        author: state.player?.firstName ? `${state.player.firstName} ${state.player.lastName}` : 'Researcher',
        createdAt,
        tags: ['procurement', 'scp-049'],
        body: [
          'SCP FOUNDATION // SITE-47',
          'Classification: Operational Request',
          `Requested Items: ${selected.map((item) => item.name).join(', ')}`,
          `Purpose: ${notes || 'Standardized interview kit for SCP-049 test cycle.'}`,
          `Estimated Cost: $${estimatedCost.toLocaleString()}`,
          'Status: Submitted for Director Review.'
        ]
      }
    });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif-${Date.now()}`,
        type: 'approval',
        title: 'Procurement submitted',
        detail: `Request ${request.id} awaiting director review.`,
        timestamp: new Date().toISOString(),
        unread: true
      }
    });
    setSelected([]);
    setNotes('');
    dispatch({ type: 'ADVANCE_PHASE', payload: 'waiting' });
  };

  const handleApprove = (request: ProcurementRequest) => {
    dispatch({ type: 'UPDATE_PROCUREMENT_STATUS', payload: { id: request.id, status: 'delivering', etaMinutes: 45 } });
    dispatch({ type: 'DEDUCT_BUDGET', payload: request.estimatedCost });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif-${Date.now()}`,
        type: 'approval',
        title: 'Director Approved',
        detail: `Request ${request.id} approved. ETA 45 minutes.`,
        timestamp: new Date().toISOString(),
        unread: true
      }
    });
  };

  const handleDeliver = (request: ProcurementRequest) => {
    dispatch({ type: 'UPDATE_PROCUREMENT_STATUS', payload: { id: request.id, status: 'delivered', etaMinutes: 0 } });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: `notif-${Date.now()}`,
        type: 'delivery',
        title: 'Materials Delivered',
        detail: `${request.items.length} items ready in staging.`,
        timestamp: new Date().toISOString(),
        unread: true
      }
    });
  };

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Operations • Procurement</h1>
          <p className="text-sm text-slate-400">Submit and track material requests for Test Cycle 049-A.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-4 shadow-panel">
              <h2 className="text-lg font-semibold">Create Request</h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {catalog.map((item) => {
                  const active = selected.some((entry) => entry.name === item.name);
                  return (
                    <button
                      key={item.name}
                      onClick={() => toggleItem(item)}
                      className={`border rounded-md p-3 text-left ${
                        active ? 'border-accent-500 bg-slate-800' : 'border-slate-800'
                      }`}
                    >
                      <div className="text-sm">{item.name}</div>
                      <div className="text-xs text-slate-500">Risk: {item.risk}</div>
                    </button>
                  );
                })}
              </div>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="mt-4 w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
                rows={3}
                placeholder="Add rationale or constraints for Director review."
              />
              <div className="mt-3 text-sm text-slate-400">Estimated Cost: ${estimatedCost.toLocaleString()}</div>
              <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-accent-600 text-slate-900 rounded-md text-sm font-semibold"
              >
                Submit Request
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-4 shadow-panel">
              <h2 className="text-lg font-semibold">Requests</h2>
              <div className="mt-4 space-y-3">
                {state.procurement.map((request) => (
                  <div key={request.id} className="border border-slate-800 rounded-lg p-3">
                    <div className="text-xs text-slate-500">{request.id}</div>
                    <div className="text-sm">{request.items.map((item) => item.name).join(', ')}</div>
                    <div className="text-xs text-slate-400 mt-1">Status: {request.status}</div>
                    {request.status === 'submitted' && (
                      <button
                        onClick={() => handleApprove(request)}
                        className="mt-2 text-xs px-3 py-1 border border-accent-500 rounded-md text-accent-400"
                      >
                        Director Approve
                      </button>
                    )}
                    {request.status === 'delivering' && (
                      <button
                        onClick={() => handleDeliver(request)}
                        className="mt-2 text-xs px-3 py-1 border border-slate-700 rounded-md"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                ))}
                {state.procurement.length === 0 && <div className="text-sm text-slate-500">No requests logged.</div>}
              </div>
            </div>
            <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-4 shadow-panel">
              <h2 className="text-lg font-semibold">Budget Guardrails</h2>
              <ul className="mt-3 text-xs text-slate-400 space-y-2 list-disc list-inside">
                <li>Restricted items require Director approval and extended delivery buffer.</li>
                <li>Ethics Attention above 60 increases review time.</li>
                <li>Excessive spend reduces readiness temporarily.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
