import { Skeleton } from "@/components/ui/skeleton";

export default function DishAdminSkeleton() {
  return (
    <div className="p-4 space-y-6">
      {/* Tabs Skeleton */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>

      {/* Dish Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-muted/20 rounded-xl p-4 relative min-h-[130px] flex flex-col gap-3 shadow-sm"
          >
            {/* Ellipsis Action Menu */}
            <div className="absolute top-2 right-2">
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>

            {/* Dish Name */}
            <Skeleton className="h-4 w-3/4 mx-auto mb-2" />

            {/* Portions and Prices */}
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-14" /> {/* Portion Name */}
                  <Skeleton className="h-4 w-16" /> {/* Price */}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add New Dish Card */}
        <div className="border border-dashed border-gray-500 rounded-xl p-4 flex items-center justify-center min-h-[130px]">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
