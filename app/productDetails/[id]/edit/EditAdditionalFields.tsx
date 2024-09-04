import React, { useState, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

const difficultyOptions = ["Easy", "Medium", "Hard"]; // Example difficulties

interface EditAdditionalFieldsProps {
  description: string;
  imageSrc: string | null;
  levelType: string;
  setDescription: (value: string) => void;
  setImageSrc: (file: string | null) => void;
  setLevelType: (value: string) => void;
}

const EditAdditionalFields: React.FC<EditAdditionalFieldsProps> = ({
  description,
  imageSrc,
  levelType,
  setDescription,
  setImageSrc,
  setLevelType,
}) => {
  const [imageSrcPreview, setImageSrcPreview] = useState<string | null>(null);

  useEffect(() => {
    // Update the imageSrc preview when the imageSrc prop changes
    if (imageSrc) {
      setImageSrcPreview(imageSrc);
    } else {
      setImageSrcPreview(null);
    }
  }, [imageSrc]);

  const handleChangeImageSrcClick = () => {
    // Handle imageSrc change logic
    console.log("Change ImageSrc button clicked (UI only)");
  };

  return (
    <div className="space-y-6">
      <div className="mt-5">
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

      <div className={imageSrcPreview ? "w-fit" : ""}>
        <span className="block text-gray-700 mb-3 font-bold">Image</span>
        <div className="bg-green-50 p-6">
          {imageSrcPreview && (
            <div className="mb-3 w-full">
              <img
                src={imageSrcPreview}
                alt="ImageSrc preview"
                className="w-full h-auto object-cover rounded-b-2xl"
              />
            </div>
          )}
          <div className="flex justify-center items-center mt-2 w-56">
            <button
              onClick={handleChangeImageSrcClick}
              className="flex items-center gap-2 cursor-pointer w-full py-2"
              aria-label="Change ImageSrc"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_27_157)">
                  <path
                    d="M0.00183105 2.8125C0.00183105 2.31522 0.199375 1.83831 0.551006 1.48667C0.902637 1.13504 1.37955 0.9375 1.87683 0.9375H13.1268C13.6241 0.9375 14.101 1.13504 14.4527 1.48667C14.8043 1.83831 15.0018 2.31522 15.0018 2.8125V12.1875C15.0018 12.6848 14.8043 13.1617 14.4527 13.5133C14.101 13.865 13.6241 14.0625 13.1268 14.0625H1.87683C1.37955 14.0625 0.902637 13.865 0.551006 13.5133C0.199375 13.1617 0.00183105 12.6848 0.00183105 12.1875V2.8125ZM0.939331 11.25V12.1875C0.939331 12.4361 1.0381 12.6746 1.21392 12.8504C1.38973 13.0262 1.62819 13.125 1.87683 13.125H13.1268C13.3755 13.125 13.6139 13.0262 13.7897 12.8504C13.9656 12.6746 14.0643 12.4361 14.0643 12.1875V8.90625L10.5234 7.08094C10.4355 7.0369 10.3359 7.02162 10.2389 7.03727C10.1418 7.05291 10.0521 7.09869 9.98246 7.16813L6.50433 10.6462L4.01058 8.985C3.92054 8.92506 3.81255 8.89809 3.7049 8.90869C3.59725 8.91928 3.49658 8.96678 3.41996 9.04313L0.939331 11.25ZM5.62683 5.15625C5.62683 4.78329 5.47867 4.4256 5.21495 4.16188C4.95123 3.89816 4.59354 3.75 4.22058 3.75C3.84762 3.75 3.48993 3.89816 3.22621 4.16188C2.96249 4.4256 2.81433 4.78329 2.81433 5.15625C2.81433 5.52921 2.96249 5.8869 3.22621 6.15062C3.48993 6.41434 3.84762 6.5625 4.22058 6.5625C4.59354 6.5625 4.95123 6.41434 5.21495 6.15062C5.47867 5.8869 5.62683 5.52921 5.62683 5.15625Z"
                    fill="#44924C"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_27_157">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span
                className={`text-${
                  imageSrcPreview ? "secondary" : "gray-700"
                } font-semibold`}
              >
                Change Image
              </span>
              <ArrowRight className="w-5 h-5 text-secondary" />
            </button>
          </div>
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 pr-10 appearance-none"
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

export default EditAdditionalFields;
