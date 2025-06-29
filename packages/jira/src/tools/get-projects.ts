import type JiraClient from 'jira-client'
import type { GetProjectsParams, ProjectResponse } from '../types.js'

export const getProjectsTool = {
  name: 'getProjects',
  description: 'Get all JIRA projects accessible to the user',
  parameters: {
    type: 'object',
    properties: {
      maxResults: {
        type: 'number',
        description: 'Maximum number of projects to return',
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
 * Get all JIRA projects accessible to the user
 */
export async function getProjects(client: JiraClient, params: GetProjectsParams = {}): Promise<ProjectResponse[]> {
  try {
    const projects = await client.listProjects()

    // Apply pagination if needed
    const startAt = params.startAt || 0
    const maxResults = params.maxResults || 50
    const paginatedProjects = projects.slice(startAt, startAt + maxResults)

    return paginatedProjects.map((project: any) => ({
      id: project.id,
      key: project.key,
      name: project.name,
      description: project.description || undefined,
      projectTypeKey: project.projectTypeKey,
      lead: project.lead
        ? {
            accountId: project.lead.accountId,
            displayName: project.lead.displayName,
            emailAddress: project.lead.emailAddress || undefined,
            active: project.lead.active,
          }
        : undefined,
      url: project.self || undefined,
      created: project.created || undefined,
      updated: project.updated || undefined,
    }))
  } catch (error) {
    throw new Error(`Failed to get projects: ${error instanceof Error ? error.message : String(error)}`)
  }
}
