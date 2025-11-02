"use client";
import Link from "next/link";
import React from "react";

const NavLink = ({ href, title, className }) => {
  return (
    <Link
      href={href}
      className={`text-white font-medium hover:text-pink-400 transition duration-300 ${className}`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
