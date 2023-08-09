import React, { FC, ReactNode, useContext, useEffect } from 'react'
import { useShortcut } from './hooks/useShortcut'
import { MenuContext } from './MenuProvider'
import { ActionType, MenuProps, SortedCommands } from './types'
import Command from './Command'
import { motion } from 'framer-motion'

/**
 * The main command menu component.
 *
 * @param {number} index - The hierarchial index of this palette
 * @param {CommandWithIndex[]} commands - The SORTED commands which will be displayed in this palette
 * @param {boolean} main - Whether this is the first command menu the user will see on toggle
 * @type {React.FC<MenuProps>}
 * @returns {React.ReactElement} the menu provider
 */
export const CommandMenu: FC<MenuProps> = (props) => {
  const { config, results, state, dispatch } = useContext(MenuContext)

  return (
    <Wrapper {...props}>
      {typeof props.loadingPlaceholder !== 'undefined' && props.loadingState
        ? props.loadingPlaceholder
        : results?.commands.map((category, index) => (
            <div key={index}>
              {category.commands.length > 0 && (
                <p
                  className='category_header'
                  style={{
                    color: config?.headingColor || '#828282'
                  }}
                >
                  {category.category}
                </p>
              )}
              {category.commands.map((command, index) => (
                <Command
                  onMouseEnter={() =>
                    dispatch({
                      type: ActionType.CUSTOM,
                      custom: command.globalIndex
                    })
                  }
                  isSelected={state.selected === command.globalIndex}
                  command={command}
                  key={index}
                />
              ))}
            </div>
          ))}
    </Wrapper>
  )
}

const Wrapper: FC<MenuProps & { children: ReactNode }> = (props) => {
  const {
    open,
    query,
    setQuery,
    setPlaceholder,
    results,
    setResults,
    dispatch,
    dimensions,
    setCrumbs,
    input
  } = useContext(MenuContext)

  useEffect(() => {
    if (open === props.index)
      setPlaceholder(
        typeof props.placeholder === 'string'
          ? props.placeholder
          : 'What do you need?'
      )
  }, [open])

  useEffect(() => {
    if (open !== props.index) return

    dispatch({ type: ActionType.RESET, custom: 0 })

    if (!query || props.preventSearch) {
      if (!query) input.current!.value = ''
      setCrumbs(props.crumbs)
      return setResults(props.commands)
    }

    let index = 0
    const sorted: SortedCommands[] = []

    props.commands.commands.forEach((row) => {
      const results: SortedCommands = {
        category: row.category,
        commands: []
      }

      row.commands.forEach((command) => {
        const text =
          command.text.toLowerCase() + command.keywords?.toLowerCase()
        if (text.includes(query.toLowerCase())) {
          results.commands.push({ ...command, globalIndex: index })
          index++
        }
      })

      row.subCommands?.forEach((command) => {
        const text =
          command.text.toLowerCase() + command.keywords?.toLowerCase()
        if (text.includes(query.toLowerCase())) {
          results.commands.push({ ...command, globalIndex: index })
          index++
        }
      })

      if (results.commands.length > 0) sorted.push(results)
    })

    return setResults({
      index: index,
      commands: sorted,
      initialHeight: props.commands.initialHeight
    })
  }, [query, setQuery, open, props.loadingState])

  const upHandler = () => dispatch({ type: ActionType.DECREASE, custom: 0 })
  const downHandler = () => dispatch({ type: ActionType.INCREASE, custom: 0 })

  useShortcut({ targetKey: 'ArrowUp', handler: upHandler })
  useShortcut({ targetKey: 'ArrowDown', handler: downHandler })

  if (open !== props.index || typeof results?.index === 'undefined') return null

  return (
    <motion.div
      className='command_wrapper'
      role='listbox'
      style={{
        overflowY: results!.index >= 5 ? 'auto' : 'hidden',
        height:
          results!.index >= 5
            ? results?.initialHeight
            : props.loadingState
            ? 'auto'
            : results!.commands.length * (dimensions?.sectionHeight || 31) +
              results!.index * (dimensions?.commandHeight || 54)
      }}
    >
      {props.children}
    </motion.div>
  )
}
