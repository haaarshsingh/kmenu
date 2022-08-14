import React, { FC, Dispatch, SetStateAction, useRef, useEffect } from 'react'
import useInView from './hooks/useInView'
import { useShortcut } from './hooks/useShortcut'
import { CategoryCommand, Config } from './types'
import run from './utils/run'
import { motion } from 'framer-motion'

const Command: FC<{
  command: CategoryCommand
  onMouseEnter: () => void
  isSelected: boolean
  setOpen: Dispatch<SetStateAction<number>>
  config?: Partial<Config>
}> = ({ onMouseEnter, isSelected, command, setOpen, config }) => {
  const topRef = useRef<HTMLSpanElement>(null)
  const bottomRef = useRef<HTMLSpanElement>(null)
  const enter = useShortcut({ targetKey: 'Enter' })

  const inViewTop = useInView({ ref: topRef })
  const inViewBottom = useInView({ ref: bottomRef })

  useEffect(() => {
    if (isSelected && (!inViewTop || !inViewBottom))
      // eslint-disable-next-line
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })

    if (enter && isSelected) {
      if (!command.closeOnComplete) setOpen(0)
      run(command)
    }
  }, [isSelected, enter])

  return (
    <div role='option' aria-selected={isSelected}>
      <span ref={topRef} aria-hidden='true' />
      <a
        className='command'
        onMouseMove={onMouseEnter}
        style={{
          color: isSelected
            ? config?.commandActive || '#343434'
            : config?.commandInactive || '#828282'
        }}
        onClick={command.perform}
        href={command.href || '#'}
        target={command.newTab ? '_blank' : '_self'}
        rel='noreferrer'
      >
        {isSelected && (
          <motion.div
            layoutId='box'
            className='selected'
            initial={false}
            aria-hidden='true'
            transition={{
              type: 'spring',
              stiffness: 1000,
              damping: 70
            }}
            style={{
              background: config?.barBackground || '#82828220'
            }}
          />
        )}
        <div className='info_wrapper'>
          {command.icon && command.icon}
          <p className='command_text'>{command.text}</p>
        </div>
        {command.shortcuts && (
          <div className='shortcuts'>
            {command.shortcuts.modifier && (
              <kbd
                style={{
                  backgroundColor: config?.shortcutBackground || '#82828220'
                }}
              >
                {command.shortcuts.modifier}
              </kbd>
            )}
            {command.shortcuts.keys.map((key, index) => (
              <kbd
                key={index}
                style={{
                  backgroundColor: config?.shortcutBackground || '#82828220'
                }}
              >
                {key}
              </kbd>
            ))}
          </div>
        )}
      </a>
      <span ref={bottomRef} className='scroll_ref' aria-hidden='true' />
    </div>
  )
}

export default Command
