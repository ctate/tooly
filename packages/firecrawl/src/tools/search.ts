import type FirecrawlApp from '@mendable/firecrawl-js'
import type { SearchResponse as FirecrawlSearchResponse, ErrorResponse } from '@mendable/firecrawl-js'
import type { SearchParams, SearchResponse } from '../types.js'

export const searchTool = {
  name: 'search',
  description: 'Search the web and optionally scrape the results',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search query',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of search results to return',
        default: 10,
      },
      lang: {
        type: 'string',
        description: 'Language for search results (e.g., "en", "es")',
      },
      country: {
        type: 'string',
        description: 'Country code for search results (e.g., "US", "GB")',
      },
      location: {
        type: 'string',
        description: 'Location for search results',
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
            description: 'Output formats for scraped content',
          },
          headers: {
            type: 'object',
            description: 'Custom headers for scraping',
          },
          onlyMainContent: {
            type: 'boolean',
            description: 'Whether to extract only main content when scraping results',
          },
          timeout: {
            type: 'number',
            description: 'Timeout in milliseconds for scraping each result',
          },
        },
        description: 'Options for scraping search results (if enabled)',
      },
    },
    required: ['query'],
  },
} as const

/**
 * Search the web
 */
export async function search(firecrawl: FirecrawlApp, params: SearchParams): Promise<SearchResponse> {
  try {
    const result = await (firecrawl as any).search(params)

    if ('success' in result && result.success) {
      const searchResult = result as FirecrawlSearchResponse
      return {
        success: true,
        data: searchResult.data,
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
