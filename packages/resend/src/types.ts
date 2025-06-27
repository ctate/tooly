import { z } from 'zod'

// Base types
export const EmailAddressSchema = z.string().email()
export const EmailAddressesSchema = z.union([EmailAddressSchema, z.array(EmailAddressSchema).max(50)])

// Attachment schema
export const AttachmentSchema = z.object({
  content: z.union([z.string(), z.instanceof(Buffer)]).optional(),
  filename: z.string(),
  path: z.string().optional(),
  content_type: z.string().optional(),
})

// Tag schema
export const TagSchema = z.object({
  name: z
    .string()
    .max(256)
    .regex(/^[a-zA-Z0-9_-]+$/),
  value: z
    .string()
    .max(256)
    .regex(/^[a-zA-Z0-9_-]+$/),
})

// Send Email schema
export const SendEmailSchema = z.object({
  from: z.string(),
  to: EmailAddressesSchema,
  subject: z.string(),
  bcc: EmailAddressesSchema.optional(),
  cc: EmailAddressesSchema.optional(),
  scheduled_at: z.string().optional(),
  reply_to: EmailAddressesSchema.optional(),
  html: z.string().optional(),
  text: z.string().optional(),
  react: z.any().optional(), // React component
  headers: z.record(z.string()).optional(),
  attachments: z.array(AttachmentSchema).optional(),
  tags: z.array(TagSchema).optional(),
})

// Send Batch Emails schema
export const SendBatchEmailsSchema = z.array(SendEmailSchema).max(100)

// Update Email schema
export const UpdateEmailSchema = z.object({
  scheduled_at: z.string().optional(),
})

// Response types
export const EmailResponseSchema = z.object({
  id: z.string(),
})

export const EmailDetailsSchema = z.object({
  object: z.literal('email'),
  id: z.string(),
  to: z.array(z.string()),
  from: z.string(),
  created_at: z.string(),
  subject: z.string(),
  html: z.string().nullable(),
  text: z.string().nullable(),
  bcc: z.array(z.string().nullable()),
  cc: z.array(z.string().nullable()),
  reply_to: z.array(z.string().nullable()),
  last_event: z.string(),
})

export const BatchEmailResponseSchema = z.object({
  data: z.array(EmailResponseSchema),
})

// Export inferred types
export type EmailAddress = z.infer<typeof EmailAddressSchema>
export type EmailAddresses = z.infer<typeof EmailAddressesSchema>
export type Attachment = z.infer<typeof AttachmentSchema>
export type Tag = z.infer<typeof TagSchema>
export type SendEmailInput = z.infer<typeof SendEmailSchema>
export type SendBatchEmailsInput = z.infer<typeof SendBatchEmailsSchema>
export type UpdateEmailInput = z.infer<typeof UpdateEmailSchema>
export type EmailResponse = z.infer<typeof EmailResponseSchema>
export type EmailDetails = z.infer<typeof EmailDetailsSchema>
export type BatchEmailResponse = z.infer<typeof BatchEmailResponseSchema>

// Tool parameter types
export interface SendEmailParams extends SendEmailInput {}
export interface SendBatchEmailsParams {
  emails: SendBatchEmailsInput
}
export interface RetrieveEmailParams {
  id: string
}
export interface UpdateEmailParams extends UpdateEmailInput {
  id: string
}
export interface CancelEmailParams {
  id: string
}
