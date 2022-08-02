import { CategoryCommand } from '../types'

export const run = (command: CategoryCommand) => {
  if (typeof command.perform !== 'undefined') return command.perform?.()
  else if (typeof command.href !== 'undefined')
    window.open(command.href, command.newTab ? '_blank' : '_self')
}

const parse = (
  command: CategoryCommand,
  event: KeyboardEvent,
  map: string[]
) => {
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
