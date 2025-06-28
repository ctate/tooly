import { LinearClient } from '@linear/sdk'
import type { UpdateIssueParams, IssueResponse } from '../types.js'

export const updateIssueTool = {
  name: 'updateIssue',
  description: 'Update an existing issue',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: "The issue ID (UUID) or identifier (e.g., 'LIN-123')",
      },
      title: {
        type: 'string',
        description: 'The new title of the issue',
        minLength: 1,
        maxLength: 255,
      },
      description: {
        type: 'string',
        description: 'The new description of the issue (supports Markdown)',
      },
      assigneeId: {
        type: 'string',
        description: 'The ID of the user to assign the issue to',
      },
      priority: {
        type: 'number',
        description: 'The priority of the issue (0=None, 1=Urgent, 2=High, 3=Medium, 4=Low)',
        enum: [0, 1, 2, 3, 4],
      },
      stateId: {
        type: 'string',
        description: 'The ID of the workflow state for the issue',
      },
      projectId: {
        type: 'string',
        description: 'The ID of the project to add the issue to',
      },
      labelIds: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of label IDs to apply to the issue',
      },
      estimate: {
        type: 'number',
        description: 'The estimate for the issue (0-40 story points)',
        minimum: 0,
        maximum: 40,
      },
      dueDate: {
        type: 'string',
        description: 'The due date for the issue (ISO 8601 date string)',
      },
    },
    required: ['id'],
  },
} as const

/**
 * Update an existing issue
 */
export async function updateIssue(client: LinearClient, params: UpdateIssueParams): Promise<IssueResponse> {
  try {
    const { id, ...updateData } = params
    const issuePayload = await client.updateIssue(id, {
      title: updateData.title,
      description: updateData.description,
      assigneeId: updateData.assigneeId,
      priority: updateData.priority,
      stateId: updateData.stateId,
      projectId: updateData.projectId,
      labelIds: updateData.labelIds,
      estimate: updateData.estimate,
      dueDate: updateData.dueDate ? new Date(updateData.dueDate) : undefined,
    })

    const issue = await issuePayload.issue
    if (!issue) {
      throw new Error('Failed to update issue')
    }

    // Await related objects
    const state = issue.state ? await issue.state : undefined
    const assignee = issue.assignee ? await issue.assignee : undefined
    const creator = issue.creator ? await issue.creator : undefined
    const team = issue.team ? await issue.team : undefined

    return {
      id: issue.id,
      identifier: issue.identifier,
      title: issue.title,
      description: issue.description || undefined,
      state: state
        ? {
            id: state.id,
            name: state.name,
            type: state.type,
          }
        : undefined,
      priority: issue.priority as 0 | 1 | 2 | 3 | 4 | undefined,
      assignee: assignee
        ? {
            id: assignee.id,
            name: assignee.name,
            email: assignee.email,
          }
        : undefined,
      creator: creator
        ? {
            id: creator.id,
            name: creator.name,
            email: creator.email,
          }
        : undefined,
      team: team
        ? {
            id: team.id,
            name: team.name,
            key: team.key,
            description: team.description || undefined,
          }
        : undefined,
      createdAt: issue.createdAt.toISOString(),
      updatedAt: issue.updatedAt.toISOString(),
      estimate: issue.estimate || undefined,
      dueDate: issue.dueDate?.toISOString(),
    }
  } catch (error) {
    throw new Error(`Failed to update issue: ${error instanceof Error ? error.message : String(error)}`)
  }
}
