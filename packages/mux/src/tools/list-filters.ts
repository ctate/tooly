import type { ListFiltersParams, ListFiltersResponse } from '../types.js'

export const listFiltersTool = {
  name: 'listFilters',
  description: 'List Filters',
  parameters: {
    type: 'object',
    properties: {
    },
    required: [
    ],
  },
} as const

/**
 * List Filters
 */
export async function listFilters(
  apiKey: string,
  baseUrl: string,
  params: ListFiltersParams
): Promise<ListFiltersResponse> {
  try {
    const url = new URL('/data/v1/filters', baseUrl)
    

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