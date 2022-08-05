import React, { FC } from 'react'
import { CommandMenu, Command, useCommands, useKmenu } from 'kmenu'
import {
  FiGlobe,
  FiGithub,
  FiDownloadCloud,
  FiBook,
  FiAlertOctagon,
  FiArrowRight,
  FiLinkedin,
  FiTwitter
} from 'react-icons/fi'

const CommandPalette: FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  const [input, open, toggle, setOpen] = useKmenu()

  const main: Command[] = [
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

  const [mainCommands] = useCommands(main)
  const [nestedCommands] = useCommands(nested)

  return (
    <>
      <CommandMenu index={1} commands={mainCommands} main />
      <CommandMenu index={2} commands={nestedCommands} />
    </>
  )
}

export default CommandPalette
