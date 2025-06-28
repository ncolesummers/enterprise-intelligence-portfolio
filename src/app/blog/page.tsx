import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import ContentCard from "@/components/ui/content-card";
import Section from "@/components/ui/section";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Blog",
  description: "Insights on enterprise development, microservices, and modern web technologies from Nathan Cole Summers.",
  path: "/blog"
});

// Placeholder blog posts data - will be replaced with MDX content later
const placeholderPosts = [
  {
    slug: "microservice-architecture-lessons",
    title: "5 Lessons from Building Microservice Architectures",
    excerpt: "Key insights from years of designing and implementing microservice systems in enterprise environments.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Architecture", "Microservices", "Enterprise"]
  },
  {
    slug: "typescript-in-enterprise",
    title: "Why TypeScript is Essential for Enterprise Applications",
    excerpt: "Exploring the benefits of strong typing and developer experience improvements in large-scale applications.",
    date: "2024-01-10",
    readTime: "6 min read",
    tags: ["TypeScript", "Enterprise", "Best Practices"]
  },
  {
    slug: "ai-integration-patterns",
    title: "Practical AI Integration Patterns for Modern Applications",
    excerpt: "Real-world patterns and best practices for integrating AI capabilities into existing enterprise systems.",
    date: "2024-01-05",
    readTime: "10 min read",
    tags: ["AI", "Integration", "Architecture"]
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container py-12 px-4">
        {/* Hero Section */}
        <div className="mb-16 flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tighter md:text-6xl">
            Blog
          </h1>
          <p className="mb-8 max-w-2xl text-xl text-gray-400">
            Insights on enterprise development, microservices, and modern web technologies
          </p>
        </div>

        {/* Blog Posts Grid */}
        <Section title="Recent Posts">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {placeholderPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <ContentCard className="h-full transition-transform hover:scale-[1.02]">
                  <div className="flex flex-col h-full">
                    <h3 className="mb-3 text-xl font-semibold line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mb-4 text-gray-300 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-white/10 text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-primary font-medium">
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </ContentCard>
              </Link>
            ))}
          </div>
        </Section>

        {/* Coming Soon Notice */}
        <Section title="More Coming Soon" className="text-center">
          <p className="mb-8 text-lg text-gray-400 max-w-2xl mx-auto">
            This blog is currently being set up. More articles on enterprise development, 
            microservices, and modern web technologies are coming soon.
          </p>
          <Link href="/">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Back to Home
            </Button>
          </Link>
        </Section>
      </main>

      <Footer />
    </div>
  );
}