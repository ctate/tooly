import { LinearClient } from '@linear/sdk'
import type { SearchIssuesParams, SearchResults } from '../types.js'

export const searchIssuesTool = {
  name: 'searchIssues',
  description: 'Search for issues using various filters',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Text query to search in issue titles and descriptions',
      },
      teamId: {
        type: 'string',
        description: 'Filter by team ID',
      },
      assigneeId: {
        type: 'string',
        description: 'Filter by assignee user ID',
      },
      stateId: {
        type: 'string',
        description: 'Filter by workflow state ID',
      },
      projectId: {
        type: 'string',
        description: 'Filter by project ID',
      },
      priority: {
        type: 'number',
        description: 'Filter by priority (0=None, 1=Urgent, 2=High, 3=Medium, 4=Low)',
        enum: [0, 1, 2, 3, 4],
      },
      limit: {
        type: 'number',
        description: 'Maximum number of issues to return (1-100, default: 25)',
        minimum: 1,
        maximum: 100,
        default: 25,
      },
    },
    required: [],
  },
} as const

/**
 * Search for issues
 */
export async function searchIssues(client: LinearClient, params: SearchIssuesParams): Promise<SearchResults> {
  try {
    const filter: any = {}

    if (params.teamId) filter.team = { id: { eq: params.teamId } }
    if (params.assigneeId) filter.assignee = { id: { eq: params.assigneeId } }
    if (params.stateId) filter.state = { id: { eq: params.stateId } }
    if (params.projectId) filter.project = { id: { eq: params.projectId } }
    if (params.priority !== undefined) filter.priority = { eq: params.priority }

    const issuesConnection = await client.issues({
      filter: Object.keys(filter).length > 0 ? filter : undefined,
      first: params.limit || 25,
    })

    const issues = await Promise.all(
      issuesConnection.nodes.map(async (issue) => {
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
      }),
    )

    return {
      issues,
      totalCount: issuesConnection.pageInfo.hasNextPage ? params.limit || 25 : issues.length,
    }
  } catch (error) {
    throw new Error(`Failed to search issues: ${error instanceof Error ? error.message : String(error)}`)
  }
}
