"use client";
import { tableType } from "@/utils/types";
import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/State";
import PrintSection from "./PrintSection";
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
interface PaymentState {
  credited: boolean;
  paymentMethod: "cash" | "upi";
  discount: number;
  customerName: string;
}

function Billcard({ table }: { table: tableType }) {
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
    dispatch(updateBill({ ...bill, tablestamp: table.tablestamp }));
  }, [dispatch, table]);
  async function handlePrint() {
    // validate username
    if (!values.customerName && values.credited)
      return toast.error("Enter customer name", { position: "top-center" });
    // calculate totals
    const { bill } = calculateAmountAndDishes(table);
    const amountPayable = Math.round(
      bill.totalAmount * (1 - values.discount / 100)
    );

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
    const respString = await saveBillServer({
      ...bill,
      tablestamp: table.tablestamp,
      amountPayable,
      discount: (bill.totalAmount * values.discount) / 100,
      customerName: values.customerName,
      credited: values.credited,
    }); // update bill to latest state
    await dispatch(
      updateBill({
        ...bill,
        tablestamp: table.tablestamp,
        amountPayable,
        discount: (bill.totalAmount * values.discount) / 100,
        customerName: values.customerName,
        credited: values.credited,
      })
    );
    // check bill saved on server
    if (!respString)
      return toast.error("Something went wrong please try again..", {
        id: toastId,
        className: "bg-destructive text-destructive-foreground",
      });
    const resp = JSON.parse(respString);
    if (resp.ok) toast.success(resp.message, { id: toastId });
    else
      return toast.error(resp.message, {
        id: toastId,
        className: "bg-destructive text-destructive-foreground",
      });
    //print bill
    // printBill();
    console.log({ values });
    router.push("/admin/print?tablestamp=" + table.tablestamp);
    toast.dismiss(toastId);
  }

  return (
    <SheetContent className="h-full w-11/12 md:w-[700px] flex flex-col">
      <SheetHeader>
        <SheetTitle> Table {table.tableId} bill</SheetTitle>
      </SheetHeader>
      <SheetDescription className="w-full border grow"></SheetDescription>
      <SheetFooter>
        <Button></Button>
      </SheetFooter>
    </SheetContent>
  );
}

export default Billcard;
// <PrintSection
// bill={{
//   ...bill,
//   ...values,
//   }}
//   billRef={billRef}
//   />;
//   <Button onClick={handlePrint}>Print</Button>
