"use client";

import { ChefHat, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function OfflinePage() {
  return (
    <div className=" bg-background flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full mx-auto border-none bg-background">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full mb-2">
            <WifiOff className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">You are offline</CardTitle>
          <CardDescription>
            It looks like you are not connected to the internet. Our menu and
            online ordering are unavailable while offline.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Restaurant Name</h2>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Address</span>
                <span className="text-sm text-muted-foreground">
                  123 Main Street, City
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Phone</span>
                <span className="text-sm text-muted-foreground">
                  (555) 123-4567
                </span>
              </div>

              <div className="flex justify-between items-start">
                <span className="text-sm font-medium">Hours</span>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    Mon-Sat: 11am-10pm
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Sun: 12pm-9pm
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center pt-2">
              <Badge variant="outline">Cached Menu</Badge>
              <Badge variant="outline">Contact Info</Badge>
              <Badge variant="outline">Location</Badge>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button onClick={() => window.location.reload()} className="w-full">
            Try again
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            This information was saved during your last visit
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
