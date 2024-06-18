import { FC, ReactNode } from "react";
import Sidebar from "../../components/Sidebar";
import "./docs.css";
import "./syntax.css";
import Drawer from "../../components/Drawer";

export const metadata = { title: { default: "Docs", template: "%s — kmenu" } };

export default (({ children }) => (
  <div className="docs-lg:justify-start flex items-start justify-center">
    <Sidebar />
    <Drawer />
    <div>
      <div className="mt-8 sm:ml-12 sm:mr-12">{children}</div>
    </div>
  </div>
)) as FC<{ children: ReactNode }>;
