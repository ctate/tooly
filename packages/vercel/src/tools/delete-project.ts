import { Vercel } from '@vercel/sdk'
import type { DeleteProjectParams } from '../types.js'

export const deleteProjectTool = {
  name: 'deleteProject',
  description: 'Delete a Vercel project',
  parameters: {
    type: 'object',
    properties: {
      idOrName: {
        type: 'string',
        description: 'The project ID or name to delete',
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
 * Delete a Vercel project
 */
export async function deleteProject(client: Vercel, params: DeleteProjectParams): Promise<{ success: boolean }> {
  try {
    const { idOrName, teamId, slug } = params

    await client.projects.deleteProject({
      idOrName,
      teamId,
      slug,
    })

    return { success: true }
  } catch (error) {
    throw new Error(`Failed to delete project: ${error instanceof Error ? error.message : String(error)}`)
  }
}
