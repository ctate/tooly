import { Client } from '@notionhq/client'
import type { GetDatabaseParams, DatabaseResponse } from '../types.js'

export const getDatabaseTool = {
  name: 'getDatabase',
  description: 'Get details of a specific database by ID',
  parameters: {
    type: 'object',
    properties: {
      database_id: {
        type: 'string',
        description: 'The ID of the database to retrieve',
      },
    },
    required: ['database_id'],
  },
} as const

/**
 * Get database details by ID
 */
export async function getDatabase(notion: Client, params: GetDatabaseParams): Promise<DatabaseResponse> {
  try {
    const response = await notion.databases.retrieve({ database_id: params.database_id })
    return response as DatabaseResponse
  } catch (error) {
    throw new Error(`Failed to get database: ${error instanceof Error ? error.message : String(error)}`)
  }
}
