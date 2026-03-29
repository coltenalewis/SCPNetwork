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
        <div className="page-bg" aria-hidden="true" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
