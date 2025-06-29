import type FirecrawlApp from '@mendable/firecrawl-js'
import type { MapResponse as FirecrawlMapResponse, ErrorResponse } from '@mendable/firecrawl-js'
import type { MapUrlParams, MapResponse } from '../types.js'

export const mapUrlTool = {
  name: 'mapUrl',
  description: 'Map a website to get a list of all URLs found on the site',
  parameters: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        format: 'uri',
        description: 'The URL to map',
      },
      search: {
        type: 'string',
        description: 'Search term to filter URLs (returns most relevant first)',
      },
      ignoreSitemap: {
        type: 'boolean',
        description: 'Whether to ignore the sitemap when mapping',
        default: false,
      },
      includeSubdomains: {
        type: 'boolean',
        description: 'Whether to include subdomains in the mapping',
        default: false,
      },
      limit: {
        type: 'number',
        description: 'Maximum number of URLs to return',
        default: 5000,
      },
    },
    required: ['url'],
  },
} as const

/**
 * Map URLs from a website
 */
export async function mapUrl(firecrawl: FirecrawlApp, params: MapUrlParams): Promise<MapResponse> {
  try {
    const { url, ...options } = params
    const result = await firecrawl.mapUrl(url, options)

    if ('success' in result && result.success && 'links' in result) {
      const mapResult = result as FirecrawlMapResponse
      return {
        success: true,
        links: mapResult.links,
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
