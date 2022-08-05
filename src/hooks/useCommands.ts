import { useCallback, useState } from 'react'
import {
  Command,
  CommandWithIndex,
  GlobalCommand,
  SortedCommands,
  UseCommandsProps
} from '../types'

export const useCommands = (
  initialCommands: UseCommandsProps
): /* Return the sorted commands, and the setCommands function */ [
  CommandWithIndex,
  (commands: Command[]) => void
] => {
  /* Hook for the initial height of the command menu */
  const [height, setHeight] = useState<number>()
  /* Hook for the globalIndex of the command menu */
  const [index, setIndex] = useState<number>()
  /* Hook containing all of the sorted commands in the command menu */
  const [commands, setCommands] = useState<SortedCommands[]>(() => {
    /* Variables used for counting current categories, height, and the index */
    let currentCategories = 0
    let height = 0
    let index = 0
    /* Empty array that'll contain all of the sorted commands */
    const sorted: SortedCommands[] = []

    /* Loop through each category in the initial commands */
    // eslint-disable-next-line no-unused-expressions
    initialCommands?.forEach((category) => {
      currentCategories++
      /* Map each command onto the new array with a global index */
      const indexedCommands: GlobalCommand[] = category.commands.map(
        (command) => {
          index++
          /* Adjust the height of the menu accordingly with the current index and the current categories */
          if (index <= 5) height = currentCategories * 31 + index * 54
          /* Return the command with a global index */
          return {
            ...command,
            globalIndex: index - 1
          }
        }
      )

      /* Push the array onto the sorted array */
      sorted.push({
        category: category.category,
        commands: indexedCommands
      })
    })

    /* Assign the appropriate values to the hooks */
    setHeight(height)
    setIndex(index)

    /* Return the array of sorted commands onto the setCommands hook */
    return sorted
  })

  /* Return the commands with a global index and an initial height */
  return [
    { index: index!, commands: commands, initialHeight: height! },
    /* Basically the same thing as above, just within another function */
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
