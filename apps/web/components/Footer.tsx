"use client";

import Link from "next/link";
import { Item, items, slugify } from "./Sidebar";
import { BsDiscord, BsGithub, BsTwitterX } from "react-icons/bs";
import { CgNpm } from "react-icons/cg";
import { FiCommand } from "react-icons/fi";
import { FC, useState } from "react";

const navigation = items.filter(
  (item) => item.category !== "Hooks" && item.category !== "Other",
);

export default () => (
  <footer className="mb-14 mt-32 flex w-full flex-col justify-center gap-y-8 lg:mt-64 lg:gap-y-16">
    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
      <FiCommand className="mt-1 text-lg text-slate-900 dark:text-slate-100" />
      <div className="hidden gap-x-4 md:flex lg:gap-x-12">
        {navigation.map((item: Item, index) => (
          <ul key={index} className="flex flex-col gap-y-1">
            <h4 className="mb-1 font-semibold">{item.category}</h4>
            {item.pages.map((page, i) => (
              <li key={i} className="text-slate-600 dark:text-slate-400">
                <Link
                  href={
                    page.href ||
                    `/docs/${slugify(item.category)}/${slugify(page.name)}`
                  }
                  target={page.href ? "_blank" : "_self"}
                  rel={page.href ? "noreferrer" : ""}
                  key={i}
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-y-2 md:hidden">
      {navigation.map((item: Item, index) => (
        <FooterSection {...item} key={index} />
      ))}
    </div>
    <div className="flex justify-between">
      <div className="flex items-center">
        <p className="text-sm text-slate-400 dark:text-slate-600">
          Copyright Harsh Singh 2024
        </p>
        <div className="mx-3 h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
        <div className="flex items-center gap-x-2">
          <a
            href="https://github.com/harshhhdev/kmenu"
            className="text-slate-400 dark:text-slate-600"
          >
            <BsGithub />
          </a>
          <a
            href="https://discord.gg/RYjKFDayuy"
            className="text-slate-400 dark:text-slate-600"
          >
            <BsDiscord />
          </a>
          <a
            href="https://www.npmjs.com/package/kmenu"
            className="text-slate-400 dark:text-slate-600"
          >
            <CgNpm />
          </a>
          <a
            href="https://x.com/harshhhdev"
            className="text-sm text-slate-400 dark:text-slate-600"
          >
            <BsTwitterX />
          </a>
        </div>
      </div>
      <p className="hidden text-sm text-slate-400 dark:text-slate-600 md:block">
        Built by{" "}
        <a
          href="https://harshsingh.xyz"
          rel="noreferrer"
          target="_blank"
          className="text-slate-600 underline decoration-slate-300 underline-offset-2 dark:text-slate-400"
        >
          Harsh Singh
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/harshhhdev/kmenu/graphs/contributors"
          rel="noreferrer"
          target="_blank"
          className="text-slate-600 underline decoration-slate-300 underline-offset-2 dark:text-slate-400"
        >
          contributors
        </a>{" "}
        🤟
      </p>
    </div>
  </footer>
);

const FooterSection: FC<Item> = ({ category, pages }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-b-slate-300 pb-1 dark:border-b-slate-800">
      <button
        className="flex w-full items-start text-slate-900 dark:text-slate-100"
        onClick={() => setOpen((open) => !open)}
      >
        <h4>{category}</h4>
      </button>
      {open && (
        <ul className="my-4 flex flex-col gap-y-1">
          {pages.map((page, i) => (
            <li key={i} className="text-slate-600 dark:text-slate-400">
              <Link
                href={
                  page.href ||
                  `/docs/${slugify(category)}/${slugify(page.name)}`
                }
                target={page.href ? "_blank" : "_self"}
                rel={page.href ? "noreferrer" : ""}
                key={i}
              >
                {page.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
