import { Config } from './types'
import './styles/index.css'

export { CommandMenu } from './CommandMenu'
export { CommandWrapper } from './CommandWrapper'
export type MenuConfig = Partial<Config>

export { Command, MenuProps } from './types'
export { useShortcut } from './hooks/useShortcut'
export { useCommands } from './hooks/useCommands'
export { useKmenu } from './hooks/useKmenu'
export { MenuProvider } from './MenuProvider'
