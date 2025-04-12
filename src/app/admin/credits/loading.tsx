// components/history/BillsPageSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function BillsPageSkeleton() {
  return (
    <section className="flex-grow">
      <table className="text-xs sm:text-sm w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-background">
          <tr>
            <th className="px-1 text-left">Date</th>
            <th className="px-1 text-left">Customer</th>
            <th className="px-1 text-left">Table</th>
            <th className="px-1 text-left">Payment</th>
            <th className="px-1 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="h-10">
              <td>
                <Skeleton className="h-4 w-full max-w-16" />
              </td>
              <td>
                <Skeleton className="h-4 w-full max-w-16" />
              </td>
              <td>
                <Skeleton className="h-4 w-full max-w-16" />
              </td>
              <td>
                <Skeleton className="h-4 w-full max-w-16" />
              </td>
              <td className="text-right">
                <Skeleton className="h-4 w-full max-w-16 ml-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
