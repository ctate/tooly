import { Twilio } from 'twilio'
import type { SendWhatsAppParams, MessageResponse } from '../types.js'

export const sendWhatsAppTool = {
  name: 'sendWhatsApp',
  description: 'Send a WhatsApp message using Twilio',
  parameters: {
    type: 'object',
    properties: {
      to: {
        type: 'string',
        description: 'The WhatsApp number to send to (whatsapp:+1234567890 format)',
        pattern: '^whatsapp:\\+[1-9]\\d{1,14}$',
      },
      from: {
        type: 'string',
        description: 'The Twilio WhatsApp number to send from (whatsapp:+1234567890 format)',
        pattern: '^whatsapp:\\+[1-9]\\d{1,14}$',
      },
      body: {
        type: 'string',
        description: 'The text content of the WhatsApp message (max 4096 characters)',
        minLength: 1,
        maxLength: 4096,
      },
      mediaUrl: {
        type: 'array',
        items: { type: 'string', format: 'uri' },
        description: 'Array of media URLs to send with the message',
        maxItems: 10,
      },
      statusCallback: {
        type: 'string',
        format: 'uri',
        description: 'Webhook URL to receive status updates for this message',
      },
    },
    required: ['to', 'from', 'body'],
  },
} as const

/**
 * Send a WhatsApp message using Twilio
 */
export async function sendWhatsApp(twilio: Twilio, params: SendWhatsAppParams): Promise<MessageResponse> {
  try {
    const messageOptions: any = {
      to: params.to,
      from: params.from,
      body: params.body,
    }

    if (params.mediaUrl && params.mediaUrl.length > 0) {
      messageOptions.mediaUrl = params.mediaUrl
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
    throw new Error(`Failed to send WhatsApp message: ${error instanceof Error ? error.message : String(error)}`)
  }
}
