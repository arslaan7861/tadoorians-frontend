export interface MenuItem {
  name: string;
  image: string;
  sizes: {
    quarter: {
      price: number;
      quantity: number;
    };
    half: {
      price: number;
      quantity: number;
    };
    full: {
      price: number;
      quantity: number;
    };
  };
}

export interface MenuData {
  [key: string]: MenuItem[];
}
export interface tableType {
  tableId: string;
  totalAmount: number;
  totalDishes: number;
  OrderDetails: MenuData;
}
export interface OrdersState {
  tables: Record<string, tableType>;
}
