import Stripe from 'stripe'
import type { GetInvoiceParams, InvoiceResponse } from '../types.js'

export const getInvoiceTool = {
  name: 'getInvoice',
  description: 'Retrieve an invoice from Stripe',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the invoice to retrieve',
      },
    },
    required: ['id'],
  },
} as const

/**
 * Get an invoice from Stripe
 */
export async function getInvoice(stripe: Stripe, params: GetInvoiceParams): Promise<InvoiceResponse> {
  try {
    const invoice = await stripe.invoices.retrieve(params.id)

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
    throw new Error(`Failed to retrieve invoice: ${error instanceof Error ? error.message : String(error)}`)
  }
}
