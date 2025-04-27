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

function DateSelector({ label }: { label: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialDate = searchParams.get("date");
  const initialDateType = searchParams.get("dateType");

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
    if (date) params.set("date", String(date));
    if (dateType) params.set("dateType", dateType);
    router.replace(`?${params.toString()}`);
  }, [date, dateType]);

  return (
    <div className="z-50 flex p-2 w-full px-4 text-xs items-center justify-end space-x-2 sm:space-x-4 border-b sticky top-0 bg-background ">
      <h2 className="capitalize text-left grow text-xl sm:text-2xl font-semibold">
        {label}
      </h2>
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
              if (start <= Date.now()) setDate(start);
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
    </div>
  );
}

export default DateSelector;
