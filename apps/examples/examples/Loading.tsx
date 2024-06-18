import {
  Command,
  CommandMenu,
  CommandWrapper,
  useCommands,
  useKmenu,
} from 'kmenu'
import React, { FC, useEffect, useState } from 'react'
import {
  FiCommand,
  FiCopy,
  FiGrid,
  FiMoon,
  FiPlus,
  FiSun,
  FiUsers,
} from 'react-icons/fi'
import { BsShift } from 'react-icons/bs'
import { HiOutlineCursorClick, HiOutlineDesktopComputer } from 'react-icons/hi'
import { FaRegHandScissors } from 'react-icons/fa'
import { LuBird, LuWrench } from 'react-icons/lu'
import { LiaDragonSolid, LiaHatCowboySideSolid } from 'react-icons/lia'
import { IoFishOutline } from 'react-icons/io5'

const Palette: FC = () => {
  const { open, setOpen } = useKmenu()

  const main: Command[] = [
    {
      category: 'Projects',
      commands: [
        {
          icon: <FiGrid />,
          text: 'Fetch Projects...',
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
        },
        {
          icon: <FiSun />,
          text: 'Change Theme to Light',
        },
        {
          icon: <HiOutlineDesktopComputer />,
          text: 'Change Theme to System',
        },
      ],
    },
  ]

  const empty: Command[] = []

  const [mainCommands] = useCommands(main)
  const [projectCommands, setProjectCommands] = useCommands(empty)
  const [teamCommands, setTeamCommands] = useCommands(empty)
  const [themeCommands] = useCommands(theme)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open === 2) {
      setLoading(true)
      setProjectCommands(projects)
      setTimeout(() => setLoading(false), 2000)
    }

    if (open !== 3) {
      setLoading(true)

      setTeamCommands(teams)
      setTimeout(() => setLoading(false), 1000)
    }
  }, [open, setOpen])

  return (
    <CommandWrapper>
      <CommandMenu
        commands={mainCommands}
        crumbs={['Home']}
        index={1}
        placeholder='Placeholder Two'
      />
      <CommandMenu
        commands={projectCommands}
        crumbs={['Home', 'Projects']}
        index={2}
        loadingPlaceholder={<LoadingSpinner />}
        loadingState={loading}
      />
      <CommandMenu
        commands={teamCommands}
        crumbs={['Home', 'Teams']}
        index={3}
        placeholder='Search teams...'
        loadingPlaceholder={<LoadingSpinner />}
        loadingState={loading}
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

const LoadingSpinner = () => (
  <div className='spinner'>
    <div />
    <p>Fetching data...</p>
  </div>
)

export default Palette
