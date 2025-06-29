import 'dotenv/config'
import { createAITools } from '@tooly/linear'
import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get Linear API key from environment
const linearApiKey = process.env.LINEAR_API_KEY
if (!linearApiKey) {
  throw new Error('Please set LINEAR_API_KEY environment variable')
}

// Create AI SDK tools for Linear
const tools = createAITools(linearApiKey)

const { toolResults } = await generateText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Give me a list of all the issues in Linear',
  tools,
})

console.log(JSON.stringify(toolResults[0]?.result, null, 2))
