import {
  Command,
  CommandMenu,
  CommandWrapper,
  useCommands,
  useKmenu,
} from 'kmenu'
import { BsOption } from 'react-icons/bs'
import { FiCheck, FiRotateCw, FiX } from 'react-icons/fi'

const generate = (length: number) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    result += characters.charAt(randomIndex)
  }

  return result
}

export default function Modal() {
  const { setInput } = useKmenu()

  const main: Command[] = [
    {
      category: 'Options',
      commands: [
        {
          icon: <FiCheck />,
          text: 'Confirm',
          shortcuts: { modifier: <BsOption />, keys: ['1'] },
        },
        {
          icon: <FiX />,
          text: 'Cancel',
          shortcuts: { modifier: <BsOption />, keys: ['2'] },
        },
        {
          icon: <FiRotateCw />,
          text: 'Generate Password',
          perform: () => setInput(generate(12)),
        },
      ],
    },
  ]

  const [mainCommands] = useCommands(main)

  return (
    <CommandWrapper>
      <CommandMenu
        commands={mainCommands}
        crumbs={['OAuth', 'Password']}
        index={1}
        placeholder='Enter new password...'
        preventSearch
      />
    </CommandWrapper>
  )
}
