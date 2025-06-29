import 'dotenv/config'
import { createAITools } from './index.js'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get Mux API key from environment
const muxApiKey = process.env.MUX_API_KEY
if (!muxApiKey) {
  throw new Error('Please set MUX_API_KEY environment variable')
}

// Create AI SDK tools for Mux
const tools = createAITools(muxApiKey)

const { textStream } = streamText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Get a Video View',
  tools,
  maxSteps: 2,
})

for await (const textPart of textStream) {
  process.stdout.write(textPart)
} 