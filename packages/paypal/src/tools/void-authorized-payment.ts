import { Client, PaymentsController } from '@paypal/paypal-server-sdk'
import type { VoidAuthorizedPaymentParams } from '../types.js'

export const voidAuthorizedPaymentTool = {
  name: 'voidAuthorizedPayment',
  description: 'Void an authorized payment',
  parameters: {
    type: 'object',
    properties: {
      authorization_id: {
        type: 'string',
        description: 'The ID of the authorized payment to void',
      },
    },
    required: ['authorization_id'],
  },
} as const

/**
 * Void an authorized payment
 */
export async function voidAuthorizedPayment(client: Client, params: VoidAuthorizedPaymentParams): Promise<void> {
  try {
    const paymentsController = new PaymentsController(client)

    await paymentsController.voidPayment({
      authorizationId: params.authorization_id,
    })
  } catch (error) {
    throw new Error(`Failed to void authorized payment: ${error instanceof Error ? error.message : String(error)}`)
  }
}
