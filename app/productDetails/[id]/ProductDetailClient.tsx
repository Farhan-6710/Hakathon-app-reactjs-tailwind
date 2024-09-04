"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import Image from "next/image";
import { Card } from "@/types/types"; // Adjust the path as needed
import { Clock } from "lucide-react"; // Import the Clock icon
import { formatDateWithSuffix } from "@/src/dateUtils/dateUtils"; // Import the utility function

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

const ProductDetailClient: React.FC<{ product: Card }> = ({ product }) => {
  const router = useRouter(); // Initialize the useRouter hook
  const today = new Date();

  // Get the end or start date based on category
  const getEndOrStartDate = (days: number) => {
    const date = new Date(today);
    date.setDate(date.getDate() + days);
    return formatDateWithSuffix(date);
  };

  // Generate category message based on category
  const getCategoryMessage = (category: string) => {
    switch (category) {
      case "Active":
        return `Ends on ${getEndOrStartDate(7)}`;
      case "Upcoming":
        return `Starts on ${getEndOrStartDate(7)}`;
      case "Past":
        return `Ended on ${getEndOrStartDate(-7)}`;
      default:
        return "";
    }
  };

  // Handler for the Edit button
  const handleEdit = () => {
    router.push(`/productDetails/${product.id}/edit`);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary product-details">
        <div className="container mx-auto py-16 pt-3 lg:pt-12 flex flex-col justify-center px-4 md:px-16">
          {/* First Element */}
          <div className="bg-tertiary p-2 px-6 pr-6 md:pr-20 text-xs sm:text-base rounded-lg mb-6 w-fit mt-12">
            <div className="flex items-center text-black font-bold">
              <Clock className="w-5 h-5 mr-2" /> {/* Clock icon */}
              <p>
                {getCategoryMessage(product.category)} (India Standard Time)
              </p>
            </div>
          </div>
          {/* Second Element */}
          <h1 className="text-4xl font-bold text-white mb-8 tracking-wide">
            {product.title}
          </h1>
          {/* Third Element */}
          <p className="text-white mb-4">
            Participate in the competition to rank in India&apos;s best Coders
            ranking
          </p>
          {/* Fourth Element */}
          <div className={`px-4 py-2 rounded-lg w-fit flex gap-2 bg-rare`}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.875 16.875H12.375V2.25H16.875V16.875ZM13.5 15.75H15.75V3.375H13.5V15.75ZM11.25 16.875H6.75V6.75H11.25V16.875ZM7.875 15.75H10.125V7.875H7.875V15.75ZM5.625 16.875H1.125V10.125H5.625V16.875Z"
                fill="#003145"
              />
            </svg>
            <p className="text-primary font-semibold">{product.level}</p>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="border-b shadow-lg font-bold">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-14">
          <div className="py-3 mt-1 px-2 border-b-4 text-lg border-secondary">
            Overview
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleEdit} // Attach the handleEdit function to the button
              className="bg-green-700 text-white px-4 md:px-8 py-2 rounded-lg text-sm"
            >
              Edit
            </button>
            <button className="bg-white text-red-500 border border-red-500 px-4 md:px py-2 rounded-lg text-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-6 px-0 md:px-8">
        <div className="overflow-hidden mt-4 lg:pr-72">
          <div className="p-6 pt-0 px-4 md:px-8">
            <p className="text-gray-700 mb-4">{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailClient;
