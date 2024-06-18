"use client";

import Link from "next/link";
import {
  FiCheckCircle,
  FiCommand,
  FiGrid,
  FiTerminal,
  FiZap,
} from "react-icons/fi";
import { BiLayer } from "react-icons/bi";
import { RiGraduationCapLine } from "react-icons/ri";
import { TbRulerMeasure, TbTableShortcut } from "react-icons/tb";
import { CgSearchLoading } from "react-icons/cg";
import { LuPaintbrush } from "react-icons/lu";
import { SiCss3 } from "react-icons/si";

const cards = [
  {
    icon: <FiCommand />,
    name: "What is kmenu?",
    description:
      "An insight into the project, the process, and the problems it aims to solve.",
    path: "start-guide/what-is-kmenu",
  },
  {
    icon: <FiZap />,
    name: "Getting started",
    description:
      "How to get started with kmenu: installation, configuration, and other basics.",
    path: "start-guide/getting-started",
  },
  {
    icon: <FiTerminal />,
    name: "Adding commands",
    description:
      "Add commands and customize commands and actions to your command menu.",
    path: "commands/adding-commands",
  },
  {
    icon: <BiLayer />,
    name: "Nested menus",
    description:
      "Learn how to nest commands throughout multiple different command menus.",
    path: "features/nested-menus",
  },
  {
    icon: <SiCss3 />,
    name: "With CSS",
    description:
      "Customize + theme the menu and its elements with CSS variables.",
    path: "customization/with-css",
  },
  {
    icon: <RiGraduationCapLine />,
    name: "Guides and tutorials",
    description:
      "Watch videos and explore live examples on how to add kmenu to your application.",
    path: "start-guide/guides-and-tutorials",
  },
];

const examples = [
  {
    icon: <TbRulerMeasure />,
    name: "Basic",
    description: "A basic, single-page command menu with commands.",
  },
  {
    icon: <FiGrid />,
    name: "Nested menus",
    description:
      "A multi-page command menu with a master menu and breadcrumbs.",
  },
  {
    icon: <FiCheckCircle />,
    name: "Checkboxes",
    description: "A settings page command menu with checkbox commands.",
  },
  {
    icon: <CgSearchLoading />,
    name: "Loading states",
    description: "Display a loading spinner while fetching data for your menu.",
  },
  {
    icon: <LuPaintbrush />,
    name: "Themes",
    description: "Build a command menu that supports both dark and light mode.",
  },
  {
    icon: <TbTableShortcut />,
    name: "Shortcuts",
    description: "A single-page command menu with keyboard shortcuts.",
  },
];

const titleCase = (x: string) =>
  x.replace(/\b\w/g, (match) => match.toUpperCase()).replace(/\s+/g, "");

export default () => (
  <div className="docs-lg:ml-64 mr-6 mt-12 min-w-0 xl:ml-80">
    <section>
      <h1 className="mb-1 text-2xl font-bold">Documentation</h1>
      <p className="text-base font-medium text-slate-600 dark:text-slate-400">
        Learn how to supercharge your navigation with kmenu.
      </p>
    </section>
    <section className="mt-12">
      <h3 className="mb-1 text-lg font-bold">Recommended</h3>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Link
            href={`/docs/${card.path}`}
            key={index}
            className="h-full overflow-hidden rounded border-b border-b-slate-200 bg-slate-200/40 dark:border-b-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-36 w-full items-center justify-center rounded-t bg-gradient-to-r from-blue-400 via-sky-500 to-cyan-500 dark:from-sky-700 dark:via-sky-600 dark:to-cyan-700">
              <div className="rounded-lg bg-slate-100 p-3 text-2xl text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-slate-100">
                {card.icon}
              </div>
            </div>
            <div className="h-full border-l border-r border-l-slate-200 border-r-slate-200 p-4 dark:border-l-slate-800 dark:border-r-slate-800">
              <h4 className="font-semibold">{card.name}</h4>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
    <section className="mb-48 mt-14">
      <h3 className="mb-1 text-lg font-bold">Code Examples</h3>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {examples.map((card, index) => (
          <a
            href={`https://github.com/harshhhdev/kmenu/tree/master/example/src/kmenu/${titleCase(
              card.name,
            )}.tsx`}
            rel="noreferrer"
            target="_blank"
            key={index}
            className="h-full overflow-hidden rounded border border-slate-200 bg-slate-200/40 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="h-full p-4">
              <div className="flex items-center">
                <div className="mr-2 rounded-lg text-slate-900 shadow-2xl dark:text-slate-100">
                  {card.icon}
                </div>
                <h4 className="font-semibold">{card.name}</h4>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {card.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  </div>
);
