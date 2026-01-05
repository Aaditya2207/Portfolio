"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const HeroSection = () => {

  const handleScroll = (e) => {
    e.preventDefault();
    const section = document.querySelector("#contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="lg:py-16">
      <div className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center sm:text-left w-full px-4"
        >
          <h1 className="text-white mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-extrabold overflow-hidden px-2 sm:px-0">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I&apos;m
            </div>
            <div className="min-h-[1.2em] break-words hyphens-auto md:break-normal lg:whitespace-nowrap leading-tight">
              <TypeAnimation
                sequence={[
                  "Aaditya",
                  1000,
                  "Web Developer",
                  1000,
                  "Cyber Security Analyst",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleScroll}
              className="px-8 py-3 sm:px-10 sm:py-4 inline-block w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Hire Me
            </button>

            <a
              href="/Cyber Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-1 inline-block py-1 w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white transition-all duration-300 hover:scale-105"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold">
                Download CV
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
