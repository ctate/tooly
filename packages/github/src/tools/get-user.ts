import { Octokit } from '@octokit/rest'
import type { GetUserParams, GitHubUser } from '../types.js'

export const getUserTool = {
  name: 'getUser',
  description: 'Get user details (authenticated user or by username)',
  parameters: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The username to get details for. If not provided, returns authenticated user details',
      },
    },
  },
} as const

/**
 * Get user details (authenticated user or by username)
 */
export async function getUser(client: Octokit, params: GetUserParams = {}): Promise<GitHubUser> {
  try {
    const response = params.username
      ? await client.rest.users.getByUsername({ username: params.username })
      : await client.rest.users.getAuthenticated()

    const user = response.data

    return {
      id: user.id,
      login: user.login,
      avatar_url: user.avatar_url,
      html_url: user.html_url,
      email: user.email || undefined,
      name: user.name || undefined,
    }
  } catch (error) {
    throw new Error(`Failed to get user: ${error instanceof Error ? error.message : String(error)}`)
  }
}
