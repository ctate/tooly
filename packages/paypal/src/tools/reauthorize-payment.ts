import { Client, PaymentsController } from '@paypal/paypal-server-sdk'
import type { ReauthorizePaymentParams, AuthorizationResponse } from '../types.js'

export const reauthorizePaymentTool = {
  name: 'reauthorizePayment',
  description: 'Reauthorize an authorized payment',
  parameters: {
    type: 'object',
    properties: {
      authorization_id: {
        type: 'string',
        description: 'The ID of the authorized payment to reauthorize',
      },
      amount: {
        type: 'object',
        properties: {
          currency_code: {
            type: 'string',
            description: 'The three-character ISO-4217 currency code',
          },
          value: {
            type: 'string',
            description: 'The reauthorization amount',
          },
        },
        required: ['currency_code', 'value'],
        description: 'The amount to reauthorize for an authorized payment',
      },
    },
    required: ['authorization_id', 'amount'],
  },
} as const

/**
 * Reauthorize an authorized payment
 */
export async function reauthorizePayment(
  client: Client,
  params: ReauthorizePaymentParams,
): Promise<AuthorizationResponse> {
  try {
    const paymentsController = new PaymentsController(client)

    const requestBody: any = {}
    if (params.amount) {
      requestBody.amount = {
        currencyCode: params.amount.currency_code,
        value: params.amount.value,
      }
    }

    const { result } = await paymentsController.reauthorizePayment({
      authorizationId: params.authorization_id,
      body: requestBody,
    })

    return {
      id: result.id!,
      status: result.status as
        | 'CREATED'
        | 'CAPTURED'
        | 'DENIED'
        | 'EXPIRED'
        | 'PARTIALLY_CAPTURED'
        | 'PENDING'
        | 'VOIDED',
      amount: {
        currency_code: result.amount!.currencyCode!,
        value: result.amount!.value!,
      },
      seller_protection: result.sellerProtection
        ? {
            status: result.sellerProtection.status as 'ELIGIBLE' | 'PARTIALLY_ELIGIBLE' | 'NOT_ELIGIBLE',
            dispute_categories: result.sellerProtection.disputeCategories as Array<
              'ITEM_NOT_RECEIVED' | 'UNAUTHORIZED_TRANSACTION'
            >,
          }
        : undefined,
      expiration_time: result.expirationTime,
      links: result.links?.map((link: any) => ({
        href: link.href!,
        rel: link.rel!,
        method: link.method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'PATCH',
      })),
      create_time: result.createTime || '',
      update_time: result.updateTime || '',
    }
  } catch (error) {
    throw new Error(`Failed to reauthorize payment: ${error instanceof Error ? error.message : String(error)}`)
  }
}
