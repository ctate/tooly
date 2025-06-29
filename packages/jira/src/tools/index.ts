import { z } from 'zod'
import { CreateIssueSchema, UpdateIssueSchema, SearchIssuesSchema } from '../types.js'

// Export all tools
export * from './create-issue.js'
export * from './get-issue.js'
export * from './update-issue.js'
export * from './search-issues.js'
export * from './get-projects.js'
export * from './get-user.js'

// Import tool definitions
import { createIssueTool } from './create-issue.js'
import { getIssueTool } from './get-issue.js'
import { updateIssueTool } from './update-issue.js'
import { searchIssuesTool } from './search-issues.js'
import { getProjectsTool } from './get-projects.js'
import { getUserTool } from './get-user.js'

// Export all tools as an array
export const jiraTools = [
  createIssueTool,
  getIssueTool,
  updateIssueTool,
  searchIssuesTool,
  getProjectsTool,
  getUserTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  createIssue: CreateIssueSchema,
  getIssue: z.object({ issueKey: z.string() }),
  updateIssue: z.object({ issueKey: z.string() }).merge(UpdateIssueSchema),
  searchIssues: SearchIssuesSchema,
  getProjects: z.object({
    maxResults: z.number().min(1).max(100).optional(),
    startAt: z.number().min(0).optional(),
  }),
  getUser: z.object({ accountId: z.string().optional() }),
} as const
