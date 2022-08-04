import { CategoryCommand, ParseProps } from '../types'

/* Function used for running the command */
export const run = (command: CategoryCommand) => {
  /* If the command's perform is not undefined, run the command */
  if (typeof command.perform !== 'undefined') return command.perform?.()
  /* If the command's href is not undefined, then open a new window */ else if (
    typeof command.href !== 'undefined'
  )
    /* Ternary, just checking whether or not the command should open in a new tab or not */
    window.open(command.href, command.newTab ? '_blank' : '_self')
}

/* Function used for parsing a shortcut */
const parse = ({ command, event, map }: ParseProps) => {
  /* Push the key pressed onto the map array */
  map.push(event.key)
  /* Clear the map array every one second or thousand miliseconds */
  setTimeout(() => map.splice(0, map.length), 1000)

  /* Check if the command shortcuts have a modifier */
  if (typeof command.shortcuts?.modifier === 'string') {
    /* Add checks for all the different modifiers which check if the user had specified them and if they're actually being pressed along with the target key */
    if (
      command.shortcuts.modifier === 'ctrl' &&
      event.ctrlKey &&
      event.key === command.shortcuts.keys[0]
    ) {
      /* Prevent the default action */
      event.preventDefault()
      /* Throw the command in the run function and run it */
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
  } /* Check if the shortcut is a two-key shortcut */ else if (
    command.shortcuts?.keys.length === 2
  ) {
    /* Get the last two keys from the keymap array */
    const last = map.slice(-2)
    /* Check if the two keys are the same as the ones from the shortcut */
    if (
      last[0] === command.shortcuts.keys[0] &&
      last[1] === command.shortcuts.keys[1]
    )
      /* If they are, run the command */
      return run(command)
  } /* Check if the shortcut is just a single key. If it is, just run the command directly without any other checks */ else if (
    command.shortcuts?.keys.length === 1 &&
    event.key === command.shortcuts.keys[0]
  )
    run(command)
}

export default parse
