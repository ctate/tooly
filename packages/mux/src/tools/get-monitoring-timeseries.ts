import type { GetMonitoringTimeseriesParams, GetMonitoringTimeseriesResponse } from '../types.js'

export const getMonitoringTimeseriesTool = {
  name: 'getMonitoringTimeseries',
  description: 'Get Monitoring Timeseries',
  parameters: {
    type: 'object',
    properties: {
      MONITORING_METRIC_ID: {
        type: 'string',
        description: 'ID of the Monitoring Metric',
        // Path parameter
        
        
      },
      filters__: {
        type: 'array',
        description: 'Limit the results to rows that match conditions from provided key:value pairs. Must be provided as an array query string parameter. To exclude rows that match a certain condition, prepend a &#x60;!&#x60; character to the dimension. Possible filter names are the same as returned by the List Monitoring Dimensions endpoint. Example: * &#x60;filters[]&#x3D;operating_system:windows&amp;filters[]&#x3D;!country:US&#x60;',
        
        // Query parameter
        
      },
      timestamp: {
        type: 'integer',
        description: 'Timestamp to use as the start of the timeseries data. This value must be provided as a unix timestamp. Defaults to 30 minutes ago.',
        
        // Query parameter
        
      },
    },
    required: [
      'MONITORING_METRIC_ID',
      
      
    ],
  },
} as const

/**
 * Get Monitoring Timeseries
 */
export async function getMonitoringTimeseries(
  apiKey: string,
  baseUrl: string,
  params: GetMonitoringTimeseriesParams
): Promise<GetMonitoringTimeseriesResponse> {
  try {
    const url = new URL('/data/v1/monitoring/metrics/{MONITORING_METRIC_ID}/timeseries', baseUrl)
    
    // Replace path parameter MONITORING_METRIC_ID
    url.pathname = url.pathname.replace('MONITORING_METRIC_ID', encodeURIComponent(String(params.MONITORING_METRIC_ID)))
    // Add query parameter filters[]
    if (params.filters__ !== undefined) {
      url.searchParams.set('filters[]', String(params.filters__))
    }
    // Add query parameter timestamp
    if (params.timestamp !== undefined) {
      url.searchParams.set('timestamp', String(params.timestamp))
    }

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