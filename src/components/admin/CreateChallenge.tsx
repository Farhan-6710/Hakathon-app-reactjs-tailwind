"use client";

import React, { useState } from "react";
import CreateInputFields from "@/src/components/admin/CreateInputFields";

const CreateChallenge: React.FC = () => {
  const [challengeName, setChallengeName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [levelType, setLevelType] = useState("Easy"); // Default to the first difficulty option

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      challengeName,
      startDate,
      endDate,
      description,
      image,
      levelType,
    });
  };

  return (
    <div className="pb-6">
      <div className="bg-rare mb-8">
        <h2 className="container mx-auto text-2xl font-bold py-10 px-4">
          Challenge Details
        </h2>
      </div>
      <div className="container mx-auto px-4">
        <CreateInputFields
          challengeName={challengeName}
          startDate={startDate}
          endDate={endDate}
          description={description}
          image={image}
          levelType={levelType}
          setChallengeName={setChallengeName}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setDescription={setDescription}
          setImage={setImage}
          setLevelType={setLevelType}
        />
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-secondary text-white px-4 py-2 rounded-md mt-6"
          >
            Create Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChallenge;
