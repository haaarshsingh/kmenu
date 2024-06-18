"use client";

import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { items, slugify } from "./Sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import TOC from "./MDX/TOC";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import TOCAccordion from "./MDX/TOCAccordion";

type PageAdjacent = {
  name: string;
  url: string;
};

export type Heading = { name: string; type: number };

export const getMarginLeft = (style: number) => {
  switch (style) {
    case 2:
      return "ml-0";
    case 3:
      return "ml-2";
    case 4:
      return "ml-4";
    default:
      return "ml-0";
  }
};

export default (({ children }) => {
  const pathname = usePathname();

  const [before, setBefore] = useState<PageAdjacent | undefined>(undefined);
  const [after, setAfter] = useState<PageAdjacent | undefined>(undefined);

  const [headings, setHeadings] = useState<Heading[] | undefined>(undefined);

  useEffect(() => {
    const extractHeadings = () => {
      const contentDiv = document.querySelector("#content > section");
      if (!contentDiv) return;

      const headingsArray: Heading[] = [];
      const sections = contentDiv.querySelectorAll(
        "section > div:first-of-type > a",
      );

      sections.forEach((section) => {
        const children = section.children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (!child) break;

          if (["H2", "H3", "H4"].includes(child.tagName)) {
            if (!child.textContent) break;

            const headingName = child.textContent.trim();
            const headingType = parseInt(child.tagName.substring(1));

            headingsArray.push({ name: headingName, type: headingType });
          }
        }
      });

      return headingsArray;
    };

    setHeadings(extractHeadings());
  }, [pathname]);

  const extractSlug = useCallback(
    () => pathname.split("/")[pathname.split("/").length - 1]!,
    [pathname],
  );

  const findAdjacentPages = (currentPageName: string) => {
    const pages = items.flatMap((item) =>
      item.pages.map((page) => ({
        ...page,
        category: item.category,
      })),
    );

    for (let i = 0; i < pages.length; i++) {
      if (slugify(pages[i]?.name!) === currentPageName) {
        if (pages[i - 1])
          setBefore({
            name: pages[i - 1]!.name,
            url: pages[i - 1]?.href
              ? pages[i - 1]?.href!
              : `/docs/${pages[i - 1]?.category
                  .toLowerCase()
                  .replace(" ", "-")}/${slugify(pages[i - 1]!.name)}`,
          });
        else setBefore(undefined);

        if (typeof pages[i + 1] !== "undefined")
          setAfter({
            name: pages[i + 1]!.name,
            url: pages[i + 1]?.href
              ? pages[i + 1]?.href!
              : `/docs/${pages[i + 1]?.category
                  .toLowerCase()
                  .replace(" ", "-")}/${slugify(pages[i + 1]!.name)}`,
          });
        else setAfter(undefined);

        break;
      }
    }
  };

  useEffect(() => {
    findAdjacentPages(extractSlug());
  }, [pathname]);

  return (
    <div className="docs-lg:ml-64 mt-12 max-w-full sm:max-w-[1024px] xl:ml-80 xl:mr-6">
      <div className="relative flex">
        <div id="content" className="content w-[90vw] sm:w-[640px] xl:mt-8">
          <TOCAccordion headings={headings} />
          {children}
          <div className="mb-48 mt-24 flex w-full items-center justify-center gap-x-4">
            {before && (
              <Link
                href={before.url}
                className="flex w-full flex-col rounded-md border border-neutral-300 p-4 hover:bg-neutral-200/50 dark:border-slate-800 dark:hover:bg-slate-800/25"
              >
                <div className="flex items-center">
                  <FiChevronLeft className="mb-0.5" />
                  <span>Previous</span>
                </div>
                <span className="truncate whitespace-nowrap text-neutral-900 dark:text-slate-100">
                  {before.name}
                </span>
              </Link>
            )}
            {after && (
              <Link
                href={after.url}
                className="flex w-full flex-col items-end rounded-md border border-slate-300 p-4 hover:bg-slate-200/50 dark:border-slate-800 dark:hover:bg-slate-800/25"
              >
                <div className="flex items-center">
                  <span>Next</span>
                  <FiChevronRight className="mb-0.5" />
                </div>
                <span className="truncate whitespace-nowrap text-slate-900 dark:text-slate-100">
                  {after.name}
                </span>
              </Link>
            )}
          </div>
        </div>
        <TOC headings={headings} />
      </div>
    </div>
  );
}) as FC<{ children: ReactNode }>;
