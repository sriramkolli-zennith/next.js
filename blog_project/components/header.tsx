

import React from "react";
import useServerDarkMode from "@/hooks/use-server-dark-mode";
import Link from "next/link";
import Navigation from "@/components/navigation";
import DarkMode from "@/components/dark-mode";

const Header: React.FC = () => {
  const theme = useServerDarkMode();
  return (
    <header className="flex justify-between md:items-center mt-4">
      <div className="flex items-center md:space-x-12">
        <div className="hidden md:block">
          <Link href="/" className="text-xl font-mono">Sriram Kolli</Link>
        </div>
        <Navigation />
      </div>
      <div>
        <DarkMode defaultTheme={theme} />
      </div>
    </header>
  );
};

export default Header;