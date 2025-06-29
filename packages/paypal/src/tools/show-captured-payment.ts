import { Client, PaymentsController } from '@paypal/paypal-server-sdk'
import type { ShowCapturedPaymentParams, CaptureResponse } from '../types.js'

export const showCapturedPaymentTool = {
  name: 'showCapturedPayment',
  description: 'Show details for a captured payment by ID',
  parameters: {
    type: 'object',
    properties: {
      capture_id: {
        type: 'string',
        description: 'The ID of the captured payment to retrieve details for',
      },
    },
    required: ['capture_id'],
  },
} as const

/**
 * Show captured payment details
 */
export async function showCapturedPayment(client: Client, params: ShowCapturedPaymentParams): Promise<CaptureResponse> {
  try {
    const paymentsController = new PaymentsController(client)

    const { result } = await paymentsController.getCapturedPayment({
      captureId: params.capture_id,
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
    throw new Error(`Failed to show captured payment: ${error instanceof Error ? error.message : String(error)}`)
  }
}
