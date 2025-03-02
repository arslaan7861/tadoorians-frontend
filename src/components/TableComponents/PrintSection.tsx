"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { RootState } from "@/State";
import { BillType } from "@/utils/types";

function PrintSection({
  billRef,
  bill,
}: {
  billRef: React.RefObject<HTMLTableElement | null>;
  bill: BillType;
}) {
  return (
    <Table className="absolute top-0 z-[-1000000]" ref={billRef}>
      <TableHeader>
        <TableRow>
          <TableHead>Items</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bill.billcontent.map((item, i) => {
          return (
            <TableRow key={i}>
              <TableCell className="text-muted-foreground">
                {item.size} {item.name}x{item.quantity}
              </TableCell>
              <TableCell className="text-right">{item.cost}</TableCell>
            </TableRow>
          );
        })}

        <TableRow>
          <TableCell>Payment</TableCell>
          <TableCell className="text-right">{bill.paymentMethod}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell className="text-right">
            {bill.credited && "Credit"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">{bill.totalAmount}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default PrintSection;
