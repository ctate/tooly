import { LinearClient } from '@linear/sdk'
import type { GetIssueParams, IssueResponse } from '../types.js'

export const getIssueTool = {
  name: 'getIssue',
  description: 'Get details of a specific issue by ID or identifier',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: "The issue ID (UUID) or identifier (e.g., 'LIN-123')",
      },
    },
    required: ['id'],
  },
} as const

/**
 * Get issue details by ID
 */
export async function getIssue(client: LinearClient, params: GetIssueParams): Promise<IssueResponse> {
  try {
    const issue = await client.issue(params.id)
    if (!issue) {
      throw new Error(`Issue not found: ${params.id}`)
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
    throw new Error(`Failed to get issue: ${error instanceof Error ? error.message : String(error)}`)
  }
}
