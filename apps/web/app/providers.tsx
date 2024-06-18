"use client";

import { useEffect, useState, type FC, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { MenuProvider } from "kmenu";

export default (({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), [mounted]);

  const dimensions = {
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
}) as FC<{ children: ReactNode }>;
