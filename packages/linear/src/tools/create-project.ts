import { LinearClient } from '@linear/sdk'
import type { CreateProjectParams, ProjectResponse } from '../types.js'

export const createProjectTool = {
  name: 'createProject',
  description: 'Create a new project in Linear',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the project',
        minLength: 1,
        maxLength: 255,
      },
      description: {
        type: 'string',
        description: 'The description of the project',
      },
      leadId: {
        type: 'string',
        description: 'The ID of the user who will lead the project',
      },
      memberIds: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of user IDs who are members of the project',
      },
      targetDate: {
        type: 'string',
        description: 'The target completion date for the project (ISO 8601 date string)',
      },
    },
    required: ['name'],
  },
} as const

/**
 * Create a new project
 */
export async function createProject(client: LinearClient, params: CreateProjectParams): Promise<ProjectResponse> {
  try {
    const projectPayload = await client.createProject({
      name: params.name,
      description: params.description,
      leadId: params.leadId,
      memberIds: params.memberIds,
      teamIds: [], // Required parameter - empty array for now
      targetDate: params.targetDate ? new Date(params.targetDate) : undefined,
    })

    const project = await projectPayload.project
    if (!project) {
      throw new Error('Failed to create project')
    }

    // Await related objects
    const lead = project.lead ? await project.lead : undefined

    return {
      id: project.id,
      name: project.name,
      description: project.description || undefined,
      status: 'planned', // Default status since Linear doesn't have a status field
      lead: lead
        ? {
            id: lead.id,
            name: lead.name,
            email: lead.email,
          }
        : undefined,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      targetDate: project.targetDate?.toISOString(),
    }
  } catch (error) {
    throw new Error(`Failed to create project: ${error instanceof Error ? error.message : String(error)}`)
  }
}
