"use client";

import { FC, ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronRight } from "react-icons/fi";
import clsx from "clsx";
import Link from "next/link";

type AccordionType = {
  title: string;
  description: ReactNode;
};

const Accordion: FC<AccordionType> = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-b-slate-200 py-4 dark:border-b-slate-800">
      <motion.button
        initial={false}
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full cursor-pointer items-center"
      >
        <FiChevronRight
          className={clsx(
            "mb-0.5 mr-2 text-slate-400 transition-transform dark:text-slate-600",
            expanded && "rotate-90",
          )}
        />
        {title}
      </motion.button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.section
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: 16 },
              collapsed: { opacity: 0, height: 0, marginTop: 0 },
            }}
            className="text-slate-500 dark:text-slate-400"
          >
            {description}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default () => {
  const questions = [
    {
      title: "Do you support Vue?",
      description: (
        <>
          We may in the future but it's not on the roadmap for now. This library
          is currently only made to be used with React, although I encourage any
          pull requests to make kmenu framework agnostic or even port it to
          frameworks such as Vue.
        </>
      ),
    },
    {
      title: "Why does kmenu ship with Framer Motion?",
      description: (
        <>
          Currently this library uses Framer Motion to animate various menu
          actions. I am currently working on finding alternative solutions for
          the animations but it's not a priority as of now.
        </>
      ),
    },
    {
      title: "How do I make a menu inside of another menu?",
      description: (
        <>
          Check out the documentation for{" "}
          <Link href="/docs/features/nested-menus">nested menus</Link>.
        </>
      ),
    },
    {
      title: "Can I bring my own styling?",
      description: (
        <>
          Although kmenu isn&apos;t headless, you can style each menu element as
          you wish. Check out{" "}
          <Link href="/docs/customization/with-css">With CSS</Link> or{" "}
          <Link href="/docs/customization/with-tailwind-css">
            With Tailwind CSS
          </Link>{" "}
          to learn more.
        </>
      ),
    },
    {
      title: "Can I change the animations?",
      description: (
        <>
          Not as of now, although the animations are disabled based if the user
          has the "prefers reduced motion" setting enabled. Additionally, some
          animations are disbaled on Firefox due to issues with compatibility.
        </>
      ),
    },
    {
      title: "Can I use this for my company for free?",
      description: (
        <>
          Absolutely, go right ahead. This project is licensed with the{" "}
          <a
            href="https://opensource.org/license/mit"
            target="_blank"
            rel="noreferrer"
          >
            MIT license
          </a>{" "}
          and requires no attribution or anything. If you need help setting it
          up, I offer consulting—reach out to{" "}
          <a href="mailto:hi.harsh@pm.me" rel="noreferrer" target="_blank">
            hi.harsh@pm.me
          </a>{" "}
          or{" "}
          <a href="https://x.com/haaarshsingh" rel="noreferrer" target="_blank">
            @haaarshsingh
          </a>{" "}
          with your proposals.
        </>
      ),
    },
  ];

  return (
    <div>
      {questions.map((item, i) => (
        <Accordion key={i} title={item.title} description={item.description} />
      ))}
    </div>
  );
};
