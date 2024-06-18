"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheck, FiClipboard } from "react-icons/fi";

export default () => {
  const { resolvedTheme } = useTheme();

  const [copy, setCopy] = useState(false);
  useEffect(() => {
    if (copy) {
      navigator.clipboard.writeText("npm install kmenu");
      setTimeout(() => setCopy(false), 1000);
    }
  }, [copy]);

  return (
    <section className="mt-44 flex justify-center">
      <div className="relative w-full rounded-lg border border-slate-200 bg-slate-50 px-5 py-6 shadow-cta dark:border-slate-800 dark:bg-slate-900 lg:w-grid lg:px-8 lg:py-12">
        <h2 className="text-2xl font-bold">Start building today</h2>
        <p className="mt-2 w-full text-slate-600 dark:text-slate-400 md:w-1/2">
          Supercharge your dashboard together in minutes. Read the documentation
          to get started, and{" "}
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-slate-900 underline dark:text-slate-100"
          >
            open an issue
          </a>{" "}
          or join the{" "}
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-slate-900 underline dark:text-slate-100"
          >
            Discord
          </a>{" "}
          for support.
        </p>
        <div className="mt-4 flex items-center gap-x-2 lg:mt-6">
          <button
            className="flex items-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800 dark:bg-slate-600 dark:text-slate-100 dark:hover:bg-slate-500 dark:active:bg-slate-500/80"
            onClick={() => setCopy(true)}
          >
            npm install kmenu
            {copy ? (
              <FiCheck className="ml-2" />
            ) : (
              <FiClipboard className="mb-0.5 ml-2" />
            )}
          </button>
          <Link
            href="/docs"
            className="ml-2 font-medium text-slate-900 dark:text-slate-100"
          >
            Read Docs
          </Link>
        </div>
        <Image
          src={
            resolvedTheme === "dark" ? "/home/cta-dark.webp" : "/home/cta.webp"
          }
          alt=""
          width={912}
          height={278}
          draggable={false}
          className="pointer-events-none absolute right-0 top-0 hidden md:block"
        />
      </div>
    </section>
  );
};
