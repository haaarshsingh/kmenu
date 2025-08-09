![image](https://kmenu.harshsingh.me/og.png)

<p align="center">
  <a href="https://kmenu.harshsingh.me/">
    <h2 align="center">kmenu</h2>
  </a>
</p>

<p align="center">The perfect ⌘K menu </p>
<p align="center">
  <a href="https://kmenu.harshsingh.me">Demo</a>
    ·
  <a href="https://npmjs.com/package/kmenu">NPM</a>
      ·
  <a href="https://www.producthunt.com/products/kmenu">Product Hunt</a>
      ·
  <a href="https://react-ts-fotwq9.stackblitz.io">StackBlitz</a>
      ·
  <a href="https://codesandbox.io/p/sandbox/kmenu-4r2nqf">CodeSandbox</a>
 </p>

## Consulting

If you're a startup or founder using this for your application and need some help setting it up, or perhaps even need a separate cmdk interface tailored to your application, you can reach out to at [h@harshsingh.me](mailto:h@harshsingh.me).

## Quickstart

Having trouble? Unsure of something? Feel free to ask away in the [discussions](https://github.com/haaarshsingh/kmenu/discussions).

Install the [NPM package](https://www.npmjs.com/package/kmenu):

```zsh
npm install kmenu
pnpm install kmenu
yarn add kmenu
bun add kmenu
```

### Using the Provider

After you install, you must wrap your application around the `MenuProvider` component. If your application has some values (padding/margin/etc) which override the styles of the menu, you need to explicitly define the height of each _command component_ and each _section_ in your code. Here's a look:

| Parameter  | Description                                          | Type       | Optional |
| ---------- | ---------------------------------------------------- | ---------- | -------- |
| dimensions | Height values of different elements in the menu (px) | Dimensions | ✅       |

Now, here's a look at the dimensions object:

| Parameter     | Description                                                       | Type   | Default | Optional |
| ------------- | ----------------------------------------------------------------- | ------ | ------- | -------- |
| commandHeight | The height of each command in the palette (px)                    | number | 54      | ✅       |
| sectionHeight | The height of each category/section in the palette (px)           | number | 31      | ✅       |
| commands      | The maximum number of commands displayed on menu without overflow | number | 5       | ✅       |

Here's how you'd use your menu provider:

```tsx
import { MenuProvider, Dimensions } from 'kmenu'

export const Menu = ({ children }) => {
  const dimensions: Dimensions = {}
  return <MenuProvider dimensions={dimensions}>{children}</MenuProvider>
}
```

### Commands

The commands are broken up into two arrays: an array that contains the different categories of the commands, and another array contains the commands itself. Here's how you can define categories:

| Parameter   | Description                                                             | Type    | Optional |
| ----------- | ----------------------------------------------------------------------- | ------- | -------- |
| category    | The name of the category the command will be displayed in               | string  | ❌       |
| commands    | An array of commands passed onto the category                           | Command | ❌       |
| subCommands | An array of commands passed onto the category only accessible by search | Command | ✅       |

Here's how you create commands:

| Parameter       | Description                                               | Type         | Optional |
| --------------- | --------------------------------------------------------- | ------------ | -------- |
| icon            | The icon displayed next to the command                    | ReactElement | ✅       |
| text            | The text displayed on the command                         | string       | ❌       |
| perform         | The action to perform                                     | void         | ✅       |
| href            | The link to open                                          | void         | ✅       |
| newTab          | Whether or not the link should open in a new tab          | boolean      | ✅       |
| keywords        | Search keywords for the command                           | string       | ✅       |
| shorcuts        | The keyboard shortcuts displayed on the command           | Shortcut     | ✅       |
| closeOnComplete | Whether the menu should close after command executes      | boolean      | ✅       |
| anchor          | Allow for custom HTML to be passed as the anchor property | NavLink      | ✅       |
| checkbox        | Add a checkbox to the command                             | Checkbox     | ✅       |

We can create our commands array like this:

```tsx:CommandMenu.tsx
import type { Command } from 'kmenu'

const main: Command[] = [
  {
    category: 'Utility',
    commands: [
      {
        icon: <Dashboard />,
        text: 'Dashboard',
        href: '/dashboard',
        keywords: ['home', 'back'],
      },
      {
        icon: <Cloud />,
        text: 'Deployments',
        href: '/deployments',
      },
      {
        icon: <ArrowLeft />,
        text: 'Previous',
        perform: () => navigateToPreviousPage(),
        keywords: ['back']
      },
    ],
    subCommands: [
      {
        icon: <ExternalLink />,
        text: 'Home',
        href: '/',
        newTab: true,
      },
    ],
  },
]
```

#### Shortcuts

Each shortcut can have two target keys and a modifier:

| Parameter | Description                                           | Type                                   | Optional |
| --------- | ----------------------------------------------------- | -------------------------------------- | -------- |
| keys      | The key(s) that the shortcut is listening for         | [string, string?] (must be valid)      | ❌       |
| modifier  | The modifier key which can will activate the shortcut | string (must be valid) or ReactElement | ✅       |

### Command Wrapper

Be sure to wrap ALL your menus around a `CommandWrapper` component. This component contains things like the breadcrumbs and the search bar. You can pass in a default value for the input on the command wrapper:

| Parameter    | Description                    | Type   | Optional |
| ------------ | ------------------------------ | ------ | -------- |
| defaultValue | The default value on the input | string | ✅       |

#### Command Menu

Here are all the options available on the menu:

| Parameter          | Description                                  | Type         | Optional |
| ------------------ | -------------------------------------------- | ------------ | -------- |
| commands           | The commands for this menu to display        | Command[]    | ❌       |
| index              | The index of this menu                       | number       | ❌       |
| crumbs             | The current path of the command menu         | string[]     | ❌       |
| preventSearch      | Disable filtering results for the menu       | string       | ✅       |
| loadingPlaceholder | Element to be displayed while commands load  | ReactElement | ✅       |
| loadingState       | Whether or not the data is currently loading | boolean      | ✅       |
| placeholder        | The placeholder text on this particular menu | string       | ✅       |

The index is the index of this menu—if you only have a single menu, set this to one. This number is used for opening and closing multiple menus, whenever you want to open a sub menu simply use the `setOpen` command and input the index of the menu you'd like to open.

#### useCommands

After you define your components, you must input them into the `useCommands` hook.

```tsx
export const Component = () => {
  const main = [
    /* ... */
  ]
  const [mainCommands] = useCommands(main)

  return (
    <CommandWrapper>
      <CommandMenu commands={mainCommands} index={1} crumbs={['Home']} />
    </CommandWrapper>
  )
}
```

That's about all the configuration you'll need to do in order to get a basic command menu to work.

The possibilities are with these menus infinite: you can add custom loading states, sub-commands, and so much more. For a full list, check out the [examples]().

#### useKmenu Hook

`useKmenu` is a utility hook that adds utility and gives you information about the current status of the menu. You can use these for a multitude of different things such as nested routes on the command menu or for toggling the menu through a button on your UI.

Here's a list of all the information it provides:

| Parameter | Description                                                           | Type                                              |
| --------- | --------------------------------------------------------------------- | ------------------------------------------------- |
| input     | The current text in the search bar of the menu that is currently open | string                                            |
| setInput  | The setter function to change the input                               | Dispatch\<SetStateAction\<string>>                |
| isOpen    | Whether or not the menu is currently open                             | boolean                                           |
| open      | The index of the menu is currently open                               | number                                            |
| setOpen   | The setter function to change the open state                          | (index: number, preventAnimate?: boolean) => void |
| toggle    | The function for toggling the main menu open/close                    | void                                              |

Here's an example of how you can toggle the menu open with the click of a button:

```tsx:index.tsx
import { useKmenu } from 'kmenu'

export const Button = () => {
  const { toggle } = useKmenu()
  return <button onClick={toggle}>Toggle Menu</button>
}
```

_REMINDER: YOUR APPLICATION OR PARENT COMPONENT MUST BE WRAPPED IN THE `MENUPROVIDER`_

## Examples

In an attempt to showcase everything this menu can do, [examples/src/kmenu](https://github.com/haaarshsingh/kmenu/tree/master/example/src/kmenu) includes an ever-growing list some things you can do with kmenu:

- [Basic](https://github.com/haaarshsingh/kmenu/blob/master/apps/examples/examples/Basic.tsx)
- [Nested menus](https://github.com/haaarshsingh/kmenu/blob/master/apps/examples/examples/Nested.tsx)
- [Checkboxes](https://github.com/haaarshsingh/kmenu/blob/master/apps/examples/examples/Checkbox.tsx)
- [Loading states](https://github.com/haaarshsingh/kmenu/blob/master/apps/examples/examples/Loading.tsx)
- [Modal](https://github.com/haaarshsingh/kmenu/blob/master/apps/examples/examples/Modal.tsx)

This list is ever-growing. If there's something you ever want to add, any and all [pull requests](https://github.com/haaarshsingh/kmenu/pulls) are always welcomed.
