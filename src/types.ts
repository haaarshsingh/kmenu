import { Dispatch, ReactElement, SetStateAction } from 'react'

export type PaletteContext = {
  open: number
  setOpen: Dispatch<SetStateAction<number>>
  input?: string
  config?: Partial<Config>
}

export type PaletteProviderProps = {
  config?: Config
}

export type PaletteProps = {
  index: number
  commands: Readonly<CommandWithIndex>
  main?: boolean
}

export type UseKmenuProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<number>>
}

export type GlobalCommand = CategoryCommand & { globalIndex: number }

export type Command = {
  category: string
  commands: CategoryCommand[]
}

export type CommandWithIndex = {
  index: number
  initialHeight: number
  commands: SortedCommands[]
}

export type SortedCommands = {
  category: string
  commands: GlobalCommand[]
}

export type CategoryCommand = {
  icon?: ReactElement
  text: string
  perform?: () => void
  href?: string
  newTab?: boolean
  keywords?: string
  shortcuts?: Shortcut
}

export type Shortcut = {
  modifier?: 'shift' | 'ctrl' | 'alt' | 'meta'
  keys: string[]
}

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
