import React, {
  FC,
  useRef,
  useState,
  useContext,
  useEffect,
  Reducer,
  useReducer
} from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import useClickOutside from './hooks/useClickOutside'
import { useShortcut } from './hooks/useShortcut'
import { MenuContext } from './MenuProvider'
import {
  Action,
  ActionType,
  CommandWithIndex,
  MenuProps,
  SortedCommands,
  State
} from './types'
import parse from './utils/parse'
import Command from './Command'
import useBodyScrollable from './hooks/useBodyScrollable'
import useScrollbarSize from 'react-scrollbar-size'

const initialState = { selected: 0 }

/**
 * The main command menu component.
 *
 * @param {number} index - The hierarchial index of this palette
 * @param {CommandWithIndex[]} commands - The SORTED commands which will be displayed in this palette
 * @param {boolean} main - Whether this is the first command menu the user will see on toggle
 * @type {React.FC<MenuProps>}
 * @returns {React.ReactElement} the menu provider
 */
export const CommandMenu: FC<MenuProps> = ({
  index,
  commands,
  main,
  placeholder,
  preventClose,
  value,
  preventSearch
}) => {
  const [results, setResults] = useState<CommandWithIndex | null>(null)
  const { open, setOpen, config, query, setQuery, dimensions } =
    useContext(MenuContext)

  useEffect(() => {
    state.selected = 0
    let index = 0

    if (!query || preventSearch) return setResults(commands)

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

  const menuRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const [state, dispatch] = useReducer(reducer, initialState)

  const scrollable = useBodyScrollable()
  // @ts-ignore
  const { height, width } = useScrollbarSize()

  useEffect(() => {
    dispatch({ type: ActionType.RESET, custom: 0 })
    setQuery('')

    if (open && scrollable) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${width}px`
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [open, setOpen])

  const up = useShortcut({ targetKey: 'ArrowUp' })
  const down = useShortcut({ targetKey: 'ArrowDown' })

  useClickOutside({
    ref: menuRef,
    handler: preventClose ? undefined : () => setOpen(0)
  })

  useEffect(() => {
    if (open === index) {
      if (up) dispatch({ type: ActionType.DECREASE, custom: 0 })
      else if (down) dispatch({ type: ActionType.INCREASE, custom: 0 })
    }
  }, [up, down])

  const navigation = (event: KeyboardEvent) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === 'k' &&
      !preventClose
    ) {
      event.preventDefault()
      if (main) {
        setQuery('')
        setOpen((open: number) => (open === index ? 0 : index))
      } else if (!main && open === index) {
        setQuery('')
        setOpen(0)
      }
    }

    if (event.key === 'Escape') {
      setQuery('')
      setOpen(0)
    }

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
    if (event.touches.length >= 2 && !preventClose) {
      event.preventDefault()
      if (main) setOpen((open: number) => (open === index ? 0 : index))
      else if (!main && open === index) setOpen(0)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', navigation)
    window.addEventListener('touchstart', mobileToggle)
    return () => {
      window.removeEventListener('keydown', navigation)
      window.removeEventListener('touchstart', mobileToggle)
    }
  }, [open, setOpen])

  useEffect(() => {
    commands.commands.forEach((row) => {
      row.commands.forEach((command) => {
        if (command.shortcuts) {
          const map: string[] = []
          window.addEventListener('keydown', (event) =>
            parse({ command: command, event: event, map: map })
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
              parse({ command: command, event: event, map: map })
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
          className='backdrop'
          initial={{ opacity: 0, pointerEvents: 'none' }}
          animate={{ opacity: 1, pointerEvents: 'auto' }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          key={index}
          style={{
            backgroundColor: config?.backdropColor || '#FFFFFF90',
            backdropFilter: config?.backdropBlur
              ? `blur(${config?.backdropBlur}px)`
              : 'blur(2px)'
          }}
        >
          <motion.div
            className='dialog'
            role='dialog'
            aria-modal='true'
            ref={menuRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.1 }}
            style={{
              backgroundColor: config?.backgroundColor || '#FFFFFF',
              borderColor: config?.borderColor || 'transparent',
              borderWidth: config?.borderWidth || 0,
              borderRadius: config?.borderRadius || '10px',
              boxShadow: config?.boxShadow || '0px 0px 60px 10px #00000020'
            }}
          >
            <input
              placeholder={
                placeholder || config?.placeholderText || 'What do you need?'
              }
              defaultValue={value}
              className='searchbar'
              aria-expanded='true'
              aria-autocomplete='list'
              aria-haspopup='listbox'
              aria-readonly='true'
              aria-activedescendant={state.selected.toString()}
              role='combobox'
              autoFocus
              spellCheck='false'
              onChange={(e) => setQuery(e.target.value)}
              style={{
                color: config?.inputColor || '#000000',
                borderBottom: `${config?.inputBorder || '#e9ecef'} 1px solid`
              }}
            />
            <motion.div
              className='command_wrapper'
              ref={parentRef}
              role='listbox'
              style={{
                overflowY: results!.index >= 5 ? 'auto' : 'hidden',
                height:
                  results!.index >= 5
                    ? results?.initialHeight
                    : results!.commands.length *
                        (dimensions?.sectionHeight || 31) +
                      results!.index * (dimensions?.commandHeight || 54)
              }}
            >
              <AnimateSharedLayout>
                {results?.commands.map((category, index) => (
                  <div key={index}>
                    {category.commands.length > 0 && (
                      <p
                        className='category_header'
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
