import { Twilio } from 'twilio'
import type { GetCallStatusParams, CallResponse } from '../types.js'

export const getCallStatusTool = {
  name: 'getCallStatus',
  description: 'Get the status and details of a call using its SID',
  parameters: {
    type: 'object',
    properties: {
      callSid: {
        type: 'string',
        description: 'The unique SID identifier of the call to retrieve',
        minLength: 34,
        maxLength: 34,
        pattern: '^CA[a-zA-Z0-9]{32}$',
      },
    },
    required: ['callSid'],
  },
} as const

/**
 * Get call status and details
 */
export async function getCallStatus(twilio: Twilio, params: GetCallStatusParams): Promise<CallResponse> {
  try {
    const call = await twilio.calls(params.callSid).fetch()

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
    throw new Error(`Failed to get call status: ${error instanceof Error ? error.message : String(error)}`)
  }
}
