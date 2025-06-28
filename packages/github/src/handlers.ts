import { Octokit } from '@octokit/rest'
import { createIssue, getIssue, updateIssue, searchIssues, getRepository, getUser } from './tools/index.js'
import type {
  CreateIssueParams,
  GetIssueParams,
  UpdateIssueParams,
  SearchIssuesParams,
  GetRepositoryParams,
  GetUserParams,
  GitHubIssue,
  GitHubRepository,
  GitHubUser,
  SearchIssuesResult,
} from './types.js'

export class GitHubHandlers {
  private client: Octokit

  constructor(authToken: string) {
    this.client = new Octokit({ auth: authToken })
  }

  /**
   * Create a new issue
   */
  async createIssue(params: CreateIssueParams): Promise<GitHubIssue> {
    return createIssue(this.client, params)
  }

  /**
   * Get issue details by number
   */
  async getIssue(params: GetIssueParams): Promise<GitHubIssue> {
    return getIssue(this.client, params)
  }

  /**
   * Update an existing issue
   */
  async updateIssue(params: UpdateIssueParams): Promise<GitHubIssue> {
    return updateIssue(this.client, params)
  }

  /**
   * Search for issues
   */
  async searchIssues(params: SearchIssuesParams): Promise<SearchIssuesResult> {
    return searchIssues(this.client, params)
  }

  /**
   * Get repository details
   */
  async getRepository(params: GetRepositoryParams): Promise<GitHubRepository> {
    return getRepository(this.client, params)
  }

  /**
   * Get user details (authenticated user or by username)
   */
  async getUser(params: GetUserParams = {}): Promise<GitHubUser> {
    return getUser(this.client, params)
  }
}
