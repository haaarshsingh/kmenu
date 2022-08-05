import { useEffect } from 'react'
import { UseClickOutsideProps } from '../types'

/* Hook which checks if the user has clicked outside a div boundary */
const useClickOutside = ({ ref, handler }: UseClickOutsideProps) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      /* Do nothing if you're clicking the elements inside the div */
      if (!ref.current || ref.current.contains(event.target as Node)) return
      /* Run the handler if you're not clicking the elements inside the div */
      handler()
    }

    /* Add event listeners for mobile and PC to detect clicks/touches */
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    /* Clean up the event listeners on unmount */
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export default useClickOutside
