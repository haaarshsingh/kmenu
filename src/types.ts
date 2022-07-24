import { ReactElement } from 'react'

export type Command = {
  icon: ReactElement
  text: string
  perform?: () => void
  href?: string
  keywords?: string
}

export type Colors = {
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
