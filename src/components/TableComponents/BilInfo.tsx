import React, { SetStateAction, useState } from "react";
import RestaurantBillCard from "./Billcard";
import { tableType } from "@/utils/types";
import { useDispatch } from "react-redux";
import { updateTable } from "@/State/Tables";
import { AppDispatch } from "@/State";
import { Download, LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { useRouter, useSearchParams } from "next/navigation";

interface propsType {
  table: tableType;
  isUpdated: boolean;
  setIsupdated: (value: SetStateAction<boolean>) => void;
}
function BillInfo({ table, isUpdated, setIsupdated }: propsType) {
  const dispatch = useDispatch<AppDispatch>();
  const [isUpdating, setIsUpdating] = useState(false);
  const searchparams = useSearchParams();
  const router = useRouter();
  console.log(searchparams.get("sheet"));

  const SheetOpen = !!searchparams.get("sheet");
  const updateOrder = async () => {
    console.log("updating table");
    setIsUpdating(true);
    await dispatch(updateTable(table));
    setIsUpdating(false);
    setIsupdated(true);
    console.log("updated");
  };
  const handleOpenChange = (open: boolean) => {
    const url = new URL(window.location.href);
    if (open) {
      url.searchParams.set("sheet", table.tableId);
    } else {
      url.searchParams.delete("sheet");
    }
    router.push(url.toString(), { scroll: false });
  };
  return (
    <>
      <section className="px-6 w-full p-2 h-16 fixed right-2 bottom-[70px] sm:static flex justify-end sm:justify-between items-center md:border-t md:bg-background self-end">
        <span className="hidden md:block text-lg text-muted-foreground">
          Total dishes : <strong>{table.totalDishes}</strong>
        </span>
        <article className="block sm:flex sm:flex-grow-0 gap-5 justify-between items-center text-sm md:text-lg">
          {!isUpdated ? (
            <Button
              disabled={isUpdating}
              onClick={updateOrder}
              className="hover:bg-primary disabled:opacity-90"
            >
              {isUpdating ? (
                <>
                  <LoaderCircle className="animate-spin text-xs" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Download className="text-xs" /> <span> Save order</span>
                </>
              )}
            </Button>
          ) : (
            <Sheet open={SheetOpen} onOpenChange={handleOpenChange}>
              <span className="flex-grow flex justify-end">
                <SheetTrigger onClick={() => handleOpenChange(true)} asChild>
                  <Button>Bill summary</Button>
                </SheetTrigger>
              </span>
              <RestaurantBillCard table={table} />
            </Sheet>
          )}
        </article>
      </section>
      {/* Bill card  */}
    </>
  );
}

export default BillInfo;
