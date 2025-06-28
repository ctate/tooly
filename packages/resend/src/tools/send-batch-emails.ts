import { Resend } from 'resend'
import type { SendBatchEmailsParams, BatchEmailResponse } from '../types.js'
import { sendEmailTool } from './send-email.js'

export const sendBatchEmailsTool = {
  name: 'sendBatchEmails',
  description: 'Send up to 100 batch emails at once using Resend',
  parameters: {
    type: 'object',
    properties: {
      emails: {
        type: 'array',
        items: sendEmailTool.parameters,
        maxItems: 100,
        description: 'Array of email objects to send (max 100)',
      },
    },
    required: ['emails'],
  },
} as const

/**
 * Send batch emails (up to 100)
 */
export async function sendBatchEmails(resend: Resend, params: SendBatchEmailsParams): Promise<BatchEmailResponse> {
  try {
    // Ensure each email has at least one of html, text, or react
    const emailsWithContent = params.emails.map((email) => ({
      ...email,
      html: email.html || (email.text ? undefined : '<p>No content provided</p>'),
    }))
    const result = await resend.batch.send(emailsWithContent as any)
    return {
      data: Array.isArray(result.data) ? result.data.map((item: any) => ({ id: item.id })) : [],
    }
  } catch (error) {
    throw new Error(`Failed to send batch emails: ${error instanceof Error ? error.message : String(error)}`)
  }
}
