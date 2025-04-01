import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Dish from "@/DB/MenuModel";
import { MenuItem } from "@/utils/types";
import connectDB from "@/DB";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

async function PricePage() {
  await connectDB();
  const menu = await Dish.find({}).lean<MenuItem[]>();
  const categories = [...new Set(menu.map((i) => i.category))];
  return (
    <section className=" flex-grow flex-1 overflow-hidden">
      <Tabs
        defaultValue={categories[0]}
        className="w-full max-h-full max-w-full flex flex-col "
      >
        <nav className="w-full h-min overflow-x-auto md:scrollbar-none z-50 shrink-0">
          <TabsList className="hidden md:flex space-x-4 justify-start w-full bg-background ">
            {categories.map((c) => {
              return (
                <TabsTrigger
                  className="data-[state=active]:shadow-none"
                  key={c}
                  value={c}
                >
                  {c}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <TabsList className="flex md:hidden space-x-4 justify-evenly min-w-full w-min">
            {[...categories].splice(0, 3).map((c) => (
              <TabsTrigger
                className="data-[state=active]:shadow-none"
                key={c}
                value={c}
              >
                {c}
              </TabsTrigger>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 bg-secondary shadow-none"
                >
                  More
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-max bg-card mr-2 z-10 shadow">
                {[...categories].splice(3).map((c) => (
                  <DropdownMenuItem className="shadow-none" key={c}>
                    <TabsTrigger
                      className="justify-start data-[state=active]:border-b-0 data-[state=active]:text-primary data-[state=active]:shadow-none w-full"
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
            className="flex-1 w-full h-full p-0 overflow-y-auto sm:scrollbar-none"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full overflow-y-auto sm:scrollbar-none p-4 ">
              {menu
                .filter((i) => i.category === c)
                .map((item, index) => (
                  <Card
                    key={index}
                    className="pt-2 rounded-none border-none shadow-md hover:scale-105 transition-transform flex flex-col relative"
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
    </section>
  );
}

export default PricePage;
