import { Skeleton } from "@/components/ui/skeleton";

export default function DishPageSkeleton() {
  return (
    <div className="p-4 space-y-6">
      {/* Tabs Skeleton */}
      <div className="flex gap-2 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>

      {/* Dish Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-muted/20 rounded-xl p-4 flex flex-col gap-3 shadow-sm min-h-[150px]"
          >
            {/* Dish Title */}
            <Skeleton className="h-4 w-3/4 mx-auto mb-2" />

            {/* Portion Rows (e.g., Half, Full, Quarter) */}
            <div className="space-y-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3"
                >
                  <Skeleton className="h-4 w-12" /> {/* Portion Name */}
                  <Skeleton className="h-4 w-14" /> {/* Price */}
                  <Skeleton className="h-6 w-6 rounded-full" /> {/* Minus */}
                  <Skeleton className="h-4 w-4" /> {/* Qty */}
                  <Skeleton className="h-6 w-6 rounded-full" /> {/* Plus */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
