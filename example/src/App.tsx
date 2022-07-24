import React, { useState } from 'react'

import Palette, { ColorConfig, CommandType } from 'kmenu'
import 'kmenu/dist/index.css'

import {
  FiGlobe,
  FiTwitter,
  FiGithub,
  FiDribbble,
  FiLinkedin
} from 'react-icons/fi'

const App = () => {
  const [open, setOpen] = useState(false)

  const colours: Partial<ColorConfig> = {
    backdropOpacity: 0.2,
    backdrop: '#000'
  }

  const commands: CommandType[] = [
    {
      icon: <FiGlobe />,
      text: 'Website'
    },
    {
      icon: <FiTwitter />,
      text: 'Twitter'
    },
    {
      icon: <FiGithub />,
      text: 'GitHub'
    },
    {
      icon: <FiDribbble />,
      text: 'Dribbble'
    },
    {
      icon: <FiLinkedin />,
      text: 'Linkedin'
    }
  ]

  return (
    <Palette
      open={open}
      setOpen={setOpen}
      commands={commands}
      colors={colours}
    />
  )
}

export default App
