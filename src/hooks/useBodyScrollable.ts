import { useEffect, useState } from 'react'

/* Hook for checking if the body of our element is actually scrollable using the ResizeObserver API */
const useBodyScrollable = () => {
  /* Hook for managing the state, set to true if the body's scroll height is GREATER than the window's inner height */
  const [bodyScrollable, setBodyScrollable] = useState(
    document.body.scrollHeight > window.innerHeight
  )

  useEffect(() => {
    /* Check for resizes on the screen using the ResizeObserver API */
    /* Resize observer does not properly work for some reason? */
    const resizeObserver = new (window as any).ResizeObserver(() =>
      /* Set the hook to true if the body's height is still greater than the window's inner height */
      setBodyScrollable(document.body.scrollHeight > window.innerHeight)
    )
    /* Add the observer onto the document's body */
    resizeObserver.observe(document.body)

    /* Clean up on component unmount */
    return () => {
      resizeObserver.unobserve(document.body)
    }
  }, [])

  /* Return the state */
  return bodyScrollable
}

export default useBodyScrollable
