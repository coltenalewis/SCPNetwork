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
        <div className="cafe-bg" aria-hidden="true">
          <div className="orb-cafe orb-gold" />
          <div className="orb-cafe orb-latte" />
          <div className="orb-cafe orb-espresso" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
