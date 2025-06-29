import 'dotenv/config'
import { createAITools } from '@tooly/vercel'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get Vercel bearer token from environment
const vercelBearerToken = process.env.VERCEL_BEARER_TOKEN
if (!vercelBearerToken) {
  throw new Error('Please set VERCEL_BEARER_TOKEN environment variable')
}

// Create AI SDK tools for Vercel
const tools = createAITools(vercelBearerToken)

const { textStream } = streamText({
  model: openai('gpt-4.1-nano'),
  prompt: 'List my Vercel projects and show me the latest deployment for each one',
  tools,
  maxSteps: 2,
})

for await (const textPart of textStream) {
  process.stdout.write(textPart)
}
