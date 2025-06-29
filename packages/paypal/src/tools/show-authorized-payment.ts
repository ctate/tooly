import { Client, PaymentsController } from '@paypal/paypal-server-sdk'
import type { ShowAuthorizedPaymentParams, AuthorizationResponse } from '../types.js'

export const showAuthorizedPaymentTool = {
  name: 'showAuthorizedPayment',
  description: 'Show details for an authorized payment by ID',
  parameters: {
    type: 'object',
    properties: {
      authorization_id: {
        type: 'string',
        description: 'The ID of the authorized payment to retrieve details for',
      },
    },
    required: ['authorization_id'],
  },
} as const

/**
 * Show authorized payment details
 */
export async function showAuthorizedPayment(
  client: Client,
  params: ShowAuthorizedPaymentParams,
): Promise<AuthorizationResponse> {
  try {
    const paymentsController = new PaymentsController(client)

    const { result } = await paymentsController.getAuthorizedPayment({
      authorizationId: params.authorization_id,
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
      invoice_id: result.invoiceId,
      custom_id: result.customId,
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
    throw new Error(`Failed to show authorized payment: ${error instanceof Error ? error.message : String(error)}`)
  }
}
