import Stripe from 'stripe'
import type { ListCustomersParams, CustomerResponse } from '../types.js'

export const listCustomersTool = {
  name: 'listCustomers',
  description: 'List customers in Stripe',
  parameters: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
        minimum: 1,
        maximum: 100,
        default: 10,
        description: 'Number of customers to return (1-100)',
      },
      starting_after: {
        type: 'string',
        description: 'Cursor for pagination - customer ID to start after',
      },
      ending_before: {
        type: 'string',
        description: 'Cursor for pagination - customer ID to end before',
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Filter customers by email address',
      },
    },
    required: [],
  },
} as const

/**
 * List customers from Stripe
 */
export async function listCustomers(stripe: Stripe, params: ListCustomersParams): Promise<CustomerResponse[]> {
  try {
    const customers = await stripe.customers.list({
      limit: params.limit,
      starting_after: params.starting_after,
      ending_before: params.ending_before,
      email: params.email,
    })

    return customers.data.map((customer) => ({
      id: customer.id,
      object: customer.object,
      email: customer.email,
      name: customer.name ?? null,
      phone: customer.phone ?? null,
      description: customer.description,
      address: customer.address
        ? {
            line1: customer.address.line1 ?? undefined,
            line2: customer.address.line2 ?? undefined,
            city: customer.address.city ?? undefined,
            state: customer.address.state ?? undefined,
            postal_code: customer.address.postal_code ?? undefined,
            country: customer.address.country ?? undefined,
          }
        : null,
      metadata: customer.metadata || {},
      created: customer.created,
      balance: customer.balance,
    }))
  } catch (error) {
    throw new Error(`Failed to list customers: ${error instanceof Error ? error.message : String(error)}`)
  }
}
