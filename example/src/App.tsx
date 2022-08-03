import React, { useState } from 'react'
import { Command, Palette, Provider, useCommands } from 'kmenu'
import 'kmenu/dist/index.css'
import {
  FiGlobe,
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiArrowRight,
  FiDownloadCloud,
  FiBook,
  FiAlertOctagon
} from 'react-icons/fi'
import styles from './styles/example.module.css'

const App = () => {
  const [open, setOpen] = useState(0)
  // const [index, toggle] = useKmenu()

  const mainCommands: Command[] = [
    {
      category: 'Socials',
      commands: [
        {
          icon: <FiGlobe />,
          text: 'Website',
          href: 'https://hxrsh.in',
          newTab: true,
          keywords: 'home'
        },

        {
          icon: <FiTwitter />,
          text: 'Twitter',
          href: 'https://twitter.com/harshhhdev',
          newTab: true,
          shortcuts: { modifier: 'alt', keys: ['t'] }
        },
        {
          icon: <FiGithub />,
          text: 'GitHub',
          href: 'https://github.com/harshhhdev',
          newTab: true,
          shortcuts: { keys: ['g', 'h'] }
        },
        {
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
    },
    {
      category: 'Utility',
      commands: [
        {
          icon: <FiArrowRight />,
          text: 'Nested Example...',
          perform: () => setOpen(2)
        }
      ]
    }
  ]

  const nestedCommands: Command[] = [
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

  const main = useCommands(mainCommands)
  const nested = useCommands(nestedCommands)

  return (
    <Provider
      values={{
        open: open,
        setOpen: setOpen
      }}
    >
      <Palette index={1} commands={main} main />
      <Palette index={2} commands={nested} />
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
