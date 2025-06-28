import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { BlogPost, BlogMetadata } from '@/lib/types/blog'
import { validateFrontmatter } from '@/lib/mdx'

const POSTS_PATH = path.join(process.cwd(), 'src/content/blog/posts')

export async function getAllPosts(): Promise<BlogPost[]> {
  const postFilenames = await fs.readdir(POSTS_PATH)
  const mdxFiles = postFilenames.filter((filename) => filename.endsWith('.mdx'))
  
  const posts = await Promise.all(
    mdxFiles.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, '')
      const post = await getPostBySlug(slug)
      return post!
    })
  )
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`)
  
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Validate frontmatter
    if (!validateFrontmatter(data)) {
      console.error(`Invalid frontmatter in post: ${slug}`)
      return null
    }
    
    const metadata = data as BlogMetadata
    const readingTimeResult = readingTime(content)
    
    return {
      slug,
      title: metadata.title,
      date: metadata.date,
      excerpt: metadata.excerpt,
      heroType: metadata.heroType,
      heroAsset: metadata.heroAsset,
      content,
      readingTime: readingTimeResult.text,
      tags: metadata.tags || []
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    const postFilenames = await fs.readdir(POSTS_PATH)
    const mdxFiles = postFilenames.filter((filename) => filename.endsWith('.mdx'))
    return mdxFiles.map((filename) => filename.replace(/\.mdx$/, ''))
  } catch (error) {
    console.error('Error reading post slugs:', error)
    return []
  }
}