import { Twilio } from 'twilio'
import type { ListMessagesParams, MessagesList } from '../types.js'

export const listMessagesTool = {
  name: 'listMessages',
  description: 'List messages with optional filtering by phone numbers and date',
  parameters: {
    type: 'object',
    properties: {
      to: {
        type: 'string',
        description: 'Filter by phone number that received the message (E.164 format)',
        pattern: '^\\+[1-9]\\d{1,14}$',
      },
      from: {
        type: 'string',
        description: 'Filter by phone number that sent the message (E.164 format)',
        pattern: '^\\+[1-9]\\d{1,14}$',
      },
      dateSent: {
        type: 'string',
        description: 'Filter by date the message was sent (YYYY-MM-DD format)',
        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of messages to return (1-1000)',
        minimum: 1,
        maximum: 1000,
        default: 50,
      },
    },
    required: [],
  },
} as const

/**
 * List messages with optional filtering
 */
export async function listMessages(twilio: Twilio, params: ListMessagesParams = {}): Promise<MessagesList> {
  try {
    const listOptions: any = {
      limit: params.limit || 50,
    }

    if (params.to) {
      listOptions.to = params.to
    }

    if (params.from) {
      listOptions.from = params.from
    }

    if (params.dateSent) {
      listOptions.dateSent = new Date(params.dateSent)
    }

    const messages = await twilio.messages.list(listOptions)

    const messagesList = messages.map((message) => ({
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
    }))

    return {
      messages: messagesList,
      firstPageUri: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
      nextPageUri: null,
      previousPageUri: null,
      uri: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
    }
  } catch (error) {
    throw new Error(`Failed to list messages: ${error instanceof Error ? error.message : String(error)}`)
  }
}
