import { Client, OrdersController } from '@paypal/paypal-server-sdk'
import type { ShowOrderDetailsParams, OrderResponse } from '../types.js'

export const showOrderDetailsTool = {
  name: 'showOrderDetails',
  description: 'Show details for an order by ID',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the order to retrieve details for',
      },
    },
    required: ['id'],
  },
} as const

/**
 * Show order details by ID
 */
export async function showOrderDetails(client: Client, params: ShowOrderDetailsParams): Promise<OrderResponse> {
  try {
    const ordersController = new OrdersController(client)

    const { result } = await ordersController.getOrder({
      id: params.id,
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
    throw new Error(`Failed to get order details: ${error instanceof Error ? error.message : String(error)}`)
  }
}
