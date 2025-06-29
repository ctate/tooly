import type JiraClient from 'jira-client'
import type { SearchIssuesParams, SearchResults } from '../types.js'

export const searchIssuesTool = {
  name: 'searchIssues',
  description: 'Search for JIRA issues using JQL or filters',
  parameters: {
    type: 'object',
    properties: {
      jql: {
        type: 'string',
        description: 'JQL (JIRA Query Language) query string. If provided, other filters are ignored.',
      },
      projectKey: {
        type: 'string',
        description: 'Filter by project key',
      },
      assignee: {
        type: 'string',
        description: 'Filter by assignee account ID or "unassigned"',
      },
      status: {
        type: 'string',
        description: 'Filter by status name',
      },
      issueType: {
        type: 'string',
        description: 'Filter by issue type name',
      },
      priority: {
        type: 'string',
        description: 'Filter by priority name',
      },
      labels: {
        type: 'array',
        items: { type: 'string' },
        description: 'Filter by labels (issues must have ALL specified labels)',
      },
      createdAfter: {
        type: 'string',
        description: 'Filter issues created after this date (ISO format)',
      },
      createdBefore: {
        type: 'string',
        description: 'Filter issues created before this date (ISO format)',
      },
      maxResults: {
        type: 'number',
        description: 'Maximum number of results to return (1-100)',
        minimum: 1,
        maximum: 100,
        default: 50,
      },
      startAt: {
        type: 'number',
        description: 'Starting index for pagination',
        minimum: 0,
        default: 0,
      },
    },
    required: [],
  },
} as const

/**
 * Search for JIRA issues using JQL or filters
 */
export async function searchIssues(client: JiraClient, params: SearchIssuesParams): Promise<SearchResults> {
  try {
    let jql = params.jql

    // If no JQL provided, build it from filters
    if (!jql) {
      const conditions: string[] = []

      if (params.projectKey) {
        conditions.push(`project = "${params.projectKey}"`)
      }

      if (params.assignee) {
        if (params.assignee.toLowerCase() === 'unassigned') {
          conditions.push('assignee is EMPTY')
        } else {
          conditions.push(`assignee = "${params.assignee}"`)
        }
      }

      if (params.status) {
        conditions.push(`status = "${params.status}"`)
      }

      if (params.issueType) {
        conditions.push(`issuetype = "${params.issueType}"`)
      }

      if (params.priority) {
        conditions.push(`priority = "${params.priority}"`)
      }

      if (params.labels && params.labels.length > 0) {
        const labelConditions = params.labels.map((label) => `labels = "${label}"`)
        conditions.push(`(${labelConditions.join(' AND ')})`)
      }

      if (params.createdAfter) {
        conditions.push(`created >= "${params.createdAfter}"`)
      }

      if (params.createdBefore) {
        conditions.push(`created <= "${params.createdBefore}"`)
      }

      jql = conditions.length > 0 ? conditions.join(' AND ') : 'project is not EMPTY'
    }

    // Add ordering
    if (!jql.toLowerCase().includes('order by')) {
      jql += ' ORDER BY created DESC'
    }

    const searchResult = await client.searchJira(jql, {
      startAt: params.startAt || 0,
      maxResults: params.maxResults || 50,
    })

    const issues = searchResult.issues.map((issue: any) => ({
      id: issue.id,
      key: issue.key,
      summary: issue.fields.summary,
      description: issue.fields.description || undefined,
      status: {
        id: issue.fields.status.id,
        name: issue.fields.status.name,
        description: issue.fields.status.description || undefined,
        statusCategory: issue.fields.status.statusCategory
          ? {
              id: issue.fields.status.statusCategory.id,
              name: issue.fields.status.statusCategory.name,
              key: issue.fields.status.statusCategory.key,
            }
          : undefined,
      },
      priority: issue.fields.priority
        ? {
            id: issue.fields.priority.id,
            name: issue.fields.priority.name,
            iconUrl: issue.fields.priority.iconUrl || undefined,
          }
        : undefined,
      issueType: {
        id: issue.fields.issuetype.id,
        name: issue.fields.issuetype.name,
        description: issue.fields.issuetype.description || undefined,
        iconUrl: issue.fields.issuetype.iconUrl || undefined,
      },
      assignee: issue.fields.assignee
        ? {
            accountId: issue.fields.assignee.accountId,
            displayName: issue.fields.assignee.displayName,
            emailAddress: issue.fields.assignee.emailAddress || undefined,
            active: issue.fields.assignee.active,
          }
        : undefined,
      reporter: issue.fields.reporter
        ? {
            accountId: issue.fields.reporter.accountId,
            displayName: issue.fields.reporter.displayName,
            emailAddress: issue.fields.reporter.emailAddress || undefined,
            active: issue.fields.reporter.active,
          }
        : undefined,
      project: {
        id: issue.fields.project.id,
        key: issue.fields.project.key,
        name: issue.fields.project.name,
        description: issue.fields.project.description || undefined,
        projectTypeKey: issue.fields.project.projectTypeKey,
        lead: issue.fields.project.lead
          ? {
              accountId: issue.fields.project.lead.accountId,
              displayName: issue.fields.project.lead.displayName,
              emailAddress: issue.fields.project.lead.emailAddress || undefined,
              active: issue.fields.project.lead.active,
            }
          : undefined,
      },
      created: issue.fields.created,
      updated: issue.fields.updated,
      dueDate: issue.fields.duedate || undefined,
      labels: issue.fields.labels || [],
      components: (issue.fields.components || []).map((comp: any) => ({
        id: comp.id,
        name: comp.name,
      })),
      fixVersions: (issue.fields.fixVersions || []).map((version: any) => ({
        id: version.id,
        name: version.name,
      })),
    }))

    return {
      issues,
      total: searchResult.total,
      startAt: searchResult.startAt,
      maxResults: searchResult.maxResults,
    }
  } catch (error) {
    throw new Error(`Failed to search issues: ${error instanceof Error ? error.message : String(error)}`)
  }
}
