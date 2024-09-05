import { Filter } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { FilterButtonProps } from "@/types/types";

const FilterButton: React.FC<FilterButtonProps> = ({
  categories,
  levels,
  onFilterChange,
  onShowAll,
  showAllChecked,
  filters,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [localShowAllChecked, setLocalShowAllChecked] =
    useState<boolean>(showAllChecked);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Sync localShowAllChecked with showAllChecked prop
  useEffect(() => {
    if (showAllChecked) {
      setSelectedCategories([]);
      setSelectedLevels([]);
      setLocalShowAllChecked(true);
    } else {
      setLocalShowAllChecked(false);
    }
  }, [showAllChecked]);

  // Sync local state with filters prop when showAllChecked changes
  useEffect(() => {
    if (!localShowAllChecked) {
      setSelectedCategories(filters.categories);
      setSelectedLevels(filters.levels);
    }
  }, [filters, localShowAllChecked]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategories((prevCategories) => {
        const isSelected = prevCategories.includes(category);
        const newCategories = isSelected
          ? prevCategories.filter((cat) => cat !== category)
          : [...prevCategories, category];

        if (newCategories.length > 0) {
          setLocalShowAllChecked(false);
        }

        // Avoid causing updates during rendering
        setTimeout(() => {
          onFilterChange({ categories: newCategories, levels: selectedLevels });
        }, 0);

        return newCategories;
      });
    },
    [selectedLevels, onFilterChange]
  );

  const handleLevelChange = useCallback(
    (level: string) => {
      setSelectedLevels((prevLevels) => {
        const isSelected = prevLevels.includes(level);
        const newLevels = isSelected
          ? prevLevels.filter((lvl) => lvl !== level)
          : [...prevLevels, level];

        if (newLevels.length > 0) {
          setLocalShowAllChecked(false);
        }

        // Avoid causing updates during rendering
        setTimeout(() => {
          onFilterChange({ categories: selectedCategories, levels: newLevels });
        }, 0);

        return newLevels;
      });
    },
    [selectedCategories, onFilterChange]
  );

  const handleShowAllChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      setLocalShowAllChecked(isChecked);

      // Use a timeout to avoid updates during rendering
      setTimeout(() => {
        if (isChecked) {
          setSelectedCategories([]);
          setSelectedLevels([]);
          onFilterChange({ categories: [], levels: [] });
        } else {
          onFilterChange({
            categories: selectedCategories,
            levels: selectedLevels,
          });
        }
        onShowAll(); // Call the function to show all items
      }, 0);
    },
    [selectedCategories, selectedLevels, onFilterChange, onShowAll]
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !overlayRef.current?.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative">
      <button
        onClick={handleButtonClick}
        className="flex items-center w-fit bg-white text-gray-700 py-2 px-4 rounded-xl shadow-md hover:bg-gray-100 h-12"
      >
        <Filter className="mr-2 w-5 h-5 md:w-6 md:h-6 text-primary" />
        <span className="font-semibold">Filter</span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-gray-800 opacity-0 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown */}
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
                checked={localShowAllChecked}
                onChange={handleShowAllChange}
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
                      checked={
                        localShowAllChecked
                          ? false
                          : selectedLevels.includes(level)
                      }
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
