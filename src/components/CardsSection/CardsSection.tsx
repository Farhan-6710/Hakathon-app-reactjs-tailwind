"use client";
import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import ExploreChallenges from "@/src/components/CardsSection/ExploreChallenges";
import { Card } from "@/types/types";

const CardsSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [filters, setFilters] = useState<{
    categories: string[];
    levels: string[];
  }>({
    categories: [],
    levels: [],
  });
  const [showAllChecked, setShowAllChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/cardData.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData: Card[] = await response.json();
        setCards(jsonData);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowAll = () => {
    setSelectedCard(null);
    setFilters({ categories: [], levels: [] });
    setShowAllChecked(true);
  };

  const handleFilterChange = (newFilters: {
    categories: string[];
    levels: string[];
  }) => {
    setFilters(newFilters);
    setShowAllChecked(
      newFilters.categories.length === 0 && newFilters.levels.length === 0
    );
  };

  const filteredCards = cards.filter((card) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(card.category);
    const matchesLevel =
      filters.levels.length === 0 || filters.levels.includes(card.level);
    return matchesCategory && matchesLevel;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ExploreChallenges
        cards={cards}
        onCardSelect={(card) => setSelectedCard(card)}
        onShowAll={handleShowAll}
        onFilterChange={handleFilterChange}
        showAllChecked={showAllChecked}
        filters={filters} // Pass filters state
      />
      <section className="bg-primary py-10 md:py-12">
        <div className="container px-5 py-8 mx-auto">
          {filteredCards.length === 0 ? (
            <p className="text-center text-4xl text-white min-h-56 leading-snug md:leading-loose">
              No Hackathons found <br /> Kindly Check For{" "}
              <span className="text-secondary">Upcoming Hackathons</span>{" "}
            </p>
          ) : (
            <CardList cards={selectedCard ? [selectedCard] : filteredCards} />
          )}
        </div>
      </section>
    </div>
  );
};

export default CardsSection;
