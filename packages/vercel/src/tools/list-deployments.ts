import { Vercel } from '@vercel/sdk'
import type { ListDeploymentsParams, DeploymentResponse } from '../types.js'

export const listDeploymentsTool = {
  name: 'listDeployments',
  description: 'List deployments for a project or team',
  parameters: {
    type: 'object',
    properties: {
      projectId: {
        type: 'string',
        description: 'The project ID to list deployments for',
      },
      teamId: {
        type: 'string',
        description: 'The team ID to list deployments for',
      },
      slug: {
        type: 'string',
        description: 'The team slug to list deployments for',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of deployments to return (1-100)',
        minimum: 1,
        maximum: 100,
      },
      since: {
        type: 'number',
        description: 'Get deployments created after this timestamp',
      },
      until: {
        type: 'number',
        description: 'Get deployments created before this timestamp',
      },
      state: {
        type: 'string',
        description: 'Filter by deployment state (e.g., BUILDING, READY, ERROR)',
      },
      target: {
        type: 'string',
        enum: ['staging', 'production'],
        description: 'Filter by deployment target',
      },
    },
    required: [],
  },
} as const

/**
 * List Vercel deployments
 */
export async function listDeployments(
  client: Vercel,
  params: ListDeploymentsParams = {},
): Promise<DeploymentResponse[]> {
  try {
    const { projectId, teamId, slug, limit, since, until, state, target } = params

    const result = await client.deployments.getDeployments({
      projectId,
      teamId,
      slug,
      limit,
      since,
      until,
      state,
      target,
    })

    return result.deployments.map((deployment) => ({
      name: deployment.name,
      type: deployment.type,
      uid: deployment.uid,
      url: deployment.url,
      created: deployment.created,
      createdAt: deployment.createdAt,
      state: deployment.state || 'UNKNOWN',
      meta: deployment.meta,
      target: deployment.target || undefined,
      projectId: undefined,
      inspectorUrl: deployment.inspectorUrl || undefined,
      creator: deployment.creator
        ? {
            uid: deployment.creator.uid,
            username: deployment.creator.username || undefined,
            email: deployment.creator.email || undefined,
          }
        : undefined,
    }))
  } catch (error) {
    throw new Error(`Failed to list deployments: ${error instanceof Error ? error.message : String(error)}`)
  }
}
