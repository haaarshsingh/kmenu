"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { FiCheckSquare, FiChevronRight, FiPlus, FiZap } from "react-icons/fi";
import {
  LuGitBranch,
  LuGitPullRequest,
  LuGitPullRequestDraft,
  LuPaintbrush2,
} from "react-icons/lu";
import { MdOutlineMobileFriendly } from "react-icons/md";
import { TbAccessible } from "react-icons/tb";

const items = [
  {
    icon: <LuGitBranch />,
    text: "#92 — chore: update workflow",
  },
  {
    icon: <LuGitPullRequestDraft />,
    text: "#102 — typos on REAMDE.md",
  },
  {
    icon: <LuGitPullRequest />,
    text: "add custom theme tokens",
  },
  {
    icon: <LuGitBranch />,
    text: "#332 — fix: build errors",
  },
];

export default () => {
  const [active, setActive] = useState<undefined | string>(undefined);
  const { resolvedTheme } = useTheme();

  return (
    <section id="features" className="mt-44 flex flex-col justify-center">
      <div className="flex w-full flex-col items-center">
        <h2 className="mb-2 text-2xl font-bold">Navigation on Steroids</h2>
        <p className="w-full text-center text-slate-600 dark:text-slate-400 md:w-1/2 lg:w-7/20">
          Serves as a power tool for users to simultaneously decrease clicks and
          increase feature discoverability
        </p>
      </div>
      <div className="mt-16 flex justify-center">
        <div className="w-full lg:w-grid">
          <div className="relative flex h-80 items-end overflow-hidden rounded-lg border border-slate-200 bg-white pb-5 pl-6 dark:border-slate-800 dark:bg-slate-900 md:h-96">
            <div className="z-10">
              <h3 className="text-xl font-semibold">
                Revolutionize your Dashboard Experience
              </h3>
              <p className="my-2 w-4/5 text-sm text-slate-600 dark:text-slate-400 md:w-3/5">
                Streamline your dashboard navigation, with an intuitive
                interface that glides users through your interface and its
                features.
              </p>
              <Link
                href="/docs"
                className="flex w-fit items-center text-sm text-sky-500"
              >
                Get Started
                <FiChevronRight className="ml-0.5 mt-0.5" />
              </Link>
            </div>
            <Image
              src={
                resolvedTheme === "dark"
                  ? "/home/cards/menus-dark.webp"
                  : "/home/cards/menus.webp"
              }
              width={912}
              height={384}
              alt="different variants of command menus"
              className="absolute left-0 top-0 dark:opacity-60"
              draggable={false}
            />
          </div>
          <div className="relative mt-4 flex flex-col lg:flex-row">
            <div className="relative mb-4 mr-2 flex h-[420px] w-full flex-col items-start overflow-hidden rounded-lg border border-slate-200 bg-white pl-6 pt-5 dark:border-slate-800 dark:bg-slate-900 md:mb-0 lg:h-auto lg:w-1/2">
              <div className="z-10">
                <span className="text-sm text-sky-500">Shortcuts</span>
                <h4 className="mb-1 mt-0.5 text-xl font-semibold">
                  Crafted for Your Keystrokes
                </h4>
                <p className="w-72 text-sm text-slate-600 dark:text-slate-400">
                  Design a keyboard-first experience on your dashboard, through
                  mapping each command to custom keybinds.
                </p>
                <Link
                  href="/docs"
                  className="mt-2 flex w-fit items-center text-sm text-sky-500"
                >
                  Learn More
                  <FiChevronRight className="ml-0.5 mt-0.5" />
                </Link>
                <div className="absolute bottom-0 -ml-6 mb-52 flex w-full items-center justify-center lg:left-0 lg:ml-2 lg:translate-x-0">
                  <button
                    className={clsx(
                      active === "K"
                        ? "border-sky-500 bg-sky-500 text-white"
                        : "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500",
                      "mr-1.5 flex h-fit flex-shrink-0 items-center rounded-full border p-1 px-2 text-xs",
                    )}
                    onClick={() =>
                      setActive((active) => (active === "K" ? undefined : "K"))
                    }
                  >
                    <kbd
                      className={clsx(
                        active === "K"
                          ? "bg-sky-400 text-sky-100"
                          : "bg-slate-200 text-slate-400 dark:bg-slate-700",
                        "mr-1.5 rounded-full px-2 py-0.5 font-sans",
                      )}
                    >
                      <abbr title="Command" className="no-underline">
                        ⌘
                      </abbr>
                      K
                    </kbd>
                    Open Menu
                  </button>
                  <button
                    className={clsx(
                      active === "T"
                        ? "border-sky-500 bg-sky-500 text-white"
                        : "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500",
                      "mr-1.5 flex h-fit flex-shrink-0 items-center rounded-full border p-1 px-2 text-xs",
                    )}
                    onClick={() =>
                      setActive((active) => (active === "T" ? undefined : "T"))
                    }
                  >
                    <kbd
                      className={clsx(
                        active === "T"
                          ? "bg-sky-400 text-sky-100"
                          : "bg-slate-200 text-slate-400 dark:bg-slate-700",
                        "mr-1.5 rounded-full px-2 py-0.5 font-sans",
                      )}
                    >
                      T
                    </kbd>
                    Change Theme
                  </button>
                  <button
                    className={clsx(
                      active === "S"
                        ? "border-sky-500 bg-sky-500 text-white"
                        : "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500",
                      "mr-1.5 flex h-fit flex-shrink-0 items-center rounded-full border p-1 px-2 text-xs",
                    )}
                    onClick={() =>
                      setActive((active) => (active === "S" ? undefined : "S"))
                    }
                  >
                    <kbd
                      className={clsx(
                        active === "S"
                          ? "bg-sky-400 text-sky-100"
                          : "bg-slate-200 text-slate-400 dark:bg-slate-700",
                        "mr-1.5 rounded-full px-2 py-0.5 font-sans",
                      )}
                    >
                      <abbr title="Command" className="no-underline">
                        ⌥
                      </abbr>
                      S
                    </kbd>
                    Open Settings
                  </button>
                  <button
                    className={clsx(
                      active === "L"
                        ? "border-sky-500 bg-sky-500 text-white"
                        : "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500",
                      "mr-1.5 flex h-fit flex-shrink-0 items-center rounded-full border p-1 px-2 text-xs",
                    )}
                    onClick={() =>
                      setActive((active) => (active === "L" ? undefined : "L"))
                    }
                  >
                    <kbd
                      className={clsx(
                        active === "L"
                          ? "bg-sky-400 text-sky-100"
                          : "bg-slate-200 text-slate-400 dark:bg-slate-700",
                        "mr-1.5 rounded-full px-2 py-0.5 font-sans",
                      )}
                    >
                      L
                    </kbd>
                    Add Labels
                  </button>
                </div>
              </div>
              <Keyboard active={active} />
            </div>
            <div className="ml-0 mt-0 flex flex-col gap-0 sm:mt-4 sm:flex-row sm:gap-4 lg:ml-2 lg:mt-0 lg:w-1/2 lg:flex-col lg:gap-0">
              <div className="relative mb-4 flex h-60 w-full items-end justify-center overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <svg
                  className="absolute top-1/2 z-10 h-9 w-9 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="stroke-sky-500 opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                  />
                  <path
                    className="fill-sky-500 opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <div className="z-20 mb-6 flex flex-col items-center bg-white shadow-loading dark:bg-slate-950 dark:shadow-loading-dark">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Dynamic Commands
                  </h4>
                  <p className="w-56 text-center text-sm text-slate-600">
                    Work with your database or API to generate and fetch
                    commands.
                  </p>
                </div>
                <Image
                  src={
                    resolvedTheme === "dark"
                      ? "/home/cards/loading-dark.webp"
                      : "/home/cards/loading.webp"
                  }
                  width={414}
                  height={224}
                  alt="command menu with loading spinner"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  draggable={false}
                />
              </div>
              <div className="relative flex h-60 w-full flex-col items-center overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="z-10 mb-4 mt-8">
                  <h4 className="mb-0.5 text-center text-lg font-semibold">
                    Forever Free, Forever Open
                  </h4>
                  <p className="w-56 text-center text-sm text-slate-600 dark:text-slate-400">
                    Licensed under the GNU GPL v3 and fueled by your
                    contributions.
                  </p>
                </div>
                <Cards items={items} speed="normal" />
                <Cards items={items} direction="right" />
                <Cards items={items} speed="slow" />
              </div>
            </div>
          </div>
          <div className="mt-24 grid grid-cols-2 gap-x-2 gap-y-2 md:grid-cols-3 md:gap-y-4">
            <div className="inline-block">
              <FiZap className="mb-0.5 mr-1 inline h-4 w-4 text-slate-950 dark:text-slate-50" />
              <h5 className="inline font-medium">
                Fast.{" "}
                <span className="font-normal text-slate-500">
                  Seamlessly navigate the menus with snappy interactions.
                </span>
              </h5>
            </div>
            <div className="inline-block">
              <MdOutlineMobileFriendly className="mb-0.5 mr-1 inline h-4 w-4 text-slate-950 dark:text-slate-50" />
              <h5 className="inline font-medium">
                Responsive.{" "}
                <span className="font-normal text-slate-500">
                  Compatible with all types of screens and resolutions.
                </span>
              </h5>
            </div>
            <div className="inline-block">
              <LuPaintbrush2 className="mb-0.5 mr-1 inline h-4 w-4 text-slate-950 dark:text-slate-50" />
              <h5 className="inline font-medium">
                Customizable.{" "}
                <span className="font-normal text-slate-500">
                  Tweak each and every menu style to your preferences.
                </span>
              </h5>
            </div>
            <div className="inline-block">
              <TbAccessible className="mb-0.5 mr-1 inline h-4 w-4 text-slate-950 dark:text-slate-50" />
              <h5 className="inline font-medium">
                Accessible.{" "}
                <span className="font-normal text-slate-500">
                  Built with accessibility at the forefront, WCAG compliant.
                </span>
              </h5>
            </div>
            <div className="inline-block">
              <FiCheckSquare className="mb-0.5 mr-1 inline h-4 w-4 text-slate-950 dark:text-slate-50" />
              <h5 className="inline font-medium">
                Checkboxes.{" "}
                <span className="font-normal text-slate-500">
                  Add interactive functionality to your menus.
                </span>
              </h5>
            </div>
            <div className="inline-block">
              <FiPlus className="mb-0.5 mr-1 inline h-4 w-4 text-slate-950 dark:text-slate-50" />
              <h5 className="inline font-medium">
                Much More.{" "}
                <span className="font-normal text-slate-500">
                  Get started today and supercharge your navigation.
                </span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Cards = ({
  items,
  direction = "left",
  speed = "fast",
}: {
  items: {
    text: string;
    icon: ReactNode;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => addAnimation(), []);
  const [start, setStart] = useState(false);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current)
          scrollerRef.current.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left")
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      else
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast")
        containerRef.current.style.setProperty("--animation-duration", "40s");
      else if (speed === "normal")
        containerRef.current.style.setProperty("--animation-duration", "60s");
      else
        containerRef.current.style.setProperty("--animation-duration", "80s");
    }
  };

  return (
    <div
      ref={containerRef}
      className="scroller relative z-20 max-w-full overflow-hidden"
    >
      <ul
        ref={scrollerRef}
        className={clsx(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-x-2 py-1",
          start && "animate-scroll",
        )}
      >
        {items.map((item, index) => (
          <li
            className="flex items-center rounded-full border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800"
            key={index}
          >
            {item.icon}
            <p className="ml-1 mt-0.5">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Keyboard: FC<{ active: string | undefined }> = ({ active }) => (
  <svg
    width="482"
    height="171"
    viewBox="0 0 482 171"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute bottom-0 left-1/2 mb-6 -translate-x-1/2"
  >
    <rect
      x="0.698325"
      y="0.698325"
      width="480.541"
      height="169.724"
      rx="5.12847"
      className="fill-white stroke-slate-300 dark:fill-slate-800 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <rect
      x="8.54093"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="8.54093"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M18.8197 25.0844C18.2705 25.0844 17.831 24.9088 17.501 24.5576C17.1734 24.2041 17.0096 23.7162 17.0096 23.094C17.0096 22.4718 17.1711 21.9851 17.4939 21.634C17.8168 21.2804 18.247 21.1037 18.7843 21.1037C19.3287 21.1037 19.76 21.2875 20.0782 21.6552C20.3964 22.0205 20.5555 22.44 20.5555 22.9137L20.5201 23.3132H17.7273C17.7461 23.6715 17.8545 23.9484 18.0525 24.144C18.2505 24.3373 18.5062 24.4339 18.8197 24.4339C19.2156 24.4339 19.5173 24.2772 19.7247 23.9637H20.4848C20.3551 24.3007 20.1454 24.5718 19.8555 24.7768C19.5656 24.9819 19.2203 25.0844 18.8197 25.0844ZM17.7273 22.7334H19.8484C19.806 22.4247 19.6905 22.1843 19.502 22.0122C19.3134 21.8402 19.0742 21.7542 18.7843 21.7542C18.4944 21.7542 18.2552 21.8402 18.0667 22.0122C17.8781 22.1843 17.765 22.4247 17.7273 22.7334ZM22.5882 25.0844C22.1829 25.0844 21.8399 24.9807 21.5595 24.7733C21.279 24.5659 21.1023 24.296 21.0292 23.9637H21.7893C21.8859 24.2772 22.1522 24.4339 22.5882 24.4339C22.864 24.4339 23.0714 24.3891 23.2104 24.2996C23.3495 24.21 23.419 24.098 23.419 23.9637C23.419 23.8341 23.3636 23.7304 23.2529 23.6526C23.1421 23.5748 23.003 23.5206 22.8357 23.49C22.6707 23.4593 22.4916 23.4181 22.2984 23.3662C22.1051 23.312 21.9248 23.2508 21.7575 23.1824C21.5901 23.1141 21.4511 22.9986 21.3403 22.836C21.2295 22.671 21.1741 22.4683 21.1741 22.2279C21.1741 21.9097 21.2979 21.6434 21.5453 21.4289C21.7952 21.2121 22.1298 21.1037 22.5494 21.1037C22.9406 21.1037 23.2741 21.2003 23.5498 21.3936C23.8256 21.5868 23.9988 21.8402 24.0695 22.1537H23.3094C23.1751 21.8873 22.9217 21.7542 22.5494 21.7542C22.0898 21.7542 21.8612 21.9121 21.8635 22.2279C21.8635 22.3575 21.9189 22.4624 22.0297 22.5425C22.1404 22.6203 22.2783 22.6757 22.4433 22.7087C22.6106 22.7393 22.7909 22.7829 22.9842 22.8395C23.1774 22.8937 23.3566 22.955 23.5215 23.0233C23.6889 23.0893 23.8279 23.2036 23.9387 23.3662C24.0518 23.5289 24.1084 23.728 24.1084 23.9637C24.1084 24.2819 23.9729 24.5482 23.7018 24.7627C23.4332 24.9771 23.062 25.0844 22.5882 25.0844ZM26.4275 25.0844C25.8784 25.0844 25.4388 24.9088 25.1089 24.5576C24.7813 24.2041 24.6175 23.7162 24.6175 23.094C24.6175 22.4718 24.7813 21.9851 25.1089 21.634C25.4365 21.2804 25.876 21.1037 26.4275 21.1037C26.8329 21.1037 27.1782 21.2086 27.4633 21.4183C27.7485 21.6281 27.9465 21.9097 28.0573 22.2632H27.3325C27.144 21.9262 26.8423 21.7565 26.4275 21.7542C26.0952 21.7542 25.8242 21.872 25.6144 22.1077C25.407 22.341 25.3033 22.671 25.3033 23.0976C25.3033 23.5218 25.407 23.8506 25.6144 24.0839C25.8242 24.3172 26.0952 24.4339 26.4275 24.4339C26.8423 24.4339 27.144 24.2654 27.3325 23.9284H28.0573C27.9465 24.2819 27.7485 24.5635 27.4633 24.7733C27.1782 24.9807 26.8329 25.0844 26.4275 25.0844Z"
      className="fill-slate-400"
    />
    <rect
      x="8.61515"
      y="105.517"
      width="72.5299"
      height="27.7358"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="8.61515"
      y="105.517"
      width="72.5299"
      height="27.7358"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M17.2931 122.955C16.8877 122.955 16.5448 122.851 16.2643 122.644C15.9838 122.436 15.8071 122.167 15.734 121.834H16.4941C16.5907 122.148 16.857 122.304 17.2931 122.304C17.5688 122.304 17.7762 122.26 17.9153 122.17C18.0543 122.081 18.1238 121.969 18.1238 121.834C18.1238 121.705 18.0685 121.601 17.9577 121.523C17.8469 121.445 17.7079 121.391 17.5405 121.361C17.3755 121.33 17.1964 121.289 17.0032 121.237C16.8099 121.183 16.6296 121.121 16.4623 121.053C16.2949 120.985 16.1559 120.869 16.0451 120.707C15.9343 120.542 15.879 120.339 15.879 120.099C15.879 119.78 16.0027 119.514 16.2502 119.3C16.5 119.083 16.8346 118.974 17.2542 118.974C17.6454 118.974 17.9789 119.071 18.2546 119.264C18.5304 119.457 18.7036 119.711 18.7743 120.024H18.0142C17.8799 119.758 17.6265 119.625 17.2542 119.625C16.7946 119.625 16.566 119.783 16.5683 120.099C16.5683 120.228 16.6237 120.333 16.7345 120.413C16.8453 120.491 16.9831 120.546 17.1481 120.579C17.3154 120.61 17.4957 120.654 17.689 120.71C17.8823 120.764 18.0614 120.826 18.2264 120.894C18.3937 120.96 18.5327 121.074 18.6435 121.237C18.7566 121.399 18.8132 121.599 18.8132 121.834C18.8132 122.152 18.6777 122.419 18.4067 122.633C18.138 122.848 17.7668 122.955 17.2931 122.955ZM19.5379 122.884V117.815H20.2273V119.519H20.2627C20.3687 119.344 20.516 119.21 20.7046 119.116C20.8931 119.021 21.0958 118.974 21.3126 118.974C21.7321 118.974 22.0715 119.117 22.3308 119.402C22.5924 119.687 22.7232 120.063 22.7232 120.53V122.884H22.0374V120.569C22.0374 120.269 21.9572 120.037 21.797 119.872C21.6391 119.707 21.4293 119.625 21.1677 119.625C20.9014 119.625 20.6775 119.718 20.496 119.904C20.3169 120.09 20.2273 120.312 20.2273 120.569V122.884H19.5379ZM23.6318 122.884V119.049H24.3211V122.884H23.6318ZM23.9782 118.614C23.8439 118.614 23.7343 118.571 23.6494 118.486C23.5646 118.402 23.5222 118.294 23.5222 118.165C23.5222 118.03 23.5646 117.921 23.6494 117.836C23.7343 117.751 23.8439 117.709 23.9782 117.709C24.1078 117.709 24.2151 117.751 24.2999 117.836C24.3848 117.918 24.4272 118.028 24.4272 118.165C24.4272 118.294 24.3848 118.402 24.2999 118.486C24.2151 118.571 24.1078 118.614 23.9782 118.614ZM25.5479 122.884V119.699H24.9327V119.049H25.5479V118.759C25.5479 118.45 25.6398 118.204 25.8236 118.02C26.0074 117.836 26.2537 117.744 26.5625 117.744H27.1776V118.395H26.6332C26.5083 118.395 26.4105 118.431 26.3398 118.504C26.2714 118.577 26.2372 118.674 26.2372 118.794V119.049H27.1776V119.699H26.2372V122.884H25.5479ZM29.0937 122.884C28.7897 122.884 28.5446 122.79 28.3584 122.601C28.1722 122.413 28.0791 122.169 28.0791 121.87V119.699H27.464V119.049H28.0791L28.1887 118.034H28.7685V119.049H29.7088V119.699H28.7685V121.799C28.7685 121.929 28.8026 122.033 28.871 122.114C28.9417 122.194 29.0395 122.234 29.1644 122.234H29.7088V122.884H29.0937Z"
      className="fill-slate-400"
    />
    <rect
      x="41.123"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="41.123"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M55.1911 20.4111C55.1039 20.5031 54.9908 20.549 54.8517 20.549C54.7127 20.549 54.5995 20.5031 54.5123 20.4111C54.4251 20.3192 54.3815 20.2085 54.3815 20.0788C54.3815 19.9492 54.4251 19.8384 54.5123 19.7465C54.5995 19.6546 54.7127 19.6086 54.8517 19.6086C54.9908 19.6086 55.1039 19.6546 55.1911 19.7465C55.2783 19.8384 55.3219 19.9492 55.3219 20.0788C55.3219 20.2085 55.2783 20.3192 55.1911 20.4111ZM54.5618 18.9935L54.4522 15.8436V15.4441H55.2512V15.8436L55.1416 18.9935H54.5618Z"
      className="fill-slate-400"
    />
    <path
      d="M54.9967 29.5137V25.7486H54.0174V25.0981H54.7068C54.9 25.0981 54.9967 24.9992 54.9967 24.8012V24.4441H55.7568V29.5137H54.9967Z"
      className="fill-slate-400"
    />
    <rect
      x="73.703"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="73.703"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M87.712 19.996C87.9736 19.996 88.1716 19.91 88.306 19.738C88.4403 19.5659 88.5075 19.3255 88.5075 19.0168C88.5075 18.708 88.4403 18.4688 88.306 18.2991C88.1716 18.1271 87.9736 18.041 87.712 18.041C87.441 18.041 87.2348 18.1271 87.0934 18.2991C86.952 18.4688 86.8813 18.708 86.8813 19.0168C86.8813 19.3255 86.9531 19.5659 87.0969 19.738C87.2407 19.91 87.4457 19.996 87.712 19.996ZM87.5317 21.8061C86.7116 21.8061 86.0481 21.5456 85.5414 21.0248C85.0347 20.5016 84.7813 19.8087 84.7813 18.9461C84.7813 18.1023 85.0524 17.4153 85.5944 16.885C86.1365 16.3524 86.8542 16.086 87.7474 16.086C88.6406 16.086 89.3583 16.35 89.9004 16.8779C90.4448 17.4059 90.717 18.0705 90.717 18.8718C90.717 19.428 90.6074 19.8452 90.3882 20.1233C90.169 20.399 89.8733 20.5369 89.5009 20.5369C89.3807 20.5369 89.2687 20.5204 89.165 20.4874C89.0613 20.4521 88.9788 20.4096 88.9176 20.3602C88.8563 20.3083 88.8056 20.2576 88.7655 20.2081C88.7255 20.1563 88.6984 20.1139 88.6842 20.0809L88.6524 20.0314H88.6171C88.4191 20.3684 88.0809 20.5369 87.6024 20.5369C87.1971 20.5369 86.8718 20.399 86.6267 20.1233C86.384 19.8452 86.2626 19.4763 86.2626 19.0168C86.2626 18.5478 86.3816 18.1777 86.6196 17.9067C86.86 17.6333 87.1759 17.4966 87.5671 17.4966C88.0008 17.4966 88.3142 17.6168 88.5075 17.8572H88.5464L88.6171 17.532H89.0873V19.5223C89.0873 19.6566 89.1261 19.7627 89.2039 19.8405C89.2817 19.9182 89.376 19.9571 89.4867 19.9571C89.6894 19.9571 89.8426 19.8794 89.9463 19.7238C90.05 19.5659 90.1019 19.2937 90.1019 18.9072C90.1019 18.2661 89.8886 17.7323 89.462 17.3057C89.0378 16.8768 88.4662 16.6623 87.7474 16.6623C87.038 16.6623 86.4688 16.8744 86.0399 17.2986C85.6109 17.7205 85.3965 18.2696 85.3965 18.9461C85.3965 19.6413 85.5932 20.1952 85.9868 20.6076C86.3804 21.0201 86.8954 21.2263 87.5317 21.2263H88.7974V21.8061H87.5317Z"
      className="fill-slate-400"
    />
    <path
      d="M85.7071 28.9102V28.2208L87.952 26.0501C88.2183 25.7932 88.3514 25.5281 88.3514 25.2547C88.3514 24.7244 88.0498 24.4581 87.4464 24.4557C87.1801 24.4557 86.9597 24.5288 86.7853 24.6749C86.6133 24.8187 86.5072 25.012 86.4672 25.2547H85.7071C85.766 24.8163 85.9451 24.4593 86.2444 24.1835C86.5438 23.9078 86.9444 23.7699 87.4464 23.7699C87.9767 23.7699 88.3927 23.9066 88.6944 24.18C88.996 24.451 89.1469 24.8093 89.1469 25.2547C89.1469 25.4998 89.0903 25.7155 88.9772 25.9017C88.8641 26.0878 88.7038 26.2823 88.4964 26.485L86.7217 28.2208H89.2176V28.9102H85.7071Z"
      className="fill-slate-400"
    />
    <rect
      x="106.285"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="106.285"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M119.717 18.5587H120.693L120.948 17.3991H119.968L119.717 18.5587ZM118.653 20.5137L118.933 19.1738H118.109L118.254 18.5587H119.063L119.318 17.3991H118.469L118.614 16.784H119.449L119.739 15.4441H120.389L120.099 16.784H121.078L121.368 15.4441H122.019L121.729 16.784H122.56L122.418 17.3991H121.598L121.344 18.5587H122.199L122.054 19.1738H121.216L120.933 20.5137H120.279L120.562 19.1738H119.587L119.304 20.5137H118.653Z"
      className="fill-slate-400"
    />
    <path
      d="M120.028 29.5844C119.517 29.5844 119.094 29.4595 118.759 29.2096C118.427 28.9575 118.234 28.5886 118.18 28.1031H118.94C118.973 28.3341 119.093 28.525 119.3 28.6758C119.51 28.8243 119.753 28.8985 120.028 28.8985C120.347 28.8985 120.594 28.8267 120.771 28.6829C120.95 28.5368 121.04 28.3435 121.04 28.1031C121.04 27.8674 120.945 27.6753 120.757 27.5269C120.571 27.3784 120.321 27.3041 120.007 27.3041H119.629V26.6537H120.007C120.316 26.6537 120.553 26.5818 120.718 26.438C120.885 26.2919 120.969 26.0986 120.969 25.8582C120.969 25.6155 120.886 25.4222 120.721 25.2784C120.559 25.1323 120.328 25.0593 120.028 25.0593C119.767 25.0593 119.541 25.1311 119.35 25.2749C119.159 25.4163 119.047 25.6108 119.014 25.8582H118.254C118.327 25.3798 118.52 25.0133 118.834 24.7588C119.147 24.5019 119.545 24.3734 120.028 24.3734C120.549 24.3734 120.963 24.5054 121.269 24.7694C121.576 25.031 121.729 25.3821 121.729 25.8229C121.729 26.0939 121.661 26.3261 121.524 26.5193C121.39 26.7102 121.205 26.8516 120.969 26.9435C121.226 27.0355 121.428 27.1863 121.577 27.3961C121.725 27.6058 121.8 27.8533 121.8 28.1385C121.8 28.5627 121.642 28.9103 121.326 29.1814C121.01 29.45 120.578 29.5844 120.028 29.5844Z"
      className="fill-slate-400"
    />
    <rect
      x="138.865"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="138.865"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M152.319 21.3091V20.5632C151.89 20.509 151.539 20.3569 151.265 20.1071C150.992 19.8573 150.823 19.5344 150.76 19.1385H151.52C151.663 19.6452 152.05 19.8985 152.679 19.8985C153.047 19.8985 153.326 19.8278 153.517 19.6864C153.708 19.5427 153.803 19.3482 153.803 19.1031C153.803 18.9428 153.749 18.8097 153.641 18.7036C153.535 18.5976 153.396 18.5186 153.224 18.4668C153.054 18.4126 152.867 18.3642 152.662 18.3218C152.457 18.277 152.251 18.2228 152.046 18.1592C151.841 18.0932 151.653 18.0107 151.481 17.9117C151.311 17.8127 151.172 17.6678 151.064 17.4769C150.958 17.286 150.905 17.055 150.905 16.784C150.905 16.4163 151.031 16.1076 151.283 15.8577C151.537 15.6079 151.883 15.4536 152.319 15.3946V14.6487H153.079V15.4017C153.461 15.4606 153.77 15.5997 154.008 15.8189C154.247 16.038 154.407 16.3244 154.489 16.6779H153.729C153.564 16.2678 153.214 16.0616 152.679 16.0593C152.366 16.0593 152.118 16.1288 151.937 16.2678C151.755 16.4045 151.665 16.5766 151.665 16.784C151.665 16.9537 151.719 17.0951 151.827 17.2082C151.938 17.3213 152.078 17.4085 152.248 17.4698C152.42 17.5287 152.611 17.583 152.821 17.6324C153.03 17.6796 153.239 17.7361 153.446 17.8021C153.654 17.8681 153.844 17.9483 154.016 18.0425C154.188 18.1368 154.328 18.2735 154.436 18.4526C154.545 18.6294 154.599 18.8462 154.599 19.1031C154.599 19.4708 154.463 19.7901 154.192 20.0612C153.924 20.3298 153.552 20.4948 153.079 20.5561V21.3091H152.319Z"
      className="fill-slate-400"
    />
    <path
      d="M153.114 29.5137V28.393H150.689V27.7036L152.824 24.4441H153.874V27.7036H154.525V28.393H153.874V29.5137H153.114ZM151.484 27.7036H153.114V25.2784H153.079L151.484 27.7036Z"
      className="fill-slate-400"
    />
    <rect
      x="171.446"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="171.446"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M183.42 20.5137L186.57 15.4441H187.295L184.145 20.5137H183.42ZM187.518 20.2591C187.306 20.476 187.025 20.5844 186.676 20.5844C186.33 20.5844 186.051 20.476 185.839 20.2591C185.626 20.0423 185.52 19.7536 185.52 19.393C185.52 19.03 185.626 18.7402 185.839 18.5233C186.051 18.3065 186.33 18.1981 186.676 18.1981C187.025 18.1981 187.306 18.3065 187.518 18.5233C187.732 18.7402 187.839 19.03 187.839 19.393C187.839 19.7536 187.732 20.0423 187.518 20.2591ZM186.256 19.8667C186.359 19.9846 186.501 20.0435 186.68 20.0435C186.859 20.0435 187 19.9846 187.104 19.8667C187.208 19.7489 187.26 19.591 187.26 19.393C187.26 19.195 187.208 19.0371 187.104 18.9193C187 18.7991 186.859 18.739 186.68 18.739C186.501 18.739 186.359 18.7991 186.256 18.9193C186.152 19.0371 186.1 19.195 186.1 19.393C186.1 19.591 186.152 19.7489 186.256 19.8667ZM184.877 17.438C184.665 17.6548 184.384 17.7632 184.036 17.7632C183.689 17.7632 183.41 17.6548 183.198 17.438C182.986 17.2188 182.88 16.9289 182.88 16.5683C182.88 16.2054 182.986 15.9155 183.198 15.6987C183.41 15.4818 183.689 15.3734 184.036 15.3734C184.384 15.3734 184.665 15.4818 184.877 15.6987C185.089 15.9155 185.195 16.2054 185.195 16.5683C185.195 16.9289 185.089 17.2188 184.877 17.438ZM183.615 17.0421C183.719 17.1599 183.859 17.2188 184.036 17.2188C184.215 17.2188 184.356 17.1599 184.46 17.0421C184.563 16.9242 184.615 16.7663 184.615 16.5683C184.615 16.3704 184.563 16.2125 184.46 16.0946C184.356 15.9768 184.215 15.9178 184.036 15.9178C183.859 15.9178 183.719 15.9768 183.615 16.0946C183.511 16.2125 183.459 16.3704 183.459 16.5683C183.459 16.7663 183.511 16.9242 183.615 17.0421Z"
      className="fill-slate-400"
    />
    <path
      d="M185.225 29.5844C184.796 29.5844 184.414 29.4524 184.08 29.1884C183.747 28.9221 183.537 28.5603 183.45 28.1031H184.21C184.265 28.3388 184.384 28.5309 184.567 28.6794C184.754 28.8255 184.973 28.8985 185.225 28.8985C185.567 28.8985 185.833 28.8054 186.024 28.6193C186.215 28.4331 186.31 28.1762 186.31 27.8486C186.31 27.5304 186.214 27.27 186.02 27.0673C185.827 26.8646 185.562 26.7632 185.225 26.7632C184.848 26.7632 184.534 26.9318 184.285 27.2688H183.56L183.814 24.4441H186.78V25.1335H184.465L184.355 26.438H184.391C184.648 26.2212 184.974 26.1116 185.37 26.1092C185.858 26.1092 186.263 26.2766 186.586 26.6112C186.909 26.9435 187.07 27.356 187.07 27.8486C187.07 28.3647 186.905 28.7831 186.575 29.1036C186.245 29.4241 185.795 29.5844 185.225 29.5844Z"
      className="fill-slate-400"
    />
    <rect
      x="204.027"
      y="7.33537"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="204.027"
      y="7.33537"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M216.496 17.7637L217.581 15.4446H218.271L219.356 17.7637H218.705L217.945 16.0597H217.907L217.146 17.7637H216.496Z"
      className="fill-slate-400"
    />
    <path
      d="M217.841 28.899C218.164 28.899 218.42 28.8071 218.608 28.6233C218.797 28.4394 218.891 28.1932 218.891 27.8844C218.891 27.5757 218.797 27.3294 218.608 27.1455C218.42 26.9617 218.164 26.8698 217.841 26.8698C217.514 26.8698 217.251 26.9617 217.053 27.1455C216.855 27.3294 216.756 27.5757 216.756 27.8844C216.756 28.1932 216.855 28.4394 217.053 28.6233C217.251 28.8071 217.514 28.899 217.841 28.899ZM217.841 29.5849C217.28 29.5849 216.833 29.4211 216.498 29.0935C216.163 28.7659 215.996 28.3393 215.996 27.8137C215.996 27.34 216.164 26.8333 216.501 26.2935L217.661 24.4446H218.531L217.226 26.3996H217.262C217.441 26.2794 217.666 26.2193 217.937 26.2193C218.444 26.2193 218.856 26.376 219.174 26.6895C219.492 27.003 219.651 27.4013 219.651 27.8844C219.651 28.3817 219.486 28.7894 219.156 29.1076C218.829 29.4258 218.39 29.5849 217.841 29.5849Z"
      className="fill-slate-400"
    />
    <rect
      x="236.607"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="236.607"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M250.025 19.9339C250.436 19.9339 250.809 19.7654 251.146 19.4284L249.987 18.3041L249.736 18.488C249.422 18.7095 249.264 18.9629 249.262 19.2481C249.262 19.4555 249.337 19.6216 249.488 19.7465C249.639 19.8714 249.818 19.9339 250.025 19.9339ZM250.061 20.5844C249.568 20.5844 249.185 20.463 248.912 20.2202C248.638 19.9775 248.502 19.6652 248.502 19.2834C248.502 19.0171 248.562 18.7896 248.682 18.6011C248.805 18.4126 248.986 18.2299 249.227 18.0531L249.516 17.834L249.301 17.6183C249.131 17.4486 249.004 17.2895 248.919 17.141C248.834 16.9902 248.792 16.8111 248.792 16.6037C248.792 16.2619 248.919 15.9721 249.173 15.734C249.43 15.4936 249.762 15.3734 250.167 15.3734C250.577 15.3734 250.902 15.4877 251.143 15.7163C251.385 15.945 251.507 16.2407 251.507 16.6037C251.507 17.0373 251.278 17.3991 250.821 17.689L250.531 17.8693L251.616 18.9582L252.231 18.343H253.172L252.122 19.4284L253.211 20.5137H252.231L251.652 19.9339C251.487 20.0635 251.348 20.166 251.235 20.2415C251.121 20.3169 250.956 20.3935 250.74 20.4712C250.523 20.5467 250.297 20.5844 250.061 20.5844ZM250.061 17.4734L250.386 17.2188C250.652 17.0161 250.786 16.8111 250.786 16.6037C250.786 16.434 250.729 16.2949 250.616 16.1865C250.505 16.0781 250.355 16.0239 250.167 16.0239C249.969 16.0239 249.811 16.0781 249.693 16.1865C249.575 16.2949 249.516 16.4458 249.516 16.639C249.516 16.8323 249.625 17.0373 249.842 17.2542L250.061 17.4734Z"
      className="fill-slate-400"
    />
    <path
      d="M249.582 29.5137L251.501 25.1335H249.002V24.4441H252.336V25.1335L250.416 29.5137H249.582Z"
      className="fill-slate-400"
    />
    <rect
      x="269.187"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="269.187"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M282.526 18.1592L281.981 17.7986L282.706 16.9643L281.621 16.7133L281.836 16.0981L282.816 16.4941L282.741 15.4441H283.392L283.321 16.4941L284.297 16.0981L284.516 16.7133L283.431 16.9643L284.152 17.7986L283.611 18.1592L283.067 17.2542L282.526 18.1592Z"
      className="fill-slate-400"
    />
    <path
      d="M282.27 28.6758C282.458 28.8243 282.714 28.8985 283.037 28.8985C283.362 28.8985 283.618 28.8243 283.804 28.6758C283.993 28.525 284.087 28.3223 284.087 28.0678C284.087 27.8109 283.993 27.6082 283.804 27.4597C283.618 27.3089 283.362 27.2334 283.037 27.2334C282.714 27.2334 282.458 27.3089 282.27 27.4597C282.081 27.6082 281.987 27.8109 281.987 28.0678C281.987 28.3223 282.081 28.525 282.27 28.6758ZM284.366 29.1672C284.046 29.4453 283.602 29.5844 283.037 29.5844C282.474 29.5844 282.03 29.4453 281.708 29.1672C281.387 28.8868 281.227 28.5273 281.227 28.089C281.227 27.8321 281.309 27.5952 281.474 27.3784C281.639 27.1616 281.835 27.0048 282.061 26.9082C281.863 26.8068 281.692 26.6595 281.549 26.4663C281.407 26.273 281.336 26.0586 281.336 25.8229C281.336 25.4034 281.492 25.0569 281.803 24.7835C282.114 24.5101 282.525 24.3734 283.037 24.3734C283.548 24.3734 283.96 24.5101 284.271 24.7835C284.584 25.0545 284.741 25.401 284.741 25.8229C284.741 26.0586 284.669 26.273 284.525 26.4663C284.384 26.6595 284.214 26.8068 284.016 26.9082C284.242 27.0048 284.437 27.1616 284.599 27.3784C284.764 27.5952 284.847 27.8321 284.847 28.089C284.847 28.5273 284.687 28.8868 284.366 29.1672ZM282.34 26.3744C282.505 26.5134 282.738 26.583 283.037 26.583C283.336 26.583 283.568 26.5134 283.733 26.3744C283.898 26.233 283.981 26.0491 283.981 25.8229C283.981 25.5943 283.898 25.4104 283.733 25.2714C283.568 25.13 283.336 25.0593 283.037 25.0593C282.738 25.0593 282.505 25.13 282.34 25.2714C282.178 25.4104 282.096 25.5943 282.096 25.8229C282.096 26.0491 282.178 26.233 282.34 26.3744Z"
      className="fill-slate-400"
    />
    <rect
      x="313.325"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="313.325"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M328.979 117.857L325.865 116.337V115.686L328.979 114.166V114.852L326.554 116.011L328.979 117.171V117.857Z"
      className="fill-slate-400"
    />
    <path
      d="M326.72 128.016L327.009 126.532H327.699L327.264 128.016H326.72Z"
      className="fill-slate-400"
    />
    <rect
      x="301.769"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="301.769"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M315.859 21.9631C315.564 21.5389 315.333 21.0357 315.166 20.4536C315.001 19.8714 314.918 19.2528 314.918 18.5976C314.918 17.94 315.001 17.3202 315.166 16.738C315.333 16.1559 315.564 15.6527 315.859 15.2285H316.584C315.957 16.1547 315.643 17.2766 315.643 18.594C315.643 19.9115 315.957 21.0345 316.584 21.9631H315.859Z"
      className="fill-slate-400"
    />
    <path
      d="M314.898 29.5137L316.199 27.5587H316.163C315.984 27.6789 315.76 27.739 315.492 27.739C314.985 27.739 314.571 27.5822 314.251 27.2688C313.933 26.9553 313.773 26.557 313.773 26.0739C313.773 25.5766 313.937 25.1689 314.265 24.8507C314.595 24.5325 315.034 24.3734 315.584 24.3734C316.144 24.3734 316.592 24.5372 316.927 24.8648C317.262 25.1924 317.429 25.6202 317.429 26.1481C317.429 26.6218 317.26 27.1286 316.923 27.6683L315.764 29.5137H314.898ZM315.584 27.0885C315.911 27.0885 316.174 26.9966 316.372 26.8127C316.57 26.6289 316.669 26.3826 316.669 26.0739C316.669 25.7651 316.57 25.5188 316.372 25.335C316.174 25.1512 315.911 25.0593 315.584 25.0593C315.261 25.0593 315.005 25.1512 314.816 25.335C314.628 25.5188 314.534 25.7651 314.534 26.0739C314.534 26.3826 314.628 26.6289 314.816 26.8127C315.005 26.9966 315.261 27.0885 315.584 27.0885Z"
      className="fill-slate-400"
    />
    <rect
      x="334.351"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="334.351"
      y="7.33488"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M347.21 21.9631C347.837 21.0369 348.15 19.915 348.15 18.5976C348.15 17.2777 347.837 16.1547 347.21 15.2285H347.934C348.229 15.6527 348.459 16.1559 348.624 16.738C348.791 17.3202 348.875 17.94 348.875 18.5976C348.875 19.2528 348.791 19.8714 348.624 20.4536C348.459 21.0334 348.229 21.5365 347.934 21.9631H347.21Z"
      className="fill-slate-400"
    />
    <path
      d="M349.982 28.9162C349.6 29.3617 349.091 29.5844 348.454 29.5844C347.818 29.5844 347.309 29.3617 346.927 28.9162C346.545 28.4708 346.355 27.8262 346.355 26.9824C346.355 26.1363 346.545 25.4906 346.927 25.0451C347.309 24.5973 347.818 24.3734 348.454 24.3734C349.091 24.3734 349.6 24.5973 349.982 25.0451C350.364 25.4906 350.554 26.1363 350.554 26.9824C350.554 27.8262 350.364 28.4708 349.982 28.9162ZM347.493 28.4107C347.747 28.7359 348.068 28.8985 348.454 28.8985C348.841 28.8985 349.16 28.7359 349.413 28.4107C349.667 28.0831 349.794 27.6058 349.794 26.9789C349.794 26.352 349.667 25.8759 349.413 25.5507C349.16 25.2231 348.841 25.0593 348.454 25.0593C348.068 25.0593 347.747 25.2231 347.493 25.5507C347.241 25.8759 347.115 26.352 347.115 26.9789C347.115 27.6058 347.241 28.0831 347.493 28.4107Z"
      className="fill-slate-400"
    />
    <rect
      x="54.3984"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="54.3984"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M69.3775 58.3185L68.8932 57.5867C68.6717 57.6409 68.4478 57.6668 68.2215 57.6645C67.5168 57.6645 66.9535 57.437 66.5317 56.9822C66.1121 56.5249 65.9024 55.8839 65.9024 55.059C65.9024 54.2341 66.1133 53.5942 66.5352 53.1393C66.9594 52.6821 67.5215 52.4535 68.2215 52.4535C68.9262 52.4535 69.4883 52.6821 69.9078 53.1393C70.3273 53.5942 70.5371 54.2341 70.5371 55.059C70.5371 56.1172 70.2036 56.8655 69.5366 57.3039L70.2119 58.3185H69.3775ZM68.2215 56.9786L68.4725 56.9645L67.822 55.964H68.6528L69.1336 56.6887C69.5626 56.3517 69.777 55.8084 69.777 55.059C69.777 54.4415 69.6344 53.9678 69.3493 53.6378C69.0641 53.3055 68.687 53.1393 68.218 53.1393C67.7513 53.1393 67.3754 53.3055 67.0902 53.6378C66.8051 53.9678 66.6625 54.4415 66.6625 55.059C66.6625 55.6765 66.8051 56.1514 67.0902 56.4837C67.3754 56.8136 67.7525 56.9786 68.2215 56.9786Z"
      className="fill-slate-400"
    />
    <rect
      x="217.302"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="217.302"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M230.72 57.5938V55.713L228.945 52.5242H229.741L231.08 54.9494H231.116L232.456 52.5242H233.251L231.48 55.713V57.5938H230.72Z"
      className="fill-slate-400"
    />
    <rect
      x="249.884"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="249.884"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M265.057 57.0882C264.706 57.4724 264.219 57.6645 263.597 57.6645C262.975 57.6645 262.487 57.4724 262.134 57.0882C261.783 56.7017 261.607 56.1584 261.607 55.4585V52.5242H262.367V55.4585C262.367 55.9369 262.479 56.3105 262.703 56.5791C262.927 56.8455 263.224 56.9786 263.594 56.9786C263.966 56.9786 264.264 56.8455 264.488 56.5791C264.714 56.3105 264.828 55.9369 264.828 55.4585V52.5242H265.588V55.4585C265.588 56.1584 265.411 56.7017 265.057 57.0882Z"
      className="fill-slate-400"
    />
    <rect
      x="282.464"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="282.464"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M296.222 57.5938V52.5242H296.982V57.5938H296.222Z"
      className="fill-slate-400"
    />
    <rect
      x="86.9794"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="86.9794"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M99.0334 57.5938L97.7289 52.5242H98.5279L99.5036 56.618H99.539L100.518 52.5242H101.459L102.438 56.618H102.473L103.449 52.5242H104.248L102.943 57.5938H101.968L101.003 53.5388H100.974L100.013 57.5938H99.0334Z"
      className="fill-slate-400"
    />
    <rect
      x="119.56"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="119.56"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M131.819 57.5938V52.5242H135.075V53.2136H132.579V54.6984H134.93V55.3842H132.579V56.9044H135.149V57.5938H131.819Z"
      className="fill-slate-400"
    />
    <rect
      x="152.142"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="152.142"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M164.4 57.5938V52.5242H166.426C166.914 52.5242 167.307 52.6668 167.607 52.952C167.906 53.2371 168.056 53.6142 168.056 54.0832C168.056 54.3284 168.014 54.5511 167.932 54.7514C167.849 54.9517 167.742 55.112 167.61 55.2322C167.478 55.35 167.343 55.4431 167.204 55.5115C167.067 55.5775 166.929 55.6199 166.79 55.6388L168.165 57.5938H167.295L165.92 55.6388H165.16V57.5938H164.4ZM165.16 54.9494H166.355C166.645 54.9494 166.874 54.8728 167.041 54.7196C167.211 54.564 167.295 54.3519 167.295 54.0832C167.295 53.8122 167.211 53.6001 167.041 53.4469C166.874 53.2914 166.645 53.2136 166.355 53.2136H165.16V54.9494Z"
      className="fill-slate-400"
    />
    <rect
      x="184.723"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className={clsx(
        active === "T" ? "fill-sky-500" : "fill-slate-200 dark:fill-slate-900",
        "transition-colors",
      )}
    />
    <rect
      x="184.723"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className={clsx(
        active === "T"
          ? "stroke-sky-500"
          : "stroke-slate-300 dark:stroke-slate-700",
        "transition-colors",
      )}
      strokeWidth="0.603349"
    />
    <path
      d="M198.141 57.5938V53.2136H196.546V52.5242H200.492V53.2136H198.901V57.5938H198.141Z"
      className={clsx(
        active === "T" ? "fill-slate-100" : "fill-slate-400",
        "transition-colors",
      )}
    />
    <rect
      x="8.54386"
      y="39.915"
      width="41.6311"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="8.54386"
      y="39.915"
      width="41.6311"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M17.2571 57.5938C16.9531 57.5938 16.708 57.4995 16.5218 57.3109C16.3356 57.1224 16.2425 56.8785 16.2425 56.5791V54.4085H15.6274V53.758H16.2425L16.3521 52.7434H16.9319V53.758H17.8723V54.4085H16.9319V56.5084C16.9319 56.6381 16.966 56.7429 17.0344 56.8231C17.1051 56.9032 17.2029 56.9433 17.3278 56.9433H17.8723V57.5938H17.2571ZM19.8272 57.0493C20.1454 57.0493 20.4 56.9621 20.5909 56.7877C20.7818 56.611 20.8772 56.3847 20.8772 56.1089V55.8933H19.8626C19.6128 55.8933 19.423 55.9451 19.2934 56.0488C19.1662 56.1525 19.1025 56.294 19.1025 56.4731C19.1025 56.6498 19.1662 56.7901 19.2934 56.8938C19.423 56.9975 19.601 57.0493 19.8272 57.0493ZM19.7177 57.6645C19.3311 57.6645 19.0177 57.549 18.7773 57.318C18.5369 57.087 18.4167 56.8054 18.4167 56.4731C18.4167 56.1313 18.5439 55.8473 18.7985 55.6211C19.0554 55.3925 19.4101 55.2782 19.8626 55.2782H20.8772V55.0943C20.8772 54.8586 20.8018 54.6736 20.651 54.5393C20.5025 54.4026 20.2998 54.3342 20.0429 54.3342C19.8355 54.3342 19.667 54.379 19.5374 54.4686C19.4077 54.5581 19.3229 54.6713 19.2828 54.808H18.5616C18.6347 54.4898 18.8067 54.2235 19.0778 54.009C19.3512 53.7922 19.6729 53.6838 20.0429 53.6838C20.5213 53.6838 20.8949 53.8134 21.1636 54.0726C21.4322 54.3295 21.5666 54.6701 21.5666 55.0943V57.5938H20.9868L20.9126 57.1236H20.8772C20.7947 57.2626 20.6486 57.3875 20.4388 57.4983C20.2291 57.6091 19.9887 57.6645 19.7177 57.6645ZM24.2817 57.014C24.5998 57.014 24.8544 56.9008 25.0453 56.6746C25.2362 56.4483 25.3316 56.116 25.3316 55.6776C25.3316 55.2369 25.2362 54.9034 25.0453 54.6772C24.8544 54.4486 24.5998 54.3342 24.2817 54.3342C23.9588 54.3342 23.6972 54.4497 23.4968 54.6807C23.2965 54.9093 23.1963 55.2416 23.1963 55.6776C23.1963 56.1113 23.2965 56.4424 23.4968 56.671C23.6972 56.8997 23.9588 57.014 24.2817 57.014ZM24.3913 57.6645C23.894 57.6645 23.4957 57.4724 23.1963 57.0882H23.161L23.0514 57.5938H22.507V52.5242H23.1963V54.2282H23.2317C23.5027 53.8652 23.8892 53.6838 24.3913 53.6838C24.8791 53.6838 25.2727 53.8582 25.572 54.207C25.8713 54.5534 26.021 55.0437 26.021 55.6776C26.021 56.3093 25.8713 56.7983 25.572 57.1448C25.2727 57.4912 24.8791 57.6645 24.3913 57.6645Z"
      className="fill-slate-400"
    />
    <rect
      x="315.045"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="315.045"
      y="39.915"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M330.554 56.9857C330.135 57.4382 329.573 57.6645 328.868 57.6645C328.163 57.6645 327.6 57.437 327.178 56.9822C326.759 56.5249 326.549 55.8839 326.549 55.059C326.549 54.2341 326.76 53.5942 327.182 53.1393C327.606 52.6821 328.168 52.4535 328.868 52.4535C329.573 52.4535 330.135 52.6821 330.554 53.1393C330.974 53.5942 331.184 54.2341 331.184 55.059C331.184 55.8886 330.974 56.5308 330.554 56.9857ZM327.737 56.4837C328.022 56.8136 328.398 56.9786 328.864 56.9786C329.333 56.9786 329.711 56.8136 329.996 56.4837C330.281 56.1514 330.424 55.6765 330.424 55.059C330.424 54.4415 330.281 53.9678 329.996 53.6378C329.711 53.3055 329.333 53.1393 328.864 53.1393C328.398 53.1393 328.022 53.3055 327.737 53.6378C327.452 53.9678 327.309 54.4415 327.309 55.059C327.309 55.6765 327.452 56.1514 327.737 56.4837Z"
      className="fill-slate-400"
    />
    <rect
      x="85.2597"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="85.2597"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M97.193 122.756V122.177L99.9081 118.376H97.2637V117.687H100.848V118.267L98.1334 122.067H100.884V122.756H97.193Z"
      className="fill-slate-400"
    />
    <rect
      x="8.54093"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="8.54093"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M18.8197 155.408C18.2705 155.408 17.831 155.233 17.501 154.881C17.1734 154.528 17.0096 154.04 17.0096 153.418C17.0096 152.796 17.1734 152.309 17.501 151.958C17.8286 151.604 18.2682 151.427 18.8197 151.427C19.225 151.427 19.5703 151.532 19.8555 151.742C20.1407 151.952 20.3386 152.233 20.4494 152.587H19.7247C19.5361 152.25 19.2345 152.08 18.8197 152.078C18.4874 152.078 18.2163 152.196 18.0066 152.431C17.7992 152.665 17.6955 152.995 17.6955 153.421C17.6955 153.846 17.7992 154.174 18.0066 154.408C18.2163 154.641 18.4874 154.758 18.8197 154.758C19.2345 154.758 19.5361 154.589 19.7247 154.252H20.4494C20.3386 154.606 20.1407 154.887 19.8555 155.097C19.5703 155.304 19.225 155.408 18.8197 155.408ZM22.4751 155.337C22.1711 155.337 21.926 155.243 21.7398 155.055C21.5536 154.866 21.4605 154.622 21.4605 154.323V152.152H20.8454V151.502H21.4605L21.5701 150.487H22.1499V151.502H23.0902V152.152H22.1499V154.252C22.1499 154.382 22.184 154.487 22.2524 154.567C22.3231 154.647 22.4209 154.687 22.5458 154.687H23.0902V155.337H22.4751ZM23.8503 155.337V151.502H24.3948L24.5008 152.007H24.5397C24.7424 151.67 25.0676 151.502 25.5154 151.502H25.9503V152.152H25.5508C25.2467 152.152 25.0016 152.241 24.8154 152.417C24.6316 152.592 24.5397 152.817 24.5397 153.093V155.337H23.8503ZM26.5654 155.337V150.268H27.2548V155.337H26.5654Z"
      className="fill-slate-400"
    />
    <rect
      x="41.123"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className={clsx(
        active === "S" ? "fill-sky-500" : "fill-slate-200 dark:fill-slate-900",
        "transition-colors",
      )}
    />
    <rect
      x="41.123"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className={clsx(
        active === "S"
          ? "stroke-sky-500"
          : "stroke-slate-300 dark:stroke-slate-700",
        "transition-colors",
      )}
      strokeWidth="0.603349"
    />
    <path
      d="M56.2854 154.248L53.5909 151.401H51.7325V150.801H53.8189L56.5135 153.648H58.3718V154.248H56.2854ZM56.2854 151.401V150.801H58.3718V151.401H56.2854Z"
      className={clsx(
        active === "S" ? "fill-slate-100" : "fill-slate-400",
        "transition-colors",
      )}
    />
    <rect
      x="73.703"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className={clsx(
        active === "K" ? "fill-sky-500" : "fill-slate-200 dark:fill-slate-900",
        "transition-colors",
      )}
    />
    <rect
      x="73.703"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className={clsx(
        active === "K"
          ? "stroke-sky-500"
          : "stroke-slate-300 dark:stroke-slate-700",
        "transition-colors",
      )}
      strokeWidth="0.603349"
    />
    <path
      d="M86.0275 154.748C86.22 154.748 86.3739 154.69 86.4894 154.574C86.6049 154.459 86.6627 154.305 86.6627 154.112V153.523H86.0729C85.8804 153.523 85.7264 153.575 85.6109 153.679C85.4954 153.781 85.4377 153.925 85.4377 154.112C85.4377 154.316 85.4927 154.473 85.6027 154.583C85.7127 154.693 85.8543 154.748 86.0275 154.748ZM86.9679 155.016C86.7479 155.23 86.4482 155.337 86.0687 155.337C85.692 155.337 85.3868 155.223 85.1531 154.995C84.9194 154.767 84.8025 154.473 84.8025 154.112C84.8025 153.752 84.9208 153.465 85.1572 153.25C85.3937 153.036 85.7127 152.929 86.1141 152.929H86.6627V151.832H86.1141C85.7154 151.832 85.3965 151.724 85.1572 151.51C84.9208 151.295 84.8025 151.008 84.8025 150.648C84.8025 150.288 84.9194 149.993 85.1531 149.765C85.3868 149.537 85.692 149.423 86.0687 149.423C86.4482 149.423 86.7479 149.532 86.9679 149.749C87.1878 149.966 87.2978 150.281 87.2978 150.693V151.242H88.3537V150.693C88.3537 150.281 88.4623 149.966 88.6795 149.749C88.8995 149.532 89.1978 149.423 89.5745 149.423C89.954 149.423 90.2606 149.537 90.4943 149.765C90.728 149.993 90.8449 150.288 90.8449 150.648C90.8449 151.008 90.7266 151.295 90.4902 151.51C90.2537 151.724 89.9347 151.832 89.5333 151.832H88.9847V152.929H89.5333C89.932 152.929 90.2496 153.036 90.486 153.25C90.7253 153.465 90.8449 153.752 90.8449 154.112C90.8449 154.473 90.728 154.767 90.4943 154.995C90.2606 155.223 89.954 155.337 89.5745 155.337C89.1978 155.337 88.8995 155.229 88.6795 155.012C88.4623 154.794 88.3537 154.481 88.3537 154.071V153.523H87.2978V154.071C87.2978 154.484 87.1878 154.798 86.9679 155.016ZM87.2978 152.929H88.3537V151.832H87.2978V152.929ZM86.0729 151.242H86.6627V150.648C86.6627 150.455 86.6049 150.303 86.4894 150.19C86.3739 150.075 86.22 150.017 86.0275 150.017C85.8543 150.017 85.7127 150.072 85.6027 150.182C85.4927 150.292 85.4377 150.447 85.4377 150.648C85.4377 150.835 85.4954 150.981 85.6109 151.085C85.7264 151.19 85.8804 151.242 86.0729 151.242ZM89.6199 154.748C89.7931 154.748 89.9347 154.693 90.0447 154.583C90.1547 154.473 90.2097 154.316 90.2097 154.112C90.2097 153.925 90.152 153.781 90.0365 153.679C89.921 153.575 89.7684 153.523 89.5787 153.523H88.9847V154.112C88.9847 154.305 89.0425 154.459 89.158 154.574C89.2734 154.69 89.4274 154.748 89.6199 154.748ZM88.9847 151.242H89.5787C89.7711 151.242 89.9237 151.19 90.0365 151.085C90.152 150.981 90.2097 150.835 90.2097 150.648C90.2097 150.444 90.1547 150.289 90.0447 150.182C89.9347 150.072 89.7931 150.017 89.6199 150.017C89.4274 150.017 89.2734 150.075 89.158 150.19C89.0425 150.306 88.9847 150.458 88.9847 150.648V151.242Z"
      className={clsx(
        active === "K" ? "fill-slate-100" : "fill-slate-400",
        "transition-colors",
      )}
    />
    <rect
      x="106.431"
      y="137.512"
      width="235.251"
      height="28.65"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="106.431"
      y="137.512"
      width="235.251"
      height="28.65"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <rect
      x="117.84"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="117.84"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M129.519 122.756L131.258 120.151L129.589 117.687H130.459L131.728 119.606L132.994 117.687H133.863L132.198 120.151L133.934 122.756H133.068L131.728 120.692L130.388 122.756H129.519Z"
      className="fill-slate-400"
    />
    <rect
      x="150.42"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="150.42"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M164.743 122.827C164.038 122.827 163.475 122.601 163.053 122.148C162.634 121.693 162.424 121.051 162.424 120.222C162.424 119.392 162.634 118.751 163.053 118.298C163.475 117.844 164.038 117.616 164.743 117.616C165.801 117.616 166.5 118.111 166.839 119.101H166.044C165.799 118.571 165.365 118.304 164.743 118.302C164.274 118.302 163.897 118.468 163.612 118.8C163.327 119.13 163.184 119.604 163.184 120.222C163.184 120.839 163.325 121.314 163.608 121.646C163.891 121.976 164.269 122.141 164.743 122.141C165.365 122.141 165.799 121.876 166.044 121.346H166.839C166.5 122.333 165.801 122.827 164.743 122.827Z"
      className="fill-slate-400"
    />
    <rect
      x="183.002"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="183.002"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M196.526 122.756L194.716 117.687H195.55L196.996 121.887H197.035L198.481 117.687H199.315L197.505 122.756H196.526Z"
      className="fill-slate-400"
    />
    <rect
      x="215.583"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="215.583"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M228.602 122.067H230.086C230.322 122.067 230.513 121.999 230.659 121.862C230.808 121.725 230.882 121.541 230.882 121.31C230.882 121.077 230.808 120.892 230.659 120.755C230.513 120.616 230.322 120.547 230.086 120.547H228.602V122.067ZM227.841 122.756V117.687H230.065C230.544 117.687 230.914 117.813 231.175 118.065C231.439 118.315 231.571 118.66 231.571 119.101C231.571 119.346 231.511 119.565 231.391 119.758C231.273 119.952 231.115 120.094 230.917 120.186C231.129 120.283 231.303 120.434 231.437 120.639C231.574 120.844 231.642 121.079 231.642 121.346C231.642 121.784 231.51 122.129 231.246 122.382C230.984 122.631 230.614 122.756 230.136 122.756H227.841ZM228.602 119.896H230.012C230.248 119.896 230.44 119.828 230.588 119.691C230.737 119.552 230.811 119.367 230.811 119.136C230.811 118.905 230.737 118.721 230.588 118.585C230.442 118.446 230.25 118.376 230.012 118.376H228.602V119.896Z"
      className="fill-slate-400"
    />
    <rect
      x="248.163"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="248.163"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M259.922 122.756V117.687H260.972L263.322 121.742H263.361V117.687H264.121V122.756H263.071L260.717 118.701H260.682V122.756H259.922Z"
      className="fill-slate-400"
    />
    <rect
      x="280.744"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="280.744"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M292.003 122.756V117.687H293.162L294.594 121.636H294.622L296.058 117.687H297.214V122.756H296.454V118.666H296.418L294.933 122.756H294.283L292.798 118.666H292.763V122.756H292.003Z"
      className="fill-slate-400"
    />
    <rect
      x="8.54386"
      y="72.497"
      width="57.3181"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="8.54386"
      y="72.497"
      width="57.3181"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M18.1268 90.2465C17.4221 90.2465 16.8588 90.0202 16.4369 89.5677C16.0174 89.1128 15.8077 88.4706 15.8077 87.641C15.8077 86.8114 16.0174 86.1703 16.4369 85.7178C16.8588 85.263 17.4221 85.0355 18.1268 85.0355C19.185 85.0355 19.8838 85.5305 20.2232 86.5203H19.4278C19.1826 85.99 18.749 85.7237 18.1268 85.7214C17.6578 85.7214 17.2807 85.8875 16.9955 86.2198C16.7103 86.5498 16.5677 87.0235 16.5677 87.641C16.5677 88.2585 16.7092 88.7334 16.992 89.0657C17.2748 89.3957 17.6531 89.5606 18.1268 89.5606C18.749 89.5606 19.1826 89.2955 19.4278 88.7652H20.2232C19.8838 89.7527 19.185 90.2465 18.1268 90.2465ZM21.9979 89.6314C22.3161 89.6314 22.5706 89.5442 22.7615 89.3697C22.9524 89.193 23.0479 88.9667 23.0479 88.691V88.4753H22.0332C21.7834 88.4753 21.5937 88.5272 21.4641 88.6309C21.3368 88.7346 21.2732 88.876 21.2732 89.0551C21.2732 89.2319 21.3368 89.3721 21.4641 89.4758C21.5937 89.5795 21.7716 89.6314 21.9979 89.6314ZM21.8883 90.2465C21.5018 90.2465 21.1883 90.131 20.9479 89.9C20.7075 89.6691 20.5873 89.3874 20.5873 89.0551C20.5873 88.7134 20.7146 88.4294 20.9691 88.2031C21.226 87.9745 21.5807 87.8602 22.0332 87.8602H23.0479V87.6764C23.0479 87.4407 22.9724 87.2557 22.8216 87.1213C22.6731 86.9846 22.4704 86.9163 22.2135 86.9163C22.0061 86.9163 21.8376 86.9611 21.708 87.0506C21.5784 87.1402 21.4935 87.2533 21.4535 87.39H20.7323C20.8053 87.0718 20.9774 86.8055 21.2484 86.591C21.5218 86.3742 21.8435 86.2658 22.2135 86.2658C22.692 86.2658 23.0655 86.3954 23.3342 86.6547C23.6029 86.9116 23.7372 87.2521 23.7372 87.6764V90.1758H23.1574L23.0832 89.7056H23.0479C22.9654 89.8446 22.8192 89.9696 22.6095 90.0803C22.3997 90.1911 22.1593 90.2465 21.8883 90.2465ZM24.6423 91.6252V86.34H25.1867L25.2927 86.8456H25.3316C25.6309 86.4591 26.0292 86.2658 26.5265 86.2658C27.0144 86.2658 27.4068 86.4402 27.7038 86.789C28.0031 87.1355 28.1528 87.6257 28.1528 88.2597C28.1528 88.8913 28.0031 89.3804 27.7038 89.7268C27.4045 90.0733 27.012 90.2465 26.5265 90.2465C26.0245 90.2465 25.638 90.0662 25.367 89.7056H25.3316V91.6252H24.6423ZM26.4169 89.596C26.7351 89.596 26.9897 89.4829 27.1806 89.2566C27.3715 89.0304 27.4669 88.698 27.4669 88.2597C27.4669 87.8189 27.3715 87.4855 27.1806 87.2592C26.9897 87.0306 26.7351 86.9163 26.4169 86.9163C26.0941 86.9163 25.8325 87.0318 25.6321 87.2627C25.4318 87.4913 25.3316 87.8237 25.3316 88.2597C25.3316 88.6933 25.4318 89.0245 25.6321 89.2531C25.8325 89.4817 26.0941 89.596 26.4169 89.596ZM30.182 90.2465C29.7766 90.2465 29.4337 90.1428 29.1532 89.9354C28.8728 89.728 28.696 89.4581 28.6229 89.1258H29.383C29.4797 89.4393 29.746 89.596 30.182 89.596C30.4577 89.596 30.6651 89.5512 30.8042 89.4617C30.9432 89.3721 31.0128 89.2602 31.0128 89.1258C31.0128 88.9962 30.9574 88.8925 30.8466 88.8147C30.7358 88.7369 30.5968 88.6827 30.4295 88.6521C30.2645 88.6214 30.0854 88.5802 29.8921 88.5284C29.6988 88.4741 29.5185 88.4129 29.3512 88.3445C29.1839 88.2762 29.0448 88.1607 28.934 87.9981C28.8233 87.8331 28.7679 87.6304 28.7679 87.39C28.7679 87.0718 28.8916 86.8055 29.1391 86.591C29.3889 86.3742 29.7236 86.2658 30.1431 86.2658C30.5343 86.2658 30.8678 86.3624 31.1436 86.5557C31.4193 86.7489 31.5926 87.0023 31.6633 87.3158H30.9032C30.7688 87.0494 30.5155 86.9163 30.1431 86.9163C29.6835 86.9163 29.4549 87.0742 29.4573 87.39C29.4573 87.5196 29.5126 87.6245 29.6234 87.7046C29.7342 87.7824 29.8721 87.8378 30.037 87.8708C30.2044 87.9014 30.3847 87.945 30.5779 88.0016C30.7712 88.0558 30.9503 88.1171 31.1153 88.1854C31.2826 88.2514 31.4217 88.3657 31.5325 88.5284C31.6456 88.691 31.7021 88.8901 31.7021 89.1258C31.7021 89.444 31.5666 89.7103 31.2956 89.9248C31.0269 90.1393 30.6557 90.2465 30.182 90.2465ZM34.092 90.1758V85.1062H34.8521V89.4864H37.3479V90.1758H34.092ZM40.6958 89.7197C40.3729 90.0709 39.9428 90.2465 39.4055 90.2465C38.8705 90.2465 38.4415 90.0709 38.1186 89.7197C37.7957 89.3662 37.6343 88.8783 37.6343 88.2561C37.6343 87.6339 37.7957 87.1473 38.1186 86.7961C38.4415 86.4426 38.8705 86.2658 39.4055 86.2658C39.9428 86.2658 40.3729 86.4426 40.6958 86.7961C41.0187 87.1473 41.1801 87.6339 41.1801 88.2561C41.1801 88.8783 41.0187 89.3662 40.6958 89.7197ZM38.6206 89.2531C38.821 89.4817 39.0826 89.596 39.4055 89.596C39.7307 89.596 39.9935 89.4817 40.1938 89.2531C40.3941 89.0245 40.4943 88.6933 40.4943 88.2597C40.4943 87.8237 40.3941 87.4913 40.1938 87.2627C39.9935 87.0318 39.7307 86.9163 39.4055 86.9163C39.0826 86.9163 38.821 87.0318 38.6206 87.2627C38.4203 87.4913 38.3201 87.8237 38.3201 88.2597C38.3201 88.6933 38.4203 89.0245 38.6206 89.2531ZM43.5735 90.2465C43.0244 90.2465 42.5848 90.0709 42.2549 89.7197C41.9273 89.3662 41.7635 88.8783 41.7635 88.2561C41.7635 87.6339 41.9273 87.1473 42.2549 86.7961C42.5825 86.4426 43.022 86.2658 43.5735 86.2658C43.9789 86.2658 44.3242 86.3707 44.6093 86.5804C44.8945 86.7902 45.0925 87.0718 45.2033 87.4254H44.4785C44.29 87.0883 43.9883 86.9186 43.5735 86.9163C43.2412 86.9163 42.9702 87.0341 42.7604 87.2698C42.553 87.5031 42.4493 87.8331 42.4493 88.2597C42.4493 88.6839 42.553 89.0127 42.7604 89.246C42.9702 89.4793 43.2412 89.596 43.5735 89.596C43.9883 89.596 44.29 89.4275 44.4785 89.0905H45.2033C45.0925 89.444 44.8945 89.7256 44.6093 89.9354C44.3242 90.1428 43.9789 90.2465 43.5735 90.2465ZM45.9598 90.1758V85.1062H46.6492V88.1112L48.3143 86.34H49.184L47.4093 88.2208L49.29 90.1758H48.4239L46.6492 88.3304V90.1758H45.9598Z"
      className="fill-slate-400"
    />
    <rect
      x="70.0859"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="70.0859"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M81.7293 90.1758L83.61 85.1062H84.5151L86.3994 90.1758H85.6004L85.1832 89.0162H82.9454L82.5247 90.1758H81.7293ZM83.1894 88.3304H84.9358L84.0802 85.9759H84.0449L83.1894 88.3304Z"
      className="fill-slate-400"
    />
    <rect
      x="102.665"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className={clsx(
        active === "S" ? "fill-sky-500" : "fill-slate-200 dark:fill-slate-900",
        "transition-colors",
      )}
    />
    <rect
      x="102.665"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      strokeWidth="0.603349"
      className={clsx(
        active === "S"
          ? "stroke-sky-500"
          : "stroke-slate-300 dark:stroke-slate-700",
        "transition-colors",
      )}
    />
    <path
      d="M116.479 90.2465C115.953 90.2465 115.52 90.1192 115.178 89.8647C114.839 89.6078 114.632 89.2531 114.559 88.8006H115.319C115.463 89.3073 115.85 89.5606 116.479 89.5606C116.847 89.5606 117.126 89.4899 117.317 89.3485C117.508 89.2048 117.603 89.0103 117.603 88.7652C117.603 88.605 117.549 88.4718 117.441 88.3657C117.335 88.2597 117.196 88.1807 117.023 88.1289C116.854 88.0747 116.666 88.0263 116.461 87.9839C116.256 87.9391 116.051 87.8849 115.846 87.8213C115.641 87.7553 115.453 87.6728 115.281 87.5738C115.111 87.4749 114.972 87.3299 114.863 87.139C114.757 86.9481 114.704 86.7171 114.704 86.4461C114.704 86.0266 114.865 85.6872 115.185 85.4279C115.508 85.1663 115.939 85.0355 116.479 85.0355C116.976 85.0355 117.379 85.1522 117.688 85.3855C117.997 85.6165 118.197 85.9347 118.289 86.34H117.529C117.364 85.9299 117.014 85.7237 116.479 85.7214C116.166 85.7214 115.918 85.7909 115.737 85.9299C115.555 86.0666 115.464 86.2387 115.464 86.4461C115.464 86.6158 115.519 86.7572 115.627 86.8703C115.738 86.9835 115.878 87.0707 116.048 87.1319C116.22 87.1909 116.411 87.2451 116.62 87.2946C116.83 87.3417 117.039 87.3983 117.246 87.4642C117.454 87.5302 117.643 87.6104 117.815 87.7046C117.987 87.7989 118.128 87.9356 118.236 88.1147C118.344 88.2915 118.399 88.5083 118.399 88.7652C118.399 89.18 118.227 89.5312 117.883 89.8187C117.541 90.1039 117.073 90.2465 116.479 90.2465Z"
      className={clsx(
        active === "S" ? "fill-slate-100" : "fill-slate-400",
        "transition-colors",
      )}
    />
    <rect
      x="135.248"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="135.248"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M147.507 90.1758V85.1062H149.295C149.991 85.1062 150.542 85.3278 150.95 85.7709C151.358 86.2116 151.561 86.835 151.561 87.641C151.561 88.4518 151.358 89.0775 150.95 89.5182C150.542 89.9566 149.991 90.1758 149.295 90.1758H147.507ZM148.267 89.4864H149.281C149.736 89.4864 150.103 89.3273 150.381 89.0091C150.661 88.691 150.801 88.2349 150.801 87.641C150.801 87.0471 150.661 86.591 150.381 86.2729C150.1 85.9547 149.734 85.7956 149.281 85.7956H148.267V89.4864Z"
      className="fill-slate-400"
    />
    <rect
      x="167.827"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="167.827"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M180.086 90.1758V85.1062H183.342V85.7956H180.846V87.39H183.161V88.0758H180.846V90.1758H180.086Z"
      className="fill-slate-400"
    />
    <rect
      x="200.408"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="200.408"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M214.231 90.2465C213.527 90.2465 212.963 90.0202 212.541 89.5677C212.122 89.1128 211.912 88.4706 211.912 87.641C211.912 86.8114 212.122 86.1703 212.541 85.7178C212.963 85.263 213.527 85.0355 214.231 85.0355C215.289 85.0355 215.988 85.5305 216.328 86.5203H215.532C215.287 85.99 214.853 85.7237 214.231 85.7214C213.762 85.7214 213.385 85.8875 213.1 86.2198C212.815 86.5498 212.672 87.0235 212.672 87.641C212.672 88.2585 212.814 88.7334 213.096 89.0657C213.379 89.3957 213.758 89.5606 214.231 89.5606C214.67 89.5606 215.015 89.4287 215.267 89.1647C215.522 88.8984 215.658 88.5837 215.677 88.2208H214.192V87.5314H216.437V87.8602C216.437 88.5885 216.24 89.1682 215.847 89.5995C215.456 90.0308 214.917 90.2465 214.231 90.2465Z"
      className="fill-slate-400"
    />
    <rect
      x="232.991"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="232.991"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M244.75 90.1758V85.1062H245.51V87.2804H247.97V85.1062H248.73V90.1758H247.97V87.9663H245.51V90.1758H244.75Z"
      className="fill-slate-400"
    />
    <rect
      x="265.57"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="265.57"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M279.094 90.2465C278.621 90.2465 278.242 90.1216 277.96 89.8717C277.679 89.6196 277.502 89.2507 277.429 88.7652H278.189C278.295 89.2955 278.597 89.5606 279.094 89.5606C279.375 89.5606 279.595 89.4664 279.756 89.2778C279.918 89.0893 279.999 88.8088 279.999 88.4364V85.1062H280.76V88.4364C280.76 89.0209 280.611 89.4687 280.314 89.7798C280.017 90.0909 279.611 90.2465 279.094 90.2465Z"
      className="fill-slate-400"
    />
    <rect
      x="298.151"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className={clsx(
        active === "K" ? "fill-sky-500" : "fill-slate-200 dark:fill-slate-900",
        "transition-colors",
      )}
    />
    <rect
      x="298.151"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className={clsx(
        active === "K"
          ? "stroke-sky-500"
          : "stroke-slate-300 dark:stroke-slate-700",
        "transition-colors",
      )}
      strokeWidth="0.603349"
    />
    <path
      d="M310.41 90.1758V85.1062H311.17V87.4607L313.27 85.1062H314.175L311.93 87.6057L314.284 90.1758H313.379L311.17 87.7506V90.1758H310.41Z"
      className={clsx(
        active === "K" ? "fill-slate-100" : "fill-slate-400",
        "transition-colors",
      )}
    />
    <rect
      x="330.733"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className={clsx(
        active === "L" ? "fill-sky-500" : "fill-slate-200 dark:fill-slate-900",
        "transition-colors",
      )}
    />
    <rect
      x="330.733"
      y="72.497"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className={clsx(
        active === "L"
          ? "stroke-sky-500"
          : "stroke-slate-300 dark:stroke-slate-700",
        "transition-colors",
      )}
      strokeWidth="0.603349"
    />
    <path
      d="M343.492 90.1758V85.1062H344.252V89.4864H346.748V90.1758H343.492Z"
      className={clsx(
        active === "L" ? "fill-slate-100" : "fill-slate-400",
        "transition-colors",
      )}
    />
    <rect
      x="345.904"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="345.904"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M358.444 117.857V117.171L360.869 116.011L358.444 114.852V114.166L361.558 115.686V116.337L358.444 117.857Z"
      className="fill-slate-400"
    />
    <path
      d="M360.218 127.154C360.133 127.246 360.02 127.292 359.878 127.292C359.739 127.292 359.626 127.246 359.539 127.154C359.452 127.062 359.408 126.951 359.408 126.822C359.408 126.692 359.452 126.581 359.539 126.489C359.626 126.397 359.739 126.351 359.878 126.351C360.02 126.351 360.133 126.397 360.218 126.489C360.305 126.581 360.349 126.692 360.349 126.822C360.349 126.951 360.305 127.062 360.218 127.154Z"
      className="fill-slate-400"
    />
    <rect
      x="347.623"
      y="39.9159"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="347.623"
      y="39.9159"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M359.882 57.5947V52.5252H361.837C362.339 52.5252 362.747 52.6784 363.063 52.9848C363.379 53.2911 363.537 53.6812 363.537 54.1549C363.537 54.6287 363.379 55.0187 363.063 55.3251C362.747 55.6315 362.339 55.7847 361.837 55.7847H360.642V57.5947H359.882ZM360.642 55.0953H361.801C362.105 55.0953 362.343 55.0116 362.515 54.8443C362.69 54.6746 362.777 54.4448 362.777 54.1549C362.777 53.865 362.69 53.6364 362.515 53.4691C362.343 53.2994 362.105 53.2146 361.801 53.2146H360.642V55.0953Z"
      className="fill-slate-400"
    />
    <rect
      x="411.762"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="411.762"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M423.201 155.337V152.152H422.585V151.502H423.201V151.212C423.201 150.903 423.292 150.657 423.476 150.473C423.66 150.289 423.906 150.197 424.215 150.197H424.83V150.848H424.286C424.161 150.848 424.063 150.884 423.992 150.957C423.924 151.03 423.89 151.127 423.89 151.247V151.502H424.83V152.152H423.89V155.337H423.201ZM425.442 155.337V151.502H425.986L426.092 152.007H426.131C426.367 151.621 426.729 151.427 427.217 151.427C427.636 151.427 427.975 151.57 428.235 151.855C428.496 152.14 428.627 152.516 428.627 152.983V155.337H427.941V153.022C427.941 152.722 427.861 152.49 427.701 152.325C427.543 152.16 427.333 152.078 427.072 152.078C426.805 152.078 426.581 152.171 426.4 152.357C426.221 152.543 426.131 152.765 426.131 153.022V155.337H425.442Z"
      className="fill-slate-400"
    />
    <rect
      x="444.672"
      y="137.512"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="444.672"
      y="137.512"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M454.951 155.262C454.401 155.262 453.962 155.086 453.632 154.735C453.304 154.381 453.14 153.893 453.14 153.271C453.14 152.649 453.304 152.162 453.632 151.811C453.959 151.458 454.399 151.281 454.951 151.281C455.356 151.281 455.701 151.386 455.986 151.596C456.272 151.805 456.47 152.087 456.58 152.44H455.856C455.667 152.103 455.365 151.934 454.951 151.931C454.618 151.931 454.347 152.049 454.137 152.285C453.93 152.518 453.826 152.848 453.826 153.275C453.826 153.699 453.93 154.028 454.137 154.261C454.347 154.494 454.618 154.611 454.951 154.611C455.365 154.611 455.667 154.443 455.856 154.106H456.58C456.47 154.459 456.272 154.741 455.986 154.951C455.701 155.158 455.356 155.262 454.951 155.262ZM458.606 155.191C458.302 155.191 458.057 155.097 457.871 154.908C457.684 154.72 457.591 154.476 457.591 154.176V152.006H456.976V151.355H457.591L457.701 150.341H458.281V151.355H459.221V152.006H458.281V154.106C458.281 154.235 458.315 154.34 458.383 154.42C458.454 154.5 458.552 154.54 458.677 154.54H459.221V155.191H458.606ZM459.981 155.191V151.355H460.526L460.632 151.861H460.671C460.873 151.524 461.198 151.355 461.646 151.355H462.081V152.006H461.682C461.378 152.006 461.132 152.094 460.946 152.271C460.762 152.445 460.671 152.67 460.671 152.946V155.191H459.981ZM462.696 155.191V150.121H463.386V155.191H462.696Z"
      className="fill-slate-400"
    />
    <rect
      x="409.934"
      y="105.517"
      width="63.3883"
      height="27.7358"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="409.934"
      y="105.517"
      width="63.3883"
      height="27.7358"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M453.123 122.955C452.718 122.955 452.375 122.851 452.094 122.644C451.814 122.436 451.637 122.167 451.564 121.834H452.324C452.421 122.148 452.687 122.304 453.123 122.304C453.399 122.304 453.606 122.26 453.745 122.17C453.884 122.081 453.954 121.969 453.954 121.834C453.954 121.705 453.899 121.601 453.788 121.523C453.677 121.445 453.538 121.391 453.371 121.361C453.206 121.33 453.027 121.289 452.833 121.237C452.64 121.183 452.46 121.121 452.292 121.053C452.125 120.985 451.986 120.869 451.875 120.707C451.764 120.542 451.709 120.339 451.709 120.099C451.709 119.78 451.833 119.514 452.08 119.3C452.33 119.083 452.665 118.974 453.084 118.974C453.475 118.974 453.809 119.071 454.085 119.264C454.36 119.457 454.534 119.711 454.604 120.024H453.844C453.71 119.758 453.457 119.625 453.084 119.625C452.625 119.625 452.396 119.783 452.398 120.099C452.398 120.228 452.454 120.333 452.565 120.413C452.675 120.491 452.813 120.546 452.978 120.579C453.146 120.61 453.326 120.654 453.519 120.71C453.712 120.764 453.891 120.826 454.056 120.894C454.224 120.96 454.363 121.074 454.474 121.237C454.587 121.399 454.643 121.599 454.643 121.834C454.643 122.152 454.508 122.419 454.237 122.633C453.968 122.848 453.597 122.955 453.123 122.955ZM455.368 122.884V117.815H456.057V119.519H456.093C456.199 119.344 456.346 119.21 456.535 119.116C456.723 119.021 456.926 118.974 457.143 118.974C457.562 118.974 457.902 119.117 458.161 119.402C458.422 119.687 458.553 120.063 458.553 120.53V122.884H457.867V120.569C457.867 120.269 457.787 120.037 457.627 119.872C457.469 119.707 457.259 119.625 456.998 119.625C456.731 119.625 456.508 119.718 456.326 119.904C456.147 120.09 456.057 120.312 456.057 120.569V122.884H455.368ZM459.462 122.884V119.049H460.151V122.884H459.462ZM459.808 118.614C459.674 118.614 459.564 118.571 459.48 118.486C459.395 118.402 459.352 118.294 459.352 118.165C459.352 118.03 459.395 117.921 459.48 117.836C459.564 117.751 459.674 117.709 459.808 117.709C459.938 117.709 460.045 117.751 460.13 117.836C460.215 117.918 460.257 118.028 460.257 118.165C460.257 118.294 460.215 118.402 460.13 118.486C460.045 118.571 459.938 118.614 459.808 118.614ZM461.378 122.884V119.699H460.763V119.049H461.378V118.759C461.378 118.45 461.47 118.204 461.654 118.02C461.838 117.836 462.084 117.744 462.393 117.744H463.008V118.395H462.463C462.338 118.395 462.241 118.431 462.17 118.504C462.101 118.577 462.067 118.674 462.067 118.794V119.049H463.008V119.699H462.067V122.884H461.378ZM464.924 122.884C464.62 122.884 464.375 122.79 464.188 122.601C464.002 122.413 463.909 122.169 463.909 121.87V119.699H463.294V119.049H463.909L464.019 118.034H464.599V119.049H465.539V119.699H464.599V121.799C464.599 121.929 464.633 122.033 464.701 122.114C464.772 122.194 464.87 122.234 464.994 122.234H465.539V122.884H464.924Z"
      className="fill-slate-400"
    />
    <rect
      x="428.218"
      y="72.6064"
      width="45.105"
      height="28.65"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="428.218"
      y="72.6064"
      width="45.105"
      height="28.65"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M458.843 88.9881L457.472 87.6169L458.843 86.2456"
      stroke="#97A3B6"
      strokeWidth="0.685624"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M457.813 87.617H464.113C465.372 87.617 466.384 86.5601 466.384 85.303V84.8745"
      stroke="#97A3B6"
      strokeWidth="0.685624"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="430.959"
      y="7.7006"
      width="42.3625"
      height="27.7358"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="430.959"
      y="7.7006"
      width="42.3625"
      height="27.7358"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M449.992 30.5018C450.315 30.5018 450.577 30.3875 450.777 30.1588C450.98 29.9302 451.081 29.5991 451.081 29.1654C451.081 28.7294 450.981 28.3971 450.781 28.1685C450.581 27.9375 450.318 27.822 449.992 27.822C449.674 27.822 449.42 27.9363 449.229 28.165C449.038 28.3912 448.943 28.7247 448.943 29.1654C448.943 29.6038 449.038 29.9361 449.229 30.1624C449.42 30.3886 449.674 30.5018 449.992 30.5018ZM449.886 31.1522C449.399 31.1522 449.005 30.979 448.706 30.6326C448.406 30.2861 448.257 29.7959 448.257 29.1619C448.257 28.5256 448.409 28.0353 448.713 27.6912C449.017 27.3448 449.42 27.1716 449.922 27.1716C450.4 27.1716 450.774 27.353 451.042 27.716H451.081V26.012H451.767V31.0815H451.226L451.117 30.576H451.081C450.782 30.9602 450.384 31.1522 449.886 31.1522ZM454.373 31.1522C453.824 31.1522 453.384 30.9767 453.054 30.6255C452.726 30.272 452.563 29.7841 452.563 29.1619C452.563 28.5397 452.724 28.053 453.047 27.7018C453.37 27.3483 453.8 27.1716 454.337 27.1716C454.882 27.1716 455.313 27.3554 455.631 27.7231C455.949 28.0884 456.108 28.5079 456.108 28.9816L456.073 29.3811H453.28C453.299 29.7393 453.408 30.0163 453.606 30.2119C453.803 30.4051 454.059 30.5018 454.373 30.5018C454.769 30.5018 455.07 30.345 455.278 30.0316H456.038C455.908 30.3686 455.698 30.6396 455.408 30.8447C455.119 31.0497 454.773 31.1522 454.373 31.1522ZM453.28 28.8013H455.401C455.359 28.4926 455.244 28.2522 455.055 28.0801C454.866 27.9081 454.627 27.822 454.337 27.822C454.047 27.822 453.808 27.9081 453.62 28.0801C453.431 28.2522 453.318 28.4926 453.28 28.8013ZM456.907 31.0815V26.012H457.597V31.0815H456.907ZM460.206 31.1522C459.657 31.1522 459.217 30.9767 458.887 30.6255C458.56 30.272 458.396 29.7841 458.396 29.1619C458.396 28.5397 458.557 28.053 458.88 27.7018C459.203 27.3483 459.633 27.1716 460.17 27.1716C460.715 27.1716 461.146 27.3554 461.464 27.7231C461.783 28.0884 461.942 28.5079 461.942 28.9816L461.906 29.3811H459.113C459.132 29.7393 459.241 30.0163 459.439 30.2119C459.637 30.4051 459.892 30.5018 460.206 30.5018C460.602 30.5018 460.903 30.345 461.111 30.0316H461.871C461.741 30.3686 461.532 30.6396 461.242 30.8447C460.952 31.0497 460.606 31.1522 460.206 31.1522ZM459.113 28.8013H461.235C461.192 28.4926 461.077 28.2522 460.888 28.0801C460.7 27.9081 460.46 27.822 460.17 27.822C459.881 27.822 459.641 27.9081 459.453 28.0801C459.264 28.2522 459.151 28.4926 459.113 28.8013ZM464.01 31.0815C463.706 31.0815 463.461 30.9873 463.274 30.7987C463.088 30.6102 462.995 30.3662 462.995 30.0669V27.8963H462.38V27.2458H462.995L463.105 26.2312H463.685V27.2458H464.625V27.8963H463.685V29.9962C463.685 30.1258 463.719 30.2307 463.787 30.3109C463.858 30.391 463.956 30.4311 464.08 30.4311H464.625V31.0815H464.01ZM466.944 31.1522C466.395 31.1522 465.955 30.9767 465.625 30.6255C465.298 30.272 465.134 29.7841 465.134 29.1619C465.134 28.5397 465.295 28.053 465.618 27.7018C465.941 27.3483 466.371 27.1716 466.909 27.1716C467.453 27.1716 467.884 27.3554 468.203 27.7231C468.521 28.0884 468.68 28.5079 468.68 28.9816L468.644 29.3811H465.852C465.87 29.7393 465.979 30.0163 466.177 30.2119C466.375 30.4051 466.631 30.5018 466.944 30.5018C467.34 30.5018 467.642 30.345 467.849 30.0316H468.609C468.479 30.3686 468.27 30.6396 467.98 30.8447C467.69 31.0497 467.345 31.1522 466.944 31.1522ZM465.852 28.8013H467.973C467.93 28.4926 467.815 28.2522 467.626 28.0801C467.438 27.9081 467.199 27.822 466.909 27.822C466.619 27.822 466.38 27.9081 466.191 28.0801C466.002 28.2522 465.889 28.4926 465.852 28.8013Z"
      className="fill-slate-400"
    />
    <rect
      x="398.963"
      y="7.33537"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="398.963"
      y="7.33537"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M412.342 20.0086V18.5945H410.931V17.9794H412.342V16.5688H412.957V17.9794H414.371V18.5945H412.957V20.0086H412.342Z"
      className="fill-slate-400"
    />
    <path
      d="M410.931 28.3935V27.7748H414.371V28.3935H410.931ZM410.931 26.8698V26.2547H414.371V26.8698H410.931Z"
      className="fill-slate-400"
    />
    <rect
      x="366.968"
      y="7.33537"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="366.968"
      y="7.33537"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M378.362 18.8137V18.1597H383.577V18.8137H378.362Z"
      className="fill-slate-400"
    />
    <path
      d="M379.936 27.8137V27.1597H382.181V27.8137H379.936Z"
      className="fill-slate-400"
    />
    <rect
      x="377.937"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="377.937"
      y="105.078"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M392.266 118.154C392.178 118.246 392.065 118.292 391.926 118.292C391.787 118.292 391.674 118.246 391.587 118.154C391.5 118.062 391.456 117.951 391.456 117.822C391.456 117.692 391.5 117.581 391.587 117.489C391.674 117.397 391.787 117.351 391.926 117.351C392.065 117.351 392.178 117.397 392.266 117.489C392.353 117.581 392.396 117.692 392.396 117.822C392.396 117.951 392.353 118.062 392.266 118.154ZM391.527 116.736V116.411C391.527 116.185 391.567 115.989 391.647 115.824C391.727 115.659 391.824 115.529 391.937 115.435C392.05 115.341 392.163 115.253 392.276 115.17C392.389 115.085 392.486 114.985 392.566 114.87C392.646 114.752 392.686 114.614 392.686 114.456C392.686 114.253 392.614 114.088 392.471 113.961C392.329 113.831 392.136 113.767 391.891 113.767C391.665 113.767 391.478 113.837 391.332 113.979C391.189 114.118 391.097 114.3 391.057 114.527H390.332C390.386 114.084 390.553 113.738 390.834 113.491C391.114 113.241 391.467 113.116 391.891 113.116C392.35 113.116 392.724 113.237 393.012 113.48C393.301 113.721 393.446 114.046 393.446 114.456C393.446 114.668 393.405 114.855 393.323 115.018C393.24 115.178 393.141 115.308 393.026 115.407C392.91 115.506 392.794 115.6 392.676 115.69C392.558 115.779 392.458 115.884 392.375 116.004C392.293 116.125 392.252 116.26 392.252 116.411V116.736H391.527Z"
      className="fill-slate-400"
    />
    <path
      d="M390.616 128.706L392.716 121.971H393.441L391.341 128.706H390.616Z"
      className="fill-slate-400"
    />
    <rect
      x="363.311"
      y="72.6059"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="363.311"
      y="72.6059"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M377.625 85.6821C377.54 85.7741 377.427 85.82 377.286 85.82C377.147 85.82 377.033 85.7741 376.946 85.6821C376.859 85.5902 376.815 85.4795 376.815 85.3498C376.815 85.2202 376.859 85.1094 376.946 85.0175C377.033 84.9256 377.147 84.8796 377.286 84.8796C377.427 84.8796 377.54 84.9256 377.625 85.0175C377.712 85.1094 377.756 85.2202 377.756 85.3498C377.756 85.4795 377.712 85.5902 377.625 85.6821ZM377.625 82.7161C377.54 82.808 377.427 82.8539 377.286 82.8539C377.147 82.8539 377.033 82.808 376.946 82.7161C376.859 82.6242 376.815 82.5134 376.815 82.3838C376.815 82.2518 376.859 82.1398 376.946 82.0479C377.033 81.956 377.147 81.91 377.286 81.91C377.427 81.91 377.54 81.956 377.625 82.0479C377.712 82.1398 377.756 82.2518 377.756 82.3838C377.756 82.5134 377.712 82.6242 377.625 82.7161Z"
      className="fill-slate-400"
    />
    <path
      d="M376.706 95.5447L376.996 94.0599H377.685L377.25 95.5447H376.706ZM377.625 91.7161C377.54 91.808 377.427 91.8539 377.286 91.8539C377.147 91.8539 377.033 91.808 376.946 91.7161C376.859 91.6242 376.815 91.5134 376.815 91.3838C376.815 91.2518 376.859 91.1398 376.946 91.0479C377.033 90.956 377.147 90.91 377.286 90.91C377.427 90.91 377.54 90.956 377.625 91.0479C377.712 91.1398 377.756 91.2518 377.756 91.3838C377.756 91.5134 377.712 91.6242 377.625 91.7161Z"
      className="fill-slate-400"
    />
    <rect
      x="379.767"
      y="39.9159"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="379.767"
      y="39.9159"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M394.185 54.0871C393.895 54.0871 393.665 54.0023 393.495 53.8326C393.326 53.6629 393.241 53.4331 393.241 53.1432V51.5524C393.241 51.4086 393.194 51.2943 393.099 51.2095C393.005 51.1246 392.884 51.0822 392.735 51.0822V50.3575C392.884 50.3575 393.005 50.315 393.099 50.2302C393.194 50.1453 393.241 50.031 393.241 49.8873V48.2929C393.241 48.003 393.326 47.7744 393.495 47.607C393.665 47.4373 393.895 47.3525 394.185 47.3525H394.655V48.0419H394.255C394.062 48.0419 393.965 48.1503 393.965 48.3671V49.8873C393.965 50.3563 393.76 50.6096 393.35 50.6473V50.7923C393.76 50.83 393.965 51.0834 393.965 51.5524V53.0725C393.965 53.2894 394.062 53.3978 394.255 53.3978H394.655V54.0871H394.185Z"
      className="fill-slate-400"
    />
    <path
      d="M393.025 64.0012V57.2666H394.581V57.9559H393.711V63.3118H394.581V64.0012H393.025Z"
      className="fill-slate-400"
    />
    <rect
      x="412.677"
      y="39.9159"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="412.677"
      y="39.9159"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M425.536 54.0871V53.3978H425.935C426.129 53.3978 426.225 53.2894 426.225 53.0725V51.5524C426.225 51.0834 426.43 50.83 426.84 50.7923V50.6473C426.43 50.6096 426.225 50.3563 426.225 49.8873V48.3671C426.225 48.1503 426.129 48.0419 425.935 48.0419H425.536V47.3525H426.006C426.296 47.3525 426.526 47.4373 426.695 47.607C426.865 47.7744 426.95 48.003 426.95 48.2929V49.8873C426.95 50.031 426.996 50.1453 427.088 50.2302C427.182 50.315 427.305 50.3575 427.455 50.3575V51.0822C427.307 51.0822 427.186 51.1246 427.091 51.2095C426.997 51.2919 426.95 51.4063 426.95 51.5524V53.1432C426.95 53.4331 426.865 53.6629 426.695 53.8326C426.526 54.0023 426.296 54.0871 426.006 54.0871H425.536Z"
      className="fill-slate-400"
    />
    <path
      d="M425.536 64.0012V63.3118H426.405V57.9559H425.536V57.2666H427.095V64.0012H425.536Z"
      className="fill-slate-400"
    />
    <rect
      x="445.294"
      y="39.9159"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="445.294"
      y="39.9159"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M458.842 54.0871V47.3525H459.528V54.0871H458.842Z"
      className="fill-slate-400"
    />
    <path
      d="M460.073 64.0012L457.973 57.2666H458.697L460.797 64.0012H460.073Z"
      className="fill-slate-400"
    />
    <rect
      x="395.307"
      y="72.6064"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="395.307"
      y="72.6064"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M408.311 82.2004L408.745 80.7156H409.29L409 82.2004H408.311ZM409.435 82.2004L409.866 80.7156H410.411L410.121 82.2004H409.435Z"
      className="fill-slate-400"
    />
    <path
      d="M408.811 91.2004L409.245 89.7156H409.79L409.5 91.2004H408.811Z"
      className="fill-slate-400"
    />
    <rect
      x="378.851"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="378.851"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M394.014 154.248L391.319 151.401H389.461V150.801H391.547L394.242 153.648H396.1V154.248H394.014ZM394.014 151.401V150.801H396.1V151.401H394.014Z"
      className="fill-slate-400"
    />
    <rect
      x="345.942"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="fill-slate-200 dark:fill-slate-900"
    />
    <rect
      x="345.942"
      y="137.659"
      width="28.3574"
      height="28.3574"
      rx="3.31842"
      className="stroke-slate-300 dark:stroke-slate-700"
      strokeWidth="0.603349"
    />
    <path
      d="M358.267 154.748C358.459 154.748 358.613 154.69 358.729 154.574C358.844 154.459 358.902 154.305 358.902 154.112V153.523H358.312C358.12 153.523 357.966 153.575 357.85 153.679C357.735 153.781 357.677 153.925 357.677 154.112C357.677 154.316 357.732 154.473 357.842 154.583C357.952 154.693 358.094 154.748 358.267 154.748ZM359.207 155.016C358.987 155.23 358.687 155.337 358.308 155.337C357.931 155.337 357.626 155.223 357.392 154.995C357.159 154.767 357.042 154.473 357.042 154.112C357.042 153.752 357.16 153.465 357.396 153.25C357.633 153.036 357.952 152.929 358.353 152.929H358.902V151.832H358.353C357.955 151.832 357.636 151.724 357.396 151.51C357.16 151.295 357.042 151.008 357.042 150.648C357.042 150.288 357.159 149.993 357.392 149.765C357.626 149.537 357.931 149.423 358.308 149.423C358.687 149.423 358.987 149.532 359.207 149.749C359.427 149.966 359.537 150.281 359.537 150.693V151.242H360.593V150.693C360.593 150.281 360.702 149.966 360.919 149.749C361.139 149.532 361.437 149.423 361.814 149.423C362.193 149.423 362.5 149.537 362.734 149.765C362.967 149.993 363.084 150.288 363.084 150.648C363.084 151.008 362.966 151.295 362.729 151.51C362.493 151.724 362.174 151.832 361.773 151.832H361.224V152.929H361.773C362.171 152.929 362.489 153.036 362.725 153.25C362.965 153.465 363.084 153.752 363.084 154.112C363.084 154.473 362.967 154.767 362.734 154.995C362.5 155.223 362.193 155.337 361.814 155.337C361.437 155.337 361.139 155.229 360.919 155.012C360.702 154.794 360.593 154.481 360.593 154.071V153.523H359.537V154.071C359.537 154.484 359.427 154.798 359.207 155.016ZM359.537 152.929H360.593V151.832H359.537V152.929ZM358.312 151.242H358.902V150.648C358.902 150.455 358.844 150.303 358.729 150.19C358.613 150.075 358.459 150.017 358.267 150.017C358.094 150.017 357.952 150.072 357.842 150.182C357.732 150.292 357.677 150.447 357.677 150.648C357.677 150.835 357.735 150.981 357.85 151.085C357.966 151.19 358.12 151.242 358.312 151.242ZM361.859 154.748C362.032 154.748 362.174 154.693 362.284 154.583C362.394 154.473 362.449 154.316 362.449 154.112C362.449 153.925 362.391 153.781 362.276 153.679C362.16 153.575 362.008 153.523 361.818 153.523H361.224V154.112C361.224 154.305 361.282 154.459 361.397 154.574C361.513 154.69 361.667 154.748 361.859 154.748ZM361.224 151.242H361.818C362.01 151.242 362.163 151.19 362.276 151.085C362.391 150.981 362.449 150.835 362.449 150.648C362.449 150.444 362.394 150.289 362.284 150.182C362.174 150.072 362.032 150.017 361.859 150.017C361.667 150.017 361.513 150.075 361.397 150.19C361.282 150.306 361.224 150.458 361.224 150.648V151.242Z"
      className="fill-slate-400"
    />
  </svg>
);
