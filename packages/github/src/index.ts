import { GitHubHandlers } from './handlers.js'
import { githubTools, toolParameterSchemas } from './tools/index.js'
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
 * Main GitHub Tools class for AI SDK integration
 */
export class GitHubTools extends BaseToolManager<typeof toolParameterSchemas, typeof githubTools> {
  private handlers: GitHubHandlers

  constructor(authToken: string) {
    super(githubTools, toolParameterSchemas)
    this.handlers = new GitHubHandlers(authToken)
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
      case 'getRepository':
        return this.handlers.getRepository(params)
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
export function createAITools(authToken: string) {
  const githubToolsInstance = new GitHubTools(authToken)
  const handlers = githubToolsInstance.getHandlers()

  const toolDescriptions = {
    createIssue: 'Create a new issue in a GitHub repository',
    getIssue: 'Get details of a specific issue by number',
    updateIssue: 'Update an existing issue',
    searchIssues: 'Search for issues using various filters',
    getRepository: 'Get details of a GitHub repository',
    getUser: 'Get user details (authenticated user or by username)',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'createIssue',
    'getIssue',
    'updateIssue',
    'searchIssues',
    'getRepository',
    'getUser',
  ])

  return coreCreateVercelAITools(githubToolsInstance, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(authToken: string) {
  const githubTools = new GitHubTools(authToken)
  return coreCreateOpenAIFunctions(githubTools)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(authToken: string) {
  const githubTools = new GitHubTools(authToken)
  return coreCreateAnthropicTools(githubTools)
}

// Default export
export default GitHubTools
