import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Consortium Factory — Building Business Structures for the AI & Crypto Age',
  description: 'Building business structures for the AI and crypto age. AI agents guiding you through every step of building a successful business.',
  openGraph: {
    title: 'Consortium Factory',
    description: 'Building business structures for the AI and crypto age.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="noise-bg">
        {children}
      </body>
    </html>
  )
}
