/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { MenuProvider } from 'kmenu'
import 'kmenu/dist/index.css'
import styles from './styles/example.module.css'
import Palette from './components/Palette'

const App = () => {
  return (
    <MenuProvider>
      <main className={styles.main}>
        <h1 className={styles.title}>Hello, World!</h1>
        <p className={styles.description}>
          This is an example of <a href='https://kmenu.hxrsh.in'>kmenu</a> live
          in action! To get started, check out the{' '}
          <a href='https://github.com/harshhhdev/kmenu'>GitHub</a>.
        </p>
        <Palette />
      </main>
    </MenuProvider>
  )
}

export default App
