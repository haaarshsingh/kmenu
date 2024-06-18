import {
  AnchorHTMLAttributes,
  Dispatch,
  FC,
  ReactElement,
  RefObject,
  SetStateAction,
} from 'react'

export type MenuContext = {
  /**
   * The index of which element is currently open
   */
  open: number
  /**
   * The setter to update the open state
   */
  setOpen: Dispatch<SetStateAction<number>>
  /**
   * The index of which element is currently open
   */
  lastOpen: number | undefined
  /**
   * The setter to update the open state
   */
  setLastOpen: Dispatch<SetStateAction<number | undefined>>
  /**
   * The results on the command menu
   */
  results: CommandWithIndex | null
  /**
   * The setter to update the results
   */
  setResults: Dispatch<SetStateAction<CommandWithIndex | null>>
  /**
   * The index of which element is currently open
   */
  placeholder: string | undefined
  /**
   * The setter to update the open state
   */
  setPlaceholder: Dispatch<SetStateAction<string | undefined>>
  /**
   * The text that is currently in the serch bar
   */
  query: string
  /**
   * The setter to update the text in the search bar
   */
  setQuery: Dispatch<SetStateAction<string>>
  /**
   * Animate the menu on change
   */
  crumbs: Array<string>
  /**
   * The setter to animate the menu
   */
  setCrumbs: Dispatch<SetStateAction<Array<string>>>
  /**
   * Animate the menu on change
   */
  animate: boolean
  /**
   * The setter to animate the menu
   */
  setAnimate: Dispatch<SetStateAction<boolean>>
  /**
   * Dimensions of individual elements in the menu
   */
  dimensions?: Dimensions
  /**
   * The state of the item selected
   */
  state: State
  /**
   * Dispatch to change the state of the item selected
   */
  dispatch: Dispatch<Action>
  /**
   * Ref object for the
   */
  input: RefObject<HTMLInputElement>
}

export type MenuProviderProps = Pick<MenuContext, 'dimensions'>

export type Dimensions = {
  /**
   * Maximum amount of commands do display by default
   */
  commands?: number
  /**
   * Height of each section/category (px)
   */
  sectionHeight?: number
  /**
   * Height of each command (px)
   */
  commandHeight?: number
}

export type CommandWrapperProps = {
  /**
   * Default text in the input box
   */
  defaultValue?: string
}

export type MenuProps = {
  /**
   * The hierarchical index of the menu
   */
  index: number
  /**
   * Commands passed onto the menu
   */
  commands: CommandWithIndex
  /**
   * The current path of the command menu
   */
  crumbs: Array<string>
  /**
   * Placeholder text in the menu
   */
  placeholder?: string
  /**
   * Stop the menu from filtering results
   */
  preventSearch?: boolean
  /**
   * Element to be displayed while commands load
   */
  loadingPlaceholder?: ReactElement
  /**
   * Whether or not the data is currently loading
   */
  loadingState?: boolean
}

/* Command with an index used for keyboard navigation */
export type GlobalCommand = InnerCommand & { globalIndex: number }

export type Command = {
  /**
   * The category this command will display under
   */
  category: string
  /**
   * The commands this category will have
   */
  commands: InnerCommand[]
  /**
   * Commands which are only visible by search
   */
  subCommands?: InnerCommand[]
}

export type CommandWithIndex = {
  index: number
  initialHeight: number
  commands: SortedCommands[]
}

export type SortedCommands = {
  category: string
  commands: GlobalCommand[]
  subCommands?: GlobalCommand[]
}

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export type InnerCommand = {
  /**
   * Icon to be displayed next to the command text
   */
  icon?: ReactElement
  /**
   * The text displayed on the command
   */
  text: string
  /**
   * The action to be performed
   */
  perform?: () => void
  /**
   * The URL to be opened
   */
  href?: string
  /**
   * Whether or not that URL should open in a new tab
   */
  newTab?: boolean
  /**
   * Whether the menu should close after the action runs
   * @default false
   */
  closeOnComplete?: boolean
  /**
   * Keywords for the command that will make it show up when the user searches something
   */
  keywords?: string[]
  /**
   * Keyboard shortcuts which can trigger the command OUTSIDE the command menu
   *
   */
  shortcuts?: Shortcut
  /**
   * Determine whether or not the icon is a checkbox
   */
  checkbox?: Checkbox
  /**
   * Allow for custom HTML to be passed as the anchor property
   */
  anchor?: FC<NavLinkProps>
}

export type Checkbox = { checked: boolean }

export type Shortcut = {
  /**
   * Key that will be used in conjunction with the shortcut
   */
  modifier?: string | ReactElement
  /**
   * The key(s) that will trigger the function
   */
  keys: [string, string?]
}

export type ParseProps = {
  command: InnerCommand
  event: KeyboardEvent
  map: Array<string>
}

export type UseClickOutsideProps = {
  ref: RefObject<HTMLDivElement>
  handler?: () => void
}

export type UseCommandsProps = Command[]

export type UseInViewProps = {
  ref: RefObject<HTMLSpanElement>
}

export type UseKmenuReturnType = {
  input: string
  setInput: Dispatch<SetStateAction<string>>
  isOpen: () => boolean
  open: number
  setOpen: (index: number, preventAnimate?: boolean) => void
  lastOpen: number | undefined
  setLastOpen: Dispatch<SetStateAction<number | undefined>>
  toggle: () => void
}

export type UseShortcutProps = {
  /**
   * The key this shortcut is listening for
   */
  targetKey: string
  /**
   * Modifier that will be used in conjuntion with the target key
   */
  modifier?: 'shift' | 'ctrl' | 'alt' | 'meta'
  /**
   * Function to call when this is actually pressed
   */
  handler?: () => void
}

export enum ActionType {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  RESET = 'RESET',
  CUSTOM = 'CUSTOM',
}

export type Action = {
  type: ActionType
  custom: number
}

export type State = {
  selected: number
}
