import type FirecrawlApp from '@mendable/firecrawl-js'
import type { BatchScrapeResponse as FirecrawlBatchScrapeResponse, ErrorResponse } from '@mendable/firecrawl-js'
import type { BatchScrapeParams, BatchScrapeResponse } from '../types.js'

export const batchScrapeTool = {
  name: 'batchScrape',
  description: 'Scrape multiple URLs in batch',
  parameters: {
    type: 'object',
    properties: {
      urls: {
        type: 'array',
        items: {
          type: 'string',
          format: 'uri',
        },
        description: 'Array of URLs to scrape',
        minItems: 1,
        maxItems: 1000,
      },
      formats: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['markdown', 'html', 'rawHtml', 'content', 'links', 'screenshot'],
        },
        description: 'Output formats to return for each URL',
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
        description: 'Whether to extract only the main content of each page',
        default: false,
      },
      timeout: {
        type: 'number',
        description: 'Timeout in milliseconds per URL',
      },
    },
    required: ['urls'],
  },
} as const

/**
 * Batch scrape multiple URLs
 */
export async function batchScrape(firecrawl: FirecrawlApp, params: BatchScrapeParams): Promise<BatchScrapeResponse> {
  try {
    const { urls, ...options } = params
    const result = await firecrawl.batchScrapeUrls(urls, options)

    if ('success' in result && result.success && 'id' in result) {
      const batchResult = result as FirecrawlBatchScrapeResponse
      return {
        success: true,
        id: batchResult.id,
        url: batchResult.url,
        invalidURLs: batchResult.invalidURLs,
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
