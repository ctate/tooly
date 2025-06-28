import { Twilio } from 'twilio'
import type { MakeCallParams, CallResponse } from '../types.js'

export const makeCallTool = {
  name: 'makeCall',
  description: 'Make a phone call using Twilio',
  parameters: {
    type: 'object',
    properties: {
      to: {
        type: 'string',
        description: 'The phone number to call (E.164 format, e.g., +1234567890)',
        pattern: '^\\+[1-9]\\d{1,14}$',
      },
      from: {
        type: 'string',
        description: 'The Twilio phone number to call from (E.164 format)',
        pattern: '^\\+[1-9]\\d{1,14}$',
      },
      url: {
        type: 'string',
        format: 'uri',
        description: 'URL that returns TwiML instructions for the call',
      },
      twiml: {
        type: 'string',
        description: 'TwiML instructions for the call (alternative to URL)',
      },
      method: {
        type: 'string',
        enum: ['GET', 'POST'],
        description: 'HTTP method to use when requesting the URL',
        default: 'POST',
      },
      statusCallback: {
        type: 'string',
        format: 'uri',
        description: 'Webhook URL to receive status updates for this call',
      },
      statusCallbackMethod: {
        type: 'string',
        enum: ['GET', 'POST'],
        description: 'HTTP method for status callback',
        default: 'POST',
      },
      timeout: {
        type: 'number',
        description: 'Time in seconds to wait for the call to be answered (5-600)',
        minimum: 5,
        maximum: 600,
        default: 60,
      },
      record: {
        type: 'boolean',
        description: 'Whether to record the call',
      },
    },
    required: ['to', 'from'],
  },
} as const

/**
 * Make a phone call using Twilio
 */
export async function makeCall(twilio: Twilio, params: MakeCallParams): Promise<CallResponse> {
  try {
    if (!params.url && !params.twiml) {
      throw new Error('Either url or twiml must be provided')
    }

    const callOptions: any = {
      to: params.to,
      from: params.from,
      method: params.method || 'POST',
      timeout: params.timeout || 60,
    }

    if (params.url) {
      callOptions.url = params.url
    } else if (params.twiml) {
      callOptions.twiml = params.twiml
    }

    if (params.statusCallback) {
      callOptions.statusCallback = params.statusCallback
      callOptions.statusCallbackMethod = params.statusCallbackMethod || 'POST'
    }

    if (params.record !== undefined) {
      callOptions.record = params.record
    }

    const call = await twilio.calls.create(callOptions)

    return {
      sid: call.sid,
      accountSid: call.accountSid,
      from: call.from,
      to: call.to,
      status: call.status as any,
      direction: call.direction as any,
      price: call.price,
      priceUnit: call.priceUnit,
      dateCreated: call.dateCreated.toISOString(),
      dateUpdated: call.dateUpdated.toISOString(),
      duration: call.duration,
      startTime: call.startTime?.toISOString() || null,
      endTime: call.endTime?.toISOString() || null,
      uri: call.uri,
    }
  } catch (error) {
    throw new Error(`Failed to make call: ${error instanceof Error ? error.message : String(error)}`)
  }
}
