"use server";

import connectDB from "@/DB";
import Dish from "@/DB/MenuModel";
import { tandoorianMenu } from "@/utils/newMenu";
import { IDish } from "@/utils/types";

export async function NewMenu() {
  try {
    console.log("my menu length", tandoorianMenu.length);
    await connectDB();
    await Dish.deleteMany({});
    const newMenu = await Dish.create(tandoorianMenu);
    // await Dish.deleteMany({})
    console.log("created menu", newMenu.length);
  } catch (error) {
    console.log(error);
  }
}
export async function getEmptyMenu() {
  await connectDB();
  const menu = await Dish.find({}).lean<IDish[]>();
  console.log(menu.length);

  // console.log({ menu });
  return menu;
}
