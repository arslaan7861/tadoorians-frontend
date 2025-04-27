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
  CASH: {
    label: "Cash",
    color: "hsl(var(--chart-1))",
  },
  UPI: {
    label: "UPI",
    color: "hsl(var(--chart-2))",
  },
  total: {
    label: "Total",
    color: "hsl(var( --chart-3))",
  },
} satisfies ChartConfig;

export function SalesChart({
  todaysSalesdata,
  chartData,
}: {
  chartData?: sevenDaysDataType[];
  todaysSalesdata?: sevenDaysDataType;
}) {
  const today = endOfDay(Date.now()).getTime(); // Start of today
  const sevenDaysAgo = startOfDay(subDays(Date(), 7)).getTime(); // Seven days ago from today
  console.log({ chartData });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="justify-between flex">
          Sales chart{" "}
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
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
            <Bar dataKey="CASH" fill="var(--color-CASH)" radius={4} />
            <Bar dataKey="UPI" fill="var(--color-UPI)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start text-sm">
        <p className=" flex justify-between w-full items-center">
          <span>Today&apos;s sales</span>
          <strong className=" flex  items-center">
            <IndianRupeeIcon className="p-1 inline" />
            {todaysSalesdata?.total || 0}
          </strong>
        </p>
        <p className=" flex justify-between w-full items-center">
          <span>UPI</span>
          <strong className=" flex  items-center">
            <IndianRupeeIcon className="p-1 inline" />
            {todaysSalesdata?.UPI || 0}
          </strong>
        </p>
        <p className=" flex justify-between w-full items-center">
          <span>Cash</span>
          <strong className=" flex  items-center">
            <IndianRupeeIcon className="p-1 inline" />
            {todaysSalesdata?.CASH || 0}{" "}
          </strong>
        </p>
      </CardFooter>
    </Card>
  );
}
