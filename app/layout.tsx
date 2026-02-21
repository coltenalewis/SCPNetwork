import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Colten Lewis | Roblox Systems Developer & Creative Producer',
  description:
    'Portfolio for Colten Lewis (Valkorianous), showcasing Roblox systems development, creative production, and technical execution.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="space-bg" aria-hidden="true">
          <div className="orb orb-cyan" />
          <div className="orb orb-orange" />
          <div className="orb orb-violet" />
          <div className="floating-shape shape-a" />
          <div className="floating-shape shape-b" />
          <div className="floating-shape shape-c" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
