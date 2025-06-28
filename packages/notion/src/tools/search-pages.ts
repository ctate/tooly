import { Client } from '@notionhq/client'
import type { SearchPagesParams, SearchResults } from '../types.js'

export const searchPagesTool = {
  name: 'searchPages',
  description: 'Search for pages and databases in Notion',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Text query to search for',
      },
      sort: {
        type: 'object',
        description: 'Sort criteria for results',
        properties: {
          direction: {
            type: 'string',
            enum: ['ascending', 'descending'],
            description: 'Sort direction',
          },
          timestamp: {
            type: 'string',
            enum: ['created_time', 'last_edited_time'],
            description: 'Timestamp to sort by',
          },
        },
        required: ['direction', 'timestamp'],
      },
      filter: {
        type: 'object',
        description: 'Filter results by object type',
        properties: {
          value: {
            type: 'string',
            enum: ['page', 'database'],
            description: 'Object type to filter by',
          },
          property: {
            type: 'string',
            enum: ['object'],
            description: 'Property to filter on',
          },
        },
        required: ['value', 'property'],
      },
      start_cursor: {
        type: 'string',
        description: 'Cursor for pagination',
      },
      page_size: {
        type: 'number',
        description: 'Number of results per page (1-100)',
        minimum: 1,
        maximum: 100,
        default: 100,
      },
    },
  },
} as const

/**
 * Search for pages and databases
 */
export async function searchPages(notion: Client, params: SearchPagesParams): Promise<SearchResults> {
  try {
    const response = await notion.search(params as any)
    return response as SearchResults
  } catch (error) {
    throw new Error(`Failed to search pages: ${error instanceof Error ? error.message : String(error)}`)
  }
}
