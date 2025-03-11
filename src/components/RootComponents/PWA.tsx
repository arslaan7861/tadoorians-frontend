"use client";

import { subscribeUser } from "@/Server-actions/Notification";
import { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
function PWA() {
  // const [subscription, setSubscription] = useState<PushSubscription | null>(
  //   null
  // );

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "all",
    });
    const sub = await registration.pushManager.getSubscription();
    if (!sub)
      toast("Enable Notifications", {
        description: "Get order updates and exclusive offers in real time.",
        position: "top-center",
        action: {
          label: "Allow",
          onClick: subscribeToPush,
          children: <Button>Allow</Button>,
        },
      });
  }
  async function subscribeToPush() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });
      const serializedSub = JSON.parse(JSON.stringify(sub));
      await subscribeUser(serializedSub);
    } catch (error) {
      console.log(error);
    }
  }

  return <></>;
}
export default PWA;
