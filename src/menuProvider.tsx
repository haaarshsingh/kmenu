import React, { createContext, FC, ReactNode, useMemo, useState } from 'react'
import { Config, MenuContext as MenuContextType } from './types'

/* Create the Menu context object */
export const MenuContext = createContext<MenuContextType>({} as MenuContextType)

/* Create the wrapper for the Provider and other hooks */
export const MenuProvider: FC<{
  children: ReactNode
  /* Allow the user to pass in the configuration file to the other objects here */
  config?: Partial<Config>
}> = ({ children, config }) => {
  /* Hook for toggling the open/close state of the menu */
  const [open, setOpen] = useState(0)
  /* Hook for managing the search queries */
  const [query, setQuery] = useState('')

  /* Memorise all values in the provider using the useMemo hook */
  const memorisedValues = useMemo(
    () => ({
      config,
      open,
      setOpen,
      query,
      setQuery
    }),
    [config, open, setOpen, query, setQuery]
  )

  /* Pass down the provider and the children below this component */
  return (
    <MenuContext.Provider value={memorisedValues}>
      {children}
    </MenuContext.Provider>
  )
}
