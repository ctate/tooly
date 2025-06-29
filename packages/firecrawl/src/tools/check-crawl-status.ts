import type FirecrawlApp from '@mendable/firecrawl-js'
import type { CheckCrawlStatusParams, FirecrawlResponse } from '../types.js'

export const checkCrawlStatusTool = {
  name: 'checkCrawlStatus',
  description: 'Check the status of a crawl job',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The crawl job ID returned from a previous crawl request',
      },
    },
    required: ['id'],
  },
} as const

/**
 * Check crawl status
 */
export async function checkCrawlStatus(
  firecrawl: FirecrawlApp,
  params: CheckCrawlStatusParams,
): Promise<FirecrawlResponse> {
  try {
    const result = await firecrawl.checkCrawlStatus(params.id)

    return {
      success: true,
      data: result,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
