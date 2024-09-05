import React, { useState, useRef, useEffect, useCallback } from "react";
import { FilterButtonProps } from "@/types/types";
import FilterOverlay from "./FilterOverlay";
import FilterDropdown from "./FilterDropdown";
import FilterButtonComponent from "./FilterButtonComponent";

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
        onShowAll();
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
      <FilterButtonComponent onClick={handleButtonClick} />

      {isOpen && (
        <FilterOverlay ref={overlayRef} onClick={() => setIsOpen(false)} />
      )}

      {isOpen && (
        <FilterDropdown
          ref={dropdownRef}
          categories={categories}
          levels={levels}
          localShowAllChecked={localShowAllChecked}
          selectedCategories={selectedCategories}
          selectedLevels={selectedLevels}
          onCategoryChange={handleCategoryChange}
          onLevelChange={handleLevelChange}
          onShowAllChange={handleShowAllChange}
        />
      )}
    </div>
  );
};

export default FilterButton;
