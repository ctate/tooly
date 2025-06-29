import { Vercel } from '@vercel/sdk'
import type { GetTeamParams, TeamResponse } from '../types.js'

export const getTeamTool = {
  name: 'getTeam',
  description: 'Get details of a specific team',
  parameters: {
    type: 'object',
    properties: {
      teamId: {
        type: 'string',
        description: 'The team ID',
      },
    },
    required: ['teamId'],
  },
} as const

/**
 * Get details of a specific Vercel team
 */
export async function getTeam(client: Vercel, params: GetTeamParams): Promise<TeamResponse> {
  try {
    const { teamId } = params

    const result = await client.teams.getTeam({
      teamId,
    })

    return {
      id: result.id,
      name: result.name || '',
      slug: result.slug,
      avatar: result.avatar || undefined,
      membership: {
        confirmationDate: undefined,
        accessRequestedAt: undefined,
        role: result.membership.role,
        teamId: result.membership.teamId || '',
        uid: result.membership.uid || '',
        createdAt: result.membership.createdAt,
        created: result.membership.created,
        confirmed: result.membership.confirmed,
      },
      created: result.createdAt ? new Date(result.createdAt).toISOString() : '',
      createdAt: result.createdAt,
    }
  } catch (error) {
    throw new Error(`Failed to get team: ${error instanceof Error ? error.message : String(error)}`)
  }
}
