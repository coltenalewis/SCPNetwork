'use client';

import Link from 'next/link';
import { AppShell } from '@/components/AppShell';
import { useStore } from '@/lib/store';

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-4 shadow-panel">
    <div className="text-xs text-slate-500 uppercase tracking-[0.3em]">{label}</div>
    <div className="text-2xl font-semibold mt-2">{value}</div>
  </div>
);

export default function FacilityPage() {
  const { state } = useStore();

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Facility Dashboard</h1>
          <p className="text-sm text-slate-400">Site-47 status overview and active assignment logs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <StatCard label="Readiness" value={`${state.facility.readiness}%`} />
          <StatCard label="Security Available" value={`${state.facility.securityAvailable}`} />
          <StatCard label="Research Staff" value={`${state.facility.staffAvailable}`} />
          <StatCard label="Ethics Attention" value={`${state.facility.ethicsAttention}%`} />
          <StatCard label="Incident Heat" value={`${state.facility.incidentHeat}%`} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-6 shadow-panel">
            <h2 className="text-lg font-semibold">Active Assignment</h2>
            <p className="text-sm text-slate-400 mt-2">Test Cycle 049-A • Phase: {state.testSession.phase}</p>
            <ul className="mt-4 text-sm text-slate-300 list-disc list-inside space-y-1">
              {state.testSession.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
            <div className="mt-4 flex gap-3">
              <Link href="/documents" className="px-4 py-2 bg-slate-800 rounded-md text-sm">
                Open Briefing
              </Link>
              <Link href="/personnel" className="px-4 py-2 border border-slate-700 rounded-md text-sm">
                Message Director
              </Link>
            </div>
          </div>
          <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-6 shadow-panel">
            <h2 className="text-lg font-semibold">Pending Approvals</h2>
            <div className="mt-3 text-sm text-slate-400">
              {state.procurement.filter((request) => request.status === 'submitted').length} requests awaiting director review.
            </div>
            <div className="mt-4 text-xs text-slate-500">Budget Remaining: ${state.testSession.budgetRemaining.toLocaleString()}</div>
            <Link href="/operations" className="mt-4 inline-block text-sm text-accent-400">
              Review procurement workflow →
            </Link>
          </div>
          <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-6 shadow-panel">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <div className="mt-3 space-y-3 text-sm text-slate-300">
              {state.notifications.slice(0, 4).map((notification) => (
                <div key={notification.id} className="border border-slate-800 rounded-md p-3">
                  <div className="text-xs text-slate-500">{notification.title}</div>
                  <div>{notification.detail}</div>
                </div>
              ))}
              {state.notifications.length === 0 && <div className="text-slate-500">No alerts pending.</div>}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
