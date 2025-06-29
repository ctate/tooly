import { Client, OrdersController } from '@paypal/paypal-server-sdk'
import type { AuthorizeOrderParams, OrderResponse } from '../types.js'

export const authorizeOrderTool = {
  name: 'authorizeOrder',
  description: 'Authorize payment for an order',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the order to authorize payment for',
      },
    },
    required: ['id'],
  },
} as const

/**
 * Authorize payment for an order
 */
export async function authorizeOrder(client: Client, params: AuthorizeOrderParams): Promise<OrderResponse> {
  try {
    const ordersController = new OrdersController(client)

    const { result } = await ordersController.authorizeOrder({
      id: params.id,
      body: {},
    })

    return {
      id: result.id!,
      intent: result.intent as 'CAPTURE' | 'AUTHORIZE',
      status: result.status as 'CREATED' | 'SAVED' | 'APPROVED' | 'VOIDED' | 'COMPLETED' | 'PAYER_ACTION_REQUIRED',
      purchase_units: result.purchaseUnits!.map((unit: any) => ({
        reference_id: unit.referenceId,
        amount: {
          currency_code: unit.amount!.currencyCode!,
          value: unit.amount!.value!,
        },
        payee: unit.payee
          ? {
              email_address: unit.payee.emailAddress,
              merchant_id: unit.payee.merchantId,
            }
          : undefined,
        payments: unit.payments
          ? {
              captures: unit.payments.captures?.map((capture: any) => ({
                id: capture.id!,
                status: capture.status!,
                amount: {
                  currency_code: capture.amount!.currencyCode!,
                  value: capture.amount!.value!,
                },
              })),
              authorizations: unit.payments.authorizations?.map((auth: any) => ({
                id: auth.id!,
                status: auth.status!,
                amount: {
                  currency_code: auth.amount!.currencyCode!,
                  value: auth.amount!.value!,
                },
              })),
            }
          : undefined,
      })),
      payer: result.payer
        ? {
            name: result.payer.name
              ? {
                  given_name: result.payer.name.givenName,
                  surname: result.payer.name.surname,
                }
              : undefined,
            email_address: result.payer.emailAddress,
            payer_id: result.payer.payerId,
          }
        : undefined,
      links: result.links?.map((link: any) => ({
        href: link.href!,
        rel: link.rel!,
        method: link.method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'PATCH',
      })),
      create_time: result.createTime,
      update_time: result.updateTime,
    }
  } catch (error) {
    throw new Error(`Failed to authorize order: ${error instanceof Error ? error.message : String(error)}`)
  }
}
