'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Onboarding } from './Onboarding';

const navItems = [
  { href: '/facility', label: 'Facility' },
  { href: '/personnel', label: 'Personnel' },
  { href: '/scps', label: 'SCPs' },
  { href: '/documents', label: 'Documents' },
  { href: '/operations', label: 'Operations' },
  { href: '/settings', label: 'Settings' }
];

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { state, unreadNotifications } = useStore();

  if (!state.player) {
    return <Onboarding />;
  }

  const { clock, facility, player, testSession } = state;

  return (
    <div className="min-h-screen flex text-slate-100">
      <aside className="w-52 bg-slateCore-900 border-r border-slate-800 flex flex-col gap-4 p-4">
        <div className="text-xs uppercase tracking-[0.3em] text-slate-400">Facility Console</div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm flex items-center justify-between transition ${
                  active ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {item.label === 'Documents' && state.documents.length > 1 ? (
                  <span className="text-[10px] bg-slate-600 px-2 py-0.5 rounded-full">{state.documents.length}</span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto text-xs text-slate-500">Logged in as {player.firstName} {player.lastName}</div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="border-b border-slate-800 bg-slateCore-900/90 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 text-xs text-slate-300">
            <div>Day {clock.day} • {String(clock.hour).padStart(2, '0')}:{String(clock.minute).padStart(2, '0')}</div>
            <div className="px-2 py-1 rounded bg-slate-800 text-accent-400">Clearance L{player.clearanceLevel}</div>
            <div>Test Budget: ${testSession.budgetRemaining.toLocaleString()}</div>
            <div>Readiness: {facility.readiness}%</div>
            <div>Security: {facility.securityAvailable}</div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <div className="relative">
              <span className="text-slate-300">Notifications</span>
              {unreadNotifications > 0 && (
                <span className="absolute -top-2 -right-3 text-[10px] bg-danger-500 text-white rounded-full px-1.5">
                  {unreadNotifications}
                </span>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-hidden bg-slateCore-950 scanlines">
          {children}
        </main>
      </div>
    </div>
  );
};
