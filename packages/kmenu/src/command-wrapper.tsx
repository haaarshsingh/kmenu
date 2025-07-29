import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, ReactNode, useContext, useRef } from 'react'
import { useAnimation } from './hooks/use-animation'
import { useClickOutside } from './hooks/use-click-outside'
import { MenuContext } from './menu-provider'
import { CommandWrapperProps } from './types'

export const CommandWrapper: FC<
  CommandWrapperProps & { children: ReactNode }
> = ({ children, defaultValue }) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const {
    open,
    setOpen,
    placeholder,
    animate,
    query,
    setQuery,
    state,
    crumbs,
    input,
  } = useContext(MenuContext)

  useClickOutside({
    ref: menuRef,
    handler: () => setOpen(0),
  })

  const { firefox, prefersReducedMotion } = useAnimation()

  return (
    <div className='kmenu'>
      <AnimatePresence>
        {open > 0 && (
          <motion.div
            className='backdrop'
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
          >
            <motion.div
              className='dialog'
              role='dialog'
              aria-modal='true'
              ref={menuRef}
              initial={{
                opacity: firefox || prefersReducedMotion ? 1 : 0,
                scale: firefox || prefersReducedMotion ? 1 : 0.98,
              }}
              animate={{
                opacity: 1,
                scale: animate ? 0.97 : 1,
              }}
              exit={{
                opacity: firefox || prefersReducedMotion ? 1 : 0,
                scale: firefox || prefersReducedMotion ? 1 : 0.95,
              }}
            >
              <div className='crumbs'>
                {crumbs?.map((crumb, index) => (
                  <button
                    onClick={() => setOpen(index + 1)}
                    className='breadcrumb'
                    key={index}
                  >
                    {crumb}
                  </button>
                ))}
              </div>
              <input
                placeholder={placeholder || 'What do you need?'}
                defaultValue={defaultValue}
                value={query}
                className='searchbar'
                aria-expanded='true'
                aria-autocomplete='list'
                aria-haspopup='listbox'
                aria-readonly='true'
                role='combobox'
                autoFocus
                spellCheck='false'
                ref={input}
                aria-activedescendant={state.selected.toString()}
                onChange={(e) => setQuery(e.target.value)}
              />
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
