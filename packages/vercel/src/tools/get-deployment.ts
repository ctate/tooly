import { Vercel } from '@vercel/sdk'
import type { GetDeploymentParams, DeploymentResponse } from '../types.js'

export const getDeploymentTool = {
  name: 'getDeployment',
  description: 'Get details of a specific deployment by ID or URL',
  parameters: {
    type: 'object',
    properties: {
      idOrUrl: {
        type: 'string',
        description: 'The deployment ID or URL',
      },
      teamId: {
        type: 'string',
        description: 'The team ID that owns the deployment',
      },
      slug: {
        type: 'string',
        description: 'The team slug that owns the deployment',
      },
    },
    required: ['idOrUrl'],
  },
} as const

/**
 * Get details of a specific Vercel deployment
 */
export async function getDeployment(client: Vercel, params: GetDeploymentParams): Promise<DeploymentResponse> {
  try {
    const { idOrUrl, teamId, slug } = params

    const result = await client.deployments.getDeployment({
      idOrUrl,
      teamId,
      slug,
    })

    return {
      name: result.name,
      type: result.type,
      uid: result.id,
      url: result.url,
      created: result.createdAt,
      createdAt: result.createdAt,
      state: result.readyState || 'UNKNOWN',
      meta: result.meta,
      target: result.target || undefined,
      projectId: result.project?.id,
      inspectorUrl: undefined,
      creator: result.creator
        ? {
            uid: result.creator.uid,
            username: result.creator.username || undefined,
            email: undefined,
          }
        : undefined,
    }
  } catch (error) {
    throw new Error(`Failed to get deployment: ${error instanceof Error ? error.message : String(error)}`)
  }
}
