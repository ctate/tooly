import { StripeHandlers } from './handlers.js'
import { stripeTools, toolParameterSchemas } from './tools/index.js'
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
 * Main Stripe Tools class for AI SDK integration
 */
export class StripeTools extends BaseToolManager<typeof toolParameterSchemas, typeof stripeTools> {
  private handlers: StripeHandlers

  constructor(apiKey: string, options?: any) {
    super(stripeTools, toolParameterSchemas)
    this.handlers = new StripeHandlers(apiKey, options)
  }

  /**
   * Execute tool function implementation
   */
  protected async executeToolFunction(name: string, params: any): Promise<any> {
    switch (name) {
      case 'createCustomer':
        return this.handlers.createCustomer(params)
      case 'getCustomer':
        return this.handlers.getCustomer(params)
      case 'listCustomers':
        return this.handlers.listCustomers(params)
      case 'createPaymentIntent':
        return this.handlers.createPaymentIntent(params)
      case 'getPaymentIntent':
        return this.handlers.getPaymentIntent(params)
      case 'createInvoice':
        return this.handlers.createInvoice(params)
      case 'getInvoice':
        return this.handlers.getInvoice(params)
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
export function createAITools(apiKey: string, options?: any) {
  const stripeTools = new StripeTools(apiKey, options)
  const handlers = stripeTools.getHandlers()

  const toolDescriptions = {
    createCustomer: 'Create a new customer in Stripe',
    getCustomer: 'Get details of a specific customer by ID',
    listCustomers: 'List customers with optional filtering',
    createPaymentIntent: 'Create a payment intent to process a payment',
    getPaymentIntent: 'Get details of a specific payment intent by ID',
    createInvoice: 'Create an invoice for a customer',
    getInvoice: 'Get details of a specific invoice by ID',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'createCustomer',
    'getCustomer',
    'listCustomers',
    'createPaymentIntent',
    'getPaymentIntent',
    'createInvoice',
    'getInvoice',
  ])

  return coreCreateVercelAITools(stripeTools, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(apiKey: string, options?: any) {
  const stripeTools = new StripeTools(apiKey, options)
  return coreCreateOpenAIFunctions(stripeTools)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(apiKey: string, options?: any) {
  const stripeTools = new StripeTools(apiKey, options)
  return coreCreateAnthropicTools(stripeTools)
}

// Default export
export default StripeTools
