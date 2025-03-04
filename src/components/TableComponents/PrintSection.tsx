"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
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
              <TableCell className="text-right">₹{item.cost}</TableCell>
            </TableRow>
          );
        })}
        <TableRow>
          <TableCell>Customer name</TableCell>
          <TableCell className="text-right">{bill.customerName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Payment</TableCell>
          <TableCell className="text-right">{bill.paymentMethod}</TableCell>
        </TableRow>
        {bill.credited && (
          <TableRow>
            <TableCell></TableCell>
            <TableCell className="text-right">Credit</TableCell>
          </TableRow>
        )}
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">₹{bill.totalAmount}</TableCell>
        </TableRow>
        {bill.discount > 0 && (
          <>
            <TableRow>
              <TableCell>Discount</TableCell>
              <TableCell className="text-right">{bill.discount}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell className="text-right">
                ₹{Math.round((bill.totalAmount * (100 - bill.discount)) / 100)}
              </TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
    </Table>
  );
}

export default PrintSection;
