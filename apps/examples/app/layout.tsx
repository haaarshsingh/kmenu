import './globals.css'

import type { FC, ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'

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
  description: '🌈 An animated and accessible command menu for React',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌈</text></svg>',
  },
}

export default (({ children }) => (
  <html lang='en' className={`${inter.variable} ${fira.variable}`}>
    <body>{children}</body>
  </html>
)) as FC<{ children: ReactNode }>
