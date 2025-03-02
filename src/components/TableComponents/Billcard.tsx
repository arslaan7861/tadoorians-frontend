"use client";
import { tableType } from "@/utils/types";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

function Billcard({ table }: { table: tableType }) {
  const bill = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: bill,
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle onClick={() => handlePrint()}>
          Table {table.tableId} Bill
        </DialogTitle>
      </DialogHeader>
      <section
        ref={bill}
        className="max-h-96 overflow-y-auto relative scrollbar-none"
      >
        <article className="flex justify-between text-muted-foreground sticky top-0 bg-card z-10">
          <p>Status</p>
          <p>Method</p>
        </article>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="p-0">Paid</TableCell>
              <TableCell className="text-right p-0">Credit Card</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <article className="flex justify-between text-muted-foreground sticky bottom-0 bg-card z-10">
          <p>Total</p>
          <p className="text-card-foreground">100000</p>
        </article>
      </section>
      <DialogFooter className="flex items-center justify-between w-full border">
        <article className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Credit</Label>
        </article>

        <Button>Print</Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default Billcard;
