/* eslint-disable no-unused-expressions */
import { useCallback, useEffect, useState } from 'react'

export const useShortcut = (
  targetKey: string,
  modifier?: 'shift' | 'ctrl' | 'alt' | 'meta',
  handler?: () => void
): boolean => {
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

export const useKeys = (targetKeys: string[], handler: () => void): boolean => {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === targetKeys[0] && event.key === targetKeys[1]) {
      event.preventDefault()
      setKeyPressed(true)
      handler()
    }
  }, [])

  const upHandler = useCallback((event: KeyboardEvent) => {
    if (event.key === targetKeys[0] || event.key === targetKeys[1])
      setKeyPressed(false)
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
