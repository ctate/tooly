import 'dotenv/config'
import { createAITools } from '@tooly/stripe'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get Stripe API key from environment
const stripeApiKey = process.env.STRIPE_SECRET_KEY
if (!stripeApiKey) {
  throw new Error('Please set STRIPE_SECRET_KEY environment variable')
}

// Create AI SDK tools for Stripe
const tools = createAITools(stripeApiKey)

const { textStream } = streamText({
  model: openai('gpt-4.1-nano'),
  prompt:
    'Create a customer for John Doe with email john@example.com, then create a $25 payment intent for that customer',
  tools,
  maxSteps: 5,
})

for await (const textPart of textStream) {
  process.stdout.write(textPart)
}
