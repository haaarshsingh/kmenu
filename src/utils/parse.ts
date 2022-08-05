import { ParseProps } from '../types'
import run from './run'

const parse = ({ command, event, map }: ParseProps) => {
  map.push(event.key)
  setTimeout(() => map.splice(0, map.length), 1000)

  if (typeof command.shortcuts?.modifier === 'string') {
    if (
      command.shortcuts.modifier === 'ctrl' &&
      event.ctrlKey &&
      event.key === command.shortcuts.keys[0]
    ) {
      event.preventDefault()
      run(command)
    } else if (
      command.shortcuts.modifier === 'alt' &&
      event.altKey &&
      event.key === command.shortcuts.keys[0]
    ) {
      event.preventDefault()
      return run(command)
    } else if (
      command.shortcuts.modifier === 'shift' &&
      event.key === command.shortcuts.keys[0].toUpperCase()
    ) {
      event.preventDefault()
      return run(command)
    } else if (
      command.shortcuts.modifier === 'meta' &&
      event.metaKey &&
      event.key === command.shortcuts.keys[0]
    ) {
      event.preventDefault()
      return run(command)
    }
  } else if (command.shortcuts?.keys.length === 2) {
    const last = map.slice(-2)
    if (
      last[0] === command.shortcuts.keys[0] &&
      last[1] === command.shortcuts.keys[1]
    )
      return run(command)
  } else if (
    command.shortcuts?.keys.length === 1 &&
    event.key === command.shortcuts.keys[0]
  )
    run(command)
}

export default parse
