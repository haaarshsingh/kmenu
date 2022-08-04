import { useCallback, useState } from 'react'
import {
  Command,
  CommandWithIndex,
  GlobalCommand,
  SortedCommands
} from '../types'

export const useCommands = (
  initialCommands?: Command[]
): [CommandWithIndex, (commands: Command[]) => void] => {
  const [height, setHeight] = useState<number>()
  const [index, setIndex] = useState<number>()
  const [commands, setCommands] = useState<SortedCommands[]>(() => {
    let currentCategories = 0
    let height = 0
    let index = 0
    const sorted: SortedCommands[] = []

    // eslint-disable-next-line no-unused-expressions
    initialCommands?.forEach((category) => {
      currentCategories++
      const indexedCommands: GlobalCommand[] = category.commands.map(
        (command) => {
          index++
          if (index <= 5) height = currentCategories * 31 + index * 54
          return {
            ...command,
            globalIndex: index - 1
          }
        }
      )

      sorted.push({
        category: category.category,
        commands: indexedCommands
      })
    })

    setHeight(height)
    setIndex(index)
    return sorted
  })

  return [
    { index: index!, commands: commands, initialHeight: height! },
    useCallback(
      (cmds: Command[]) => {
        let currentCategories = 0
        let height = 0
        let index = 0

        setCommands(() => {
          const sorted: SortedCommands[] = []

          // eslint-disable-next-line no-unused-expressions
          cmds.forEach((category) => {
            currentCategories++
            const indexedCommands: GlobalCommand[] = category.commands.map(
              (command) => {
                index++
                if (index <= 5) height = currentCategories * 31 + index * 54
                return {
                  ...command,
                  globalIndex: index - 1
                }
              }
            )

            sorted.push({
              category: category.category,
              commands: indexedCommands
            })
          })

          setHeight(height)
          setIndex(index)
          return sorted
        })
      },
      [commands]
    )
  ]
}
