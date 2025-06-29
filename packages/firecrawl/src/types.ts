import { z } from 'zod'

// Base types
export const UrlSchema = z.string().url()
export const UrlsSchema = z.array(UrlSchema)

// Action schema - proper typing for Firecrawl actions
export const ActionSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('wait'),
    milliseconds: z.number().optional(),
    selector: z.string().optional(),
  }),
  z.object({
    type: z.literal('click'),
    selector: z.string(),
    all: z.boolean().optional(),
  }),
  z.object({
    type: z.literal('screenshot'),
    fullPage: z.boolean().optional(),
    quality: z.number().optional(),
  }),
  z.object({
    type: z.literal('write'),
    text: z.string(),
  }),
  z.object({
    type: z.literal('press'),
    key: z.string(),
  }),
  z.object({
    type: z.literal('scroll'),
    direction: z.enum(['up', 'down']).optional(),
    selector: z.string().optional(),
  }),
  z.object({
    type: z.literal('scrape'),
  }),
  z.object({
    type: z.literal('executeJavascript'),
    script: z.string(),
  }),
])

// Scrape options schema
export const ScrapeOptionsSchema = z.object({
  formats: z
    .array(
      z.enum([
        'markdown',
        'html',
        'rawHtml',
        'links',
        'screenshot',
        'screenshot@fullPage',
        'extract',
        'json',
        'changeTracking',
      ]),
    )
    .optional(),
  headers: z.record(z.string()).optional(),
  includeTags: z.array(z.string()).optional(),
  excludeTags: z.array(z.string()).optional(),
  onlyMainContent: z.boolean().optional(),
  timeout: z.number().optional(),
  waitFor: z.number().optional(),
  actions: z.array(ActionSchema).optional(),
})

// Scrape URL schema
export const ScrapeUrlSchema = z.object({
  url: UrlSchema,
  formats: z
    .array(
      z.enum([
        'markdown',
        'html',
        'rawHtml',
        'links',
        'screenshot',
        'screenshot@fullPage',
        'extract',
        'json',
        'changeTracking',
      ]),
    )
    .optional(),
  headers: z.record(z.string()).optional(),
  includeTags: z.array(z.string()).optional(),
  excludeTags: z.array(z.string()).optional(),
  onlyMainContent: z.boolean().optional(),
  timeout: z.number().optional(),
  waitFor: z.number().optional(),
  actions: z.array(ActionSchema).optional(),
})

// Crawl URL schema
export const CrawlUrlSchema = z.object({
  url: UrlSchema,
  limit: z.number().optional(),
  scrapeOptions: ScrapeOptionsSchema.optional(),
  maxDepth: z.number().optional(),
  allowedDomains: z.array(z.string()).optional(),
  blockedDomains: z.array(z.string()).optional(),
  allowBackwardLinks: z.boolean().optional(),
  allowExternalLinks: z.boolean().optional(),
  ignoreSitemap: z.boolean().optional(),
})

// Map URL schema
export const MapUrlSchema = z.object({
  url: UrlSchema,
  search: z.string().optional(),
  ignoreSitemap: z.boolean().optional(),
  includeSubdomains: z.boolean().optional(),
  limit: z.number().optional(),
})

// Search schema
export const SearchSchema = z.object({
  query: z.string(),
  limit: z.number().optional(),
  lang: z.string().optional(),
  country: z.string().optional(),
  location: z.string().optional(),
  scrapeOptions: ScrapeOptionsSchema.optional(),
})

// Batch scrape schema
export const BatchScrapeSchema = z.object({
  urls: UrlsSchema,
  formats: z
    .array(
      z.enum([
        'markdown',
        'html',
        'rawHtml',
        'links',
        'screenshot',
        'screenshot@fullPage',
        'extract',
        'json',
        'changeTracking',
      ]),
    )
    .optional(),
  headers: z.record(z.string()).optional(),
  includeTags: z.array(z.string()).optional(),
  excludeTags: z.array(z.string()).optional(),
  onlyMainContent: z.boolean().optional(),
  timeout: z.number().optional(),
})

// Check crawl status schema
export const CheckCrawlStatusSchema = z.object({
  id: z.string(),
})

// Metadata schema
export const FirecrawlDocumentMetadataSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    language: z.string().optional(),
    keywords: z.string().optional(),
    robots: z.string().optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogUrl: z.string().optional(),
    ogImage: z.string().optional(),
    ogAudio: z.string().optional(),
    ogDeterminer: z.string().optional(),
    ogLocale: z.string().optional(),
    ogLocaleAlternate: z.array(z.string()).optional(),
    ogSiteName: z.string().optional(),
    ogVideo: z.string().optional(),
    dctermsCreated: z.string().optional(),
    dcDateCreated: z.string().optional(),
    dcDate: z.string().optional(),
    dctermsType: z.string().optional(),
    dcType: z.string().optional(),
    dctermsAudience: z.string().optional(),
    dctermsSubject: z.string().optional(),
    dcSubject: z.string().optional(),
    dcDescription: z.string().optional(),
    dctermsKeywords: z.string().optional(),
    modifiedTime: z.string().optional(),
    publishedTime: z.string().optional(),
    articleTag: z.string().optional(),
    articleSection: z.string().optional(),
    sourceURL: z.string().optional(),
    statusCode: z.number().optional(),
    error: z.string().optional(),
    proxyUsed: z.enum(['basic', 'stealth']).optional(),
    cacheState: z.enum(['miss', 'hit']).optional(),
    cachedAt: z.string().optional(),
  })
  .catchall(z.unknown())

// Document schema
export const FirecrawlDocumentSchema = z.object({
  url: z.string().optional(),
  markdown: z.string().optional(),
  html: z.string().optional(),
  rawHtml: z.string().optional(),
  links: z.array(z.string()).optional(),
  extract: z.unknown().optional(),
  json: z.unknown().optional(),
  screenshot: z.string().optional(),
  metadata: FirecrawlDocumentMetadataSchema.optional(),
  actions: z
    .object({
      screenshots: z.array(z.string()),
      scrapes: z.array(
        z.object({
          url: z.string(),
          html: z.string(),
        }),
      ),
      javascriptReturns: z.array(
        z.object({
          type: z.string(),
          value: z.unknown(),
        }),
      ),
    })
    .optional(),
})

// Response types
export const FirecrawlResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
})

export const ScrapeResponseSchema = z.object({
  success: z.boolean(),
  data: FirecrawlDocumentSchema.optional(),
  error: z.string().optional(),
  warning: z.string().optional(),
})

export const CrawlResponseSchema = z.object({
  success: z.boolean(),
  id: z.string().optional(),
  url: z.string().optional(),
  data: z.array(FirecrawlDocumentSchema).optional(),
  error: z.string().optional(),
})

export const MapResponseSchema = z.object({
  success: z.boolean(),
  links: z.array(z.string()).optional(),
  error: z.string().optional(),
})

export const SearchResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(FirecrawlDocumentSchema).optional(),
  error: z.string().optional(),
  warning: z.string().optional(),
})

export const BatchScrapeResponseSchema = z.object({
  success: z.boolean(),
  id: z.string().optional(),
  url: z.string().optional(),
  data: z.array(FirecrawlDocumentSchema).optional(),
  error: z.string().optional(),
  invalidURLs: z.array(z.string()).optional(),
})

// Export inferred types
export type Action = z.infer<typeof ActionSchema>
export type ScrapeOptions = z.infer<typeof ScrapeOptionsSchema>
export type FirecrawlDocumentMetadata = z.infer<typeof FirecrawlDocumentMetadataSchema>
export type FirecrawlDocument = z.infer<typeof FirecrawlDocumentSchema>
export type ScrapeUrlInput = z.infer<typeof ScrapeUrlSchema>
export type CrawlUrlInput = z.infer<typeof CrawlUrlSchema>
export type MapUrlInput = z.infer<typeof MapUrlSchema>
export type SearchInput = z.infer<typeof SearchSchema>
export type BatchScrapeInput = z.infer<typeof BatchScrapeSchema>
export type CheckCrawlStatusInput = z.infer<typeof CheckCrawlStatusSchema>
export type FirecrawlResponse = z.infer<typeof FirecrawlResponseSchema>
export type ScrapeResponse = z.infer<typeof ScrapeResponseSchema>
export type CrawlResponse = z.infer<typeof CrawlResponseSchema>
export type MapResponse = z.infer<typeof MapResponseSchema>
export type SearchResponse = z.infer<typeof SearchResponseSchema>
export type BatchScrapeResponse = z.infer<typeof BatchScrapeResponseSchema>

// Tool parameter types
export interface ScrapeUrlParams extends ScrapeUrlInput {}
export interface CrawlUrlParams extends CrawlUrlInput {}
export interface MapUrlParams extends MapUrlInput {}
export interface SearchParams extends SearchInput {}
export interface BatchScrapeParams extends BatchScrapeInput {}
export interface CheckCrawlStatusParams extends CheckCrawlStatusInput {}
