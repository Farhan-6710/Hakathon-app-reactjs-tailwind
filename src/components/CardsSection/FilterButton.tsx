import { Filter, X } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FilterButtonProps } from "@/types/types";

const FilterButton: React.FC<FilterButtonProps> = ({
  categories,
  levels,
  onFilterChange,
  onShowAll,
  showAllChecked,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevCategories) => {
      const isSelected = prevCategories.includes(category);
      const newCategories = isSelected
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category];
      return newCategories;
    });
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels((prevLevels) => {
      const isSelected = prevLevels.includes(level);
      const newLevels = isSelected
        ? prevLevels.filter((lvl) => lvl !== level)
        : [...prevLevels, level];
      return newLevels;
    });
  };

  const handleShowAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedCategories([]);
      setSelectedLevels([]);
      onFilterChange({ categories: [], levels: [] });
    }
    onShowAll();
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !overlayRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    // Update parent component only when selectedCategories or selectedLevels change
    onFilterChange({ categories: selectedCategories, levels: selectedLevels });
  }, [selectedCategories, selectedLevels, onFilterChange]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative flex items-center justify-end">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-end w-fit bg-white text-gray-700 py-2 px-4 rounded-xl shadow-md hover:bg-gray-100 h-12"
      >
        <Filter className="mr-2 w-5 h-5 md:w-6 md:h-6 text-primary" />
        <span className="font-semibold">Filter</span>
      </button>

      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-gray-800 opacity-0 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-20 top-12 w-60 bg-white border border-gray-300 rounded-lg shadow-lg mt-2"
        >
          <div className="p-4">
            <label htmlFor="show-all" className="flex items-center mb-4">
              <input
                type="checkbox"
                id="show-all"
                checked={showAllChecked}
                onChange={handleShowAll}
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
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
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
                  <label
                    htmlFor={`level-${index}`}
                    className="flex items-center"
                  >
                    <input
                      type="checkbox"
                      id={`level-${index}`}
                      checked={selectedLevels.includes(level)}
                      onChange={() => handleLevelChange(level)}
                      className="mr-2"
                    />
                    {level}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
