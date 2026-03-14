'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function EntryVault({ onEnter }: { onEnter: () => void }) {
  const [unlocking, setUnlocking] = useState(false);

  const handleEnter = () => {
    if (unlocking) return;
    setUnlocking(true);
    setTimeout(() => onEnter(), 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, #f6f0e6 0%, #e8dcc8 50%, #d4c4a8 100%)' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(173,140,82,0.15),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(92,74,50,0.1),transparent_50%)]" />
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 flex flex-col items-center">
        <p className="mb-2 font-display text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--cafe-muted)' }}>Colten Lewis</p>
        <p className="mb-6 text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--cafe-latte)' }}>Portfolio</p>
        <div className="relative grid h-72 w-72 place-items-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} className="vault-ring absolute inset-0" style={{ borderColor: 'rgba(173,140,82,0.3)' }} />
          <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 13, ease: 'linear' }} className="vault-ring absolute inset-6" style={{ borderColor: 'rgba(196,168,130,0.3)' }} />
          <motion.div
            animate={{ scale: [1, 1.06, 1], boxShadow: ['0 0 20px rgba(173,140,82,0.15)', '0 0 40px rgba(173,140,82,0.3)', '0 0 20px rgba(173,140,82,0.15)'] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute inset-12 rounded-full border bg-white/40"
            style={{ borderColor: 'rgba(173,140,82,0.25)' }}
          />
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="vault-ring absolute inset-16"
            style={{ borderColor: 'rgba(173,140,82,0.4)' }}
          />
          {!unlocking ? (
            <button onClick={handleEnter} className="btn-primary relative rounded-full px-10 py-4 text-sm uppercase tracking-[0.2em]">
              Enter
            </button>
          ) : (
            <div className="relative h-16 w-16">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }} className="absolute inset-0 rounded-full border-2 border-t-transparent" style={{ borderColor: 'rgba(173,140,82,0.6)', borderTopColor: 'transparent' }} />
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="absolute inset-2 rounded-full border-2 border-b-transparent" style={{ borderColor: 'rgba(196,168,130,0.6)', borderBottomColor: 'transparent' }} />
            </div>
          )}
        </div>
        <p className="mt-4 text-center text-sm tracking-[0.12em]" style={{ color: 'var(--cafe-muted)' }}>
          {unlocking ? 'Opening...' : 'Click to view portfolio'}
        </p>
      </motion.div>
    </div>
  );
}
