import React from 'react'
import { MenuProvider } from 'kmenu'
import 'kmenu/dist/index.css'
import Palette from './components/Palette'
import Intro from './components/Intro'

const App = () => {
  return (
    <MenuProvider>
      <Palette />
      <Intro />
    </MenuProvider>
  )
}

export default App
