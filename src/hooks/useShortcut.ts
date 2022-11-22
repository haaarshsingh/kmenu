import { useCallback, useEffect, useState } from 'react'
import { UseShortcutProps } from '../types'

/**
 * Hook for creating new shortcuts.
 *
 * @param {string} targetKey - The key this shortcut is listening for
 * @param {enum} modifier - Modifier that will be used in conjuntion with the target key
 * @param {() => void} handler - The function that will run when this shortcut is pressed
 *
 * @returns {boolean} Whether or not this shortcut was pressed
 */
export const useShortcut = ({
  targetKey,
  modifier,
  handler
}: UseShortcutProps): boolean => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === targetKey) {
      if (modifier === 'shift' && event.shiftKey) {
        event.preventDefault()
        setKeyPressed(true)
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
      } else {
        event.preventDefault()
        setKeyPressed(true)
        handler?.()
      }
    }
  }, [])

  const upHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === targetKey) setKeyPressed(false)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])

  return keyPressed
}
