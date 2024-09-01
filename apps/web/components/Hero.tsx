"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Copy } from "react-feather";

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
      <h1 className="animate-slide text-5xl font-bold opacity-0 [animation-delay:.1s]">
        kmenu
      </h1>
      <p className="animate-slide mt-1.5 text-neutral-500 opacity-0 [animation-delay:.2s]">
        A perfect navigation experience
      </p>
      <div className="animate-slide mt-6 flex items-center gap-x-1 opacity-0 [animation-delay:.3s]">
        <button
          className="group flex cursor-copy select-none items-center rounded-full bg-neutral-800 py-2 pl-4 text-sm transition-all hover:bg-neutral-700/70 active:scale-[.98]"
          onClick={() => {
            setCopy(true);
            navigator.clipboard.writeText("npm install kmenu");
          }}
        >
          npm install kmenu
          <div className="ml-2 mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700 text-neutral-400 transition-colors group-hover:bg-neutral-600/70">
            {copy ? <Check className="w-3.5" /> : <Copy className="w-3.5" />}
          </div>
        </button>
        <a
          href="https://github.com/haaarshsingh/kmenu"
          target="_blank"
          rel="noreferrer"
          className="group flex select-none items-center rounded-full px-5 py-2.5 text-sm transition-all hover:bg-neutral-50/10 active:scale-[.98]"
        >
          Get Started
          <ArrowRight className="ml-1.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </main>
  );
};
