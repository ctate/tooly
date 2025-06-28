import { Resend } from 'resend'
import type { CancelEmailParams, EmailResponse } from '../types.js'

export const cancelEmailTool = {
  name: 'cancelEmail',
  description: 'Cancel a scheduled email',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The email ID to cancel',
      },
    },
    required: ['id'],
  },
} as const

/**
 * Cancel a scheduled email
 */
export async function cancelEmail(resend: Resend, params: CancelEmailParams): Promise<EmailResponse> {
  try {
    const result = await resend.emails.cancel(params.id)
    return { id: result.data?.id || params.id }
  } catch (error) {
    throw new Error(`Failed to cancel email: ${error instanceof Error ? error.message : String(error)}`)
  }
}
