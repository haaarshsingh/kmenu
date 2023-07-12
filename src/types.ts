import {
  AnchorHTMLAttributes,
  Dispatch,
  FC,
  ReactElement,
  RefObject,
  SetStateAction
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
  setPlaceholder: Dispatch<SetStateAction<string>>
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
   * The menu configuration options to be passed down onto all menus
   */
  config?: Partial<Config>
  /**
   * Dimensions of individual elements in the menu
   */
  dimensions?: Partial<Dimensions>
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

export type MenuProviderProps = Pick<MenuContext, 'config' | 'dimensions'>

type Dimensions = {
  /**
   * Height of each section/category (px)
   */
  sectionHeight: number
  /**
   * Height of each command (px)
   */
  commandHeight: number
}

export type CommandWrapperProps = {
  /**
   * Default text in the input box
   */
  value?: string
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
export type GlobalCommand = CategoryCommand & { globalIndex: number }

export type Command = {
  /**
   * The category this command will display under
   */
  category: string
  /**
   * The commands this category will have
   */
  commands: CategoryCommand[]
  /**
   * Commands which are only visible by search
   */
  subCommands?: CategoryCommand[]
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

export type CategoryCommand = {
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
   * Keywords for the command that will make it show up when the user searches something
   */
  keywords?: string
  /**
   * Keyboard shortcuts which can trigger the command OUTSIDE the command menu
   *
   */
  shortcuts?: Shortcut
  /**
   * Whether or not to close this menu when the function is called
   */
  closeOnComplete?: boolean
  /**
   * Allow for custom HTML to be passed as the anchor property
   */
  anchor?: FC<NavLinkProps>
}

export type Shortcut = {
  /**
   * Key that will be used in conjunction with the shortcut
   */
  modifier?: 'shift' | 'ctrl' | 'alt' | 'meta'
  /**
   * The key(s) that will trigger the function
   */
  keys: [string, string?]
}

export type Config = {
  /**
   * The colour of the backdrop (include opacity)
   *
   * @default #FFFFFF20
   */
  backdropColor: string
  /**
   * The backround blur of the backdrop (px)
   *
   * @default 2px
   */
  backdropBlur: number
  /**
   * The background colour of the menu
   *
   * @default #FFFFFF
   */
  backgroundColor: string
  /**
   * The background colour of the breadcrumbs
   *
   * @default #EFEFEF
   */
  breadcrumbColor: string
  /**
   * The border radius of the breadcrumbs
   *
   * @default 5px
   */
  breadcrumbRadius: string
  /**
   * Width of the border surrounding the menu
   *
   * @default 1px
   */
  borderWidth: number
  /**
   * The colour of the border surrounding the menu
   *
   * @default #3F3F3F
   */
  borderColor: string
  /**
   * The colour of the border surrounding the menu
   *
   * @default 10px
   */
  borderRadius: number
  /**
   * The shadow of the menu
   *
   * @default 0px 0px 60px 10px #00000020
   */
  boxShadow: string
  /**
   * The colour of the text in the search bar
   *
   * @default #000000
   */
  inputColor: string
  /**
   * The colour of the border below the search bar
   *
   * @default #E9ECEF
   */
  inputBorder: string
  /**
   * The colour of the command category headings
   *
   * @default #777777
   */
  headingColor: string
  /**
   * The colour of the icon and text when the command is inactive
   *
   * @default #828282
   */
  commandInactive: string
  /**
   * The colour of the icon and text when the command is active
   *
   * @default #343434
   */
  commandActive: string
  /**
   * The background colour of the active bar (include opacity)
   *
   * @default #FFFFFF20
   */
  barBackground: string
  /**
   * The background colour of the keyboard shortcut
   *
   * @default #82828220
   */
  shortcutBackground: string
  /**
   * The animation duration of dialog transitions (seconds)
   *
   * @default 0.1
   */
  animationDuration: number
}

export type ParseProps = {
  command: CategoryCommand
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
  CUSTOM = 'CUSTOM'
}

export type Action = {
  type: ActionType
  custom: number
}

export type State = {
  selected: number
}
