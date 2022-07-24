import type { CommandType as Command } from '../index'

const filter = (commands: Command[] | undefined, query: string) => {
  if (!query) return commands

  return commands?.filter((command: Command) => {
    const cmdText = command.text.toLowerCase()
    return cmdText.includes(query.toLowerCase())
  })
}

export default filter
