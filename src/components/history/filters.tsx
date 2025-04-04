"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Calendar } from "../ui/calendar";
import { format, startOfMonth } from "date-fns";
import { dateRangeType } from "@/utils/types";
import { toast } from "sonner";

function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPaymentMethod = searchParams.get("paymentMethod") || "";
  const initialDate = searchParams.get("date");
  const initialDateType = searchParams.get("dateType");

  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);
  const [date, setDate] = useState<number>(
    initialDate ? Number(initialDate) : Date.now()
  );
  const [currentDateRange, setCurrentDaterange] = useState("");
  const [dateType, setDateType] = useState<dateRangeType>(
    (initialDateType as dateRangeType) || "Monthly"
  );
  function formatDateRange(): string {
    switch (dateType) {
      case "Daily":
      case "Weekly":
        return format(date, "dd MMM"); // Full date for day and week
      case "Monthly":
        return format(date, "MMMM"); // Full month name like "April"
      case "Yearly":
        return format(date, "yyyy"); // Just the year like "2025"
      default:
        return format(date, "MMMM");
    }
  }
  useEffect(() => {
    console.log(dateType);
    setCurrentDaterange(formatDateRange());
    const params = new URLSearchParams();
    if (paymentMethod) params.set("paymentMethod", paymentMethod);
    if (date) params.set("date", String(date));
    if (dateType) params.set("dateType", dateType);
    router.push(`?${params.toString()}`);
    toast.success("navigating ", { description: `?${params.toString()}` });
  }, [date, dateType, paymentMethod]);

  return (
    <div className="flex px- text-xs items-center justify-between w-full sm:w-auto sm:space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start text-left font-normal text-xs"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {currentDateRange}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 text-xs" align="end">
          <Calendar
            mode="single"
            selected={new Date(date)}
            onSelect={(date) => {
              setDateType("Daily");
              setDate(date?.getTime() || Date.now());
            }}
            disabled={(date) => date > new Date()}
            onMonthChange={(month) => {
              setDateType("Monthly");
              const start = startOfMonth(month).getTime();
              setDate(start);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-xs">
            {dateType ? dateType : "Filter"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="text-xs">
          <DropdownMenuRadioGroup
            value={dateType}
            onValueChange={(value) => {
              setDateType(value as dateRangeType);
            }}
          >
            <DropdownMenuRadioItem value="Yearly">Yearly</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Monthly">
              Monthly
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Daily">Daily</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Weekly">Weekly</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="text-xs">
            {paymentMethod ? paymentMethod : "Payment"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="text-xs">
          <DropdownMenuRadioGroup
            value={paymentMethod}
            onValueChange={(value) => {
              setPaymentMethod(value);
            }}
          >
            <DropdownMenuRadioItem value="">Payment</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="cash">
              Cash Only
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="upi">UPI Only</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Filters;
