import { ResendHandlers } from './handlers.js'
import { resendTools, toolParameterSchemas } from './tools.js'
import {
  BaseToolManager,
  createAITools as coreCreateVercelAITools,
  createOpenAIFunctions as coreCreateOpenAIFunctions,
  createAnthropicTools as coreCreateAnthropicTools,
  bindHandlerMethods,
} from '@tooly/core'

export * from './types.js'
export * from './tools.js'
export * from './handlers.js'

/**
 * Main Resend Tools class for AI SDK integration
 */
export class ResendTools extends BaseToolManager<typeof toolParameterSchemas, typeof resendTools> {
  private handlers: ResendHandlers

  constructor(apiKey: string) {
    super(resendTools, toolParameterSchemas)
    this.handlers = new ResendHandlers(apiKey)
  }

  /**
   * Execute tool function implementation
   */
  protected async executeToolFunction(name: string, params: any): Promise<any> {
    switch (name) {
      case 'sendEmail':
        return this.handlers.sendEmail(params)
      case 'sendBatchEmails':
        return this.handlers.sendBatchEmails(params)
      case 'retrieveEmail':
        return this.handlers.retrieveEmail(params)
      case 'updateEmail':
        return this.handlers.updateEmail(params)
      case 'cancelEmail':
        return this.handlers.cancelEmail(params)
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
  const resendTools = new ResendTools(apiKey)
  const handlers = resendTools.getHandlers()

  const toolDescriptions = {
    sendEmail: 'Send a single email using Resend',
    sendBatchEmails: 'Send up to 100 batch emails at once using Resend',
    retrieveEmail: 'Retrieve details of a single email by ID',
    updateEmail: 'Update a scheduled email',
    cancelEmail: 'Cancel a scheduled email',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'sendEmail',
    'sendBatchEmails',
    'retrieveEmail',
    'updateEmail',
    'cancelEmail',
  ])

  return coreCreateVercelAITools(resendTools, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(apiKey: string) {
  const resendTools = new ResendTools(apiKey)
  return coreCreateOpenAIFunctions(resendTools)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(apiKey: string) {
  const resendTools = new ResendTools(apiKey)
  return coreCreateAnthropicTools(resendTools)
}

// Default export
export default ResendTools
