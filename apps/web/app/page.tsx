"use client";

import Link from "next/link";
import { useState } from "react";
import { KmenuModel } from "./kmenu-model";
import { CommandMenu } from "./command-menu";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("npm install kmenu");
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div>
      <CommandMenu open={menuOpen} onOpenChange={setMenuOpen} />
      <nav className="absolute flex justify-center w-screen pt-12">
        <ul className="flex items-center gap-4">
          <li>
            <Link
              href="/"
              className="hover:bg-white/10 px-4 py-2 rounded-full text-sm"
            >
              Home
            </Link>
          </li>
          <li className="cursor-default text-xl translate-y-px">
            <i>kmenu</i>
          </li>
          <li>
            <a
              className="hover:bg-white/10 px-4 py-2 rounded-full text-sm"
              href="https://github.com/haaarshsingh/kmenu"
            >
              Docs
            </a>
          </li>
        </ul>
      </nav>
      <main className="flex flex-col items-center justify-center h-screen pb-12">
        <div className="relative">
          <KmenuModel />
          <div className="absolute inset-0 bg-black [animation-delay:0.2s] animate-[slideDown_1s_ease-out_forwards]" />
        </div>
        <div className="z-10 py-6 flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold max-w-80 text-center">
            <i>The perfect navigation experience™</i>
          </h1>
          <p className="text-white/50 max-w-128 text-center">
            Framework-agnostic, headless, composable, accessible, and fast.
            Built for smooth flow, zero friction and pure delight. Ready for
            anything.
          </p>
        </div>
        <div className="z-10 flex gap-2 items-center">
          <button
            onClick={copyToClipboard}
            className="group flex cursor-copy select-none items-center rounded-full py-2 pl-4 text-sm transition-all active:scale-[.98] bg-neutral-800 hover:bg-neutral-700/70"
          >
            npm install kmenu
            <div className="ml-2 mr-2 flex h-7 w-7 items-center justify-center rounded-full transition-colors bg-neutral-700 text-neutral-400 group-hover:bg-neutral-600/70">
              {copied ? (
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              ) : (
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              )}
            </div>
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="group cursor-pointer flex text-neutral-950 select-none items-center rounded-full py-3 px-4 text-sm transition-all active:scale-[.98] bg-neutral-50 hover:bg-neutral-100"
          >
            Try it out <span className="text-neutral-400 ml-2">⌘K</span>
          </button>
        </div>
      </main>
      <footer className="-translate-x-1/2 opacity-0 left-1/2 text-sm text-neutral-50/50 text-center [animation-delay:0.5s] animate-[slideUp_1s_ease-out_forwards] absolute bottom-6">
        Crafted by{" "}
        <a
          href="https://harshsingh.me"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Harsh Singh
        </a>{" "}
        🌟
      </footer>
    </div>
  );
}
