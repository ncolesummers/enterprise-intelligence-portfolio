import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex items-center gap-6">
          <Link
            href="https://www.linkedin.com/in/n-cole-summers/"
            target="_blank"
            className="text-white hover:text-gray-300"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="https://github.com/ncolesummers/"
            target="_blank"
            className="text-white hover:text-gray-300"
            aria-label="GitHub Profile"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/ncolesummers/"
            target="_blank"
            className="text-white hover:text-gray-300"
            aria-label="Instagram Profile"
          >
            <Instagram className="h-5 w-5" />
          </Link>
        </div>
        <p className="text-sm text-gray-400">all socials @ncolesummers</p>
      </div>
    </footer>
  );
};

export default Footer;
