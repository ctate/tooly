import type { ListBreakdownValuesParams, ListBreakdownValuesResponse } from '../types.js'

export const listBreakdownValuesTool = {
  name: 'listBreakdownValues',
  description: 'List breakdown values',
  parameters: {
    type: 'object',
    properties: {
      METRIC_ID: {
        type: 'string',
        description: 'ID of the Metric',
        // Path parameter
        
        
      },
      group_by: {
        type: 'string',
        description: 'Breakdown value to group the results by',
        
        // Query parameter
        
      },
      measurement: {
        type: 'string',
        description: 'Measurement for the provided metric. If omitted, the default for the metric will be used. The default measurement for each metric is: \&quot;sum\&quot; : &#x60;ad_attempt_count&#x60;, &#x60;ad_break_count&#x60;, &#x60;ad_break_error_count&#x60;, &#x60;ad_error_count&#x60;, &#x60;ad_impression_count&#x60;, &#x60;playing_time&#x60; \&quot;median\&quot; : &#x60;ad_preroll_startup_time&#x60;, &#x60;aggregate_startup_time&#x60;, &#x60;content_startup_time&#x60;, &#x60;max_downscale_percentage&#x60;, &#x60;max_upscale_percentage&#x60;, &#x60;page_load_time&#x60;, &#x60;player_average_live_latency&#x60;, &#x60;player_startup_time&#x60;, &#x60;rebuffer_count&#x60;, &#x60;rebuffer_duration&#x60;, &#x60;requests_for_first_preroll&#x60;, &#x60;video_startup_preroll_load_time&#x60;, &#x60;video_startup_preroll_request_time&#x60;, &#x60;video_startup_time&#x60;, &#x60;view_average_request_latency&#x60;, &#x60;view_average_request_throughput&#x60;, &#x60;view_max_request_latency&#x60;, &#x60;weighted_average_bitrate&#x60; \&quot;avg\&quot; : &#x60;ad_break_error_percentage&#x60;, &#x60;ad_error_percentage&#x60;, &#x60;ad_exit_before_start_count&#x60;, &#x60;ad_exit_before_start_percentage&#x60;, &#x60;ad_playback_failure_percentage&#x60;, &#x60;ad_startup_error_count&#x60;, &#x60;ad_startup_error_percentage&#x60;, &#x60;content_playback_failure_percentage&#x60;, &#x60;downscale_percentage&#x60;, &#x60;exits_before_video_start&#x60;, &#x60;playback_business_exception_percentage&#x60;, &#x60;playback_failure_percentage&#x60;, &#x60;playback_success_score&#x60;, &#x60;rebuffer_frequency&#x60;, &#x60;rebuffer_percentage&#x60;, &#x60;seek_latency&#x60;, &#x60;smoothness_score&#x60;, &#x60;startup_time_score&#x60;, &#x60;upscale_percentage&#x60;, &#x60;video_quality_score&#x60;, &#x60;video_startup_business_exception_percentage&#x60;, &#x60;video_startup_failure_percentage&#x60;, &#x60;view_dropped_percentage&#x60;, &#x60;viewer_experience_score&#x60; \&quot;count\&quot; : &#x60;started_views&#x60;, &#x60;unique_viewers&#x60;',
        
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
      timeframe__: {
        type: 'array',
        description: 'Timeframe window to limit results by. Must be provided as an array query string parameter (e.g. timeframe[]&#x3D;). Accepted formats are... * array of epoch timestamps e.g. &#x60;timeframe[]&#x3D;1498867200&amp;timeframe[]&#x3D;1498953600&#x60; * duration string e.g. &#x60;timeframe[]&#x3D;24:hours or timeframe[]&#x3D;7:days&#x60;',
        
        // Query parameter
        
      },
    },
    required: [
      'METRIC_ID',
      
      
      
      
      
      
      
      
      
    ],
  },
} as const

/**
 * List breakdown values
 */
export async function listBreakdownValues(
  apiKey: string,
  baseUrl: string,
  params: ListBreakdownValuesParams
): Promise<ListBreakdownValuesResponse> {
  try {
    const url = new URL('/data/v1/metrics/{METRIC_ID}/breakdown', baseUrl)
    
    // Replace path parameter METRIC_ID
    url.pathname = url.pathname.replace('METRIC_ID', encodeURIComponent(String(params.METRIC_ID)))
    // Add query parameter group_by
    if (params.group_by !== undefined) {
      url.searchParams.set('group_by', String(params.group_by))
    }
    // Add query parameter measurement
    if (params.measurement !== undefined) {
      url.searchParams.set('measurement', String(params.measurement))
    }
    // Add query parameter filters[]
    if (params.filters__ !== undefined) {
      url.searchParams.set('filters[]', String(params.filters__))
    }
    // Add query parameter metric_filters[]
    if (params.metric_filters__ !== undefined) {
      url.searchParams.set('metric_filters[]', String(params.metric_filters__))
    }
    // Add query parameter limit
    if (params.limit !== undefined) {
      url.searchParams.set('limit', String(params.limit))
    }
    // Add query parameter page
    if (params.page !== undefined) {
      url.searchParams.set('page', String(params.page))
    }
    // Add query parameter order_by
    if (params.order_by !== undefined) {
      url.searchParams.set('order_by', String(params.order_by))
    }
    // Add query parameter order_direction
    if (params.order_direction !== undefined) {
      url.searchParams.set('order_direction', String(params.order_direction))
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