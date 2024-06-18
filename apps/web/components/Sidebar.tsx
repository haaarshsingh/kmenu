"use client";

import {
  FiCheckSquare,
  FiChevronRight,
  FiCommand,
  FiInfo,
  FiPlus,
  FiSearch,
  FiTerminal,
  FiZap,
} from "react-icons/fi";
import { ThemeToggle } from "./Nav";
import { RiGraduationCapLine } from "react-icons/ri";
import { useState, type FC, type ReactElement } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  MdKeyboardCapslock,
  MdOutlineDownloading,
  MdOutlineDraw,
} from "react-icons/md";
import Link from "next/link";
import { SiCss3, SiTailwindcss } from "react-icons/si";
import { LuPaintbrush } from "react-icons/lu";
import { BiLayer } from "react-icons/bi";
import { TbExternalLink } from "react-icons/tb";
import { RxDiscordLogo } from "react-icons/rx";
import { useKmenu } from "kmenu";

export type Item = {
  category: string;
  pages: Page[];
};

type Page = {
  icon: ReactElement;
  name: string;
  href?: string;
};

export const items: Item[] = [
  {
    category: "Start guide",
    pages: [
      {
        icon: <FiInfo />,
        name: "What is kmenu?",
      },
      {
        icon: <RiGraduationCapLine />,
        name: "Guides and tutorials",
      },
      {
        icon: <FiZap />,
        name: "Getting started",
      },
    ],
  },
  {
    category: "Commands",
    pages: [
      {
        icon: <FiPlus />,
        name: "Adding commands",
      },
      {
        icon: <MdKeyboardCapslock />,
        name: "Keyboard shortcuts",
      },
      {
        icon: <MdOutlineDraw />,
        name: "Commands example",
      },
    ],
  },
  {
    category: "Customization",
    pages: [
      {
        icon: <SiCss3 />,
        name: "With CSS",
      },
      {
        icon: <SiTailwindcss />,
        name: "With Tailwind CSS",
      },
      {
        icon: <LuPaintbrush />,
        name: "Theming",
      },
    ],
  },
  {
    category: "Hooks",
    pages: [
      {
        icon: <FiCommand />,
        name: "useKmenu hook",
      },
      {
        icon: <FiTerminal />,
        name: "useCommands hook",
      },
    ],
  },
  {
    category: "Features",
    pages: [
      {
        icon: <BiLayer />,
        name: "Nested Menus",
      },
      {
        icon: <FiCheckSquare />,
        name: "Checkboxes",
      },
      {
        icon: <MdOutlineDownloading />,
        name: "Loading states",
      },
    ],
  },
  {
    category: "Other",
    pages: [
      {
        icon: <TbExternalLink />,
        name: "Examples",
        href: "https://github.com/harshhhdev/kmenu/blob/master/apps/examples/examples/",
      },
      {
        icon: <TbExternalLink />,
        name: "Types",
        href: "https://github.com/harshhhdev/kmenu/blob/master/packages/kmenu/src/types.ts",
      },
    ],
  },
];

export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default () => {
  const { setOpen } = useKmenu();

  return (
    <nav className="docs-lg:flex fixed left-0 top-0 z-10 hidden h-screen w-64 flex-shrink-0 flex-col justify-between border-r border-r-slate-200 dark:border-r-slate-800 xl:w-72">
      <div className="flex h-full flex-col">
        <div className="mt-6 flex items-center justify-between px-4">
          <header className="flex items-center text-slate-900 dark:text-slate-50">
            <FiCommand className="mb-0.5 mr-1.5" strokeWidth={3} />
            <Link href="/">
              <h2 className="font-semibold">kmenu</h2>
            </Link>
            <div
              aria-hidden
              className="mx-4 h-6 w-[1px] rounded-full bg-slate-300 dark:bg-slate-700"
            />
            <Link
              className="font-normal text-slate-600 dark:text-slate-400"
              href="/docs"
            >
              Docs
            </Link>
          </header>
          <ThemeToggle className="h-5 w-5" />
        </div>
        <div className="mt-6 px-4">
          <button
            className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
            onClick={() => setOpen(2)}
          >
            <div className="mr-12 flex items-center text-slate-400 dark:text-slate-500">
              <FiSearch className="mr-2 text-slate-300 dark:text-slate-500" />
              Quick search...
            </div>
            <kbd className="font-sans text-slate-400 dark:text-slate-500">
              <abbr title="Command" className="no-underline">
                ⌘
              </abbr>
              K
            </kbd>
          </button>
        </div>
        <ul className="mx-3 mt-6 h-[calc(100%-250px)] overflow-scroll">
          {items.map((item, index) => (
            <Section key={index} {...item} />
          ))}
        </ul>
      </div>
      <div className="fixed bottom-0 z-10 flex w-64 flex-col gap-y-2 border-r border-t border-r-slate-200 border-t-slate-200 bg-slate-100 px-6 py-6 dark:border-r-slate-800 dark:border-t-slate-800 dark:bg-slate-950 xl:w-72">
        <a
          className="flex items-center text-sm font-medium text-slate-900 dark:text-slate-400"
          href="https://discord.gg/RYjKFDayuy"
          target="_blank"
          rel="noreferrer"
        >
          <RxDiscordLogo strokeWidth={0.5} className="mr-2" />
          Join Discord
        </a>
        <a
          className="flex items-center text-sm font-medium text-slate-900 dark:text-slate-400"
          href="https://github.com/harshhhdev/kmenu/issues/new"
          target="_blank"
          rel="noreferrer"
        >
          <FiPlus className="mr-2" strokeWidth={2} />
          Create issue
        </a>
      </div>
    </nav>
  );
};

export const Section: FC<Item> = ({ category, pages }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <li
        className="flex cursor-pointer select-none items-center justify-between rounded px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-400/10"
        onClick={() => setOpen((open) => !open)}
      >
        {category}
        <FiChevronRight
          className={clsx("mt-0.5 transition-transform", open && "rotate-90")}
        />
      </li>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, y: 0, height: "auto", margin: "4px 12px" },
              collapsed: { opacity: 0, y: -10, height: 0, margin: 0 },
            }}
            className="overflow-hidden"
          >
            {pages.map((page, index) => (
              <li
                className="rounded text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-400/10"
                key={index}
              >
                <Link
                  href={
                    page.href ||
                    `/docs/${slugify(category)}/${slugify(page.name)}`
                  }
                  target={page.href ? "_blank" : "_self"}
                  rel={page.href ? "noreferrer" : ""}
                  className="flex items-center px-3 py-1.5 text-sm"
                >
                  {page.icon}
                  <span className="ml-2">{page.name}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};
