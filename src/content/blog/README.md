# Blog Content Directory

This directory contains all blog-related content for the portfolio site.

## Directory Structure

```
blog/
├── posts/           # MDX blog post files
│   └── YYYY-MM-DD-post-slug.mdx
└── assets/          # Media assets for blog posts
    ├── images/      # Images for blog posts
    ├── videos/      # Video files (or use external hosting)
    └── animations/  # Lottie animation files
```

## File Naming Convention

Blog posts should follow this naming pattern:
- Format: `YYYY-MM-DD-post-title-slug.mdx`
- Example: `2024-01-15-enterprise-ai.mdx`

## Blog Post Frontmatter

Each MDX file should include the following frontmatter:

```yaml
---
title: "Your Blog Post Title"
date: "YYYY-MM-DD"
excerpt: "A brief description of the post"
heroType: "text" | "image" | "video" | "animation"
heroAsset: "/content/blog/assets/images/hero-image.jpg" # Optional, for non-text heroes
tags: ["tag1", "tag2", "tag3"]
---
```

## Asset Guidelines

- **Images**: Optimize images before adding them. Use descriptive filenames.
- **Videos**: Consider using external hosting (YouTube, Vimeo) for large videos.
- **Animations**: Store Lottie JSON files or optimized GIFs.

## Usage

The blog utilities in `src/lib/blog.ts` provide functions to:
- `getAllPosts()`: Retrieve all blog posts sorted by date
- `getPostBySlug(slug)`: Get a specific post by its slug
- `getPostSlugs()`: Get all available post slugs

Note: MDX processing will be configured in a future issue (#13).