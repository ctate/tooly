import type { CreateAnnotationParams, CreateAnnotationResponse } from '../types.js'

export const createAnnotationTool = {
  name: 'createAnnotation',
  description: 'Create Annotation',
  parameters: {
    type: 'object',
    properties: {
      body: {
        type: 'object',
        description: 'Request body',
      },
    },
    required: [
      'body',
    ],
  },
} as const

/**
 * Create Annotation
 */
export async function createAnnotation(
  apiKey: string,
  baseUrl: string,
  params: CreateAnnotationParams
): Promise<CreateAnnotationResponse> {
  try {
    const url = new URL('/data/v1/annotations', baseUrl)
    

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    }


    const fetchOptions: RequestInit = {
      method: 'POST',
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