import { VercelHandlers } from './handlers.js'
import { vercelTools, toolParameterSchemas } from './tools/index.js'
import {
  CreateProjectSchema,
  GetProjectSchema,
  ListProjectsSchema,
  UpdateProjectSchema,
  DeleteProjectSchema,
  GetDeploymentSchema,
  ListDeploymentsSchema,
  ListProjectDomainsSchema,
  GetTeamSchema,
} from './types.js'
import {
  BaseToolManager,
  createAITools as coreCreateVercelAITools,
  createOpenAIFunctions as coreCreateOpenAIFunctions,
  createAnthropicTools as coreCreateAnthropicTools,
  bindHandlerMethods,
} from '@tooly/core'

export * from './types.js'
export * from './tools/index.js'
export * from './handlers.js'

/**
 * Main Vercel Tools class for AI SDK integration
 */
export class VercelTools extends BaseToolManager<typeof toolParameterSchemas, typeof vercelTools> {
  private handlers: VercelHandlers

  constructor(bearerToken: string) {
    super(vercelTools, toolParameterSchemas)
    this.handlers = new VercelHandlers(bearerToken)
  }

  /**
   * Execute tool function implementation
   */
  protected async executeToolFunction(name: string, params: unknown): Promise<unknown> {
    switch (name) {
      case 'createProject':
        return this.handlers.createProject(CreateProjectSchema.parse(params))
      case 'getProject':
        return this.handlers.getProject(GetProjectSchema.parse(params))
      case 'listProjects':
        return this.handlers.listProjects(ListProjectsSchema.parse(params))
      case 'updateProject':
        return this.handlers.updateProject({
          ...UpdateProjectSchema.parse(params),
          idOrName: (params as { idOrName: string }).idOrName,
        })
      case 'deleteProject':
        return this.handlers.deleteProject(DeleteProjectSchema.parse(params))
      case 'getDeployment':
        return this.handlers.getDeployment(GetDeploymentSchema.parse(params))
      case 'listDeployments':
        return this.handlers.listDeployments(ListDeploymentsSchema.parse(params))
      case 'listProjectDomains':
        return this.handlers.listProjectDomains(ListProjectDomainsSchema.parse(params))
      case 'getTeam':
        return this.handlers.getTeam(GetTeamSchema.parse(params))
      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  }

  /**
   * Get individual handlers for direct use
   */
  getHandlers() {
    return this.handlers
  }
}

/**
 * Create AI SDK compatible tools
 */
export function createAITools(bearerToken: string) {
  const vercelTools = new VercelTools(bearerToken)
  const handlers = vercelTools.getHandlers()

  const toolDescriptions = {
    createProject: 'Create a new Vercel project',
    getProject: 'Get details of a specific project by ID or name',
    listProjects: 'List all Vercel projects',
    updateProject: 'Update an existing project',
    deleteProject: 'Delete a project',
    getDeployment: 'Get details of a specific deployment by ID or URL',
    listDeployments: 'List deployments for a project or team',
    listProjectDomains: 'List domains for a specific project',
    getTeam: 'Get details of a specific team',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'createProject',
    'getProject',
    'listProjects',
    'updateProject',
    'deleteProject',
    'getDeployment',
    'listDeployments',
    'listProjectDomains',
    'getTeam',
  ])

  return coreCreateVercelAITools(vercelTools, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(bearerToken: string) {
  const vercelTools = new VercelTools(bearerToken)
  return coreCreateOpenAIFunctions(vercelTools)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(bearerToken: string) {
  const vercelTools = new VercelTools(bearerToken)
  return coreCreateAnthropicTools(vercelTools)
}

// Default export
export default VercelTools
