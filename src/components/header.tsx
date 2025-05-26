import Link from "next/link";
import MobileNav from "./mobile-nav";
import DesktopNav from "./desktop-nav";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-8 md:px-16">
        <Link
          className="text-lg font-bold tracking-tight sm:tracking-normal"
          href="/"
        >
          n_cole_summers
        </Link>
        <div className="flex items-center gap-4">
          <nav>
            <MobileNav />
            <DesktopNav />
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
