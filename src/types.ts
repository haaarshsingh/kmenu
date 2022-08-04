import { Dispatch, ReactElement, SetStateAction } from 'react'

/* The props passed from the MenuProvider onto the index */
export type MenuContext = {
  /* Hooks that handle the open/close state of the component */
  open: number
  setOpen: Dispatch<SetStateAction<number>>
  /* Hooks that handle the search bar */
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  /* Menu configuration options to be passed onto all menus */
  config?: Partial<Config>
}

/* Props passed onto the MenuProvider */
export type MenuProviderProps = {
  /* Provide the config here to pass down onto all menus */
  config?: Config
}

export type MenuProps = {
  /* The hierarchical index of the menu */
  index: number
  /* Commands passed onto the menu */
  commands: CommandWithIndex
  /* Whether or not you want this menu to be the first displayed on toggle */
  main?: boolean
}

export type UseKmenuProps = {
  /* Which menu is currently open */
  open: boolean
  /* Open another menu */
  setOpen: Dispatch<SetStateAction<number>>
  /* The input in the search bar */
  input: string
}

/* Command with an index used for keyboard navigation */
export type GlobalCommand = CategoryCommand & { globalIndex: number }

export type Command = {
  /* The category this command will display under */
  category: string
  /* The commands this category will have */
  commands: CategoryCommand[]
}

/* This type is used for commands */
export type CommandWithIndex = {
  /* The index of all commands inside of the menu */
  index: number
  /* Initial height of the command menu */
  initialHeight: number
  /* The sorted commands in the menu */
  commands: SortedCommands[]
}

/* Type used for commands AFTER they've been sorted with a global index */
export type SortedCommands = {
  /* The category the commands belong to */
  category: string
  /* An array of sorted commands, all with an index */
  commands: GlobalCommand[]
}

export type CategoryCommand = {
  /* Icon to be displayed next to the command text */
  icon?: ReactElement
  /* The text displayed on the command */
  text: string
  /* The action to be performed */
  perform?: () => void
  /* The URL to be opened */
  href?: string
  /* Whether or not that URL should open in a new tab */
  newTab?: boolean
  /* Keywords for the command that will make it show up when the user searches something */
  keywords?: string
  /* Keyboard shortcuts which can trigger the command OUTSIDE the command menu */
  shortcuts?: Shortcut
}

/* */
export type Shortcut = {
  /* Key that will be used in conjunction with the shortcut */
  /* NOTE: Some operating systems don't recognise the meta key. On macOS it's the 'cmd' key */
  modifier?: 'shift' | 'ctrl' | 'alt' | 'meta'
  /* The key(s) which triggers the function */
  keys: [string, string?]
}

/* Configuration options for the menu */
export type Config = {
  paletteMaxHeight: number
  backdropColor: string
  backdropBlur: number
  backgroundColor: string
  borderWidth: number
  borderColor: string
  borderRadius: number
  inputColor: string
  placeholderText: string
  headingColor: string
  commandInactive: string
  commandActive: string
  barBackground: string
}

/* Type of actions one can perform on the menu */
export enum ActionType {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  RESET = 'RESET',
  CUSTOM = 'CUSTOM'
}

/* Action prop passed onto the useReducer for handling keyboard navigation */
export type Action = {
  type: ActionType
  custom: number
}

/* State prop passed onto the useReducer for handling keyboard navigation */
export type State = {
  selected: number
}
