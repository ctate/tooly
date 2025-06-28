import { NotionHandlers } from './handlers.js'
import { notionTools, toolParameterSchemas } from './tools/index.js'
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
 * Main Notion Tools class for AI SDK integration
 */
export class NotionTools extends BaseToolManager<typeof toolParameterSchemas, typeof notionTools> {
  private handlers: NotionHandlers

  constructor(apiKey: string) {
    super(notionTools, toolParameterSchemas)
    this.handlers = new NotionHandlers(apiKey)
  }

  /**
   * Execute tool function implementation
   */
  protected async executeToolFunction(name: string, params: any): Promise<any> {
    switch (name) {
      case 'createPage':
        return this.handlers.createPage(params)
      case 'getPage':
        return this.handlers.getPage(params)
      case 'updatePage':
        return this.handlers.updatePage(params)
      case 'searchPages':
        return this.handlers.searchPages(params)
      case 'createDatabase':
        return this.handlers.createDatabase(params)
      case 'getDatabase':
        return this.handlers.getDatabase(params)
      case 'updateDatabase':
        return this.handlers.updateDatabase(params)
      case 'queryDatabase':
        return this.handlers.queryDatabase(params)
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
export function createAITools(apiKey: string) {
  const notionTools = new NotionTools(apiKey)
  const handlers = notionTools.getHandlers()

  const toolDescriptions = {
    createPage: 'Create a new page in Notion',
    getPage: 'Get details of a specific page by ID',
    updatePage: 'Update an existing page',
    searchPages: 'Search for pages and databases',
    createDatabase: 'Create a new database in Notion',
    getDatabase: 'Get details of a specific database by ID',
    updateDatabase: 'Update an existing database',
    queryDatabase: 'Query database entries',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'createPage',
    'getPage',
    'updatePage',
    'searchPages',
    'createDatabase',
    'getDatabase',
    'updateDatabase',
    'queryDatabase',
  ])

  return coreCreateVercelAITools(notionTools, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(apiKey: string) {
  const notionTools = new NotionTools(apiKey)
  return coreCreateOpenAIFunctions(notionTools)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(apiKey: string) {
  const notionTools = new NotionTools(apiKey)
  return coreCreateAnthropicTools(notionTools)
}

// Default export
export default NotionTools
