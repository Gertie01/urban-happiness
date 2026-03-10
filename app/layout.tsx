import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gemini 2.0 Image Studio',
  description: 'Infinite image generation and editing with Gemini 2.0 Flash',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 text-neutral-100 min-h-screen">{children}</body>
    </html>
  );
}
