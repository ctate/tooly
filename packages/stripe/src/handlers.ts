import Stripe from 'stripe'
import {
  createCustomer,
  getCustomer,
  listCustomers,
  createPaymentIntent,
  getPaymentIntent,
  createInvoice,
  getInvoice,
} from './tools/index.js'
import type {
  CreateCustomerParams,
  GetCustomerParams,
  ListCustomersParams,
  CreatePaymentIntentParams,
  GetPaymentIntentParams,
  CreateInvoiceParams,
  GetInvoiceParams,
  CustomerResponse,
  PaymentIntentResponse,
  InvoiceResponse,
} from './types'

export class StripeHandlers {
  private stripe: Stripe

  constructor(apiKey: string, options?: Stripe.StripeConfig) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2025-02-24.acacia',
      ...options,
    })
  }

  /**
   * Create a new customer
   */
  async createCustomer(params: CreateCustomerParams): Promise<CustomerResponse> {
    return createCustomer(this.stripe, params)
  }

  /**
   * Get customer details by ID
   */
  async getCustomer(params: GetCustomerParams): Promise<CustomerResponse> {
    return getCustomer(this.stripe, params)
  }

  /**
   * List customers
   */
  async listCustomers(params: ListCustomersParams = { limit: 10 }): Promise<CustomerResponse[]> {
    return listCustomers(this.stripe, params)
  }

  /**
   * Create a payment intent
   */
  async createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntentResponse> {
    return createPaymentIntent(this.stripe, params)
  }

  /**
   * Get payment intent details by ID
   */
  async getPaymentIntent(params: GetPaymentIntentParams): Promise<PaymentIntentResponse> {
    return getPaymentIntent(this.stripe, params)
  }

  /**
   * Create an invoice
   */
  async createInvoice(params: CreateInvoiceParams): Promise<InvoiceResponse> {
    return createInvoice(this.stripe, params)
  }

  /**
   * Get invoice details by ID
   */
  async getInvoice(params: GetInvoiceParams): Promise<InvoiceResponse> {
    return getInvoice(this.stripe, params)
  }
}
