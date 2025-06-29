import { z } from 'zod'
import {
  CreateCustomerSchema,
  UpdateCustomerSchema,
  ListCustomersSchema,
  CreatePaymentIntentSchema,
  ConfirmPaymentIntentSchema,
  CreateInvoiceSchema,
} from '../types.js'

// Export all tools
export * from './create-customer.js'
export * from './get-customer.js'
export * from './list-customers.js'
export * from './create-payment-intent.js'
export * from './get-payment-intent.js'
export * from './create-invoice.js'
export * from './get-invoice.js'

// Import tool definitions
import { createCustomerTool } from './create-customer.js'
import { getCustomerTool } from './get-customer.js'
import { listCustomersTool } from './list-customers.js'
import { createPaymentIntentTool } from './create-payment-intent.js'
import { getPaymentIntentTool } from './get-payment-intent.js'
import { createInvoiceTool } from './create-invoice.js'
import { getInvoiceTool } from './get-invoice.js'

// Export all tools as an array
export const stripeTools = [
  createCustomerTool,
  getCustomerTool,
  listCustomersTool,
  createPaymentIntentTool,
  getPaymentIntentTool,
  createInvoiceTool,
  getInvoiceTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  createCustomer: CreateCustomerSchema,
  getCustomer: z.object({ id: z.string() }),
  listCustomers: ListCustomersSchema,
  createPaymentIntent: CreatePaymentIntentSchema,
  getPaymentIntent: z.object({ id: z.string() }),
  createInvoice: CreateInvoiceSchema,
  getInvoice: z.object({ id: z.string() }),
} as const
