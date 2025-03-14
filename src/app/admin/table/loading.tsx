import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RestaurantTablesSkeleton() {
  return (
    <div className="bg-background text-textColor flex flex-col items-center justify-center w-full">
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full p-4">
        {/* Add Table Skeleton */}
        <div className="h-full w-full border min-h-52 rounded-xl flex flex-col items-center justify-center gap-2 p-6">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>

        {/* Table Cards Skeletons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Card
            key={i}
            className="hover:border-ring hover:scale-105 transition-transform relative flex flex-col"
          >
            <CardHeader className="items-center flex-1">
              <Skeleton className="h-8 w-1/2" />
            </CardHeader>
            <CardContent className="flex justify-evenly flex-col gap-2 flex-grow">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
            </CardContent>

            <CardFooter className="justify-evenly gap-2 flex-1">
              <Skeleton className="w-32 h-8" />
              <Skeleton className="w-32 h-8" />
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
