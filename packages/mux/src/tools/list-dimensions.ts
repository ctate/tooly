import type { ListDimensionsParams, ListDimensionsResponse } from '../types.js'

export const listDimensionsTool = {
  name: 'listDimensions',
  description: 'List Dimensions',
  parameters: {
    type: 'object',
    properties: {
    },
    required: [
    ],
  },
} as const

/**
 * List Dimensions
 */
export async function listDimensions(
  apiKey: string,
  baseUrl: string,
  params: ListDimensionsParams
): Promise<ListDimensionsResponse> {
  try {
    const url = new URL('/data/v1/dimensions', baseUrl)
    

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