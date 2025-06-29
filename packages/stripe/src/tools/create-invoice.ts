import Stripe from 'stripe'
import type { CreateInvoiceParams, InvoiceResponse } from '../types.js'

export const createInvoiceTool = {
  name: 'createInvoice',
  description: 'Create an invoice in Stripe',
  parameters: {
    type: 'object',
    properties: {
      customer: {
        type: 'string',
        description: 'The ID of the customer to invoice',
      },
      description: {
        type: 'string',
        description: 'An arbitrary string to describe the invoice',
      },
      metadata: {
        type: 'object',
        additionalProperties: { type: 'string' },
        description: 'Set of key-value pairs for storing additional information',
      },
      auto_advance: {
        type: 'boolean',
        default: true,
        description: 'Whether to automatically finalize and send the invoice',
      },
    },
    required: ['customer'],
  },
} as const

/**
 * Create an invoice in Stripe
 */
export async function createInvoice(stripe: Stripe, params: CreateInvoiceParams): Promise<InvoiceResponse> {
  try {
    const invoice = await stripe.invoices.create({
      customer: params.customer,
      description: params.description,
      metadata: params.metadata,
      auto_advance: params.auto_advance,
    })

    return {
      id: invoice.id,
      object: invoice.object,
      customer: invoice.customer as string,
      amount_due: invoice.amount_due,
      amount_paid: invoice.amount_paid,
      currency: invoice.currency,
      description: invoice.description,
      status: invoice.status as any,
      created: invoice.created,
      metadata: invoice.metadata || {},
    }
  } catch (error) {
    throw new Error(`Failed to create invoice: ${error instanceof Error ? error.message : String(error)}`)
  }
}
