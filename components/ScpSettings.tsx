'use client';

import { useMemo, useState } from 'react';
import { useStore } from '@/lib/store';
import { CharacterMetric, ScpProfileSettings } from '@/lib/types';

export const ScpSettings = () => {
  const { state, dispatch } = useStore();
  const [guide, setGuide] = useState(state.scpSettings.guide);
  const [metrics, setMetrics] = useState<CharacterMetric[]>(state.scpSettings.metrics);

  const canSave = useMemo(() => guide.trim().length > 0, [guide]);

  const updateMetric = (id: string, updates: Partial<CharacterMetric>) => {
    setMetrics((prev) => prev.map((metric) => (metric.id === id ? { ...metric, ...updates } : metric)));
  };

  const addMetric = () => {
    setMetrics((prev) => [
      ...prev,
      { id: `metric-${Date.now()}`, label: 'New Metric', value: 50 }
    ]);
  };

  const removeMetric = (id: string) => {
    setMetrics((prev) => prev.filter((metric) => metric.id !== id));
  };

  const handleSave = () => {
    const payload: ScpProfileSettings = {
      guide: guide.trim(),
      metrics
    };
    dispatch({ type: 'UPDATE_SCP_SETTINGS', payload });
  };

  return (
    <div className="bg-slateCore-900 border border-slate-800 rounded-xl p-6 shadow-panel space-y-4">
      <div>
        <h2 className="text-lg font-semibold">SCP-049 Character Settings</h2>
        <p className="text-sm text-slate-400">
          Update the roleplay guide and quantitative metrics used during chat.
        </p>
      </div>
      <label className="text-sm text-slate-300">
        Character Guide
        <textarea
          value={guide}
          onChange={(event) => setGuide(event.target.value)}
          className="mt-2 w-full min-h-[140px] bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
        />
      </label>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">Character Metrics</h3>
          <button
            onClick={addMetric}
            className="text-xs px-3 py-1 border border-slate-700 rounded-md text-slate-300"
          >
            Add Metric
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {metrics.map((metric) => (
            <div key={metric.id} className="flex items-center gap-3">
              <input
                value={metric.label}
                onChange={(event) => updateMetric(metric.id, { label: event.target.value })}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
              />
              <input
                type="number"
                value={metric.value}
                min={0}
                max={100}
                onChange={(event) => updateMetric(metric.id, { value: Number(event.target.value) })}
                className="w-20 bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm"
              />
              <button
                onClick={() => removeMetric(metric.id)}
                className="text-xs px-3 py-1 border border-danger-500 text-danger-500 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-accent-600 text-slate-900 rounded-md text-sm font-semibold"
          disabled={!canSave}
        >
          Save Settings
        </button>
        <span className="text-xs text-slate-500">Saved locally to your browser.</span>
      </div>
    </div>
  );
};
