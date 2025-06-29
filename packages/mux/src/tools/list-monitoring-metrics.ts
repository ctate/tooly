import type { ListMonitoringMetricsParams, ListMonitoringMetricsResponse } from '../types.js'

export const listMonitoringMetricsTool = {
  name: 'listMonitoringMetrics',
  description: 'List Monitoring Metrics',
  parameters: {
    type: 'object',
    properties: {
    },
    required: [
    ],
  },
} as const

/**
 * List Monitoring Metrics
 */
export async function listMonitoringMetrics(
  apiKey: string,
  baseUrl: string,
  params: ListMonitoringMetricsParams
): Promise<ListMonitoringMetricsResponse> {
  try {
    const url = new URL('/data/v1/monitoring/metrics', baseUrl)
    

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