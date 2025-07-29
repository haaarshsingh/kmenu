'use client'

import { useKmenu } from 'kmenu'
import Checkbox from '../../../examples/checkbox'

export default function Page() {
  const { toggle } = useKmenu()

  return (
    <>
      <h1>Checkbox</h1>
      <button onClick={toggle}>Toggle Menu (⌘K)</button>
      <Checkbox />
    </>
  )
}
