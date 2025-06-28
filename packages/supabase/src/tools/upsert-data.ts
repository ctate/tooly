import { SupabaseClient } from '@supabase/supabase-js'
import type { UpsertDataParams, DatabaseResponse } from '../types.js'

export const upsertDataTool = {
  name: 'upsertData',
  description: 'Upsert data in a Supabase table (insert if not exists, update if exists)',
  parameters: {
    type: 'object',
    properties: {
      table: {
        type: 'string',
        description: 'The name of the table to upsert data into',
      },
      data: {
        oneOf: [
          {
            type: 'object',
            description: 'Single row of data to upsert',
          },
          {
            type: 'array',
            items: { type: 'object' },
            description: 'Multiple rows of data to upsert',
          },
        ],
        description: 'The data to upsert - can be a single object or array of objects',
      },
      onConflict: {
        type: 'string',
        description: 'Comma-separated list of columns that constitute the conflict target',
      },
    },
    required: ['table', 'data'],
  },
} as const

/**
 * Upsert data in a Supabase table
 */
export async function upsertData(client: SupabaseClient, params: UpsertDataParams): Promise<DatabaseResponse> {
  try {
    const result = await client.from(params.table).upsert(params.data).select()

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
