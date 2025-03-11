"use server";

import webpush, { PushSubscription } from "web-push";

webpush.setVapidDetails(
  "mailto: <friendscircle7861@gmail.com>",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription: PushSubscription | null = {
  endpoint:
    "https://jmt17.google.com/fcm/send/dwU2wcvBjms:APA91bEog__9qYBy6WrUdu02LrvJBT8v7019a_pNSvjBqqCEXaI-NcqIi2jx4n32a_6IdKRgHrEF-WDU0V44dwkVWUfdpfSYVQXpbiVb-wveaJvRGtso95Ffnodc3X23u0Ed91Xk10op",
  expirationTime: null,
  keys: {
    p256dh:
      "BOwvw_A7y7hMMznZ-8vDTXol_Bl-IvQNvkvThy9P0sBE1Fh1W38XuGXwSLf68Knxqoe8OhV3M_RnQ56QJHYiG4Q",
    auth: "uSivEOtP1qvFDlYIFkCDsw",
  },
};

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  console.log(sub);
  await sendNotification("test notificaion");

  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  return { success: true };
}

export async function sendNotification(message: string) {
  console.log("sending notification");

  if (!subscription) {
    return new Error("No subscription available");
  } else {
    try {
      await webpush.sendNotification(
        subscription,
        JSON.stringify({
          title: "Test Notification",
          body: message,
          icon: "/icon.png",
        })
      );
      return { success: true };
    } catch (error) {
      console.error("Error sending push notification:", error);
      return { success: false, error: "Failed to send notification" };
    }
  }
}
