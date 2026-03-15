import type { Metadata } from 'next';
import { Libre_Caslon_Text } from 'next/font/google';
import './globals.css';

const libreCaslonText = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['400', '700'],
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
      <body className={libreCaslonText.className}>{children}</body>
    </html>
  );
}
