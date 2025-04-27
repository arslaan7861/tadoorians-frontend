"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RestaurantTables() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/analytics");
  });
  return <></>;
}
