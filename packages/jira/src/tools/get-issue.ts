import type JiraClient from 'jira-client'
import type { GetIssueParams, IssueResponse } from '../types.js'

export const getIssueTool = {
  name: 'getIssue',
  description: 'Get details of a specific JIRA issue by key',
  parameters: {
    type: 'object',
    properties: {
      issueKey: {
        type: 'string',
        description: 'The issue key (e.g., "PROJ-123")',
      },
    },
    required: ['issueKey'],
  },
} as const

/**
 * Get details of a specific JIRA issue by key
 */
export async function getIssue(client: JiraClient, params: GetIssueParams): Promise<IssueResponse> {
  try {
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
    throw new Error(`Failed to get issue: ${error instanceof Error ? error.message : String(error)}`)
  }
}
