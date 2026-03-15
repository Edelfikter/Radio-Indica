'use client';

import { Libre_Caslon_Text } from 'next/font/google';
import './globals.css';

const libreCaslonText = Libre_Caslon_Text({
  subsets: ['latin'],
  weights: ['400', '700'],
});

export const metadata = {
  title: 'Radio Indica',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={libreCaslonText.className}>{children}</body>
    </html>
  );
}
