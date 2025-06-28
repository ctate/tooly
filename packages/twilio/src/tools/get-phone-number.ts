import { Twilio } from 'twilio'
import type { GetPhoneNumberParams, PhoneNumberDetails } from '../types.js'

export const getPhoneNumberTool = {
  name: 'getPhoneNumber',
  description: 'Get phone number details and validation using Twilio Lookup',
  parameters: {
    type: 'object',
    properties: {
      phoneNumber: {
        type: 'string',
        description: 'The phone number to look up (E.164 format, e.g., +1234567890)',
        pattern: '^\\+[1-9]\\d{1,14}$',
      },
    },
    required: ['phoneNumber'],
  },
} as const

/**
 * Get phone number details and validation
 */
export async function getPhoneNumber(twilio: Twilio, params: GetPhoneNumberParams): Promise<PhoneNumberDetails> {
  try {
    const phoneNumber = await twilio.lookups.v2.phoneNumbers(params.phoneNumber).fetch({
      fields: 'caller_name,carrier',
    })

    // The Twilio API response structure may vary, so we need to handle the data safely
    const callerNameData = (phoneNumber as any).callerName
    const carrierData = (phoneNumber as any).carrier

    return {
      callerName: callerNameData
        ? {
            callerName: callerNameData.callerName || null,
            callerType: callerNameData.callerType || null,
            errorCode: callerNameData.errorCode || null,
          }
        : null,
      carrier: carrierData
        ? {
            mobileCountryCode: carrierData.mobileCountryCode || null,
            mobileNetworkCode: carrierData.mobileNetworkCode || null,
            name: carrierData.name || null,
            type: carrierData.type || null,
            errorCode: carrierData.errorCode || null,
          }
        : null,
      countryCode: phoneNumber.countryCode,
      phoneNumber: phoneNumber.phoneNumber,
      nationalFormat: phoneNumber.nationalFormat,
      valid: phoneNumber.valid,
      validationErrors: phoneNumber.validationErrors || [],
      url: phoneNumber.url,
    }
  } catch (error) {
    throw new Error(`Failed to get phone number details: ${error instanceof Error ? error.message : String(error)}`)
  }
}
