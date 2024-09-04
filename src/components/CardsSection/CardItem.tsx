"use client";
import React from "react";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use next/navigation for routing
import Timer from "./Timer"; // Adjust the import path as needed
import { Card } from "@/types/types"; // Import the shared `Card` interface

const getCategoryStyles = (category: string) => {
  switch (category) {
    case "Active":
      return "bg-green-100 text-green-600";
    case "Upcoming":
      return "bg-yellow-100 text-yellow-700";
    case "Past":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

const CardItem: React.FC<{ card: Card }> = ({ card }) => {
  const router = useRouter(); // Initialize useRouter from next/navigation

  const handleCardClick = () => {
    // Navigate to the dynamic route with the card's ID
    router.push(`/productDetails/${card.id}`);
  };

  return (
    <div key={card.id} className="p-4 w-full md:w-1/2 xl:w-1/3">
      <div
        onClick={handleCardClick}
        className="h-full border border-gray-200 border-opacity-60 rounded-3xl overflow-hidden shadow-lg cursor-pointer"
      >
        <div className="bg-white h-full">
          <Image
            className="lg:h-48 md:h-36 w-full object-cover object-center"
            src={card.imageSrc}
            alt={card.title}
            width={720}
            height={400}
          />
          <div className="p-6 flex flex-col justify-center md-px-12 lg:px-20">
            <div className="flex justify-center">
              <h2
                className={`tracking-widest text-xs title-font font-medium py-1 w-fit px-6 rounded-md mb-4 text-center ${getCategoryStyles(
                  card.category
                )}`}
              >
                {card.category}
              </h2>
            </div>
            <h1 className="title-font text-lg font-bold text-gray-900 mb-3 text-center cursor-pointer">
              {card.title}
            </h1>
            <Timer category={card.category} />
            <div className="flex justify-center items-center flex-wrap mt-4 mb-2">
              <button className="bg-secondary text-white inline-flex items-center px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-6 mr-2" />
                <span className="text-sm">Participate Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
