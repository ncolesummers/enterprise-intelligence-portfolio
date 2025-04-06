import React from "react";
import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Socials } from "@/lib/const";
const MobileNav = () => {
  return (
    <div className="block sm:hidden">
      <nav className="flex justify-center items-center space-x-6">
        <Link href="/about" className="text-lg font-medium">
          About
        </Link>
        <Link
          href={Socials[0].href}
          target="_blank"
          aria-label="LinkedIn Profile"
          className="text-lg"
        >
          <Linkedin className="h-5 w-5" />
        </Link>
        <Link
          href={Socials[1].href}
          target="_blank"
          aria-label="GitHub Profile"
          className="text-lg"
        >
          <Github className="h-5 w-5" />
        </Link>
        <Link
          href={Socials[2].href}
          target="_blank"
          aria-label="Instagram Profile"
          className="text-lg"
        >
          <Instagram className="h-5 w-5" />
        </Link>
      </nav>
    </div>
  );
};

export default MobileNav;
