import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { BlogMetadata } from '@/lib/types/blog'

const POSTS_PATH = path.join(process.cwd(), 'src/content/blog/posts')

// Parse MDX frontmatter and content
export async function parseMDX(filePath: string) {
  const fileContents = await fs.readFile(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    metadata: data as BlogMetadata,
    content
  }
}

// Convert markdown content to HTML (for excerpts or processing)
export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
    .process(markdown)
  
  return result.toString()
}

// Get all MDX files from the posts directory
export async function getMDXFiles() {
  try {
    const files = await fs.readdir(POSTS_PATH)
    return files.filter(file => file.endsWith('.mdx'))
  } catch (error) {
    console.error('Error reading MDX files:', error)
    return []
  }
}

// Validate frontmatter data
export function validateFrontmatter(data: unknown): data is BlogMetadata {
  if (!data || typeof data !== 'object') {
    return false
  }
  
  const metadata = data as Record<string, unknown>
  const requiredFields = ['title', 'date', 'excerpt', 'heroType']
  const validHeroTypes = ['text', 'image', 'video', 'animation']
  
  for (const field of requiredFields) {
    if (!metadata[field]) {
      console.error(`Missing required frontmatter field: ${field}`)
      return false
    }
  }
  
  if (!validHeroTypes.includes(metadata.heroType as string)) {
    console.error(`Invalid heroType: ${metadata.heroType}. Must be one of: ${validHeroTypes.join(', ')}`)
    return false
  }
  
  // If heroType is not 'text', heroAsset should be provided
  if (metadata.heroType !== 'text' && !metadata.heroAsset) {
    console.warn(`heroAsset is recommended for heroType: ${metadata.heroType}`)
  }
  
  return true
}

// Extract excerpt from content if not provided in frontmatter
export function extractExcerpt(content: string, length: number = 160): string {
  // Remove MDX/JSX components and markdown formatting
  const plainText = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Convert links to text
    .replace(/[#*_~]/g, '') // Remove markdown formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()
  
  if (plainText.length <= length) {
    return plainText
  }
  
  // Cut at the last complete word within the length limit
  const truncated = plainText.slice(0, length)
  const lastSpaceIndex = truncated.lastIndexOf(' ')
  
  return truncated.slice(0, lastSpaceIndex) + '...'
}