import React, { createContext, FC, ReactNode, useState } from 'react'
import { MenuContext as MenuContextType, MenuProviderProps } from './types'

export const MenuContext = createContext<MenuContextType>({} as MenuContextType)

/**
 * The provider component for kmenu.
 *
 * @param {Config} config - the configuration file to be passed down to all palettes
 * @param {Dimensions} dimensions - the dimensions
 * @type {React.FC<MenuProviderProps & { children: ReactNode }>}
 * @returns {React.ReactElement} the menu provider
 */
export const MenuProvider: FC<MenuProviderProps & { children: ReactNode }> = ({
  children,
  dimensions,
  config
}) => {
  const [open, setOpen] = useState(0)
  const [query, setQuery] = useState('')

  return (
    <MenuContext.Provider
      value={{
        query: query,
        setQuery: setQuery,
        open: open,
        setOpen: setOpen,
        config: config,
        dimensions: dimensions
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}
