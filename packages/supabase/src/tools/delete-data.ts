import { SupabaseClient } from '@supabase/supabase-js'
import type { DeleteDataParams, DatabaseResponse } from '../types.js'

export const deleteDataTool = {
  name: 'deleteData',
  description: 'Delete data from a Supabase table',
  parameters: {
    type: 'object',
    properties: {
      table: {
        type: 'string',
        description: 'The name of the table to delete data from',
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
        description: 'Array of filter conditions to identify rows to delete',
      },
    },
    required: ['table', 'filters'],
  },
} as const

/**
 * Delete data from a Supabase table
 */
export async function deleteData(client: SupabaseClient, params: DeleteDataParams): Promise<DatabaseResponse> {
  try {
    let query = client.from(params.table).delete()

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
