import React from "react";
import { Filter } from "lucide-react";

interface FilterButtonComponentProps {
  onClick: (event: React.MouseEvent) => void;
}

const FilterButtonComponent: React.FC<FilterButtonComponentProps> = ({
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-fit bg-white text-gray-700 py-2 px-4 rounded-xl shadow-md hover:bg-gray-100 h-12"
    >
      <Filter className="mr-2 w-5 h-5 md:w-6 md:h-6 text-primary" />
      <span className="font-semibold">Filter</span>
    </button>
  );
};

export default FilterButtonComponent;
