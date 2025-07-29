import { Command, CommandMenu, CommandWrapper, useCommands } from 'kmenu'
import { BsShift } from 'react-icons/bs'
import { FiCopy, FiGrid, FiPlus, FiUsers } from 'react-icons/fi'
import { HiOutlineDesktopComputer } from 'react-icons/hi'

export const Basic = () => {
  const main: Command[] = [
    {
      category: 'Projects',
      commands: [
        {
          icon: <FiGrid />,
          text: 'Search Projects...',
          shortcuts: { modifier: <BsShift />, keys: ['P'] },
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
        },
        {
          icon: <FiCopy />,
          text: 'Copy Current URL',
        },
      ],
    },
  ]

  const [mainCommands] = useCommands(main)

  return (
    <CommandWrapper>
      <CommandMenu
        commands={mainCommands}
        crumbs={['Home']}
        index={1}
        placeholder="Whatcha lookin' for?"
      />
    </CommandWrapper>
  )
}
