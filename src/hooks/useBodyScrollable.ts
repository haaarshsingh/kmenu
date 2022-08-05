import { useEffect, useState } from 'react'

/**
 * A hook to check if the HTML body element is scrollable vertically.
 *
 * @returns {boolean} Whether or not the given element is in view
 */
const useBodyScrollable = () => {
  const [bodyScrollable, setBodyScrollable] = useState(true)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() =>
      setBodyScrollable(document.body.scrollHeight > window.innerHeight)
    )

    resizeObserver.observe(document.body)
    return () => resizeObserver.unobserve(document.body)
  }, [])

  return bodyScrollable
}

export default useBodyScrollable
