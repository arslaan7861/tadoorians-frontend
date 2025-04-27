"use client";
import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { PopoverContent } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ControllerRenderProps } from "react-hook-form";

function Categoryselect({
  categories,
  field,
}: {
  categories: string[];
  field: ControllerRenderProps<
    {
      name: string;
      category: string;
      sizes: Record<
        string,
        {
          price: number;
        }
      >;
      count: boolean;
    },
    "category"
  >;
}) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // you can modify the original categories or keep them fixed
  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <FormItem>
      <FormLabel>Category</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <div
              className="w-full border border-input bg-background rounded-md px-3 py-2 text-sm shadow-sm flex items-center justify-between"
              onClick={() => setOpen(true)}
            >
              {field.value ? (
                <span>{field.value}</span>
              ) : (
                <span className="text-muted-foreground">Select category</span>
              )}
            </div>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput
              placeholder="Category"
              value={searchValue}
              onValueChange={setSearchValue}
              onFocus={() => setOpen(true)}
              className="h-9"
            />
            <CommandList className="max-h-40 overflow-y-auto">
              {filteredCategories.length > 0 ? (
                <CommandGroup>
                  {filteredCategories.map((category) => (
                    <CommandItem
                      key={category}
                      value={category}
                      onSelect={(value) => {
                        field.onChange(value);
                        setOpen(false);
                      }}
                    >
                      {category}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>
                  <div
                    className="cursor-pointer py-2 px-3"
                    onClick={() => {
                      field.onChange(searchValue);
                      setOpen(false);
                    }}
                  >
                    <strong>{searchValue}</strong>
                  </div>
                </CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription>
        Select an existing category or create a new one.
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
}

export default Categoryselect;
