import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Consortium Factory — OpenClaw-native consortium MVP',
  description: 'Single-consortium MVP for Consortium Factory: OpenClaw-native work coordination, RESPECT visibility, and equity rails.',
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
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} noise-bg`}>
        {children}
      </body>
    </html>
  )
}
