import React from "react";
import ThemeToggle from "../theme/ToggleTheme";
import Link from "next/link";

function Titlebar() {
  return (
    <>
      {/* Title Bar */}
      <header className="border-b shadow-sm h-16 bg-background shrink-0">
        <div className="flex items-center justify-between h-full px-4 mx-auto">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-textColor">
              <Link href={"/admin"}>Tandoorians</Link>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}

export default Titlebar;
