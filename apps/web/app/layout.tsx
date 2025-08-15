import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-newsreader",
});

const sohne = localFont({
  src: "./sohne.woff2",
  variable: "--font-sohne",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0ea5e9",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kmenu.dev"),
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
  authors: [{ name: "Harsh Singh", url: "https://harshsingh.me" }],
  openGraph: {
    title: "kmenu",
    description: " The perfect ⌘K menu ",
    url: "https://kmenu.dev",
    siteName: "Harsh Singh",
    images: [{ url: "https://kmenu.dev/og.png", width: 1200, height: 630 }],
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
      url: "https://kmenu.dev/og.png",
      alt: 'A command menu overlaying the text "kmenu"',
    },
  },
  verification: {
    google: "VWhTtgTikPqvWIY4n2rlUj6Fe9YgkfFMEET3TM7Rce0",
    yandex: "cfc27cbb03eb0a9c",
    yahoo: "yahoo",
    other: { me: ["h@harshsingh.me"] },
  },
  alternates: { canonical: "https://kmenu.dev" },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sohne.variable} ${newsreader.variable} bg-black`}>
        {children}
      </body>
      <Script
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        type="module"
        strategy="afterInteractive"
      />
    </html>
  );
}
