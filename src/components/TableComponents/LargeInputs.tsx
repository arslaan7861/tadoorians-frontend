"use client";
import { MenuItem } from "@/utils/types";
import React, { useState } from "react";
import { Input } from "../ui/input";

function LargeInputs({
  item,
  increase,
}: {
  item: MenuItem;
  increase(name: string, size: string, quantity: number, count: boolean): void;
}) {
  const [sizes, setSizes] = useState(item.sizes);
  return (
    <>
      {Object.entries(sizes).map(([size, { price }]) => {
        return (
          <form
            key={size}
            onSubmit={(e) => {
              e.preventDefault();
              increase(item.name, size, sizes[size].quantity, item.count);
            }}
            className="flex items-center justify-between w-full text-sm"
          >
            <label htmlFor={size + price}>
              {size} x {item.sizes[size].quantity}
            </label>
            <Input
              value={sizes[size].quantity}
              id={size + price}
              type="number"
              className="max-w-16 "
              onChange={(e) => {
                setSizes((prev) => ({
                  ...prev,
                  [size]: { ...prev[size], quantity: Number(e.target.value) },
                }));
              }}
            />
          </form>
        );
      })}
    </>
  );
}

export default LargeInputs;
