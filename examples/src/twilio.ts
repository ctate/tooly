import { createAITools } from '@tooly/twilio'
import { config } from 'dotenv'

// Load environment variables
config()

async function twilioExample() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN

  if (!accountSid || !authToken) {
    throw new Error('Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables')
  }

  // Create AI SDK tools for Twilio
  const tools = createAITools(accountSid, authToken)

  return tools
}

export { twilioExample }
