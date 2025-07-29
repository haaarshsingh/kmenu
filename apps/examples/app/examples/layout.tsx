'use client'

import { MenuProvider } from 'kmenu'
import Link from 'next/link'
import { ReactNode } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import '../cmdk.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MenuProvider
      dimensions={{ sectionHeight: 30, commandHeight: 50, commands: 6 }}
    >
      <Link href='/'>
        <FiArrowLeft /> Go Home
      </Link>
      <main>{children}</main>
    </MenuProvider>
  )
}
