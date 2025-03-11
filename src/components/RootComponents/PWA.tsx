"use client";

import { subscribeUser, sendNotification } from "@/Server-actions/Notification";
import { useEffect } from "react";
import { toast } from "sonner";

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
        action: {
          label: "Allow",
          onClick: subscribeToPush,
        },
      });
  }
  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
    await sendNotification("test message");
  }

  return <></>;
}
export default PWA;
// function InstallPrompt() {
//   const [isIOS, setIsIOS] = useState(false);
//   const [isStandalone, setIsStandalone] = useState(false);

//   useEffect(() => {
//     setIsIOS(
//       /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
//     );

//     setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
//   }, []);

//   if (isStandalone) {
//     return null; // Don't show install button if already installed
//   }

//   return <div></div>;
// }
