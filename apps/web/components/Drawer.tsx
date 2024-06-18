"use client";

import { FiChevronDown, FiSearch } from "react-icons/fi";
import { IoReturnDownForward } from "react-icons/io5";
import { Drawer } from "vaul";
import { useKmenu } from "kmenu";
import { items, Section } from "./Sidebar";
import { usePathname } from "next/navigation";

const transformSlug = (slug: string) =>
  slug
    .split("/")
    [slug.split("/").length - 1]?.replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default () => {
  const { setOpen } = useKmenu();
  const pathname = usePathname();

  return (
    <Drawer.Root>
      <Drawer.Trigger className="docs-lg:hidden fixed bottom-0 left-1/2 z-30 w-full -translate-x-1/2 border-t border-t-slate-200 bg-slate-50 px-4 py-4 dark:border-t-slate-700 dark:bg-slate-900">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center text-sm">
            <IoReturnDownForward className="mr-2 text-lg" strokeWidth={3} />
            {transformSlug(pathname)}
          </div>
          <FiChevronDown />
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed top-0 z-40 h-screen w-screen bg-slate-50/25 dark:bg-slate-950/50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-40 flex max-h-[96%] flex-col rounded-t-lg bg-slate-900">
          <div className="mx-auto flex w-full max-w-md flex-col overflow-auto rounded-t-lg p-4">
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
            <ul className="mt-6 h-[calc(100%-250px)] overflow-scroll">
              {items.map((item, index) => (
                <Section key={index} {...item} />
              ))}
            </ul>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
