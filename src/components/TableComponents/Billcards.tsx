import React from "react";

const RestaurantBillCard: React.FC = () => {
  return (
    <div className="w-11/12 md:max-w-md  mx-auto z-50 p-4 shadow-lg rounded-2xl border bg-background">
      <h2 className="text-xl font-bold mb-4 text-center">Bill Summary</h2>
      <table className="w-full border-collapse border border-bordercolor">
        <thead>
          <tr>
            <th className="border border-bordercolor px-4 py-2">Item</th>
            <th className="border border-bordercolor px-4 py-2">Quarter</th>
            <th className="border border-bordercolor px-4 py-2">Half</th>
            <th className="border border-bordercolor px-4 py-2">Full</th>
          </tr>
        </thead>
        {/* <tbody>
          {Object.keys(menuData).map((category) =>
            menuData[category].map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-bordercolor px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-bordercolor px-4 py-2">
                  {item.prices.quarter}
                </td>
                <td className="border border-bordercolor px-4 py-2">
                  {item.prices.half}
                </td>
                <td className="border border-bordercolor px-4 py-2">
                  {item.prices.full}
                </td>
              </tr>
            ))
          )}
        </tbody> */}
      </table>
      <div className="mt-4 p-2 border-t">
        <p className="text-right font-semibold">Total: ₹{100}</p>
        <p className="text-right text-green-600">Discount (10%): -₹{10}</p>
        <p className="text-right font-bold">Final Total: ₹{90}</p>
      </div>
      <button
        // onClick={handlePrint}
        className="mt-4 w-full bg-accentColor text-white py-2 rounded-lg "
      >
        Print Bill
      </button>
    </div>
  );
};

export default RestaurantBillCard;
