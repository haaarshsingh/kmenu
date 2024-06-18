'use client'

import { useKmenu } from 'kmenu'
import Nested from '../../../examples/Nested'

export default () => {
  const { toggle } = useKmenu()

  return (
    <>
      <h1>Nested Menus</h1>
      <button onClick={toggle}>Toggle Menu (⌘K)</button>
      <Nested />
    </>
  )
}
