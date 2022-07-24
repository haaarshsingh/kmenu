import type { Command } from '../index'

const filter = (commands: Command[] | undefined, query: string) => {
  if (!query) return commands

  return commands?.filter((command: Pick<Command, 'text' | 'keywords'>) => {
    const text = command.text.toLowerCase() + command.keywords?.toLowerCase()
    return text.includes(query.toLowerCase())
  })
}

export default filter
