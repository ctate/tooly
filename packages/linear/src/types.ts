import { z } from 'zod'

// Base types
export const LinearIdSchema = z.string()
export const LinearUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
})

// Issue schemas
export const IssueStateSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
})

export const IssuePrioritySchema = z.union([
  z.literal(0), // No priority
  z.literal(1), // Urgent
  z.literal(2), // High
  z.literal(3), // Medium
  z.literal(4), // Low
])

export const CreateIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  teamId: z.string(),
  assigneeId: z.string().optional(),
  priority: IssuePrioritySchema.optional(),
  stateId: z.string().optional(),
  projectId: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
  estimate: z.number().min(0).max(40).optional(),
  dueDate: z.string().optional(), // ISO date string
})

export const UpdateIssueSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  assigneeId: z.string().optional(),
  priority: IssuePrioritySchema.optional(),
  stateId: z.string().optional(),
  projectId: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
  estimate: z.number().min(0).max(40).optional(),
  dueDate: z.string().optional(),
})

export const SearchIssuesSchema = z.object({
  query: z.string().optional(),
  teamId: z.string().optional(),
  assigneeId: z.string().optional(),
  stateId: z.string().optional(),
  projectId: z.string().optional(),
  priority: IssuePrioritySchema.optional(),
  limit: z.number().min(1).max(100).default(25),
})

// Project schemas
export const CreateProjectSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  status: z.enum(['backlog', 'planned', 'started', 'paused', 'completed', 'canceled']).optional(),
  leadId: z.string().optional(),
  memberIds: z.array(z.string()).optional(),
  targetDate: z.string().optional(), // ISO date string
})

// Team schemas
export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  key: z.string(),
  description: z.string().optional(),
})

// Response schemas
export const IssueResponseSchema = z.object({
  id: z.string(),
  identifier: z.string(), // e.g., "LIN-123"
  title: z.string(),
  description: z.string().optional(),
  state: IssueStateSchema.optional(),
  priority: IssuePrioritySchema.optional(),
  assignee: LinearUserSchema.optional(),
  creator: LinearUserSchema.optional(),
  team: TeamSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  estimate: z.number().optional(),
  dueDate: z.string().optional(),
})

export const ProjectResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.string(),
  lead: LinearUserSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  targetDate: z.string().optional(),
})

export const SearchResultsSchema = z.object({
  issues: z.array(IssueResponseSchema),
  totalCount: z.number(),
})

// Export inferred types
export type LinearId = z.infer<typeof LinearIdSchema>
export type LinearUser = z.infer<typeof LinearUserSchema>
export type IssueState = z.infer<typeof IssueStateSchema>
export type IssuePriority = z.infer<typeof IssuePrioritySchema>
export type CreateIssueInput = z.infer<typeof CreateIssueSchema>
export type UpdateIssueInput = z.infer<typeof UpdateIssueSchema>
export type SearchIssuesInput = z.infer<typeof SearchIssuesSchema>
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>
export type Team = z.infer<typeof TeamSchema>
export type IssueResponse = z.infer<typeof IssueResponseSchema>
export type ProjectResponse = z.infer<typeof ProjectResponseSchema>
export type SearchResults = z.infer<typeof SearchResultsSchema>

// Tool parameter types
export interface CreateIssueParams extends CreateIssueInput {}
export interface GetIssueParams {
  id: string
}
export interface UpdateIssueParams extends UpdateIssueInput {
  id: string
}
export interface SearchIssuesParams extends SearchIssuesInput {}
export interface CreateProjectParams extends CreateProjectInput {}
export interface GetTeamsParams {
  limit?: number
}
export interface GetUserParams {
  id?: string // If not provided, returns current user
}
