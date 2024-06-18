import { useEffect, useState } from 'react'
import { UseInViewProps } from '../types'

/**
 * A hook to check if a given element is in view inside a div.
 *
 * @param {React.RefObject<HTMLSpanElement>} ref - The ref of the element we are checking
 * @returns {boolean} Whether or not the given element is in view
 */
const useInView = ({ ref }: UseInViewProps) => {
  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  )

  useEffect(() => {
    observer.observe(ref.current!)
    return () => observer.disconnect()
  }, [])

  return isIntersecting
}

export default useInView
