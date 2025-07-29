'use client'

import { useKmenu } from 'kmenu'
import Loading from '../../../examples/loading'

export default function Page() {
  const { toggle } = useKmenu()

  return (
    <>
      <h1>Awaiting Data</h1>
      <button onClick={toggle}>Toggle Menu (⌘K)</button>
      <Loading />
    </>
  )
}
