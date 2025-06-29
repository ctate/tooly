import Stripe from 'stripe'
import type { CreatePaymentIntentParams, PaymentIntentResponse } from '../types.js'

export const createPaymentIntentTool = {
  name: 'createPaymentIntent',
  description: 'Create a payment intent in Stripe to process a payment',
  parameters: {
    type: 'object',
    properties: {
      amount: {
        type: 'number',
        minimum: 1,
        description: 'Amount to charge in the smallest currency unit (e.g., cents for USD)',
      },
      currency: {
        type: 'string',
        default: 'usd',
        description: 'Three-letter ISO currency code (e.g., usd, eur, gbp)',
      },
      customer: {
        type: 'string',
        description: 'ID of the customer this payment is for',
      },
      payment_method: {
        type: 'string',
        description: 'ID of the payment method to use for this payment',
      },
      description: {
        type: 'string',
        description: 'An arbitrary string to describe the payment',
      },
      receipt_email: {
        type: 'string',
        format: 'email',
        description: 'Email address to send the receipt to',
      },
      metadata: {
        type: 'object',
        additionalProperties: { type: 'string' },
        description: 'Set of key-value pairs for storing additional information',
      },
      automatic_payment_methods: {
        type: 'object',
        properties: {
          enabled: {
            type: 'boolean',
            description: 'Whether to enable automatic payment methods',
          },
        },
        description: 'Configuration for automatic payment methods',
      },
    },
    required: ['amount'],
  },
} as const

/**
 * Create a payment intent in Stripe
 */
export async function createPaymentIntent(
  stripe: Stripe,
  params: CreatePaymentIntentParams,
): Promise<PaymentIntentResponse> {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: params.amount,
      currency: params.currency,
      customer: params.customer,
      payment_method: params.payment_method,
      description: params.description,
      receipt_email: params.receipt_email,
      metadata: params.metadata,
      automatic_payment_methods: params.automatic_payment_methods,
    })

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
    throw new Error(`Failed to create payment intent: ${error instanceof Error ? error.message : String(error)}`)
  }
}
