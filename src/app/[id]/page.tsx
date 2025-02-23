import React from "react";
import RestaurantMenu from "./TableOrder";
import Dish from "@/DB/MenuModel";
type PageProps = {
  params: Promise<{ id: string }>;
};

async function TableOrder({ params }: PageProps) {
  const id = (await params).id;

  return <RestaurantMenu tableId={id}></RestaurantMenu>;
}

export default TableOrder;
