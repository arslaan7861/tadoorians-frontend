import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Dish from "@/DB/MenuModel";
import { MenuItem } from "@/utils/types";
import connectDB from "@/DB";
import ItemForm from "@/components/price/editForm";

async function PricePage() {
  await connectDB();
  const menu = await Dish.find({}).lean<MenuItem[]>();
  const categories = [...new Set(menu.map((i) => i.category))];
  return (
    <>
      <div className="fixed bottom-16 py-2 right-10 md:right-16 z-50">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"lg"} variant={"default"}>
              Edit
            </Button>
          </DialogTrigger>
          <ItemForm categories={categories} />
        </Dialog>
      </div>
      <Tabs
        defaultValue={categories[0]}
        className="w-full h-full max-h-full max-w-full flex flex-col"
      >
        <nav className="w-full h-min overflow-x-auto md:scrollbar-none">
          <TabsList className="hidden md:flex space-x-4 justify-start w-full">
            {categories.map((c) => {
              return (
                <TabsTrigger key={c} value={c}>
                  {c}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <TabsList className="flex md:hidden space-x-4 justify-evenly min-w-full w-min">
            {[...categories].splice(0, 3).map((c) => (
              <TabsTrigger key={c} value={c}>
                {c}
              </TabsTrigger>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 bg-secondary shadow-none"
                >
                  more
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-max bg-card">
                {[...categories].splice(3).map((c) => (
                  <DropdownMenuItem key={c}>
                    <TabsTrigger
                      className="data-[state=active]:border-b-0 data-[state=active]:text-primary"
                      key={c}
                      value={c}
                    >
                      {c}
                    </TabsTrigger>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </TabsList>
        </nav>
        {categories.map((c) => (
          <TabsContent
            key={c}
            value={c}
            className="flex-1 w-full h-full p-0 overflow-y-auto md:scrollbar-none"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full overflow-y-auto md:scrollbar-none p-4 ">
              {menu
                .filter((i) => i.category === c)
                .map((item, index) => (
                  <Card
                    key={index}
                    className="pt-2 hover:border-ring flex flex-col "
                  >
                    <CardHeader className="p-2">
                      <CardTitle className=" p-0 w-full text-center">
                        {item.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow w-full items-center justify-center gap-2 pb-2 ">
                      {Object.entries(item.sizes).map(([size, { price }]) => (
                        <p key={size} className="flex justify-between w-full">
                          <span className="capitalize">{size}</span>
                          <strong>₹{price}</strong>
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

export default PricePage;
