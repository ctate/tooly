import { Octokit } from '@octokit/rest'
import type { SearchIssuesParams, SearchIssuesResult } from '../types.js'

export const searchIssuesTool = {
  name: 'searchIssues',
  description: 'Search for issues using various filters',
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
      query: {
        type: 'string',
        description: 'Search query string',
      },
      state: {
        type: 'string',
        enum: ['open', 'closed'],
        description: 'Filter by issue state',
      },
      labels: {
        type: 'array',
        items: { type: 'string' },
        description: 'Filter by label names',
      },
      assignee: {
        type: 'string',
        description: 'Filter by assignee username',
      },
      creator: {
        type: 'string',
        description: 'Filter by creator username',
      },
      limit: {
        type: 'number',
        minimum: 1,
        maximum: 100,
        default: 25,
        description: 'Maximum number of results to return',
      },
      sort: {
        type: 'string',
        enum: ['created', 'updated', 'comments'],
        description: 'Sort field',
      },
      order: {
        type: 'string',
        enum: ['asc', 'desc'],
        description: 'Sort order',
      },
    },
  },
} as const

/**
 * Search for issues using various filters
 */
export async function searchIssues(client: Octokit, params: SearchIssuesParams): Promise<SearchIssuesResult> {
  try {
    // Build search query
    let searchQuery = ''

    if (params.query) {
      searchQuery += params.query + ' '
    }

    if (params.owner && params.repo) {
      searchQuery += `repo:${params.owner}/${params.repo} `
    } else if (params.owner) {
      searchQuery += `user:${params.owner} `
    }

    searchQuery += 'is:issue '

    if (params.state) {
      searchQuery += `state:${params.state} `
    }

    if (params.labels && params.labels.length > 0) {
      searchQuery += params.labels.map((label) => `label:"${label}"`).join(' ') + ' '
    }

    if (params.assignee) {
      searchQuery += `assignee:${params.assignee} `
    }

    if (params.creator) {
      searchQuery += `author:${params.creator} `
    }

    const response = await client.rest.search.issuesAndPullRequests({
      q: searchQuery.trim(),
      sort: params.sort,
      order: params.order,
      per_page: params.limit || 25,
    })

    // Filter out pull requests (search API returns both issues and PRs)
    const issues = response.data.items.filter((item) => !item.pull_request)

    return {
      total_count: issues.length,
      items: issues.map((issue) => ({
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
      })),
    }
  } catch (error) {
    throw new Error(`Failed to search issues: ${error instanceof Error ? error.message : String(error)}`)
  }
}
