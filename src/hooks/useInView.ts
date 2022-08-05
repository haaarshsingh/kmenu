import { useEffect, useState } from 'react'
import { UseInViewProps } from '../types'

/* The hook to determine whether or not a given element is in view using the Intersection Observer API */
const useInView = ({ ref }: UseInViewProps) => {
  /* State for managing if the element is in view or not */
  const [isIntersecting, setIntersecting] = useState(false)

  /* Create a new Intersection Observer */
  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    /* Configure the callback to get notified of the intersection */
    observer.observe(ref.current!)
    /* Disconnect the observer on unmount */
    return () => {
      observer.disconnect()
    }
  }, [])

  /* Return the state of the observer */
  return isIntersecting
}

export default useInView
