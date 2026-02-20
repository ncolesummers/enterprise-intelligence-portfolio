import { Github, Instagram, Linkedin } from "lucide-react";
import { Socials } from "@/lib/const";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <span className="text-sm text-muted-foreground">
          © 2025 N. Cole Summers
        </span>
        <div className="flex items-center gap-6">
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
    </footer>
  );
};

export default Footer;
