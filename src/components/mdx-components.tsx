import type { MDXComponents } from 'mdx/types.js'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// CodeBlock component for syntax highlighted code
function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <pre className={cn(
      "my-6 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm",
      className
    )}>
      {children}
    </pre>
  )
}

// Custom link component that handles internal/external links
function CustomLink({ href, children, ...props }: React.ComponentProps<'a'>) {
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'))

  if (isInternalLink) {
    return (
      <Link href={href} className="text-primary underline-offset-4 hover:underline" {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-primary underline-offset-4 hover:underline"
      {...props}
    >
      {children}
    </a>
  )
}

// Custom image component with Next.js optimization
function CustomImage({ src, alt, ...props }: React.ComponentProps<typeof Image>) {
  return (
    <div className="my-8">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg"
        {...props}
      />
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Typography
    h1: ({ children }) => (
      <h1 className="mb-4 mt-8 scroll-m-20 text-4xl font-bold tracking-tight first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-8 scroll-m-20 text-3xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-3 mt-6 scroll-m-20 text-xl font-semibold tracking-tight">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="mb-3 mt-6 scroll-m-20 text-lg font-semibold tracking-tight">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="mb-3 mt-6 scroll-m-20 text-base font-semibold tracking-tight">
        {children}
      </h6>
    ),
    p: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {children}
      </p>
    ),
    
    // Lists
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="leading-7">
        {children}
      </li>
    ),
    
    // Block elements
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-muted-foreground/20 pl-6 italic">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-8 border-muted-foreground/20" />,
    
    // Code
    pre: CodeBlock,
    code: ({ children }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
        {children}
      </code>
    ),
    
    // Media
    img: CustomImage,
    Image: CustomImage,
    
    // Links
    a: CustomLink,
    
    // Tables
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody>
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 text-left font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2">
        {children}
      </td>
    ),
    
    // Pass through any additional components
    ...components,
  }
}