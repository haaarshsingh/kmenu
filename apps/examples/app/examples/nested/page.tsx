'use client'

import { useKmenu } from 'kmenu'
import Nested from '../../../examples/nested'

export default function Page() {
  const { toggle } = useKmenu()

  return (
    <>
      <h1>Nested Menus</h1>
      <button onClick={toggle}>Toggle Menu (⌘K)</button>
      <Nested />
    </>
  )
}
