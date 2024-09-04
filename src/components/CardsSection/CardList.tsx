import React from "react";
import CardItem from "./CardItem"; // Adjust the import path as needed
import { Card } from "@/types/types"; // Import the shared `Card` interface

const CardList: React.FC<{ cards: Card[] }> = ({ cards }) => {
  return (
    <div className="flex flex-wrap -m-4">
      {cards.length > 0 ? (
        cards.map((card) => <CardItem key={card.id} card={card} />)
      ) : (
        <p className="text-center w-full text-gray-600">No items available</p>
      )}
    </div>
  );
};

export default CardList;
