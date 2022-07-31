import React, { useState } from 'react'
import { Command, Palette } from 'kmenu'
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

  const mainCommands: Command[] = [
    {
      icon: <FiGlobe />,
      text: 'Website',
      href: 'https://hxrsh.in',
      newTab: true,
      keywords: 'home',
      category: 'Socials'
    },
    {
      icon: <FiArrowRight />,
      text: 'Nested Example...',
      perform: () => setOpen(2),
      category: 'Utility'
    },
    {
      icon: <FiTwitter />,
      text: 'Twitter',
      href: 'https://twitter.com/harshhhdev',
      newTab: true,
      category: 'Socials',
      shortcuts: { modifier: 'alt', keys: ['t'] }
    },
    {
      icon: <FiGithub />,
      text: 'GitHub',
      href: 'https://github.com/harshhhdev',
      newTab: true,
      category: 'Socials',
      shortcuts: { keys: ['g', 'h'] }
    },
    {
      text: 'Dribbble',
      href: 'https://dribbble.com/harshhhdev',
      newTab: true,
      category: 'Socials'
    },
    {
      icon: <FiLinkedin />,
      text: 'Linkedin',
      href: 'https://linkedin.com/in/harshhhdev',
      newTab: true,
      category: 'Socials'
    }
  ]

  const nestedCommands: Command[] = [
    {
      icon: <FiGlobe />,
      text: 'Demo',
      href: 'https://kmenu.hxrsh.in',
      newTab: true,
      keywords: 'website',
      category: 'Information'
    },
    {
      icon: <FiGithub />,
      text: 'Source',
      href: 'https://github.com/harshhhdev/kmenu',
      newTab: true,
      keywords: 'github',
      category: 'Information'
    },
    {
      icon: <FiBook />,
      text: 'Documentation',
      href: 'https://github.com/harshhhdev/kmenu/blob/master/README.md',
      newTab: true,
      keywords: 'docs',
      category: 'Information'
    },
    {
      icon: <FiDownloadCloud />,
      text: 'NPM',
      href: 'https://npmjs.com/package/kmenu',
      newTab: true,
      keywords: 'download',
      category: 'Information'
    },
    {
      icon: <FiAlertOctagon />,
      text: 'Issues',
      href: 'https://github.com/harshhhdev/kmenu/issues',
      newTab: true,
      category: 'Information'
    }
  ]

  return (
    <div>
      <Palette
        open={open}
        setOpen={setOpen}
        index={1}
        commands={mainCommands}
        categories={['Socials', 'Utility']}
        main
      />
      <Palette
        open={open}
        setOpen={setOpen}
        index={2}
        commands={nestedCommands}
        categories={['Information']}
      />
      <main className={styles.main}>
        <h1 className={styles.title}>Hello, World!</h1>
        <p className={styles.description}>
          This is an example of <a href='https://kmenu.hxrsh.in'>kmenu</a> live
          in action! To get started, check out the{' '}
          <a href='https://github.com/harshhhdev/kmenu'>GitHub</a>.
        </p>
      </main>
    </div>
  )
}

export default App
