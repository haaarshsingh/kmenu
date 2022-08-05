import { Config } from './types'

/* Export our main command menu component */
export { CommandMenu } from './CommandMenu'
/* Export components from other files so the user can import it directly from kmenu */
/* Optional configuration options the user passes onto the menu */
export type MenuConfig = Partial<Config>
/* Types for declaring commands and types for the menu */
export { Command, MenuProps } from './types'
/* Hook for defining custom shortcuts */
export { useShortcut } from './hooks/useShortcut'
/* The hook for declaring and setting dynamic commands on the menu */
export { useCommands } from './hooks/useCommands'
/* The hook with utilities for using the menu */
export { useKmenu } from './hooks/useKmenu'
/* The MenuProvider which the menu must be wrapped under */
export { MenuProvider } from './menuProvider'
