import { LinearClient } from '@linear/sdk'
import type { GetUserParams, LinearUser } from '../types.js'

export const getUserTool = {
  name: 'getUser',
  description: 'Get user details (current user if no ID provided)',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The user ID to get details for. If not provided, returns current user details',
      },
    },
    required: [],
  },
} as const

/**
 * Get user details (self or by ID)
 */
export async function getUser(client: LinearClient, params: GetUserParams = {}): Promise<LinearUser> {
  try {
    let user
    if (params.id) {
      user = await client.user(params.id)
    } else {
      user = await client.viewer
    }

    if (!user) {
      throw new Error('User not found')
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    }
  } catch (error) {
    throw new Error(`Failed to get user: ${error instanceof Error ? error.message : String(error)}`)
  }
}
