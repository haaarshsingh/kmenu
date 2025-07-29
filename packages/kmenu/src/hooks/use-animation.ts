import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: no-preference)'

export const useAnimation = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [firefox, setFirefox] = useState(false)

  useEffect(() => {
    setFirefox(typeof InstallTrigger !== 'undefined')
    const listener = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(!event.matches)

    const media = window.matchMedia(QUERY)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [])

  return { prefersReducedMotion, firefox }
}
