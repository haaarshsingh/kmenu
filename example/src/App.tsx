import React, { useState } from 'react'
import Palette, { Command } from 'kmenu'
import 'kmenu/dist/index.css'
import {
  FiGlobe,
  FiTwitter,
  FiGithub,
  FiDribbble,
  FiLinkedin,
  FiArrowRight,
  FiDownloadCloud,
  FiBook,
  FiAlertOctagon
} from 'react-icons/fi'
import styles from './styles/example.module.css'

const App = () => {
  const [open, setOpen] = useState(0)

  const mainCommands: Command[] = [
    {
      icon: <FiGlobe />,
      text: 'Website',
      href: 'https://hxrsh.in',
      newTab: true,
      keywords: 'home'
    },
    {
      icon: <FiArrowRight />,
      text: 'Nested Example...',
      perform: () => setOpen(2)
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

  const nestedCommands: Command[] = [
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

  return (
    <div>
      <Palette
        open={open}
        setOpen={setOpen}
        index={1}
        commands={mainCommands}
        main
      />
      <Palette
        open={open}
        setOpen={setOpen}
        index={2}
        commands={nestedCommands}
      />
      <main className={styles.main}>
        <h1 className={styles.title}>Hello, World!</h1>
        <p className={styles.description}>
          This is an example of <a href='https://kmenu.hxrsh.in'>kmenu</a> live
          in action! To get started, check out the{' '}
          <a href='https://github.com/harshhhdev/kmenu'>GitHub</a>
        </p>
      </main>
    </div>
  )
}

export default App
