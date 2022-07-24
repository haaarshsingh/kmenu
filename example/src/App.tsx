import React, { useState } from 'react'

import Palette, { ColorConfig, Command } from 'kmenu'
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

  const colours: ColorConfig = {
    backdropColor: '#00000090',
    backdropBlur: 5,
    inputColor: '#000',
    borderRadius: 30,
    commandInactive: '#000',
    barBackground: '#000',
    barOpacity: 0.2
  }

  const commands: Command[] = [
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
    <div>
      <Palette
        open={open}
        setOpen={setOpen}
        commands={commands}
        colors={colours}
      />
      <div>
        <h1>Hello, World!</h1>
      </div>
    </div>
  )
}

export default App
