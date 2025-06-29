import type { GetIncidentParams, GetIncidentResponse } from '../types.js'

export const getIncidentTool = {
  name: 'getIncident',
  description: 'Get an Incident',
  parameters: {
    type: 'object',
    properties: {
      INCIDENT_ID: {
        type: 'string',
        description: 'ID of the Incident',
        // Path parameter
        
        
      },
    },
    required: [
      'INCIDENT_ID',
    ],
  },
} as const

/**
 * Get an Incident
 */
export async function getIncident(
  apiKey: string,
  baseUrl: string,
  params: GetIncidentParams
): Promise<GetIncidentResponse> {
  try {
    const url = new URL('/data/v1/incidents/{INCIDENT_ID}', baseUrl)
    
    // Replace path parameter INCIDENT_ID
    url.pathname = url.pathname.replace('INCIDENT_ID', encodeURIComponent(String(params.INCIDENT_ID)))

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