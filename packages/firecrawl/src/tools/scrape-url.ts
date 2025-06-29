import type FirecrawlApp from '@mendable/firecrawl-js'
import type { ScrapeResponse as FirecrawlScrapeResponse, ErrorResponse } from '@mendable/firecrawl-js'
import type { ScrapeUrlParams, ScrapeResponse } from '../types.js'

export const scrapeUrlTool = {
  name: 'scrapeUrl',
  description: 'Scrape a single URL and get its content in various formats (markdown, HTML, etc.)',
  parameters: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        format: 'uri',
        description: 'The URL to scrape',
      },
      formats: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['markdown', 'html', 'rawHtml', 'content', 'links', 'screenshot'],
        },
        description: 'Output formats to return (default: ["markdown"])',
        default: ['markdown'],
      },
      headers: {
        type: 'object',
        description: 'Custom headers to include in the request',
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
        description: 'Whether to extract only the main content of the page',
        default: false,
      },
      timeout: {
        type: 'number',
        description: 'Timeout in milliseconds',
      },
      waitFor: {
        type: 'number',
        description: 'Time to wait in milliseconds before scraping',
      },
      actions: {
        type: 'array',
        items: { type: 'object' },
        description: 'Actions to perform before scraping (e.g., click, type, wait)',
      },
    },
    required: ['url'],
  },
} as const

/**
 * Scrape a single URL
 */
export async function scrapeUrl(firecrawl: FirecrawlApp, params: ScrapeUrlParams): Promise<ScrapeResponse> {
  try {
    const { url, ...options } = params
    const result = await firecrawl.scrapeUrl(url, options)

    if ('success' in result && result.success) {
      const scrapeResult = result as FirecrawlScrapeResponse
      return {
        success: true,
        data: {
          url: scrapeResult.url,
          markdown: scrapeResult.markdown,
          html: scrapeResult.html,
          rawHtml: scrapeResult.rawHtml,
          links: scrapeResult.links,
          extract: scrapeResult.extract,
          json: scrapeResult.json,
          screenshot: scrapeResult.screenshot,
          metadata: scrapeResult.metadata,
          actions: scrapeResult.actions,
        },
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
