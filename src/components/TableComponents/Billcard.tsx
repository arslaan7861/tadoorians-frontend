"use client";
import { tableType } from "@/utils/types";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/State";
import PrintSection from "./PrintSection";
import { calculateAmountAndDishes } from "@/utils/tableFunctions";
import { updateBill } from "@/State/bill";
import { toast } from "sonner";
import { EmptyTable } from "@/State/Tables";
import { useRouter } from "next/navigation";
interface PaymentState {
  credited: boolean;
  paymentMethod: "cash" | "upi";
  discount: number;
  customerName: string;
}

function Billcard({
  setIsOPen,
  table,
}: {
  table: tableType;
  setIsOPen?: (value: SetStateAction<string>) => void;
}) {
  const router = useRouter();
  const bill = useSelector((state: RootState) => state.bill);
  const billRef = useRef<HTMLTableElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [values, setValues] = useState<PaymentState>({
    credited: false,
    paymentMethod: "cash",
    discount: 0,
    customerName: "",
  });
  useEffect(() => {
    const { bill } = calculateAmountAndDishes(table);
    dispatch(updateBill(bill));
  }, [dispatch, table]);
  async function handlePrint() {
    if (!values.customerName)
      return toast.error("Enter customer name", { position: "top-center" });
    //save bill on server
    //print bill
    printBill();
    console.log({ values });
  }
  const printBill = useReactToPrint({
    contentRef: billRef,
    onAfterPrint: async () => {
      await dispatch(EmptyTable(table.tableId));
      if (!!setIsOPen) setIsOPen("0");
      router.replace("/admin/table");
    },
    onPrintError() {
      console.log("not printed");
    },
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle onClick={() => handlePrint()}>
          Table {table.tableId} Bill
        </DialogTitle>
      </DialogHeader>
      <article className="flex justify-between text-muted-foreground bg-card px-3 z-10">
        <span>Items</span>
        <span>price</span>
      </article>
      <section className="max-h-80 sm:max-h-72 overflow-y-auto relative scrollbar-thin p-3">
        <Table>
          <TableBody>
            {bill.billcontent.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="p-0">
                    {item.size} {item.name}x{item.quantity}
                  </TableCell>
                  <TableCell className="text-right p-0">{item.cost}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
      <article className="flex justify-between text-muted-foreground bg-card px-3 z-10">
        <span>Total</span>
        <span className="text-card-foreground">{bill.totalAmount}</span>
      </article>{" "}
      <article className="flex justify-end gap-5 px-3 items-center space-x-2">
        <Input
          value={values.customerName}
          onChange={(e) =>
            setValues({ ...values, customerName: e.target.value })
          }
          autoFocus={false}
          placeholder="Customer name..."
        />
        <Checkbox
          id="credited"
          checked={values.credited}
          onCheckedChange={(checked: boolean) =>
            setValues({ ...values, credited: !!checked })
          }
        />
        <Label htmlFor="credited">Credit</Label>
      </article>
      <PrintSection
        bill={{
          ...bill,
          ...values,
        }}
        billRef={billRef}
      />
      <DialogFooter className="flex flex-row justify-between sm:flex-row sm:justify-between sm:space-x-2">
        <Select
          defaultValue="cash"
          value={values.paymentMethod}
          onValueChange={(value: string) =>
            setValues({ ...values, paymentMethod: value as "cash" | "upi" })
          }
        >
          <SelectTrigger className="w-20 text-sm">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent className="text-sm">
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="upi">UPI</SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue={"0"}
          value={`${values.discount}`}
          onValueChange={(value: string) =>
            setValues({ ...values, discount: Number(value) })
          }
        >
          <SelectTrigger className=" w-32 text-sm">
            <SelectValue placeholder="0" />
          </SelectTrigger>
          <SelectContent className="text-sm">
            <SelectItem value="0">Discount</SelectItem>
            <SelectItem value="5">5%</SelectItem>
            <SelectItem value="7">7%</SelectItem>
            <SelectItem value="10">10%</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handlePrint}>Print</Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default Billcard;
