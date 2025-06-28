import { SupabaseClient } from '@supabase/supabase-js'
import type { UploadFileParams, StorageResponse } from '../types.js'

export const uploadFileTool = {
  name: 'uploadFile',
  description: 'Upload a file to Supabase Storage',
  parameters: {
    type: 'object',
    properties: {
      bucket: {
        type: 'string',
        description: 'The name of the storage bucket',
      },
      path: {
        type: 'string',
        description: 'The path where the file should be stored',
      },
      file: {
        description: 'The file to upload (File, Blob, or ArrayBuffer)',
      },
      options: {
        type: 'object',
        properties: {
          cacheControl: {
            type: 'string',
            description: 'Cache control header for the file',
          },
          contentType: {
            type: 'string',
            description: 'Content type of the file',
          },
          upsert: {
            type: 'boolean',
            default: false,
            description: 'Whether to overwrite existing file',
          },
        },
        description: 'Additional upload options',
      },
    },
    required: ['bucket', 'path', 'file'],
  },
} as const

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(client: SupabaseClient, params: UploadFileParams): Promise<StorageResponse> {
  try {
    const result = await client.storage.from(params.bucket).upload(params.path, params.file, params.options)

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
