import React, { FC, ReactNode, useContext, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MenuContext } from './MenuProvider'
import { CommandWrapperProps } from './types'
import useClickOutside from './hooks/useClickOutside'

export const CommandWrapper: FC<
  CommandWrapperProps & { children: ReactNode }
> = ({ children, value }) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const {
    open,
    setOpen,
    placeholder,
    animate,
    config,
    setQuery,
    state,
    crumbs,
    input
  } = useContext(MenuContext)

  useClickOutside({
    ref: menuRef,
    handler: () => setOpen(0)
  })

  return (
    <AnimatePresence>
      {open > 0 && (
        <motion.div
          className='backdrop'
          initial={{ opacity: 0, pointerEvents: 'none' }}
          animate={{ opacity: 1, pointerEvents: 'auto' }}
          exit={{ opacity: 0, pointerEvents: 'none' }}
          style={{
            backgroundColor: config?.backdropColor || '#FFFFFF90',
            backdropFilter: config?.backdropBlur
              ? `blur(${config?.backdropBlur}px)`
              : 'blur(2px)'
          }}
        >
          <motion.div
            className='dialog'
            role='dialog'
            aria-modal='true'
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: animate ? 0.98 : 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: config?.animationDuration ?? 0.1 }}
            style={{
              backgroundColor: config?.backgroundColor || '#FFFFFF',
              borderColor: config?.borderColor || 'transparent',
              borderWidth: config?.borderWidth || 0,
              borderRadius: config?.borderRadius || '10px',
              boxShadow: config?.boxShadow || '0px 0px 60px 10px #00000020'
            }}
          >
            <div className='crumbs'>
              {crumbs?.map((crumb, index) => (
                <button
                  onClick={() => setOpen(index + 1)}
                  className='breadcrumb'
                  style={{
                    backgroundColor: config?.breadcrumbColor || '#EFEFEF',
                    borderRadius: config?.breadcrumbRadius || 5
                  }}
                  key={index}
                >
                  {crumb}
                </button>
              ))}
            </div>
            <input
              placeholder={placeholder || 'What do you need?'}
              defaultValue={value}
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
              style={{
                color: config?.inputColor || '#000000',
                borderBottom: `${config?.inputBorder || '#e9ecef'} 1px solid`
              }}
            />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
