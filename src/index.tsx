import React, {
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import type { Dispatch, FC, Reducer, SetStateAction } from 'react'
import { useShortcut } from './hooks/useShortcut'
import filter from './utils/filter'
import { ActionType, Action, State, Opacity } from './types'
import styles from './styles/palette.module.css'

const initialState = { selected: 0 }

export type CommandType = {
  icon: ReactElement
  text: string
  perform?: () => void
  href?: string
  keywords?: string
}

export type ColorConfig = {
  backdrop: string
  backdropOpacity: Opacity
  background: string
  border: string
  borderColor: string
  inputColor: string
  commandInactive: string
  commandActive: string
}

const Cmdk: FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  commands: CommandType[]
  colors?: Partial<ColorConfig>
}> = ({ open, setOpen, commands, colors }) => {
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

  useEffect(() => {
    if (up || reverseTab) dispatch({ type: ActionType.DECREASE, custom: 0 })
    else if (down || tab) dispatch({ type: ActionType.INCREASE, custom: 0 })
  }, [up, down, tab, reverseTab])

  const toggle = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault()
      setOpen((open) => !open)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', toggle)
    return () => window.removeEventListener('keydown', toggle)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            backgroundColor: colors?.backdrop,
            opacity: colors?.backdropOpacity
          }}
        >
          <motion.div
            className={styles.dialog}
            role='dialog'
            aria-modal='true'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            style={{
              backgroundColor: colors?.background,
              border: `${colors?.border} solid`,
              borderColor: colors?.borderColor
            }}
          >
            <input
              placeholder='Type to search...'
              className={styles.search}
              autoFocus
              ref={input}
              onChange={() => setQuery(input.current?.value!)}
              style={{ color: colors?.inputColor }}
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
  setOpen: Dispatch<SetStateAction<boolean>>
  colors?: Pick<ColorConfig, 'commandInactive' | 'commandActive'>
}> = ({ onMouseEnter, isSelected, command, setOpen }) => {
  const ref = useRef<HTMLDivElement>(null)
  const enter = useShortcut('Enter')

  useEffect(() => {
    if (isSelected)
      return ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })

    if (enter && isSelected) {
      /* eslint-disable */
      command.perform?.()
      return setOpen(false)
    }
  }, [isSelected, enter])

  return (
    <div
      className={styles.command}
      onMouseEnter={onMouseEnter}
      style={{ color: isSelected ? '#FFFFFF' : '#777777' }}
      ref={ref}
      onClick={command.perform}
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
        />
      )}
      {command.icon}
      <p className={styles.text}>{command.text}</p>
    </div>
  )
}

export { useShortcut } from './hooks/useShortcut'
export default Cmdk
