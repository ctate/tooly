import { Twilio } from 'twilio'
import type { GetMessageStatusParams, MessageResponse } from '../types.js'

export const getMessageStatusTool = {
  name: 'getMessageStatus',
  description: 'Get the status and details of a message using its SID',
  parameters: {
    type: 'object',
    properties: {
      messageSid: {
        type: 'string',
        description: 'The unique SID identifier of the message to retrieve',
        minLength: 34,
        maxLength: 34,
        pattern: '^MM[a-zA-Z0-9]{32}$',
      },
    },
    required: ['messageSid'],
  },
} as const

/**
 * Get message status and details
 */
export async function getMessageStatus(twilio: Twilio, params: GetMessageStatusParams): Promise<MessageResponse> {
  try {
    const message = await twilio.messages(params.messageSid).fetch()

    return {
      sid: message.sid,
      accountSid: message.accountSid,
      messagingServiceSid: message.messagingServiceSid,
      from: message.from,
      to: message.to,
      body: message.body,
      status: message.status as any,
      direction: message.direction as any,
      price: message.price,
      priceUnit: message.priceUnit,
      dateCreated: message.dateCreated.toISOString(),
      dateSent: message.dateSent?.toISOString() || null,
      dateUpdated: message.dateUpdated.toISOString(),
      errorCode: message.errorCode,
      errorMessage: message.errorMessage,
      uri: message.uri,
      numMedia: message.numMedia,
      numSegments: message.numSegments,
    }
  } catch (error) {
    throw new Error(`Failed to get message status: ${error instanceof Error ? error.message : String(error)}`)
  }
}
