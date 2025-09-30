import SideNav from "./components/side-nav";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return <div className="grid grid-cols-4 gap-8">
    <aside className="col-span-4 lg:col-span-1">
      <SideNav />
    </aside>
    <div className="col-span-4 lg:col-span-3">
      {children}
    </div>
  </div>
}