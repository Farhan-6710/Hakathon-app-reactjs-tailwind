import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import FilterButton from "./FilterButton";
import { Card } from "@/types/types";

const ExploreChallenges: React.FC<{
  cards: Card[];
  onCardSelect: (card: Card) => void;
  onShowAll: () => void;
  onFilterChange: (filters: { category: string; level: string }) => void;
}> = ({ cards, onCardSelect, onShowAll, onFilterChange }) => {
  const [query, setQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filters, setFilters] = useState<{ category: string; level: string }>({
    category: "",
    level: "",
  });

  useEffect(() => {
    let results = cards;

    if (query.length > 0) {
      results = results.filter((card) =>
        card.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.category) {
      results = results.filter((card) => card.category === filters.category);
    }

    if (filters.level) {
      results = results.filter((card) => card.level === filters.level);
    }

    setFilteredCards(results);
  }, [query, cards, filters]);

  useEffect(() => {
    // Open dropdown only if there's a query
    setIsDropdownOpen(query.length > 0);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleCardSelect = (card: Card) => {
    onCardSelect(card);
    setQuery("");
    setFilteredCards([]);
    setIsDropdownOpen(false);
  };

  const handleFilterChange = (newFilters: {
    category: string;
    level: string;
  }) => {
    setFilters(newFilters);
    onFilterChange(newFilters); // Pass the filters up to parent
  };

  const handleShowAll = () => {
    onShowAll();
    setQuery("");
    setFilters({ category: "", level: "" });
    setFilteredCards([]);
    setIsDropdownOpen(false);
  };

  // Extract unique categories and levels from cards
  const categories = Array.from(new Set(cards.map((card) => card.category)));
  const levels = Array.from(new Set(cards.map((card) => card.level)));

  return (
    <div className="bg-primaryDark py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-white text-4xl font-bold text-center mb-14">
          <h1>Explore Challenges</h1>
        </div>
        <div className="flex flex-col sm:flex-row justify-end sm:justify-center sm:gap-4">
          {/* Search Bar */}
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
                  Show All
                </li>
                {filteredCards.length > 0 && (
                  <>
                    {filteredCards.map((card) => (
                      <li
                        key={card.id}
                        onClick={() => handleCardSelect(card)}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        {card.title}
                      </li>
                    ))}
                  </>
                )}
                {filteredCards.length === 0 && query.length > 0 && (
                  <li className="p-2 text-gray-500">No results found</li>
                )}
              </ul>
            )}
          </div>

          {/* Filter Button */}
          <FilterButton
            categories={categories}
            levels={levels}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ExploreChallenges;
