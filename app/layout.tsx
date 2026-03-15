import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const mikadan = localFont({
  src: '../public/fonts/Mikadan-Regular.woff2',
  variable: '--font-mikadan',
  display: 'swap',
});

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
      <body className={`${mikadan.variable} font-mikadan`}>{children}</body>
    </html>
  );
}
