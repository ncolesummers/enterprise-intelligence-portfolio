import Link from "next/link";
import { Github, Instagram, Linkedin } from "lucide-react";
import { Socials } from "@/lib/const";
import { cn } from "@/lib/utils";

const icons: Record<string, typeof Github> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
};

/**
 * Off-sheet references as a row of marks, for the title block, where there is
 * width for a glyph and not for a name. The index sheet's foot names each
 * destination instead; see `references.tsx`.
 */
const SocialLinks = ({ className }: { className?: string }) => (
  <div className={cn("flex items-stretch", className)}>
    {Socials.map(social => {
      const Icon = icons[social.name];
      return (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${social.name} profile`}
          className="hover:text-annotation flex w-9 items-center justify-center transition-colors"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </Link>
      );
    })}
  </div>
);

export default SocialLinks;
