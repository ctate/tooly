import { LinearHandlers } from './handlers.js'
import { linearTools, toolParameterSchemas } from './tools.js'
import {
  BaseToolManager,
  createVercelAITools as coreCreateVercelAITools,
  createOpenAIFunctions as coreCreateOpenAIFunctions,
  createAnthropicTools as coreCreateAnthropicTools,
  bindHandlerMethods,
} from '@tooly/core'

export * from './types.js'
export * from './tools.js'
export * from './handlers.js'

/**
 * Main Linear Tools class for AI SDK integration
 */
export class LinearTools extends BaseToolManager<typeof toolParameterSchemas, typeof linearTools> {
  private handlers: LinearHandlers

  constructor(apiKey: string) {
    super(linearTools, toolParameterSchemas)
    this.handlers = new LinearHandlers(apiKey)
  }

  /**
   * Execute tool function implementation
   */
  protected async executeToolFunction(name: string, params: any): Promise<any> {
    switch (name) {
      case 'createIssue':
        return this.handlers.createIssue(params)
      case 'getIssue':
        return this.handlers.getIssue(params)
      case 'updateIssue':
        return this.handlers.updateIssue(params)
      case 'searchIssues':
        return this.handlers.searchIssues(params)
      case 'createProject':
        return this.handlers.createProject(params)
      case 'getTeams':
        return this.handlers.getTeams(params)
      case 'getUser':
        return this.handlers.getUser(params)
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
export function createVercelAITools(apiKey: string) {
  const linearTools = new LinearTools(apiKey)
  const handlers = linearTools.getHandlers()

  const toolDescriptions = {
    createIssue: 'Create a new issue in Linear',
    getIssue: 'Get details of a specific issue by ID or identifier',
    updateIssue: 'Update an existing issue',
    searchIssues: 'Search for issues using various filters',
    createProject: 'Create a new project in Linear',
    getTeams: 'Get all teams in the Linear workspace',
    getUser: 'Get user details (current user if no ID provided)',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'createIssue',
    'getIssue',
    'updateIssue',
    'searchIssues',
    'createProject',
    'getTeams',
    'getUser',
  ])

  return coreCreateVercelAITools(linearTools, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(apiKey: string) {
  const linearTools = new LinearTools(apiKey)
  return coreCreateOpenAIFunctions(linearTools)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(apiKey: string) {
  const linearTools = new LinearTools(apiKey)
  return coreCreateAnthropicTools(linearTools)
}

// Default export
export default LinearTools
