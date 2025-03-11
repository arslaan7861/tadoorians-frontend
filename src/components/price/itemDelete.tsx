"use client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { removeItem } from "@/Server-actions/menuFunctions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/State";
import { getData } from "@/State/Tables";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";

function ItemDeleteBtn({ itemname }: { itemname: string }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  return (
    <>
      <AlertDialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
        }}
      >
        <AlertDialogTrigger className="hidden"></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              {itemname} from menu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const toastId = toast.loading("Removing " + itemname);
                try {
                  const rspString = (await removeItem(itemname)) as string;
                  const resp = JSON.parse(rspString) as {
                    ok: boolean;
                    message: string;
                  };
                  if (resp.ok) {
                    await dispatch(getData());
                    router.refresh();
                    return toast.success(resp.message, { id: toastId });
                  } else return toast.error(resp.message, { id: toastId });
                } catch (error) {
                  console.log("error while removing" + itemname, error);

                  toast.success("Unable to remove " + itemname, {
                    id: toastId,
                    description: "Please try again",
                  });
                }
              }}
              asChild
            >
              <Button
                className="bg-destructive text-destructive-foreground hover:text-destructive-foreground hover:scale-105 transition-transform hover:bg-destructive"
                variant={"destructive"}
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        variant={"ghost"}
        onClick={() => setOpen(true)}
        className="text-destructive w-full justify-start px-2 py-1.5 rounded-sm"
      >
        <Trash2 /> Delete
      </Button>
    </>
  );
}

export default ItemDeleteBtn;
