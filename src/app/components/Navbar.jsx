"use client";
import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212] bg-opacity-100 border-b border-[#33353F] backdrop-blur-md">
      <div className="flex container items-center justify-between mx-auto px-4 py-3 md:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-4xl font-bold text-white tracking-wide"
        >
          &lt;/AK&gt;
        </Link>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <NavLink key={index} href={link.path} title={link.title} />
          ))}
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {navbarOpen && (
        <div className="fixed inset-0 top-[64px] bg-black bg-opacity-95 flex flex-col items-center justify-center gap-6 text-white z-40">
          {navLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => setNavbarOpen(false)}
              className="text-lg hover:text-blue-400 transition"
            >
              <a href={link.path}>{link.title}</a>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
