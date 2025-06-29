import Stripe from 'stripe'
import type { GetCustomerParams, CustomerResponse } from '../types.js'

export const getCustomerTool = {
  name: 'getCustomer',
  description: 'Retrieve a customer from Stripe',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the customer to retrieve',
      },
    },
    required: ['id'],
  },
} as const

/**
 * Get a customer from Stripe
 */
export async function getCustomer(stripe: Stripe, params: GetCustomerParams): Promise<CustomerResponse> {
  try {
    const customer = await stripe.customers.retrieve(params.id)

    if (customer.deleted) {
      throw new Error('Customer has been deleted')
    }

    return {
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
    }
  } catch (error) {
    throw new Error(`Failed to retrieve customer: ${error instanceof Error ? error.message : String(error)}`)
  }
}
