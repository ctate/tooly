import type { ListRelatedIncidentsParams, ListRelatedIncidentsResponse } from '../types.js'

export const listRelatedIncidentsTool = {
  name: 'listRelatedIncidents',
  description: 'List Related Incidents',
  parameters: {
    type: 'object',
    properties: {
      INCIDENT_ID: {
        type: 'string',
        description: 'ID of the Incident',
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
      'INCIDENT_ID',
      
      
      
      
    ],
  },
} as const

/**
 * List Related Incidents
 */
export async function listRelatedIncidents(
  apiKey: string,
  baseUrl: string,
  params: ListRelatedIncidentsParams
): Promise<ListRelatedIncidentsResponse> {
  try {
    const url = new URL('/data/v1/incidents/{INCIDENT_ID}/related', baseUrl)
    
    // Replace path parameter INCIDENT_ID
    url.pathname = url.pathname.replace('INCIDENT_ID', encodeURIComponent(String(params.INCIDENT_ID)))
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