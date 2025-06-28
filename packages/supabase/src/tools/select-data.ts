import { SupabaseClient } from '@supabase/supabase-js'
import type { SelectDataParams, DatabaseResponse } from '../types.js'

export const selectDataTool = {
  name: 'selectData',
  description: 'Select/query data from a Supabase table',
  parameters: {
    type: 'object',
    properties: {
      table: {
        type: 'string',
        description: 'The name of the table to query',
      },
      columns: {
        oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
        description: 'Columns to select. Use "*" for all columns or specify column names',
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
        description: 'Array of filter conditions',
      },
      orderBy: {
        type: 'object',
        properties: {
          column: { type: 'string' },
          ascending: { type: 'boolean', default: true },
        },
        required: ['column'],
        description: 'Order the results by a column',
      },
      limit: {
        type: 'number',
        minimum: 1,
        maximum: 1000,
        description: 'Maximum number of rows to return',
      },
      offset: {
        type: 'number',
        minimum: 0,
        description: 'Number of rows to skip (for pagination)',
      },
    },
    required: ['table'],
  },
} as const

/**
 * Select data from a Supabase table
 */
export async function selectData(client: SupabaseClient, params: SelectDataParams): Promise<DatabaseResponse> {
  try {
    // Handle column selection
    const columns = params.columns ? (Array.isArray(params.columns) ? params.columns.join(',') : params.columns) : '*'

    let query = client.from(params.table).select(columns)

    // Apply filters
    if (params.filters) {
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
    }

    // Apply ordering
    if (params.orderBy) {
      query = query.order(params.orderBy.column, { ascending: params.orderBy.ascending ?? true })
    }

    // Apply pagination
    if (params.limit) {
      query = query.limit(params.limit)
    }

    if (params.offset) {
      query = query.range(params.offset, params.offset + (params.limit || 1000) - 1)
    }

    const result = await query

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
