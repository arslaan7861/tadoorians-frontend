import DateSelector from "@/components/analytics/DateSelector";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getSalesData } from "@/Server-actions/analytics/getSevenDaysdata";
import { dateRangeType } from "@/utils/types";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";

async function Sales(props: {
  searchParams: Promise<{
    paymentMethod?: string;
    date?: string;
    dateType?: dateRangeType;
  }>;
}) {
  const { date, dateType = "Daily" } = await props.searchParams;
  const dates = { start: 0, end: Date.now() };

  if (date) {
    const parsedDate = new Date(Number(date)); // your query string was timestamp (number)
    if (!isNaN(parsedDate.getTime())) {
      switch (dateType) {
        case "Daily":
          dates.start = startOfDay(parsedDate).getTime();
          dates.end = endOfDay(parsedDate).getTime();
          break;
        case "Monthly":
          dates.start = startOfMonth(parsedDate).getTime();
          dates.end = endOfMonth(parsedDate).getTime();
          break;

        case "Yearly":
          dates.start = startOfYear(parsedDate).getTime();
          dates.end = endOfYear(parsedDate).getTime();
          break;

        case "Weekly":
          dates.start = startOfWeek(parsedDate).getTime();
          dates.end = endOfWeek(parsedDate).getTime();
          break;
      }
    }
  }
  const Salesdata = await getSalesData(dates);
  console.log({ Salesdata });

  return (
    <main className="w-full h-full flex flex-col">
      <DateSelector label="sales" />
      <section className="relative flex-grow overflow-y-auto p-3">
        {Salesdata.length <= 0 ? (
          <h3 className="w-full h-full text-muted-foreground text-center text-2xl justify-center flex flex-grow  items-center">
            No orders for this time range or bill type
          </h3>
        ) : (
          <table className="text-xs sm:text-sm w-full border-collapse">
            <thead className="sticky top-0 z-10 bg-background">
              <tr>
                <th className="px-1  text-left">Time</th>
                <th className="px-1  text-left">Discount</th>
                <th className="px-1  text-left">Credited</th>
                <th className="px-2  text-right">Sale</th>
              </tr>
            </thead>
            <TableBody>
              {Salesdata.map((sale, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell key={index}>{sale.date}</TableCell>
                    <TableCell>{sale.discount}</TableCell>
                    <TableCell>{sale.creditAmount}</TableCell>
                    <TableCell className="text-right px-2">
                      {sale.total}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </table>
        )}
      </section>
    </main>
  );
}

export default Sales;
