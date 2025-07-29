"use client";

import { Dimensions, MenuProvider } from "kmenu";
import { ThemeProvider } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), [mounted]);

  const dimensions: Dimensions = {
    sectionHeight: 30,
    commandHeight: 50,
    commands: 6,
  };

  if (!mounted) return null;

  return (
    <ThemeProvider defaultTheme="system" enableSystem attribute="class">
      <MenuProvider dimensions={dimensions}>{children}</MenuProvider>
    </ThemeProvider>
  );
};
