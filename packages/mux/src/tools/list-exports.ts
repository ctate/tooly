import type { ListExportsParams, ListExportsResponse } from '../types.js'

export const listExportsTool = {
  name: 'listExports',
  description: 'List property video view export links',
  parameters: {
    type: 'object',
    properties: {
    },
    required: [
    ],
  },
} as const

/**
 * List property video view export links
 */
export async function listExports(
  apiKey: string,
  baseUrl: string,
  params: ListExportsParams
): Promise<ListExportsResponse> {
  try {
    const url = new URL('/data/v1/exports', baseUrl)
    

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