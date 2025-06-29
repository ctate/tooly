import type { DeleteAnnotationParams, DeleteAnnotationResponse } from '../types.js'

export const deleteAnnotationTool = {
  name: 'deleteAnnotation',
  description: 'Delete Annotation',
  parameters: {
    type: 'object',
    properties: {
      ANNOTATION_ID: {
        type: 'string',
        description: 'The annotation ID',
        // Path parameter
        
        
      },
    },
    required: [
      'ANNOTATION_ID',
    ],
  },
} as const

/**
 * Delete Annotation
 */
export async function deleteAnnotation(
  apiKey: string,
  baseUrl: string,
  params: DeleteAnnotationParams
): Promise<DeleteAnnotationResponse> {
  try {
    const url = new URL('/data/v1/annotations/{ANNOTATION_ID}', baseUrl)
    
    // Replace path parameter ANNOTATION_ID
    url.pathname = url.pathname.replace('ANNOTATION_ID', encodeURIComponent(String(params.ANNOTATION_ID)))

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    }


    const fetchOptions: RequestInit = {
      method: 'DELETE',
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