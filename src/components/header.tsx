import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin } from "lucide-react";
import MobileNav from "./mobile-nav";
import DesktopNav from "./desktop-nav";

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
        <nav>
          <MobileNav />
          <DesktopNav />
        </nav>
      </div>
    </header>
  );
};

export default Header;
