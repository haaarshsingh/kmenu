![image](https://kmenu.hxrsh.in/banner.png)

<p align="center">
  <a href="https://kmenu.hxrsh.in/">
    <h2 align="center"></h2>
  </a>
</p> 
<p align="center">🌈 Animated and accessible React cmd+k interface</p>
<p align="center">
  <a href="https://kmenu.hxrsh.in">Demo</a>
    ·
  <a href="https://npmjs.com/package/kmenu">NPM</a>
 </p>

# 🚀 Quickstart

Install the [npm package](https://www.npmjs.com/package/kmenu)

```zsh
yarn add kmenu
```

### Adding commands 

After you've installed the package, you can now begin adding commands onto the command palette.

Here's a look at how you can create commands:

| Parameter | Description                                      | Type         | Optional | 
|-----------|--------------------------------------------------|--------------|----------|
| icon      | The icon displayed next to the command           | ReactElement | ✅       |
| text      | The text displayed on the command                | String       | ❌       |
| perform   | The action to perform                            | void         | ✅       |
| href      | The link to open                                 | void         | ✅       |
| newTab    | Whether or not the link should open in a new tab | void         | ✅       |
| keywords  | Search keywords for the command                  | string       | ✅       |
| category  | The category this command will go under          | string       | ❌       |

Here's an example of how to create the commands (using [TypeScript](https://typescriptlang.org/)): 

```ts
import {
  FiGlobe,
  FiCopy,
  FiDribbble,
  FiSearch,
  FiToggleRight
} from 'react-icons/fi'

const commands: CommandType[] = [
  {
    icon: <FiGlobe />,
    text: 'Website',
    href: 'https://hxrsh.in',
    keywords: 'harsh homepage site', 
    category: 'Social'
  },
  {
    icon: <i.Copy />,
    text: 'Copy URL', 
    perform: () => copyToClipboard(window.location.href), 
    category: 'Utility'
  },
  {
    icon: <FiDribbble />,
    text: 'Dribbble', 
    href: 'https://dribbble.com/harshhhdev',
    keywords: 'behance design web social'
    category: 'Social'
  },
  {
    icon: <FiSearch />,
    text: 'Search Documentation...'
    perform: () => setOpenMenu(1), 
    keywords: 'docs'
    category: 'Utility'
  },
  {
    icon: <FiToggleRight />,
    text: 'Toggle Theme',
    perform: () => setDarkMode((dark) => !dark), 
    keywords: 'light dark mode colors colours'
    category: 'Utility'
  }
]
```

### Customising the Palette

You can easily customise the colours on your command palette as well. Here's a list of properties that are customisable: 

_NOTE: ALL PROPERTIES ARE **OPTIONAL**_

| Parameter        | Description                                                  | Type         | Default             | 
|------------------|--------------------------------------------------------------|--------------|---------------------|
| paletteMaxHeight | The max height of the palette (px)                           | number       | 320px               |
| backdropColor    | The colour of the backdrop (include opacity)                 | string       | #00000020           |
| backdropBlur     | The backround blur of the backdrop in pixels                 | number       | 5px                 |
| backgroundColor  | The background colour of the palette                         | ntring       | #181818             |
| borderWidth      | Width of the border surrounding the palette                  | number       | 1px                 |
| borderColor      | The colour of the border surrounding the palette             | string       | #3F3F3F             |
| borderRadius     | The radius of the palette (px)                               | number       | 16px                |
| inputColor       | The colour of the text in the search bar                     | string       | #FFFFFF             |
| placeholderText  | The placeholder input text in the search bar                 | string       | "What do you need?" |
| headingColor     | The colour of the command category headings                  | string       | #777777             |
| commandInactive  | The colour of the icon and text when the command is inactive | string       | #777777             |
| commandActive    | The colour of the icon and text when the command is active   | string       | #FFFFFF             |
| barBackground    | The background colour of the active bar                      | string       | #FFFFFF             |
| barOpacity       | The opacity of the active bar                                | number (0-1) | 0.20                |

### Setting up the palette

Here are all the options available on the palette: 

| Parameter  | Description                                                      | Type                             | Optional | 
|------------|------------------------------------------------------------------|----------------------------------|----------|
| open       | The index of which palette is currently open                     | number                           | ❌       |
| setOpen    | The hook to handle the state for which palette is currently open | Dispatch<SetStateAction<number>> | ❌       |
| index      | The index of this palette                                        | number                           | ❌       |
| commands   | The commands for this palette to display                         | Command[]                        | ❌       |
| categories | The categories which the commands have been assigned to          | string[]                         | ❌       |
| config     | The configuration for this colour palette                        | PaletteConfig                    | ✅       |
| main       | Whether or not this is the first palette that'll be displayed    | boolean                          | ✅       |

Once you have added commands to the palette and configured it to you likings, you can add it into your application. Add in the CSS file for styling. Optionally, if you'd like to FULLY customise the styles on the palette to your likings then you can copy the [index.css file](https://github.com/harshhhdev/harshhhdev.github.io/blob/master/compiled/index.css) from the [repository](https://github.com/harshhhdev/kmenu) and import that instead. You'll also need to create a [useState](https://reactjs.org/docs/hooks-state.html) hook for handling the state.

```jsx
import { useState } from 'react'
import Palette, { Command, PaletteConfig } from 'kmenu'
import 'kmenu/dist/index.css'

const Palette = () => {
  const [open, setOpen] = useState(0)

  const commands: Command[] = [ /* ... */ ]
  const config: PaletteConfig = { /* ... */ }
  const categories: string[] = [ /* ... */ ]

  return (
    /* ... */
    <Palette
      open={open}
      setOpen={setOpen}
      index={1}
      commands={commands}
      config={config}
      main
    />
    /* ... */
  )
}
// ...
export default Palette
```

That's about all the configuration you'll need to do in order to get a basic command palette to work!

### Nested Palettes 

This library also provides support for nested palettes and commands. Here's an example to help you out:

```tsx
import { useState } from 'react'
import Palette, { Command, PaletteConfig } from 'kmenu'
import 'kmenu/dist/index.css'

const Palette = () => {
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
  ]

  const nestedExample: Command[] = [
    {
      icon: <FiGlobe />,
      text: 'Demo',
      href: 'https://kmenu.hxrsh.in',
      newTab: true,
      keywords: 'home',
      category: 'Resources'
    },
    {
      icon: <FiGlobe />,
      text: 'GitHub',
      href: 'https://github.com/harshhhdev/kmenu',
      newTab: true,
      keywords: 'source',
      category: 'Resources'
    },
  ]

  const config: PaletteConfig = { /* ... */ }
  const categories: string[] = [ /* ... */ ]

  return (
    /* ... */
    <Palette
      open={open}
      setOpen={setOpen}
      index={1}
      commands={mainCommands}
      config={config}
      main
    />
    <Palette
      open={open}
      setOpen={setOpen}
      index={2}
      commands={nestedExample}
      config={config}
    />
    /* ... */
  )
}
// ...
export default Palette
```

If this isn't enough, there's also an [example](https://github.com/harshhhdev/kmenu/blob/master/example) directory which you can clone and experiment around with to build nested routes!

### Using the useShortcut hook

This library also ships with a [custom React hook](https://reactjs.org/docs/hooks-custom.html) called `useShortcut` which you can use to define your own shortcuts within your application. 

| Parameter       | Description                                           | Type                       | Optional  | 
|-----------------|-------------------------------------------------------|----------------------------|-----------|
| targetKey       | The key that the shortcut is listening for            | string (must be valid key) | ✅       |
| modifier        | The modifier key which can will activate the shortcut | enum (shift/alt/a)         | ❌        |

Here's an example: 

```jsx
import { useShortcut } from 'kmenu'

const Palette = () => {
  const shiftS = useShortcut('s', 'shift')

  // ...
}
// ...
export default Palette
```

# 💻 Development

Run the project locally

```
git clone https://github.com/harshhhdev/kmenu.git
```

## Setting up the project

```zsh
cd kmenu

# install deps
yarn
```

## Starting server

```zsh
yarn start
```

This should compile an instance of your project to the `dist` folder

# 🔧 Tools Used

- [create-react-library](https://www.npmjs.com/package/create-react-library)
- [TypeScript](https://www.typescriptlang.org/)
- [Microbundle](https://github.com/developit/microbundle)
- [React](https://reactjs.org/)
- [Framer Motion](https://framer.com/motion/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

# 🤞 Contributing

After setting up the project, and making changes:

```git
git add .
git commit -m "commit message"
git push YOUR_REPO_URL YOUR_BRANCH
```

# Inspirations 

- [Vercel](https://vercel.com)
- [Ultra](https://ultra.tf) 
- [GitHub](https://github.com)
- [kbar](https://kbar.vercel.app)
- [react-cmdk](https://react-cmdk.com/)
- [CommandBar](https://commandbar.com)
