'use client';

import { motion } from 'framer-motion';

export function EntryVault({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#04060f]/95">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.22),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.22),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_5px] opacity-20" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-cyan-100/70">COCODEV // Secure Vault</p>
        <div className="relative grid h-80 w-80 place-items-center">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} className="absolute inset-0 rounded-full border border-cyan-300/40" />
          <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 13, ease: 'linear' }} className="absolute inset-6 rounded-full border border-orange-300/40" />
          <motion.div
            animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 20px rgba(56,189,248,0.3)', '0 0 42px rgba(251,146,60,0.38)', '0 0 20px rgba(56,189,248,0.3)'] }}
            transition={{ repeat: Infinity, duration: 2.6 }}
            className="absolute inset-12 rounded-full border border-white/50 bg-black/40"
          />
          <button
            onClick={onEnter}
            className="relative rounded-full border border-white/50 bg-white/10 px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur transition hover:scale-105 hover:bg-white/20"
          >
            Click to Enter
          </button>
        </div>
        <p className="mt-4 text-center text-sm tracking-[0.18em] text-slate-300">Animated vault interface engaged. Proceed to portfolio feed.</p>
      </motion.div>
    </div>
  );
}
