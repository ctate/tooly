import 'dotenv/config'
import { createAITools } from '@tooly/twilio'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get Twilio credentials from environment
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

if (!accountSid || !authToken) {
  throw new Error('Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN environment variables')
}

// Create AI SDK tools for Twilio
const tools = createAITools(accountSid, authToken)

const { toolResults } = await generateText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Get information about my Twilio phone number',
  tools,
})

console.log(JSON.stringify(toolResults[0]?.result, null, 2))
