import type { ListExportsViewsParams, ListExportsViewsResponse } from '../types.js'

export const listExportsViewsTool = {
  name: 'listExportsViews',
  description: 'List available property view exports',
  parameters: {
    type: 'object',
    properties: {
    },
    required: [
    ],
  },
} as const

/**
 * List available property view exports
 */
export async function listExportsViews(
  apiKey: string,
  baseUrl: string,
  params: ListExportsViewsParams
): Promise<ListExportsViewsResponse> {
  try {
    const url = new URL('/data/v1/exports/views', baseUrl)
    

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    }


    const fetchOptions: RequestInit = {
      method: 'GET',
      headers,
    }


    const response = await fetch(url.toString(), fetchOptions)
    
    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      }
    }

    const data = await response.json()
    
    return {
      success: true,
      data,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
} 