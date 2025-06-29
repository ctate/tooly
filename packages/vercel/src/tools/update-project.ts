import { Vercel } from '@vercel/sdk'
import type { UpdateProjectParams, ProjectResponse } from '../types.js'

export const updateProjectTool = {
  name: 'updateProject',
  description: 'Update an existing Vercel project',
  parameters: {
    type: 'object',
    properties: {
      idOrName: {
        type: 'string',
        description: 'The project ID or name to update',
      },
      name: {
        type: 'string',
        description: 'The new name for the project',
        minLength: 1,
        maxLength: 255,
      },
      framework: {
        type: 'string',
        description: 'The framework preset to use (e.g., nextjs, vite, create-react-app)',
      },
      publicSource: {
        type: 'boolean',
        description: 'Whether the project source code is public',
      },
      rootDirectory: {
        type: 'string',
        description: 'The root directory of the project relative to the repository root',
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
 * Update an existing Vercel project
 */
export async function updateProject(client: Vercel, params: UpdateProjectParams): Promise<ProjectResponse> {
  try {
    const { idOrName, name, framework, publicSource, rootDirectory } = params

    const result = await client.projects.updateProject({
      idOrName,
      requestBody: {
        name,
        framework: framework as any,
        publicSource,
        rootDirectory,
      },
    })

    return {
      id: result.id,
      name: result.name,
      accountId: result.accountId,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      framework: result.framework || undefined,
      publicSource: result.publicSource || undefined,
      rootDirectory: result.rootDirectory || undefined,
      targets: result.targets,
      latestDeployments: result.latestDeployments?.map((deployment: any) => ({
        name: deployment.name,
        uid: deployment.id,
        url: deployment.url,
        created: deployment.createdAt,
        state: deployment.readyState || 'UNKNOWN',
        target: deployment.target || undefined,
      })),
    }
  } catch (error) {
    throw new Error(`Failed to update project: ${error instanceof Error ? error.message : String(error)}`)
  }
}
