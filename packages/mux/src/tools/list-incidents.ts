import type { ListIncidentsParams, ListIncidentsResponse } from '../types.js'

export const listIncidentsTool = {
  name: 'listIncidents',
  description: 'List Incidents',
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
      status: {
        type: 'string',
        description: 'Status to filter incidents by',
        
        // Query parameter
        
      },
      severity: {
        type: 'string',
        description: 'Severity to filter incidents by',
        
        // Query parameter
        
      },
    },
    required: [
      
      
      
      
      
      
    ],
  },
} as const

/**
 * List Incidents
 */
export async function listIncidents(
  apiKey: string,
  baseUrl: string,
  params: ListIncidentsParams
): Promise<ListIncidentsResponse> {
  try {
    const url = new URL('/data/v1/incidents', baseUrl)
    
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
    // Add query parameter status
    if (params.status !== undefined) {
      url.searchParams.set('status', String(params.status))
    }
    // Add query parameter severity
    if (params.severity !== undefined) {
      url.searchParams.set('severity', String(params.severity))
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