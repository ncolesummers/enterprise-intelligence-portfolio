import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Github } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: StaticImageData;
  link?: string; // Made optional to handle `comingSoon`
  tags?: string[]; // Made optional as it's not used in the current implementation
  comingSoon?: boolean; // New prop to indicate if the project is coming soon
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  tags = [], // Default to an empty array
  comingSoon = false, // Default to false
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden p-0"> {/* Removed padding from the Card */}
      <div className="relative aspect-video">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4 pt-0">
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {comingSoon && (
          <span className="inline-flex text-white text-sm font-medium py-1 rounded">
            Coming Soon™
          </span>
        )}
        {link && (
          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm hover:underline"
          >
            View Project
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
