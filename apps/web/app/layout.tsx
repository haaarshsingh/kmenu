import "./globals.css";
import "./cmdk.css";

import type { Metadata, Viewport } from "next";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import Providers from "./providers";
import CommandMenu from "../components/CommandMenu";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0ea5e9",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kmenu.hxrsh.in"),
  title: {
    default: "kmenu — the perfect navigation experience",
    template: "%s — kmenu",
  },
  creator: "Harsh Singh",
  publisher: "Harsh Singh",
  description: "The perfect ⌘K menu ",
  keywords: [
    "kmenu",
    "cmdk",
    "command palette",
    "command menu",
    "kbar",
    "command bar",
    "Harsh Singh",
    "haaarshsingh",
  ],
  authors: [{ name: "Harsh Singh", url: "https://harshsingh.xyz" }],
  openGraph: {
    title: "kmenu",
    description: " The perfect ⌘K menu ",
    url: "https://kmenu.hxrsh.in",
    siteName: "Harsh Singh",
    images: [
      { url: "https://kmenu.hxrsh.in/og.png", width: 1200, height: 630 },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "kmenu",
    description: "The perfect ⌘K menu ",
    siteId: "kmenu",
    creator: "@haaarshsingh",
    creatorId: "haaarshsingh",
    images: {
      url: "https://kmenu.hxrsh.in/og.png",
      alt: 'A command menu overlaying the text "kmenu"',
    },
  },
  verification: {
    google: "VWhTtgTikPqvWIY4n2rlUj6Fe9YgkfFMEET3TM7Rce0",
    yandex: "cfc27cbb03eb0a9c",
    yahoo: "yahoo",
    other: { me: ["hi.harsh@pm.me"] },
  },
  alternates: { canonical: "https://kmenu.hxrsh.in" },
  category: "technology",
};

export default (({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={clsx(inter.className, "bg-neutral-100 dark:bg-neutral-950")}
    >
      <Providers>
        <CommandMenu />
        {children}
      </Providers>
    </body>
  </html>
)) as FC<{ children: ReactNode }>;
