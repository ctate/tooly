import { z } from 'zod'
import { CreateIssueSchema, UpdateIssueSchema, SearchIssuesSchema, CreateProjectSchema } from '../types.js'

// Export all tools
export * from './create-issue.js'
export * from './get-issue.js'
export * from './update-issue.js'
export * from './search-issues.js'
export * from './create-project.js'
export * from './get-teams.js'
export * from './get-user.js'

// Import tool definitions
import { createIssueTool } from './create-issue.js'
import { getIssueTool } from './get-issue.js'
import { updateIssueTool } from './update-issue.js'
import { searchIssuesTool } from './search-issues.js'
import { createProjectTool } from './create-project.js'
import { getTeamsTool } from './get-teams.js'
import { getUserTool } from './get-user.js'

// Export all tools as an array
export const linearTools = [
  createIssueTool,
  getIssueTool,
  updateIssueTool,
  searchIssuesTool,
  createProjectTool,
  getTeamsTool,
  getUserTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  createIssue: CreateIssueSchema,
  getIssue: z.object({ id: z.string() }),
  updateIssue: z.object({ id: z.string() }).merge(UpdateIssueSchema),
  searchIssues: SearchIssuesSchema,
  createProject: CreateProjectSchema,
  getTeams: z.object({ limit: z.number().min(1).max(100).optional() }),
  getUser: z.object({ id: z.string().optional() }),
} as const
