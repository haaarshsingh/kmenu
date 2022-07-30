import { Dispatch, ReactElement, SetStateAction } from 'react'

export type PaletteProps = {
  open: number
  setOpen: Dispatch<SetStateAction<number>>
  index: number
  commands: Command[]
  categories: string[]
  main?: boolean
  config?: Partial<Config>
}

export type SortedCommands = {
  title: string
  commands: GlobalCommand[]
}

export type GlobalCommand = Command & { globalIndex: number }

export type Command = {
  icon?: ReactElement
  text: string
  perform?: () => void
  href?: string
  newTab?: boolean
  keywords?: string
  shortcuts?: Shortcut
  category: string
}

export type Shortcut = {
  modifier?: 'shift' | 'ctrl' | 'alt'
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
