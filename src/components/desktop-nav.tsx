import React from "react";

const DesktopNav = () => {
  return (
    <div className="hidden sm:flex justify-between items-center">
      <nav className="flex space-x-8">
        <a href="#work" className="text-lg font-medium">
          Work
        </a>
        <a href="#about" className="text-lg font-medium">
          About
        </a>
        <a href="#contact" className="text-lg font-medium">
          Contact Me
        </a>
      </nav>
      <div className="flex space-x-4">
        <a href="https://twitter.com" aria-label="Twitter" className="text-lg">
          Twitter
        </a>
        <a
          href="https://linkedin.com"
          aria-label="LinkedIn"
          className="text-lg"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default DesktopNav;
