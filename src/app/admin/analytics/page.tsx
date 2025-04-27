import { CreditChart } from "@/components/analytics/CreditChart";
import { DiscountChart } from "@/components/analytics/DiscountChart";
import { SalesChart } from "@/components/analytics/SalesChart";
import { getSalesData } from "@/Server-actions/analytics/getSevenDaysdata";
import { endOfDay, startOfDay, subDays } from "date-fns";

// Example bills data for testing

async function AnalyticsHomepage() {
  const today = endOfDay(Date.now()).getTime(); // Start of today
  const sevenDaysAgo = startOfDay(subDays(Date(), 7)).getTime(); // Seven days ago from today
  const data = await getSalesData({ start: sevenDaysAgo, end: today });
  console.log({ data });

  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <header className="z-50 p-2 w-full px-4 border-b sticky top-0 bg-background ">
        <h2 className="capitalize text-left grow text-xl sm:text-2xl font-semibold">
          Today sales data
        </h2>
      </header>
      <main className="grow w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <SalesChart chartData={[...data].reverse()} todaysSalesdata={data[0]} />
        <CreditChart
          chartData={[...data].reverse()}
          todaysCreditdata={data[0]}
        />
        <DiscountChart
          chartData={[...data].reverse()}
          todaysDiscountData={data[0]}
        />
      </main>
    </div>
  );
}
export default AnalyticsHomepage;
