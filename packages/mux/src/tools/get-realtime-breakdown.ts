import type { GetRealtimeBreakdownParams, GetRealtimeBreakdownResponse } from '../types.js'

export const getRealtimeBreakdownTool = {
  name: 'getRealtimeBreakdown',
  description: 'Get Real-Time Breakdown',
  parameters: {
    type: 'object',
    properties: {
      REALTIME_METRIC_ID: {
        type: 'string',
        description: 'ID of the Realtime Metric',
        // Path parameter
        
        
      },
      dimension: {
        type: 'string',
        description: 'Dimension the specified value belongs to',
        
        // Query parameter
        
      },
      timestamp: {
        type: 'integer',
        description: 'Timestamp to limit results by. This value must be provided as a unix timestamp. Defaults to the current unix timestamp.',
        
        // Query parameter
        
      },
      filters__: {
        type: 'array',
        description: 'Limit the results to rows that match conditions from provided key:value pairs. Must be provided as an array query string parameter. To exclude rows that match a certain condition, prepend a &#x60;!&#x60; character to the dimension. Possible filter names are the same as returned by the List Monitoring Dimensions endpoint. Example: * &#x60;filters[]&#x3D;operating_system:windows&amp;filters[]&#x3D;!country:US&#x60;',
        
        // Query parameter
        
      },
      order_by: {
        type: 'string',
        description: 'Value to order the results by',
        
        // Query parameter
        
      },
      order_direction: {
        type: 'string',
        description: 'Sort order.',
        
        // Query parameter
        
      },
    },
    required: [
      'REALTIME_METRIC_ID',
      
      
      
      
      
    ],
  },
} as const

/**
 * Get Real-Time Breakdown
 */
export async function getRealtimeBreakdown(
  apiKey: string,
  baseUrl: string,
  params: GetRealtimeBreakdownParams
): Promise<GetRealtimeBreakdownResponse> {
  try {
    const url = new URL('/data/v1/realtime/metrics/{REALTIME_METRIC_ID}/breakdown', baseUrl)
    
    // Replace path parameter REALTIME_METRIC_ID
    url.pathname = url.pathname.replace('REALTIME_METRIC_ID', encodeURIComponent(String(params.REALTIME_METRIC_ID)))
    // Add query parameter dimension
    if (params.dimension !== undefined) {
      url.searchParams.set('dimension', String(params.dimension))
    }
    // Add query parameter timestamp
    if (params.timestamp !== undefined) {
      url.searchParams.set('timestamp', String(params.timestamp))
    }
    // Add query parameter filters[]
    if (params.filters__ !== undefined) {
      url.searchParams.set('filters[]', String(params.filters__))
    }
    // Add query parameter order_by
    if (params.order_by !== undefined) {
      url.searchParams.set('order_by', String(params.order_by))
    }
    // Add query parameter order_direction
    if (params.order_direction !== undefined) {
      url.searchParams.set('order_direction', String(params.order_direction))
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