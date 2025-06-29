import type { ListRealtimeMetricsParams, ListRealtimeMetricsResponse } from '../types.js'

export const listRealtimeMetricsTool = {
  name: 'listRealtimeMetrics',
  description: 'List Real-Time Metrics',
  parameters: {
    type: 'object',
    properties: {
    },
    required: [
    ],
  },
} as const

/**
 * List Real-Time Metrics
 */
export async function listRealtimeMetrics(
  apiKey: string,
  baseUrl: string,
  params: ListRealtimeMetricsParams
): Promise<ListRealtimeMetricsResponse> {
  try {
    const url = new URL('/data/v1/realtime/metrics', baseUrl)
    

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