import ItemForm from "@/components/price/editForm";
import { Button } from "@/components/ui/button";
import connectDB from "@/DB";
import Dish from "@/DB/MenuModel";
import { MenuItem } from "@/utils/types";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React from "react";
type PageProps = {
  params: Promise<{ itemId: string }>;
};
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

async function TableOrder({ params }: PageProps) {
  await connectDB();
  const id = (await params).itemId.replaceAll("_", " ");

  const menu = await Dish.find({}).lean<MenuItem[]>();
  const rawItem = await Dish.findOne({ name: id }).lean();
  const cleanedSizes: MenuItem["sizes"] = {};

  if (rawItem) {
    Object.entries(rawItem.sizes).forEach(([sizeKey, sizeValue]) => {
      const { price, quantity } = sizeValue;
      cleanedSizes[sizeKey] = { price, quantity };
    });
  }
  const categories = [...new Set(menu.map((i) => i.category))];
  const item: MenuItem = {
    category: rawItem?.category || "",
    count: rawItem?.count || true,
    image: rawItem?.image || "",
    name: rawItem?.name || "",
    sizes: cleanedSizes,
  };
  return (
    <section className="text-textColor min-h-full max-h-full flex items-stretch w-full overflow-hidden">
      <ItemForm
        _id={rawItem?._id?.toString() || ""}
        item={item}
        categories={categories}
      />
      <Accordion
        type="single"
        collapsible
        className="w-min min-w-80 min-h-full self-start hidden md:block"
      >
        {categories.map((c) => (
          <AccordionItem
            value={c}
            key={c}
            className="max-h-full overflow-y-auto"
          >
            <AccordionTrigger className="pl-2">{c}</AccordionTrigger>
            <AccordionContent className="flex flex-col items-start">
              <article className="w-full max-h-72 flex flex-col items-start overflow-y-auto md:scrollbar-none">
                {menu
                  .filter((i) => i.category === c)
                  .map((item, index) => (
                    <Button
                      className="w-full text-left rounded-none"
                      key={index}
                      variant={"ghost"}
                      asChild
                    >
                      <Link
                        href={"/admin/price/" + item.name.replaceAll(" ", "_")}
                      >
                        <span className="w-full text-left">{item.name}</span>
                      </Link>
                    </Button>
                  ))}
              </article>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Sheet>
        <SheetTrigger className="md:hidded absolute top-4 right-4" asChild>
          <Button variant={"outline"}>Select an other</Button>
        </SheetTrigger>
        <SheetContent className="md:hidden">
          <SheetHeader>
            <SheetTitle>Select an item</SheetTitle>
            <Accordion
              type="single"
              collapsible
              className="w-min min-w-80 min-h-full self-start"
            >
              {categories.map((c) => (
                <AccordionItem
                  value={c}
                  key={c}
                  className="max-h-full overflow-y-auto"
                >
                  <AccordionTrigger className="pl-2">{c}</AccordionTrigger>
                  <AccordionContent className="flex flex-col items-start">
                    <article className="w-full max-h-72 flex flex-col items-start overflow-y-auto scrollbar-thin md:scrollbar-none">
                      {menu
                        .filter((i) => i.category === c)
                        .map((item, index) => (
                          <Button
                            className="w-full text-left rounded-none"
                            key={index}
                            variant={"ghost"}
                            asChild
                          >
                            <Link
                              href={
                                "/admin/price/" + item.name.replaceAll(" ", "_")
                              }
                            >
                              <span className="w-full text-left">
                                {item.name}
                              </span>
                            </Link>
                          </Button>
                        ))}
                    </article>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default TableOrder;
