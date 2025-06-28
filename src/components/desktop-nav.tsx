import React from "react";
import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Socials } from "@/lib/const";

const DesktopNav = () => {
  return (
    <div className="hidden sm:flex items-center">
      <nav className="flex space-x-6 mr-auto">
        <Link href="#work" className="text-lg font-medium">
          Work
        </Link>
        <Link href="/about" className="text-lg font-medium">
          About
        </Link>
        <Link href="/blog" className="text-lg font-medium">
          Blog
        </Link>
        <Link href="#contact" className="text-lg font-medium">
          Contact
        </Link>
      </nav>
      <div className="flex space-x-4 ml-6">
        <Link
          href={Socials[0].href}
          target="_blank"
          className="text-white hover:text-gray-300"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="h-5 w-5" />
        </Link>
        <Link
          href={Socials[1].href}
          target="_blank"
          className="text-white hover:text-gray-300"
          aria-label="GitHub Profile"
        >
          <Github className="h-5 w-5" />
        </Link>
        <Link
          href={Socials[2].href}
          target="_blank"
          className="text-white hover:text-gray-300"
          aria-label="Instagram Profile"
        >
          <Instagram className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;
