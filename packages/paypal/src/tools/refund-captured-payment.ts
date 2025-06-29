import { Client, PaymentsController } from '@paypal/paypal-server-sdk'
import type { RefundCapturedPaymentParams, RefundResponse } from '../types.js'

export const refundCapturedPaymentTool = {
  name: 'refundCapturedPayment',
  description: 'Refund a captured payment',
  parameters: {
    type: 'object',
    properties: {
      capture_id: {
        type: 'string',
        description: 'The ID of the captured payment to refund',
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
            description: 'The refund amount',
          },
        },
        description: 'The amount to refund. If not provided, refunds the full captured amount',
      },
      invoice_id: {
        type: 'string',
        description: 'The API caller-provided external invoice number for this order',
      },
      note_to_payer: {
        type: 'string',
        description: 'The reason for the refund',
      },
    },
    required: ['capture_id'],
  },
} as const

/**
 * Refund a captured payment
 */
export async function refundCapturedPayment(
  client: Client,
  params: RefundCapturedPaymentParams,
): Promise<RefundResponse> {
  try {
    const paymentsController = new PaymentsController(client)

    const requestBody: any = {}
    if (params.amount) {
      requestBody.amount = {
        currencyCode: params.amount.currency_code,
        value: params.amount.value,
      }
    }
    if (params.note_to_payer) {
      requestBody.noteToPayer = params.note_to_payer
    }

    const { result } = await paymentsController.refundCapturedPayment({
      captureId: params.capture_id,
      body: requestBody,
    })

    return {
      id: result.id!,
      status: result.status as 'CANCELLED' | 'PENDING' | 'COMPLETED',
      amount: {
        currency_code: result.amount!.currencyCode!,
        value: result.amount!.value!,
      },
      note_to_payer: result.noteToPayer,
      seller_payable_breakdown: result.sellerPayableBreakdown
        ? {
            gross_amount: {
              currency_code: result.sellerPayableBreakdown.grossAmount!.currencyCode!,
              value: result.sellerPayableBreakdown.grossAmount!.value!,
            },
            paypal_fee: result.sellerPayableBreakdown.paypalFee
              ? {
                  currency_code: result.sellerPayableBreakdown.paypalFee.currencyCode!,
                  value: result.sellerPayableBreakdown.paypalFee.value!,
                }
              : undefined,
            net_amount: result.sellerPayableBreakdown.netAmount
              ? {
                  currency_code: result.sellerPayableBreakdown.netAmount.currencyCode!,
                  value: result.sellerPayableBreakdown.netAmount.value!,
                }
              : undefined,
          }
        : undefined,
      links: result.links?.map((link: any) => ({
        href: link.href!,
        rel: link.rel!,
        method: link.method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'CONNECT' | 'OPTIONS' | 'PATCH',
      })),
      create_time: result.createTime || '',
      update_time: result.updateTime || '',
    }
  } catch (error) {
    throw new Error(`Failed to refund captured payment: ${error instanceof Error ? error.message : String(error)}`)
  }
}
