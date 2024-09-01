"use client";

import {
  Command,
  CommandMenu,
  CommandWrapper,
  useCommands,
  useKmenu,
} from "kmenu";
import { FC } from "react";
import { FiCopy, FiGrid, FiMoon, FiPlus, FiSun, FiUsers } from "react-icons/fi";
import { BsShift } from "react-icons/bs";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import {
  RiCss3Fill,
  RiCustomerService2Fill,
  RiNextjsFill,
  RiSvelteFill,
} from "react-icons/ri";
import { MdOutlineDesignServices } from "react-icons/md";
import { TbServer2 } from "react-icons/tb";
import { useTheme } from "next-themes";

export default (() => {
  const { setTheme } = useTheme();
  const { setOpen } = useKmenu();

  const themes = [
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
  ];

  const main: Command[] = [
    {
      category: "Projects",
      commands: [
        {
          icon: <FiGrid />,
          text: "Search Projects...",
          shortcuts: { modifier: <BsShift />, keys: ["P"] },
          perform: () => setOpen(2),
        },
        {
          icon: <FiPlus />,
          text: "Create New Project",
        },
      ],
    },
    {
      category: "Teams",
      commands: [
        {
          icon: <FiUsers />,
          text: "Search Teams...",
          shortcuts: { modifier: <BsShift />, keys: ["T"] },
          perform: () => setOpen(3),
        },
        {
          icon: <FiPlus />,
          text: "Create New Team",
        },
      ],
    },
    {
      category: "General",
      commands: [
        {
          icon: <HiOutlineDesktopComputer />,
          text: "Change Theme...",
          shortcuts: { modifier: <BsShift />, keys: ["T"] },
          perform: () => setOpen(4),
        },
        {
          icon: <FiCopy />,
          text: "Copy Current URL",
          perform: () =>
            navigator.clipboard.writeText("https://kmenu.harshsingh.xyz/"),
        },
      ],
      subCommands: themes,
    },
  ];

  const projects: Command[] = [
    {
      category: "Projects",
      commands: [
        {
          icon: <RiNextjsFill />,
          text: "kmenu",
        },
        {
          icon: <RiSvelteFill />,
          text: "www",
        },
        {
          icon: <RiNextjsFill />,
          text: "React Pointers",
        },
        {
          icon: <RiCss3Fill />,
          text: "dots",
        },
      ],
    },
  ];

  const teams: Command[] = [
    {
      category: "Teams",
      commands: [
        {
          icon: <RiCustomerService2Fill />,
          text: "Customer Service",
        },
        {
          icon: <MdOutlineDesignServices />,
          text: "Frontend Developers",
        },
        {
          icon: <TbServer2 />,
          text: "Backend Developers",
        },
      ],
    },
  ];

  const theme: Command[] = [
    {
      category: "Set Theme",
      commands: themes,
    },
  ];

  const [mainCommands] = useCommands(main);
  const [projectCommands] = useCommands(projects);
  const [teamCommands] = useCommands(teams);
  const [themeCommands] = useCommands(theme);

  return (
    <CommandWrapper>
      <CommandMenu
        commands={mainCommands}
        crumbs={["Home"]}
        index={1}
        placeholder="What do you need?"
      />
      <CommandMenu
        commands={projectCommands}
        crumbs={["Home", "Projects"]}
        index={2}
        placeholder="Search Projects..."
      />
      <CommandMenu
        commands={teamCommands}
        crumbs={["Home", "Projects"]}
        index={3}
        placeholder="Search Teams..."
      />
      <CommandMenu
        commands={themeCommands}
        crumbs={["Home", "Theme"]}
        index={4}
        placeholder="Set Theme..."
      />
    </CommandWrapper>
  );
}) as FC;
