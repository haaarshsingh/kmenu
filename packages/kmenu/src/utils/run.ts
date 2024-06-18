import { InnerCommand } from '../types'

export default (command: InnerCommand) => {
  if (command.perform) command.perform?.()
  else if (command.href)
    window.open(command.href, command.newTab ? '_blank' : '_self')
}
