import {
  Command,
  CommandMenu,
  CommandWrapper,
  useCommands,
  useKmenu,
} from 'kmenu'
import { Dispatch, SetStateAction } from 'react'
import { BsShift } from 'react-icons/bs'
import { FaRegHandScissors } from 'react-icons/fa'
import {
  FiCommand,
  FiCopy,
  FiGrid,
  FiMoon,
  FiPlus,
  FiSun,
  FiUsers,
} from 'react-icons/fi'
import { HiOutlineCursorClick, HiOutlineDesktopComputer } from 'react-icons/hi'
import { IoFishOutline } from 'react-icons/io5'
import { LiaDragonSolid, LiaHatCowboySideSolid } from 'react-icons/lia'
import { LuBird, LuWrench } from 'react-icons/lu'

export const Nested = ({
  setDark,
}: {
  setDark: Dispatch<SetStateAction<boolean>>
}) => {
  const { setOpen } = useKmenu()

  const setSystemTheme = () => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    if (media.matches) setDark(true)
    else setDark(false)
  }

  const main: Command[] = [
    {
      category: 'Projects',
      commands: [
        {
          icon: <FiGrid />,
          text: 'Search Projects...',
          shortcuts: { modifier: <BsShift />, keys: ['P'] },
          perform: () => setOpen(2),
        },
        {
          icon: <FiPlus />,
          text: 'Create New Project',
        },
      ],
    },
    {
      category: 'Teams',
      commands: [
        {
          icon: <FiUsers />,
          text: 'Search Teams...',
          shortcuts: { modifier: <BsShift />, keys: ['T'] },
          perform: () => setOpen(3),
        },
        {
          icon: <FiPlus />,
          text: 'Create New Team',
        },
      ],
    },
    {
      category: 'General',
      commands: [
        {
          icon: <HiOutlineDesktopComputer />,
          text: 'Change Theme',
          shortcuts: { modifier: <BsShift />, keys: ['T'] },
          perform: () => setOpen(4),
        },
        {
          icon: <FiCopy />,
          text: 'Copy Current URL',
        },
      ],
    },
  ]

  const projects: Command[] = [
    {
      category: 'Projects',
      commands: [
        {
          icon: <FiCommand />,
          text: 'kmenu',
        },
        {
          icon: <HiOutlineDesktopComputer />,
          text: 'www',
        },
        {
          icon: <FaRegHandScissors />,
          text: 'snip',
        },
        {
          icon: <LuWrench />,
          text: 'dotfiles',
        },
        {
          icon: <HiOutlineCursorClick />,
          text: 'Custom Cursor React',
        },
      ],
    },
  ]

  const teams: Command[] = [
    {
      category: 'Teams',
      commands: [
        {
          icon: <LiaDragonSolid />,
          text: 'Dragon',
        },
        {
          icon: <LiaHatCowboySideSolid />,
          text: 'Cowboy',
        },
        {
          icon: <LuBird />,
          text: 'Bird',
        },
        {
          icon: <IoFishOutline />,
          text: 'Fish',
        },
      ],
    },
  ]

  const theme: Command[] = [
    {
      category: 'Theme',
      commands: [
        {
          icon: <FiMoon />,
          text: 'Change Theme to Dark',
          perform: () => setDark(true),
        },
        {
          icon: <FiSun />,
          text: 'Change Theme to Light',
          perform: () => setDark(false),
        },
        {
          icon: <HiOutlineDesktopComputer />,
          text: 'Change Theme to System',
          perform: () => setSystemTheme(),
        },
      ],
    },
  ]

  const [mainCommands] = useCommands(main)
  const [projectCommands] = useCommands(projects)
  const [teamCommands] = useCommands(teams)
  const [themeCommands] = useCommands(theme)

  return (
    <CommandWrapper>
      <CommandMenu
        commands={mainCommands}
        crumbs={['Home']}
        index={1}
        placeholder="Whatcha lookin' for?"
      />
      <CommandMenu
        commands={projectCommands}
        crumbs={['Home', 'Projects']}
        index={2}
        placeholder='Search projects...'
      />
      <CommandMenu
        commands={teamCommands}
        crumbs={['Home', 'Teams']}
        index={3}
        placeholder='Search teams...'
      />
      <CommandMenu
        commands={themeCommands}
        crumbs={['Home', 'Theme']}
        index={4}
        placeholder='Change theme...'
      />
    </CommandWrapper>
  )
}
