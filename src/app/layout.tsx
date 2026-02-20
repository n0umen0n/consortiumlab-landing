import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Consortium Factory — Building Business Structures for the AI & Crypto Age',
  description: 'Building business structures for the AI and crypto age. AI agents guiding you through every step of building a successful business.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Consortium Factory',
    description: 'Building business structures for the AI and crypto age.',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Consortium Factory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consortium Factory',
    description: 'Building business structures for the AI and crypto age.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Cabin:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="noise-bg">
        {children}
      </body>
    </html>
  )
}
