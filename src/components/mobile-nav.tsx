import React from "react";

const MobileNav = () => {
  return (
    <div className="block sm:hidden">
      <nav className="flex flex-col items-center space-y-4">
        <a href="#work" className="text-lg font-medium">
          Work
        </a>
        <a href="#about" className="text-lg font-medium">
          About
        </a>
        <a href="#contact" className="text-lg font-medium">
          Contact Me
        </a>
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="text-lg"
          >
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
      </nav>
    </div>
  );
};

export default MobileNav;
