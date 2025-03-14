import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AdminLoginSkeleton = () => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-4 w-48 mt-2" />
        </CardHeader>

        <CardContent className="p-2 px-6 space-y-4">
          {/* Username Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Submit Button */}
          <Skeleton className="h-10 w-full rounded-md" />

          {/* Separator */}
          <Skeleton className="h-[1px] w-full bg-gray-200 my-4" />

          {/* View Menu Section */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-40 mx-auto" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginSkeleton;
