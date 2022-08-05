import { useRef } from 'react'

/* Hook for getting the scrollbar width to prevent layout shifts on open */
const useScrollbarWidth = () => {
  /* Whether or not the value of the scrollbar's width has been computed */
  const didCompute = useRef(false)
  /* The value of the scrollbar's width */
  const widthRef = useRef(0)

  /* If it has computed, return the width of the scrollbar */
  if (didCompute.current) return widthRef.current

  /* Create a container */
  const outer = document.createElement('div')
  /* Hide the container */
  outer.style.visibility = 'hidden'
  /* Force the scrollbar to appear */
  outer.style.overflow = 'scroll'
  /* This is required for WinJS applications */
  /* Using @ts-ignore because msOverflowStyle apparently does on exist on the CSS declaration type in React */
  // @ts-ignore
  outer.style.msOverflowStyle = 'scrollbar'
  /* Append the element to the body */
  document.body.appendChild(outer)

  /* Create an inner element */
  const inner = document.createElement('div')
  /* Place the element inside of our container */
  outer.appendChild(inner)

  /* Calculates the difference between the full width of the container and the child width */
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
  /* Remove elements from the DOM */
  outer.parentNode!.removeChild(outer)

  /* Since it has computed, set this ref to true */
  didCompute.current = true
  /* Set the width of the ref to the scrollbar's width */
  widthRef.current = scrollbarWidth

  /* Return the width of the scrollbar */
  return scrollbarWidth
}

export default useScrollbarWidth
