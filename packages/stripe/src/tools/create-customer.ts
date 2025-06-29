import Stripe from 'stripe'
import type { CreateCustomerParams, CustomerResponse } from '../types.js'

export const createCustomerTool = {
  name: 'createCustomer',
  description: 'Create a new customer in Stripe',
  parameters: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: "The customer's email address",
      },
      name: {
        type: 'string',
        description: "The customer's full name or business name",
      },
      phone: {
        type: 'string',
        description: "The customer's phone number",
      },
      description: {
        type: 'string',
        description: 'An arbitrary string to attach to the customer',
      },
      address: {
        type: 'object',
        properties: {
          line1: { type: 'string', description: 'Address line 1' },
          line2: { type: 'string', description: 'Address line 2' },
          city: { type: 'string', description: 'City' },
          state: { type: 'string', description: 'State/Province' },
          postal_code: { type: 'string', description: 'ZIP or postal code' },
          country: { type: 'string', description: 'Two-letter country code' },
        },
        description: "The customer's address",
      },
      metadata: {
        type: 'object',
        additionalProperties: { type: 'string' },
        description: 'Set of key-value pairs for storing additional information',
      },
    },
    required: [],
  },
} as const

/**
 * Create a new customer in Stripe
 */
export async function createCustomer(stripe: Stripe, params: CreateCustomerParams): Promise<CustomerResponse> {
  try {
    const customer = await stripe.customers.create({
      email: params.email,
      name: params.name,
      phone: params.phone,
      description: params.description,
      address: params.address,
      metadata: params.metadata,
    })

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
    throw new Error(`Failed to create customer: ${error instanceof Error ? error.message : String(error)}`)
  }
}
