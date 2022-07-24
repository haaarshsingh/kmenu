import React, { useState } from 'react'

import Palette, { Command } from 'kmenu'
import 'kmenu/dist/index.css'

import {
  FiGlobe,
  FiTwitter,
  FiGithub,
  FiDribbble,
  FiLinkedin,
  FiArrowRight
} from 'react-icons/fi'

const App = () => {
  const [open, setOpen] = useState(0)

  const commands: Command[] = [
    {
      icon: <FiGlobe />,
      text: 'Website',
      href: 'https://hxrsh.in',
      newTab: true,
      keywords: 'home'
    },
    {
      icon: <FiArrowRight />,
      text: 'Nested Example...'
    },
    {
      icon: <FiTwitter />,
      text: 'Twitter',
      href: 'https://twitter.com/harshhhdev',
      newTab: true
    },
    {
      icon: <FiGithub />,
      text: 'GitHub',
      href: 'https://github.com/harshhhdev',
      newTab: true
    },
    {
      icon: <FiDribbble />,
      text: 'Dribbble',
      href: 'https://dribbble.com/harshhhdev',
      newTab: true
    },
    {
      icon: <FiLinkedin />,
      text: 'Linkedin',
      href: 'https://linkedin.com/in/harshhhdev',
      newTab: true
    }
  ]

  return (
    <div>
      <Palette open={open} setOpen={setOpen} index={1} commands={commands} />
      <div>
        <h1>Hello, World!</h1>
      </div>
    </div>
  )
}

export default App
