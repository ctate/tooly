import 'dotenv/config'
import { createAITools } from '@tooly/firecrawl'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Get Firecrawl API key from environment
const firecrawlApiKey = process.env.FIRECRAWL_API_KEY
if (!firecrawlApiKey) {
  throw new Error('Please set FIRECRAWL_API_KEY environment variable')
}

// Create AI SDK tools for Firecrawl
const tools = createAITools(firecrawlApiKey)

const { textStream } = streamText({
  model: openai('gpt-4.1-nano'),
  prompt: 'Scrape the homepage of https://example.com and tell me what you find',
  tools,
  maxSteps: 2,
})

for await (const textPart of textStream) {
  process.stdout.write(textPart)
}
