import 'dotenv/config'
import { createAITools } from '@tooly/linear'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get Linear API key from environment
const linearApiKey = process.env.LINEAR_API_KEY
if (!linearApiKey) {
  throw new Error('Please set LINEAR_API_KEY environment variable')
}

// Create AI SDK tools for Linear
const tools = createAITools(linearApiKey)

const { textStream } = streamText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Show me a simple list of all the issues in Linear with the number, title, and status',
  tools,
  maxSteps: 2,
})

for await (const textPart of textStream) {
  process.stdout.write(textPart)
}
