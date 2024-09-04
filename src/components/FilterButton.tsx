import { Filter } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";

interface FilterButtonProps {
  categories: string[];
  levels: string[];
  onFilterChange: (filters: { category: string; level: string }) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  categories,
  levels,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? "" : category;
    setSelectedCategory(newCategory);
    onFilterChange({ category: newCategory, level: selectedLevel });
  };

  const handleLevelChange = (level: string) => {
    const newLevel = selectedLevel === level ? "" : level;
    setSelectedLevel(newLevel);
    onFilterChange({ category: selectedCategory, level: newLevel });
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

  const handleButtonClick = (event: React.MouseEvent) => {
    // Prevent event from bubbling up to avoid closing the dropdown
    event.stopPropagation();
    setIsOpen(prev => !prev);
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
          className="absolute z-20 top-12 w-40 bg-white border border-gray-300 rounded-lg shadow-lg mt-2"
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={category}>
                  <label htmlFor={`category-${index}`} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${index}`}
                      checked={selectedCategory === category}
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
                  <label htmlFor={`level-${index}`} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`level-${index}`}
                      checked={selectedLevel === level}
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
