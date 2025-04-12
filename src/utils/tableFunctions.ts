import { emptyBill } from "./menu";
import { BillType, tableType } from "./types";

export function calculateAmountAndDishes(table: tableType): {
  totalDishes: number;
  totalAmount: number;
  bill: BillType;
} {
  const { tableId } = table;
  const bill = { ...emptyBill };
  let totalDishes = 0;
  let totalAmount = 0;
  Object.values(table.OrderDetails).forEach((item) => {
    Object.entries(item.sizes).forEach(([size, { quantity, price }]) => {
      if (item.count) totalDishes += quantity;
      totalAmount += quantity * price;
      if (quantity > 0)
        bill.billcontent = [
          ...bill.billcontent,
          {
            name: item.name,
            size,
            cost: quantity * price,
            quantity,
          },
        ];
    });
  });

  return {
    totalDishes,
    totalAmount,
    bill: { ...bill, tableId, totalAmount, totalDishes },
  };
}

export function getIndianTimestamp(timestamp: number | string) {
  const date = new Date(timestamp);

  // If the local timezone is IST (UTC+5:30), just format directly
  const isIST = date.getTimezoneOffset() === -330;

  const dateInIST = isIST
    ? date
    : new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
  return dateInIST.getTime();
}
