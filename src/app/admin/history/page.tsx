import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";

import { TableBody, TableCell } from "@/components/ui/table";
import { BillContentType, BillType, dateRangeType } from "@/utils/types";
import BillModel from "@/DB/billSchema";
import { BillDetails } from "@/components/history/Billdetails";
import { FilterQuery } from "mongoose";
import connectDB from "@/DB";

// Import the types from your interfaces

export default async function BillsPage(props: {
  searchParams: Promise<{
    paymentMethod?: string;
    date?: string;
    dateType?: dateRangeType;
  }>;
}) {
  const { date, dateType = "Daily", paymentMethod } = await props.searchParams;
  const filters: FilterQuery<BillType> = {};

  // Filter by Payment Method
  if (paymentMethod && paymentMethod !== "all") {
    filters.paymentMethod = paymentMethod;
  }
  if (date) {
    const parsedDate = new Date(Number(date)); // your query string was timestamp (number)
    if (!isNaN(parsedDate.getTime())) {
      filters.timestamp = {};

      switch (dateType) {
        case "Daily":
          filters.timestamp.$gte = startOfDay(parsedDate).getSeconds();
          filters.timestamp.$lte = endOfDay(parsedDate).getTime();
          break;
        case "Monthly":
          filters.timestamp.$gte = startOfMonth(parsedDate).getTime();
          filters.timestamp.$lte = endOfMonth(parsedDate).getTime();
          break;

        case "Yearly":
          filters.timestamp.$gte = startOfYear(parsedDate).getTime();
          filters.timestamp.$lte = endOfYear(parsedDate).getTime();
          break;

        case "Weekly":
          filters.timestamp.$gte = startOfWeek(parsedDate).getTime();
          filters.timestamp.$lte = endOfWeek(parsedDate).getTime();
          break;
      }
    }
  }
  await connectDB();
  const bills = await BillModel.find(filters).sort({ timestamp: -1 }).lean();
  const safeBills: BillType[] = bills.map((bill) => ({
    ...bill,
    _id: JSON.stringify(bill._id), // convert ObjectId to string
    billcontent:
      bill.billcontent?.map((item: BillContentType) => ({
        ...item,
        _id: JSON.stringify(bill._id), // convert ObjectId to string
      })) ?? [],
  }));
  return (
    <section className="relative flex-grow overflow-y-auto">
      {bills.length <= 0 ? (
        <h3 className="w-full h-full text-muted-foreground text-center text-2xl justify-center flex flex-grow  items-center">
          No orders for this time range or bill type
        </h3>
      ) : (
        <table className="text-xs sm:text-sm w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-background">
            <tr>
              <th className="px-1  text-left">Time</th>
              <th className="px-1  text-left">Customer</th>
              <th className="px-1  text-left">Table</th>
              <th className="px-1  text-left">Payment</th>
              <th className=" px-1 text-right">Amount</th>
            </tr>
          </thead>
          <TableBody>
            {safeBills.map((bill, index) => {
              return (
                <BillDetails bill={bill} key={index}>
                  <TableCell>
                    {format(new Date(bill.timestamp), "dd MMM h:mm a")}
                  </TableCell>
                  <TableCell>{bill.customerName}</TableCell>
                  <TableCell>{bill.tableId}</TableCell>

                  <TableCell>
                    <span className="capitalize">
                      {bill.credited ? "Credit" : bill.paymentMethod}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{bill.amountPayable}
                  </TableCell>
                </BillDetails>
              );
            })}
          </TableBody>
        </table>
      )}
    </section>
  );
}
