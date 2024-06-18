"use client";

import Link from "next/link";
import {
  FiCommand,
  FiGithub,
  FiMoon,
  FiSearch,
  FiSun,
  FiZap,
} from "react-icons/fi";
import { TbBrandReact, TbMoonStars } from "react-icons/tb";
import { useTheme } from "next-themes";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { useKmenu } from "kmenu";
import { IoDocumentOutline } from "react-icons/io5";
import { DiNpm } from "react-icons/di";

export default () => (
  <div className="absolute left-0 top-0 z-30 mt-9 flex w-full justify-center">
    <div className="flex w-content items-center justify-between">
      <header className="pl-4">
        <Link href="#">
          <FiCommand className="h-6 w-6" strokeWidth={2.5} />
        </Link>
      </header>
      <ResponsiveMenu />
      <div className="hidden items-center pr-4 text-slate-600 dark:text-slate-400 md:flex lg:pl-0">
        <nav>
          <Link href="/docs" className="mr-2">
            Docs
          </Link>
          <Link href="#features" className="mr-2">
            Features
          </Link>
          <Link href="/docs" className="mr-2">
            Examples
          </Link>
          <Link href="/docs" className="mr-4">
            NPM
          </Link>
        </nav>
        <div className="flex items-center border-l border-l-slate-300 dark:border-l-slate-600">
          <ThemeToggle className="h-5 w-5" />
          <a
            href="https://github.com/harshhhdev/kmenu"
            target="_blank"
            rel="noreferrer"
            className="ml-1"
          >
            <FiGithub
              className="h-5 w-5 scale-95 text-slate-600 dark:text-slate-400"
              strokeWidth={2.2}
            />
          </a>
        </div>
      </div>
    </div>
  </div>
);

const ResponsiveMenu = () => {
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const { setOpen: openMenu } = useKmenu();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <div className="relative flex items-center gap-x-3 pr-4 md:hidden">
      <button
        onClick={() => openMenu(1)}
        aria-label="Search"
        className="rounded-full border border-slate-300 p-1.5 text-slate-950 dark:border-slate-800 dark:text-slate-50"
      >
        <FiSearch strokeWidth={2.5} />
      </button>
      <button
        aria-label="Open menu"
        onClick={() => setOpen((open) => !open)}
        className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-slate-300 dark:border-slate-800"
      >
        <div className="mb-2">
          <div
            className={clsx(
              "h-0.5 w-4 rounded-full bg-slate-950 transition-transform dark:bg-slate-50",
              open ? "-translate-y-[-5.5px] rotate-45" : "translate-y-[2px]",
            )}
          />
          <div
            className={clsx(
              "h-0.5 w-4 rounded-full bg-slate-950 transition-transform dark:bg-slate-50",
              open ? "translate-y-[3.5px] -rotate-45" : "translate-y-[6px]",
            )}
          />
        </div>
      </button>
      {open && (
        <div className="fixed right-0 top-0 z-40 mt-20 h-screen w-screen">
          <nav className="flex h-full w-full flex-col gap-y-4 bg-slate-200 px-4 pt-4 dark:bg-slate-900">
            <Link
              href="/docs"
              className="flex items-center justify-between text-slate-600 dark:text-slate-400"
            >
              <span>Docs</span>
              <IoDocumentOutline className="text-lg" />
            </Link>
            <Link
              href="#features"
              className="flex items-center justify-between text-slate-600 dark:text-slate-400"
              onClick={() => setOpen(false)}
            >
              <span>Features</span>
              <FiZap className="text-lg" strokeWidth={1.6} />
            </Link>
            <a
              href="https://github.com/harshhhdev/kmenu"
              className="flex items-center justify-between text-slate-600 dark:text-slate-400"
            >
              <span>Examples</span>
              <TbBrandReact className="text-lg" strokeWidth={1.6} />
            </a>
            <a
              href="https://www.npmjs.com/package/kmenu"
              className="flex items-center justify-between text-slate-600 dark:text-slate-400"
            >
              <span>NPM</span>
              <DiNpm className="text-2xl" />
            </a>
            <a
              href="https://github.com/harshhhdev/kmenu"
              className="flex items-center justify-between text-slate-600 dark:text-slate-400"
            >
              <span>GitHub</span>
              <FiGithub className="text-lg" strokeWidth={1.6} />
            </a>
            <hr className="h-0.5 w-full border-none bg-slate-300 dark:bg-slate-800" />
            <div className="flex items-center justify-between">
              <p className="text-slate-600 dark:text-slate-400">Theme</p>
              <div className="flex items-center gap-x-1 rounded-full border border-slate-300 p-1 dark:border-slate-800">
                <button
                  className={clsx(
                    "rounded-full p-1 transition-colors",
                    theme === "system"
                      ? "bg-slate-300 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                      : "bg-none text-slate-900 dark:text-slate-500",
                  )}
                  onClick={() => setTheme("system")}
                >
                  <HiOutlineDesktopComputer />
                </button>
                <button
                  className={clsx(
                    "rounded-full p-1 text-slate-900 transition-colors dark:text-slate-100",
                    theme === "light"
                      ? "bg-slate-300 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                      : "bg-none text-slate-900 dark:text-slate-500",
                  )}
                  onClick={() => setTheme("light")}
                >
                  <FiSun />
                </button>
                <button
                  className={clsx(
                    "rounded-full p-1 text-slate-900 transition-colors dark:text-slate-100",
                    theme === "dark"
                      ? "bg-slate-300 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                      : "bg-none text-slate-900 dark:text-slate-500",
                  )}
                  onClick={() => setTheme("dark")}
                >
                  <FiMoon />
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export const ThemeToggle: FC<{ className: string }> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  const close = () => {
    if (open) setOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", close);
    return () => document.body.removeEventListener("click", close);
  }, [open]);

  const toggle = (theme: string) => {
    setTheme(theme);
    close();
  };

  return (
    <div className={clsx("relative ml-4 mr-2", className)}>
      <button onClick={() => setOpen((open) => !open)}>
        <TbMoonStars
          className={clsx(className, "text-slate-600 dark:text-slate-400")}
          strokeWidth={2}
        />
      </button>
      <ul
        className={clsx(
          "absolute left-1/2 z-30 mt-2 -translate-x-1/2 flex-col items-start overflow-hidden rounded-md border border-slate-300 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900",
          open ? "flex" : "hidden",
        )}
      >
        <li
          className="flex w-full cursor-pointer select-none items-center px-4 py-1.5 pr-6 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => toggle("system")}
        >
          <HiOutlineDesktopComputer className="mr-2" /> System
        </li>
        <li
          className="flex w-full cursor-pointer select-none items-center px-4 py-1.5 pr-6 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => toggle("light")}
        >
          <FiSun className="mr-2" /> Light
        </li>
        <li
          className="flex w-full cursor-pointer select-none items-center px-4 py-1.5 pr-6 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={() => toggle("dark")}
        >
          <FiMoon className="mr-2" />
          Dark
        </li>
      </ul>
    </div>
  );
};
