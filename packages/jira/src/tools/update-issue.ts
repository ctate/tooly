import type JiraClient from 'jira-client'
import type { UpdateIssueParams, IssueResponse } from '../types.js'

export const updateIssueTool = {
  name: 'updateIssue',
  description: 'Update an existing JIRA issue',
  parameters: {
    type: 'object',
    properties: {
      issueKey: {
        type: 'string',
        description: 'The issue key to update (e.g., "PROJ-123")',
      },
      summary: {
        type: 'string',
        description: 'The new summary/title of the issue',
        minLength: 1,
        maxLength: 255,
      },
      description: {
        type: 'string',
        description: 'The new description of the issue',
      },
      assignee: {
        type: 'string',
        description: 'The account ID of the user to assign the issue to',
      },
      priority: {
        type: 'string',
        description: 'The priority ID or name for the issue',
      },
      labels: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of labels to apply to the issue (replaces existing labels)',
      },
      components: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of component names to assign to the issue (replaces existing components)',
      },
      fixVersions: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of fix version names for the issue (replaces existing versions)',
      },
      dueDate: {
        type: 'string',
        description: 'The due date for the issue in YYYY-MM-DD format',
      },
      status: {
        type: 'string',
        description: 'The status ID or name to transition the issue to',
      },
    },
    required: ['issueKey'],
  },
} as const

/**
 * Update an existing JIRA issue
 */
export async function updateIssue(client: JiraClient, params: UpdateIssueParams): Promise<IssueResponse> {
  try {
    // Prepare the update fields
    const fields: any = {}

    if (params.summary) {
      fields.summary = params.summary
    }

    if (params.description !== undefined) {
      fields.description = params.description
    }

    if (params.assignee !== undefined) {
      fields.assignee = params.assignee ? { accountId: params.assignee } : null
    }

    if (params.priority) {
      fields.priority = { name: params.priority }
    }

    if (params.labels !== undefined) {
      fields.labels = params.labels
    }

    if (params.components !== undefined) {
      fields.components = params.components.map((name) => ({ name }))
    }

    if (params.fixVersions !== undefined) {
      fields.fixVersions = params.fixVersions.map((name) => ({ name }))
    }

    if (params.dueDate !== undefined) {
      fields.duedate = params.dueDate
    }

    // Update the issue
    await client.updateIssue(params.issueKey, { fields })

    // Handle status transition separately if provided
    if (params.status) {
      const transitions = await client.listTransitions(params.issueKey)
      const transition = transitions.transitions.find(
        (t: any) =>
          t.name.toLowerCase() === params.status!.toLowerCase() ||
          t.to.name.toLowerCase() === params.status!.toLowerCase() ||
          t.id === params.status,
      )

      if (transition) {
        await client.transitionIssue(params.issueKey, {
          transition: { id: transition.id },
        })
      }
    }

    // Get the updated issue details
    const issue = await client.findIssue(params.issueKey)

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
    throw new Error(`Failed to update issue: ${error instanceof Error ? error.message : String(error)}`)
  }
}
