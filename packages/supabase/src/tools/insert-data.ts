import { SupabaseClient } from '@supabase/supabase-js'
import type { InsertDataParams, DatabaseResponse } from '../types.js'

export const insertDataTool = {
  name: 'insertData',
  description: 'Insert new data into a Supabase table',
  parameters: {
    type: 'object',
    properties: {
      table: {
        type: 'string',
        description: 'The name of the table to insert data into',
      },
      data: {
        oneOf: [
          {
            type: 'object',
            description: 'Single row of data to insert',
          },
          {
            type: 'array',
            items: { type: 'object' },
            description: 'Multiple rows of data to insert',
          },
        ],
        description: 'The data to insert - can be a single object or array of objects',
      },
    },
    required: ['table', 'data'],
  },
} as const

/**
 * Insert data into a Supabase table
 */
export async function insertData(client: SupabaseClient, params: InsertDataParams): Promise<DatabaseResponse> {
  try {
    const result = await client.from(params.table).insert(params.data).select()

    return {
      data: result.data,
      error: result.error,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
