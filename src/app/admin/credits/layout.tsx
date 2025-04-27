import Filters from "@/components/history/filters";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function creditLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 h-full">
      <div className="flex flex-col space-y-6 h-full">
        <div className="flex flex-col sm:flex-row items-center gap-2 justify-between">
          <h3 className="font-bold tracking-tight text-left w-full flex justify-between">
            Credits record
            <Button variant={"outline"} asChild>
              <Link href={"/admin/history"}>See all</Link>
            </Button>
          </h3>
          <Filters credit />
        </div>
        {children}
      </div>
    </main>
  );
}

export default creditLayout;
