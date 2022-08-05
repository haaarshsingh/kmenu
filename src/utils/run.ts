import { CategoryCommand } from '../types'

/* Function used for running the command */
const run = (command: CategoryCommand) => {
  /* If the command's perform is not undefined, run the command */
  if (typeof command.perform !== 'undefined') return command.perform?.()
  /* If the command's href is not undefined, then open a new window */ else if (
    typeof command.href !== 'undefined'
  )
    /* Ternary, just checking whether or not the command should open in a new tab or not */
    window.open(command.href, command.newTab ? '_blank' : '_self')
}

export default run
