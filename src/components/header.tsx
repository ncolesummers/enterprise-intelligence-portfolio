import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-8 md:px-16">
        <Link
          className="text-lg font-bold tracking-tight sm:tracking-normal"
          href="/"
        >
          n_cole_summers
        </Link>
        <nav className="flex items-center gap-4">
          <button
            onClick={() => {
              document.getElementById("work")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="text-sm hover:text-gray-300 cursor-pointer"
            aria-label="Scroll to Work Section"
          >
            Work
          </button>
          <Link href="/about" className="text-sm hover:text-gray-300">
            About
          </Link>
          <Link
            href="https://www.linkedin.com/in/n-cole-summers/"
            target="_blank"
          >
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-300 p-2"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://github.com/ncolesummers/" target="_blank">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-300 p-2"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="https://www.instagram.com/ncolesummers/" target="_blank">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-300 p-2"
              aria-label="Instagram Profile"
            >
              <Instagram className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="mailto:n_cole_summers@icloud.com">
            <Button className="bg-white text-black hover:bg-gray-200">
              Contact me
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
