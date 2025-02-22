import { tableType } from "./types";

export function calculateAmountAndDishes(table: tableType) {
  let totalDishes = 0;
  let totalAmount = 0;
  Object.values(table.OrderDetails).forEach((items) => {
    items.forEach((item) => {
      Object.values(item.sizes).forEach(({ quantity, price }) => {
        totalDishes += quantity;
        totalAmount += quantity * price;
      });
    });
  });
  return { totalDishes, totalAmount };
}
