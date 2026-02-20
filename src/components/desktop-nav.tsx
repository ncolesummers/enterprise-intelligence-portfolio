import React from "react";
import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Socials, navigation } from "@/lib/const";

const DesktopNav = () => {
  return (
    <div className="hidden sm:flex items-center">
      <nav className="flex space-x-6 mr-auto">
        {navigation.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className="text-lg font-medium hover:text-accent transition-colors"
            {...(item.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="flex space-x-4 ml-6">
        <Link
          href={Socials[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="h-5 w-5" />
        </Link>
        <Link
          href={Socials[1].href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub Profile"
        >
          <Github className="h-5 w-5" />
        </Link>
        <Link
          href={Socials[2].href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Instagram Profile"
        >
          <Instagram className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default DesktopNav;
