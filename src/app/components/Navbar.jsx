"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
  { title: "About", path: "about" },
  { title: "Projects", path: "projects" },
  { title: "Contact", path: "contact" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const yOffset = -80; 
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setNavbarOpen(false); 
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212] bg-opacity-95 border-b border-[#33353F] backdrop-blur-md">
      <div className="flex container items-center justify-between mx-auto px-4 py-4">
        {}
        <Link href="" className="text-3xl md:text-4xl font-bold text-white tracking-wide">
          &lt;/AK&gt;
        </Link>

        {}
        <div className="md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white transition"
          >
            {navbarOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>

        {}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleScroll(link.path)}
              className="text-white text-lg md:text-xl px-6 py-3 hover:text-blue-500 transition rounded-md"
            >
              {link.title}
            </button>
          ))}
        </div>
      </div>

      {}
      {navbarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center gap-6 text-white text-3xl z-50">
          {navLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleScroll(link.path)}
              className="w-3/4 text-center py-4 text-white hover:text-blue-500 transition rounded-lg bg-[#1a1a1a]"
            >
              {link.title}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
