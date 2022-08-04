import React, { createContext, FC, ReactNode, useMemo, useState } from 'react'
import { Config, MenuContext as MenuContextType } from './types'

export const MenuContext = createContext<MenuContextType>({} as MenuContextType)

export const MenuProvider: FC<{
  children: ReactNode
  values?: {
    config?: Config
  }
}> = ({ children, values }) => {
  const [open, setOpen] = useState(0)
  const [query, setQuery] = useState('')

  const memorisedValues = useMemo(
    () => ({
      ...values,
      open,
      setOpen,
      query,
      setQuery
    }),
    [values, open, setOpen, query, setQuery]
  )

  return (
    <MenuContext.Provider value={memorisedValues}>
      {children}
    </MenuContext.Provider>
  )
}
