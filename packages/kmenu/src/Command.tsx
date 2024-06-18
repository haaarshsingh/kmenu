import React, { FC, useRef, useEffect, useState, useContext } from 'react'
import useInView from './hooks/useInView'
import { useShortcut } from './hooks/useShortcut'
import { InnerCommand } from './types'
import run from './utils/run'
import { motion } from 'framer-motion'
import Checkbox from './Checkbox'
import { MenuContext } from './MenuProvider'

export default (({ onMouseEnter, isSelected, command }) => {
  const { setOpen } = useContext(MenuContext)
  const [checked, setChecked] = useState(command.checkbox?.checked)

  const select = () => {
    if (isSelected) onClick()
  }

  const onClick = () => {
    if (command.checkbox) setChecked((checked) => !checked)
    run(command)

    if (command.closeOnComplete) setOpen(0)
  }

  const topRef = useRef<HTMLSpanElement>(null)
  const bottomRef = useRef<HTMLSpanElement>(null)
  const enter = useShortcut({ targetKey: 'Enter', handler: select })

  const inViewTop = useInView({ ref: topRef })
  const inViewBottom = useInView({ ref: bottomRef })

  useEffect(() => {
    if (isSelected && (!inViewTop || !inViewBottom))
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
  }, [isSelected, enter])

  return (
    <div role='option' aria-selected={isSelected}>
      <span ref={topRef} aria-hidden='true' />
      {command.anchor ? (
        <command.anchor
          className='command'
          onMouseMove={onMouseEnter}
          onClick={() => run(command)}
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
              transition={{ type: 'spring', stiffness: 1000, damping: 80 }}
            />
          )}
          <div className='info_wrapper'>
            {command.icon && command.icon}
            <p className='command_text'>{command.text}</p>
          </div>
          {command.shortcuts && (
            <div className='shortcuts'>
              {command.shortcuts.modifier && (
                <kbd>{command.shortcuts.modifier}</kbd>
              )}
              {command.shortcuts.keys.map((key, index) => (
                <kbd key={index}>{key}</kbd>
              ))}
            </div>
          )}
        </command.anchor>
      ) : (
        <a
          className='command'
          onMouseMove={onMouseEnter}
          onClick={onClick}
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
                damping: 70,
              }}
            />
          )}
          <div className='info_wrapper'>
            {command.icon && command.icon}
            {typeof checked === 'boolean' && (
              <Checkbox checked={checked} id={command.text} />
            )}
            <p className='command_text'>{command.text}</p>
          </div>
          {command.shortcuts && (
            <div className='shortcuts'>
              {command.shortcuts.modifier && (
                <kbd>{command.shortcuts.modifier}</kbd>
              )}
              {command.shortcuts.keys.map((key, index) => (
                <kbd key={index}>{key}</kbd>
              ))}
            </div>
          )}
        </a>
      )}
      <span ref={bottomRef} className='scroll_ref' aria-hidden='true' />
    </div>
  )
}) as FC<{
  command: InnerCommand
  onMouseEnter: () => void
  isSelected: boolean
}>
