import { SupabaseClient } from '@supabase/supabase-js'
import type { ListFilesParams, StorageResponse } from '../types.js'

export const listFilesTool = {
  name: 'listFiles',
  description: 'List files in a Supabase Storage bucket',
  parameters: {
    type: 'object',
    properties: {
      bucket: {
        type: 'string',
        description: 'The name of the storage bucket',
      },
      path: {
        type: 'string',
        default: '',
        description: 'The folder path to list files from',
      },
      options: {
        type: 'object',
        properties: {
          limit: {
            type: 'number',
            minimum: 1,
            maximum: 1000,
            description: 'Maximum number of files to return',
          },
          offset: {
            type: 'number',
            minimum: 0,
            description: 'Number of files to skip',
          },
          sortBy: {
            type: 'object',
            properties: {
              column: {
                type: 'string',
                enum: ['name', 'updated_at', 'created_at', 'last_accessed_at'],
              },
              order: {
                type: 'string',
                enum: ['asc', 'desc'],
              },
            },
            required: ['column', 'order'],
            description: 'Sort options for the file list',
          },
        },
        description: 'Additional listing options',
      },
    },
    required: ['bucket'],
  },
} as const

/**
 * List files in a Supabase Storage bucket
 */
export async function listFiles(client: SupabaseClient, params: ListFilesParams): Promise<StorageResponse> {
  try {
    const result = await client.storage.from(params.bucket).list(params.path || '', params.options)

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
