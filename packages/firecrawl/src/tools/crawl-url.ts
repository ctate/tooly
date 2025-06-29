import type FirecrawlApp from '@mendable/firecrawl-js'
import type { CrawlResponse as FirecrawlCrawlResponse, ErrorResponse } from '@mendable/firecrawl-js'
import type { CrawlUrlParams, CrawlResponse } from '../types.js'

export const crawlUrlTool = {
  name: 'crawlUrl',
  description: 'Crawl a website and get content from all accessible pages',
  parameters: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        format: 'uri',
        description: 'The starting URL to crawl',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of pages to crawl',
        default: 50,
      },
      scrapeOptions: {
        type: 'object',
        properties: {
          formats: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['markdown', 'html', 'rawHtml', 'content', 'links', 'screenshot'],
            },
            default: ['markdown'],
          },
          headers: {
            type: 'object',
            description: 'Custom headers to include in requests',
          },
          includeTags: {
            type: 'array',
            items: { type: 'string' },
            description: 'HTML tags to include in the output',
          },
          excludeTags: {
            type: 'array',
            items: { type: 'string' },
            description: 'HTML tags to exclude from the output',
          },
          onlyMainContent: {
            type: 'boolean',
            description: 'Whether to extract only the main content of pages',
            default: false,
          },
          timeout: {
            type: 'number',
            description: 'Timeout in milliseconds per page',
          },
        },
        description: 'Options for scraping each page during the crawl',
      },
      maxDepth: {
        type: 'number',
        description: 'Maximum depth to crawl from the starting URL',
      },
      allowedDomains: {
        type: 'array',
        items: { type: 'string' },
        description: 'Domains allowed during crawling',
      },
      blockedDomains: {
        type: 'array',
        items: { type: 'string' },
        description: 'Domains to block during crawling',
      },
      allowBackwardLinks: {
        type: 'boolean',
        description: 'Whether to allow crawling backward links',
        default: false,
      },
      allowExternalLinks: {
        type: 'boolean',
        description: 'Whether to allow crawling external links',
        default: false,
      },
      ignoreSitemap: {
        type: 'boolean',
        description: 'Whether to ignore the sitemap when crawling',
        default: false,
      },
    },
    required: ['url'],
  },
} as const

/**
 * Crawl a website
 */
export async function crawlUrl(firecrawl: FirecrawlApp, params: CrawlUrlParams): Promise<CrawlResponse> {
  try {
    const { url, ...options } = params
    const result = await firecrawl.crawlUrl(url, options)

    if ('success' in result && result.success && 'id' in result) {
      const crawlResult = result as FirecrawlCrawlResponse
      return {
        success: true,
        id: crawlResult.id,
        url: crawlResult.url,
      }
    } else {
      const errorResult = result as ErrorResponse
      return {
        success: false,
        error: errorResult.error || 'Unknown error occurred',
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
