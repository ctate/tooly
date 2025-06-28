import { z } from 'zod'
import {
  CreateIssueSchema,
  UpdateIssueSchema,
  SearchIssuesSchema,
  CreateRepositorySchema,
  ListRepositoriesSchema,
} from '../types.js'

// Export all tools
export * from './create-issue.js'
export * from './get-issue.js'
export * from './update-issue.js'
export * from './search-issues.js'
export * from './get-repository.js'
export * from './get-user.js'

// Import tool definitions
import { createIssueTool } from './create-issue.js'
import { getIssueTool } from './get-issue.js'
import { updateIssueTool } from './update-issue.js'
import { searchIssuesTool } from './search-issues.js'
import { getRepositoryTool } from './get-repository.js'
import { getUserTool } from './get-user.js'

// Export all tools as an array
export const githubTools = [
  createIssueTool,
  getIssueTool,
  updateIssueTool,
  searchIssuesTool,
  getRepositoryTool,
  getUserTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  createIssue: CreateIssueSchema,
  getIssue: z.object({
    owner: z.string(),
    repo: z.string(),
    issue_number: z.number(),
  }),
  updateIssue: z
    .object({
      owner: z.string(),
      repo: z.string(),
      issue_number: z.number(),
    })
    .merge(UpdateIssueSchema),
  searchIssues: SearchIssuesSchema,
  getRepository: z.object({
    owner: z.string(),
    repo: z.string(),
  }),
  getUser: z.object({
    username: z.string().optional(),
  }),
} as const
