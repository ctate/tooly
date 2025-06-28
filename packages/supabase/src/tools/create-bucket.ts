import { SupabaseClient } from '@supabase/supabase-js'
import type { CreateBucketParams, StorageResponse } from '../types.js'

export const createBucketTool = {
  name: 'createBucket',
  description: 'Create a new storage bucket in Supabase',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the bucket to create',
      },
      options: {
        type: 'object',
        properties: {
          public: {
            type: 'boolean',
            default: false,
            description: 'Whether the bucket should be public',
          },
          fileSizeLimit: {
            type: 'number',
            description: 'Maximum file size limit in bytes',
          },
          allowedMimeTypes: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of allowed MIME types',
          },
        },
        description: 'Additional bucket options',
      },
    },
    required: ['name'],
  },
} as const

/**
 * Create a new storage bucket
 */
export async function createBucket(client: SupabaseClient, params: CreateBucketParams): Promise<StorageResponse> {
  try {
    const result = await client.storage.createBucket(params.name, params.options)

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
