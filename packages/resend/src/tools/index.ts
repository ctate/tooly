import { z } from 'zod'
import { SendEmailSchema, SendBatchEmailsSchema, UpdateEmailSchema } from '../types.js'

// Export all tools
export * from './send-email.js'
export * from './send-batch-emails.js'
export * from './retrieve-email.js'
export * from './update-email.js'
export * from './cancel-email.js'

// Import tool definitions
import { sendEmailTool } from './send-email.js'
import { sendBatchEmailsTool } from './send-batch-emails.js'
import { retrieveEmailTool } from './retrieve-email.js'
import { updateEmailTool } from './update-email.js'
import { cancelEmailTool } from './cancel-email.js'

// Export all tools as an array
export const resendTools = [
  sendEmailTool,
  sendBatchEmailsTool,
  retrieveEmailTool,
  updateEmailTool,
  cancelEmailTool,
] as const

// Tool parameter validation schemas
export const toolParameterSchemas = {
  sendEmail: SendEmailSchema,
  sendBatchEmails: z.object({ emails: SendBatchEmailsSchema }),
  retrieveEmail: z.object({ id: z.string() }),
  updateEmail: z.object({ id: z.string() }).merge(UpdateEmailSchema),
  cancelEmail: z.object({ id: z.string() }),
} as const
