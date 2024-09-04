"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  useEffect(() => {
    // Define the debounce function
    const debounce = <T extends (...args: any[]) => void>(
      func: T,
      delay: number
    ) => {
      let timer: NodeJS.Timeout;
      return (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    };

    // Handle scroll event
    const handleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 150) {
        setIsSticky(true);
      } else if (scrollPosition <= 150 && scrollPosition === 0) {
        setIsSticky(false);
      }
    }, 10);

    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (currentPath === "/") {
      // Scroll back to top if already on the home page
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to the home page if on any other page
      router.push("/");
    }
  };

  return (
    <div>
      <header
        className={`bg-white text-gray-900 border-b border-gray-200 transition-transform duration-300 ease-in-out ${
          isSticky ? "sticky" : ""
        }`}
      >
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div
            className="relative w-auto flex-shrink-0 cursor-pointer"
            style={{ width: "100px", height: "45px" }}
            onClick={handleClick}
          >
            <Image
              alt="Company Logo"
              src="/images/Logo.png"
              fill
              sizes="(max-width: 640px) 50px, (max-width: 768px) 75px, 100px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </header>
      <div
        className={`header-placeholder ${isSticky ? "visible" : "hidden"}`}
      ></div>
    </div>
  );
};

export default Header;
