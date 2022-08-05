import { CategoryCommand } from '../types'

const run = (command: CategoryCommand) => {
  if (typeof command.perform !== 'undefined') return command.perform?.()
  else if (typeof command.href !== 'undefined')
    window.open(command.href, command.newTab ? '_blank' : '_self')
}

export default run
