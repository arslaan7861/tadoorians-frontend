import { Skeleton } from "@/components/ui/skeleton";
import Filters from "@/components/history/filters";

export default function Loading() {
  return (
    <main className="p-4 h-full">
      <div className="flex flex-col space-y-6 h-full">
        <div className="flex flex-col sm:flex-row items-center gap-5 justify-between">
          <h3 className="font-bold tracking-tight text-left w-full">
            Bill History
          </h3>
          {/* Filters remain unchanged */}
          <Filters />
        </div>

        <section className="flex-grow overflow-y-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-background">
              <tr>
                <th className="px-1 text-left">Date & Time</th>
                <th className="px-1 text-left">Customer</th>
                <th className="px-1 text-left">Table ID</th>
                <th className="px-1 text-left">Payment</th>
                <th className="px-1 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="border-t">
                  <td className="px-1 py-2">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-1 py-2">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-1 py-2">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-1 py-2">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-1 py-2 text-right">
                    <Skeleton className="h-4 w-12 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
