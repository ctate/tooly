import type { GetVideoViewParams, GetVideoViewResponse } from '../types.js'

export const getVideoViewTool = {
  name: 'getVideoView',
  description: 'Get a Video View',
  parameters: {
    type: 'object',
    properties: {
      VIDEO_VIEW_ID: {
        type: 'string',
        description: 'ID of the Video View',
        // Path parameter
        
        
      },
    },
    required: [
      'VIDEO_VIEW_ID',
    ],
  },
} as const

/**
 * Get a Video View
 */
export async function getVideoView(
  apiKey: string,
  baseUrl: string,
  params: GetVideoViewParams
): Promise<GetVideoViewResponse> {
  try {
    const url = new URL('/data/v1/video-views/{VIDEO_VIEW_ID}', baseUrl)
    
    // Replace path parameter VIDEO_VIEW_ID
    url.pathname = url.pathname.replace('VIDEO_VIEW_ID', encodeURIComponent(String(params.VIDEO_VIEW_ID)))

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