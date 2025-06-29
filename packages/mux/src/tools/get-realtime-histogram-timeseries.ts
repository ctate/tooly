import type { GetRealtimeHistogramTimeseriesParams, GetRealtimeHistogramTimeseriesResponse } from '../types.js'

export const getRealtimeHistogramTimeseriesTool = {
  name: 'getRealtimeHistogramTimeseries',
  description: 'Get Real-Time Histogram Timeseries',
  parameters: {
    type: 'object',
    properties: {
      REALTIME_HISTOGRAM_METRIC_ID: {
        type: 'string',
        description: 'ID of the Realtime Histogram Metric',
        // Path parameter
        
        
      },
      filters__: {
        type: 'array',
        description: 'Limit the results to rows that match conditions from provided key:value pairs. Must be provided as an array query string parameter. To exclude rows that match a certain condition, prepend a &#x60;!&#x60; character to the dimension. Possible filter names are the same as returned by the List Monitoring Dimensions endpoint. Example: * &#x60;filters[]&#x3D;operating_system:windows&amp;filters[]&#x3D;!country:US&#x60;',
        
        // Query parameter
        
      },
    },
    required: [
      'REALTIME_HISTOGRAM_METRIC_ID',
      
    ],
  },
} as const

/**
 * Get Real-Time Histogram Timeseries
 */
export async function getRealtimeHistogramTimeseries(
  apiKey: string,
  baseUrl: string,
  params: GetRealtimeHistogramTimeseriesParams
): Promise<GetRealtimeHistogramTimeseriesResponse> {
  try {
    const url = new URL('/data/v1/realtime/metrics/{REALTIME_HISTOGRAM_METRIC_ID}/histogram-timeseries', baseUrl)
    
    // Replace path parameter REALTIME_HISTOGRAM_METRIC_ID
    url.pathname = url.pathname.replace('REALTIME_HISTOGRAM_METRIC_ID', encodeURIComponent(String(params.REALTIME_HISTOGRAM_METRIC_ID)))
    // Add query parameter filters[]
    if (params.filters__ !== undefined) {
      url.searchParams.set('filters[]', String(params.filters__))
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