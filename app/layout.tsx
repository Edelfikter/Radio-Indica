import type { Metadata } from 'next';
import './globals.css';
import { StationProvider } from '@/context/StationContext';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StationProvider>{children}</StationProvider>
      </body>
    </html>
  );
}
