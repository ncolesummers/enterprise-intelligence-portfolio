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
  hasCase?: boolean; // New prop to indicate if the project has a case study
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  tags = [], // Default to an empty array
  comingSoon = false, // Default to false
  hasCase = false, // Default to false
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {comingSoon && (
          <span className="inline-block bg-yellow-500 text-black text-xs font-medium px-2 py-1 rounded">
            Coming Soon
          </span>
        )}
        {hasCase && (
          <span className="inline-block bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
            Case Study Available
          </span>
        )}
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
      {link && (
        <CardFooter className="p-4 pt-0">
          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm hover:underline"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
