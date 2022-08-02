import { Dispatch, ReactElement, SetStateAction } from 'react'

export type PaletteContext = {
  open: number
  setOpen: (index: number) => void
  input: string
}

export type PaletteProviderProps = {
  config?: Config
}

export type PaletteProps = {
  open: number
  setOpen: Dispatch<SetStateAction<number>>
  index: number
  commands: Command[]
  main?: boolean
  config?: Partial<Config>
}

export type UseKmenuProps = {
  open: boolean
  setOpen: () => void
}

export type GlobalCommand = CategoryCommand & { globalIndex: number }

export type Command = {
  category: string
  commands: CategoryCommand[]
}

export type CommandResults = {
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
