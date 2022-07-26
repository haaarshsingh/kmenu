import { useCallback, useEffect, useState } from 'react'

export const useShortcut = (
  targetKey: string,
  modifier?: 'shift' | 'ctrl' | 'alt'
): boolean => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === targetKey) {
      if (modifier === 'shift' && event.shiftKey) {
        event.preventDefault()
        setKeyPressed(true)
      } else if (modifier === 'ctrl' && event.ctrlKey) {
        event.preventDefault()
        setKeyPressed(true)
      } else if (modifier === 'alt' && event.altKey) {
        event.preventDefault()
        setKeyPressed(true)
      } else {
        event.preventDefault()
        setKeyPressed(true)
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
