import { SupabaseClient } from '@supabase/supabase-js'
import type { UpdateDataParams, DatabaseResponse } from '../types.js'

export const updateDataTool = {
  name: 'updateData',
  description: 'Update existing data in a Supabase table',
  parameters: {
    type: 'object',
    properties: {
      table: {
        type: 'string',
        description: 'The name of the table to update data in',
      },
      data: {
        type: 'object',
        description: 'The data to update (key-value pairs)',
      },
      filters: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            column: { type: 'string' },
            operator: {
              type: 'string',
              enum: ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'is', 'in', 'contains'],
            },
            value: { description: 'The value to filter by' },
          },
          required: ['column', 'operator', 'value'],
        },
        description: 'Array of filter conditions to identify rows to update',
      },
    },
    required: ['table', 'data', 'filters'],
  },
} as const

/**
 * Update data in a Supabase table
 */
export async function updateData(client: SupabaseClient, params: UpdateDataParams): Promise<DatabaseResponse> {
  try {
    let query = client.from(params.table).update(params.data)

    // Apply filters
    for (const filter of params.filters) {
      switch (filter.operator) {
        case 'eq':
          query = query.eq(filter.column, filter.value)
          break
        case 'neq':
          query = query.neq(filter.column, filter.value)
          break
        case 'gt':
          query = query.gt(filter.column, filter.value)
          break
        case 'gte':
          query = query.gte(filter.column, filter.value)
          break
        case 'lt':
          query = query.lt(filter.column, filter.value)
          break
        case 'lte':
          query = query.lte(filter.column, filter.value)
          break
        case 'like':
          query = query.like(filter.column, filter.value)
          break
        case 'ilike':
          query = query.ilike(filter.column, filter.value)
          break
        case 'is':
          query = query.is(filter.column, filter.value)
          break
        case 'in':
          query = query.in(filter.column, Array.isArray(filter.value) ? filter.value : [filter.value])
          break
        case 'contains':
          query = query.contains(filter.column, filter.value)
          break
      }
    }

    const result = await query.select()

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
