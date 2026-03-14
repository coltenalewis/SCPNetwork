'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function EntryVault({ onEnter }: { onEnter: () => void }) {
  const [unlocking, setUnlocking] = useState(false);

  const handleEnter = () => {
    if (unlocking) return;
    setUnlocking(true);
    setTimeout(() => onEnter(), 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 45%, rgba(201,169,110,0.06), transparent)' }} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <h1 className="font-display text-4xl" style={{ color: 'var(--ink)' }}>Colten Lewis</h1>
        <p className="mt-2 text-sm tracking-[0.18em]" style={{ color: 'var(--ink-mute)' }}>PORTFOLIO</p>

        <div className="mt-12 relative grid h-52 w-52 place-items-center">
          <motion.div
            animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid var(--accent-dim)' }}
          />
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
            className="absolute inset-[-12px] rounded-full"
            style={{ border: '1px solid var(--accent-dim)' }}
          />

          {!unlocking ? (
            <button
              onClick={handleEnter}
              className="btn-fill relative rounded-full px-10 py-4 text-sm tracking-[0.12em]"
            >
              Enter
            </button>
          ) : (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
              className="h-10 w-10 rounded-full border-2"
              style={{ borderColor: 'var(--accent-dim)', borderTopColor: 'transparent' }}
            />
          )}
        </div>

        <p className="mt-8 text-sm" style={{ color: 'var(--ink-mute)' }}>
          {unlocking ? 'Loading...' : 'Roblox Systems Developer & Creative Producer'}
        </p>
      </motion.div>
    </div>
  );
}
