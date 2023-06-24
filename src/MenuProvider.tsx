import React, {
  createContext,
  FC,
  ReactNode,
  Reducer,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react'
import useScrollbarSize from 'react-scrollbar-size'
import useBodyScrollable from './hooks/useBodyScrollable'
import {
  Action,
  ActionType,
  CommandWithIndex,
  MenuContext as MenuContextType,
  MenuProviderProps,
  State
} from './types'

export const MenuContext = createContext<MenuContextType>({} as MenuContextType)
const initialState = { selected: 0 }

/**
 * The provider component for kmenu.
 *
 * @param {Config} config - the configuration file to be passed down to all palettes
 * @param {Dimensions} dimensions - the dimensions
 * @type {React.FC<MenuProviderProps & { children: ReactNode }>}
 * @returns {React.ReactElement} the menu provider
 */
export const MenuProvider: FC<MenuProviderProps & { children: ReactNode }> = ({
  children,
  dimensions,
  config
}) => {
  const input = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(0)
  const [query, setQuery] = useState('')
  const [placeholder, setPlaceholder] = useState<string | undefined>(undefined)
  const [results, setResults] = useState<CommandWithIndex | null>(null)
  const [crumbs, setCrumbs] = useState<Array<string>>([])
  const [animate, setAnimate] = useState(false)

  const scrollable = useBodyScrollable()
  const { width } = useScrollbarSize()

  const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      case ActionType.INCREASE:
        return state.selected === results!.index - 1
          ? { ...state, selected: results!.index - 1 }
          : { ...state, selected: state.selected + 1 }
      case ActionType.DECREASE:
        return state.selected === 0
          ? { ...state, selected: 0 }
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

  const [state, dispatch] = useReducer(reducer, initialState)

  const navigation = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault()
      setQuery('')
      setOpen(1)
    }

    if (event.key === 'Escape' && open === 1) {
      setQuery('')
      setOpen(0)
    }

    if (open > 0) {
      if (event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault()
        dispatch({ type: ActionType.INCREASE, custom: 0 })
      } else if (event.shiftKey && event.key === 'Tab') {
        event.preventDefault()
        dispatch({ type: ActionType.DECREASE, custom: 0 })
      }
    }

    if (
      open > 1 &&
      query === '' &&
      (event.key === 'Backspace' || event.key === 'Escape')
    ) {
      event.preventDefault()
      setAnimate(true)
      setTimeout(() => setAnimate(false), 100)
      setQuery('')
      setOpen(1)
    }
  }

  const mobileToggle = (event: TouchEvent) => {
    if (event.touches.length >= 2) {
      event.preventDefault()
      setOpen(1)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', navigation)
    window.addEventListener('touchstart', mobileToggle)
    return () => {
      window.removeEventListener('keydown', navigation)
      window.removeEventListener('touchstart', mobileToggle)
    }
  }, [open, setOpen, query])

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

  return (
    <MenuContext.Provider
      value={{
        query,
        setQuery,
        placeholder,
        setPlaceholder,
        results,
        setResults,
        animate,
        setAnimate,
        crumbs,
        setCrumbs,
        open,
        setOpen,
        config,
        dimensions,
        state,
        dispatch,
        input
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}
