import { Vercel } from '@vercel/sdk'
import {
  createProject,
  getProject,
  listProjects,
  updateProject,
  deleteProject,
  getDeployment,
  listDeployments,
  listProjectDomains,
  getTeam,
} from './tools/index.js'
import type {
  CreateProjectParams,
  GetProjectParams,
  ListProjectsParams,
  UpdateProjectParams,
  DeleteProjectParams,
  GetDeploymentParams,
  ListDeploymentsParams,
  ListProjectDomainsParams,
  GetTeamParams,
  ProjectResponse,
  DeploymentResponse,
  DomainResponse,
  TeamResponse,
} from './types.js'

export class VercelHandlers {
  private client: Vercel

  constructor(bearerToken: string) {
    this.client = new Vercel({ bearerToken })
  }

  /**
   * Create a new project
   */
  async createProject(params: CreateProjectParams): Promise<ProjectResponse> {
    return createProject(this.client, params)
  }

  /**
   * Get project details by ID or name
   */
  async getProject(params: GetProjectParams): Promise<ProjectResponse> {
    return getProject(this.client, params)
  }

  /**
   * List all projects
   */
  async listProjects(params: ListProjectsParams = {}): Promise<ProjectResponse[]> {
    return listProjects(this.client, params)
  }

  /**
   * Update an existing project
   */
  async updateProject(params: UpdateProjectParams): Promise<ProjectResponse> {
    return updateProject(this.client, params)
  }

  /**
   * Delete a project
   */
  async deleteProject(params: DeleteProjectParams): Promise<{ success: boolean }> {
    return deleteProject(this.client, params)
  }

  /**
   * Get deployment details by ID or URL
   */
  async getDeployment(params: GetDeploymentParams): Promise<DeploymentResponse> {
    return getDeployment(this.client, params)
  }

  /**
   * List deployments
   */
  async listDeployments(params: ListDeploymentsParams = {}): Promise<DeploymentResponse[]> {
    return listDeployments(this.client, params)
  }

  /**
   * List project domains
   */
  async listProjectDomains(params: ListProjectDomainsParams): Promise<DomainResponse[]> {
    return listProjectDomains(this.client, params)
  }

  /**
   * Get team details
   */
  async getTeam(params: GetTeamParams): Promise<TeamResponse> {
    return getTeam(this.client, params)
  }
}
