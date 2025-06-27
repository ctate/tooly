import { z } from 'zod'
import {
  CreateIssueSchema,
  UpdateIssueSchema,
  SearchIssuesSchema,
  CreateProjectSchema,
  type CreateIssueParams,
  type GetIssueParams,
  type UpdateIssueParams,
  type SearchIssuesParams,
  type CreateProjectParams,
  type GetTeamsParams,
  type GetUserParams,
} from './types.js'

// Tool definitions for OpenAI/Anthropic function calling
export const createIssueTool = {
  name: 'createIssue',
  description: 'Create a new issue in Linear',
  parameters: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'The title of the issue',
        minLength: 1,
        maxLength: 255,
      },
      description: {
        type: 'string',
        description: 'The description of the issue (supports Markdown)',
      },
      teamId: {
        type: 'string',
        description: 'The ID of the team to create the issue in',
      },
      assigneeId: {
        type: 'string',
        description: 'The ID of the user to assign the issue to',
      },
      priority: {
        type: 'number',
        description: 'The priority of the issue (0=None, 1=Urgent, 2=High, 3=Medium, 4=Low)',
        enum: [0, 1, 2, 3, 4],
      },
      stateId: {
        type: 'string',
        description: 'The ID of the workflow state for the issue',
      },
      projectId: {
        type: 'string',
        description: 'The ID of the project to add the issue to',
      },
      labelIds: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of label IDs to apply to the issue',
      },
      estimate: {
        type: 'number',
        description: 'The estimate for the issue (0-40 story points)',
        minimum: 0,
        maximum: 40,
      },
      dueDate: {
        type: 'string',
        description: 'The due date for the issue (ISO 8601 date string)',
      },
    },
    required: ['title', 'teamId'],
  },
} as const

export const getIssueTool = {
  name: 'getIssue',
  description: 'Get details of a specific issue by ID or identifier',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: "The issue ID (UUID) or identifier (e.g., 'LIN-123')",
      },
    },
    required: ['id'],
  },
} as const

export const updateIssueTool = {
  name: 'updateIssue',
  description: 'Update an existing issue',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: "The issue ID (UUID) or identifier (e.g., 'LIN-123')",
      },
      title: {
        type: 'string',
        description: 'The new title of the issue',
        minLength: 1,
        maxLength: 255,
      },
      description: {
        type: 'string',
        description: 'The new description of the issue (supports Markdown)',
      },
      assigneeId: {
        type: 'string',
        description: 'The ID of the user to assign the issue to',
      },
      priority: {
        type: 'number',
        description: 'The priority of the issue (0=None, 1=Urgent, 2=High, 3=Medium, 4=Low)',
        enum: [0, 1, 2, 3, 4],
      },
      stateId: {
        type: 'string',
        description: 'The ID of the workflow state for the issue',
      },
      projectId: {
        type: 'string',
        description: 'The ID of the project to add the issue to',
      },
      labelIds: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of label IDs to apply to the issue',
      },
      estimate: {
        type: 'number',
        description: 'The estimate for the issue (0-40 story points)',
        minimum: 0,
        maximum: 40,
      },
      dueDate: {
        type: 'string',
        description: 'The due date for the issue (ISO 8601 date string)',
      },
    },
    required: ['id'],
  },
} as const

export const searchIssuesTool = {
  name: 'searchIssues',
  description: 'Search for issues using various filters',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Text query to search in issue titles and descriptions',
      },
      teamId: {
        type: 'string',
        description: 'Filter by team ID',
      },
      assigneeId: {
        type: 'string',
        description: 'Filter by assignee user ID',
      },
      stateId: {
        type: 'string',
        description: 'Filter by workflow state ID',
      },
      projectId: {
        type: 'string',
        description: 'Filter by project ID',
      },
      priority: {
        type: 'number',
        description: 'Filter by priority (0=None, 1=Urgent, 2=High, 3=Medium, 4=Low)',
        enum: [0, 1, 2, 3, 4],
      },
      limit: {
        type: 'number',
        description: 'Maximum number of issues to return (1-100, default: 25)',
        minimum: 1,
        maximum: 100,
        default: 25,
      },
    },
    required: [],
  },
} as const

export const createProjectTool = {
  name: 'createProject',
  description: 'Create a new project in Linear',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the project',
        minLength: 1,
        maxLength: 255,
      },
      description: {
        type: 'string',
        description: 'The description of the project (supports Markdown)',
      },
      status: {
        type: 'string',
        description: 'The status of the project',
        enum: ['backlog', 'planned', 'started', 'paused', 'completed', 'canceled'],
      },
      leadId: {
        type: 'string',
        description: 'The ID of the user who leads the project',
      },
      memberIds: {
        type: 'array',
        items: { type: 'string' },
        description: 'Array of user IDs for project members',
      },
      targetDate: {
        type: 'string',
        description: 'The target completion date (ISO 8601 date string)',
      },
    },
    required: ['name'],
  },
} as const

export const getTeamsTool = {
  name: 'getTeams',
  description: 'Get all teams in the Linear workspace',
  parameters: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        description: 'Maximum number of teams to return (default: 50)',
        minimum: 1,
        maximum: 100,
        default: 50,
      },
    },
    required: [],
  },
} as const

export const getUserTool = {
  name: 'getUser',
  description: 'Get user details (current user if no ID provided)',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The user ID (if not provided, returns current user)',
      },
    },
    required: [],
  },
} as const

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
  getTeams: z.object({
    limit: z.number().min(1).max(100).default(50).optional(),
  }),
  getUser: z.object({ id: z.string().optional() }),
} as const
