import type { GetMonitoringBreakdownTimeseriesParams, GetMonitoringBreakdownTimeseriesResponse } from '../types.js'

export const getMonitoringBreakdownTimeseriesTool = {
  name: 'getMonitoringBreakdownTimeseries',
  description: 'Get Monitoring Breakdown Timeseries',
  parameters: {
    type: 'object',
    properties: {
      MONITORING_METRIC_ID: {
        type: 'string',
        description: 'ID of the Monitoring Metric',
        // Path parameter
        
        
      },
      dimension: {
        type: 'string',
        description: 'Dimension the specified value belongs to',
        
        // Query parameter
        
      },
      timeframe__: {
        type: 'array',
        description: 'Timeframe window to limit results by. Must be provided as an array query string parameter (e.g. timeframe[]&#x3D;). The default for this is the last 60 seconds of available data. Timeframes larger than 10 minutes are not allowed, and must be within the last 24 hours.',
        
        // Query parameter
        
      },
      filters__: {
        type: 'array',
        description: 'Limit the results to rows that match conditions from provided key:value pairs. Must be provided as an array query string parameter. To exclude rows that match a certain condition, prepend a &#x60;!&#x60; character to the dimension. Possible filter names are the same as returned by the List Monitoring Dimensions endpoint. Example: * &#x60;filters[]&#x3D;operating_system:windows&amp;filters[]&#x3D;!country:US&#x60;',
        
        // Query parameter
        
      },
      limit: {
        type: 'integer',
        description: 'Number of items to include in each timestamp\&#x27;s &#x60;value&#x60; list. The default is 10, and the maximum is 100.',
        
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
      'MONITORING_METRIC_ID',
      
      
      
      
      
      
    ],
  },
} as const

/**
 * Get Monitoring Breakdown Timeseries
 */
export async function getMonitoringBreakdownTimeseries(
  apiKey: string,
  baseUrl: string,
  params: GetMonitoringBreakdownTimeseriesParams
): Promise<GetMonitoringBreakdownTimeseriesResponse> {
  try {
    const url = new URL('/data/v1/monitoring/metrics/{MONITORING_METRIC_ID}/breakdown-timeseries', baseUrl)
    
    // Replace path parameter MONITORING_METRIC_ID
    url.pathname = url.pathname.replace('MONITORING_METRIC_ID', encodeURIComponent(String(params.MONITORING_METRIC_ID)))
    // Add query parameter dimension
    if (params.dimension !== undefined) {
      url.searchParams.set('dimension', String(params.dimension))
    }
    // Add query parameter timeframe[]
    if (params.timeframe__ !== undefined) {
      url.searchParams.set('timeframe[]', String(params.timeframe__))
    }
    // Add query parameter filters[]
    if (params.filters__ !== undefined) {
      url.searchParams.set('filters[]', String(params.filters__))
    }
    // Add query parameter limit
    if (params.limit !== undefined) {
      url.searchParams.set('limit', String(params.limit))
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