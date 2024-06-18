import { FC, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { getMarginLeft, Heading } from "../DocsLayout";

export default (({ headings }) => {
  if (headings?.length === 0) return;
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-8 flex w-full flex-col rounded-md border border-slate-200 px-3 py-3 dark:border-slate-800 xl:hidden">
      <button
        onClick={() => setOpen((open) => !open)}
        className="flex w-full items-center justify-between"
      >
        <h3 className="font-medium text-slate-950 dark:text-slate-200">
          Table of Contents
        </h3>
        <FiChevronDown
          className={clsx(
            "text-slate-600 transition-transform",
            open ? "rotate-180" : "rotate-0",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="list-none gap-y-1"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", paddingTop: 8 },
              collapsed: { opacity: 0, height: 0, paddingTop: 0 },
            }}
            transition={{ duration: 0.1, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {headings?.map((heading, index) => (
              <li key={index}>
                <Link
                  href={`#${heading.name.toLowerCase().replace(/\s/g, "-")}`}
                  className={clsx(
                    "whitespace-nowrap text-sm !text-slate-600 dark:!text-slate-400",
                    getMarginLeft(heading.type),
                  )}
                >
                  {heading.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}) as FC<{ headings: Heading[] | undefined }>;
