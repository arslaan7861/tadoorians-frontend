import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RestaurantTablesSkeleton() {
  return (
    <div className="bg-background text-textColor flex flex-col items-center justify-center w-full">
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full p-4">
        {/* Add Table Skeleton */}
        <div className="h-full w-full border rounded-xl flex flex-col items-center justify-center gap-2 p-6">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-5 w-1/2" />
        </div>

        {/* Table Cards Skeletons */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Card
            key={i}
            className="hover:border-ring hover:scale-105 transition-transform relative"
          >
            <Button
              variant={"ghost"}
              className="absolute right-0 text-destructive top-0 hover:bg-transparent hover:scale-110 hover:text-destructive"
            ></Button>

            <CardHeader className="items-center">
              <Skeleton />
            </CardHeader>
            <CardContent className="flex justify-evenly flex-col gap-2 ">
              <section className="flex items-center gap-1 text-xs md:text-sm">
                <span className="flex w-full justify-between"></span>
              </section>
              <section className="flex items-center gap-1 text-xs md:text-sm"></section>
            </CardContent>

            <CardFooter className="justify-evenly gap-2">
              <Button className="z-20" variant="destructiveOutline" asChild>
                <Skeleton className="h-full w-full" />
              </Button>

              <Button className="z-20" variant="outline" asChild>
                <Skeleton className="h-full w-full" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
