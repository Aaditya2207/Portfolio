"use client";
import React, { useState, useEffect } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid"; // built-in Heroicons (you already have them)
import { motion } from "framer-motion";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 bg-[#1E1E2F] hover:bg-[#2D2D44] text-white p-3 rounded-full shadow-lg z-50"
        >
          <ChevronUpIcon className="h-6 w-6" />
        </motion.button>
      )}
    </>
  );
};

export default ScrollToTopButton;
