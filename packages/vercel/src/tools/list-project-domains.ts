import { Vercel } from '@vercel/sdk'
import type { ListProjectDomainsParams, DomainResponse } from '../types.js'

export const listProjectDomainsTool = {
  name: 'listProjectDomains',
  description: 'List domains for a specific project',
  parameters: {
    type: 'object',
    properties: {
      idOrName: {
        type: 'string',
        description: 'The project ID or name',
      },
      teamId: {
        type: 'string',
        description: 'The team ID that owns the project',
      },
      slug: {
        type: 'string',
        description: 'The team slug that owns the project',
      },
    },
    required: ['idOrName'],
  },
} as const

/**
 * List domains for a specific project
 */
export async function listProjectDomains(client: Vercel, params: ListProjectDomainsParams): Promise<DomainResponse[]> {
  try {
    const { idOrName, teamId, slug } = params

    const result = await client.projects.getProjectDomains({
      idOrName,
      teamId,
      slug,
    })

    return result.domains.map((domain) => ({
      name: domain.name,
      apexName: domain.apexName,
      projectId: domain.projectId,
      redirect: domain.redirect,
      redirectStatusCode: domain.redirectStatusCode,
      gitBranch: domain.gitBranch,
      updatedAt: domain.updatedAt,
      createdAt: domain.createdAt,
      verified: domain.verified,
    }))
  } catch (error) {
    throw new Error(`Failed to list project domains: ${error instanceof Error ? error.message : String(error)}`)
  }
}
