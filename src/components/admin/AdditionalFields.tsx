"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store";
import { setImageUrl } from "@/src/redux/imageSlice";

// Define example difficulty options
const difficultyOptions = ["Easy", "Medium", "Hard"];

interface AdditionalFieldsProps {
  description: string;
  image: File | null;
  levelType: string;
  setDescription: (value: string) => void;
  setImage: (file: File | null) => void;
  setLevelType: (value: string) => void;
}

const AdditionalFields: React.FC<AdditionalFieldsProps> = ({
  description,
  image,
  levelType,
  setDescription,
  setImage,
  setLevelType,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const imageUrl = useSelector((state: RootState) => state.image.imageUrl);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Create preview URL when imageUrl changes
    if (imageUrl) {
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreview(imageUrl);
        setImage(file); // Update local state with file object
        dispatch(setImageUrl(imageUrl)); // Dispatch image URL to Redux store
      };

      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="description"
          className="block text-gray-700 mb-3 font-bold"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          className="mt-1 block w-full md:w-1/2 lg:w-3/5 border border-gray-300 rounded-md shadow-sm py-1 px-4"
          required
        />
      </div>

      <div className={`${imagePreview ? "bg-green-50 p-6 w-fit" : ""}`}>
        <label htmlFor="image" className="block text-gray-700 mb-3 font-bold">
          Image
        </label>
        {imagePreview && (
          <div className="mb-3">
            {/* Using next/image component with provided width and height */}
            <Image
              src={imagePreview}
              alt="Uploaded preview"
              width={400} // Replace with actual width if known
              height={300} // Replace with actual height if known
              className="w-40 h-auto object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex justify-center items-center mt-2 w-56">
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="sr-only"
            aria-label="image"
            required
          />
          <label
            htmlFor="image"
            className="bg-rare rounded-md flex justify-center items-center gap-2 cursor-pointer border w-full"
          >
            <span
              className={`text-${
                imagePreview ? "secondary" : "gray-700"
              } font-bold py-2`}
            >
              {imagePreview ? "Change Image" : "Upload"}
            </span>
            {imagePreview ? (
              <ArrowRight className="w-5 h-5 text-secondary" />
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.3654 10.186C16.9648 7.03087 14.2634 4.58337 11 4.58337C8.47371 4.58337 6.27921 6.06012 5.27729 8.38754C3.30829 8.97604 1.83337 10.835 1.83337 12.8334C1.83337 15.3606 3.88946 17.4167 6.41671 17.4167H16.5C18.5222 17.4167 20.1667 15.7722 20.1667 13.75C20.1653 12.9283 19.8886 12.1308 19.3808 11.4848C18.8731 10.8388 18.1635 10.3815 17.3654 10.186ZM11.9167 12.8334V15.5834H10.0834V12.8334H7.33337L11 8.25004L14.6667 12.8334H11.9167Z"
                  fill="#666666"
                />
              </svg>
            )}
          </label>
        </div>
      </div>

      <div className="w-56">
        <label
          htmlFor="levelType"
          className="block text-gray-700 mb-3 font-bold"
        >
          Level Type
        </label>
        <div className="relative">
          <select
            id="levelType"
            value={levelType}
            onChange={(e) => setLevelType(e.target.value)}
            className="mt-1 block w-56 border border-gray-300 rounded-md shadow-sm py-2 px-4 pr-10 appearance-none"
            required
          >
            {difficultyOptions.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalFields;
