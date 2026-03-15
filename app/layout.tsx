import type { Metadata } from 'next';
import { mikadan } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Radio Indica',
  description: 'Radio Indica — curated sound from South Asia and its diaspora.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mikadan.className}>{children}</body>
    </html>
  );
}
