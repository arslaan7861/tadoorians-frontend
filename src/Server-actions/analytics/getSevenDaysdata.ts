"use server";
import BillModel from "@/DB/billSchema";
import { formatDate } from "date-fns";
export interface sevenDaysDataType {
  date: string;
  totalsales: number;
  total: number;
  UPI: number;
  creditAmount: number;
  CASH: number;
  discount: number;
  creditCount: number;
}

export const getSalesData = async ({
  start,
  end,
}: {
  start: number;
  end: number;
}) => {
  console.log("today", formatDate(start, "dd MMM"));
  console.log("sevenDaysAgo", formatDate(end, "dd MMM"));

  const pastSevenDaysData = await BillModel.aggregate([
    {
      $match: {
        timestamp: { $gte: start, $lte: end },
      },
    },
    {
      $addFields: {
        date: { $toDate: "$timestamp" },
      },
    },
    {
      $addFields: {
        day: {
          $dateToString: {
            date: "$date",
            format: "%Y-%m-%d", // strips time
            timezone: "Asia/Kolkata", // use UTC if you prefer
          },
        },
      },
    },
    {
      $group: {
        _id: "$day",
        totalsales: { $sum: "$totalAmount" },
        totalearning: { $sum: "$amountPayable" },
        UPI: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$paymentMethod", "upi"] },
                  { $eq: ["$credited", false] },
                ],
              },
              "$amountPayable",
              0,
            ],
          },
        },
        creditAmount: {
          $sum: {
            $cond: [{ $eq: ["$credited", true] }, "$amountPayable", 0],
          },
        },
        Cash: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ["$paymentMethod", "cash"] },
                  { $eq: ["$credited", false] },
                ],
              },
              "$amountPayable",
              0,
            ],
          },
        },
        discount: { $sum: "$discount" },
        creditCount: {
          $sum: {
            $cond: [{ $eq: ["$credited", true] }, 1, 0],
          },
        },
      },
    },
    {
      $addFields: {
        time: {
          $dateFromString: {
            dateString: "$_id",
            timezone: "Asia/Kolkata",
          },
        },
      },
    },
    {
      $sort: {
        time: -1,
      },
    },
  ]);
  const data = pastSevenDaysData.map((da) => {
    const date = formatDate(da.time, "dd MMM");
    const {
      totalsales,
      totalearning,
      UPI,
      creditAmount,
      Cash,
      discount,
      creditCount,
    } = da;
    return {
      date,
      totalsales,
      total: totalearning,
      UPI,
      creditAmount,
      CASH: Cash,
      discount,
      creditCount,
    };
  });
  return data as sevenDaysDataType[];
};
