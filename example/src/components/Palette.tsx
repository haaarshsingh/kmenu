/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Command,
  CommandMenu,
  CommandWrapper,
  useCommands,
  useKmenu
} from 'kmenu'
import React, { FC } from 'react'
import {
  FiAlertCircle,
  FiCode,
  FiCommand,
  FiCopy,
  FiDribbble,
  FiEdit2,
  FiGithub,
  FiGitPullRequest,
  FiGlobe,
  FiMessageSquare,
  FiPlus,
  FiSearch,
  FiSettings,
  FiTwitter,
  FiZap
} from 'react-icons/fi'

const Palette: FC = () => {
  const { setOpen } = useKmenu()

  const main: Command[] = [
    {
      category: 'Utility',
      commands: [
        {
          icon: <FiSearch />,
          text: 'Search Documentation',
          perform: () => setOpen(2)
        },
        {
          icon: <FiCopy />,
          text: 'Copy URL'
        }
      ]
    },
    {
      category: 'Links',
      commands: [
        {
          icon: <FiGithub />,
          text: 'Source Code',
          keywords: 'GitHub',
          shortcuts: { keys: ['g', 'h'] },
          href: 'https://github.com/harshhhdev/kmenu',
          newTab: true
        },
        {
          icon: <FiAlertCircle />,
          text: 'Issues',
          href: 'https://github.com/harshhhdev/kmenu/issues',
          newTab: true
        },
        {
          icon: <FiGitPullRequest />,
          text: 'Pull Requests',
          href: 'https://github.com/harshhhdev/kmenu/pulls',
          newTab: true
        },
        {
          icon: <FiMessageSquare />,
          text: 'Discussions',
          href: 'https://github.com/harshhhdev/kmenu/discussions',
          newTab: true
        }
      ]
    },
    {
      category: 'Creator',
      commands: [
        {
          icon: <FiGlobe />,
          text: 'Website',
          href: 'https://hxrsh.in',
          newTab: true
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
        }
      ]
    }
  ]

  const nested: Command[] = [
    {
      category: 'Navigation',
      commands: [
        {
          icon: <FiZap />,
          text: 'Quickstart',
          href: 'https://github.com/harshhhdev/kmenu#-quickstart',
          newTab: true
        },
        {
          icon: <FiCommand />,
          text: 'Using the Provider',
          href: 'https://github.com/harshhhdev/kmenu/#using-the-provider',
          newTab: true
        },
        {
          icon: <FiPlus />,
          text: 'Adding Commands',
          href: 'https://github.com/harshhhdev/kmenu#adding-commands',
          newTab: true
        },
        {
          icon: <FiCode />,
          text: 'useKmenu Hook',
          href: 'https://github.com/harshhhdev/kmenu/#usekmenu-hook',
          newTab: true
        },
        {
          icon: <FiCode />,
          text: 'useCommands Hook',
          href: 'https://github.com/harshhhdev/kmenu/#usecommands-hook',
          newTab: true
        },
        {
          icon: <FiEdit2 />,
          text: 'Customising the Menu',
          href: 'https://github.com/harshhhdev/kmenu#customising-the-menu',
          newTab: true
        },
        {
          icon: <FiSettings />,
          text: 'Setting up the Menu',
          href: 'https://github.com/harshhhdev/kmenu#setting-up-the-menu',
          newTab: true
        },
        {
          icon: <FiCommand />,
          text: 'Nested Menus',
          href: 'https://github.com/harshhhdev/kmenu#nested-menus',
          newTab: true
        },
        {
          icon: <FiCode />,
          text: 'useShortcut Hook',
          href: 'https://github.com/harshhhdev/kmenu#useshortcut-hook',
          newTab: true
        }
      ]
    }
  ]

  const [mainCommands] = useCommands(main)
  const [navigationCommands] = useCommands(nested)

  return (
    <CommandWrapper>
      <CommandMenu
        commands={mainCommands}
        crumbs={['Home']}
        index={1}
        placeholder='Placeholder Two'
      />
      <CommandMenu
        commands={navigationCommands}
        crumbs={['Home', 'Search']}
        index={2}
      />
    </CommandWrapper>
  )
}

export default Palette
