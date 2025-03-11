"use server";

import connectDB from "@/DB";
import Dish from "@/DB/MenuModel";
import { tandoorianMenu } from "@/utils/newMenu";
import { IDish, MenuItem } from "@/utils/types";
import { updateEmptyTables } from "./tableActions";

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
export async function addUpdateItem(item: MenuItem, _id: string) {
  try {
    await connectDB();
    if (!_id) {
      const newItem = await Dish.create({ ...item });
      await updateEmptyTables();
      return JSON.stringify({
        ok: true,
        message: "Added " + newItem.name + " in menu",
      });
    }
    const updatedItem = await Dish.findByIdAndUpdate(
      _id,
      { $set: item },
      { new: true }
    );
    if (!updatedItem)
      return JSON.stringify({
        ok: true,
        message: "Failed to edit item",
      });
    await updateEmptyTables();
    return JSON.stringify({
      ok: true,
      message: "Edited " + updatedItem.name + " in menu",
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      ok: false,
      message: "Failed to edit item",
    });
  }
}
export async function getEmptyMenu() {
  await connectDB();
  const menu = await Dish.find({}).lean<IDish[]>();
  console.log([...new Set(menu)].length);
  return menu;
}

export async function removeItem(name: string) {
  try {
    await connectDB();

    const res = await Dish.deleteOne({ name });
    console.log({ res });
    await updateEmptyTables();
    return JSON.stringify({
      ok: true,
      message: "Removed " + name,
    });
  } catch (error) {
    console.log("error while removing " + name, error);
    return JSON.stringify({
      ok: false,
      message: "Failed to Renove " + name,
    });
  }
}
