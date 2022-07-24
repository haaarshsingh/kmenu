import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
  useCallback
} from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import type { Dispatch, FC, Reducer, SetStateAction } from 'react'
import { useShortcut } from './hooks/useShortcut'
import filter from './utils/filter'
import {
  ActionType,
  Action,
  State,
  Config,
  Command as CommandType
} from './types'
import styles from './styles/palette.module.css'
import useClickOutside from './hooks/useClickOutside'

const initialState = { selected: 0 }
export type PaletteConfig = Partial<Config>

const Kmenu: FC<{
  open: number
  setOpen: Dispatch<SetStateAction<number>>
  index: number
  commands: CommandType[]
  main?: boolean
  config?: PaletteConfig
}> = ({ open, setOpen, index, commands, main, config }) => {
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(filter(commands, query))

  useEffect(() => {
    setResults(filter(commands, query))
    state.selected = 0
  }, [query, setQuery])

  const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      case ActionType.INCREASE:
        return state.selected === results!.length - 1
          ? { ...state, selected: 0 }
          : { ...state, selected: state.selected + 1 }
      case ActionType.DECREASE:
        return state.selected === 0
          ? { ...state, selected: results!.length - 1 }
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
  const tab = useShortcut('Tab')
  const reverseTab = useShortcut('Tab', 'shift')

  useClickOutside(paletteRef, () => setOpen(0))

  useEffect(() => {
    if (up || reverseTab) dispatch({ type: ActionType.DECREASE, custom: 0 })
    else if (down || tab) dispatch({ type: ActionType.INCREASE, custom: 0 })
  }, [up, down, tab, reverseTab])

  const toggle = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault()
      if (main) setOpen((open) => (open === index ? 0 : index))
      else if (!main && open === index) setOpen(0)
    }

    if (event.key === 'Escape') setOpen(0)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', toggle)
    return () => window.removeEventListener('keydown', toggle)
  }, [])

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
              placeholder='Type to search...'
              className={styles.search}
              autoFocus
              ref={input}
              onChange={() => setQuery(input.current?.value!)}
              style={{ color: config?.inputColor }}
            />
            <div className={styles.wrapper} ref={parentRef}>
              <AnimateSharedLayout>
                {results!.length <= 0 ? (
                  <motion.div
                    className={styles.no_results}
                    initial={{ y: -40 }}
                    animate={{ y: 0 }}
                  >
                    <h1>Nothing to see here...</h1>
                    <p className={styles.description}>
                      Make sure to double-check your spelling
                    </p>
                  </motion.div>
                ) : (
                  results?.map((command, index) => (
                    <Command
                      onMouseEnter={() =>
                        dispatch({ type: ActionType.CUSTOM, custom: index })
                      }
                      isSelected={state.selected === index}
                      command={command}
                      setOpen={setOpen}
                      config={config}
                      key={index}
                    />
                  ))
                )}
              </AnimateSharedLayout>
            </div>
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
  config?: Pick<
    PaletteConfig,
    'commandInactive' | 'commandActive' | 'barBackground' | 'barOpacity'
  >
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
            background: config?.barBackground,
            opacity: config?.barOpacity
          }}
        />
      )}
      {command.icon}
      <p className={styles.text}>{command.text}</p>
    </a>
  )
}

export { Command } from './types'
export { useShortcut } from './hooks/useShortcut'
export default Kmenu
