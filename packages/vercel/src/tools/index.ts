import { z } from 'zod'
import {
  CreateProjectSchema,
  UpdateProjectSchema,
  GetProjectSchema,
  ListProjectsSchema,
  DeleteProjectSchema,
  GetDeploymentSchema,
  ListDeploymentsSchema,
  ListProjectDomainsSchema,
  GetTeamSchema,
} from '../types.js'

// Export all tools
export * from './create-project.js'
export * from './get-project.js'
export * from './list-projects.js'
export * from './update-project.js'
export * from './delete-project.js'
export * from './get-deployment.js'
export * from './list-deployments.js'
export * from './list-project-domains.js'
export * from './get-team.js'

// Import tool definitions
import { createProjectTool } from './create-project.js'
import { getProjectTool } from './get-project.js'
import { listProjectsTool } from './list-projects.js'
import { updateProjectTool } from './update-project.js'
import { deleteProjectTool } from './delete-project.js'
import { getDeploymentTool } from './get-deployment.js'
import { listDeploymentsTool } from './list-deployments.js'
import { listProjectDomainsTool } from './list-project-domains.js'
import { getTeamTool } from './get-team.js'

// Export all tools as an array
export const vercelTools = [
  createProjectTool,
  getProjectTool,
  listProjectsTool,
  updateProjectTool,
  deleteProjectTool,
  getDeploymentTool,
  listDeploymentsTool,
  listProjectDomainsTool,
  getTeamTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  createProject: CreateProjectSchema,
  getProject: GetProjectSchema,
  listProjects: ListProjectsSchema,
  updateProject: z.object({ idOrName: z.string() }).merge(UpdateProjectSchema),
  deleteProject: DeleteProjectSchema,
  getDeployment: GetDeploymentSchema,
  listDeployments: ListDeploymentsSchema,
  listProjectDomains: ListProjectDomainsSchema,
  getTeam: GetTeamSchema,
} as const
