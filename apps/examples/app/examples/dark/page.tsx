'use client'

import { useKmenu } from 'kmenu'
import Nested from '../../../examples/Nested'
import { useEffect, useState } from 'react'
import './dark.css'

export default () => {
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
