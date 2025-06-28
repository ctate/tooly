import { TwilioHandlers } from './handlers.js'
import { twilioTools, toolParameterSchemas } from './tools/index.js'
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
 * Main Twilio Tools class for AI SDK integration
 */
export class TwilioTools extends BaseToolManager<typeof toolParameterSchemas, typeof twilioTools> {
  private handlers: TwilioHandlers

  constructor(accountSid: string, authToken: string) {
    super(twilioTools, toolParameterSchemas)
    this.handlers = new TwilioHandlers(accountSid, authToken)
  }

  /**
   * Execute tool function implementation
   */
  protected async executeToolFunction(name: string, params: any): Promise<any> {
    switch (name) {
      case 'sendSms':
        return this.handlers.sendSms(params)
      case 'sendWhatsApp':
        return this.handlers.sendWhatsApp(params)
      case 'makeCall':
        return this.handlers.makeCall(params)
      case 'getCallStatus':
        return this.handlers.getCallStatus(params)
      case 'getMessageStatus':
        return this.handlers.getMessageStatus(params)
      case 'listMessages':
        return this.handlers.listMessages(params)
      case 'listCalls':
        return this.handlers.listCalls(params)
      case 'getPhoneNumber':
        return this.handlers.getPhoneNumber(params)
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
export function createAITools(accountSid: string, authToken: string) {
  const twilioTools = new TwilioTools(accountSid, authToken)
  const handlers = twilioTools.getHandlers()

  const toolDescriptions = {
    sendSms: 'Send an SMS text message using Twilio',
    sendWhatsApp: 'Send a WhatsApp message using Twilio',
    makeCall: 'Make a phone call using Twilio',
    getCallStatus: 'Get the status and details of a call',
    getMessageStatus: 'Get the status and details of a message',
    listMessages: 'List messages with optional filtering',
    listCalls: 'List calls with optional filtering',
    getPhoneNumber: 'Get phone number details and validation',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'sendSms',
    'sendWhatsApp',
    'makeCall',
    'getCallStatus',
    'getMessageStatus',
    'listMessages',
    'listCalls',
    'getPhoneNumber',
  ])

  return coreCreateVercelAITools(twilioTools, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(accountSid: string, authToken: string) {
  const twilioTools = new TwilioTools(accountSid, authToken)
  return coreCreateOpenAIFunctions(twilioTools)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(accountSid: string, authToken: string) {
  const twilioTools = new TwilioTools(accountSid, authToken)
  return coreCreateAnthropicTools(twilioTools)
}

// Default export
export default TwilioTools
