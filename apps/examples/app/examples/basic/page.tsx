'use client'

import { useKmenu } from 'kmenu'
import Basic from '../../../examples/Basic'

export default () => {
  const { toggle } = useKmenu()

  return (
    <>
      <h1>Basic</h1>
      <button onClick={toggle}>Toggle Menu (⌘K)</button>
      <Basic />
    </>
  )
}
