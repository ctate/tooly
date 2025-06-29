import Stripe from 'stripe'
import type { GetPaymentIntentParams, PaymentIntentResponse } from '../types.js'

export const getPaymentIntentTool = {
  name: 'getPaymentIntent',
  description: 'Retrieve a payment intent from Stripe',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the payment intent to retrieve',
      },
    },
    required: ['id'],
  },
} as const

/**
 * Get a payment intent from Stripe
 */
export async function getPaymentIntent(stripe: Stripe, params: GetPaymentIntentParams): Promise<PaymentIntentResponse> {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(params.id)

    return {
      id: paymentIntent.id,
      object: paymentIntent.object,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status as any,
      customer:
        typeof paymentIntent.customer === 'string' ? paymentIntent.customer : paymentIntent.customer?.id || null,
      payment_method:
        typeof paymentIntent.payment_method === 'string'
          ? paymentIntent.payment_method
          : paymentIntent.payment_method?.id || null,
      description: paymentIntent.description,
      receipt_email: paymentIntent.receipt_email,
      created: paymentIntent.created,
      metadata: paymentIntent.metadata || {},
    }
  } catch (error) {
    throw new Error(`Failed to retrieve payment intent: ${error instanceof Error ? error.message : String(error)}`)
  }
}
