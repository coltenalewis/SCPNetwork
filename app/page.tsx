'use client';

import { useEffect, useState } from 'react';
import { AIIntegrationSection, AboutSection, Capabilities, FeaturedProjects, Hero, WorkHistoryPreview } from '@/components/PortfolioSections';
import { EntryVault } from '@/components/EntryVault';

const STORAGE_KEY = 'cocodev-entered';

export default function HomePage() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') setEntered(true);
  }, []);

  const onEnter = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setEntered(true);
  };

  return (
    <main className="relative">
      {!entered && <EntryVault onEnter={onEnter} />}
      <Hero />
      <WorkHistoryPreview />
      <FeaturedProjects />
      <Capabilities />
      <AIIntegrationSection />
      <AboutSection />
    </main>
  );
}
