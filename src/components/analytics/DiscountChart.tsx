"use client";
import { IndianRupeeIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { endOfDay, formatDate, startOfDay, subDays } from "date-fns";
import { sevenDaysDataType } from "@/Server-actions/analytics/getSevenDaysdata";
import { Button } from "../ui/button";
import Link from "next/link";

const chartConfig = {
  Discount: {
    label: "Discount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DiscountChart({
  chartData,
  todaysDiscountData,
}: {
  chartData: sevenDaysDataType[];
  todaysDiscountData: sevenDaysDataType;
}) {
  const today = endOfDay(Date.now()).getTime(); // Start of today
  const sevenDaysAgo = startOfDay(subDays(Date(), 7)).getTime(); // Seven days ago from today
  return (
    <Card>
      <CardHeader>
        <CardTitle className="justify-between flex">
          Discount chart{" "}
          <Button variant={"outline"} size={"sm"} asChild>
            <Link href={"/admin/analytics/sales"}>See details</Link>
          </Button>{" "}
        </CardTitle>
        <CardDescription>
          {formatDate(sevenDaysAgo, "dd MMM")} - {formatDate(today, "dd MMM")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-60 w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="discount" fill="var(--color-Discount)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start text-sm">
        <p className=" flex justify-between w-full items-center">
          <span>Today&apos;s discount</span>
          <strong className=" flex  items-center">
            <IndianRupeeIcon className="p-1 inline" />
            {todaysDiscountData?.discount || 0}
          </strong>
        </p>
      </CardFooter>
    </Card>
  );
}
