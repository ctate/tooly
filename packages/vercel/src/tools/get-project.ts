import { Vercel } from '@vercel/sdk'
import type { GetProjectParams, ProjectResponse } from '../types.js'

export const getProjectTool = {
  name: 'getProject',
  description: 'Get details of a specific Vercel project by ID or name',
  parameters: {
    type: 'object',
    properties: {
      idOrName: {
        type: 'string',
        description: 'The project ID or name',
      },
      teamId: {
        type: 'string',
        description: 'The team ID that owns the project',
      },
      slug: {
        type: 'string',
        description: 'The team slug that owns the project',
      },
    },
    required: ['idOrName'],
  },
} as const

/**
 * Get details of a specific Vercel project
 */
export async function getProject(client: Vercel, { idOrName }: GetProjectParams): Promise<ProjectResponse> {
  try {
    // Use getProjects to find the specific project
    const result = await client.projects.getProjects({
      search: idOrName,
      limit: '1',
    })

    if (!result.projects || result.projects.length === 0) {
      throw new Error(`Project with id or name "${idOrName}" not found`)
    }

    const project = result.projects[0]
    if (!project) {
      throw new Error(`Project with id or name "${idOrName}" not found`)
    }

    return {
      id: project.id,
      name: project.name,
      accountId: project.accountId,
      createdAt: project.createdAt || 0,
      updatedAt: project.updatedAt || 0,
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
    }
  } catch (error) {
    throw new Error(`Failed to get project: ${error}`)
  }
}
