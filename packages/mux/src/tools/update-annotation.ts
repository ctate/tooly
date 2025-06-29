import type { UpdateAnnotationParams, UpdateAnnotationResponse } from '../types.js'

export const updateAnnotationTool = {
  name: 'updateAnnotation',
  description: 'Update Annotation',
  parameters: {
    type: 'object',
    properties: {
      ANNOTATION_ID: {
        type: 'string',
        description: 'The annotation ID',
        // Path parameter
        
        
      },
      body: {
        type: 'object',
        description: 'Request body',
      },
    },
    required: [
      'ANNOTATION_ID',
      'body',
    ],
  },
} as const

/**
 * Update Annotation
 */
export async function updateAnnotation(
  apiKey: string,
  baseUrl: string,
  params: UpdateAnnotationParams
): Promise<UpdateAnnotationResponse> {
  try {
    const url = new URL('/data/v1/annotations/{ANNOTATION_ID}', baseUrl)
    
    // Replace path parameter ANNOTATION_ID
    url.pathname = url.pathname.replace('ANNOTATION_ID', encodeURIComponent(String(params.ANNOTATION_ID)))

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    }


    const fetchOptions: RequestInit = {
      method: 'PATCH',
      headers,
    }

    // Add request body
    if (params.body !== undefined) {
      fetchOptions.body = JSON.stringify(params.body)
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