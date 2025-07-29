import { ParseProps } from '../types'
import run from './run'

const handleModifierShortcut = (command: any, event: KeyboardEvent) => {
  const { modifier, keys } = command.shortcuts
  const targetKey = keys[0]

  const modifierChecks = {
    ctrl: event.ctrlKey && event.key === targetKey,
    alt: event.altKey && event.key === targetKey,
    meta: event.metaKey && event.key === targetKey,
    shift: event.key === targetKey.toUpperCase(),
  }

  if (modifierChecks[modifier as keyof typeof modifierChecks]) {
    event.preventDefault()
    return run(command)
  }

  return false
}

const handleSequenceShortcut = (command: any, map: string[]) => {
  const { keys } = command.shortcuts

  if (keys.length === 2) {
    const last = map.slice(-2)
    if (last[0] === keys[0] && last[1] === keys[1]) {
      return run(command)
    }
  }

  return false
}

const handleSingleKeyShortcut = (command: any, event: KeyboardEvent) => {
  const { keys } = command.shortcuts

  if (keys.length === 1 && event.key === keys[0]) {
    return run(command)
  }

  return false
}

export const parse = ({ command, event, map }: ParseProps) => {
  map.push(event.key)
  setTimeout(() => map.splice(0, map.length), 1000)

  if (!command.shortcuts) return

  const { modifier, keys } = command.shortcuts

  if (typeof modifier === 'string') {
    return handleModifierShortcut(command, event)
  }

  if (keys.length === 2) {
    return handleSequenceShortcut(command, map)
  }

  if (keys.length === 1) {
    return handleSingleKeyShortcut(command, event)
  }
}
