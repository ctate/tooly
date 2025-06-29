import { z } from 'zod'

// Base schemas
export const StripeIdSchema = z.string()
export const StripeAmountSchema = z.number().int().min(0)
export const StripeCurrencySchema = z.string().default('usd')

// Address schema
export const AddressSchema = z.object({
  line1: z.string().optional(),
  line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
})

// Customer schemas
export const CreateCustomerSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  address: AddressSchema.optional(),
  metadata: z.record(z.string()).optional(),
})

export const UpdateCustomerSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  description: z.string().optional(),
  address: AddressSchema.optional(),
  metadata: z.record(z.string()).optional(),
})

export const ListCustomersSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  starting_after: z.string().optional(),
  ending_before: z.string().optional(),
  email: z.string().email().optional(),
})

// Payment Method schemas
export const CreatePaymentMethodSchema = z.object({
  type: z.enum(['card', 'us_bank_account', 'sepa_debit', 'ideal', 'sofort']),
  card: z
    .object({
      number: z.string(),
      exp_month: z.number().min(1).max(12),
      exp_year: z.number(),
      cvc: z.string(),
    })
    .optional(),
  billing_details: z
    .object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      address: AddressSchema.optional(),
    })
    .optional(),
})

export const AttachPaymentMethodSchema = z.object({
  customer: z.string(),
})

// Payment Intent schemas
export const CreatePaymentIntentSchema = z.object({
  amount: StripeAmountSchema,
  currency: StripeCurrencySchema,
  customer: z.string().optional(),
  payment_method: z.string().optional(),
  description: z.string().optional(),
  receipt_email: z.string().email().optional(),
  metadata: z.record(z.string()).optional(),
  automatic_payment_methods: z
    .object({
      enabled: z.boolean(),
    })
    .optional(),
})

export const ConfirmPaymentIntentSchema = z.object({
  payment_method: z.string().optional(),
  return_url: z.string().url().optional(),
})

// Invoice schemas
export const CreateInvoiceSchema = z.object({
  customer: z.string(),
  description: z.string().optional(),
  metadata: z.record(z.string()).optional(),
  auto_advance: z.boolean().default(true),
})

export const AddInvoiceItemSchema = z.object({
  customer: z.string(),
  amount: StripeAmountSchema,
  currency: StripeCurrencySchema,
  description: z.string().optional(),
  invoice: z.string().optional(),
})

// Response schemas
export const CustomerResponseSchema = z.object({
  id: z.string(),
  object: z.literal('customer'),
  email: z.string().nullable(),
  name: z.string().nullable(),
  phone: z.string().nullable(),
  description: z.string().nullable(),
  address: AddressSchema.nullable(),
  metadata: z.record(z.string()),
  created: z.number(),
  balance: z.number(),
})

export const PaymentMethodResponseSchema = z.object({
  id: z.string(),
  object: z.literal('payment_method'),
  type: z.string(),
  customer: z.string().nullable(),
  created: z.number(),
  billing_details: z.object({
    name: z.string().nullable(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    address: AddressSchema.nullable(),
  }),
})

export const PaymentIntentResponseSchema = z.object({
  id: z.string(),
  object: z.literal('payment_intent'),
  amount: z.number(),
  currency: z.string(),
  status: z.enum([
    'requires_payment_method',
    'requires_confirmation',
    'requires_action',
    'processing',
    'requires_capture',
    'canceled',
    'succeeded',
  ]),
  customer: z.string().nullable(),
  payment_method: z.string().nullable(),
  description: z.string().nullable(),
  receipt_email: z.string().nullable(),
  created: z.number(),
  metadata: z.record(z.string()),
})

export const InvoiceResponseSchema = z.object({
  id: z.string(),
  object: z.literal('invoice'),
  customer: z.string(),
  amount_due: z.number(),
  amount_paid: z.number(),
  currency: z.string(),
  description: z.string().nullable(),
  status: z.enum(['draft', 'open', 'paid', 'void', 'uncollectible']),
  created: z.number(),
  metadata: z.record(z.string()),
})

export const ListResponseSchema = z.object({
  object: z.literal('list'),
  data: z.array(z.any()),
  has_more: z.boolean(),
})

// Export inferred types
export type StripeId = z.infer<typeof StripeIdSchema>
export type Address = z.infer<typeof AddressSchema>
export type CreateCustomerInput = z.infer<typeof CreateCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof UpdateCustomerSchema>
export type ListCustomersInput = z.infer<typeof ListCustomersSchema>
export type CreatePaymentMethodInput = z.infer<typeof CreatePaymentMethodSchema>
export type AttachPaymentMethodInput = z.infer<typeof AttachPaymentMethodSchema>
export type CreatePaymentIntentInput = z.infer<typeof CreatePaymentIntentSchema>
export type ConfirmPaymentIntentInput = z.infer<typeof ConfirmPaymentIntentSchema>
export type CreateInvoiceInput = z.infer<typeof CreateInvoiceSchema>
export type AddInvoiceItemInput = z.infer<typeof AddInvoiceItemSchema>
export type CustomerResponse = z.infer<typeof CustomerResponseSchema>
export type PaymentMethodResponse = z.infer<typeof PaymentMethodResponseSchema>
export type PaymentIntentResponse = z.infer<typeof PaymentIntentResponseSchema>
export type InvoiceResponse = z.infer<typeof InvoiceResponseSchema>
export type ListResponse = z.infer<typeof ListResponseSchema>

// Tool parameter types
export interface CreateCustomerParams extends CreateCustomerInput {}
export interface GetCustomerParams {
  id: string
}
export interface UpdateCustomerParams extends UpdateCustomerInput {
  id: string
}
export interface ListCustomersParams extends ListCustomersInput {}
export interface CreatePaymentMethodParams extends CreatePaymentMethodInput {}
export interface GetPaymentMethodParams {
  id: string
}
export interface AttachPaymentMethodParams extends AttachPaymentMethodInput {
  id: string
}
export interface ListPaymentMethodsParams {
  customer: string
  type?: string
  limit?: number
}
export interface CreatePaymentIntentParams extends CreatePaymentIntentInput {}
export interface GetPaymentIntentParams {
  id: string
}
export interface ConfirmPaymentIntentParams extends ConfirmPaymentIntentInput {
  id: string
}
export interface CreateInvoiceParams extends CreateInvoiceInput {}
export interface GetInvoiceParams {
  id: string
}
export interface FinalizeInvoiceParams {
  id: string
}
export interface PayInvoiceParams {
  id: string
}
export interface AddInvoiceItemParams extends AddInvoiceItemInput {}
