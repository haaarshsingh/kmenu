import { motion } from 'framer-motion'
import React from 'react'

const tickVariants = {
  checked: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.1,
      delay: 0,
    },
  },
  unchecked: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
}

export const Checkbox = ({ checked, id }: { checked: boolean; id: string }) => {
  return (
    <button className='checkbox-container'>
      <input
        type='checkbox'
        className='checkbox'
        id={id
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')}
        checked={checked}
      />
      <div className='checkbox-check-container'>
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='3.5'
          stroke='currentColor'
          className='checkbox-check'
          initial={false}
          animate={checked ? 'checked' : 'unchecked'}
        >
          <motion.path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.5 12.75l6 6 9-13.5'
            variants={tickVariants}
          />
        </motion.svg>
      </div>
    </button>
  )
}
