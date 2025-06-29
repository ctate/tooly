import { Vercel } from '@vercel/sdk'
import type { CreateProjectParams, ProjectResponse } from '../types.js'

export const createProjectTool = {
  name: 'createProject',
  description: 'Create a new Vercel project',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the project',
        minLength: 1,
        maxLength: 255,
      },
      framework: {
        type: 'string',
        description: 'The framework preset to use (e.g., nextjs, vite, create-react-app)',
      },
      gitRepository: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['github', 'gitlab', 'bitbucket'],
            description: 'The Git provider',
          },
          repo: {
            type: 'string',
            description: 'The repository name (e.g., "username/repo-name")',
          },
        },
        description: 'Git repository information for the project',
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
        description: 'The team ID to create the project under',
      },
      slug: {
        type: 'string',
        description: 'The team slug to create the project under',
      },
    },
    required: ['name'],
  },
} as const

/**
 * Create a new Vercel project
 */
export async function createProject(client: Vercel, params: CreateProjectParams): Promise<ProjectResponse> {
  try {
    const { name, framework, publicSource, rootDirectory, teamId, slug } = params

    const result = await client.projects.createProject({
      teamId,
      slug,
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
    throw new Error(`Failed to create project: ${error instanceof Error ? error.message : String(error)}`)
  }
}
