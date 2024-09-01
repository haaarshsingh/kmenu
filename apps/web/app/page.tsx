import { Copy } from "react-feather";

export default () => (
  <>
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">kmenu</h1>
      <p className="mt-1.5 text-neutral-500">A perfect navigation experience</p>
      <div className="mt-6 flex items-center gap-x-4">
        <button className="group flex cursor-copy items-center rounded-full bg-neutral-800 py-2 pl-4 text-sm transition-colors hover:bg-neutral-700/70">
          npm install kmenu
          <div className="ml-2 mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-700 text-neutral-400 transition-colors group-hover:bg-neutral-600/70">
            <Copy className="w-3.5" />
          </div>
        </button>
        <a
          href="https://github.com/haaarshsingh/kmenu"
          target="_blank"
          rel="noreferrer"
        >
          Get started
        </a>
      </div>
    </main>
    <footer className="fixed bottom-0 left-1/2 mb-12 -translate-x-1/2">
      <p className="mt-2 inline-flex items-center text-sm font-normal text-neutral-400">
        Press ⌘K to open
      </p>
    </footer>
  </>
);
