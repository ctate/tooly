import { Client, Environment } from '@paypal/paypal-server-sdk'
import {
  createOrder,
  showOrderDetails,
  captureOrder,
  authorizeOrder,
  showAuthorizedPayment,
  captureAuthorizedPayment,
  voidAuthorizedPayment,
  reauthorizePayment,
  showCapturedPayment,
  refundCapturedPayment,
  showRefundDetails,
} from './tools/index.js'
import type {
  CreateOrderParams,
  ShowOrderDetailsParams,
  CaptureOrderParams,
  AuthorizeOrderParams,
  ShowAuthorizedPaymentParams,
  CaptureAuthorizedPaymentParams,
  VoidAuthorizedPaymentParams,
  ReauthorizePaymentParams,
  ShowCapturedPaymentParams,
  RefundCapturedPaymentParams,
  ShowRefundDetailsParams,
  OrderResponse,
  AuthorizationResponse,
  CaptureResponse,
  RefundResponse,
  PayPalEnvironment,
} from './types'

export class PayPalHandlers {
  private client: Client

  constructor(clientId: string, clientSecret: string, environment: PayPalEnvironment = 'sandbox') {
    this.client = new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: clientId,
        oAuthClientSecret: clientSecret,
      },
      timeout: 0,
      environment: environment === 'sandbox' ? Environment.Sandbox : Environment.Production,
    })
  }

  /**
   * Create a new order
   */
  async createOrder(params: CreateOrderParams): Promise<OrderResponse> {
    return createOrder(this.client, params)
  }

  /**
   * Show order details by ID
   */
  async showOrderDetails(params: ShowOrderDetailsParams): Promise<OrderResponse> {
    return showOrderDetails(this.client, params)
  }

  /**
   * Capture payment for an order
   */
  async captureOrder(params: CaptureOrderParams): Promise<OrderResponse> {
    return captureOrder(this.client, params)
  }

  /**
   * Authorize payment for an order
   */
  async authorizeOrder(params: AuthorizeOrderParams): Promise<OrderResponse> {
    return authorizeOrder(this.client, params)
  }

  /**
   * Show authorized payment details
   */
  async showAuthorizedPayment(params: ShowAuthorizedPaymentParams): Promise<AuthorizationResponse> {
    return showAuthorizedPayment(this.client, params)
  }

  /**
   * Capture an authorized payment
   */
  async captureAuthorizedPayment(params: CaptureAuthorizedPaymentParams): Promise<CaptureResponse> {
    return captureAuthorizedPayment(this.client, params)
  }

  /**
   * Void an authorized payment
   */
  async voidAuthorizedPayment(params: VoidAuthorizedPaymentParams): Promise<void> {
    return voidAuthorizedPayment(this.client, params)
  }

  /**
   * Reauthorize an authorized payment
   */
  async reauthorizePayment(params: ReauthorizePaymentParams): Promise<AuthorizationResponse> {
    return reauthorizePayment(this.client, params)
  }

  /**
   * Show captured payment details
   */
  async showCapturedPayment(params: ShowCapturedPaymentParams): Promise<CaptureResponse> {
    return showCapturedPayment(this.client, params)
  }

  /**
   * Refund a captured payment
   */
  async refundCapturedPayment(params: RefundCapturedPaymentParams): Promise<RefundResponse> {
    return refundCapturedPayment(this.client, params)
  }

  /**
   * Show refund details
   */
  async showRefundDetails(params: ShowRefundDetailsParams): Promise<RefundResponse> {
    return showRefundDetails(this.client, params)
  }
}
