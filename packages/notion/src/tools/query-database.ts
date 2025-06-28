import { Client } from '@notionhq/client'
import type { QueryDatabaseParams, QueryResults } from '../types.js'

export const queryDatabaseTool = {
  name: 'queryDatabase',
  description: 'Query database entries in Notion',
  parameters: {
    type: 'object',
    properties: {
      database_id: {
        type: 'string',
        description: 'The ID of the database to query',
      },
      filter: {
        type: 'object',
        description: 'Filter criteria for database entries',
        additionalProperties: true,
      },
      sorts: {
        type: 'array',
        description: 'Sort criteria for results',
        items: {
          type: 'object',
          properties: {
            property: {
              type: 'string',
              description: 'Property name to sort by',
            },
            timestamp: {
              type: 'string',
              enum: ['created_time', 'last_edited_time'],
              description: 'Timestamp to sort by (alternative to property)',
            },
            direction: {
              type: 'string',
              enum: ['ascending', 'descending'],
              description: 'Sort direction',
            },
          },
          required: ['direction'],
        },
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
    required: ['database_id'],
  },
} as const

/**
 * Query database entries
 */
export async function queryDatabase(notion: Client, params: QueryDatabaseParams): Promise<QueryResults> {
  try {
    const { database_id, ...queryData } = params
    const response = await notion.databases.query({
      database_id,
      ...queryData,
    } as any)
    return response as any
  } catch (error) {
    throw new Error(`Failed to query database: ${error instanceof Error ? error.message : String(error)}`)
  }
}
