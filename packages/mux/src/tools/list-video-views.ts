import type { ListVideoViewsParams, ListVideoViewsResponse } from '../types.js'

export const listVideoViewsTool = {
  name: 'listVideoViews',
  description: 'List Video Views',
  parameters: {
    type: 'object',
    properties: {
      limit: {
        type: 'integer',
        description: 'Number of items to include in the response',
        
        // Query parameter
        
      },
      page: {
        type: 'integer',
        description: 'Offset by this many pages, of the size of &#x60;limit&#x60;',
        
        // Query parameter
        
      },
      viewer_id: {
        type: 'string',
        description: 'Viewer ID to filter results by. This value may be provided by the integration, or may be created by Mux.',
        
        // Query parameter
        
      },
      error_id: {
        type: 'integer',
        description: 'Filter video views by the provided error ID (as returned in the error_type_id field in the list video views endpoint). If you provide any as the error ID, this will filter the results to those with any error.',
        
        // Query parameter
        
      },
      order_direction: {
        type: 'string',
        description: 'Sort order.',
        
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
      timeframe__: {
        type: 'array',
        description: 'Timeframe window to limit results by. Must be provided as an array query string parameter (e.g. timeframe[]&#x3D;). Accepted formats are... * array of epoch timestamps e.g. &#x60;timeframe[]&#x3D;1498867200&amp;timeframe[]&#x3D;1498953600&#x60; * duration string e.g. &#x60;timeframe[]&#x3D;24:hours or timeframe[]&#x3D;7:days&#x60;',
        
        // Query parameter
        
      },
    },
    required: [
      
      
      
      
      
      
      
      
    ],
  },
} as const

/**
 * List Video Views
 */
export async function listVideoViews(
  apiKey: string,
  baseUrl: string,
  params: ListVideoViewsParams
): Promise<ListVideoViewsResponse> {
  try {
    const url = new URL('/data/v1/video-views', baseUrl)
    
    // Add query parameter limit
    if (params.limit !== undefined) {
      url.searchParams.set('limit', String(params.limit))
    }
    // Add query parameter page
    if (params.page !== undefined) {
      url.searchParams.set('page', String(params.page))
    }
    // Add query parameter viewer_id
    if (params.viewer_id !== undefined) {
      url.searchParams.set('viewer_id', String(params.viewer_id))
    }
    // Add query parameter error_id
    if (params.error_id !== undefined) {
      url.searchParams.set('error_id', String(params.error_id))
    }
    // Add query parameter order_direction
    if (params.order_direction !== undefined) {
      url.searchParams.set('order_direction', String(params.order_direction))
    }
    // Add query parameter filters[]
    if (params.filters__ !== undefined) {
      url.searchParams.set('filters[]', String(params.filters__))
    }
    // Add query parameter metric_filters[]
    if (params.metric_filters__ !== undefined) {
      url.searchParams.set('metric_filters[]', String(params.metric_filters__))
    }
    // Add query parameter timeframe[]
    if (params.timeframe__ !== undefined) {
      url.searchParams.set('timeframe[]', String(params.timeframe__))
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