import { Octokit } from '@octokit/rest'
import type { GetRepositoryParams, GitHubRepository } from '../types.js'

export const getRepositoryTool = {
  name: 'getRepository',
  description: 'Get details of a GitHub repository',
  parameters: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The repository owner (username or organization)',
      },
      repo: {
        type: 'string',
        description: 'The repository name',
      },
    },
    required: ['owner', 'repo'],
  },
} as const

/**
 * Get repository details
 */
export async function getRepository(client: Octokit, params: GetRepositoryParams): Promise<GitHubRepository> {
  try {
    const response = await client.rest.repos.get({
      owner: params.owner,
      repo: params.repo,
    })

    const repo = response.data

    return {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      owner: {
        id: repo.owner.id,
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
        html_url: repo.owner.html_url,
        email: repo.owner.email || undefined,
        name: repo.owner.name || undefined,
      },
      description: repo.description || undefined,
      html_url: repo.html_url,
      clone_url: repo.clone_url,
      default_branch: repo.default_branch,
      private: repo.private,
      language: repo.language || undefined,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
    }
  } catch (error) {
    throw new Error(`Failed to get repository: ${error instanceof Error ? error.message : String(error)}`)
  }
}
