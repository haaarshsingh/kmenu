'use client'

import { useKmenu } from 'kmenu'
import Checkbox from '../../../examples/Checkbox'

export default () => {
  const { toggle } = useKmenu()

  return (
    <>
      <h1>Checkbox</h1>
      <button onClick={toggle}>Toggle Menu (⌘K)</button>
      <Checkbox />
    </>
  )
}
