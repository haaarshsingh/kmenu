'use client'

import { MenuProvider } from 'kmenu'
import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import '../cmdk.css'

export default (({ children }) => (
  <MenuProvider
    dimensions={{ sectionHeight: 30, commandHeight: 50, commands: 6 }}
  >
    <Link href='/'>
      <FiArrowLeft /> Go Home
    </Link>
    <main>{children}</main>
  </MenuProvider>
)) as FC<{ children: ReactNode }>
