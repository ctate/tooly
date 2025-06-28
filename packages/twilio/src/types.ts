import { z } from 'zod'

// Base types
export const PhoneNumberSchema = z.string().regex(/^\+[1-9]\d{1,14}$/, 'Must be a valid phone number with country code')
export const MessageStatusSchema = z.enum([
  'queued',
  'failed',
  'sent',
  'delivered',
  'undelivered',
  'receiving',
  'received',
  'accepted',
  'scheduled',
  'read',
  'partially_delivered',
])
export const CallStatusSchema = z.enum([
  'queued',
  'ringing',
  'in-progress',
  'completed',
  'busy',
  'failed',
  'no-answer',
  'canceled',
])

// Send SMS schema
export const SendSmsSchema = z.object({
  to: PhoneNumberSchema,
  from: PhoneNumberSchema.optional(),
  body: z.string().min(1).max(1600),
  mediaUrl: z.array(z.string().url()).optional(),
  messagingServiceSid: z.string().optional(),
  statusCallback: z.string().url().optional(),
})

// Send WhatsApp schema
export const SendWhatsAppSchema = z.object({
  to: z.string().regex(/^whatsapp:\+[1-9]\d{1,14}$/, 'Must be a valid WhatsApp number format (whatsapp:+1234567890)'),
  from: z.string().regex(/^whatsapp:\+[1-9]\d{1,14}$/, 'Must be a valid WhatsApp number format (whatsapp:+1234567890)'),
  body: z.string().min(1).max(4096),
  mediaUrl: z.array(z.string().url()).optional(),
  statusCallback: z.string().url().optional(),
})

// Make Call schema
export const MakeCallSchema = z.object({
  to: PhoneNumberSchema,
  from: PhoneNumberSchema,
  url: z.string().url().optional(),
  twiml: z.string().optional(),
  method: z.enum(['GET', 'POST']).default('POST'),
  statusCallback: z.string().url().optional(),
  statusCallbackMethod: z.enum(['GET', 'POST']).default('POST'),
  timeout: z.number().min(5).max(600).default(60),
  record: z.boolean().optional(),
})

// Get Call Status schema
export const GetCallStatusSchema = z.object({
  callSid: z.string(),
})

// Get Message Status schema
export const GetMessageStatusSchema = z.object({
  messageSid: z.string(),
})

// List Messages schema
export const ListMessagesSchema = z.object({
  to: PhoneNumberSchema.optional(),
  from: PhoneNumberSchema.optional(),
  dateSent: z.string().optional(), // ISO date string
  limit: z.number().min(1).max(1000).optional(),
})

// List Calls schema
export const ListCallsSchema = z.object({
  to: PhoneNumberSchema.optional(),
  from: PhoneNumberSchema.optional(),
  status: CallStatusSchema.optional(),
  startTime: z.string().optional(), // ISO date string
  endTime: z.string().optional(), // ISO date string
  limit: z.number().min(1).max(1000).optional(),
})

// Get Phone Number Details schema
export const GetPhoneNumberSchema = z.object({
  phoneNumber: PhoneNumberSchema,
})

// Response schemas
export const MessageResponseSchema = z.object({
  sid: z.string(),
  accountSid: z.string(),
  messagingServiceSid: z.string().nullable(),
  from: z.string(),
  to: z.string(),
  body: z.string(),
  status: MessageStatusSchema,
  direction: z.enum(['inbound', 'outbound-api', 'outbound-call', 'outbound-reply']),
  price: z.string().nullable(),
  priceUnit: z.string().nullable(),
  dateCreated: z.string(),
  dateSent: z.string().nullable(),
  dateUpdated: z.string(),
  errorCode: z.number().nullable(),
  errorMessage: z.string().nullable(),
  uri: z.string(),
  numMedia: z.string(),
  numSegments: z.string(),
})

export const CallResponseSchema = z.object({
  sid: z.string(),
  accountSid: z.string(),
  from: z.string(),
  to: z.string(),
  status: CallStatusSchema,
  direction: z.enum(['inbound', 'outbound-api', 'outbound-dial']),
  price: z.string().nullable(),
  priceUnit: z.string().nullable(),
  dateCreated: z.string(),
  dateUpdated: z.string(),
  duration: z.string().nullable(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
  uri: z.string(),
})

export const PhoneNumberDetailsSchema = z.object({
  callerName: z
    .object({
      callerName: z.string().nullable(),
      callerType: z.string().nullable(),
      errorCode: z.string().nullable(),
    })
    .nullable(),
  carrier: z
    .object({
      mobileCountryCode: z.string().nullable(),
      mobileNetworkCode: z.string().nullable(),
      name: z.string().nullable(),
      type: z.string().nullable(),
      errorCode: z.string().nullable(),
    })
    .nullable(),
  countryCode: z.string(),
  phoneNumber: z.string(),
  nationalFormat: z.string(),
  valid: z.boolean(),
  validationErrors: z.array(z.string()),
  url: z.string(),
})

export const MessagesListSchema = z.object({
  messages: z.array(MessageResponseSchema),
  firstPageUri: z.string(),
  nextPageUri: z.string().nullable(),
  previousPageUri: z.string().nullable(),
  uri: z.string(),
})

export const CallsListSchema = z.object({
  calls: z.array(CallResponseSchema),
  firstPageUri: z.string(),
  nextPageUri: z.string().nullable(),
  previousPageUri: z.string().nullable(),
  uri: z.string(),
})

// Export inferred types
export type PhoneNumber = z.infer<typeof PhoneNumberSchema>
export type MessageStatus = z.infer<typeof MessageStatusSchema>
export type CallStatus = z.infer<typeof CallStatusSchema>
export type SendSmsInput = z.infer<typeof SendSmsSchema>
export type SendWhatsAppInput = z.infer<typeof SendWhatsAppSchema>
export type MakeCallInput = z.infer<typeof MakeCallSchema>
export type GetCallStatusInput = z.infer<typeof GetCallStatusSchema>
export type GetMessageStatusInput = z.infer<typeof GetMessageStatusSchema>
export type ListMessagesInput = z.infer<typeof ListMessagesSchema>
export type ListCallsInput = z.infer<typeof ListCallsSchema>
export type GetPhoneNumberInput = z.infer<typeof GetPhoneNumberSchema>
export type MessageResponse = z.infer<typeof MessageResponseSchema>
export type CallResponse = z.infer<typeof CallResponseSchema>
export type PhoneNumberDetails = z.infer<typeof PhoneNumberDetailsSchema>
export type MessagesList = z.infer<typeof MessagesListSchema>
export type CallsList = z.infer<typeof CallsListSchema>

// Tool parameter types
export interface SendSmsParams extends SendSmsInput {}
export interface SendWhatsAppParams extends SendWhatsAppInput {}
export interface MakeCallParams extends MakeCallInput {}
export interface GetCallStatusParams extends GetCallStatusInput {}
export interface GetMessageStatusParams extends GetMessageStatusInput {}
export interface ListMessagesParams extends ListMessagesInput {}
export interface ListCallsParams extends ListCallsInput {}
export interface GetPhoneNumberParams extends GetPhoneNumberInput {}
