/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Command, Palette, Provider, useCommands } from 'kmenu'
import 'kmenu/dist/index.css'
import {
  FiGlobe,
  FiGithub,
  FiDownloadCloud,
  FiBook,
  FiAlertOctagon
} from 'react-icons/fi'
import styles from './styles/example.module.css'

const App = () => {
  const [open, setOpen] = useState(0)
  // const [index, toggle] = useKmenu()

  const nested: Command[] = [
    {
      category: 'Information',
      commands: [
        {
          icon: <FiGlobe />,
          text: 'Demo',
          href: 'https://kmenu.hxrsh.in',
          newTab: true,
          keywords: 'website'
        },
        {
          icon: <FiGithub />,
          text: 'Source',
          href: 'https://github.com/harshhhdev/kmenu',
          newTab: true,
          keywords: 'github'
        },
        {
          icon: <FiBook />,
          text: 'Documentation',
          href: 'https://github.com/harshhhdev/kmenu/blob/master/README.md',
          newTab: true,
          keywords: 'docs'
        },
        {
          icon: <FiDownloadCloud />,
          text: 'NPM',
          href: 'https://npmjs.com/package/kmenu',
          newTab: true,
          keywords: 'download'
        },
        {
          icon: <FiAlertOctagon />,
          text: 'Issues',
          href: 'https://github.com/harshhhdev/kmenu/issues',
          newTab: true
        }
      ]
    }
  ]

  const [cmds, setCmds] = useCommands()
  const [n] = useCommands(nested)

  useEffect(() => {
    setCmds([{ category: 'Example', commands: [{ text: 'Test' }] }])
  }, [])

  return (
    <Provider
      values={{
        open: open,
        setOpen: setOpen
      }}
    >
      <Palette index={1} commands={cmds} main />
      <Palette index={2} commands={n} />
      <main className={styles.main}>
        <h1 className={styles.title}>Hello, World!</h1>
        <p className={styles.description}>
          This is an example of <a href='https://kmenu.hxrsh.in'>kmenu</a> live
          in action! To get started, check out the{' '}
          <a href='https://github.com/harshhhdev/kmenu'>GitHub</a>.
        </p>
        {/* <p>{index}</p>
        <button onClick={() => toggle()}>Toggle</button> */}
      </main>
    </Provider>
  )
}

export default App
