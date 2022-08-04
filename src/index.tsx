import React, {
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
  MenuProps,
  SortedCommands,
  Command,
  CommandWithIndex
} from './types'
import styles from './styles/palette.module.css'
import useClickOutside from './hooks/useClickOutside'
import useInView from './hooks/useInView'
import parse, { run } from './utils/parse'
import { MenuContext } from './menuProvider'

/* The initial state of our keyboard selection */
const initialState = { selected: 0 }

export const Palette: FC<MenuProps> = ({ index, commands, main }) => {
  /* Ref for handling the search bar */
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  /* Contains filtered results when the user searches for commands */
  const [results, setResults] = useState<CommandWithIndex | null>(null)
  /* Get important data out of our Provider */
  const { open, setOpen, config } = useContext(MenuContext)

  useEffect(() => {
    /* Set the keyboard selected command back to zero */
    state.selected = 0
    let index = 0

    /* If there is no query, then set to results back to the original commands */
    if (!query) return setResults(commands)

    /* Array which includes all of the sorted commands before they're passed onto the hook */
    const sorted: SortedCommands[] = []
    /* Loop through each category of commands */
    // eslint-disable-next-line no-unused-expressions
    commands.commands.forEach((row) => {
      /* Object which contains the filtered results to be pushed back */
      const results: SortedCommands = {
        category: row.category,
        commands: []
      }

      /* Loop through each command inside of the category */
      row.commands.forEach((command) => {
        /* Create a text object including the title and keywords */
        const text =
          command.text.toLowerCase() + command.keywords?.toLowerCase()
        /* Check if the query in the input bar includes any keywords or the title */
        if (text.includes(query.toLowerCase())) {
          /* If so, push the command with the appropriate global index onto the array */
          results.commands.push({ ...command, globalIndex: index })
          /* Increase the index for the next component */
          index++
        }
      })

      /* Push the category into the array ONLY if they have commands */
      if (results.commands.length > 0) sorted.push(results)
    })

    /* Set the results to the filtered results in our array */
    setResults({
      index: index,
      commands: sorted,
      initialHeight: commands.initialHeight
    })
  }, [query, setQuery])

  /* Reducer for the keyboard navigation */
  const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      /* Increase action when the user presses the down or tab key */
      case ActionType.INCREASE:
        /* Check if the current selected element is the last one */
        return state.selected === results!.index - 1
          ? /* If it is, the set it to the first one */
            { ...state, selected: 0 }
          : /* If it's not, then just increase the index */
            { ...state, selected: state.selected + 1 }
      /* Decrease action when the user presses up or shift+tab */
      case ActionType.DECREASE:
        /* Check if the selected element is the first one */
        return state.selected === 0
          ? /* If it is, then set the selected element to the last one */
            { ...state, selected: results!.index - 1 }
          : /* If it's not, then just decrease the index */
            { ...state, selected: state.selected - 1 }
      /* Custom action when the user hovers their mouse over an element */
      case ActionType.CUSTOM:
        /* Just set the value into whatever is inputted into the reducer function */
        return {
          ...state,
          selected: action.custom
        }
      /* Action to reset the palette when the palette is closed and re-opened, or when the user searches for something */
      case ActionType.RESET:
        /* Just set the selected to the first element on the list */
        return {
          ...state,
          selected: 0
        }
    }
  }

  /* Ref for controlling the dialog */
  const paletteRef = useRef<HTMLDivElement>(null)
  /* Ref for controlling the div wheere all the commands are located */
  const parentRef = useRef<HTMLDivElement>(null)
  /* useReducer hook to manage the keyboard state */
  const [state, dispatch] = useReducer(reducer, initialState)

  /* Reset the palette whenever the open state is changed */
  useEffect(() => {
    /* Reset the component whenever the palette is toggled */
    dispatch({ type: ActionType.RESET, custom: 0 })
    /* Set the query to blank */
    setQuery('')

    /* Toggle scrollbars base upon whether or not the bar is open or not to prevent background scrolling */
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [open, setOpen])

  /* Shortcuts for navigating up and down the palette */
  const up = useShortcut({ targetKey: 'ArrowUp' })
  const down = useShortcut({ targetKey: 'ArrowDown' })

  /* Hook for detecting clicks outside the palette area */
  useClickOutside({ ref: paletteRef, handler: () => setOpen(0) })

  /* Handle keyboard shortcuts for navigating the palette */
  useEffect(() => {
    /* First check if this instance of the palette is actually open or not */
    if (open === index) {
      /* Move up or down depending on what key the user has pressed */
      if (up) dispatch({ type: ActionType.DECREASE, custom: 0 })
      else if (down) dispatch({ type: ActionType.INCREASE, custom: 0 })
    }
  }, [up, down])

  /* Function for toggling the palette along with using the tab key to navigate the palette */
  const navigation = (event: KeyboardEvent) => {
    /* Toggle the palette if the user presses ctrl/cmdk+k */
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault()
      if (main) setOpen((open: number) => (open === index ? 0 : index))
      else if (!main && open === index) setOpen(0)
    }

    /* Close the palette if the user presses escape */
    if (event.key === 'Escape') setOpen(0)

    /* If the palette is open, then check if the user presses tab/shift+tab and navigate accordingly */
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

  /* Function to toggle the palette on mobile */
  const mobileToggle = (event: TouchEvent) => {
    /* Check if the user has pressed their screen with two fingers */
    if (event.touches.length >= 2) {
      /* Prevent the default action */
      event.preventDefault()
      /* Adjust the palette depending upon whether or not it's the main palette and if it's currently open/active */
      if (main) setOpen((open: number) => (open === index ? 0 : index))
      else if (!main && open === index) setOpen(0)
    }
  }

  /* Adding and removing event listeners for keyboard and mobile navigation */
  useEffect(() => {
    window.addEventListener('keydown', navigation)
    window.addEventListener('touchstart', mobileToggle)
    /* Remove event listeners during the cleanup phase */
    return () => {
      window.removeEventListener('keydown', navigation)
      window.removeEventListener('touchstart', mobileToggle)
    }
  }, [open, setOpen])

  useEffect(() => {
    /* Loop through each category inside the component array */
    commands.commands.forEach((row) => {
      /* Loop through each command inside of the individual categories */
      row.commands.forEach((command) => {
        /* Check if they have shortcuts */
        if (command.shortcuts) {
          /* Create a map array to keep track of the shortcuts */
          const map: string[] = []
          /* Add a keydown event to listen for the shortcuts, and use the parse function to parse the shortcut */
          window.addEventListener('keydown', (event) =>
            parse(command, event, map)
          )
        }
      })
    })

    /* Clean up the event listeners on component unmount */
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
              aria-expanded='true'
              aria-autocomplete='list'
              aria-haspopup='listbox'
              role='combobox'
              autoFocus
              spellCheck='false'
              ref={input}
              onChange={() => setQuery(input.current?.value!)}
              style={{ color: config?.inputColor || '#000' }}
            />
            <motion.div
              className={styles.wrapper}
              ref={parentRef}
              role='listbox'
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
  config?: MenuConfig
}> = ({ onMouseEnter, isSelected, command, setOpen, config }) => {
  /* Refs for the top and bottom of the span for scroll navigation */
  const topRef = useRef<HTMLSpanElement>(null)
  const bottomRef = useRef<HTMLSpanElement>(null)
  /* Check if the user presses the enter key to run the command */
  const enter = useShortcut({ targetKey: 'Enter' })

  /* Use a custom hook that uses the IntersectionObserver API to check if the command is in view from the top and the bottom */
  const inViewTop = useInView({ ref: topRef })
  const inViewBottom = useInView({ ref: bottomRef })

  /* Function determining whether or not to scroll the div and when to run commands */
  useEffect(() => {
    if (isSelected && (!inViewTop || !inViewBottom))
      // eslint-disable-next-line
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })

    /* If the user presses the enter key, then run the command */
    if (enter && isSelected) {
      /* Close the palette on select */
      setOpen(0)
      /* Pass the entire command object in the run function */
      run(command)
    }
  }, [isSelected, enter])

  return (
    <div role='option' aria-selected={isSelected}>
      <span ref={topRef} aria-hidden='true' />
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
            aria-hidden='true'
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
      <span ref={bottomRef} className={styles.scroll_ref} aria-hidden='true' />
    </div>
  )
}

/* Export components from other files so the user can import it directly from kmenu */
/* Optional configuration options the user passes onto the menu */
export type MenuConfig = Partial<Config>
/* Types for declaring commands and types for the menu */
export { Command, MenuProps } from './types'
/* Hook for defining custom shortcuts */
export { useShortcut } from './hooks/useShortcut'
/* The hook for declaring and setting dynamic commands on the palette */
export { useCommands } from './hooks/useCommands'
/* The hook with utilities for using the palette */
export { useKmenu } from './hooks/useKmenu'
/* The MenuProvider which the Palette must be wrapped under */
export { MenuProvider } from './menuProvider'
