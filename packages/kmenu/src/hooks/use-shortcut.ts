import { useCallback, useEffect } from 'react'
import { UseShortcutProps } from '../types'

/**
 * Hook for creating new shortcuts.
 *
 * @param {string} targetKey - The key this shortcut is listening for
 * @param {enum} modifier - Modifier that will be used in conjuntion with the target key
 * @param {() => void} handler - The function that will run when this shortcut is pressed
 */
export const useShortcut = ({
  targetKey,
  modifier,
  handler,
}: UseShortcutProps) => {
  const downHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== targetKey) return

      const modifierPressed = {
        shift: event.shiftKey,
        ctrl: event.ctrlKey,
        alt: event.altKey,
        meta: event.metaKey,
      }

      const shouldTrigger = modifier
        ? modifierPressed[modifier]
        : !Object.values(modifierPressed).some(Boolean)

      if (shouldTrigger) {
        event.preventDefault()
        handler?.()
      }
    },
    [targetKey, modifier, handler]
  )

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    return () => window.removeEventListener('keydown', downHandler)
  }, [downHandler])
}
