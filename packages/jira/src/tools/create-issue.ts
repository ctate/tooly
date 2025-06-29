import type JiraClient from 'jira-client'
import type { CreateIssueParams, IssueResponse } from '../types.js'

export const createIssueTool = {
  name: 'createIssue',
  description: 'Create a new issue in JIRA',
  parameters: {
    type: 'object',
    properties: {
      projectKey: {
        type: 'string',
        description: 'The key of the project to create the issue in (e.g., "PROJ")',
      },
      summary: {
        type: 'string',
        description: 'The summary/title of the issue',
        minLength: 1,
        maxLength: 255,
      },
      description: {
        type: 'string',
        description: 'The description of the issue (supports Markdown and JIRA markup)',
      },
      issueType: {
        type: 'string',
        description: 'The name or ID of the issue type (e.g., "Bug", "Story", "Task")',
      },
      assignee: {
        type: 'string',
        description: 'The account ID of the user to assign the issue to',
      },
      priority: {
        type: 'string',
        description: 'The priority ID or name for the issue (e.g., "High", "Medium", "Low")',
      },
      labels: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of labels to apply to the issue',
      },
      components: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of component names to assign to the issue',
      },
      fixVersions: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of fix version names for the issue',
      },
      dueDate: {
        type: 'string',
        description: 'The due date for the issue in YYYY-MM-DD format',
      },
      parentKey: {
        type: 'string',
        description: 'The key of the parent issue (for creating subtasks)',
      },
    },
    required: ['projectKey', 'summary', 'issueType'],
  },
} as const

/**
 * Create a new issue in JIRA
 */
export async function createIssue(client: JiraClient, params: CreateIssueParams): Promise<IssueResponse> {
  try {
    // Prepare the issue fields
    const fields: any = {
      project: { key: params.projectKey },
      summary: params.summary,
      issuetype: { name: params.issueType },
    }

    if (params.description) {
      fields.description = params.description
    }

    if (params.assignee) {
      fields.assignee = { accountId: params.assignee }
    }

    if (params.priority) {
      fields.priority = { name: params.priority }
    }

    if (params.labels && params.labels.length > 0) {
      fields.labels = params.labels
    }

    if (params.components && params.components.length > 0) {
      fields.components = params.components.map((name) => ({ name }))
    }

    if (params.fixVersions && params.fixVersions.length > 0) {
      fields.fixVersions = params.fixVersions.map((name) => ({ name }))
    }

    if (params.dueDate) {
      fields.duedate = params.dueDate
    }

    if (params.parentKey) {
      fields.parent = { key: params.parentKey }
    }

    // Create the issue
    const response = await client.addNewIssue({ fields })

    // Get the full issue details
    const issue = await client.findIssue(response.key)

    return {
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
    }
  } catch (error) {
    throw new Error(`Failed to create issue: ${error instanceof Error ? error.message : String(error)}`)
  }
}
