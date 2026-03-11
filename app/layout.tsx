import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Urban Happiness',
  description: 'Your app description here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Add navigation or other shared components here */}
        {children}
        {/* Add footer or other shared components here */}
      </body>
    </html>
  )
}
