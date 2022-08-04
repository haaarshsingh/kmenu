import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import type { Dispatch, FC, Reducer, SetStateAction } from 'react'
import { useShortcut } from './hooks/useShortcut'
import {
  ActionType,
  Action,
  State,
  Config,
  CategoryCommand,
  PaletteProps,
  GlobalCommand,
  SortedCommands,
  PaletteContext as PaletteContextType,
  Command,
  CommandWithIndex
} from './types'
import styles from './styles/palette.module.css'
import useClickOutside from './hooks/useClickOutside'
import useInView from './hooks/useInView'
import parse, { run } from './utils/parse'

const initialState = { selected: 0 }
export type PaletteConfig = Partial<Config>

export const PaletteContext = createContext<PaletteContextType>(
  {} as PaletteContextType
)

export const MenuProvider: FC<{
  children: ReactNode
  values: {
    open: number
    setOpen: Dispatch<SetStateAction<number>>
    input?: string
    config?: Config
  }
}> = ({ children, values }) => {
  return (
    <PaletteContext.Provider value={values}>{children}</PaletteContext.Provider>
  )
}

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

export const useKmenu = (): [number, () => void] => {
  const { open, config } = useContext(PaletteContext)

  const toggle = useCallback(() => {
    console.log(open)
    console.log(config)
  }, [open, config])

  return [open, toggle]
}

export const Palette: FC<PaletteProps> = ({ index, commands, main }) => {
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CommandWithIndex | null>(null)
  const { open, setOpen, config } = useContext(PaletteContext)

  useEffect(() => {
    state.selected = 0
    let index = 0

    if (!query) {
      return setResults(commands)
    }

    const sorted: SortedCommands[] = []

    // eslint-disable-next-line no-unused-expressions
    commands.commands.forEach((row) => {
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

      if (results.commands.length > 0) sorted.push(results)
    })

    setResults({
      index: index,
      commands: sorted,
      initialHeight: commands.initialHeight
    })
  }, [query, setQuery])

  const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      case ActionType.INCREASE:
        return state.selected === results!.index - 1
          ? { ...state, selected: 0 }
          : { ...state, selected: state.selected + 1 }
      case ActionType.DECREASE:
        return state.selected === 0
          ? { ...state, selected: results!.index - 1 }
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

    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
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
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
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

  const mobileToggle = (event: TouchEvent) => {
    if (event.touches.length >= 2) {
      event.preventDefault()
      if (main) setOpen((open) => (open === index ? 0 : index))
      else if (!main && open === index) setOpen(0)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', toggle)
    window.addEventListener('touchstart', mobileToggle)
    return () => {
      window.removeEventListener('keydown', toggle)
      window.removeEventListener('touchstart', mobileToggle)
    }
  }, [open, setOpen])

  useEffect(() => {
    commands.commands.forEach((row) => {
      row.commands.forEach((command) => {
        if (command.shortcuts) {
          const map: string[] = []
          window.addEventListener('keydown', (event) =>
            parse(command, event, map)
          )
        }
      })
    })

    return () => {
      commands.commands.forEach((row) => {
        row.commands.forEach((command) => {
          if (command.shortcuts) {
            const map: string[] = []
            window.removeEventListener('keydown', (event) =>
              parse(command, event, map)
            )
          }
        })
      })
    }
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
            backgroundColor: config?.backdropColor || '#FFFFFF20',
            backdropFilter: `blur(${config?.backdropBlur}px)` || 'blur(2px)'
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
              backgroundColor: config?.backgroundColor || '#FFFFFF',
              border: `solid ${config?.borderColor}` || 'solid #3f3f3f',
              borderRadius: `${config?.borderRadius}px` || '12px',
              borderWidth: config?.borderWidth || 1
            }}
          >
            <input
              placeholder={config?.placeholderText || 'What do you need?'}
              className={styles.search}
              autoFocus
              ref={input}
              onChange={() => setQuery(input.current?.value!)}
              style={{ color: config?.inputColor || '#000' }}
            />
            <motion.div
              className={styles.wrapper}
              ref={parentRef}
              style={{
                overflowY: results!.index >= 5 ? 'auto' : 'hidden',
                height:
                  results!.index >= 5
                    ? config?.paletteMaxHeight || results?.initialHeight
                    : results!.commands.length * 31 + results!.index * 54
              }}
            >
              <AnimateSharedLayout>
                {results?.commands.map((category, index) => (
                  <div key={index}>
                    {category.commands.length > 0 && (
                      <p
                        className={styles.title}
                        style={{ color: config?.headingColor || '#828282' }}
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
  command: CategoryCommand
  onMouseEnter: () => void
  isSelected: boolean
  setOpen: Dispatch<SetStateAction<number>>
  config?: PaletteConfig
}> = ({ onMouseEnter, isSelected, command, setOpen, config }) => {
  const topRef = useRef<HTMLSpanElement>(null)
  const bottomRef = useRef<HTMLSpanElement>(null)
  const enter = useShortcut('Enter')

  const inViewTop = useInView(topRef)
  const inViewBottom = useInView(bottomRef)

  useEffect(() => {
    if (isSelected && (!inViewTop || !inViewBottom))
      // eslint-disable-next-line
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })

    if (enter && isSelected) {
      setOpen(0)
      run(command)
    }
  }, [isSelected, enter])

  return (
    <div>
      <span ref={topRef} />
      <a
        className={styles.command}
        onMouseMove={onMouseEnter}
        style={{
          color: isSelected
            ? config?.commandActive || '#343434'
            : config?.commandInactive || '#828282'
        }}
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
              background: config?.barBackground || '#82828220'
            }}
          />
        )}
        <div className={styles.info_wrapper}>
          {command.icon && command.icon}
          <p className={styles.text}>{command.text}</p>
        </div>
        {command.shortcuts && (
          <div className={styles.shortcuts}>
            {command.shortcuts.modifier && (
              <kbd>{command.shortcuts.modifier}</kbd>
            )}
            {command.shortcuts.keys.map((key, index) => (
              <kbd key={index}>{key}</kbd>
            ))}
          </div>
        )}
      </a>
      <span ref={bottomRef} className={styles.scroll_ref} />
    </div>
  )
}

export { Command, PaletteProps } from './types'
export { useShortcut } from './hooks/useShortcut'
