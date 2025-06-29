import { Client, OrdersController, CheckoutPaymentIntent } from '@paypal/paypal-server-sdk'
import type { CreateOrderParams, OrderResponse } from '../types.js'

export const createOrderTool = {
  name: 'createOrder',
  description: 'Create a new payment order',
  parameters: {
    type: 'object',
    properties: {
      intent: {
        type: 'string',
        enum: ['CAPTURE', 'AUTHORIZE'],
        description: 'The intent to either capture payment immediately or authorize payment for capture later',
      },
      purchase_units: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            reference_id: {
              type: 'string',
              description: 'The API caller-provided external ID for the purchase unit',
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
                  description: 'The value, which might be an integer for currencies like JPY',
                },
              },
              required: ['currency_code', 'value'],
            },
            description: {
              type: 'string',
              description: 'The purchase description',
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'The item name or title',
                  },
                  quantity: {
                    type: 'string',
                    description: 'The item quantity',
                  },
                  unit_amount: {
                    type: 'object',
                    properties: {
                      currency_code: {
                        type: 'string',
                        description: 'The three-character ISO-4217 currency code',
                      },
                      value: {
                        type: 'string',
                        description: 'The value, which might be an integer for currencies like JPY',
                      },
                    },
                    required: ['currency_code', 'value'],
                  },
                  category: {
                    type: 'string',
                    enum: ['DIGITAL_GOODS', 'PHYSICAL_GOODS', 'DONATION'],
                    description: 'The item category type',
                  },
                },
                required: ['name', 'quantity', 'unit_amount'],
              },
            },
          },
          required: ['amount'],
        },
        minItems: 1,
        description: 'An array of purchase units for this order',
      },
      application_context: {
        type: 'object',
        properties: {
          return_url: {
            type: 'string',
            description: 'The URL where the payer is redirected after approving a payment',
          },
          cancel_url: {
            type: 'string',
            description: 'The URL where the payer is redirected after canceling a payment',
          },
          brand_name: {
            type: 'string',
            description: 'The label that overrides the business name in the PayPal account',
          },
          user_action: {
            type: 'string',
            enum: ['CONTINUE', 'PAY_NOW'],
            description:
              'When the customer clicks PayPal Checkout, they are redirected to a page to log in to PayPal and approve the payment',
          },
        },
      },
    },
    required: ['intent', 'purchase_units'],
  },
} as const

/**
 * Create a new payment order
 */
export async function createOrder(client: Client, params: CreateOrderParams): Promise<OrderResponse> {
  try {
    const ordersController = new OrdersController(client)

    // Build the request body with minimal required fields to avoid type conflicts
    const orderRequest: any = {
      intent: params.intent === 'CAPTURE' ? CheckoutPaymentIntent.Capture : CheckoutPaymentIntent.Authorize,
      purchaseUnits: params.purchase_units.map((unit: any) => ({
        referenceId: unit.reference_id,
        amount: {
          currencyCode: unit.amount.currency_code,
          value: unit.amount.value,
        },
        ...(unit.description && { description: unit.description }),
        ...(unit.custom_id && { customId: unit.custom_id }),
        ...(unit.invoice_id && { invoiceId: unit.invoice_id }),
        ...(unit.soft_descriptor && { softDescriptor: unit.soft_descriptor }),
        ...(unit.items && {
          items: unit.items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            unitAmount: {
              currencyCode: item.unit_amount.currency_code,
              value: item.unit_amount.value,
            },
            ...(item.description && { description: item.description }),
            ...(item.sku && { sku: item.sku }),
            ...(item.category && { category: item.category }),
          })),
        }),
      })),
    }

    // Add optional fields if provided
    if (params.payer) {
      orderRequest.payer = {}
      if (params.payer.name) {
        orderRequest.payer.name = {
          givenName: params.payer.name.given_name,
          surname: params.payer.name.surname,
        }
      }
      if (params.payer.email_address) {
        orderRequest.payer.emailAddress = params.payer.email_address
      }
      if (params.payer.payer_id) {
        orderRequest.payer.payerId = params.payer.payer_id
      }
    }

    if (params.application_context) {
      orderRequest.applicationContext = {}
      if (params.application_context.return_url) {
        orderRequest.applicationContext.returnUrl = params.application_context.return_url
      }
      if (params.application_context.cancel_url) {
        orderRequest.applicationContext.cancelUrl = params.application_context.cancel_url
      }
      if (params.application_context.brand_name) {
        orderRequest.applicationContext.brandName = params.application_context.brand_name
      }
      if (params.application_context.user_action) {
        orderRequest.applicationContext.userAction = params.application_context.user_action
      }
    }

    const { result } = await ordersController.createOrder({ body: orderRequest })

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
    throw new Error(`Failed to create order: ${error instanceof Error ? error.message : String(error)}`)
  }
}
