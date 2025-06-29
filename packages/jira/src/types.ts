import { z } from 'zod'

// Base types
export const JiraIdSchema = z.string()
export const JiraUserSchema = z.object({
  accountId: z.string(),
  displayName: z.string(),
  emailAddress: z.string().email().optional(),
  active: z.boolean(),
})

// Issue types and schemas
export const IssueTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
})

export const IssuePrioritySchema = z.object({
  id: z.string(),
  name: z.string(),
  iconUrl: z.string().optional(),
})

export const IssueStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  statusCategory: z
    .object({
      id: z.number(),
      name: z.string(),
      key: z.string(),
    })
    .optional(),
})

export const ProjectSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  description: z.string().optional(),
  projectTypeKey: z.string(),
  lead: JiraUserSchema.optional(),
})

export const CreateIssueSchema = z.object({
  projectKey: z.string(),
  summary: z.string().min(1).max(255),
  description: z.string().optional(),
  issueType: z.string(),
  assignee: z.string().optional(), // accountId
  priority: z.string().optional(), // priority id
  labels: z.array(z.string()).optional(),
  components: z.array(z.string()).optional(), // component names
  fixVersions: z.array(z.string()).optional(), // version names
  dueDate: z.string().optional(), // YYYY-MM-DD format
  parentKey: z.string().optional(), // For subtasks
})

export const UpdateIssueSchema = z.object({
  summary: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  assignee: z.string().optional(),
  priority: z.string().optional(),
  labels: z.array(z.string()).optional(),
  components: z.array(z.string()).optional(),
  fixVersions: z.array(z.string()).optional(),
  dueDate: z.string().optional(),
  status: z.string().optional(), // status id
})

export const SearchIssuesSchema = z.object({
  jql: z.string().optional(),
  projectKey: z.string().optional(),
  assignee: z.string().optional(),
  status: z.string().optional(),
  issueType: z.string().optional(),
  priority: z.string().optional(),
  labels: z.array(z.string()).optional(),
  createdAfter: z.string().optional(), // ISO date
  createdBefore: z.string().optional(), // ISO date
  maxResults: z.number().min(1).max(100).default(50),
  startAt: z.number().min(0).default(0),
})

export const CreateProjectSchema = z.object({
  key: z
    .string()
    .min(2)
    .max(10)
    .regex(/^[A-Z][A-Z0-9]*$/),
  name: z.string().min(1).max(80),
  description: z.string().optional(),
  projectTypeKey: z.enum(['software', 'service_desk', 'business']).default('software'),
  projectTemplateKey: z.string().optional(),
  lead: z.string().optional(), // accountId
  url: z.string().url().optional(),
  assigneeType: z.enum(['PROJECT_LEAD', 'UNASSIGNED']).default('PROJECT_LEAD'),
})

// Response schemas
export const IssueResponseSchema = z.object({
  id: z.string(),
  key: z.string(),
  summary: z.string(),
  description: z.string().optional(),
  status: IssueStatusSchema,
  priority: IssuePrioritySchema.optional(),
  issueType: IssueTypeSchema,
  assignee: JiraUserSchema.optional(),
  reporter: JiraUserSchema.optional(),
  project: ProjectSchema,
  created: z.string(),
  updated: z.string(),
  dueDate: z.string().optional(),
  labels: z.array(z.string()),
  components: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
  fixVersions: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
})

export const ProjectResponseSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  description: z.string().optional(),
  projectTypeKey: z.string(),
  lead: JiraUserSchema.optional(),
  url: z.string().optional(),
  created: z.string().optional(),
  updated: z.string().optional(),
})

export const SearchResultsSchema = z.object({
  issues: z.array(IssueResponseSchema),
  total: z.number(),
  startAt: z.number(),
  maxResults: z.number(),
})

export const TransitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  to: IssueStatusSchema,
})

// Export inferred types
export type JiraId = z.infer<typeof JiraIdSchema>
export type JiraUser = z.infer<typeof JiraUserSchema>
export type IssueType = z.infer<typeof IssueTypeSchema>
export type IssuePriority = z.infer<typeof IssuePrioritySchema>
export type IssueStatus = z.infer<typeof IssueStatusSchema>
export type Project = z.infer<typeof ProjectSchema>
export type CreateIssueInput = z.infer<typeof CreateIssueSchema>
export type UpdateIssueInput = z.infer<typeof UpdateIssueSchema>
export type SearchIssuesInput = z.infer<typeof SearchIssuesSchema>
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>
export type IssueResponse = z.infer<typeof IssueResponseSchema>
export type ProjectResponse = z.infer<typeof ProjectResponseSchema>
export type SearchResults = z.infer<typeof SearchResultsSchema>
export type Transition = z.infer<typeof TransitionSchema>

// Tool parameter types
export interface CreateIssueParams extends CreateIssueInput {}
export interface GetIssueParams {
  issueKey: string
}
export interface UpdateIssueParams extends UpdateIssueInput {
  issueKey: string
}
export interface SearchIssuesParams extends SearchIssuesInput {}
export interface CreateProjectParams extends CreateProjectInput {}
export interface GetProjectsParams {
  maxResults?: number
  startAt?: number
}
export interface GetIssueTransitionsParams {
  issueKey: string
}
export interface TransitionIssueParams {
  issueKey: string
  transitionId: string
}
export interface GetUserParams {
  accountId?: string // If not provided, returns current user
}
