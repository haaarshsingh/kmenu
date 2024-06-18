import { FC, ReactNode } from "react";

export default (({ children }) => (
  <div className="flex h-full w-full justify-center">
    <div className="md:w-md w-xxs lg:w-content">{children}</div>
  </div>
)) as FC<{ children: ReactNode }>;
