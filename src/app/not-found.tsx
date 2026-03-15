import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Page Not Found</h2>
      <p className="mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild variant="accent">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
