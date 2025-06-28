import { Twilio } from 'twilio'
import type { SendSmsParams, MessageResponse } from '../types.js'

export const sendSmsTool = {
  name: 'sendSms',
  description: 'Send an SMS text message using Twilio',
  parameters: {
    type: 'object',
    properties: {
      to: {
        type: 'string',
        description: 'The phone number to send the message to (E.164 format, e.g., +1234567890)',
        pattern: '^\\+[1-9]\\d{1,14}$',
      },
      from: {
        type: 'string',
        description:
          'The Twilio phone number to send from (E.164 format). If not provided, will use default from messaging service',
        pattern: '^\\+[1-9]\\d{1,14}$',
      },
      body: {
        type: 'string',
        description: 'The text content of the message (max 1600 characters)',
        minLength: 1,
        maxLength: 1600,
      },
      mediaUrl: {
        type: 'array',
        items: { type: 'string', format: 'uri' },
        description: 'Array of media URLs to send with the message (for MMS)',
        maxItems: 10,
      },
      messagingServiceSid: {
        type: 'string',
        description: 'The SID of the Messaging Service to use for this message',
      },
      statusCallback: {
        type: 'string',
        format: 'uri',
        description: 'Webhook URL to receive status updates for this message',
      },
    },
    required: ['to', 'body'],
  },
} as const

/**
 * Send an SMS message using Twilio
 */
export async function sendSms(twilio: Twilio, params: SendSmsParams): Promise<MessageResponse> {
  try {
    const messageOptions: any = {
      to: params.to,
      body: params.body,
    }

    if (params.from) {
      messageOptions.from = params.from
    }

    if (params.mediaUrl && params.mediaUrl.length > 0) {
      messageOptions.mediaUrl = params.mediaUrl
    }

    if (params.messagingServiceSid) {
      messageOptions.messagingServiceSid = params.messagingServiceSid
    }

    if (params.statusCallback) {
      messageOptions.statusCallback = params.statusCallback
    }

    const message = await twilio.messages.create(messageOptions)

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
    throw new Error(`Failed to send SMS: ${error instanceof Error ? error.message : String(error)}`)
  }
}
