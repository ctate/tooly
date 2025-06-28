import { z } from 'zod'
import {
  SendSmsSchema,
  SendWhatsAppSchema,
  MakeCallSchema,
  GetCallStatusSchema,
  GetMessageStatusSchema,
  ListMessagesSchema,
  ListCallsSchema,
  GetPhoneNumberSchema,
} from '../types.js'

// Export all tools
export * from './send-sms.js'
export * from './send-whatsapp.js'
export * from './make-call.js'
export * from './get-call-status.js'
export * from './get-message-status.js'
export * from './list-messages.js'
export * from './list-calls.js'
export * from './get-phone-number.js'

// Import tool definitions
import { sendSmsTool } from './send-sms.js'
import { sendWhatsAppTool } from './send-whatsapp.js'
import { makeCallTool } from './make-call.js'
import { getCallStatusTool } from './get-call-status.js'
import { getMessageStatusTool } from './get-message-status.js'
import { listMessagesTool } from './list-messages.js'
import { listCallsTool } from './list-calls.js'
import { getPhoneNumberTool } from './get-phone-number.js'

// Export all tools as an array
export const twilioTools = [
  sendSmsTool,
  sendWhatsAppTool,
  makeCallTool,
  getCallStatusTool,
  getMessageStatusTool,
  listMessagesTool,
  listCallsTool,
  getPhoneNumberTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  sendSms: SendSmsSchema,
  sendWhatsApp: SendWhatsAppSchema,
  makeCall: MakeCallSchema,
  getCallStatus: GetCallStatusSchema,
  getMessageStatus: GetMessageStatusSchema,
  listMessages: ListMessagesSchema,
  listCalls: ListCallsSchema,
  getPhoneNumber: GetPhoneNumberSchema,
} as const
