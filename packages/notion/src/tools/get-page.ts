import { Client } from '@notionhq/client'
import type { GetPageParams, PageResponse } from '../types.js'

export const getPageTool = {
  name: 'getPage',
  description: 'Get details of a specific page by ID',
  parameters: {
    type: 'object',
    properties: {
      page_id: {
        type: 'string',
        description: 'The ID of the page to retrieve',
      },
    },
    required: ['page_id'],
  },
} as const

/**
 * Get page details by ID
 */
export async function getPage(notion: Client, params: GetPageParams): Promise<PageResponse> {
  try {
    const response = await notion.pages.retrieve({ page_id: params.page_id })
    return response as PageResponse
  } catch (error) {
    throw new Error(`Failed to get page: ${error instanceof Error ? error.message : String(error)}`)
  }
}
