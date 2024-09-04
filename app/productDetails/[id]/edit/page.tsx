"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import EditAdditionalFields from "./EditAdditionalFields"; // Import the new component
import { Calendar } from "lucide-react";
import { formatDateWithSuffix, calculateDates } from "@/src/dateUtils/dateUtils"; // Import utility functions

const EditProduct: React.FC = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic ID from the URL

  // State variables for form fields
  const [challengeName, setChallengeName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null); // Change to imageSrc
  const [levelType, setLevelType] = useState("");
  const [category, setCategory] = useState(""); // Add state for category

  useEffect(() => {
    const productId = Array.isArray(id) ? id[0] : id;

    const fetchProduct = async () => {
      if (productId) {
        const response = await fetch("/data/cardData.json");
        const data = await response.json();
        const product = data.find(
          (item: any) => item.id === parseInt(productId)
        );
        if (product) {
          setChallengeName(product.title);
          setDescription(product.description);
          setImageSrc(product.imageSrc); // Use imageSrc
          setLevelType(product.levelType);
          setCategory(product.category); // Set category

          try {
            const {
              startDate: calculatedStartDate,
              endDate: calculatedEndDate,
            } = calculateDates(product.category);
            setStartDate(formatDateWithSuffix(calculatedStartDate));
            setEndDate(formatDateWithSuffix(calculatedEndDate));
          } catch (error) {
            console.error(error);
          }
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleSave = async () => {
    const updatedProduct = {
      title: challengeName,
      startDate,
      endDate,
      description,
      imageSrc, // Use imageSrc
      levelType,
    };
    console.log(updatedProduct);
    router.push(`/productDetails/${id}`);
  };

  return (
    <div className="pb-6">
      <div className="bg-rare mb-8">
        <h2 className="container mx-auto text-2xl font-bold py-10 px-4">
          Edit Challenge Details
        </h2>
      </div>

      <div className="container mx-auto p-6 bg-white">
        <div className="space-y-6">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <label
              htmlFor="challengeName"
              className="block text-gray-700 mb-3 font-bold"
            >
              Challenge Name
            </label>
            <input
              type="text"
              id="challengeName"
              value={challengeName}
              onChange={(e) => setChallengeName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-4"
            />
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-gray-700 mb-3 font-bold"
            >
              Start Date
            </label>
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <input
                type="text" // Changed to text to accommodate custom formatting
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-4 pr-2"
                placeholder="Add Start Date"
              />
              <Calendar
                className="absolute z-10 -top-1 right-0 flex items-center px-3 text-gray-500"
                size={45}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-gray-700 mb-3 font-bold"
            >
              End Date
            </label>
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <input
                type="text" // Changed to text to accommodate custom formatting
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1 px-4 pr-2"
                placeholder="Add End Date"
              />
              <Calendar
                className="absolute z-10 -top-1 right-0 flex items-center px-3 text-gray-500"
                size={45}
              />
            </div>
          </div>

          <EditAdditionalFields
            description={description}
            imageSrc={imageSrc} // Pass imageSrc here
            levelType={levelType}
            setDescription={setDescription}
            setImageSrc={setImageSrc} // Pass setImageSrc here
            setLevelType={setLevelType}
          />

          <button
            onClick={handleSave}
            className="bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
