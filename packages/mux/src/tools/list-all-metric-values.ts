import type { ListAllMetricValuesParams, ListAllMetricValuesResponse } from '../types.js'

export const listAllMetricValuesTool = {
  name: 'listAllMetricValues',
  description: 'List all metric values',
  parameters: {
    type: 'object',
    properties: {
      timeframe__: {
        type: 'array',
        description: 'Timeframe window to limit results by. Must be provided as an array query string parameter (e.g. timeframe[]&#x3D;). Accepted formats are... * array of epoch timestamps e.g. &#x60;timeframe[]&#x3D;1498867200&amp;timeframe[]&#x3D;1498953600&#x60; * duration string e.g. &#x60;timeframe[]&#x3D;24:hours or timeframe[]&#x3D;7:days&#x60;',
        
        // Query parameter
        
      },
      filters__: {
        type: 'array',
        description: 'Limit the results to rows that match conditions from provided key:value pairs. Must be provided as an array query string parameter. To exclude rows that match a certain condition, prepend a &#x60;!&#x60; character to the dimension. Possible filter names are the same as returned by the List Filters endpoint. Example: * &#x60;filters[]&#x3D;operating_system:windows&amp;filters[]&#x3D;!country:US&#x60;',
        
        // Query parameter
        
      },
      metric_filters__: {
        type: 'array',
        description: 'Limit the results to rows that match inequality conditions from provided metric comparison clauses. Must be provided as an array query string parameter. Possible filterable metrics are the same as the set of metric ids, with the exceptions of &#x60;exits_before_video_start&#x60;, &#x60;unique_viewers&#x60;, &#x60;video_startup_failure_percentage&#x60;, &#x60;view_dropped_percentage&#x60;, and &#x60;views&#x60;. Example: * &#x60;metric_filters[]&#x3D;aggregate_startup_time&gt;&#x3D;1000&#x60;',
        
        // Query parameter
        
      },
      dimension: {
        type: 'string',
        description: 'Dimension the specified value belongs to',
        
        // Query parameter
        
      },
      value: {
        type: 'string',
        description: 'Value to show all available metrics for',
        
        // Query parameter
        
      },
    },
    required: [
      
      
      
      
      
    ],
  },
} as const

/**
 * List all metric values
 */
export async function listAllMetricValues(
  apiKey: string,
  baseUrl: string,
  params: ListAllMetricValuesParams
): Promise<ListAllMetricValuesResponse> {
  try {
    const url = new URL('/data/v1/metrics/comparison', baseUrl)
    
    // Add query parameter timeframe[]
    if (params.timeframe__ !== undefined) {
      url.searchParams.set('timeframe[]', String(params.timeframe__))
    }
    // Add query parameter filters[]
    if (params.filters__ !== undefined) {
      url.searchParams.set('filters[]', String(params.filters__))
    }
    // Add query parameter metric_filters[]
    if (params.metric_filters__ !== undefined) {
      url.searchParams.set('metric_filters[]', String(params.metric_filters__))
    }
    // Add query parameter dimension
    if (params.dimension !== undefined) {
      url.searchParams.set('dimension', String(params.dimension))
    }
    // Add query parameter value
    if (params.value !== undefined) {
      url.searchParams.set('value', String(params.value))
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