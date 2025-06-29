import { z } from 'zod'

// Base schemas
export const TeamIdSchema = z.string().optional()
export const SlugSchema = z.string().optional()

// Project schemas
export const CreateProjectSchema = z.object({
  name: z.string().min(1).max(255),
  framework: z.string().optional(),
  gitRepository: z
    .object({
      type: z.enum(['github', 'gitlab', 'bitbucket']),
      repo: z.string(),
    })
    .optional(),
  publicSource: z.boolean().optional(),
  rootDirectory: z.string().optional(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

export const UpdateProjectSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  framework: z.string().optional(),
  publicSource: z.boolean().optional(),
  rootDirectory: z.string().optional(),
})

export const GetProjectSchema = z.object({
  idOrName: z.string(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

export const ListProjectsSchema = z.object({
  teamId: TeamIdSchema,
  slug: SlugSchema,
  limit: z.number().min(1).max(100).optional(),
  since: z.number().optional(),
  until: z.number().optional(),
})

export const DeleteProjectSchema = z.object({
  idOrName: z.string(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

// Deployment schemas
export const CreateDeploymentSchema = z.object({
  name: z.string(),
  files: z.array(
    z.object({
      file: z.string(),
      data: z.string(),
    }),
  ),
  projectSettings: z
    .object({
      framework: z.string().optional(),
      buildCommand: z.string().optional(),
      outputDirectory: z.string().optional(),
      installCommand: z.string().optional(),
      devCommand: z.string().optional(),
    })
    .optional(),
  target: z.enum(['staging', 'production']).optional(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

export const GetDeploymentSchema = z.object({
  idOrUrl: z.string(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

export const ListDeploymentsSchema = z.object({
  projectId: z.string().optional(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
  limit: z.number().min(1).max(100).optional(),
  since: z.number().optional(),
  until: z.number().optional(),
  state: z.string().optional(),
  target: z.enum(['staging', 'production']).optional(),
})

export const CancelDeploymentSchema = z.object({
  id: z.string(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

// Domain schemas
export const AddProjectDomainSchema = z.object({
  idOrName: z.string(),
  name: z.string(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

export const ListProjectDomainsSchema = z.object({
  idOrName: z.string(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

export const RemoveProjectDomainSchema = z.object({
  idOrName: z.string(),
  domain: z.string(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

// Environment Variable schemas
export const CreateProjectEnvSchema = z.object({
  idOrName: z.string(),
  key: z.string(),
  value: z.string(),
  target: z.array(z.enum(['production', 'preview', 'development'])),
  type: z.enum(['plain', 'secret']).optional(),
  comment: z.string().optional(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

export const ListProjectEnvsSchema = z.object({
  idOrName: z.string(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

export const UpdateProjectEnvSchema = z.object({
  idOrName: z.string(),
  envId: z.string(),
  key: z.string().optional(),
  value: z.string().optional(),
  target: z.array(z.enum(['production', 'preview', 'development'])).optional(),
  comment: z.string().optional(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

export const DeleteProjectEnvSchema = z.object({
  idOrName: z.string(),
  envId: z.string(),
  teamId: TeamIdSchema,
  slug: SlugSchema,
})

// Team schemas
export const GetTeamSchema = z.object({
  teamId: z.string(),
})

export const ListTeamMembersSchema = z.object({
  teamId: z.string(),
  limit: z.number().min(1).max(100).optional(),
})

// Response schemas
export const ProjectSchema = z.object({
  name: z.string(),
  id: z.string(),
  accountId: z.string(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  framework: z.string().nullable().optional(),
  publicSource: z.boolean().nullable().optional(),
  rootDirectory: z.string().nullable().optional(),
  targets: z.record(z.unknown()).optional(),
  latestDeployments: z
    .array(
      z.object({
        name: z.string(),
        state: z.string(),
        uid: z.string(),
        url: z.string(),
        created: z.number(),
        target: z.string().nullable().optional(),
      }),
    )
    .optional(),
})

export const DeploymentSchema = z.object({
  name: z.string(),
  type: z.string(),
  state: z.string(),
  createdAt: z.number().optional(),
  uid: z.string(),
  url: z.string(),
  created: z.number(),
  target: z.string().nullable().optional(),
  projectId: z.string().optional(),
  meta: z.record(z.unknown()).optional(),
  inspectorUrl: z.string().nullable().optional(),
  creator: z
    .object({
      uid: z.string(),
      username: z.string().optional(),
      email: z.string().optional(),
    })
    .optional(),
})

export const DomainSchema = z.object({
  name: z.string(),
  projectId: z.string(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
  apexName: z.string(),
  verified: z.boolean(),
  redirect: z.string().nullable().optional(),
  redirectStatusCode: z.number().nullable().optional(),
  gitBranch: z.string().nullable().optional(),
})

export const EnvironmentVariableResponseSchema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  target: z.array(z.string()),
  configurationId: z.string().optional(),
  comment: z.string().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
  createdBy: z.string(),
  updatedBy: z.string(),
})

export const TeamSchema = z.object({
  name: z.string().nullable(),
  slug: z.string(),
  id: z.string(),
  createdAt: z.number().optional(),
  created: z.string(),
  membership: z.object({
    teamId: z.string().optional(),
    createdAt: z.number(),
    uid: z.string().optional(),
    created: z.number(),
    confirmed: z.boolean(),
    role: z.string(),
    confirmationDate: z.number().optional(),
    accessRequestedAt: z.number().optional(),
  }),
  avatar: z.string().nullable().optional(),
})

export const MemberResponseSchema = z.object({
  uid: z.string(),
  role: z.string(),
  email: z.string(),
  username: z.string(),
  name: z.string().optional(),
  avatar: z.string().optional(),
  confirmed: z.boolean(),
  accessRequestedAt: z.number().optional(),
  createdAt: z.number(),
  teamId: z.string(),
})

// Export inferred types
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>
export type GetProjectInput = z.infer<typeof GetProjectSchema>
export type ListProjectsInput = z.infer<typeof ListProjectsSchema>
export type DeleteProjectInput = z.infer<typeof DeleteProjectSchema>

export type CreateDeploymentInput = z.infer<typeof CreateDeploymentSchema>
export type GetDeploymentInput = z.infer<typeof GetDeploymentSchema>
export type ListDeploymentsInput = z.infer<typeof ListDeploymentsSchema>
export type CancelDeploymentInput = z.infer<typeof CancelDeploymentSchema>

export type AddProjectDomainInput = z.infer<typeof AddProjectDomainSchema>
export type ListProjectDomainsInput = z.infer<typeof ListProjectDomainsSchema>
export type RemoveProjectDomainInput = z.infer<typeof RemoveProjectDomainSchema>

export type CreateProjectEnvInput = z.infer<typeof CreateProjectEnvSchema>
export type ListProjectEnvsInput = z.infer<typeof ListProjectEnvsSchema>
export type UpdateProjectEnvInput = z.infer<typeof UpdateProjectEnvSchema>
export type DeleteProjectEnvInput = z.infer<typeof DeleteProjectEnvSchema>

export type GetTeamInput = z.infer<typeof GetTeamSchema>
export type ListTeamMembersInput = z.infer<typeof ListTeamMembersSchema>

export type ProjectResponse = z.infer<typeof ProjectSchema>
export type DeploymentResponse = z.infer<typeof DeploymentSchema>
export type DomainResponse = z.infer<typeof DomainSchema>
export type EnvironmentVariableResponse = z.infer<typeof EnvironmentVariableResponseSchema>
export type TeamResponse = z.infer<typeof TeamSchema>
export type MemberResponse = z.infer<typeof MemberResponseSchema>

// Tool parameter types
export interface CreateProjectParams extends CreateProjectInput {}
export interface UpdateProjectParams extends UpdateProjectInput {
  idOrName: string
}
export interface GetProjectParams extends GetProjectInput {}
export interface ListProjectsParams extends ListProjectsInput {}
export interface DeleteProjectParams extends DeleteProjectInput {}

export interface CreateDeploymentParams extends CreateDeploymentInput {}
export interface GetDeploymentParams extends GetDeploymentInput {}
export interface ListDeploymentsParams extends ListDeploymentsInput {}
export interface CancelDeploymentParams extends CancelDeploymentInput {}

export interface AddProjectDomainParams extends AddProjectDomainInput {}
export interface ListProjectDomainsParams extends ListProjectDomainsInput {}
export interface RemoveProjectDomainParams extends RemoveProjectDomainInput {}

export interface CreateProjectEnvParams extends CreateProjectEnvInput {}
export interface ListProjectEnvsParams extends ListProjectEnvsInput {}
export interface UpdateProjectEnvParams extends UpdateProjectEnvInput {}
export interface DeleteProjectEnvParams extends DeleteProjectEnvInput {}

export interface GetTeamParams extends GetTeamInput {}
export interface ListTeamMembersParams extends ListTeamMembersInput {}
