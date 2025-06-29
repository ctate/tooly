import { Client, OrdersController } from '@paypal/paypal-server-sdk'
import type { CaptureOrderParams, OrderResponse } from '../types.js'

export const captureOrderTool = {
  name: 'captureOrder',
  description: 'Capture payment for an order',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the order to capture payment for',
      },
      payment_source: {
        type: 'object',
        properties: {
          paypal: {
            type: 'object',
            properties: {
              experience_context: {
                type: 'object',
                properties: {
                  payment_method_preference: {
                    type: 'string',
                    enum: ['UNRESTRICTED', 'IMMEDIATE_PAYMENT_REQUIRED'],
                    description: 'The merchant-preferred payment method',
                  },
                  brand_name: {
                    type: 'string',
                    description: 'The label that overrides the business name in the PayPal account',
                  },
                  locale: {
                    type: 'string',
                    description: 'The BCP 47-formatted locale of pages that the PayPal payment experience shows',
                  },
                  user_action: {
                    type: 'string',
                    enum: ['CONTINUE', 'PAY_NOW'],
                    description: 'Configures a Continue or Pay Now checkout flow',
                  },
                },
              },
            },
          },
        },
        description: 'The payment source definition',
      },
    },
    required: ['id'],
  },
} as const

/**
 * Capture payment for an order
 */
export async function captureOrder(client: Client, params: CaptureOrderParams): Promise<OrderResponse> {
  try {
    const ordersController = new OrdersController(client)

    const requestBody: any = {}

    if (params.payment_source?.paypal?.experience_context) {
      requestBody.paymentSource = {
        paypal: {
          experienceContext: {
            ...(params.payment_source.paypal.experience_context.payment_method_preference && {
              paymentMethodPreference: params.payment_source.paypal.experience_context.payment_method_preference,
            }),
            ...(params.payment_source.paypal.experience_context.brand_name && {
              brandName: params.payment_source.paypal.experience_context.brand_name,
            }),
            ...(params.payment_source.paypal.experience_context.locale && {
              locale: params.payment_source.paypal.experience_context.locale,
            }),
            ...(params.payment_source.paypal.experience_context.user_action && {
              userAction: params.payment_source.paypal.experience_context.user_action,
            }),
          },
        },
      }
    }

    const { result } = await ordersController.captureOrder({
      id: params.id,
      body: requestBody,
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
    throw new Error(`Failed to capture order: ${error instanceof Error ? error.message : String(error)}`)
  }
}
