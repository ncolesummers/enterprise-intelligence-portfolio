export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  published?: boolean;
  featuredImage?: string;
}

export interface BlogMetadata {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
  published?: boolean;
  featuredImage?: string;
}

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  author?: string;
  published?: boolean;
  featuredImage?: string;
}