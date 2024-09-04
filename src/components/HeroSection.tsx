"use client"
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const HeroSection: React.FC = () => {
  const router = useRouter(); // Initialize useRouter

  const handleClick = () => {
    router.push("/admin"); // Navigate to the /admin page
  };

  return (
    <section className="bg-primary text-white body-font">
      <div className="container mx-auto flex px-5 md:px-24 py-14 md:py-24 lg:flex-row flex-col items-center">
        <div className="lg:w-8/12 md:w-full xl:pr-24 md:pr-6 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <div className="title-container mb-4">
            <h1 className="title-font text-2xl sm:text-4xl md:text-5xl font-medium text-white title-with-line">
              Accelerate Innovation <br /> with Global AI Challenges
            </h1>
          </div>
          <p className="mb-8 leading-relaxed">
            AI Challenges at DPhi simulate real-world problems. It is a great
            place to put your AI/Data Science skills to the test on diverse
            datasets, allowing you to foster learning through competitions.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleClick} // Attach handleClick to the button
              className="inline-flex text-primary font-semibold bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded-lg text-lg"
            >
              Create Challenge
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center lg:w-4/12 md:w-full w-5/6">
          <Image
            className="object-contain object-center rounded lg:ml-8 hero-image"
            alt="hero"
            src="/images/hero-image.png"
            width={250}
            height={250}
            priority // Prioritizes loading the image
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
