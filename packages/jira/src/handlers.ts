import JiraClient from 'jira-client'
import { createIssue, getIssue, updateIssue, searchIssues, getProjects, getUser } from './tools/index.js'
import type {
  CreateIssueParams,
  GetIssueParams,
  UpdateIssueParams,
  SearchIssuesParams,
  GetProjectsParams,
  GetUserParams,
  IssueResponse,
  ProjectResponse,
  SearchResults,
  JiraUser,
} from './types.js'

export interface JiraConfig {
  protocol: 'https' | 'http'
  host: string
  username: string
  password: string
  apiVersion: '2' | '3'
  strictSSL?: boolean
}

export class JiraHandlers {
  private client: JiraClient

  constructor(config: JiraConfig) {
    this.client = new JiraClient(config)
  }

  /**
   * Create a new issue
   */
  async createIssue(params: CreateIssueParams): Promise<IssueResponse> {
    return createIssue(this.client, params)
  }

  /**
   * Get issue details by key
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
   * Get all projects
   */
  async getProjects(params: GetProjectsParams = {}): Promise<ProjectResponse[]> {
    return getProjects(this.client, params)
  }

  /**
   * Get user details (self or by account ID)
   */
  async getUser(params: GetUserParams = {}): Promise<JiraUser> {
    return getUser(this.client, params)
  }
}
