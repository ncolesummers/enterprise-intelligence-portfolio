import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Socials, navigation } from "@/lib/const";

const MobileNav = () => {
  return (
    <div className="block sm:hidden">
      <nav className="flex justify-center items-center space-x-6">
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
        <Link
          href={Socials[0].href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Linkedin className="h-5 w-5" />
        </Link>
        <Link
          href={Socials[1].href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-5 w-5" />
        </Link>
        <Link
          href={Socials[2].href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Profile"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Instagram className="h-5 w-5" />
        </Link>
      </nav>
    </div>
  );
};

export default MobileNav;
