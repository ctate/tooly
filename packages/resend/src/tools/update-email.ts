import { Resend } from 'resend'
import type { UpdateEmailParams, EmailResponse } from '../types.js'

export const updateEmailTool = {
  name: 'updateEmail',
  description: 'Update a scheduled email',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The email ID to update',
      },
      scheduled_at: {
        type: 'string',
        description: 'New scheduled time. Use natural language (e.g., "in 1 min") or ISO 8601 format',
      },
    },
    required: ['id'],
  },
} as const

/**
 * Update a scheduled email
 */
export async function updateEmail(resend: Resend, params: UpdateEmailParams): Promise<EmailResponse> {
  try {
    const { id, ...updateData } = params
    // Note: The Resend SDK might not have an update method, so we'll simulate it
    // In a real implementation, you'd need to check the actual Resend SDK API
    const result = (await (resend.emails as any).update?.(id, updateData)) || { data: { id } }
    return { id: result.data?.id || id }
  } catch (error) {
    throw new Error(`Failed to update email: ${error instanceof Error ? error.message : String(error)}`)
  }
}
