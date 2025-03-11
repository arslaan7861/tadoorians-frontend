"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner";
import { addUpdateItem } from "@/Server-actions/menuFunctions";
import { MenuItem } from "@/utils/types";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";
import { AppDispatch } from "@/State";
import { useDispatch } from "react-redux";
import { getData } from "@/State/Tables";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  // image: z.string().url({
  //   message: "Please enter a valid image URL.",
  // }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  count: z.boolean().default(false),
  sizes: z
    .record(
      z.object({
        price: z.number().min(0, {
          message: "Price must be a positive number.",
        }),
      })
    )
    .refine((sizes) => Object.keys(sizes).length > 0, {
      message: "At least one size must be added.",
    }),
});

export function ItemForm({
  categories,
  item,
  _id,
}: {
  categories: string[];
  item: MenuItem;
  _id: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...item,
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [sizeInputs, setSizeInputs] = useState<string[]>(() => {
    return Object.keys(item.sizes).map((sizeKey) => sizeKey);
  });
  const [newSizeName, setNewSizeName] = useState("");

  useEffect(() => {
    if (sizeInputs.length == 0) {
      setSizeInputs([...sizeInputs, "Regular"]);
      form.setValue("sizes", {
        Regular: {
          price: 0,
        },
      });
    }
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Saving item");
    try {
      const { category, name, count } = values;
      if (sizeInputs.length <= 0)
        return toast.error("Atleast one size is required");
      const sizes: Record<
        string,
        {
          price: number;
          quantity: number;
        }
      > = {};
      Object.entries(values.sizes).map(([size, { price }]) => {
        sizes[size] = { price, quantity: 0 };
      });

      const editedItem: MenuItem = {
        category,
        name,
        sizes,
        count,
        image: "",
      };
      const rspString = (await addUpdateItem(editedItem, _id)) as string;
      const resp = JSON.parse(rspString) as { ok: boolean; message: string };
      if (resp.ok) {
        await dispatch(getData());
        toast.success(resp.message, { id: toastId });
        return router.replace("/admin/price");
      } else return toast.error(resp.message, { id: toastId });
    } catch (error) {
      console.log("error while saving item", error);
      toast.error("error while saving item", { id: toastId });
    }
  }
  const addSize = () => {
    if (!newSizeName.trim()) {
      return;
    }
    if (sizeInputs.includes(newSizeName)) {
      return;
    }

    setSizeInputs([...sizeInputs, newSizeName]);

    // Add the new size to the form values
    const currentSizes = form.getValues("sizes");
    form.setValue("sizes", {
      ...currentSizes,
      [newSizeName]: {
        price: 0,
      },
    });
    setNewSizeName("");
  };
  const removeSize = (sizeToRemove: string) => {
    if (sizeInputs.length <= 1) {
      toast.error("atleast one input is required");
      return;
    }

    setSizeInputs(sizeInputs.filter((size) => size !== sizeToRemove));

    // Remove the size from the form values
    const currentSizes = { ...form.getValues("sizes") };
    delete currentSizes[sizeToRemove];
    form.setValue("sizes", currentSizes);
  };
  return (
    <section className="min-h-full max-h-full flex-grow flex flex-col items-center justify-center overflow-hidden md:border-r">
      <Form {...form}>
        <form className="space-y-4 px-6 overflow-y-auto sm:scrollbar-none max-w-full flex-grow relative min-h-full">
          <h1 className="py-2 h-16 sticky top-0 bg-background w-full flex items-center">
            {item.name ? <>Edit {item.name}</> : "Add new dish"}
          </h1>
          <article className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Margherita Pizza" {...field} />
                  </FormControl>
                  <FormDescription>The name of the menu item.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The category this item belongs to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem className="flex col-span-2 flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Count this item in inventory</FormLabel>
                    <FormDescription>
                      Enable if you want to track the quantity of this item in
                      your inventory system.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </article>

          {/* <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="shrink-0"
                        //   onClick={() => {}}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Provide a URL for the menu item image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

          <div>
            <div className="flex flex-col gap-2 items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Sizes and Pricing </h3>
              <div className="flex items-center justify-between md:justify-normal w-full gap-2">
                <Input
                  placeholder="New size name"
                  value={newSizeName}
                  onChange={(e) => setNewSizeName(e.target.value)}
                  className="w-40"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSize}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Size
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {sizeInputs.map((size) => (
                <Card key={size} className="overflow-hidden">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">{size}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSize(size)}
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                        <span className="sr-only">Remove {size}</span>
                      </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name={`sizes.${size}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                            <span className="text-xs mr-2">₹</span>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="h-8 text-sm"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                // <div key={size} className=" rounded-md bg-muted/20">
                //   <FormField
                //     control={form.control}
                //     name={`sizes.${size}.price`}
                //     render={({ field }) => (
                //       <FormItem className=" flex items-center border">
                //         <FormLabel className="border min-w-max ">
                //           {size} Price
                //         </FormLabel>
                //         <FormControl className="pt-0 border">
                //           <Input
                //             type="number"
                //             className="m-2 mb-2"
                //             min="0"
                //             step="0.01"
                //             placeholder="0.00"
                //             {...field}
                //             onChange={(e) =>
                //               field.onChange(
                //                 Number.parseFloat(e.target.value) || 0
                //               )
                //             }
                //           />
                //         </FormControl>
                //         <FormMessage />
                //       </FormItem>
                //     )}
                //   />

                //   <Button
                //     type="button"
                //     variant="ghost"
                //     size="sm"
                //     //   onClick={() => removeSize(size)}
                //     className="h-8 w-8 p-0"
                //   >
                //     <Trash2 className="h-4 w-4 text-destructive" />
                //     <span className="sr-only">Remove {size}</span>
                //   </Button>
                // </div>
              ))}
            </div>
          </div>

          <footer className="py-2 h-16 sticky bottom-0  bg-background w-full flex items-center justify-evenly md:justify-end md:gap-5">
            <Button asChild variant={"outline"}>
              <Link href={"/admin/price"}>Cancel</Link>
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)} type="submit">
              Save
            </Button>
          </footer>
        </form>
      </Form>
    </section>
  );
}

export default ItemForm;
