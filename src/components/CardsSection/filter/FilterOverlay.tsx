import React, { forwardRef } from "react";

interface FilterOverlayProps {
  onClick: () => void;
}

// Use forwardRef to properly handle refs
const FilterOverlay = forwardRef<HTMLDivElement, FilterOverlayProps>(
  ({ onClick }, ref) => {
    return (
      <div
        ref={ref}
        className="fixed inset-0 bg-gray-800 opacity-0 z-10" // Changed opacity to 50 for visibility
        onClick={onClick}
      />
    );
  }
);

export default FilterOverlay;
