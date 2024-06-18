"use client";

import { useKmenu } from "kmenu";
import Link from "next/link";
import { FiChevronRight, FiSearch } from "react-icons/fi";
import ContentLayout from "./ContentLayout";
import Image from "next/image";
import { useTheme } from "next-themes";

export default () => {
  const { setOpen } = useKmenu();
  const { resolvedTheme } = useTheme();

  return (
    <section className="relative flex h-screen items-center justify-between border-b border-b-slate-300 bg-slate-200 dark:border-b-slate-700 dark:bg-slate-900">
      <ContentLayout>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="mb-6 flex flex-col items-center">
            <a
              className="group flex items-center rounded-full bg-slate-300 p-1 transition-colors hover:bg-slate-400/50 dark:bg-slate-800 dark:hover:bg-slate-700"
              href="https://www.producthunt.com/products/kmenu"
              target="_blank"
              rel="noreferrer"
            >
              <div className="rounded-full bg-slate-400 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-400">
                <p className="pt-0.5">NEW</p>
              </div>
              <div className="mx-2 flex items-center text-xs text-slate-600 dark:text-slate-100">
                <span>kmenu launches v2.0.0</span>
                <FiChevronRight className="mb-0.5 ml-1 transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>
            <h2 className="mb-2 mt-4 text-center text-4xl font-bold">
              A refined navigation experience
            </h2>
            <p className="text-center text-base font-medium text-slate-600 dark:text-slate-400">
              An open-source, accessible and animated command menu for React
            </p>
          </div>
          <div className="mb-40 flex">
            <Link
              href="/docs"
              className="mr-2 flex select-none items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400"
            >
              <span className="mt-0.5">Get Started</span>
            </Link>
            <button
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm dark:border-slate-700 dark:bg-slate-800"
              onClick={() => setOpen(1)}
            >
              <div className="mr-12 flex items-center font-medium text-slate-400">
                <FiSearch className="mr-1.5 text-slate-300" />
                <span className="mt-0.5">Command Menu...</span>
              </div>
              <kbd className="mt-0.5 font-sans text-slate-400">
                <abbr title="Command" className="no-underline">
                  ⌘
                </abbr>
                K
              </kbd>
            </button>
          </div>
        </div>
      </ContentLayout>
      <Image
        src={
          resolvedTheme === "dark" ? "/home/cmdk-dark.webp" : "/home/cmdk.webp"
        }
        width={635}
        height={354.69}
        alt="command menu"
        className="absolute bottom-0 left-0 right-0 z-10 m-auto text-center"
        draggable={false}
      />
      <Image
        src="/home/grid.webp"
        width={1358}
        height={303}
        alt="grid"
        className="absolute bottom-0 left-0 right-0 m-auto text-center"
        draggable={false}
      />
    </section>
  );
};
