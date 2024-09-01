"use client";

import {
  Command,
  CommandMenu,
  CommandWrapper,
  InnerCommand,
  useCommands,
  useKmenu,
} from "kmenu";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import {
  FiCommand,
  FiHome,
  FiLink,
  FiMoon,
  FiPlus,
  FiSearch,
  FiSun,
  FiTerminal,
  FiZap,
} from "react-icons/fi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { LuLink2 } from "react-icons/lu";
import { SiReact } from "react-icons/si";
import { TbFishHook, TbMoonStars, TbPaint, TbPower } from "react-icons/tb";
import { BsDiscord, BsGithub, BsTwitterX } from "react-icons/bs";
import { CgNpm } from "react-icons/cg";

export default () => {
  const router = useRouter();

  const { setTheme } = useTheme();
  const { setOpen } = useKmenu();

  const main: Command[] = [
    {
      category: "Navigation",
      commands: [
        {
          icon: <FiHome />,
          text: "Home",
          perform: () => router.push("/"),
          closeOnComplete: true,
          keywords: ["back"],
        },
        {
          icon: <FiSearch />,
          text: "Search Documentation...",
          perform: () => setOpen(2),
          shortcuts: { modifier: <FiCommand />, keys: ["E"] },
          keywords: [
            "commands",
            "tutorial",
            "guide",
            "test",
            "hooks",
            "menus",
            "examples",
            "checkboxes",
            "cmdk",
          ],
        },
        {
          icon: <SiReact />,
          text: "Examples",
          href: "https://github.com/haaarshsingh/kmenu",
          newTab: true,
        },
      ],
    },
    {
      category: "Utility",
      commands: [
        {
          icon: <TbMoonStars />,
          text: "Set Theme...",
          perform: () => setOpen(3),
          keywords: ["dark", "mode", "light"],
        },
        {
          icon: <FiLink />,
          text: "Copy URL",
          perform: () =>
            navigator.clipboard.writeText(`https://kmenu.hxrsh.in/docs`),
          closeOnComplete: true,
        },
      ],
    },
    {
      category: "Other",
      commands: [
        {
          icon: <LuLink2 />,
          text: "Links...",
          keywords: ["github", "code", "npm", "x", "twitter"],
          perform: () => setOpen(10),
        },
      ],
    },
  ];

  const docs: Command[] = [
    {
      category: "Documentation",
      commands: [
        {
          icon: <TbPower />,
          text: "Start Guide",
          perform: () => setOpen(4),
        },
        {
          icon: <FiTerminal />,
          text: "Commands",
          perform: () => setOpen(5),
        },
        {
          icon: <TbPaint />,
          text: "Customization",
          perform: () => setOpen(6),
        },
        {
          icon: <TbFishHook />,
          text: "Hooks",
          perform: () => setOpen(7),
        },
        {
          icon: <FiZap />,
          text: "Features",
          perform: () => setOpen(8),
        },
        {
          icon: <FiPlus />,
          text: "Other",
          perform: () => setOpen(9),
        },
      ],
    },
  ];

  const theme: Command[] = [
    {
      category: "Set Theme",
      commands: [
        {
          icon: <HiOutlineDesktopComputer />,
          text: "System",
          perform: () => setTheme("system"),
        },
        {
          icon: <FiSun />,
          text: "Light",
          perform: () => setTheme("light"),
        },
        {
          icon: <FiMoon />,
          text: "Dark",
          perform: () => setTheme("dark"),
        },
      ],
    },
  ];

  const links: Command[] = [
    {
      category: "Set Theme",
      commands: [
        {
          icon: <BsDiscord />,
          text: "Join Discord",
          href: "https://discord.gg/RYjKFDayuy",
          newTab: true,
        },
        {
          icon: <BsGithub />,
          text: "GitHub",
          href: "https://github.com/haaarshsingh/kmenu",
          newTab: true,
        },
        {
          icon: <BsTwitterX />,
          text: "Twitter",
          href: "https://x.com/haaarshsingh",
          newTab: true,
        },
        {
          icon: <CgNpm />,
          text: "NPM",
          href: "https://www.npmjs.com/package/kmenu",
          newTab: true,
        },
      ],
    },
  ];

  const [mainCommands] = useCommands(main);
  const [docsCommands] = useCommands(docs);
  const [themeCommands] = useCommands(theme);
  const [linkCommands] = useCommands(links);

  return (
    <CommandWrapper>
      <CommandMenu commands={mainCommands} index={1} crumbs={["Home"]} />
      <CommandMenu
        commands={docsCommands}
        index={2}
        crumbs={["Home", "Docs"]}
        placeholder="Search for anything..."
      />
      <CommandMenu
        commands={themeCommands}
        index={3}
        crumbs={["Home", "Theme"]}
      />
      <CommandMenu
        commands={linkCommands}
        index={10}
        crumbs={["Home", "Links"]}
      />
    </CommandWrapper>
  );
};
