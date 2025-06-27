import { homeSource } from '@/lib/home-source'
import { notFound } from 'next/navigation'
import { getMDXComponents } from '@/mdx-components'

export default function HomePage() {
  const page = homeSource.getPage(['home'])
  if (!page) notFound()

  const MDXContent = page.data.body

  return <MDXContent components={getMDXComponents()} />
}

export function generateMetadata() {
  const page = homeSource.getPage(['home'])
  if (!page) return {}

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
