import React, { forwardRef } from "react";

interface FilterDropdownProps {
  categories: string[];
  levels: string[];
  localShowAllChecked: boolean;
  selectedCategories: string[];
  selectedLevels: string[];
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
  onShowAllChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Use forwardRef to handle refs properly
const FilterDropdown = forwardRef<HTMLDivElement, FilterDropdownProps>(
  (
    {
      categories,
      levels,
      localShowAllChecked,
      selectedCategories,
      selectedLevels,
      onCategoryChange,
      onLevelChange,
      onShowAllChange,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="absolute z-20 top-12 w-60 bg-white border border-gray-300 rounded-lg shadow-lg mt-2"
      >
        <div className="p-4">
          <label htmlFor="show-all" className="flex items-center mb-4">
            <input
              type="checkbox"
              id="show-all"
              checked={localShowAllChecked}
              onChange={onShowAllChange}
              className="mr-2"
            />
            <span className="font-semibold">Show All</span>
          </label>
          <h3 className="text-lg font-semibold mb-2">Category</h3>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={category}>
                <label
                  htmlFor={`category-${index}`}
                  className="flex items-center"
                >
                  <input
                    type="checkbox"
                    id={`category-${index}`}
                    checked={
                      localShowAllChecked
                        ? false
                        : selectedCategories.includes(category)
                    }
                    onChange={() => onCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Level</h3>
          <ul className="space-y-2">
            {levels.map((level, index) => (
              <li key={level}>
                <label htmlFor={`level-${index}`} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`level-${index}`}
                    checked={
                      localShowAllChecked
                        ? false
                        : selectedLevels.includes(level)
                    }
                    onChange={() => onLevelChange(level)}
                    className="mr-2"
                  />
                  {level}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

FilterDropdown.displayName = 'FilterDropdown'; // Add this line

export default FilterDropdown;
