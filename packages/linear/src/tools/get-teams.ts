import { LinearClient } from '@linear/sdk'
import type { GetTeamsParams, Team } from '../types.js'

export const getTeamsTool = {
  name: 'getTeams',
  description: 'Get all teams in the Linear workspace',
  parameters: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Maximum number of teams to return (1-100, default: 50)',
        minimum: 1,
        maximum: 100,
        default: 50,
      },
    },
    required: [],
  },
} as const

/**
 * Get all teams
 */
export async function getTeams(client: LinearClient, params: GetTeamsParams = {}): Promise<Team[]> {
  try {
    const teamsConnection = await client.teams({
      first: params.limit || 50,
    })

    return teamsConnection.nodes.map((team) => ({
      id: team.id,
      name: team.name,
      key: team.key,
      description: team.description || undefined,
    }))
  } catch (error) {
    throw new Error(`Failed to get teams: ${error instanceof Error ? error.message : String(error)}`)
  }
}
