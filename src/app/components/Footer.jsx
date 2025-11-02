import React from "react";

const Footer = () => {
  return (
    <footer className="footer border-t border-[#33353F] border-l-transparent border-r-transparent text-white z-10">
      <div className="container p-12 flex justify-between items-center">
        {/* Fixed text */}
        <span className="text-white font-semibold text-lg">&lt;/AK&gt;</span>
        <p className="text-slate-600">All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
