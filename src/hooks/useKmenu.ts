import { useCallback, useContext } from 'react'
import { MenuContext } from '../menuProvider'
import { UseKmenuReturnType } from '../types'

/* Utilities for using kmenu */
export const useKmenu = (): UseKmenuReturnType => {
  /* Pull the information out of our Provider */
  const context = useContext(MenuContext)

  /* Throw an error if the Provider doesn't exist, or if this is called outside the provider */
  if (!context)
    throw new Error('useKmenu must be called inside the MenuProvider')

  /* Function for toggling the palette */
  const toggle = useCallback(() => {
    context.setOpen((open: number) => (open === 0 ? 1 : 0))
  }, [])

  /* Return the query, the index of the open palette, the toggle function and the setOpen hook */
  return [context.query, context.open, toggle, context.setOpen]
}
