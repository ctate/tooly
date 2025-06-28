import { Resend } from 'resend'
import type { RetrieveEmailParams, EmailDetails } from '../types.js'

export const retrieveEmailTool = {
  name: 'retrieveEmail',
  description: 'Retrieve details of a single email by ID',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The email ID to retrieve',
      },
    },
    required: ['id'],
  },
} as const

/**
 * Retrieve email details by ID
 */
export async function retrieveEmail(resend: Resend, params: RetrieveEmailParams): Promise<EmailDetails> {
  try {
    const result = await resend.emails.get(params.id)
    return result.data as EmailDetails
  } catch (error) {
    throw new Error(`Failed to retrieve email: ${error instanceof Error ? error.message : String(error)}`)
  }
}
