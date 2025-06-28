export type HeroType = 'text' | 'image' | 'video' | 'animation'

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  heroType: HeroType
  heroAsset?: string
  content: string
  readingTime: string
  tags: string[]
}

export interface BlogMetadata {
  title: string
  date: string
  excerpt: string
  heroType: HeroType
  heroAsset?: string
  tags: string[]
}