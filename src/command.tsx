import React, { FC, Dispatch, SetStateAction, useRef, useEffect } from 'react'
import useInView from './hooks/useInView'
import { useShortcut } from './hooks/useShortcut'
import { CategoryCommand, Config } from './types'
import run from './utils/run'
import styles from './styles/menu.module.css'
import { motion } from 'framer-motion'

const Command: FC<{
  command: CategoryCommand
  onMouseEnter: () => void
  isSelected: boolean
  setOpen: Dispatch<SetStateAction<number>>
  config?: Partial<Config>
}> = ({ onMouseEnter, isSelected, command, setOpen, config }) => {
  /* Refs for the top and bottom of the span for scroll navigation */
  const topRef = useRef<HTMLSpanElement>(null)
  const bottomRef = useRef<HTMLSpanElement>(null)
  /* Check if the user presses the enter key to run the command */
  const enter = useShortcut({ targetKey: 'Enter' })

  /* Use a custom hook that uses the IntersectionObserver API to check if the command is in view from the top and the bottom */
  const inViewTop = useInView({ ref: topRef })
  const inViewBottom = useInView({ ref: bottomRef })

  /* Function determining whether or not to scroll the div and when to run commands */
  useEffect(() => {
    if (isSelected && (!inViewTop || !inViewBottom))
      // eslint-disable-next-line
      bottomRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      })

    /* If the user presses the enter key, then run the command */
    if (enter && isSelected) {
      /* Close the menu on select if the closeOnComplete value isn't set to true */
      if (!command.closeOnComplete) setOpen(0)
      /* Pass the entire command object in the run function */
      run(command)
    }
  }, [isSelected, enter])

  return (
    <div role='option' aria-selected={isSelected}>
      <span ref={topRef} aria-hidden='true' />
      <a
        className={styles.command}
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
            className={styles.selected}
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
        <div className={styles.info_wrapper}>
          {command.icon && command.icon}
          <p className={styles.text}>{command.text}</p>
        </div>
        {command.shortcuts && (
          <div className={styles.shortcuts}>
            {command.shortcuts.modifier && (
              <kbd>{command.shortcuts.modifier}</kbd>
            )}
            {command.shortcuts.keys.map((key, index) => (
              <kbd key={index}>{key}</kbd>
            ))}
          </div>
        )}
      </a>
      <span ref={bottomRef} className={styles.scroll_ref} aria-hidden='true' />
    </div>
  )
}

export default Command
