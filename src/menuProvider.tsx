import React, { createContext, FC, useMemo, useState } from 'react'
import { MenuContext as MenuContextType, MenuProviderProps } from './types'

/* Create the Menu context object */
export const MenuContext = createContext<MenuContextType>({} as MenuContextType)

/* Create the wrapper for the Provider and other hooks */
export const MenuProvider: FC<MenuProviderProps> = ({
  children,
  dimensions,
  config
}) => {
  /* Hook for toggling the open/close state of the menu */
  const [open, setOpen] = useState(0)
  /* Hook for managing the search queries */
  const [query, setQuery] = useState('')

  /* Memorise all values in the provider using the useMemo hook */
  const memorisedValues = useMemo(
    () => ({
      query,
      setQuery,
      open,
      setOpen,
      config,
      dimensions
    }),
    [query, setQuery, open, setOpen, config, dimensions]
  )

  /* Pass down the provider and the children below this component */
  return (
    <MenuContext.Provider value={memorisedValues}>
      {children}
    </MenuContext.Provider>
  )
}
