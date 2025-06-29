import { Client, PaymentsController } from '@paypal/paypal-server-sdk'
import type { CaptureAuthorizedPaymentParams, CaptureResponse } from '../types.js'

export const captureAuthorizedPaymentTool = {
  name: 'captureAuthorizedPayment',
  description: 'Capture an authorized payment',
  parameters: {
    type: 'object',
    properties: {
      authorization_id: {
        type: 'string',
        description: 'The ID of the authorized payment to capture',
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
            description: 'The value to capture',
          },
        },
        description: 'The amount to capture. If not provided, captures the full authorized amount',
      },
      final_capture: {
        type: 'boolean',
        description: 'Indicates whether this is the final capture for the authorization',
      },
      note_to_payer: {
        type: 'string',
        description: 'An informational note about this settlement',
      },
      soft_descriptor: {
        type: 'string',
        description: "The payment descriptor on the payer's account statement",
      },
    },
    required: ['authorization_id'],
  },
} as const

/**
 * Capture an authorized payment
 */
export async function captureAuthorizedPayment(
  client: Client,
  params: CaptureAuthorizedPaymentParams,
): Promise<CaptureResponse> {
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

    const { result } = await paymentsController.captureAuthorizedPayment({
      authorizationId: params.authorization_id,
      body: requestBody,
    })

    return {
      id: result.id!,
      status: result.status as 'COMPLETED' | 'DECLINED' | 'PARTIALLY_REFUNDED' | 'PENDING' | 'REFUNDED',
      amount: {
        currency_code: result.amount!.currencyCode!,
        value: result.amount!.value!,
      },
      final_capture: result.finalCapture || false,
      seller_protection: result.sellerProtection
        ? {
            status: result.sellerProtection.status as 'ELIGIBLE' | 'PARTIALLY_ELIGIBLE' | 'NOT_ELIGIBLE',
            dispute_categories: result.sellerProtection.disputeCategories as Array<
              'ITEM_NOT_RECEIVED' | 'UNAUTHORIZED_TRANSACTION'
            >,
          }
        : undefined,
      seller_receivable_breakdown: result.sellerReceivableBreakdown
        ? {
            gross_amount: {
              currency_code: result.sellerReceivableBreakdown.grossAmount!.currencyCode!,
              value: result.sellerReceivableBreakdown.grossAmount!.value!,
            },
            paypal_fee: result.sellerReceivableBreakdown.paypalFee
              ? {
                  currency_code: result.sellerReceivableBreakdown.paypalFee.currencyCode!,
                  value: result.sellerReceivableBreakdown.paypalFee.value!,
                }
              : undefined,
            net_amount: result.sellerReceivableBreakdown.netAmount
              ? {
                  currency_code: result.sellerReceivableBreakdown.netAmount.currencyCode!,
                  value: result.sellerReceivableBreakdown.netAmount.value!,
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
    throw new Error(`Failed to capture authorized payment: ${error instanceof Error ? error.message : String(error)}`)
  }
}
