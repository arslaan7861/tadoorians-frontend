import Filters from "@/components/history/filters";
import React from "react";

function HistoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-4 h-full">
      <div className="flex flex-col space-y-6 h-full">
        <div className="flex flex-col sm:flex-row items-center gap-5 justify-between">
          <h3 className="font-bold tracking-tight text-left w-full">
            Bill History
          </h3>
          <Filters />
        </div>
        {children}
      </div>
    </main>
  );
}

export default HistoryLayout;
