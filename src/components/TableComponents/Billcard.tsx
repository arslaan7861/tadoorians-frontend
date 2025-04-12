"use client";
import { tableType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/State";
import { calculateAmountAndDishes } from "@/utils/tableFunctions";
import { updateBill } from "@/State/bill";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveBillServer } from "@/Server-actions/billActions";
import { isOffline } from "@/utils/isOffline";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface PaymentState {
  credited: boolean;
  paymentMethod: "cash" | "upi";
  discount: string;
  customerName: string;
}

function Billcard({ table }: { table: tableType }) {
  const router = useRouter();
  const bill = useSelector((state: RootState) => state.bill);
  const dispatch = useDispatch<AppDispatch>();
  const [values, setValues] = useState<PaymentState>({
    credited: false,
    paymentMethod: "cash",
    discount: "",
    customerName: "",
  });
  useEffect(() => {
    const { bill } = calculateAmountAndDishes(table);
    dispatch(updateBill({ ...bill, tablestamp: table.tablestamp }));
  }, [dispatch, table]);
  //!HANDLE PRINT
  async function handlePrint() {
    const discount = Number(values.discount);
    // validate username
    if (!values.customerName && values.credited)
      return toast.error("Enter customer name", { position: "top-center" });
    // calculate totals
    const { bill } = calculateAmountAndDishes(table);
    const amountPayable = bill.totalAmount - discount;

    // create toast
    const toastId = toast.loading("Saving bill");
    if (isOffline()) {
      toast.error("You are offline", {
        id: toastId,
        description: "Please connect to internet",
      });
      return;
    }
    //save bill on server
    const resp = await saveBillServer({
      ...bill,
      tablestamp: table.tablestamp,
      amountPayable,
      discount: (bill.totalAmount * discount) / 100,
      customerName: values.customerName,
      credited: values.credited,
    });
    // update bill to latest state
    await dispatch(
      updateBill({
        ...bill,
        tablestamp: table.tablestamp,
        amountPayable,
        discount: (bill.totalAmount * discount) / 100,
        customerName: values.customerName,
        credited: values.credited,
      })
    );

    if (resp.ok) toast.success(resp.message, { id: toastId });
    else
      return toast.error(resp.message, {
        id: toastId,
        className: "bg-destructive text-destructive-foreground",
      });
    //print bill
    // printBill();
    console.log({ values });
    router.replace("/admin/print?tablestamp=" + table.tablestamp);
    toast.dismiss(toastId);
  }

  return (
    <SheetContent className="h-full max-w-screen flex flex-col p-4 sm:p-6">
      <SheetHeader>
        <SheetTitle> Table {table.tableId} bill</SheetTitle>
      </SheetHeader>
      <SheetDescription className="w-full grow" asChild>
        <ScrollArea className="pr-4 w-full">
          <table className="text-xs sm:text-sm w-full border-collapse h-min">
            <thead className="sticky top-0 z-10 bg-background text-card-foreground">
              <tr>
                <th className="px-1  text-left">Item</th>
                <th className="px-1  text-right">Total price</th>
              </tr>
            </thead>
            <TableBody className="">
              {bill.billcontent.map((item, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="">
                      {item.size} {item.name} x {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">{item.cost}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </table>
        </ScrollArea>
      </SheetDescription>
      <SheetFooter className="flex flex-col gap-2">
        <article className="flex items-center grow gap-4 justify-between sm:jus">
          <p>Total Amount:</p> <strong>{bill.totalAmount}</strong>
        </article>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Print</Button>
          </DialogTrigger>
          <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Set customer details</DialogTitle>
              <DialogDescription asChild>
                <div className="space-y-3">
                  <article className="flex items-center gap-2">
                    <Input
                      type="text"
                      className="grow mr-2"
                      value={values.customerName}
                      placeholder="Customer name..."
                      onChange={(e) =>
                        setValues((prev) => ({
                          ...prev,
                          customerName: e.target.value,
                        }))
                      }
                      autoFocus={false}
                    ></Input>
                    <Checkbox
                      id="credited"
                      checked={values.credited}
                      onCheckedChange={(credited: boolean) => {
                        setValues((prev) => ({
                          ...prev,
                          credited: !!credited,
                        }));
                      }}
                    />
                    <label
                      htmlFor="credited"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Credited
                    </label>
                  </article>
                  <article className="flex justify-between text-card-foreground">
                    <Select
                      defaultValue="cash"
                      value={values.paymentMethod}
                      onValueChange={(value: string) =>
                        setValues({
                          ...values,
                          paymentMethod: value as "cash" | "upi",
                        })
                      }
                    >
                      <SelectTrigger className="w-20 py-2 text-sm">
                        <SelectValue placeholder="Payment" />
                      </SelectTrigger>
                      <SelectContent className="text-sm">
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="discount"
                        className="text-sm text-muted-foreground font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Discount
                      </label>

                      <Input
                        id="discount"
                        value={values.discount}
                        type="number"
                        className="max-w-20"
                        max={Math.round(bill.totalAmount * 0.5)}
                        onChange={(e) => {
                          if (isNaN(Number(e.target.value))) return;
                          setValues((prev) => ({
                            ...prev,
                            discount: e.target.value,
                          }));
                        }}
                      ></Input>
                    </div>
                  </article>
                  <article className="flex justify-between text-card-foreground">
                    <p>Total amount:</p> <strong>{bill.totalAmount}</strong>
                  </article>
                  <article className="flex justify-between text-card-foreground">
                    <p>Amount payable:</p>{" "}
                    <strong>
                      {bill.totalAmount - Number(values.discount)}
                    </strong>
                  </article>
                </div>
              </DialogDescription>
              <Button onClick={handlePrint}>Print</Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </SheetFooter>
    </SheetContent>
  );
}

export default Billcard;
