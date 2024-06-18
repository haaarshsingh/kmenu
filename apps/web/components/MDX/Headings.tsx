"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  FC,
  useState,
  useEffect,
} from "react";
import { TbLink, TbPencil } from "react-icons/tb";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export const Heading1: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
> = ({ children, id }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1000);
  }, [copied]);

  const pathname = usePathname();

  return (
    <div className="mb-3 flex items-center justify-between">
      <h1 className="text-3xl font-bold" id={id}>
        {children}
      </h1>
      <div className="flex gap-x-2">
        <div className="relative flex justify-center">
          <AnimatePresence>
            {open2 && (
              <motion.div
                className="absolute top-0 -mt-8 cursor-default whitespace-nowrap rounded border border-slate-300 bg-slate-200 px-1.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
              >
                Edit Page
              </motion.div>
            )}
          </AnimatePresence>
          <Link
            className="rounded-full bg-slate-200 p-2 text-base !text-slate-900 transition-colors hover:bg-slate-300/75 active:bg-slate-300 dark:bg-slate-800 dark:!text-slate-400 dark:hover:bg-slate-800/75 dark:active:bg-slate-700"
            href={"#"}
            onPointerEnter={() => setOpen2(true)}
            onPointerLeave={() => setOpen2(false)}
            aria-label="Edit Page"
          >
            <TbPencil />
          </Link>
        </div>
        <div className="relative flex justify-center">
          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute top-0 -mt-8 cursor-default whitespace-nowrap rounded border border-slate-300 bg-slate-200 px-1.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
              >
                {copied ? "Copied" : "Copy URL"}
              </motion.div>
            )}
          </AnimatePresence>
          <button
            className="rounded-full bg-slate-200 p-2 text-base text-slate-900 transition-colors hover:bg-slate-300/75 active:bg-slate-300 dark:bg-slate-800 dark:!text-slate-400 dark:hover:bg-slate-800/75 dark:active:bg-slate-700"
            onClick={() => {
              navigator.clipboard.writeText(
                `https://kmenu.hxrsh.in${pathname}`,
              );
              setCopied(true);
            }}
            onPointerEnter={() => setOpen(true)}
            onPointerLeave={() => setOpen(false)}
            aria-label="Copy URL"
          >
            {copied ? <FiCheck /> : <TbLink />}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Heading2: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
> = ({ children, id }) => (
  <div className="mb-6 mt-12 w-full border-t border-t-slate-200 pt-4 text-2xl font-semibold dark:border-t-slate-800">
    <Link href={`#${id}`} className="flex w-fit items-center">
      <span className="text-slate-300 dark:text-slate-600">#</span>
      <h2 className="ml-2" id={id}>
        {children}
      </h2>
    </Link>
  </div>
);

export const Heading3: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
> = ({ children, id }) => (
  <div className="mb-6 mt-12 w-full text-xl font-semibold">
    <Link href={`#${id}`} className="flex w-fit items-center">
      <span className="text-slate-300 dark:text-slate-600">#</span>
      <h3 className="ml-2" id={id}>
        {children}
      </h3>
    </Link>
  </div>
);

export const Heading4: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
> = ({ children, id }) => (
  <div className="mb-6 mt-12 w-full text-lg font-semibold">
    <Link href={`#${id}`} className="flex w-fit items-center">
      <span className="text-slate-300 dark:text-slate-600">#</span>
      <h4 className="ml-2" id={id}>
        {children}
      </h4>
    </Link>
  </div>
);
