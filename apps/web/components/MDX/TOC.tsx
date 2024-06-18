import clsx from "clsx";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { getMarginLeft, Heading } from "../DocsLayout";

export default (({ headings }) => {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    let closestDistance = Infinity;

    const scrolledHeadingIndex = headings?.findIndex((heading) => {
      const element = document.getElementById(
        heading.name.toLowerCase().replace(/\s/g, "-"),
      );

      if (element) {
        const { top } = element.getBoundingClientRect();
        const distance = Math.abs(top - scrollPosition);

        if (distance < closestDistance && top >= 0) {
          closestDistance = distance;
          return true;
        }
      }

      return false;
    });

    if (typeof scrolledHeadingIndex === "number" && scrolledHeadingIndex !== -1)
      setCurrentHeadingIndex(scrolledHeadingIndex);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings?.length === 0) return;

  return (
    <div className="sticky right-0 top-0 ml-20 hidden h-full pt-8 xl:block">
      <div className="flex items-center text-sm text-slate-950 dark:text-slate-50">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          role="img"
          focusable="false"
          aria-hidden
        >
          <path d="M2 3.5a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 2 3.5ZM2 8a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 8Zm.75 3.75a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Z" />
        </svg>
        <span className="ml-2">On this page</span>
      </div>
      <div className="relative mt-4 flex items-start">
        <div
          aria-hidden
          className="absolute left-0 top-0 h-full w-0.5 rounded-full bg-slate-200 dark:bg-slate-800"
        >
          <div
            className="absolute left-0 top-0 h-6 w-0.5 rounded-full bg-slate-950 transition-all dark:bg-slate-400"
            style={{ top: `${currentHeadingIndex * 28}px` }}
          />
        </div>
        <ul className="ml-3.5 flex flex-col gap-y-1 overflow-auto">
          {headings?.map(({ name, type }, index) => (
            <li key={index} className="flex h-auto w-auto py-0.5">
              <Link
                href={`#${name.toLowerCase().replace(/\s/g, "-")}`}
                className={clsx(
                  "inline-block text-sm",
                  currentHeadingIndex === index
                    ? "text-slate-900 dark:text-slate-100"
                    : "text-slate-600 dark:text-slate-400",
                  getMarginLeft(type),
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}) as FC<{ headings: Heading[] | undefined }>;
