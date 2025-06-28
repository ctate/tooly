import { LinearClient } from '@linear/sdk'
import type { CreateIssueParams, IssueResponse } from '../types.js'

export const createIssueTool = {
  name: 'createIssue',
  description: 'Create a new issue in Linear',
  parameters: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'The title of the issue',
        minLength: 1,
        maxLength: 255,
      },
      description: {
        type: 'string',
        description: 'The description of the issue (supports Markdown)',
      },
      teamId: {
        type: 'string',
        description: 'The ID of the team to create the issue in',
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
    required: ['title', 'teamId'],
  },
} as const

/**
 * Create a new issue in Linear
 */
export async function createIssue(client: LinearClient, params: CreateIssueParams): Promise<IssueResponse> {
  try {
    const issuePayload = await client.createIssue({
      title: params.title,
      description: params.description,
      teamId: params.teamId,
      assigneeId: params.assigneeId,
      priority: params.priority,
      stateId: params.stateId,
      projectId: params.projectId,
      labelIds: params.labelIds,
      estimate: params.estimate,
      dueDate: params.dueDate ? new Date(params.dueDate) : undefined,
    })

    const issue = await issuePayload.issue
    if (!issue) {
      throw new Error('Failed to create issue')
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
    throw new Error(`Failed to create issue: ${error instanceof Error ? error.message : String(error)}`)
  }
}
