import { Octokit } from '@octokit/rest'
import type { UpdateIssueParams, GitHubIssue } from '../types.js'

export const updateIssueTool = {
  name: 'updateIssue',
  description: 'Update an existing issue',
  parameters: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The repository owner (username or organization)',
      },
      repo: {
        type: 'string',
        description: 'The repository name',
      },
      issue_number: {
        type: 'number',
        description: 'The issue number',
      },
      title: {
        type: 'string',
        description: 'The new title of the issue',
      },
      body: {
        type: 'string',
        description: 'The new body/description of the issue',
      },
      state: {
        type: 'string',
        enum: ['open', 'closed'],
        description: 'The new state of the issue',
      },
      labels: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of label names for the issue',
      },
      assignees: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of usernames to assign to the issue',
      },
      milestone: {
        type: 'number',
        description: 'The milestone number to associate with the issue',
      },
    },
    required: ['owner', 'repo', 'issue_number'],
  },
} as const

/**
 * Update an existing issue
 */
export async function updateIssue(client: Octokit, params: UpdateIssueParams): Promise<GitHubIssue> {
  try {
    const response = await client.rest.issues.update({
      owner: params.owner,
      repo: params.repo,
      issue_number: params.issue_number,
      title: params.title,
      body: params.body,
      state: params.state,
      labels: params.labels,
      assignees: params.assignees,
      milestone: params.milestone,
    })

    const issue = response.data

    return {
      id: issue.id,
      number: issue.number,
      title: issue.title,
      body: issue.body || undefined,
      state: issue.state as 'open' | 'closed',
      user: {
        id: issue.user?.id || 0,
        login: issue.user?.login || '',
        avatar_url: issue.user?.avatar_url,
        html_url: issue.user?.html_url,
        email: issue.user?.email || undefined,
        name: issue.user?.name || undefined,
      },
      assignees:
        issue.assignees?.map((assignee) => ({
          id: assignee.id,
          login: assignee.login,
          avatar_url: assignee.avatar_url,
          html_url: assignee.html_url,
          email: assignee.email || undefined,
          name: assignee.name || undefined,
        })) || [],
      labels:
        issue.labels?.map((label) => {
          if (typeof label === 'string') {
            return { id: 0, name: label, color: '', description: undefined }
          }
          return {
            id: label.id || 0,
            name: label.name || '',
            color: label.color || '',
            description: label.description || undefined,
          }
        }) || [],
      html_url: issue.html_url,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      closed_at: issue.closed_at || undefined,
    }
  } catch (error) {
    throw new Error(`Failed to update issue: ${error instanceof Error ? error.message : String(error)}`)
  }
}
