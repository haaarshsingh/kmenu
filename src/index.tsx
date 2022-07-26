import React, { useEffect, useReducer, useRef, useState } from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import type { Dispatch, FC, Reducer, SetStateAction } from 'react'
import { useShortcut } from './hooks/useShortcut'
import {
  ActionType,
  Action,
  State,
  Config,
  Command as CommandType,
  PaletteProps,
  SortedCommands
} from './types'
import styles from './styles/palette.module.css'
import useClickOutside from './hooks/useClickOutside'

const initialState = { selected: 0 }
export type PaletteConfig = Partial<Config>

export const Palette: FC<PaletteProps> = ({
  open,
  setOpen,
  index,
  commands,
  categories,
  main,
  config
}) => {
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [sortedCommands, setSortedCommands] = useState<SortedCommands[]>([])
  const [results, setResults] = useState<SortedCommands[]>([])
  const [resultIndex, setResultIndex] = useState(0)

  useEffect(() => {
    state.selected = 0
    let index = 0

    if (!query) {
      const sortedCommandsArray: SortedCommands[] = []
      let index = 0

      // eslint-disable-next-line no-unused-expressions
      categories?.forEach((category) => {
        const f = commands.filter((command) => command.category === category)
        const sorted = f.map((command) => {
          index++
          return {
            ...command,
            globalIndex: index - 1
          }
        })

        sortedCommandsArray.push({ title: category, commands: sorted })
      })

      setResultIndex(index)
      setSortedCommands(sortedCommandsArray)
      return setResults(sortedCommandsArray)
    }

    const sorted: SortedCommands[] = []

    // eslint-disable-next-line no-unused-expressions
    sortedCommands.forEach((row) => {
      const results: SortedCommands = { title: row.title, commands: [] }
      row.commands.forEach((command) => {
        const text =
          command.text.toLowerCase() + command.keywords?.toLowerCase()
        if (text.includes(query.toLowerCase())) {
          results.commands.push({ ...command, globalIndex: index })
          index++
        }
      })
      sorted.push(results)
    })

    setResultIndex(index)
    setResults(sorted)
  }, [query, setQuery])

  const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      case ActionType.INCREASE:
        return state.selected === resultIndex - 1
          ? { ...state, selected: 0 }
          : { ...state, selected: state.selected + 1 }
      case ActionType.DECREASE:
        return state.selected === 0
          ? { ...state, selected: resultIndex - 1 }
          : { ...state, selected: state.selected - 1 }
      case ActionType.CUSTOM:
        return {
          ...state,
          selected: action.custom
        }
      case ActionType.RESET:
        return {
          ...state,
          selected: 0
        }
    }
  }

  const paletteRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: ActionType.RESET, custom: 0 })
    setQuery('')
  }, [open, setOpen])

  const up = useShortcut('ArrowUp')
  const down = useShortcut('ArrowDown')

  useClickOutside(paletteRef, () => setOpen(0))

  useEffect(() => {
    if (open === index) {
      if (up) dispatch({ type: ActionType.DECREASE, custom: 0 })
      else if (down) dispatch({ type: ActionType.INCREASE, custom: 0 })
    }
  }, [up, down])

  const toggle = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault()
      if (main) setOpen((open) => (open === index ? 0 : index))
      else if (!main && open === index) setOpen(0)
    }

    if (event.key === 'Escape') setOpen(0)

    if (open === index) {
      if (event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault()
        dispatch({ type: ActionType.INCREASE, custom: 0 })
      } else if (event.shiftKey && event.key === 'Tab') {
        event.preventDefault()
        dispatch({ type: ActionType.DECREASE, custom: 0 })
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', toggle)
    return () => window.removeEventListener('keydown', toggle)
  }, [open, setOpen])

  return (
    <AnimatePresence>
      {open === index && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            backgroundColor: config?.backdropColor,
            backdropFilter: `blur(${config?.backdropBlur}px)`
          }}
        >
          <motion.div
            className={styles.dialog}
            role='dialog'
            aria-modal='true'
            ref={paletteRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            style={{
              backgroundColor: config?.backgroundColor,
              border: `solid ${config?.borderColor}`,
              borderRadius: `${config?.borderRadius}px`,
              borderWidth: config?.borderWidth || 1
            }}
          >
            <input
              placeholder={config?.placeholderText || 'What do you need?'}
              className={styles.search}
              autoFocus
              ref={input}
              onChange={() => setQuery(input.current?.value!)}
              style={{ color: config?.inputColor }}
            />
            <motion.div
              className={styles.wrapper}
              ref={parentRef}
              style={{
                height:
                  resultIndex >= 5
                    ? config?.paletteMaxHeight || 340
                    : resultIndex > 1
                    ? resultIndex * 80
                    : 120
              }}
            >
              <AnimateSharedLayout>
                {results?.map((category, index) => (
                  <div key={index}>
                    {category.commands.length > 0 && (
                      <p
                        className={styles.title}
                        style={{ color: config?.headingColor }}
                      >
                        {category.title}
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
                        setOpen={setOpen}
                        config={config}
                        key={index}
                      />
                    ))}
                  </div>
                ))}
              </AnimateSharedLayout>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Command: FC<{
  command: CommandType
  onMouseEnter: () => void
  isSelected: boolean
  setOpen: Dispatch<SetStateAction<number>>
  config?: PaletteConfig
}> = ({ onMouseEnter, isSelected, command, setOpen, config }) => {
  const ref = useRef<HTMLAnchorElement>(null)
  const enter = useShortcut('Enter')

  useEffect(() => {
    if (isSelected)
      // eslint-disable-next-line
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })

    if (enter && isSelected) {
      setOpen(0)
      if (typeof command.perform !== 'undefined') return command.perform?.()
      else if (typeof command.href !== 'undefined') window.open(command.href)
    }
  }, [isSelected, enter])

  return (
    <a
      className={styles.command}
      onMouseEnter={onMouseEnter}
      style={{
        color: isSelected
          ? config?.commandActive || '#FFFFFF'
          : config?.commandInactive || '#777777'
      }}
      ref={ref}
      onClick={command.perform}
      href={command.href || '#'}
      target={command.newTab ? '_blank' : '_self'}
      rel='noreferrer'
    >
      {isSelected && (
        <motion.div
          layoutId='box'
          className={styles.selected}
          initial={false}
          transition={{
            type: 'spring',
            stiffness: 1000,
            damping: 70
          }}
          style={{
            background: config?.barBackground
          }}
        />
      )}
      {command.icon && command.icon}
      <p className={styles.text} style={{ marginLeft: command.icon ? 0 : 15 }}>
        {command.text}
      </p>
    </a>
  )
}

export { Command, PaletteProps } from './types'
export { useShortcut } from './hooks/useShortcut'
