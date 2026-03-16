"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Instagram, Linkedin, Menu } from "lucide-react";
import { Socials, navigation } from "@/lib/const";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="block sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            data-testid="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-foreground hover:bg-accent/10 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64 p-0">
          <SheetHeader className="border-b border-border/40 px-6 py-4">
            <SheetTitle className="text-lg font-bold tracking-tight">
              Navigation
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col px-6 py-4" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex h-11 items-center text-lg font-medium text-foreground hover:text-accent transition-colors"
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-border/40 px-6 py-4">
            <div className="flex items-center gap-1">
              <Link
                href={Socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                onClick={() => setOpen(false)}
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={Socials[1].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                onClick={() => setOpen(false)}
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={Socials[2].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                onClick={() => setOpen(false)}
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
