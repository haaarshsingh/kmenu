'use client'

import { useKmenu } from 'kmenu'
import { useEffect, useState } from 'react'
import Nested from '../../../examples/nested'
import './dark.css'

export default function Page() {
  const { toggle } = useKmenu()
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (dark) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
  }, [dark])

  return (
    <>
      <h1>Dark Mode</h1>
      <button onClick={toggle}>Toggle Menu (⌘K)</button>
      <Nested setDark={setDark} />
    </>
  )
}
