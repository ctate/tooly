import type { ListMonitoringDimensionsParams, ListMonitoringDimensionsResponse } from '../types.js'

export const listMonitoringDimensionsTool = {
  name: 'listMonitoringDimensions',
  description: 'List Monitoring Dimensions',
  parameters: {
    type: 'object',
    properties: {
    },
    required: [
    ],
  },
} as const

/**
 * List Monitoring Dimensions
 */
export async function listMonitoringDimensions(
  apiKey: string,
  baseUrl: string,
  params: ListMonitoringDimensionsParams
): Promise<ListMonitoringDimensionsResponse> {
  try {
    const url = new URL('/data/v1/monitoring/dimensions', baseUrl)
    

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