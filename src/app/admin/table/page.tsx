"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// // Dynamically load your client component with SSR disabled
const RestaurantTables = dynamic(() => import("@/app/admin/table/tables"), {
  ssr: false,
});

export default function Page() {
  return (
    <Suspense fallback={<>loading tables</>}>
      <RestaurantTables />
    </Suspense>
  );
}
