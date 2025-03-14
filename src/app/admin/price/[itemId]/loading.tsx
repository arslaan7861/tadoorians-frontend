import React from "react";

const EditItemSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row w-full animate-pulse">
      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="h-6 w-48 bg-muted rounded-md mb-6" />

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-10 w-full bg-muted rounded-lg" />
          </div>
        </div>

        {/* Inventory Checkbox */}
        <div className="flex items-start space-x-2 mb-6">
          <div className="h-5 w-5 bg-muted rounded" />
          <div className="space-y-1">
            <div className="h-4 w-48 bg-muted rounded" />
            <div className="h-3 w-64 bg-muted rounded" />
          </div>
        </div>

        {/* Sizes and Pricing Title */}
        <div className="h-5 w-40 bg-muted rounded mb-4" />

        {/* Size Entry Placeholders */}
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-2 items-center"
            >
              <div className="h-10 w-full sm:w-40 bg-muted rounded" />
              <div className="h-10 w-full sm:flex-1 bg-muted rounded" />
              <div className="h-5 w-5 bg-muted rounded-full hidden sm:block" />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <div className="h-10 w-24 bg-muted rounded-lg" />
          <div className="h-10 w-24 bg-muted rounded-lg" />
        </div>
      </div>

      {/* Right Sidebar (visible on md and up) */}
      <div className="hidden md:flex md:flex-col md:w-1/4 p-4 border-l border-muted/30 space-y-3">
        {["Starter", "KFC", "Gravy", "Rice", "Mutton Gravy", "Roti", "Veg"].map(
          (category, idx) => (
            <div key={idx} className="h-10 w-full bg-muted rounded-lg" />
          )
        )}
      </div>
    </div>
  );
};

export default EditItemSkeleton;
