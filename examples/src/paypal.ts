import 'dotenv/config'
import { createAITools } from '@tooly/paypal'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get PayPal client credentials from environment
const paypalClientId = process.env.PAYPAL_CLIENT_ID
const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET
if (!paypalClientId || !paypalClientSecret) {
  throw new Error('Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET environment variables')
}

// Create AI SDK tools for PayPal
const tools = createAITools(paypalClientId, paypalClientSecret, 'sandbox') // Use 'live' for production

const { textStream } = streamText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Create a payment order for $25.00 USD with the description "Test purchase"',
  tools,
  maxSteps: 2,
})

for await (const textPart of textStream) {
  process.stdout.write(textPart)
}
