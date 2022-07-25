import { Dispatch, ReactElement, SetStateAction } from 'react'

export type KmenuProps = {
  open: number
  setOpen: Dispatch<SetStateAction<number>>
  index: number
  commands: Command[]
  categories?: Array<string>
  main?: boolean
  config?: Config
}

export type SortedCommands = {
  title: string
  commands: GlobalCommand[]
}

type GlobalCommand = Command & { globalIndex: number }

export type Command = {
  icon: ReactElement
  text: string
  perform?: () => void
  href?: string
  newTab?: boolean
  keywords?: string
  category?: string
}

export type Config = {
  backdropColor: string
  backdropBlur: number
  backgroundColor: string
  borderWidth: number
  borderColor: string
  borderRadius: number
  inputColor: string
  commandInactive: string
  commandActive: string
  barBackground: string
  barOpacity: number
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
