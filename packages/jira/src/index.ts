import { JiraHandlers, type JiraConfig } from './handlers.js'
import { jiraTools, toolParameterSchemas } from './tools/index.js'
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
 * Main JIRA Tools class for AI SDK integration
 */
export class JiraTools extends BaseToolManager<typeof toolParameterSchemas, typeof jiraTools> {
  private handlers: JiraHandlers

  constructor(config: JiraConfig) {
    super(jiraTools, toolParameterSchemas)
    this.handlers = new JiraHandlers(config)
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
      case 'getProjects':
        return this.handlers.getProjects(params)
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
export function createAITools(config: JiraConfig) {
  const jiraTools = new JiraTools(config)
  const handlers = jiraTools.getHandlers()

  const toolDescriptions = {
    createIssue: 'Create a new issue in JIRA',
    getIssue: 'Get details of a specific issue by key',
    updateIssue: 'Update an existing issue',
    searchIssues: 'Search for issues using JQL or filters',
    getProjects: 'Get all accessible JIRA projects',
    getUser: 'Get user details (current user if no ID provided)',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'createIssue',
    'getIssue',
    'updateIssue',
    'searchIssues',
    'getProjects',
    'getUser',
  ])

  return coreCreateVercelAITools(jiraTools, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(config: JiraConfig) {
  const jiraTools = new JiraTools(config)
  return coreCreateOpenAIFunctions(jiraTools)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(config: JiraConfig) {
  const jiraTools = new JiraTools(config)
  return coreCreateAnthropicTools(jiraTools)
}

// Default export
export default JiraTools
