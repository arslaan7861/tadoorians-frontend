"use client";
import { AppDispatch } from "@/State";
import { getData } from "@/State/Tables";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Card } from "../ui/card";
import { UtensilsCrossed } from "lucide-react";

function TableDataLoader() {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getData()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <Card className="fixed flex top-0 left-0 justify-center items-center h-svh w-screen z-[10000]">
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 max-w-[90%] text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm">
                  <UtensilsCrossed className="h-8 w-8 text-primary animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-primary">
                  Restaurant name
                </h3>
                <p className="text-muted-foreground">
                  Loading your dashboard...
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
}

export default TableDataLoader;
