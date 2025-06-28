import { LinearClient } from '@linear/sdk'
import { createIssue, getIssue, updateIssue, searchIssues, createProject, getTeams, getUser } from './tools/index.js'
import type {
  CreateIssueParams,
  GetIssueParams,
  UpdateIssueParams,
  SearchIssuesParams,
  CreateProjectParams,
  GetTeamsParams,
  GetUserParams,
  IssueResponse,
  ProjectResponse,
  SearchResults,
  Team,
  LinearUser,
} from './types.js'

export class LinearHandlers {
  private client: LinearClient

  constructor(apiKey: string) {
    this.client = new LinearClient({ apiKey })
  }

  /**
   * Create a new issue
   */
  async createIssue(params: CreateIssueParams): Promise<IssueResponse> {
    return createIssue(this.client, params)
  }

  /**
   * Get issue details by ID
   */
  async getIssue(params: GetIssueParams): Promise<IssueResponse> {
    return getIssue(this.client, params)
  }

  /**
   * Update an existing issue
   */
  async updateIssue(params: UpdateIssueParams): Promise<IssueResponse> {
    return updateIssue(this.client, params)
  }

  /**
   * Search for issues
   */
  async searchIssues(params: SearchIssuesParams): Promise<SearchResults> {
    return searchIssues(this.client, params)
  }

  /**
   * Create a new project
   */
  async createProject(params: CreateProjectParams): Promise<ProjectResponse> {
    return createProject(this.client, params)
  }

  /**
   * Get all teams
   */
  async getTeams(params: GetTeamsParams = {}): Promise<Team[]> {
    return getTeams(this.client, params)
  }

  /**
   * Get user details (self or by ID)
   */
  async getUser(params: GetUserParams = {}): Promise<LinearUser> {
    return getUser(this.client, params)
  }
}
