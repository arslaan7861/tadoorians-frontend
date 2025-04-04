"use client";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BillType } from "@/utils/types";
import { useState } from "react";

interface BillDetailsProps {
  bill: BillType;

  children: React.ReactNode;
}

export function BillDetails({ bill, children }: BillDetailsProps) {
  const [selectedBill, setSelectedBill] = useState<BillType | null>(null);
  return (
    <>
      <TableRow onClick={() => setSelectedBill(bill)}>{children}</TableRow>
      <Dialog open={!!selectedBill} onOpenChange={() => setSelectedBill(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Bill Details</span>
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <p className="text-sm font-medium">Customer</p>
              <p className="text-lg">{bill.customerName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Table ID</p>
              <p className="text-lg">{bill.tableId}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Date & Time</p>
              <p className="text-lg">
                {format(new Date(bill.timestamp), "PPpp")}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Payment Method</p>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    bill.paymentMethod === "cash" ? "outline" : "default"
                  }
                >
                  {bill.paymentMethod.toUpperCase()}
                </Badge>
                {bill.credited && <Badge variant="secondary">Credited</Badge>}
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bill.billcontent.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{item.cost.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ₹{(item.quantity * item.cost).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2 pt-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{bill.totalAmount.toFixed(2)}</span>
            </div>
            {bill.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{bill.discount.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{bill.amountPayable.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setSelectedBill(null)}>
              Close
            </Button>
            <Button>Print Bill</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
