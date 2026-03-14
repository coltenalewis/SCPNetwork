'use client';

import { useEffect, useState } from 'react';
import { AIIntegrationSection, AboutSection, Capabilities, FeaturedProjects, Hero, WorkHistoryPreview } from '@/components/PortfolioSections';
import { EntryVault } from '@/components/EntryVault';
import { MouseReveal } from '@/components/MouseReveal';

const STORAGE_KEY = 'cocodev-entered';
const OATH_COVER = '/api/roblox-thumbnail?target=' + encodeURIComponent('https://www.roblox.com/games/110814051639689/Oath-of-Office-Political-Simulator');

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
      <MouseReveal imageUrl={OATH_COVER} className="min-h-[70vh]">
        <Hero />
      </MouseReveal>
      <WorkHistoryPreview />
      <FeaturedProjects />
      <Capabilities />
      <AIIntegrationSection />
      <AboutSection />
    </main>
  );
}
