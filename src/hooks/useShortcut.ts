/* eslint-disable no-unused-expressions */
import { useCallback, useEffect, useState } from 'react'
import { UseShortcutProps } from '../types'

/* Hook for creating new shortcuts */
export const useShortcut = ({
  targetKey,
  modifier,
  handler
}: UseShortcutProps): boolean => {
  /* Boolean to see if the shortcut is active or not */
  const [keyPressed, setKeyPressed] = useState(false)

  /* Function that runs whenever the user presses a key */
  const downHandler = useCallback((event: KeyboardEvent) => {
    /* Firstly, check if the key the user has pressed is the target key */
    if (event.key === targetKey) {
      /* If yes, then check if it also has a modifier and ALSO check that the user has passed in a modifier option to this hook */
      if (modifier === 'shift' && event.shiftKey) {
        /* Prevent the default event for this shortcut */
        event.preventDefault()
        /* Toggle the hook */
        setKeyPressed(true)
        /* Run the handler if it's not undefined */
        handler?.()
      } else if (modifier === 'ctrl' && event.ctrlKey) {
        event.preventDefault()
        setKeyPressed(true)
        handler?.()
      } else if (modifier === 'alt' && event.altKey) {
        event.preventDefault()
        setKeyPressed(true)
        handler?.()
      } else if (modifier === 'meta' && event.metaKey) {
        event.preventDefault()
        setKeyPressed(true)
        handler?.()
      } /* If they haven't passed in any modifiers, just run the function */ else {
        event.preventDefault()
        setKeyPressed(true)
        handler?.()
      }
    }
  }, [])

  /* Function that runs whenever the user releases a key */
  const upHandler = useCallback((event: KeyboardEvent) => {
    /* Check if the key is the target key -- if it is, then just set the hook to false */
    if (event.key === targetKey) setKeyPressed(false)
  }, [])

  useEffect(() => {
    /* Run a handler on the keyboard event accordingly */
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    /* Clean up the handlers */
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])

  /* Return a boolean value on whether or not the key was pressed */
  return keyPressed
}
