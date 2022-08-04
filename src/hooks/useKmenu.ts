import { Dispatch, SetStateAction, useCallback, useContext } from 'react'
import { MenuContext } from '../menuProvider'

export const useKmenu = (): [
  string,
  number,
  () => void,
  Dispatch<SetStateAction<number>>
] => {
  const context = useContext(MenuContext)

  if (!context)
    throw new Error('useKmenu must be called inside the MenuProvider')

  const toggle = useCallback(() => {
    context.setOpen((open: number) => (open === 0 ? 1 : 0))
  }, [])

  return [context.query, context.open, toggle, context.setOpen]
}
