import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Consortium Lab — Governance for the AI & Crypto Age',
  description: 'Designing organizational structures for tokenized communities. Researching, building, and deploying the governance layer the crypto ecosystem needs.',
  openGraph: {
    title: 'Consortium Lab',
    description: 'Building governance systems for the AI and crypto age.',
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
