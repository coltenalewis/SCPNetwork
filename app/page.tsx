'use client';

import { useEffect, useState } from 'react';
import { AIIntegrationSection, AboutSection, Capabilities, FeaturedProjects, Hero, WorkHistoryPreview } from '@/components/PortfolioSections';
import { EntryVault } from '@/components/EntryVault';

const STORAGE_KEY = 'cocodev-entered';

export default function HomePage() {
  const [entered, setEntered] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') setEntered(true);
  }, []);

  const onEnter = () => {
    setEntering(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, 'true');
      setEntered(true);
      setEntering(false);
    }, 950);
  };

  return (
    <main className="relative">
      {!entered && <EntryVault onEnter={onEnter} entering={entering} />}
      <Hero />
      <WorkHistoryPreview />
      <FeaturedProjects />
      <Capabilities />
      <AIIntegrationSection />
      <AboutSection />
    </main>
  );
}
