import type { GetRealtimeTimeseriesParams, GetRealtimeTimeseriesResponse } from '../types.js'

export const getRealtimeTimeseriesTool = {
  name: 'getRealtimeTimeseries',
  description: 'Get Real-Time Timeseries',
  parameters: {
    type: 'object',
    properties: {
      REALTIME_METRIC_ID: {
        type: 'string',
        description: 'ID of the Realtime Metric',
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
      'REALTIME_METRIC_ID',
      
      
    ],
  },
} as const

/**
 * Get Real-Time Timeseries
 */
export async function getRealtimeTimeseries(
  apiKey: string,
  baseUrl: string,
  params: GetRealtimeTimeseriesParams
): Promise<GetRealtimeTimeseriesResponse> {
  try {
    const url = new URL('/data/v1/realtime/metrics/{REALTIME_METRIC_ID}/timeseries', baseUrl)
    
    // Replace path parameter REALTIME_METRIC_ID
    url.pathname = url.pathname.replace('REALTIME_METRIC_ID', encodeURIComponent(String(params.REALTIME_METRIC_ID)))
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