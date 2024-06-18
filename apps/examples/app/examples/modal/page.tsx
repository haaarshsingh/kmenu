'use client'

import { useKmenu } from 'kmenu'
import Modal from '../../../examples/Modal'

export default () => {
  const { toggle } = useKmenu()

  return (
    <>
      <h1>Modal</h1>
      <button onClick={toggle}>Open Modal</button>
      <Modal />
    </>
  )
}
