import { PayPalHandlers } from './handlers.js'
import { paypalTools, toolParameterSchemas } from './tools/index.js'
import {
  BaseToolManager,
  createAITools as coreCreateVercelAITools,
  createOpenAIFunctions as coreCreateOpenAIFunctions,
  createAnthropicTools as coreCreateAnthropicTools,
  bindHandlerMethods,
} from '@tooly/core'
import type { PayPalEnvironment } from './types.js'

export * from './types.js'
export * from './tools/index.js'
export * from './handlers.js'

/**
 * Main PayPal Tools class for AI SDK integration
 */
export class PayPalTools extends BaseToolManager<typeof toolParameterSchemas, typeof paypalTools> {
  private handlers: PayPalHandlers

  constructor(clientId: string, clientSecret: string, environment: PayPalEnvironment = 'sandbox') {
    super(paypalTools, toolParameterSchemas)
    this.handlers = new PayPalHandlers(clientId, clientSecret, environment)
  }

  /**
   * Execute tool function implementation
   */
  protected async executeToolFunction(name: string, params: any): Promise<any> {
    switch (name) {
      case 'createOrder':
        return this.handlers.createOrder(params)
      case 'showOrderDetails':
        return this.handlers.showOrderDetails(params)
      case 'captureOrder':
        return this.handlers.captureOrder(params)
      case 'authorizeOrder':
        return this.handlers.authorizeOrder(params)
      case 'showAuthorizedPayment':
        return this.handlers.showAuthorizedPayment(params)
      case 'captureAuthorizedPayment':
        return this.handlers.captureAuthorizedPayment(params)
      case 'voidAuthorizedPayment':
        return this.handlers.voidAuthorizedPayment(params)
      case 'reauthorizePayment':
        return this.handlers.reauthorizePayment(params)
      case 'showCapturedPayment':
        return this.handlers.showCapturedPayment(params)
      case 'refundCapturedPayment':
        return this.handlers.refundCapturedPayment(params)
      case 'showRefundDetails':
        return this.handlers.showRefundDetails(params)
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
export function createAITools(clientId: string, clientSecret: string, environment: PayPalEnvironment = 'sandbox') {
  const paypalTools = new PayPalTools(clientId, clientSecret, environment)
  const handlers = paypalTools.getHandlers()

  const toolDescriptions = {
    createOrder: 'Create a new payment order',
    showOrderDetails: 'Get order details by ID',
    captureOrder: 'Capture payment for an order',
    authorizeOrder: 'Authorize payment for an order',
    showAuthorizedPayment: 'Show authorized payment details',
    captureAuthorizedPayment: 'Capture an authorized payment',
    voidAuthorizedPayment: 'Void an authorized payment',
    reauthorizePayment: 'Reauthorize an authorized payment',
    showCapturedPayment: 'Show captured payment details',
    refundCapturedPayment: 'Refund a captured payment',
    showRefundDetails: 'Show refund details',
  }

  const boundMethods = bindHandlerMethods(handlers, [
    'createOrder',
    'showOrderDetails',
    'captureOrder',
    'authorizeOrder',
    'showAuthorizedPayment',
    'captureAuthorizedPayment',
    'voidAuthorizedPayment',
    'reauthorizePayment',
    'showCapturedPayment',
    'refundCapturedPayment',
    'showRefundDetails',
  ])

  return coreCreateVercelAITools(paypalTools, boundMethods, toolDescriptions)
}

/**
 * Helper function to create OpenAI function calling setup
 */
export function createOpenAIFunctions(
  clientId: string,
  clientSecret: string,
  environment: PayPalEnvironment = 'sandbox',
) {
  const paypalTools = new PayPalTools(clientId, clientSecret, environment)
  return coreCreateOpenAIFunctions(paypalTools)
}

/**
 * Helper function to create Anthropic function calling setup
 */
export function createAnthropicTools(
  clientId: string,
  clientSecret: string,
  environment: PayPalEnvironment = 'sandbox',
) {
  const paypalTools = new PayPalTools(clientId, clientSecret, environment)
  return coreCreateAnthropicTools(paypalTools)
}

// Default export
export default PayPalTools
