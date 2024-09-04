"use client";

import React from "react";
import { Calendar } from "lucide-react";
import AdditionalFields from "./AdditionalFields"; // Import the new component

const difficultyOptions = ["Easy", "Medium", "Hard"]; // Example difficulties

interface CreateInputFieldsProps {
  challengeName: string;
  startDate: string;
  endDate: string;
  description: string;
  image: File | null;
  levelType: string;
  setChallengeName: (value: string) => void;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setDescription: (value: string) => void;
  setImage: (file: File | null) => void;
  setLevelType: (value: string) => void;
}

const CreateInputFields: React.FC<CreateInputFieldsProps> = ({
  challengeName,
  startDate,
  endDate,
  description,
  image,
  levelType,
  setChallengeName,
  setStartDate,
  setEndDate,
  setDescription,
  setImage,
  setLevelType,
}) => {
  return (
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
            type="text"
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
        <label htmlFor="endDate" className="block text-gray-700 mb-3 font-bold">
          End Date
        </label>
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <input
            type="text"
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

      {/* Use AdditionalFields component */}
      <AdditionalFields
        description={description}
        image={image}
        levelType={levelType}
        setDescription={setDescription}
        setImage={setImage}
        setLevelType={setLevelType}
      />
    </div>
  );
};

export default CreateInputFields;
