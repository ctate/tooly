import { Twilio } from 'twilio'
import type { ListCallsParams, CallsList } from '../types.js'

export const listCallsTool = {
  name: 'listCalls',
  description: 'List calls with optional filtering by phone numbers, status, and date range',
  parameters: {
    type: 'object',
    properties: {
      to: {
        type: 'string',
        description: 'Filter by phone number that was called (E.164 format)',
        pattern: '^\\+[1-9]\\d{1,14}$',
      },
      from: {
        type: 'string',
        description: 'Filter by phone number that made the call (E.164 format)',
        pattern: '^\\+[1-9]\\d{1,14}$',
      },
      status: {
        type: 'string',
        enum: ['queued', 'ringing', 'in-progress', 'completed', 'busy', 'failed', 'no-answer', 'canceled'],
        description: 'Filter by call status',
      },
      startTime: {
        type: 'string',
        description: 'Filter calls that started on or after this date (YYYY-MM-DD format)',
        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      },
      endTime: {
        type: 'string',
        description: 'Filter calls that ended on or before this date (YYYY-MM-DD format)',
        pattern: '^\\d{4}-\\d{2}-\\d{2}$',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of calls to return (1-1000)',
        minimum: 1,
        maximum: 1000,
        default: 50,
      },
    },
    required: [],
  },
} as const

/**
 * List calls with optional filtering
 */
export async function listCalls(twilio: Twilio, params: ListCallsParams = {}): Promise<CallsList> {
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

    if (params.status) {
      listOptions.status = params.status
    }

    if (params.startTime) {
      listOptions.startTimeAfter = new Date(params.startTime)
    }

    if (params.endTime) {
      listOptions.endTimeBefore = new Date(params.endTime)
    }

    const calls = await twilio.calls.list(listOptions)

    const callsList = calls.map((call) => ({
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
    }))

    return {
      calls: callsList,
      firstPageUri: `/2010-04-01/Accounts/${twilio.accountSid}/Calls.json`,
      nextPageUri: null,
      previousPageUri: null,
      uri: `/2010-04-01/Accounts/${twilio.accountSid}/Calls.json`,
    }
  } catch (error) {
    throw new Error(`Failed to list calls: ${error instanceof Error ? error.message : String(error)}`)
  }
}
