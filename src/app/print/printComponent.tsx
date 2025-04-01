"use client";
import React, { useEffect, useState } from "react";
import { BillType } from "@/utils/types";
import { useRouter } from "next/navigation";

const ThermalBill = ({ bill }: { bill: BillType }) => {
  const [formattedDate, setFormattedDate] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Set the formatted date on the client side only
    setFormattedDate(new Date().toLocaleString());

    // Dynamically import print-js after the component mounts
    const loadPrintJS = async () => {
      const printJS = (await import("print-js")).default;
      printJS({
        printable: "bill-container",
        type: "html",
        scanStyles: false,
      });
    };

    loadPrintJS();
    const timer = setTimeout(() => router.back(), 1000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      id="bill-container"
      className="p-4 font-mono text-black bg-white w-full"
    >
      {/* Header */}
      <h3 className="text-center font-bold text-lg">TANDOORIANS RESTAURANT</h3>
      <hr />

      {/* Customer Info */}
      {bill.customerName && (
        <p>
          <strong>Customer:</strong> {bill.customerName}{" "}
          {bill.credited && <strong>(Credited)</strong>}
        </p>
      )}
      <p>
        <strong>Payment:</strong> {bill.paymentMethod.toUpperCase()}
      </p>
      <p>
        <strong>Time:</strong> {formattedDate || "Loading..."}
      </p>
      <hr />

      {/* Items Table */}
      <table className="w-full border-collapse text-sm" width={"300px"}>
        <thead>
          <tr>
            <th className="border p-1 text-left" align="left">
              Name
            </th>
            <th className="border p-1 text-left" align="center">
              Qty
            </th>
            <th className="border p-1 text-left" align="center">
              Size
            </th>
            <th className="border p-1 text-left" align="right">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {bill.billcontent.map((item, index) => (
            <tr key={index}>
              <td className="border p-1" align="left">
                {item.name}
              </td>
              <td className="border p-1" align="center">
                {item.quantity}
              </td>
              <td className="border p-1 " align="center">
                {item.size.toLowerCase()}
              </td>
              <td className="border p-1" align="right">
                ₹{item.quantity * item.cost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />

      {/* Totals */}
      <p>
        <strong>Total:</strong> ₹{bill.totalAmount}
      </p>
      {bill.discount > 0 && (
        <>
          <p>
            <strong>Discount:</strong> ₹{bill.discount}
          </p>
          <p className="font-bold">
            <strong>Amount Payable:</strong> ₹{bill.amountPayable}
          </p>
        </>
      )}

      <div className="text-center mt-2">
        <p>Thank You! Visit Again! 😊</p>
      </div>
    </div>
  );
};

export default ThermalBill;
