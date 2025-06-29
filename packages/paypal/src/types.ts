import { z } from 'zod'

// Base types
export const PayPalEnvironmentSchema = z.enum(['sandbox', 'live'])
export const CurrencyCodeSchema = z.string().length(3) // ISO 4217 currency codes
export const AmountSchema = z.object({
  currency_code: CurrencyCodeSchema,
  value: z.string().regex(/^\d+(\.\d{1,2})?$/), // Amount with up to 2 decimal places
})

// Order schemas
export const PurchaseUnitSchema = z.object({
  reference_id: z.string().optional(),
  amount: AmountSchema,
  payee: z
    .object({
      email_address: z.string().email().optional(),
      merchant_id: z.string().optional(),
    })
    .optional(),
  description: z.string().optional(),
  custom_id: z.string().optional(),
  invoice_id: z.string().optional(),
  soft_descriptor: z.string().optional(),
  items: z
    .array(
      z.object({
        name: z.string(),
        quantity: z.string(),
        description: z.string().optional(),
        sku: z.string().optional(),
        category: z.enum(['DIGITAL_GOODS', 'PHYSICAL_GOODS', 'DONATION']).optional(),
        unit_amount: AmountSchema,
      }),
    )
    .optional(),
  shipping: z
    .object({
      method: z.string().optional(),
      address: z
        .object({
          address_line_1: z.string(),
          address_line_2: z.string().optional(),
          admin_area_2: z.string(),
          admin_area_1: z.string().optional(),
          postal_code: z.string().optional(),
          country_code: z.string().length(2),
        })
        .optional(),
    })
    .optional(),
})

export const CreateOrderSchema = z.object({
  intent: z.enum(['CAPTURE', 'AUTHORIZE']),
  purchase_units: z.array(PurchaseUnitSchema),
  payer: z
    .object({
      name: z
        .object({
          given_name: z.string().optional(),
          surname: z.string().optional(),
        })
        .optional(),
      email_address: z.string().email().optional(),
      payer_id: z.string().optional(),
      phone: z
        .object({
          phone_type: z.enum(['FAX', 'HOME', 'MOBILE', 'OTHER', 'PAGER']).optional(),
          phone_number: z.object({
            national_number: z.string(),
          }),
        })
        .optional(),
      address: z
        .object({
          address_line_1: z.string(),
          address_line_2: z.string().optional(),
          admin_area_2: z.string(),
          admin_area_1: z.string().optional(),
          postal_code: z.string().optional(),
          country_code: z.string().length(2),
        })
        .optional(),
    })
    .optional(),
  application_context: z
    .object({
      brand_name: z.string().optional(),
      locale: z.string().optional(),
      landing_page: z.enum(['LOGIN', 'BILLING', 'NO_PREFERENCE']).optional(),
      shipping_preference: z.enum(['GET_FROM_FILE', 'NO_SHIPPING', 'SET_PROVIDED_ADDRESS']).optional(),
      user_action: z.enum(['CONTINUE', 'PAY_NOW']).optional(),
      payment_method: z
        .object({
          payer_selected: z.string().optional(),
          payee_preferred: z.enum(['UNRESTRICTED', 'IMMEDIATE_PAYMENT_REQUIRED']).optional(),
        })
        .optional(),
      return_url: z.string().url().optional(),
      cancel_url: z.string().url().optional(),
    })
    .optional(),
})

export const CaptureOrderSchema = z.object({
  payment_source: z
    .object({
      paypal: z
        .object({
          experience_context: z
            .object({
              payment_method_preference: z.enum(['UNRESTRICTED', 'IMMEDIATE_PAYMENT_REQUIRED']).optional(),
              brand_name: z.string().optional(),
              locale: z.string().optional(),
              landing_page: z.enum(['LOGIN', 'BILLING', 'NO_PREFERENCE']).optional(),
              shipping_preference: z.enum(['GET_FROM_FILE', 'NO_SHIPPING', 'SET_PROVIDED_ADDRESS']).optional(),
              user_action: z.enum(['CONTINUE', 'PAY_NOW']).optional(),
            })
            .optional(),
        })
        .optional(),
    })
    .optional(),
})

// Authorization schemas
export const CaptureAuthorizedPaymentSchema = z.object({
  amount: AmountSchema.optional(),
  final_capture: z.boolean().optional(),
  note_to_payer: z.string().optional(),
  soft_descriptor: z.string().optional(),
})

export const ReauthorizePaymentSchema = z.object({
  amount: AmountSchema,
})

// Refund schemas
export const RefundCapturedPaymentSchema = z.object({
  amount: AmountSchema.optional(),
  invoice_id: z.string().optional(),
  note_to_payer: z.string().optional(),
})

// Response schemas
export const OrderResponseSchema = z.object({
  id: z.string(),
  intent: z.enum(['CAPTURE', 'AUTHORIZE']),
  status: z.enum(['CREATED', 'SAVED', 'APPROVED', 'VOIDED', 'COMPLETED', 'PAYER_ACTION_REQUIRED']),
  purchase_units: z.array(
    z.object({
      reference_id: z.string().optional(),
      amount: AmountSchema,
      payee: z
        .object({
          email_address: z.string().optional(),
          merchant_id: z.string().optional(),
        })
        .optional(),
      payments: z
        .object({
          captures: z
            .array(
              z.object({
                id: z.string(),
                status: z.string(),
                amount: AmountSchema,
              }),
            )
            .optional(),
          authorizations: z
            .array(
              z.object({
                id: z.string(),
                status: z.string(),
                amount: AmountSchema,
              }),
            )
            .optional(),
        })
        .optional(),
    }),
  ),
  payer: z
    .object({
      name: z
        .object({
          given_name: z.string().optional(),
          surname: z.string().optional(),
        })
        .optional(),
      email_address: z.string().optional(),
      payer_id: z.string().optional(),
    })
    .optional(),
  links: z
    .array(
      z.object({
        href: z.string().url(),
        rel: z.string(),
        method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']),
      }),
    )
    .optional(),
  create_time: z.string().optional(),
  update_time: z.string().optional(),
})

export const AuthorizationResponseSchema = z.object({
  id: z.string(),
  status: z.enum([
    'CREATED',
    'CAPTURED',
    'DENIED',
    'EXPIRED',
    'PARTIALLY_CAPTURED',
    'PARTIALLY_CREATED',
    'VOIDED',
    'PENDING',
  ]),
  amount: AmountSchema,
  invoice_id: z.string().optional(),
  custom_id: z.string().optional(),
  seller_protection: z
    .object({
      status: z.enum(['ELIGIBLE', 'PARTIALLY_ELIGIBLE', 'NOT_ELIGIBLE']),
      dispute_categories: z.array(z.string()).optional(),
    })
    .optional(),
  expiration_time: z.string().optional(),
  links: z
    .array(
      z.object({
        href: z.string().url(),
        rel: z.string(),
        method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']),
      }),
    )
    .optional(),
  create_time: z.string(),
  update_time: z.string(),
})

export const CaptureResponseSchema = z.object({
  id: z.string(),
  status: z.enum(['COMPLETED', 'DECLINED', 'PARTIALLY_REFUNDED', 'PENDING', 'REFUNDED']),
  amount: AmountSchema,
  final_capture: z.boolean().optional(),
  seller_protection: z
    .object({
      status: z.enum(['ELIGIBLE', 'PARTIALLY_ELIGIBLE', 'NOT_ELIGIBLE']),
      dispute_categories: z.array(z.string()).optional(),
    })
    .optional(),
  seller_receivable_breakdown: z
    .object({
      gross_amount: AmountSchema,
      paypal_fee: AmountSchema.optional(),
      net_amount: AmountSchema.optional(),
    })
    .optional(),
  links: z
    .array(
      z.object({
        href: z.string().url(),
        rel: z.string(),
        method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']),
      }),
    )
    .optional(),
  create_time: z.string(),
  update_time: z.string(),
})

export const RefundResponseSchema = z.object({
  id: z.string(),
  status: z.enum(['CANCELLED', 'PENDING', 'COMPLETED']),
  amount: AmountSchema,
  invoice_id: z.string().optional(),
  note_to_payer: z.string().optional(),
  seller_payable_breakdown: z
    .object({
      gross_amount: AmountSchema,
      paypal_fee: AmountSchema.optional(),
      net_amount: AmountSchema.optional(),
    })
    .optional(),
  links: z
    .array(
      z.object({
        href: z.string().url(),
        rel: z.string(),
        method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'CONNECT', 'OPTIONS', 'PATCH']),
      }),
    )
    .optional(),
  create_time: z.string(),
  update_time: z.string(),
})

// Export inferred types
export type PayPalEnvironment = z.infer<typeof PayPalEnvironmentSchema>
export type CurrencyCode = z.infer<typeof CurrencyCodeSchema>
export type Amount = z.infer<typeof AmountSchema>
export type PurchaseUnit = z.infer<typeof PurchaseUnitSchema>
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>
export type CaptureOrderInput = z.infer<typeof CaptureOrderSchema>
export type CaptureAuthorizedPaymentInput = z.infer<typeof CaptureAuthorizedPaymentSchema>
export type ReauthorizePaymentInput = z.infer<typeof ReauthorizePaymentSchema>
export type RefundCapturedPaymentInput = z.infer<typeof RefundCapturedPaymentSchema>
export type OrderResponse = z.infer<typeof OrderResponseSchema>
export type AuthorizationResponse = z.infer<typeof AuthorizationResponseSchema>
export type CaptureResponse = z.infer<typeof CaptureResponseSchema>
export type RefundResponse = z.infer<typeof RefundResponseSchema>

// Tool parameter types
export interface CreateOrderParams extends CreateOrderInput {}
export interface ShowOrderDetailsParams {
  id: string
}
export interface CaptureOrderParams extends CaptureOrderInput {
  id: string
}
export interface AuthorizeOrderParams {
  id: string
}
export interface ShowAuthorizedPaymentParams {
  authorization_id: string
}
export interface CaptureAuthorizedPaymentParams extends CaptureAuthorizedPaymentInput {
  authorization_id: string
}
export interface VoidAuthorizedPaymentParams {
  authorization_id: string
}
export interface ReauthorizePaymentParams extends ReauthorizePaymentInput {
  authorization_id: string
}
export interface ShowCapturedPaymentParams {
  capture_id: string
}
export interface RefundCapturedPaymentParams extends RefundCapturedPaymentInput {
  capture_id: string
}
export interface ShowRefundDetailsParams {
  refund_id: string
}
