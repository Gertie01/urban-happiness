import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Urban Happiness',
  description:
    'Share how happy you are in your city and discover urban happiness insights',
  keywords: ['happiness', 'urban', 'city', 'well-being', 'community'],
  authors: [{ name: 'Urban Happiness' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    type: 'website',
    url: 'https://urban-happiness.vercel.app',
    title: 'Urban Happiness',
    description:
      'Share how happy you are in your city and discover urban happiness insights',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-gradient-to-b from-blue-50 to-green-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
