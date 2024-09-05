import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import FilterButton from "./filter/FilterButton";
import { Card, ExploreChallengesProps } from "@/types/types";

const ExploreChallenges: React.FC<ExploreChallengesProps> = ({
  cards,
  onCardSelect,
  onShowAll,
  onFilterChange,
  showAllChecked,
  filters,
}) => {
  const [query, setQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [localShowAllChecked, setLocalShowAllChecked] =
    useState(showAllChecked);

  const showAllClickedRef = useRef(false); // Ref to track if "Show All" was clicked

  // Update filtered cards based on query and filters
  useEffect(() => {
    let results = cards;

    if (query.length > 0) {
      results = results.filter((card) =>
        card.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.categories.length > 0) {
      results = results.filter((card) =>
        filters.categories.includes(card.category)
      );
    }

    if (filters.levels.length > 0) {
      results = results.filter((card) => filters.levels.includes(card.level));
    }

    setFilteredCards(results);
  }, [query, cards, filters]);

  // Sync localShowAllChecked with showAllChecked only if "Show All" was clicked
  useEffect(() => {
    if (showAllClickedRef.current) {
      setLocalShowAllChecked(showAllChecked);
      showAllClickedRef.current = false; // Reset the flag after updating
    }
  }, [showAllChecked]);

  // Toggle dropdown visibility based on query length
  useEffect(() => {
    setIsDropdownOpen(query.length > 0);
  }, [query]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Handle card selection
  const handleCardSelect = (card: Card) => {
    onCardSelect(card);
    setQuery("");
    setFilteredCards([]);
    setLocalShowAllChecked(false); // Uncheck "Show All" when an item is selected
    onFilterChange({
      ...filters,
      categories: [], // Clear categories filter
      levels: [], // Clear levels filter
    });
  };

  // Handle "Show All" action
  const handleShowAll = () => {
    onShowAll();
    setQuery("");
    setFilteredCards([]);
    setIsDropdownOpen(false);
    setLocalShowAllChecked(true); // Set "Show All" to checked
    showAllClickedRef.current = true; // Set the flag to true when "Show All" is clicked
  };

  return (
    <div className="bg-primaryDark py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-white text-4xl font-bold text-center mb-14">
          <h1>Explore Challenges</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-end sm:justify-center sm:gap-4">
          <div className="relative flex flex-row items-center bg-white rounded-xl shadow-md w-full md:w-1/2 lg:w-1/2 mb-4 md:mb-0 h-12">
            <div className="flex items-center w-auto pl-4 py-2">
              <Search className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <input
              type="text"
              id="search-input"
              placeholder="Search..."
              value={query}
              onChange={handleInputChange}
              className="flex-1 py-2 px-4 outline-none rounded-lg"
              autoComplete="off"
            />
            {isDropdownOpen && (
              <ul className="absolute z-10 top-12 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto">
                <li
                  onClick={handleShowAll}
                  className={`p-2 cursor-pointer hover:bg-gray-100 font-semibold ${
                    filteredCards.length > 0 ? "text-primary" : "text-gray-500"
                  }`}
                >
                  Show All Hackathons
                </li>
                {filteredCards.length > 0 ? (
                  filteredCards.map((card) => (
                    <li
                      key={card.id}
                      onClick={() => handleCardSelect(card)}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                    >
                      {card.title}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>
          <FilterButton
            categories={Array.from(new Set(cards.map((card) => card.category)))}
            levels={Array.from(new Set(cards.map((card) => card.level)))}
            onFilterChange={onFilterChange}
            onShowAll={handleShowAll}
            showAllChecked={localShowAllChecked} // Pass local state here
            filters={filters} // Pass filters state
          />
        </div>
        {/* Filter List */}
        <div className="container mx-auto md:px-12 lg:px-24 xl:px-60">
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            {filters.categories.map((category) => (
              <div
                key={category}
                className="bg-gray-400 text-white px-5 py-2 pr-4 rounded-full flex items-center"
              >
                <span className="mr-2">{category}</span>
                <X
                  className="w-5 h-5 cursor-pointer bg-white text-gray-400 rounded-full p-1"
                  onClick={() => {
                    onFilterChange({
                      ...filters,
                      categories: filters.categories.filter(
                        (cat) => cat !== category
                      ),
                    });
                  }}
                />
              </div>
            ))}
            {filters.levels.map((level) => (
              <div
                key={level}
                className="bg-gray-400 text-white px-5 pr-4 py-2 rounded-full flex items-center"
              >
                <span className="mr-2">{level}</span>
                <X
                  className="w-5 h-5 cursor-pointer bg-white text-gray-400 rounded-full p-1"
                  onClick={() => {
                    onFilterChange({
                      ...filters,
                      levels: filters.levels.filter((lvl) => lvl !== level),
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreChallenges;
