"use client";

import { useEffect, useState } from "react";
import { FiArrowRight, FiCheck, FiCopy } from "react-icons/fi";

export default () => {
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    if (copy)
      setTimeout(() => {
        setCopy(false);
      }, 1000);
  }, [copy]);

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="animate-slide z-10 text-5xl font-bold opacity-0 [animation-delay:.1s]">
        kmenu
      </h1>
      <p className="animate-slide z-10 mt-1.5 text-neutral-500 opacity-0 [animation-delay:.2s]">
        A perfect navigation experience
      </p>
      <div className="animate-slide z-10 mt-6 flex items-center gap-x-1 opacity-0 [animation-delay:.3s]">
        <button
          className="group flex cursor-copy select-none items-center rounded-full bg-neutral-200 py-2 pl-4 text-sm transition-all hover:bg-neutral-400/40 active:scale-[.98] dark:bg-neutral-800 dark:hover:bg-neutral-700/70"
          onClick={() => {
            setCopy(true);
            navigator.clipboard.writeText("npm install kmenu");
          }}
        >
          npm install kmenu
          <div className="ml-2 mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-300 text-neutral-600 transition-colors group-hover:bg-neutral-400/50 dark:bg-neutral-700 dark:text-neutral-400 dark:group-hover:bg-neutral-600/70">
            {copy ? (
              <FiCheck className="w-3.5" />
            ) : (
              <FiCopy className="w-3.5" />
            )}
          </div>
        </button>
        <a
          href="https://github.com/haaarshsingh/kmenu"
          target="_blank"
          rel="noreferrer"
          className="group flex select-none items-center rounded-full px-5 py-3 text-sm transition-all hover:bg-neutral-950/5 active:scale-[.98] dark:hover:bg-neutral-50/10"
        >
          Get Started
          <FiArrowRight className="ml-1.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </main>
  );
};
