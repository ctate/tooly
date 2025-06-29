import type JiraClient from 'jira-client'
import type { GetUserParams, JiraUser } from '../types.js'

export const getUserTool = {
  name: 'getUser',
  description: 'Get JIRA user details (current user if no accountId provided)',
  parameters: {
    type: 'object',
    properties: {
      accountId: {
        type: 'string',
        description: 'The account ID of the user to retrieve. If not provided, returns current user.',
      },
    },
    required: [],
  },
} as const

/**
 * Get JIRA user details (current user if no accountId provided)
 */
export async function getUser(client: JiraClient, params: GetUserParams = {}): Promise<JiraUser> {
  try {
    let user: any

    if (params.accountId) {
      // Get specific user by account ID
      user = await client.getUser(params.accountId, '')
    } else {
      // Get current user
      user = await client.getCurrentUser()
    }

    return {
      accountId: user.accountId,
      displayName: user.displayName,
      emailAddress: user.emailAddress || undefined,
      active: user.active !== false, // Default to true if not specified
    }
  } catch (error) {
    throw new Error(`Failed to get user: ${error instanceof Error ? error.message : String(error)}`)
  }
}
