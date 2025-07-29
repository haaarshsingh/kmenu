import './globals.css'

import type { Metadata } from 'next'
import { Fira_Code, Inter } from 'next/font/google'
import type { ReactNode } from 'react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter',
})
const fira = Fira_Code({
  subsets: ['latin'],
  weight: '300',
  variable: '--font-fira',
})

export const metadata: Metadata = {
  title: 'kmenu—examples',
  description: 'The perfect ⌘K menu ',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌈</text></svg>',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={`${inter.variable} ${fira.variable}`}>
      <body>{children}</body>
    </html>
  )
}
