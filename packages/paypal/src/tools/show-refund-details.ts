import { Client, PaymentsController } from '@paypal/paypal-server-sdk'
import type { ShowRefundDetailsParams, RefundResponse } from '../types.js'

export const showRefundDetailsTool = {
  name: 'showRefundDetails',
  description: 'Show details for a refund by ID',
  parameters: {
    type: 'object',
    properties: {
      refund_id: {
        type: 'string',
        description: 'The ID of the refund to retrieve details for',
      },
    },
    required: ['refund_id'],
  },
} as const

/**
 * Show refund details
 */
export async function showRefundDetails(client: Client, params: ShowRefundDetailsParams): Promise<RefundResponse> {
  try {
    const paymentsController = new PaymentsController(client)

    const { result } = await paymentsController.getRefund({
      refundId: params.refund_id,
    })

    return {
      id: result.id!,
      status: result.status as 'CANCELLED' | 'PENDING' | 'COMPLETED',
      amount: {
        currency_code: result.amount!.currencyCode!,
        value: result.amount!.value!,
      },
      invoice_id: result.invoiceId,
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
    throw new Error(`Failed to show refund details: ${error instanceof Error ? error.message : String(error)}`)
  }
}
