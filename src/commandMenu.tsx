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
import { MenuContext } from './menuProvider'
import {
  Action,
  ActionType,
  CommandWithIndex,
  MenuProps,
  SortedCommands,
  State
} from './types'
import parse from './utils/parse'
import styles from './styles/menu.module.css'
import Command from './command'
import useBodyScrollable from './hooks/useBodyScrollable'
import useScrollbarWidth from './hooks/useScrollbarWidth'

/* The initial state of our keyboard selection */
const initialState = { selected: 0 }

export const CommandMenu: FC<MenuProps> = ({ index, commands, main }) => {
  /* Ref for handling the search bar */
  const input = useRef<HTMLInputElement>(null)
  /* Contains filtered results when the user searches for commands */
  const [results, setResults] = useState<CommandWithIndex | null>(null)
  /* Get important data out of our Provider */
  const { open, setOpen, config, query, setQuery } = useContext(MenuContext)

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
      /* Action to reset the menu when the menu is closed and re-opened, or when the user searches for something */
      case ActionType.RESET:
        /* Just set the selected to the first element on the list */
        return {
          ...state,
          selected: 0
        }
    }
  }

  /* Ref for controlling the dialog */
  const menuRef = useRef<HTMLDivElement>(null)
  /* Ref for controlling the div wheere all the commands are located */
  const parentRef = useRef<HTMLDivElement>(null)
  /* useReducer hook to manage the keyboard state */
  const [state, dispatch] = useReducer(reducer, initialState)

  /* Use our hooks we've defined for checking if the body is scrollable and for getting the width of the scrollbar */
  const scrollable = useBodyScrollable()
  const scrollbarWidth = useScrollbarWidth()

  /* Reset the menu whenever the open state is changed */
  useEffect(() => {
    /* Reset the component whenever the menu is toggled */
    dispatch({ type: ActionType.RESET, custom: 0 })
    /* Set the query to blank */
    setQuery('')

    /* Toggle scrollbars base upon whether or not the bar is open or not to prevent background scrolling */
    if (open && scrollable) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [open, setOpen])

  /* Shortcuts for navigating up and down the menu */
  const up = useShortcut({ targetKey: 'ArrowUp' })
  const down = useShortcut({ targetKey: 'ArrowDown' })

  /* Hook for detecting clicks outside the menu area */
  useClickOutside({ ref: menuRef, handler: () => setOpen(0) })

  /* Handle keyboard shortcuts for navigating the menu */
  useEffect(() => {
    /* First check if this instance of the menu is actually open or not */
    if (open === index) {
      /* Move up or down depending on what key the user has pressed */
      if (up) dispatch({ type: ActionType.DECREASE, custom: 0 })
      else if (down) dispatch({ type: ActionType.INCREASE, custom: 0 })
    }
  }, [up, down])

  /* Function for toggling the menu along with using the tab key to navigate the menu */
  const navigation = (event: KeyboardEvent) => {
    /* Toggle the menu if the user presses ctrl/cmdk+k */
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault()
      if (main) setOpen((open: number) => (open === index ? 0 : index))
      else if (!main && open === index) setOpen(0)
    }

    /* Close the menu if the user presses escape */
    if (event.key === 'Escape') setOpen(0)

    /* If the menu is open, then check if the user presses tab/shift+tab and navigate accordingly */
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

  /* Function to toggle the menu on mobile */
  const mobileToggle = (event: TouchEvent) => {
    /* Check if the user has pressed their screen with two fingers */
    if (event.touches.length >= 2) {
      /* Prevent the default action */
      event.preventDefault()
      /* Adjust the menu depending upon whether or not it's the main menu and if it's currently open/active */
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
            parse({ command: command, event: event, map: map })
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
            ref={menuRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            style={{
              backgroundColor: config?.backgroundColor || '#FFFFFF',
              borderColor: config?.borderColor || 'transparent',
              borderWidth: config?.borderWidth || 0,
              boxShadow: config?.boxShadow || '0px 0px 59px 10px #00000020'
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
                    ? results?.initialHeight
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
