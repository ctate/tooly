import { Resend } from 'resend'
import type { SendEmailParams, EmailResponse } from '../types.js'

export const sendEmailTool = {
  name: 'sendEmail',
  description: 'Send a single email using Resend',
  parameters: {
    type: 'object',
    properties: {
      from: {
        type: 'string',
        description: 'Sender email address. To include a friendly name, use the format "Your Name <sender@domain.com>"',
      },
      to: {
        type: 'array',
        items: { type: 'string' },
        description: 'Recipient email addresses (max 50)',
        maxItems: 50,
      },
      subject: {
        type: 'string',
        description: 'Email subject',
      },
      html: {
        type: 'string',
        description: 'The HTML version of the message',
      },
      text: {
        type: 'string',
        description: 'The plain text version of the message',
      },
      bcc: {
        type: 'array',
        items: { type: 'string' },
        description: 'BCC recipient email addresses',
      },
      cc: {
        type: 'array',
        items: { type: 'string' },
        description: 'CC recipient email addresses',
      },
      reply_to: {
        type: 'array',
        items: { type: 'string' },
        description: 'Reply-to email addresses',
      },
      scheduled_at: {
        type: 'string',
        description: 'Schedule email to be sent later. Use natural language (e.g., "in 1 min") or ISO 8601 format',
      },
      headers: {
        type: 'object',
        description: 'Custom headers to add to the email',
      },
      attachments: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            filename: { type: 'string' },
            content: { type: 'string', description: 'Base64 encoded content' },
            path: { type: 'string' },
            content_type: { type: 'string' },
          },
          required: ['filename'],
        },
        description: 'File attachments (max 40MB per email)',
      },
      tags: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', maxLength: 256 },
            value: { type: 'string', maxLength: 256 },
          },
          required: ['name', 'value'],
        },
        description: 'Custom tags for email tracking',
      },
    },
    required: ['from', 'to', 'subject'],
  },
} as const

/**
 * Send a single email
 */
export async function sendEmail(resend: Resend, params: SendEmailParams): Promise<EmailResponse> {
  try {
    // Ensure at least one of html, text, or react is provided
    const emailParams = {
      ...params,
      html: params.html || (params.text ? undefined : '<p>No content provided</p>'),
    }
    const result = await resend.emails.send(emailParams as any)
    return { id: result.data?.id || '' }
  } catch (error) {
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : String(error)}`)
  }
}
