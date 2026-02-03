import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coco — Modular Roblox Systems',
  description:
    'Coco is a minimalist, café-styled Roblox systems studio with modular bases, plug-in modules, and customizations.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
