import type { ListFilterValuesParams, ListFilterValuesResponse } from '../types.js'

export const listFilterValuesTool = {
  name: 'listFilterValues',
  description: 'Lists values for a specific filter',
  parameters: {
    type: 'object',
    properties: {
      FILTER_ID: {
        type: 'string',
        description: 'ID of the Filter',
        // Path parameter
        
        
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
      filters__: {
        type: 'array',
        description: 'Limit the results to rows that match conditions from provided key:value pairs. Must be provided as an array query string parameter. To exclude rows that match a certain condition, prepend a &#x60;!&#x60; character to the dimension. Possible filter names are the same as returned by the List Filters endpoint. Example: * &#x60;filters[]&#x3D;operating_system:windows&amp;filters[]&#x3D;!country:US&#x60;',
        
        // Query parameter
        
      },
      timeframe__: {
        type: 'array',
        description: 'Timeframe window to limit results by. Must be provided as an array query string parameter (e.g. timeframe[]&#x3D;). Accepted formats are... * array of epoch timestamps e.g. &#x60;timeframe[]&#x3D;1498867200&amp;timeframe[]&#x3D;1498953600&#x60; * duration string e.g. &#x60;timeframe[]&#x3D;24:hours or timeframe[]&#x3D;7:days&#x60;',
        
        // Query parameter
        
      },
    },
    required: [
      'FILTER_ID',
      
      
      
      
    ],
  },
} as const

/**
 * Lists values for a specific filter
 */
export async function listFilterValues(
  apiKey: string,
  baseUrl: string,
  params: ListFilterValuesParams
): Promise<ListFilterValuesResponse> {
  try {
    const url = new URL('/data/v1/filters/{FILTER_ID}', baseUrl)
    
    // Replace path parameter FILTER_ID
    url.pathname = url.pathname.replace('FILTER_ID', encodeURIComponent(String(params.FILTER_ID)))
    // Add query parameter limit
    if (params.limit !== undefined) {
      url.searchParams.set('limit', String(params.limit))
    }
    // Add query parameter page
    if (params.page !== undefined) {
      url.searchParams.set('page', String(params.page))
    }
    // Add query parameter filters[]
    if (params.filters__ !== undefined) {
      url.searchParams.set('filters[]', String(params.filters__))
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