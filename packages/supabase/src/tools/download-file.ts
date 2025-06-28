import { SupabaseClient } from '@supabase/supabase-js'
import type { DownloadFileParams, StorageResponse } from '../types.js'

export const downloadFileTool = {
  name: 'downloadFile',
  description: 'Download a file from Supabase Storage',
  parameters: {
    type: 'object',
    properties: {
      bucket: {
        type: 'string',
        description: 'The name of the storage bucket',
      },
      path: {
        type: 'string',
        description: 'The path of the file to download',
      },
    },
    required: ['bucket', 'path'],
  },
} as const

/**
 * Download a file from Supabase Storage
 */
export async function downloadFile(client: SupabaseClient, params: DownloadFileParams): Promise<StorageResponse> {
  try {
    const result = await client.storage.from(params.bucket).download(params.path)

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
