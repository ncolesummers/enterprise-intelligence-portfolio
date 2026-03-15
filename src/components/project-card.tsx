import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: StaticImageData;
  link?: string;
  tags?: string[];
  comingSoon?: boolean;
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  tags = [],
  comingSoon = false,
}: ProjectCardProps) {
  const cardContent = (
    <>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4 pt-0">
        <h3 className="font-semibold text-xl mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      {comingSoon && (
        <CardFooter className="p-4 pt-0">
          <span className="mt-4 w-full text-center text-sm text-muted-foreground">
            Coming Soon
          </span>
        </CardFooter>
      )}
    </>
  );

  if (link) {
    return (
      <Link href={link} className="group block">
        <Card className="overflow-hidden p-0 motion-safe:transition-all motion-safe:duration-300 hover:border-accent/30">
          {cardContent}
        </Card>
      </Link>
    );
  }

  return (
    <Card className="overflow-hidden p-0 opacity-75">
      {cardContent}
    </Card>
  );
}
