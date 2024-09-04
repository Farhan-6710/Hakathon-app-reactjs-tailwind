"use client";
import React, { useState, useEffect } from "react";
import CardList from "./CardList";
import ExploreChallenges from "@/src/components/ExploreChallenges";
import { Card } from "@/types/types";

const CardsSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [filters, setFilters] = useState<{ category: string; level: string }>({
    category: "",
    level: "",
  });

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
    setSelectedCard(null); // Reset the selected card
  };

  const handleFilterChange = (newFilters: {
    category: string;
    level: string;
  }) => {
    setFilters(newFilters);
  };

  const filteredCards = cards.filter((card) => {
    const matchesCategory =
      !filters.category || card.category === filters.category;
    const matchesLevel = !filters.level || card.level === filters.level;
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
      />
      <section className="bg-primary py-10 md:py-12">
        <div className="container px-5 py-8 mx-auto">
          {filteredCards.length === 0 ? (
            <p className="text-center text-4xl text-white min-h-56 leading-snug md:leading-loose">
              No Hackathons found <br /> Kindly Check For{" "}
              <span className="text-secondary">Upcoming Hakathons</span>{" "}
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
