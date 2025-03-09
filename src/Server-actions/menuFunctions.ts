"use server";

import connectDB from "@/DB";
import Dish from "@/DB/MenuModel";
import { tandoorianMenu } from "@/utils/newMenu";
import { IDish } from "@/utils/types";

export async function NewMenu() {
  try {
    await connectDB();
    await Dish.deleteMany({}); // Optional if you want to reset the database

    // Use upsert to ensure uniqueness and prevent duplicates
    await Promise.all(
      tandoorianMenu.map(async (dish) => {
        await Dish.updateOne(
          { name: dish.name }, // Search for existing dish by name
          { $set: dish }, // Update or insert the dish
          { upsert: true } // If the dish doesn't exist, insert it
        );
      })
    );
    const menu = await Dish.find({}).lean<IDish[]>();
    console.log("Created menu:", menu.length);
  } catch (error) {
    console.log(error);
  }
}
export async function getEmptyMenu() {
  await connectDB();
  const menu = await Dish.find({}, { _id: 0 }).lean<IDish[]>();
  console.log([...new Set(menu)].length);
  return menu;
}
