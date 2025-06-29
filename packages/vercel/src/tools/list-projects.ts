import { Vercel } from '@vercel/sdk'
import type { ListProjectsParams, ProjectResponse } from '../types.js'

export const listProjectsTool = {
  name: 'listProjects',
  description: 'List all Vercel projects',
  parameters: {
    type: 'object',
    properties: {
      teamId: {
        type: 'string',
        description: 'The team ID to list projects for',
      },
      slug: {
        type: 'string',
        description: 'The team slug to list projects for',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of projects to return (1-100)',
        minimum: 1,
        maximum: 100,
      },
      since: {
        type: 'number',
        description: 'Get projects created after this timestamp',
      },
      until: {
        type: 'number',
        description: 'Get projects created before this timestamp',
      },
    },
    required: [],
  },
} as const

/**
 * List all Vercel projects
 */
export async function listProjects(client: Vercel, params: ListProjectsParams = {}): Promise<ProjectResponse[]> {
  try {
    const { limit, teamId, slug } = params

    const result = await client.projects.getProjects({
      limit: limit ? String(limit) : undefined,
      teamId,
      slug,
    })

    return result.projects.map((project) => ({
      id: project.id,
      name: project.name,
      accountId: project.accountId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      framework: project.framework || undefined,
      publicSource: project.publicSource || undefined,
      rootDirectory: project.rootDirectory || undefined,
      targets: project.targets,
      latestDeployments: project.latestDeployments?.map((deployment: any) => ({
        name: deployment.name,
        uid: deployment.id,
        url: deployment.url,
        created: deployment.createdAt,
        state: deployment.readyState || 'UNKNOWN',
        target: deployment.target || undefined,
      })),
    }))
  } catch (error) {
    throw new Error(`Failed to list projects: ${error instanceof Error ? error.message : String(error)}`)
  }
}
