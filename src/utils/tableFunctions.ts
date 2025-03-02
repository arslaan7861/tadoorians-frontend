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
      totalDishes += quantity;
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
