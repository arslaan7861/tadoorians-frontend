"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Plus, Trash2, Upload } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  image: z.string().url({
    message: "Please enter a valid image URL.",
  }),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  sizes: z
    .record(
      z.object({
        price: z.number().min(0, {
          message: "Price must be a positive number.",
        }),
        quantity: z.number().int().min(0, {
          message: "Quantity must be a positive integer.",
        }),
      })
    )
    .refine((sizes) => Object.keys(sizes).length > 0, {
      message: "At least one size must be added.",
    }),
});

export function ItemForm({ categories }: { categories: string[] }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      image: "",
      sizes: {},
    },
  });
  const [sizeInputs, setSizeInputs] = useState<string[]>([]);
  const [newSizeName, setNewSizeName] = useState("");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
        quantity: 0,
      },
    });
    setNewSizeName("");
  };
  return (
    <DialogContent className="px-0 pt-0 md:max-h-[90svh] h-svh">
      <section className="  max-w-full md:max-w-3xl md:max-h-[90svh] flex flex-col overflow-hidden">
        <DialogHeader className="sticky top-0 bg-background z-[100000] w-full p-6 ">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 px-6 overflow-y-auto md:scrollbar-none max-w-full pb-20 flex-grow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Margherita Pizza" {...field} />
                    </FormControl>
                    <FormDescription>
                      The name of the menu item.
                    </FormDescription>
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
            </div>

            <FormField
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
            />

            <div>
              <div className="flex flex-col gap-2 items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Sizes and Pricing</h3>
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
                  <div key={size} className="p-4 border rounded-md bg-muted/20">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">{size}</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        //   onClick={() => removeSize(size)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Remove {size}</span>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`sizes.${size}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (₹)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sizes.${size}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    Number.parseInt(e.target.value) || 0
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter className="absolute bottom-0 w-full h-16 right-0 flex-row justify-evenly flex items-center px-4 bg-background">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  //   onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Menu Item</Button>
            </DialogFooter>
          </form>
        </Form>
      </section>
    </DialogContent>
  );
}

export default ItemForm;
