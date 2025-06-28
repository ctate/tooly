import { z } from 'zod'

// Base types
export const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string().optional(),
  html_url: z.string().optional(),
  email: z.string().email().optional(),
  name: z.string().optional(),
})

export const GitHubRepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  owner: GitHubUserSchema,
  description: z.string().optional(),
  html_url: z.string(),
  clone_url: z.string(),
  default_branch: z.string(),
  private: z.boolean(),
  language: z.string().optional(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})

// Issue schemas
export const GitHubLabelSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  description: z.string().optional(),
})

export const GitHubIssueStateSchema = z.enum(['open', 'closed'])

export const CreateIssueSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  title: z.string().min(1).max(255),
  body: z.string().optional(),
  labels: z.array(z.string()).optional(),
  assignees: z.array(z.string()).optional(),
  milestone: z.number().optional(),
})

export const UpdateIssueSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  body: z.string().optional(),
  state: GitHubIssueStateSchema.optional(),
  labels: z.array(z.string()).optional(),
  assignees: z.array(z.string()).optional(),
  milestone: z.number().optional(),
})

export const SearchIssuesSchema = z.object({
  owner: z.string().optional(),
  repo: z.string().optional(),
  query: z.string().optional(),
  state: GitHubIssueStateSchema.optional(),
  labels: z.array(z.string()).optional(),
  assignee: z.string().optional(),
  creator: z.string().optional(),
  limit: z.number().min(1).max(100).default(25),
  sort: z.enum(['created', 'updated', 'comments']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
})

// Pull Request schemas
export const GitHubPullRequestStateSchema = z.enum(['open', 'closed', 'merged'])

export const CreatePullRequestSchema = z.object({
  owner: z.string(),
  repo: z.string(),
  title: z.string().min(1).max(255),
  head: z.string(), // branch name
  base: z.string(), // branch name
  body: z.string().optional(),
  maintainer_can_modify: z.boolean().optional(),
  draft: z.boolean().optional(),
})

export const UpdatePullRequestSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  body: z.string().optional(),
  state: z.enum(['open', 'closed']).optional(),
  base: z.string().optional(),
  maintainer_can_modify: z.boolean().optional(),
})

export const SearchPullRequestsSchema = z.object({
  owner: z.string().optional(),
  repo: z.string().optional(),
  query: z.string().optional(),
  state: GitHubPullRequestStateSchema.optional(),
  head: z.string().optional(),
  base: z.string().optional(),
  limit: z.number().min(1).max(100).default(25),
  sort: z.enum(['created', 'updated', 'popularity']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
})

// Repository schemas
export const CreateRepositorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  private: z.boolean().default(false),
  auto_init: z.boolean().default(false),
  gitignore_template: z.string().optional(),
  license_template: z.string().optional(),
  allow_squash_merge: z.boolean().default(true),
  allow_merge_commit: z.boolean().default(true),
  allow_rebase_merge: z.boolean().default(true),
  delete_branch_on_merge: z.boolean().default(false),
  has_issues: z.boolean().default(true),
  has_projects: z.boolean().default(true),
  has_wiki: z.boolean().default(true),
})

export const ListRepositoriesSchema = z.object({
  owner: z.string().optional(),
  type: z.enum(['all', 'owner', 'public', 'private', 'member']).default('all'),
  sort: z.enum(['created', 'updated', 'pushed', 'full_name']).default('created'),
  direction: z.enum(['asc', 'desc']).default('desc'),
  per_page: z.number().min(1).max(100).default(30),
  page: z.number().min(1).default(1),
})

// Response schemas
export const GitHubIssueSchema = z.object({
  id: z.number(),
  number: z.number(),
  title: z.string(),
  body: z.string().optional(),
  state: GitHubIssueStateSchema,
  user: GitHubUserSchema,
  assignees: z.array(GitHubUserSchema),
  labels: z.array(GitHubLabelSchema),
  html_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  closed_at: z.string().optional(),
  repository: GitHubRepositorySchema.optional(),
})

export const GitHubPullRequestSchema = z.object({
  id: z.number(),
  number: z.number(),
  title: z.string(),
  body: z.string().optional(),
  state: GitHubPullRequestStateSchema,
  user: GitHubUserSchema,
  assignees: z.array(GitHubUserSchema),
  labels: z.array(GitHubLabelSchema),
  html_url: z.string(),
  head: z.object({
    ref: z.string(),
    sha: z.string(),
    repo: GitHubRepositorySchema.optional(),
  }),
  base: z.object({
    ref: z.string(),
    sha: z.string(),
    repo: GitHubRepositorySchema,
  }),
  merged: z.boolean(),
  merged_at: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  closed_at: z.string().optional(),
})

export const SearchIssuesResultSchema = z.object({
  total_count: z.number(),
  items: z.array(GitHubIssueSchema),
})

export const SearchPullRequestsResultSchema = z.object({
  total_count: z.number(),
  items: z.array(GitHubPullRequestSchema),
})

// Export inferred types
export type GitHubUser = z.infer<typeof GitHubUserSchema>
export type GitHubRepository = z.infer<typeof GitHubRepositorySchema>
export type GitHubLabel = z.infer<typeof GitHubLabelSchema>
export type GitHubIssue = z.infer<typeof GitHubIssueSchema>
export type GitHubPullRequest = z.infer<typeof GitHubPullRequestSchema>
export type GitHubIssueState = z.infer<typeof GitHubIssueStateSchema>
export type GitHubPullRequestState = z.infer<typeof GitHubPullRequestStateSchema>

export type CreateIssueInput = z.infer<typeof CreateIssueSchema>
export type UpdateIssueInput = z.infer<typeof UpdateIssueSchema>
export type SearchIssuesInput = z.infer<typeof SearchIssuesSchema>
export type CreatePullRequestInput = z.infer<typeof CreatePullRequestSchema>
export type UpdatePullRequestInput = z.infer<typeof UpdatePullRequestSchema>
export type SearchPullRequestsInput = z.infer<typeof SearchPullRequestsSchema>
export type CreateRepositoryInput = z.infer<typeof CreateRepositorySchema>
export type ListRepositoriesInput = z.infer<typeof ListRepositoriesSchema>
export type SearchIssuesResult = z.infer<typeof SearchIssuesResultSchema>
export type SearchPullRequestsResult = z.infer<typeof SearchPullRequestsResultSchema>

// Tool parameter types
export interface CreateIssueParams extends CreateIssueInput {}
export interface GetIssueParams {
  owner: string
  repo: string
  issue_number: number
}
export interface UpdateIssueParams extends UpdateIssueInput {
  owner: string
  repo: string
  issue_number: number
}
export interface SearchIssuesParams extends SearchIssuesInput {}
export interface CreatePullRequestParams extends CreatePullRequestInput {}
export interface GetPullRequestParams {
  owner: string
  repo: string
  pull_number: number
}
export interface UpdatePullRequestParams extends UpdatePullRequestInput {
  owner: string
  repo: string
  pull_number: number
}
export interface SearchPullRequestsParams extends SearchPullRequestsInput {}
export interface GetRepositoryParams {
  owner: string
  repo: string
}
export interface CreateRepositoryParams extends CreateRepositoryInput {}
export interface ListRepositoriesParams extends ListRepositoriesInput {}
export interface GetUserParams {
  username?: string // If not provided, returns authenticated user
}
