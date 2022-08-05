import { Dispatch, ReactElement, RefObject, SetStateAction } from 'react'

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
  /* Whether or not to close this menu when the functino is called */
  closeOnComplete?: boolean
}

export type Shortcut = {
  /* Key that will be used in conjunction with the shortcut */
  /* NOTE: Some operating systems don't recognise the meta key. On macOS it's the 'cmd' key */
  modifier?: 'shift' | 'ctrl' | 'alt' | 'meta'
  /* The key(s) which triggers the function */
  keys: [string, string?]
}

/* Configuration options for the menu */
export type Config = {
  /* The colour of the backdrop */
  /* Default: #FFFFFF20 */
  backdropColor: string
  /* The blurring behind the backdrop element */
  /* Default: 2px */
  backdropBlur: number
  /* Background colour of the dialog */
  /* Default: #FFFFFF */
  backgroundColor: string
  /* Border width on the dialog */
  /* Default: 0px */
  borderWidth: number
  /* The colour of the border on the dialog */
  /* Default: transparent */
  borderColor: string
  /* The border radius of the dialog */
  /* Default: 12px */
  borderRadius: number
  /* The shadow on the dialog */
  /* Default: 0px 0px 60px 10px #00000020 */
  boxShadow: string
  /* The colour of the text in the search bar */
  /* Default: #000000 */
  inputColor: string
  /* The colour of the border below the input text */
  /* Default: #E9CEF */
  inputBorder: string
  /* The placeholder text on the search bar */
  /* Default: 'What do you need?' */
  placeholderText: string
  /* The colour of the category headings on the menu */
  /* Default: #828282 */
  headingColor: string
  /* The colour of the command icon and text when the command is inactive */
  /* Default: #828282 */
  commandInactive: string
  /* The colour of the command icon and text when the command is active */
  /* Default: #343434 */
  commandActive: string
  /* The colour of the bar which hovers the selected item */
  /* Default: #82828220 */
  barBackground: string
  /* The colour of background of the keyboard shortcut next to the element */
  /* Default: #82828220 */
  shortcutBackground: string
}

/* Props for the parse function to parse command shortcuts */
export type ParseProps = {
  /* The command which defined this shortcut */
  command: CategoryCommand
  /* Keyboard event object to get the user interaction with the keyboard */
  event: KeyboardEvent
  /* A character map containing the characters the user has pressed for double key commands */
  map: string[]
}

/* Types for the useClickOutside hook */
export type UseClickOutsideProps = {
  /* The click boundary */
  ref: RefObject<HTMLDivElement>
  /* What happens when the user clicks outside */
  handler: () => void
}

/* Types for the useCommands hook */
export type UseCommandsProps =
  /* The initial set of commands on the menu */
  Command[]

/* Types for the useInView hook */
export type UseInViewProps = {
  /* The ref that we'll be checking */
  ref: RefObject<HTMLSpanElement>
}

/* Return type of the useKmenu hook */
export type UseKmenuReturnType = [
  /* The input text */
  string,
  /* The setter function for the input text */
  Dispatch<SetStateAction<string>>,
  /* The index of the menu that's currently open */
  number,
  /* The toggle function */
  () => void,
  /* The setter function for opening different menus */
  Dispatch<SetStateAction<number>>
]

/* Types for the useShortcut hook */
export type UseShortcutProps = {
  /* The target key this hook is listening for */
  targetKey: string
  /* Modifier that will be used in conjuntion with the target key */
  modifier?: 'shift' | 'ctrl' | 'alt' | 'meta'
  /* Function to call when this is actually pressed */
  handler?: () => void
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
